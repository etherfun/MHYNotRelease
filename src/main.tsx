import { Config } from "./ui/config";
import { PlayListPage, NoNotReleasePage, NetworkErrorPage, JSONFormatErrorPage, PlayAll, DownloadIcon} from "./ui/page";
import kugou_source from "./source/kugou"
let kugou = new kugou_source()
import { AudioPlayer } from './ui/player';
import { CacheAudio } from './source/cache'

plugin.onConfig(() => {
    const element = document.createElement("div");
    setTimeout(() => {
        ReactDOM.render(<Config />, element);
    }, 1000);
    return element;
})

plugin.onLoad(async () => {
    window.addEventListener("hashchange", async () => {
        if (!window.location.href.includes('12487174')) {
            if (document.getElementById('wonhyle-tab')) document.getElementById('wonhyle-tab').remove();
            if (document.getElementById('mhy-page-root')) document.getElementById('mhy-page-root').remove();
            return;
        }

        await betterncm.utils.waitForElement('.m-yrsh.g-wrap1.q-lrc .u-tab2 ul li');

        (document.querySelector('.p-dtalb.q-lrc.g-wrap5') as HTMLElement).style.display = null;
        (document.querySelector('.j-flag.style.u-stab') as HTMLElement).style.display = null;
        if (document.getElementById('wonhyle-tab')) document.getElementById('wonhyle-tab').remove();
        if (document.getElementById('mhy-page-root')) document.getElementById('mhy-page-root').remove();

        await betterncm.utils.delay(100);

        let womhyle = document.createElement('a');
        womhyle.className = 'j-flxg';
        womhyle.id = 'wheremymhymuisc';
        womhyle.innerText = '未上架歌曲';
        let womhylebtn = document.createElement('li');
        womhylebtn.appendChild(womhyle);
        womhylebtn.id = 'wonhyle-tab';
        document.querySelector('.m-yrsh.g-wrap1.q-lrc .u-tab2 ul li').parentNode.appendChild(womhylebtn);

        const root = document.createElement("div");
        root.id = 'mhy-page-root';
        root.style.display = 'none';
        document.querySelector('.m-yrsh.g-wrap1.q-lrc').appendChild(root);

        const artistTabs = document.querySelector('.m-yrsh.g-wrap1.q-lrc .u-tab2 ul');
        artistTabs.addEventListener("click", event => {
            const targetTabText = event.target as Element;
            artistTabs.querySelectorAll('.j-flxg').forEach(tabText => {
                tabText.classList.remove('z-sel');
            });
            targetTabText.classList.add('z-sel');
            const originalPage = document.querySelector(".m-yrsh.g-wrap1.q-lrc div.q-lrc") as HTMLDivElement;
            if (targetTabText.matches('#wheremymhymuisc')) {
                root.style.display = null;
                originalPage.style.display = 'none';
                (document.querySelector('.j-flag.style.u-stab') as HTMLElement).style.display = 'none';
            } else {
                root.style.display = 'none';
                originalPage.style.display = null;
                (document.querySelector('.j-flag.style.u-stab') as HTMLElement).style.display = null;
            }
        });

        if (kugou.list.length === 0 || kugou.list.includes('已全部上架') || kugou.list.includes('NetworkError') || kugou.list.includes('JSONFormatError')) {
            kugou.list = [];
            kugou.kugou_enter();
        }
        await betterncm.utils.waitForFunction(() => {
            if (kugou.list.includes('已全部上架')) {
                ReactDOM.render(<NoNotReleasePage />, root);
                return true
            } else if (kugou.list.includes('NetworkError')) {
                ReactDOM.render(<NetworkErrorPage ErrorCode = {kugou.list[1].ErrorCode} context = {kugou.list[1].context} />, root);
                return true
            } else if (kugou.list.includes('JSONFormatError')) {
                ReactDOM.render(<JSONFormatErrorPage context = {kugou.list[1].context} />, root);
                return true;
            } else if (kugou.list.length != 0 && !kugou.list.includes('Loading')) {
                ReactDOM.render(<PlayListPage songList = {kugou.list} />, root);
                return true;
            }
        }, 50);
        if (kugou.list.includes('已全部上架') || kugou.list.includes('NetworkError') || kugou.list.includes('JSONFormatError')) return

        document.querySelector('#mhy-page-root .m-plylist.m-plylist-pl2.m-plylist_playlist.m-plylist-sort')
            .addEventListener('click', function (event: MouseEvent) {
                const parent = document.querySelector('#mhy-page-root .m-plylist.m-plylist-pl2.m-plylist_playlist.m-plylist-sort');
                parent.querySelectorAll('.j-item.z-sel').forEach((e) => {
                    e.classList.remove('z-sel');
                });

                const target = (event.target as HTMLElement).closest('li.j-item');
                if (target) {
                    target.classList.add('z-sel');
                }
            });

        document.querySelector('#mhy-page-root .m-plylist.m-plylist-pl2.m-plylist_playlist.m-plylist-sort')
            .addEventListener('dblclick', async function (event: MouseEvent) {
                const target = (event.target as HTMLElement).closest('li.j-item');
                if (!target) return;

                const json = JSON.parse(target.getAttribute('data-songjson'));
                const url = json.url;
                const id = (json.audio_id).toString();
                const albumId = json.album_id;
                const extName = json.extName;
                const index = Number(target.getAttribute('data-number'));
                console.log('MHYNotRelease,当前播放URL&id:' + url, id);
                if (localStorage.getItem('MHYNotRelease-playermode') == 'native') {
                    await CacheAudio([json], albumId, undefined, index);

                    const Path = await betterncm.app.getNCMPath() + '\\cloudmusic.exe'
                    const CachePath = JSON.parse(localStorage.getItem("NM_SETTING_CUSTOM")).storage.cachePath + `\\Cache\\MHYNotRelease_Cache\\${albumId}\\`

                    betterncm.app.exec(`"${Path}" --play="${CachePath}${id}.${extName}"`);//使用cmd播放音乐
                } else {
                    if (document.getElementById('audio-player')) {
                        document.getElementById('audio-player').remove();
                    }
                    const playertarget = document.getElementById('x-g-mn');
                    const playerContainer = document.createElement('div');
                    playertarget.appendChild(playerContainer);
                    root.style.display = null;

                    const songs = kugou.list.find(song => song.album_id === albumId)?.songs;
                    ReactDOM.render(<AudioPlayer url={url} tracks={songs} />, playerContainer);
                }
            });
    });
})
