import CryptoJS from 'crypto-js';

interface SongInfo {
    origin_hash: string;
    hash: string;
    sqhash: string;
    hqhash: string;
    audio_id: number;
    album_id: number;
    cover: string;
    filename: string;
    publish_time: string;
    albumname: string;
    trans_param: {
        union_cover: string;
    }
    duration: number;
};

export default class kugou_source {
    public list = [];
    private infolist = [];

    public async kugou_enter() {//入口 | 获取初始数据
        try {
            var response = await fetch("https://www.kugou.com/yy/?r=singer/album&sid=O34QK0ECB21E3&t=" + Date.now());
            if (!response.ok) {
                throw new Error('网络错误! status:' + `${response.status}`);
            }

            var data = await response.json();
            this.getalbum(data);
        } catch (error) {
            this.list.push('NetworkError');
            this.list.push({ ErrorCode: `${response.status}` });
            this.list.push({ context: `获取初始数据错误, ${error}` });
            console.error('MHYNotRelease,获取初始数据错误,', error);
            return
        }
    }

    private getalbum(data) {//分离过时数据
        const album = [];
        const now = new Date();                                         //你问我这里为什么要这样 我不知道 但是不这样时间对不上
        const sevenAndHalfDaysInMilliseconds = 7.5 * 24 * 60 * 60 * 1000 - 8 * 60 * 60 * 1000;

        try {
            for (let i = 0; i < data.data.length; i++) {
                const publishTime = new Date(data.data[i].publish_time);
                const differenceInTime = now.getTime() - publishTime.getTime();

                if (differenceInTime <= sevenAndHalfDaysInMilliseconds && differenceInTime >= 0) {
                    album.push(data.data[i]);
                    album[i].publish_time = data.data[i].publish_time;
                    this.infolist.push({
                        albumid: data.data[i].albumid,
                        album_name: data.data[i].albumname,
                        singername: data.data[i].singername,
                        coverurl: data.data[i].img,
                        publish_time: data.data[i].publish_time,
                    });
                }
            }
        } catch (error) {
            this.list.push('JSONFormatError');
            this.list.push({ context: `分离过时数据错误, ${error}` + ' 与预期json文件结构不一致' });
            console.error('MHYNotRelease,分离过时数据错误, Error:与预期json文件结构不一致');
            return
        }

        if (album.length === 0) {
            return this.list.push('已全部上架');
        } else {
            this.album2song(album);
        }
    }

