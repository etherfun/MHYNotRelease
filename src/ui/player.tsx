interface Track {
  url: string;
  name: string;
  cover: string;
  time: number;
  author: string;
  albumname: string;
}

const AudioPlayer = ({ url, tracks }: { url: string; tracks: Track[] }) => {
  const [currentTrackIndex, setCurrentTrackIndex] = React.useState<number>(0);
  const [isPlaying, setIsPlaying] = React.useState<boolean>(true);
  const [progress, setProgress] = React.useState<number>(0);
  const [currentTime, setCurrentTime] = React.useState<string>("0:00");
  const [showCloseButton, setShowCloseButton] = React.useState<boolean>(false);
  const [fadeOut, setFadeOut] = React.useState<boolean>(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  React.useEffect(() => {//上下一首
    const index = tracks.findIndex((track) => track.url === url);
    if (index !== -1) {
      setCurrentTrackIndex(index);
    }
  }, [url, tracks]);
  const nextTrack = () => setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % tracks.length);
  const previousTrack = () => setCurrentTrackIndex((prevIndex) => prevIndex === 0 ? tracks.length - 1 : prevIndex - 1);

  React.useEffect(() => {//播放暂停
    if (audioRef.current) {
      isPlaying ? audioRef.current.play() : audioRef.current.pause();
    }
  }, [isPlaying]);
  const playTrack = () => setIsPlaying(true);
  const pauseTrack = () => setIsPlaying(false);

  React.useEffect(() => {//获取音量
      if (audioRef.current) {
        audioRef.current.volume = JSON.parse(localStorage.getItem('NM_SETTING_PLAYER')).volume
      }
    },[JSON.parse(localStorage.getItem('NM_SETTING_PLAYER')).volume]);

  React.useEffect(() => {//注册SMCT
    const currentTrack = tracks[currentTrackIndex];
    navigator.mediaSession.metadata = new MediaMetadata({
      title: currentTrack.name,
      artist: currentTrack.author,
      album: currentTrack.albumname,
      artwork: [{ src: currentTrack.cover.replace('orpheus://cache/?', '').replace('/240', ''), type: "image/jpeg" }]
    });

      navigator.mediaSession.setActionHandler("play", () => setIsPlaying(true));
      navigator.mediaSession.setActionHandler("pause", () => setIsPlaying(false));
      navigator.mediaSession.setActionHandler("nexttrack", () => setCurrentTrackIndex((prev) => (prev + 1) % tracks.length));
      navigator.mediaSession.setActionHandler("previoustrack", () => setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length));
  }, [currentTrackIndex, tracks]);

  React.useEffect(() => {//显示位置
    const audioPlayer = document.querySelector('#audio-player') as HTMLElement;
    if (!audioPlayer) return
      
    if (localStorage.getItem('MHYNotRelease-left0rright') == 'right') {
      if (document.body.classList.contains('floating-bottombar')) {
        audioPlayer.style.right = 'calc(50vw - var(--bottombar-width)/2)'
        audioPlayer.style.left = null
      } else {
        audioPlayer.style.right = 'calc(15px + var(--extra-pos-margin, 0px))'
        audioPlayer.style.left = null
      }
    } else {
      if (document.body.classList.contains('floating-bottombar')) {
        audioPlayer.style.right = null
        audioPlayer.style.left = 'max(calc(var(--leftbar-width, 199px) + 15px + var(--extra-pos-margin, 0px)), calc(50vw - var(--bottombar-width)/2))'
      } else {
        audioPlayer.style.right = null
        audioPlayer.style.left = 'calc(var(--leftbar-width, 199px) + 15px + var(--extra-pos-margin, 0px))'
      }
    }


    if (localStorage.getItem('MHYNotRelease-bottom0rtop') == 'bottom') {
      audioPlayer.style.bottom = 'calc(var(--bottombar-height, 72px) + var(--bottombar-elevation, 0px) + 15px)'
      audioPlayer.style.top = null
    } else {
      audioPlayer.style.bottom = null
      audioPlayer.style.top = '75px'
    }


    if (localStorage.getItem('MHYNotRelease-opacity') == 'true') {
      audioPlayer.style.background = 'rgba(var(--md-accent-color-bg-rgb, var(--ncm-fg-rgb)),' + opacitycss() + ')'
      audioPlayer.style.backdropFilter = 'blur(' + blurcss() + 'px)'
    } else {
      audioPlayer.style.background = 'rgba(var(--md-accent-color-bg-rgb, var(--ncm-fg-rgb)),1)'
      audioPlayer.style.backdropFilter = null
    }

  }, [localStorage.getItem('MHYNotRelease-opacity'), localStorage.getItem('MHYNotRelease-bottom0rtop'), localStorage.getItem('MHYNotRelease-left0rright')]);

  const handleTimeUpdate = () => {//播放时间
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      setProgress((current / tracks[currentTrackIndex].time) * 100);
      setCurrentTime(formatTime(current));
    }
  };
  const handleSeek = (event) => {
    if (audioRef.current) {
      const rect = event.target.getBoundingClientRect();
      const seekTime = ((event.clientX - rect.left) / rect.width) * tracks[currentTrackIndex].time;
      audioRef.current.currentTime = seekTime;
      setProgress((seekTime / tracks[currentTrackIndex].time) * 100);
    }
  };
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };
  const currentTrack = tracks[currentTrackIndex];
  const totalTime = formatTime(currentTrack.time);

  const handleMouseEnter = () => {//关闭按钮及相关逻辑
    setShowCloseButton(true);
    setFadeOut(false);
  };
  const handleMouseLeave = () => {
      setFadeOut(true);
  };
  const handleClose = () => {
    pauseTrack();
    navigator.mediaSession.metadata = null;
    navigator.mediaSession.setActionHandler("play", null);
    navigator.mediaSession.setActionHandler("pause", null);
    navigator.mediaSession.setActionHandler("nexttrack", null);
    navigator.mediaSession.setActionHandler("previoustrack", null);
    document.querySelector('#audio-player').remove();
  };

  const blurcss = () =>{//获取css样式表(兼容相关插件
    if(localStorage.getItem("LyricBarBlurSettings")){
      var css = JSON.parse(localStorage.getItem("LyricBarBlurSettings")).blur
      return css
    }else{
      return 5
    }
  }
  const buttoncss = () => {
    return {
      color: 'var(--md-accent-color-secondary)',
      background: 'rgba(var(--md-accent-color-secondary-rgb), 0.4)',
      borderRadius: '5px',
      border: 'none',
      margin: '0 5px'
    }
  }
  const opacitycss = () =>{
    if(localStorage.getItem("LyricBarBlurSettings")){
      var css = JSON.parse(localStorage.getItem("LyricBarBlurSettings")).bgTrans
      return css
    }else{
      return 0.4
    }
    
  }
  const bgcss = () =>{
    if(document.body.classList.contains('material-you-theme')){
      return 'var(--md-accent-color)'
    }else{
      return 'var(--themePlay)'
    }
  }

  return (
    <div
      id="audio-player"
      style={{
        position: 'fixed',
        borderRadius: '12px',
        boxShadow: '0 0 10px rgba(0,0,0,0.5)',
        zIndex: 70,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: "var(--md-accent-color-secondary)",
        overflow: "hidden",
        backdropFilter: 'blur('+ blurcss() +'px)',
        width: 'auto',
        background: 'rgba(var(--md-accent-color-bg-rgb, var(--ncm-fg-rgb)), 0.4)',
        height: 'auto'
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showCloseButton && (
        <button title="暂停音乐并关闭此窗口"
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            border: 'none',
            borderRadius: '50%',
            width: '15px',
            height: '15px',
            background: 'rgba(var(--md-accent-color-secondary-rgb),'+ opacitycss()/10 +')',
            color: 'var(--md-accent-color-secondary)',
            transition: 'opacity 2s',
            opacity: fadeOut ? 0 : 1,
            cursor: 'pointer',
            backdropFilter: 'blur(5px)',
          }}>
          ×
        </button>
      )}
      
      <div className="fullplayerbar"
        onClick={handleSeek}
        style={{
          width: '100%',
          height: '5px',
          background: 'linear-gradient(0deg, rgba(var(--md-accent-color-rgb), 0.15), rgba(var(--md-accent-color-rgb),' + opacitycss()/10 + ')',
          cursor: 'pointer',
          borderRadius: '2px',
          marginBottom: '8px'
        }}>
        <div className="playerbar"
          style={{
            width: `${progress}%`,
            height: '100%',
            background: bgcss(),
            borderRadius: '2px',
          }}
        />
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        padding: '0 5px 10px 10px'
      }}>
        <img
          src={currentTrack.cover}
          alt={currentTrack.name}
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '8px',
            marginRight: '10px',
            marginLeft: '10px'
          }}
        />
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}>
          <div>
            <h3 style={{ fontSize: '1.3em' }}>{currentTrack.name}</h3>
            <p style={{ fontSize: '1em' }}>{currentTrack.author}</p>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'center'
          }}>
            <span style={{ width: '40px', textAlign: 'center' }}>{currentTime}</span>
            <button
              onClick={previousTrack}
              style={buttoncss()}
            >
              上一首
            </button>
            {isPlaying ? (
              <button
                onClick={pauseTrack}
                style={buttoncss()}
              >
                暂停
              </button>
            ) : (
              <button
                onClick={playTrack}
                style={buttoncss()}
              >
                播放
              </button>
            )}
            <button
              onClick={nextTrack}
              style={buttoncss()}
            >
              下一首
            </button>
            <span style={{ width: '40px', textAlign: 'center' }}>{totalTime}</span>
          </div>
        </div>
      </div>
      <audio
        ref={audioRef}
        src={currentTrack.url}
        onEnded={nextTrack}
        onTimeUpdate={handleTimeUpdate}
        autoPlay
      />
    </div>
  );
};

export { AudioPlayer } ;
