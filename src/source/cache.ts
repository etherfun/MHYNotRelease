import { ID3Writer } from 'browser-id3-writer';

export const CacheAudio = async (list: any[]) => {
    await Placeholders(list);
    
    for (var i = 0; i < list.length; i++) {
        const audioId = list[i].audio_id;
        const extName = list[i].extName;

        if (await checkDownloaded(audioId, extName)) {
            continue;
        }

        try {
            const dist = JSON.parse(localStorage.getItem("NM_SETTING_CUSTOM")).storage.cachePath;
            const filePath_muisc = `${dist}\\Cache\\MHYNotRelease_Cache\\${audioId}.${extName}`;
            const filePath_lrc = `${dist}\\Cache\\MHYNotRelease_Cache\\${audioId}.lrc`;

            var audioBlob: Blob;
            var coverArrayBuffer: ArrayBuffer;

            var response = await fetch(list[i].url);
            var arrayBuffer = await response.arrayBuffer();

            var coverResponse = await fetch(list[i].cover.replace('orpheus://cache/?', ''));
            coverArrayBuffer = await coverResponse.arrayBuffer();

            if (extName === 'mp3') {
                const writer = new ID3Writer(arrayBuffer);
                writer
                    .setFrame('TIT2', list[i].name) // 标题
                    .setFrame('TPE1', [list[i].author]) // 作者
                    .setFrame('TALB', list[i].albumname) // 专辑
                    .setFrame('APIC', { // 封面
                        type: 3,
                        data: coverArrayBuffer,
                        description: '',
                    })
                writer.addTag();
                audioBlob = writer.getBlob();
            } else {//未来支持flac(找不到支持flac元数据的库了)
            }

            if (list[i].lyric !== '') await betterncm.fs.writeFileText(filePath_lrc, list[i].lyric);
            await betterncm.fs.writeFile(filePath_muisc, audioBlob);
        } catch (error) {
            console.error('MHYNotRelease, 缓存歌曲失败,', error);
            return;
        }
    }
}
export async function Placeholders(list: any) {
    for (let i = 0; i < list.length; i++) {
        const audioId = list[i].audio_id;
        const extName = list[i].extName;

        if (await checkDownloaded(audioId, extName)) {
            continue;
        }

        let arrayBuffer: ArrayBuffer;
        let coverArrayBuffer: ArrayBuffer;

        const coverResponse = await fetch(list[i].cover.replace('orpheus://cache/?', ''));
        coverArrayBuffer = await coverResponse.arrayBuffer();
        //一段静音音频的base64
        arrayBuffer = base64ToArrayBuffer('SUQzAwAAAAAAFgAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/4xjAAAAAAlwAAAAAtASxAAAfQAAAOP//////////////////////////////////////////////////////////////////4xjAMQAAAlwAAAAA////////////////////////////////////////////////////////////////////////////////4xjAbAAAAlwAAAAA////////////////////////////////////////////////////////////////////////////////4xjApwAAAlwAAAAA////////////////////////////////////////////////////////////////////////////////4xjA4geAAlwAAAAA////////////////////////////////////////////////////////////////////////////////4xjA/w7AAlwAAAAA////////////////////////////////////////////////////////////////////////////////4xjA/w7AAlwAAAAA////////////////////////////////////////////////////////////////////////////////4xjA/w7AAlwAAAAA////////////////////////////////////////////////////////////////////////////////4xjA/w7AAlwAAAAA////////////////////////////////////////////////////////////////////////////////4xjA/w7AAlwAAAAA////////////////////////////////////////////////////////////////////////////////4xjA/w7AAlwAAAAA////////////////////////////////////////////////////////////////////////////////4xjA/w7AAlwAAAAA////////////////////////////////////////////////////////////////////////////////4xjA/w7AAlwAAAAA/////////////////////////////////////////////////////wAAAAAAAAAAAAAAAAAAAAAAAAD/4xjA/w7AAlwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/4xjA/w7AAlwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/4xjA/w7AAlwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/4xjA/w7AAlwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=');

        const writer = new ID3Writer(arrayBuffer);
        writer
            .setFrame('TIT2', list[i].name || 'Unknown Title') // 标题
            .setFrame('TPE1', [list[i].author || 'Unknown Artist']) // 作者
            .setFrame('TALB', list[i].albumname || 'Unknown Album') // 专辑
            .setFrame('APIC', { // 封面
                type: 3,
                data: coverArrayBuffer,
                description: '',
            });
        writer.addTag();

        const audioBlob = writer.getBlob();

        const dist = JSON.parse(localStorage.getItem("NM_SETTING_CUSTOM")).storage.cachePath;
        const filePath_music = `${dist}\\Cache\\MHYNotRelease_Cache\\${audioId}.${extName}`;

        await betterncm.fs.writeFile(filePath_music, audioBlob);
    }
}

async function checkDownloaded(audioId: any, extName: string) {
    const dist = JSON.parse(localStorage.getItem("NM_SETTING_CUSTOM")).storage.cachePath;
    const fileList = await betterncm.fs.readDir(dist + '\\Cache\\MHYNotRelease_Cache');
    
    const filePath = `${dist}\\Cache\\MHYNotRelease_Cache\\${audioId}.${extName}`;
    
    if (fileList.includes(filePath)) {
        const fileStats = await betterncm.fs.readFile(filePath);
        
        if (fileStats.size < 128000) {
            return false;
        }
        
        return true;
    } else {
        return false;
    }
}

function base64ToArrayBuffer(base64: string): ArrayBuffer {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
}

