import { CacheAudio, CacheAudioList, checkDownloaded } from "../source/cache";

export const PlayListPage = ({ songList }) => {
    const sevenAndHalfDaysInMilliseconds = 7.5 * 24 * 60 * 60 * 1000 - 8 * 60 * 60 * 1000;
    const path = JSON.parse(localStorage.getItem("NM_SETTING_CUSTOM")).storage.cachePath + '\\Cache\\MHYNotRelease_Cache\\'

    interface PublishTime {
        day: number;
        hour: number;
        minute: number;
        second: number;
        str?: string;
    }

    const formatTimeDifference = (ms) => {
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

    const CountdownTimer = ({ initialPublishTime }: { initialPublishTime: PublishTime }) => {//预计时间计算
        const [publishTime, setPublishTime] = React.useState<PublishTime>(initialPublishTime);
        React.useEffect(() => {
            const timer = setInterval(() => {
                setPublishTime((prevTime) => {
                    let { day, hour, minute, second, str = "已上架(应该)" } = prevTime;
                    if (second == 0 && minute == 0 && hour == 0 && day == 0) {
                    } else if (second > 0) {
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

                    return { day, hour, minute, second, str };
                });
            }, 1000);

            return () => clearInterval(timer);
        }, []);

        return (
            <div>
                {publishTime.day > 0 ? `${publishTime.day}:` : ""}
                {(publishTime.day > 0 || publishTime.hour > 0) ? `${publishTime.hour}:` : ""}
                {(publishTime.day > 0 || publishTime.hour > 0 || publishTime.minute > 0) ? `${publishTime.minute}:` : ""}
                {(publishTime.day > 0 || publishTime.hour > 0 || publishTime.minute > 0 || publishTime.second > 0) ? `${publishTime.second}` : ""}
                {(publishTime.day == 0 && publishTime.hour == 0 && publishTime.minute == 0 && publishTime.second == 0) ? `${publishTime.str}` : ""}
            </div>
        );
    };

    const formatTimeInSeconds = (seconds) => {//歌曲时长计算
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const [expandedAlbums, setExpandedAlbums] = React.useState<Record<string, boolean>>({});
    const toggleExpand = (album_id: string) => {
        setExpandedAlbums((prev) => ({
            ...prev,
            [album_id]: !prev[album_id]
        }));
    };

    const DownloadIcon = ({ path, id }: { path: string, id: string }) => {
        const [isDownloaded, setIsDownloaded] = React.useState(false);
        const checkDownloadStatus = async () => {
            const target = document.querySelector(`li[data-songid='${id}']`);
            if (target) {
              const check = !target.querySelector('.td.col.s-fc4 span');
              if (check) {
                const result = await checkDownloaded(path);
                setIsDownloaded(result);
              }
            }
          };
        
          React.useEffect(() => {
            const timeout = setTimeout(() => {
              checkDownloadStatus();
            }, 100);
        
            return () => clearTimeout(timeout);
          }, [path, id]);

        return (isDownloaded ?
            <span className="td col s-fc4">
                <span className="z-off ico" style={{ margin: "0px" }}>
                    <span className="u-icn u-icn-dld_ok">
                        <svg>
                            <use xlinkHref="orpheus://orpheus/style/res/svg/icon.sp.svg#download_draw"></use>
                        </svg>
                    </span>
                </span>
            </span> : null);
    };

    const css = (cover: boolean) => {
        if (localStorage.getItem('MHYNotRelease-cover') == 'true') {
            if (cover) {
                return {
                    position: 'absolute' as 'absolute',
                    width: 'var(--cover-size, 32px)',
                    height: 'var(--cover-size, 32px)',
                    borderRadius: '6px'
                }
            } else {
                return {
                    marginLeft: 'calc(var(--cover-size, 32px) + 10px)'
                }
            }
        } else {
            if (cover) {
                return {
                    display: 'none'
                }
            } else {
                return {
                }
            }
        }
    }

    return (
        <div className="m-plylist m-plylist-pl2 m-plylist_playlist m-plylist-sort">
            {songList.map((album) => (
                <div key={album.album_id}
                    className="album-section"
                >
                    <div className="album_info"
                        style={{
                            display: 'flex',
                            alignItems: 'flex-end',
                            marginBottom: '15px',
                            marginLeft: '20px'
                        }}
                    >
                        <div
                            className="u-cover u-cover-mix u-cover-alb f-fl"
                            style={{
                                borderRadius: '10px',
                                width: '150px',
                                height: '150px',
                                marginRight: '20px'
                            }}
                        >
                            <img
                                className="real"
                                src={album.coverurl}
                                alt={album.album_name}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: '10px',
                                    objectFit: 'cover'
                                }}
                            />
                        </div>

                        <div
                            className="album-details"
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-end',
                                height: '100%',
                                marginLeft: '10px',
                                color: 'var(--md-accent-color)',
                            }}
                        >
                            <span style={{ fontSize: '2em' }}>{album.album_name}</span>
                            <span style={{ fontSize: '1.5em' }}>{album.singername}</span>
                            <span style={{ fontSize: '1em' }}>{album.publish_time}  共 {album.songs.length} 首</span>
                            <br />
                            <span
                                title={"预计上架时间根据首发时间计算\n一般为七天后上架"}
                                style={{ fontSize: '1em' }}>预计上架时间
                                <br />
                                <CountdownTimer initialPublishTime={formatTimeDifference(sevenAndHalfDaysInMilliseconds - (new Date().getTime() - new Date(album.publish_time).getTime()))} />
                            </span>
                            <PlayAll songList={album.songs} ablumid={album.album_id} />
                        </div>
                    </div>

                    <div className="head sort f-cb j-flag">
                        <div className="fix">
                            <div className="th col">
                                <span className="icn-sort-btn">
                                    <a className="j-flag"><i></i></a>
                                    <a className="f-dn z-def j-flag">
                                        <svg className="u-icn u-icn-sort-reset"></svg>
                                    </a>
                                </span>
                            </div>
                            <div className="th col">
                                已缓存
                            </div>
                        </div>
                        <div className="flow j-flag">
                            <div className="th col">
                                <span>标题 </span>
                            </div>
                            <div className="th col">
                                <span>歌手</span>
                            </div>
                            <div className="th col">
                                <span>专辑</span>
                            </div>
                            <div className="th col">
                                <span>时间</span>
                            </div>
                        </div>
                    </div>

                    <ul className="j-flag">
                        <div id="all-songs-list-wrapper-1">
                            <div className="lst fixed-scroll-management" id="all-songs-list-wrapper-2">
                                <ul style={{ counterReset: "tlistorder 0" }}>
                                    {album.songs
                                        .slice(0, expandedAlbums[album.album_id] ? album.songs.length : 10)
                                        .map((song, index) => (
                                            <li
                                                data-number={index + 1}
                                                key={song.audio_id}
                                                data-songid={song.audio_id}
                                                className="itm j-item j-impress"
                                                data-songjson={JSON.stringify(song)}
                                            >
                                                <DownloadIcon path={path + `${song.album_id}\\${song.audio_id}.${song.extName}`} id={song.audio_id} />
                                                <div className="flow">
                                                    <div className="td col title">
                                                        <img
                                                            src={localStorage.getItem('MHYNotRelease-cover') == 'true' ? song.cover : ''}
                                                            className="cover"
                                                            alt="cover"
                                                            style={css(true)}
                                                        />
                                                        <span
                                                            className="tit s-fc1"
                                                            title={song.name}
                                                            style={css(false)}
                                                        >
                                                            {song.name}
                                                        </span>
                                                    </div>
                                                    <div
                                                        className="td col ellipsis s-fc3 f-pr"
                                                        title={song.author}
                                                    >
                                                        {song.author}
                                                    </div>
                                                    <div className="td col ellipsis">
                                                        <a
                                                            className="s-fc3"
                                                            title={song.albumname}
                                                        >
                                                            {song.albumname}
                                                        </a>
                                                    </div>
                                                    <div className="td col s-fc4">
                                                        {formatTimeInSeconds(song.time)}
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                </ul>
                                {album.songs.length > 10 && (
                                    <div
                                        className="show-more"
                                        style={{
                                            width: 'max-content',
                                            cursor: 'pointer',
                                            margin: '10px',
                                            alignItems: 'flex-end',
                                            marginLeft: 'auto',
                                            marginRight: '5%',
                                            color: 'var(--md-accent-color)'
                                        }}
                                        onClick={() => toggleExpand(album.album_id)}
                                    >
                                        {expandedAlbums[album.album_id] ? '收起' : `显示全部 ${album.songs.length} 首`}
                                    </div>
                                )}
                            </div>
                        </div>
                    </ul>
                    <br />
                    <br />
                </div>
            ))}
        </div>
    );
}

export const PlayAll = ({ songList, ablumid}: { songList: any[], ablumid?: string }) => {
    const play = () => {
            CacheAudio(songList, ablumid, undefined);
    }

    const path = () => {
            return (JSON.parse(localStorage.getItem("NM_SETTING_CUSTOM")).storage.cachePath + `\\Cache\\MHYNotRelease_Cache\\${ablumid}`).toLowerCase();
    }

    return (
        <div
            className="u-ibtn5b u-ibtn5b-new j-oper"
            style={{ width: 'max-content', marginTop: '10px' }}
        >
            <span
                className="u-ibtn5 u-ibtn5-new u-ibtn5-ply"
                title={`替换播放列表播放 | 播放顺序可能混乱\n第一次加载歌曲数量过多时加载音频文件可能会长达数分钟\n请耐心等待后再点击一次或多次`}

                data-res-action="play"
                data-res-type="28"
                data-log-action="playall"
                data-log-source="local"
                data-action="play"
                data-res-data={path()}
                data-res-from="-3"
                onClick={play}
            >
                <svg>
                    <use xlinkHref="orpheus://orpheus/style/res/svg/icon.sp.svg#btn_play_sml"></use>
                </svg>播放全部
            </span>
            <span
                className="u-ibtn5 u-ibtn5-new u-ibtn5-only u-ibtn5-addto"
                title={`添加全部到播放列表 | 播放顺序可能混乱\n第一次加载歌曲数量过多时加载音频文件可能会长达数分钟\n请耐心等待后再点击一次或多次`}

                data-res-action="queue"
                data-res-type="28"
                data-log-action="addtoall"
                data-log-source="local"
                data-res-data={path()}
                data-res-from="-3"
                onClick={play}
            >
                <svg>
                    <use xlinkHref="orpheus://orpheus/style/res/svg/icon.sp.svg#btn_addto_list"></use>
                </svg>
            </span>
        </div>
    )
}

export const NoNotReleasePage = () => {
    return (
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
            >已全部上架(应该)</span>
            <br />
            <br />
            <br />
        </div>
    )
}

export const NetworkErrorPage = ({ ErrorCode, context }) => {
    const handleCopy = () => {
        const textarea = document.createElement('textarea');
        textarea.value = context;
        document.body.appendChild(textarea);
        textarea.select();

        let message = "复制失败, 请手动复制"
        if (document.execCommand('copy')) message = "复制成功"
        const tipContainer = document.createElement('div');
        document.body.appendChild(tipContainer);
        ReactDOM.render(<TipComponent message={message} />, tipContainer);

        setTimeout(() => {
            ReactDOM.unmountComponentAtNode(tipContainer);
            document.body.removeChild(tipContainer);
        }, 2000);
    };

    return (
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
            >
                网络错误,如果您网络正常,则可能服务器返回数据错误或API访问拒绝
                <br />
                网络错误代码:{ErrorCode || "未知错误"}
                <br />
                错误信息(点击可复制):
                <br />
            </span>
            <br />
            <span>
                <span
                    onClick={handleCopy}
                    style={{
                        marginRight: "10px",
                        marginTop: "10px",
                        marginBottom: "10px",
                        display: "inline-block",
                        verticalAlign: "middle",
                        paddingLeft: "20px",
                        paddingBottom: "20px",
                        cursor: "pointer",
                        color: "var(--md-accent-color)"
                    }}>
                    {context || "未知错误"}
                </span>
            </span>
            <br />
            <br />
            <br />
        </div>
    )
}

export const JSONFormatErrorPage = ({ context }) => {
    const handleCopy = () => {
        const textarea = document.createElement('textarea');
        textarea.value = context;
        document.body.appendChild(textarea);
        textarea.select();

        let message = "复制失败, 请手动复制"
        if (document.execCommand('copy')) message = "复制成功"
        const tipContainer = document.createElement('div');
        document.body.appendChild(tipContainer);
        ReactDOM.render(<TipComponent message={message} />, tipContainer);

        setTimeout(() => {
            ReactDOM.unmountComponentAtNode(tipContainer);
            document.body.removeChild(tipContainer);
        }, 2000);
    };

    return (
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
                onClick={handleCopy}
            >
                JSON数据格式错误,可能是服务器错误或API格式变更,请联系作者更新
                <br />
                错误信息(点击可复制):
                <br />
            </span>
            <br />
            <span>
                <span
                    onClick={handleCopy}
                    style={{
                        marginRight: "10px",
                        marginTop: "10px",
                        marginBottom: "10px",
                        display: "inline-block",
                        verticalAlign: "middle",
                        paddingLeft: "20px",
                        paddingBottom: "20px",
                        cursor: "pointer",
                        color: "var(--md-accent-color)"
                    }}>
                    {context || "未知错误"}
                </span>
            </span>
            <br />
            <br />
            <br />
        </div>
    )
}

export const TipComponent = ({ message, duration = 2000 }) => {
    const [visible, setVisible] = React.useState(true);
    const container = React.useRef(document.createElement('div'));

    React.useEffect(() => {
        const el = container.current;
        document.body.appendChild(el);

        const timer = setTimeout(() => {
            setVisible(false);
            document.body.removeChild(el);
        }, duration);

        return () => {
            clearTimeout(timer);
            document.body.removeChild(el);
        };
    }, [duration]);

    if (!visible) return null;

    return ReactDOM.createPortal(
        <div className="u-result j-tips">
            <div className="wrap">
                <div className="inner j-flag">
                    <span className="u-tit f-ff2">{message}</span>
                </div>
            </div>
        </div>,
        container.current
    );
}

export const DownloadIcon = () => {
    return (
        <span className="z-off ico" style={{ margin: "0px" }}>
            <span className="u-icn u-icn-dld_ok">
                <svg>
                    <use xlinkHref="orpheus://orpheus/style/res/svg/icon.sp.svg#download_draw"></use>
                </svg>
            </span>
        </span>
    );
};