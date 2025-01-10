import { ID3Writer } from 'browser-id3-writer';
import { TipComponent, DownloadIcon } from '../ui/page';
import { getUrl } from './kugou';

interface AlbumList {
    album_id: string;
    songs: songs[];
};

interface songs {
    originhash: string
    extName: string;
    url: string;
    time: number;
    albumname: string;
    name: string;
    author: string;
    cover: string;
    publish_time: string;
    album_id: string;
    audio_id: string;
};

export async function CacheAudioList(list: AlbumList[]) {
    const dist = JSON.parse(localStorage.getItem("NM_SETTING_CUSTOM")).storage.cachePath;

    for (let albumIndex = 0; albumIndex < list.length; albumIndex++) {
        const album = list[albumIndex];
        const songs = album.songs;

        await CacheAudio(songs, album.album_id, dist);
    }
}

export async function CacheAudio(
    songs: songs[],
    album_id: string,
    dist: string = JSON.parse(localStorage.getItem("NM_SETTING_CUSTOM")).storage.cachePath,
    songIndex: number = 1
) {
    const folder = JSON.parse(localStorage.getItem("NM_SETTING_CUSTOM")).storage.cachePath + `\\Cache\\MHYNotRelease_Cache\\${album_id}\\`
    if (!await betterncm.fs.exists(folder)) await betterncm.fs.mkdir(folder);

    for (let i = 0, e = 1; i < songs.length; i++, songIndex++) {

        const song = songs[i];
        const filePath_muisc = `${dist}\\Cache\\MHYNotRelease_Cache\\${album_id}\\${song.audio_id}.${song.extName}`;
        const filePath_lrc = `${dist}\\Cache\\MHYNotRelease_Cache\\${album_id}\\${song.audio_id}.lrc`;

        if (await checkDownloaded(filePath_muisc)) {
            continue;
        }

        try {
            let audioBlob: Blob;
            let coverArrayBuffer: ArrayBuffer;
            const response = await fetch(await getUrl(song.url));
            let arrayBuffer = await response.arrayBuffer();
            const coverResponse = await fetch(song.cover.replace('orpheus://cache/?', ''));
            coverArrayBuffer = await coverResponse.arrayBuffer();
            if (!(response.ok && coverResponse.ok)) return;

            if (song.extName === 'mp3') {
                const writer = new ID3Writer(arrayBuffer);
                writer
                    .setFrame('TIT2', song.name) // 标题
                    .setFrame('TPE1', [song.author]) // 作者
                    .setFrame('TALB', song.albumname) // 专辑
                    .setFrame('TRCK', songIndex.toString()) // 序号
                    .setFrame('APIC', { // 封面
                        type: 3,
                        data: coverArrayBuffer,
                        description: '',
                    })
                writer.addTag();
                audioBlob = writer.getBlob();
            } else {//未来支持flac(找不到支持flac元数据的库了)
            }

            if (!await betterncm.fs.exists(filePath_lrc) || await betterncm.fs.readFileText(filePath_lrc) == '') {
                betterncm.fs.writeFileText(filePath_lrc, await getlyric(song));
            }
            
            const target = document.querySelector(`li[data-songid='${song.audio_id}']`);
            if (await betterncm.fs.writeFile(filePath_muisc, audioBlob) && target && !target.querySelector('span .td.col.s-fc4')) {
                const addDownloadIcon = document.createElement('span');
                addDownloadIcon.className = 'td col s-fc4';
                ReactDOM.render(<DownloadIcon />, addDownloadIcon);
                target.prepend(addDownloadIcon);
            }

            if (songs.length !== 1) betterncm.utils.delay(Math.random() * 500);
        } catch (error) {
            console.error('MHYNotRelease, 缓存歌曲失败,', error);

            const tipContainer = document.createElement('div');
            document.body.appendChild(tipContainer);
            ReactDOM.render(<TipComponent message={`缓存歌曲失败, 已累计${e}次`} />, tipContainer);
            e++;

            setTimeout(() => {
                ReactDOM.unmountComponentAtNode(tipContainer);
                document.body.removeChild(tipContainer);
            }, 2000);
        }
    }
    return true;
}

export async function checkDownloaded(audioPath: string) {
    const file = await betterncm.fs.readFile(audioPath);
    if (file.size < 128000) {
        return false;
    }

    return true;
}

async function getlyric(list) {
    try {
        var response_key = await fetch(`https://krcs.kugou.com/search?ver=1&man=yes&client=mobi&keyword=&duration=&hash=${list.originhash}`);
        if (!response_key.ok) {
            throw new Error('网络错误! status:' + `${response_key.status}`);
        }
        var getlyric = await response_key.json();

        await betterncm.utils.delay(500)
        var response = await fetch(`http://lyrics.kugou.com/download?ver=1&client=pc&id=${getlyric.candidates[0].id}&accesskey=${getlyric.candidates[0].accesskey}&fmt=lrc&charset=utf8`);
        if (!response.ok) {
            throw new Error('网络错误! status:' + `${response.status}`);
        }
        var lyricraw = await response.json();

        var lyric = decodeURIComponent(escape(atob(lyricraw.content)));
    } catch (error) {
        console.error('MHYNotRelease,提取歌词失败,', error);
        var lyric = '';
    }

    return lyric;
}