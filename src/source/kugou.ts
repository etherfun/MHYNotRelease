import CryptoJS  from 'crypto-js';
export default class kugou_source {

    public  list = []
    async kugou_enter() {//入口 | 获取初始数据
        try {
            var response = await fetch("https://www.kugou.com/yy/?r=singer/album&sid=O34QK0ECB21E3&t="+ Date.now(), {
                method: 'GET',
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Linux; U; Android 11; zh-cn; Redmi K30 Pro Build/RKQ1.200826.002) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/79.0.3945.147 Mobile Safari/537.36 XiaoMi/MiuiBrowser/14.7.10'
                },
            });
            if (!response.ok) {
                throw new Error('网络错误! status: ${response.status}');
            }
            
            var data = await response.json();
            this.getalbum(data);
        } catch (error) {
            console.error('加载专辑失败, Error:', error);
        }
    }
    
    getalbum(data) {//分离过时数据
        const album = [];
        const now = new Date();                                         //你问我这里为什么要这样 我不知道 但是不这样时间对不上
        const sevenAndHalfDaysInMilliseconds = 7.5 * 24 * 60 * 60 * 1000 - 6 * 60 * 60 * 1000;
    
        for(let i = 0; i < data.data.length; i++){
            const publishTime = new Date(data.data[i].publish_time);
            const differenceInTime = now.getTime() - publishTime.getTime();
    
            if(differenceInTime <= sevenAndHalfDaysInMilliseconds && differenceInTime >= 0){
                album.push(data.data[i]);
                album[i].publish_time = this.formatTimeDifference(sevenAndHalfDaysInMilliseconds - differenceInTime);
            }
        }
    
        if(album.length === 0){
            return this.list.push('已全部上架');
        }else{
            this.album2song(album);
        }
    }
    
    private formatTimeDifference(ms) {
        const totalSeconds = Math.floor(ms / 1000);
        const days = Math.floor(totalSeconds / (24 * 60 * 60));
        const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
        const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
        const seconds = totalSeconds % 60;
    
        return {
            day: days >= 0 ? days : 0,
            hour: hours,
            minute: minutes,
            second: seconds,
        };
    }
    
    
    async album2song(data) {//获取详细信息
        //console.log(data)
        var album2list = {album2list:[]}
        for (var i = 0; i < data.length; i++) {
            try {
                var response = await fetch("http://mobilecdn.kugou.com/api/v3/album/song?version=9108&albumid="+ data[i].albumid +"&plat=0&pagesize=100&area_code=1&page=1&with_res_tag=1", { 
                    method: 'GET',
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Linux; U; Android 11; zh-cn; Redmi K30 Pro Build/RKQ1.200826.002) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/79.0.3945.147 Mobile Safari/537.36 XiaoMi/MiuiBrowser/14.7.10'
                    },
                });
                if (!response.ok) {
                    throw new Error('网络错误! status: ${response.status}');
                }
    
                var text = await response.text();  
                var cleanedText = text.replace(/<!--KG_TAG_RES_START-->|<!--KG_TAG_RES_END-->/g, "");  
                var json_data = JSON.parse(cleanedText);  
    
                for (var l = 0; l < json_data.data.info.length; l++) {  
                    if (!album2list.album2list[i]) {  
                        album2list.album2list[i] = { song: [] };  
                    }  
                    if (!album2list.album2list[i].song[l]) {  
                        album2list.album2list[i].song[l] = { info: {} };  
                    }  
      
                    album2list.album2list[i].song[l].info.hash = json_data.data.info[l].hash;  
                    album2list.album2list[i].song[l].info.sqhash = json_data.data.info[l].sqhash;  
                    album2list.album2list[i].song[l].info.hqhash = json_data.data.info[l]["320hash"];  
                    album2list.album2list[i].song[l].info.audio_id = json_data.data.info[l].audio_id;  
                    album2list.album2list[i].song[l].info.album_id = json_data.data.info[l].album_id;  
                    album2list.album2list[i].song[l].info.cover = json_data.data.info[l].trans_param.union_cover;  
                    album2list.album2list[i].song[l].info.name = json_data.data.info[l].filename;  
                    album2list.album2list[i].song[l].info.publish_time = data[i].publish_time;
                    album2list.album2list[i].song[l].info.albumname = data[i].albumname; 
                }  
                
            } catch (error) {
                console.error('提取专辑失败,Error:', error);
            }
        }
        this.getsongurl(album2list)
    }
    
    getsongurl(data) {//url
        var albumsong = { albumlist: [] }
        for (var i = 0; i < data.album2list.length; i++) {
            for (var l = 0; l < data.album2list[i].song.length; l++) {
                if (!albumsong.albumlist[i]) {
                    albumsong.albumlist[i] = { song: [] };
                }
                if (!albumsong.albumlist[i].song[l]) {
                    albumsong.albumlist[i].song[l] = { url: {} };
                }
                albumsong.albumlist[i].song[l].publish_time = data.album2list[i].song[l].info.publish_time
                albumsong.albumlist[i].song[l].name = data.album2list[i].song[l].info.name
                albumsong.albumlist[i].song[l].albumname = data.album2list[i].song[l].info.albumname
                albumsong.albumlist[i].song[l].cover = data.album2list[i].song[l].info.cover
                albumsong.albumlist[i].song[l].audio_id = data.album2list[i].song[l].info.audio_id
                albumsong.albumlist[i].song[l].album_id = data.album2list[i].song[l].info.album_id
                albumsong.albumlist[i].song[l].url.origin = 'http://trackercdn.kugou.com/i/v2/?' +
                                                            'key=' +
                                                            CryptoJS.MD5(data.album2list[i].song[l].info.hash + 'kgcloudv2').toString(CryptoJS.enc.Hex) +
                                                            '&hash=' +
                                                            data.album2list[i].song[l].info.hash +
                                                            '&' +
                                                            'appid=1005&pid=2&cmd=25&behavior=play&album_id=' +
                                                            data.album2list[i].song[l].info.album_id

                albumsong.albumlist[i].song[l].url.sq = 'http://trackercdn.kugou.com/i/v2/?' +
                                                        'key=' +
                                                        CryptoJS.MD5(data.album2list[i].song[l].info.sqhash + 'kgcloudv2').toString(CryptoJS.enc.Hex) +
                                                        '&hash=' +
                                                        data.album2list[i].song[l].info.sqhash +
                                                        '&' +
                                                        'appid=1005&pid=2&cmd=25&behavior=play&album_id=' +
                                                        data.album2list[i].song[l].info.album_id
                albumsong.albumlist[i].song[l].url.hq = 'http://trackercdn.kugou.com/i/v2/?' +
                                                        'key=' +
                                                        CryptoJS.MD5(data.album2list[i].song[l].info.hqhash + 'kgcloudv2').toString(CryptoJS.enc.Hex) +
                                                        '&hash=' +
                                                        data.album2list[i].song[l].info.hqhash +
                                                        '&' +
                                                        'appid=1005&pid=2&cmd=25&behavior=play&album_id=' +
                                                        data.album2list[i].song[l].info.album_id
            }
        }
        this.choose_qu(albumsong)
    }
    
    choose_qu(data){//音质选择
        var quality
        switch(JSON.parse(localStorage.getItem('MHYNotRelease-quantity'))){
            case 128:
                quality = 'origin'
                break
            case 320:
                quality = 'hq'
                break
            case 999:
                quality = 'sq'
                break
            case 1999:
                quality = 'sq'
                break
        }
        for (var i = 0; i < data.albumlist.length; i++) {
            for (var l = 0; l < data.albumlist[i].song.length; l++) {
                var url;
                switch (quality) {
                    case "origin":
                        url = data.albumlist[i].song[l].url.origin;
                        break;
                    case "hq":
                        url = data.albumlist[i].song[l].url.hq;
                        break;
                    case "sq":
                        url = data.albumlist[i].song[l].url.sq;
                        break;
                    default:
                        console.error("音质选择错误");
                        return; 
                }
                data.albumlist[i].song[l].url = url;
            }
        }
        this.list2json(data)
        console.log(data)
    }

    async list2json(data) {
         for (var i = 0; i < data.albumlist.length; i++) {
            for (var l = 0; l < data.albumlist[i].song.length; l++) {
                const parts = data.albumlist[i].song[l].name.split(' - ')
                try {
                    var response = await fetch(data.albumlist[i].song[l].url);
                    if (!response.ok) {
                        throw new Error('网络错误! status: ${response.status}');
                    }
                    
                } catch (error) {
                    console.error('提取歌曲失败,Error:', error);
                }
                var data_get = await response.json()


                var song = {
                    url: data_get.url[0],
                    time: data_get.timeLength,
                    albumname: data.albumlist[i].song[l].albumname,
                    name: parts[1],
                    author: parts[0],
                    cover: ("orpheus://cache/?"+data.albumlist[i].song[l].cover).replace("{size}",'240'),
                    publish_time: data.albumlist[i].song[l].publish_time
                };
 
                 this.list.push(song);  
            }  
        }  
        console.log(this.list)
    }
}