    private async album2song(data) {//获取详细信息
        const cacheFilePath = JSON.parse(localStorage.getItem("NM_SETTING_CUSTOM")).storage.cachePath + '\\Cache\\MHYNotRelease_Cache\\MHYNotRelease.json';
        if (await betterncm.fs.exists(cacheFilePath)) {
            const file = JSON.parse(await betterncm.fs.readFileText(cacheFilePath));

            if (file.length == data.length) {
                const allEqual = data.every((item, index) => item.albumid == file[index]?.album_id);
                if (allEqual) {
                    this.list = [...file];
                    return;
                }
            }
        }

        let album2list = []
        for (let i = 0; i < data.length; i++) {
            try {
                let page = 1;
                let allSongs: SongInfo[] = [];

                do {
                    var response = await fetch(`http://mobilecdn.kugou.com/api/v3/album/song?version=9108&albumid=${data[i].albumid}&plat=0&pagesize=100&area_code=1&page=${page}&with_res_tag=1`);

                    if (!response.ok) {
                        throw new Error('网络错误! status:' + `${response.status}`);
                    }

                    const text = await response.text();
                    const cleanedText = text.replace(/<!--KG_TAG_RES_START-->|<!--KG_TAG_RES_END-->/g, "");
                    const json_data = JSON.parse(cleanedText).data.info;

                    allSongs.push(...json_data);

                    if (json_data.length < 100) {
                        break;
                    }
                    await betterncm.utils.delay(500);
                    page++;

                } while (true);

                try {
                    for (let l = 0; l < allSongs.length; l++) {
                        if (!album2list[i]) {
                            album2list[i] = { song: [] };
                        }
                        if (!album2list[i].song[l]) {
                            album2list[i].song[l] = { info: {} };
                        }

                        album2list[i].song[l].info.hash = allSongs[l].hash;
                        album2list[i].song[l].info.sqhash = allSongs[l].sqhash;
                        album2list[i].song[l].info.hqhash = allSongs[l]["320hash"];
                        album2list[i].song[l].info.audio_id = `${allSongs[l].audio_id}`;
                        album2list[i].song[l].info.album_id = allSongs[l].album_id;
                        album2list[i].song[l].info.cover = allSongs[l].trans_param.union_cover;
                        album2list[i].song[l].info.name = allSongs[l].filename;
                        album2list[i].song[l].info.publish_time = data[i].publish_time;
                        album2list[i].song[l].info.albumname = data[i].albumname;
                        album2list[i].song[l].info.timeLength = allSongs[l].duration;
                    }
                } catch (error) {
                    this.list.push('JSONFormatError');
                    this.list.push({ context: `获取歌曲数据错误, ${error}` + ' 与预期json文件结构不一致' });
                    console.error('MHYNotRelease,获取歌曲数据错误, Error:与预期json文件结构不一致');
                    return
                }
            } catch (error) {
                this.list.push('NetworkError');
                this.list.push({ ErrorCode: `${response.status}` });
                this.list.push({ context: `提取专辑失败, ${error}` });
                console.error('MHYNotRelease,提取专辑失败,', error);
                return
            }
        }
        this.getsongurl(album2list)
    }

    private getsongurl(data) {//url
        let albumsong = []

        try {
            for (let i = 0; i < data.length; i++) {
                for (let l = 0; l < data[i].song.length; l++) {
                    if (!albumsong[i]) {
                        albumsong[i] = { song: [] };
                    }
                    if (!albumsong[i].song[l]) {
                        albumsong[i].song[l] = { url: {}, hash: {} };
                    }

                    albumsong[i].song[l].publish_time = data[i].song[l].info.publish_time;
                    albumsong[i].song[l].name = data[i].song[l].info.name;
                    albumsong[i].song[l].albumname = data[i].song[l].info.albumname;
                    albumsong[i].song[l].cover = data[i].song[l].info.cover;
                    albumsong[i].song[l].audio_id = data[i].song[l].info.audio_id;
                    albumsong[i].song[l].album_id = data[i].song[l].info.album_id;
                    albumsong[i].song[l].url.origin = `http://trackercdn.kugou.com/i/v2/?key=${CryptoJS.MD5(data[i].song[l].info.hash + 'kgcloudv2').toString(CryptoJS.enc.Hex)}&hash=${data[i].song[l].info.hash}&appid=1005&pid=2&cmd=25&behavior=play&album_id=${data[i].song[l].info.album_id}`;
                    albumsong[i].song[l].url.sq = `http://trackercdn.kugou.com/i/v2/?key=${CryptoJS.MD5(data[i].song[l].info.sqhash + 'kgcloudv2').toString(CryptoJS.enc.Hex)}&hash=${data[i].song[l].info.sqhash}&appid=1005&pid=2&cmd=25&behavior=play&album_id=${data[i].song[l].info.album_id}`;
                    albumsong[i].song[l].url.hq = `http://trackercdn.kugou.com/i/v2/?key=${CryptoJS.MD5(data[i].song[l].info.hqhash + 'kgcloudv2').toString(CryptoJS.enc.Hex)}&hash=${data[i].song[l].info.hqhash}&appid=1005&pid=2&cmd=25&behavior=play&album_id=${data[i].song[l].info.album_id}`;
                    albumsong[i].song[l].hash.hash = data[i].song[l].info.hash;
                    albumsong[i].song[l].hash.hqhash = data[i].song[l].info.hqhash;
                    albumsong[i].song[l].hash.sqhash = data[i].song[l].info.hqhash;
                    albumsong[i].song[l].timeLength = data[i].song[l].info.timeLength;
                }
            }
        } catch (error) {
            this.list.push('JSONFormatError');
            this.list.push({ context: `获取歌曲URL错误, ${error}` + ' 与预期json文件结构不一致' });
            console.error('MHYNotRelease,获取歌曲URL错误, Error:与预期json文件结构不一致');
            return
        }
        this.list2json(albumsong)
    }

