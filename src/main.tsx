import { Config } from "./ui/config";
import { PlayListPage, NoNotReleasePage, NetworkErrorPage, JSONFormatErrorPage, PlayAll} from "./ui/page";
import kugou_source from "./source/kugou"
let kugou = new kugou_source()
import { AudioPlayer } from './ui/player';
import { CacheAudio, Placeholders } from './source/cache'

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
            if (document.querySelector('.j-flag.style.u-stab.mhynotrelease')) document.querySelector('.j-flag.style.u-stab.mhynotrelease').remove();
            return;
        }

        await betterncm.utils.waitForElement('.m-yrsh.g-wrap1.q-lrc .u-tab2 ul li');

        (document.querySelector('.p-dtalb.q-lrc.g-wrap5') as HTMLElement).style.display = null;
        (document.querySelector('.j-flag.style.u-stab') as HTMLElement).style.display = null;
        if (document.getElementById('wonhyle-tab')) document.getElementById('wonhyle-tab').remove();
        if (document.getElementById('mhy-page-root')) document.getElementById('mhy-page-root').remove();
        if (document.querySelector('.j-flag.style.u-stab.mhynotrelease')) document.querySelector('.j-flag.style.u-stab.mhynotrelease').remove();

        await betterncm.utils.delay(100)

        if (localStorage.getItem('MHYNotRelease-playermode') == 'native') {
            const button = document.createElement('ul');
            button.className = "j-flag style u-stab mhynotrelease"
            button.style.display = 'none'
            document.querySelector('.u-tab2.f-ff2.f-cb').appendChild(button)
            ReactDOM.render(<PlayAll songList={kugou.list} />, button);
        }

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
                (document.querySelector('.j-flag.style.u-stab.mhynotrelease') as HTMLElement).style.display = null;
            } else {
                root.style.display = 'none';
                originalPage.style.display = null;
                (document.querySelector('.j-flag.style.u-stab') as HTMLElement).style.display = null;
                (document.querySelector('.j-flag.style.u-stab.mhynotrelease') as HTMLElement).style.display = 'none';
            }
        });

        if (kugou.list.length === 0 || kugou.list.includes('已全部上架') || kugou.list.includes('NetworkError') || kugou.list.includes('JSONFormatError')) {
            kugou.kugou_enter();
        }
        await betterncm.utils.waitForFunction(() => {
            if (kugou.list.includes('已全部上架')) {
                ReactDOM.render(<NoNotReleasePage />, root);
                return true
            } else if (kugou.list.includes('NetworkError')) {
                ReactDOM.render(<NetworkErrorPage ErrorCode={kugou.list[1].ErrorCode} />, root);
                return true
            } else if (kugou.list.includes('JSONFormatError')) {
                ReactDOM.render(<JSONFormatErrorPage />, root);
                return true;
            } else if (kugou.list.length != 0 && !kugou.list.includes('Loading')) {
                ReactDOM.render(<PlayListPage songList={kugou.list} />, root);
                Placeholders(kugou.list);
                return true
            }
        }, 50);
        if (kugou.list.includes('已全部上架') || kugou.list.includes('NetworkError') || kugou.list.includes('JSONFormatError')) return

        document.querySelector('#mhy-page-root .pl-di.pl-di-1').addEventListener('click', function (event: MouseEvent) {
            const parent = document.querySelector('#mhy-page-root .pl-di.pl-di-1');
            parent.querySelectorAll('.j-item.z-sel').forEach((e) => {
                e.classList.remove('z-sel');
            });
        
            const target = (event.target as HTMLElement).closest('.j-item');
            if (target) {
                target.classList.add('z-sel');
            }
        });

        document.querySelector('#mhy-page-root .pl-di.pl-di-1').addEventListener('dblclick', async function (event: MouseEvent) {
            const target = event.target as HTMLElement;
            const url = target.getAttribute('data-url');
            const id = target.getAttribute('data-id');
            const extName = target.getAttribute('data-extName');
            console.log('MHYNotRelease,当前播放URL&id:' + url, id);
            if (localStorage.getItem('MHYNotRelease-playermode') == 'native') {
                var folder = JSON.parse(localStorage.getItem("NM_SETTING_CUSTOM")).storage.cachePath + '\\Cache\\MHYNotRelease_Cache'
                if (!await betterncm.fs.exists(folder)) await betterncm.fs.mkdir(folder)

                let dataToCache = null;
                for (const item of kugou.list) {
                    if (item['audio_id'] == id) {
                        dataToCache = { id: item.audio_id, ...item };
                        break;
                    }//提取点击目标的json
                }
                await CacheAudio([dataToCache]);

                const Path = await betterncm.app.getNCMPath() + '\\cloudmusic.exe'
                const CachePath = JSON.parse(localStorage.getItem("NM_SETTING_CUSTOM")).storage.cachePath + '\\Cache\\MHYNotRelease_Cache\\'

                betterncm.app.exec(`"${Path}" --play="${CachePath}${id}.${extName}"`);//使用cmd播放音乐
            } else {
                if (document.getElementById('audio-player')) {
                    document.getElementById('audio-player').remove();
                }
                const playertarget = document.getElementById('x-g-mn');
                const playerContainer = document.createElement('div');
                playertarget.appendChild(playerContainer);
                root.style.display = null;
                ReactDOM.render(<AudioPlayer url={url} tracks={kugou.list} />, playerContainer);
            }
        });
    });
})
