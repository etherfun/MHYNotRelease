import { Config } from "./ui/config";
import {  Playlist }  from "./ui/page";
import kugou_source from "./source/kugou"
let kugou = new kugou_source()
import { AudioPlayer } from './ui/player';
import { NoNotrelease } from "./ui/page";


plugin.onConfig(()=>{
    const element=document.createElement("div");
    setTimeout(() => {
    ReactDOM.render(<Config/>,element);
    }, 4000);
    return element;
})

plugin.onLoad(async()=>{
    window.addEventListener("hashchange", async () => {
        if(window.location.href != "orpheus://orpheus/pub/app.html#/m/artist/?id=12487174"){
            return;
        }

        await betterncm.utils.waitForElement('.m-yrsh.g-wrap1.q-lrc .u-tab2 ul li');
        if(document.getElementById('wonhyle-tab')){
            document.getElementById('wonhyle-tab').remove();
        }
        if(document.getElementById('mhy-page-root')){
            document.getElementById('mhy-page-root').remove();
        }
        
        let womhyle = document.createElement('a');
        womhyle.className = 'text_tab';
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
        artistTabs.addEventListener("click", event=>{
            const targetTabText = event.target as Element;
            womhylebtn.querySelectorAll('.text_tab').forEach(tabText => {
                tabText.classList.remove('z-sel');
            });
            targetTabText.classList.add('z-sel');
            const originalPage = document.querySelector(".m-yrsh.g-wrap1.q-lrc div.q-lrc") as HTMLDivElement;
            if(targetTabText.matches('#wheremymhymuisc')){
                root.style.display = null;
                originalPage.style.display = 'none';
                (document.querySelector('.j-flag.style.u-stab') as HTMLElement).style.display = 'none'
            }else{
                root.style.display = 'none';
                originalPage.style.display = null;
                (document.querySelector('.j-flag.style.u-stab') as HTMLElement).style.display = null
            }
        });

        if(kugou.list.length === 0){
            kugou.kugou_enter()
        }
        await betterncm.utils.delay(3000)
        if(kugou.list.length === 0){
            return console.log("我米哈游首发音乐呢: 无法加载清单")
        }else if(kugou.list.includes('已全部上架')){
           return ReactDOM.render(<NoNotrelease />, root)
        }
        ReactDOM.render(<Playlist songList={kugou.list}/>, root);

        await betterncm.utils.delay(100)
        document.querySelector('#mhy-page-root .pl-di.pl-di-1').addEventListener('click', function(event: MouseEvent) {  
            const target = event.target as HTMLElement;
            const url = target.getAttribute('data-url');
            console.log(url)
            if(document.getElementById('audio-player')){
                document.getElementById('audio-player').remove();
            }
            const playertarget = document.getElementById('x-g-mn')
            const playerContainer = document.createElement('div');
            playertarget.appendChild(playerContainer);
            root.style.display = null;
            ReactDOM.render(<AudioPlayer url={url} tracks={kugou.list} />, playerContainer);
        })
    })
})
