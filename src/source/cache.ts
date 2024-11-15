import { ID3Writer } from 'browser-id3-writer';

interface list {
    albumname: string;
    audio_id: number;
    author: string;
    cover: string;
    extName: string;
    lyric: string;
    name: string;
    originhash: number;
    publish_time: {
        day: number;
        hour: number;
        minute: number;
        second: number;
    };
    time: number;
    url: string;
}

export const CacheAudio = async (list: list) => {

    if (await checkDownloaded(list.audio_id, list.extName)) {
        return
    }
    try {
        var response = await fetch(list.url);
        var arrayBuffer = await response.arrayBuffer();
        var coverResponse = await fetch(list.cover.replace('orpheus://cache/?', ''));
        var coverArrayBuffer = await coverResponse.arrayBuffer();
        var audioBlob: Blob

        if (list.extName == 'mp3') {
            const writer = new ID3Writer(arrayBuffer);//添加元数据
            writer
                .setFrame('TIT2', list.name)//标题
                .setFrame('TPE1', [list.author])//作者
                .setFrame('TALB', list.albumname)//专辑
                .setFrame('APIC', {
                    type: 3,
                    data: coverArrayBuffer,
                    description: '',
                })//封面
            writer.addTag();
            audioBlob = writer.getBlob()
        } else {//未来支持flac(找不到支持flac元数据的库了)
        }
        const dist = JSON.parse(localStorage.getItem("NM_SETTING_CUSTOM")).storage.cachePath
        const filePath_muisc = `${dist}\\Cache\\MHYNotRelease_Cache\\${list.audio_id}.${list.extName}`;
        const filePath_lrc = `${dist}\\Cache\\MHYNotRelease_Cache\\${list.audio_id}.lrc`;

        await betterncm.fs.writeFile(filePath_muisc, audioBlob);
        await betterncm.fs.writeFileText(filePath_lrc, list.lyric);
    } catch (error) {
        console.error('MHYNotRelease,缓存歌曲失败,', error)
        return
    }

}

async function checkDownloaded(audioId: number, extName: string) {//是否已经缓存
    const dist = JSON.parse(localStorage.getItem("NM_SETTING_CUSTOM")).storage.cachePath
    const fileList = await betterncm.fs.readDir(dist + '\\Cache\\MHYNotRelease_Cache')
    if (fileList.includes(`${dist}\\Cache\\MHYNotRelease_Cache\\${audioId}.${extName}`)) {
        return true
    } else {
        return false
    }
}