    private async list2json(data) {
        const albumMap = {};

        for (let i = 0; i < data.length; i++) {
            for (let l = 0; l < data[i].song.length; l++) {
                const parts = data[i].song[l].name.split(' - ');

                try {
                    var song = {
                        hash: data[i].song[l].hash.hash,
                        url: data[i].song[l].url,
                        time: data[i].song[l].timeLength,
                        albumname: data[i].song[l].albumname,
                        name: parts[1],
                        author: parts[0],
                        cover: ("orpheus://cache/?" + data[i].song[l].cover).replace("{size}", '240'),
                        publish_time: data[i].song[l].publish_time,
                        album_id: data[i].song[l].album_id,
                        audio_id: data[i].song[l].audio_id
                    };
                } catch (error) {
                    this.list.push('JSONFormatError');
                    this.list.push({ context: `扁平化歌曲信息错误, ${error}` + ' 与预期json文件结构不一致' });
                    console.error('MHYNotRelease,扁平化歌曲信息错误, Error:与预期json文件结构不一致');
                    return;
                }

                if (!albumMap[song.album_id]) {
                    albumMap[song.album_id] = [];
                }
                albumMap[song.album_id].push(song);
                await betterncm.utils.delay(50);
            }
        }

        if (!this.list.includes('Loading')) this.list.push('Loading');
        for (const album_id in albumMap) {
            const albumInfo = this.infolist.find(info => info.albumid == album_id);

            this.list.push({
                album_id: album_id,
                songs: albumMap[album_id],
                album_name: albumInfo?.album_name,
                singername: albumInfo?.singername,
                coverurl: albumInfo?.coverurl,
                publish_time: albumInfo?.publish_time,
            });
        }

        this.list.shift();
        this.list.reverse();

        const folder = JSON.parse(localStorage.getItem("NM_SETTING_CUSTOM")).storage.cachePath + '\\Cache\\MHYNotRelease_Cache';
        if (!await betterncm.fs.exists(folder)) await betterncm.fs.mkdir(folder);
        const path = `${folder}\\MHYNotRelease.json`;
        await betterncm.fs.writeFile(path, JSON.stringify(this.list));
        console.log('MHYNotRelease,已获取清单:', this.list);
    }
}

export async function getUrl(allUrl = {} as { origin: string, hq: string, sq: string }) {
    let url = '';
    switch (localStorage.getItem('MHYNotRelease-quantity')) {
        case "128":
            url = allUrl.origin;
            break;
        case "320":
            url = allUrl.hq;
            break;
        case "999":
            url = allUrl.sq;
            if (JSON.parse(localStorage.getItem('MHYNotRelease-playermode')) !== 'plugin') url = allUrl.hq;
            break;
        case "1999":
            url = allUrl.sq;
            if (JSON.parse(localStorage.getItem('MHYNotRelease-playermode')) !== 'plugin') url = allUrl.hq;
            break;
        default:
            url = allUrl.origin;
    }
    try {
        var response = await fetch(url);
        var json = await response.json();
        if (!response.ok) {
            throw new Error('网络错误! status:' + `${response.status}`);
        }
    } catch (error) {
        console.error('MHYNotRelease,提取歌曲失败,', error);
        return;
    }
    return json.url[0];
}
