const Playlist = ({songList}) =>{

    interface PublishTime {
        day: number;
        hour: number;
        minute: number;
        second: number;
      }
      
      const CountdownTimer = ({ initialPublishTime }: { initialPublishTime: PublishTime }) => {
        const [publishTime, setPublishTime] = React.useState<PublishTime>(initialPublishTime);
      
        React.useEffect(() => {
          const timer = setInterval(() => {
            setPublishTime((prevTime) => {
              let { day, hour, minute, second } = prevTime;
      
              if (second > 0) {
                second--;
              } else {
                second = 59;
                if (minute > 0) {
                  minute--;
                } else {
                  minute = 59;
                  if (hour > 0) {
                    hour--;
                  } else {
                    hour = 23;
                    if (day > 0) {
                      day--;
                    }
                  }
                }
              }
      
              return { day, hour, minute, second };
            });
          }, 1000);
      
          return () => clearInterval(timer);
        }, []);
      
        return (
          <div>
            {publishTime.day > 0 && `${publishTime.day}:`}
            {publishTime.hour}:{publishTime.minute}:{publishTime.second}
          </div>
        );
      };

      const formatTimeInSeconds = (seconds) => {  
        const minutes = Math.floor(seconds / 60);  
        const remainingSeconds = seconds % 60;  
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;  
    };
        return (
            <div>
                <div className="m-plylist m-plylist-pl2 m-plylist_playlist m-plylist-sort" tabIndex={1000} id="all-songs-list">
                    <div className="head sort f-cb j-flag">
                        <div className="fix">
                            <div className="th col">
                                <span title="还原默认排序" className="icn-sort-btn">
                                    <a className="j-flag"><i></i></a>
                                    <a className="f-dn z-def j-flag">
                                        <svg className="u-icn u-icn-sort-reset"></svg>
                                    </a>
                                </span>
                            </div>
                            <div className="th col">
                                时间
                                <svg className="u-icn u-icn-sort-hvr"></svg>
                                <svg className="u-icn u-icn-sort"></svg>
                            </div>
                        </div>
                        <div className="flow j-flag">
                            <div className="th col" data-res-action="sort" data-res-field="title">
                                <span>标题 </span>
                            </div>
                            <div className="th col" data-res-action="sort" data-res-field="artist">
                                <span>歌手</span>
                            </div>
                            <div className="th col" data-res-action="sort" data-res-field="album">
                                <span>专辑</span>
                            </div>
                            <div className="th col" data-res-action="sort" data-res-field="duration">
                                <span>预计上架时间</span>
                            </div>
                        </div>
                    </div>
                    <ul className="j-flag">
                        <div id="all-songs-list-wrapper-1" tabIndex={10000}>
                            <div className="lst fixed-scroll-management" id="all-songs-list-wrapper-2">
                                <div className="pl-di pl-di-1">
                                    <ul style={{ counterReset: "tlistorder 0" }}>
                                        {songList.map((song) => (
                                            <li
                                                key={song.url}
                                                className="itm j-item j-impress"
                                                data-res-menu="true"
                                                data-res-type="4"
                                                data-url={song.url}
                                            >
                                                <span
                                                    title=""
                                                    className="td col s-fc4"
                                                    data-url={song.url}
                                                >
                                                    {formatTimeInSeconds(song.time)}
                                                </span>
                                                <div className="flow">
                                                    <div className="td col title" data-url={song.url}>
                                                        <img src={song.cover} className="cover" data-url={song.url} alt="cover" />
                                                        <span className="tit s-fc1" title={song.name} data-url={song.url}>
                                                            {song.name}
                                                        </span>
                                                    </div>
                                                    <div className="td col ellipsis s-fc3 f-pr" title={song.author} data-url={song.url}>
                                                        {song.author}
                                                    </div>
                                                    <div className="td col ellipsis" data-url={song.url}>
                                                        <a className="s-fc3" title={song.albumname} data-url={song.url}>
                                                            {song.albumname}
                                                        </a>
                                                    </div>
                                                    <div className="td col s-fc4" data-url={song.url}>
                                                        <CountdownTimer initialPublishTime={song.publish_time} />
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </ul>
                </div>
                <br/>
                <br/>
                <br/>
            </div>
        );
}

const NoNotrelease = () =>{
  return(
      <div>
          <div className="m-plylist m-plylist-pl2 m-plylist_playlist m-plylist-sort">
              <span style={{
                  marginRight: "10px",
                  marginTop: "10px",
                  marginBottom: "10px",
                  display: "inline-block",
                  verticalAlign: "middle",
                  paddingLeft: "20px",
                  paddingBottom: "20px",
                  color: "var(--md-accent-color-secondary)"
              }}
              >已全部上架</span>
          </div>
          <br />
          <br />
          <br />
      </div>
  )
}

export { NoNotrelease }
export { Playlist }