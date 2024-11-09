import { ID3Writer } from 'browser-id3-writer';

export const CacheAudio = async (list: any[]) => {
    for (var i = 0; i < list.length; i++) {
        if (await checkDownloaded(list[i].audio_id, list[i].extName)) {
            return
        }
        try {
            var response = await fetch(list[i].url);
            var arrayBuffer = await response.arrayBuffer();
            var coverResponse = await fetch(list[i].cover.replace('orpheus://cache/?', ''));
            var coverArrayBuffer = await coverResponse.arrayBuffer();
            var audioBlob: Blob

            if (list[i].extName == 'mp3') {
                const writer = new ID3Writer(arrayBuffer);//添加元数据
                writer
                    .setFrame('TIT2', list[i].name)//标题
                    .setFrame('TPE1', [list[i].author])//作者
                    .setFrame('TALB', list[i].albumname)//专辑
                    .setFrame('APIC', {
                        type: 3,
                        data: coverArrayBuffer,
                        description: '',
                    })//封面
                writer.addTag();
                audioBlob = writer.getBlob()
            }else{//未来支持flac(找不到支持flac元数据的库了)
            }
                const dist = JSON.parse(localStorage.getItem("NM_SETTING_CUSTOM")).storage.cachePath
                const filePath_muisc = `${dist}\\Cache\\MHYNotRelease_Cache\\${list[i].audio_id}.${list[i].extName}`;
                const filePath_lrc = `${dist}\\Cache\\MHYNotRelease_Cache\\${list[i].audio_id}.lrc`;

                await betterncm.fs.writeFile(filePath_muisc, audioBlob);
                await betterncm.fs.writeFileText(filePath_lrc, list[i].lyric);
        } catch (error) {
            console.error('MHYNotRelease,缓存歌曲失败,', error)
            return
        }
    }
}

async function checkDownloaded(audioId: any, extName: string) {//是否已经缓存
    const dist = JSON.parse(localStorage.getItem("NM_SETTING_CUSTOM")).storage.cachePath
    const fileList = await betterncm.fs.readDir(dist + '\\Cache\\MHYNotRelease_Cache')
    if (fileList.includes(`${dist}\\Cache\\MHYNotRelease_Cache\\${audioId}.${extName}`)) {
        return true
    } else {
        return false
    }
}

