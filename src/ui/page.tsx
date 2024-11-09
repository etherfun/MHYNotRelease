export const PlayListPage = ({ songList }) => {

    interface PublishTime {
        day: number;
        hour: number;
        minute: number;
        second: number;
        str: string;
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

    return (
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
                <div id="all-songs-list-wrapper-1">
                    <div className="lst fixed-scroll-management" id="all-songs-list-wrapper-2">
                        <div className="pl-di pl-di-1">
                            <ul style={{ counterReset: "tlistorder 0" }}>
                                {songList.map((song) => (
                                    <li
                                        className="itm j-item j-impress"
                                        data-url={song.url}
                                        data-id={song.audio_id}
                                        data-extName={song.extName}
                                    >
                                        <span
                                            className="td col s-fc4"
                                            data-url={song.url}
                                            data-id={song.audio_id}
                                            data-extName={song.extName}
                                        >
                                            {formatTimeInSeconds(song.time)}
                                        </span>
                                        <div className="flow">
                                            <div
                                                className="td col title"
                                                data-url={song.url}
                                                data-id={song.audio_id}
                                                data-extName={song.extName}
                                            >
                                                <img
                                                    src={song.cover}
                                                    className="cover"
                                                    data-url={song.url}
                                                    data-id={song.audio_id}
                                                    data-extName={song.extName}
                                                    alt="cover" />
                                                <span
                                                    className="tit s-fc1"
                                                    title={song.name}
                                                    data-url={song.url}
                                                    data-id={song.audio_id}
                                                    data-extName={song.extName}
                                                    >
                                                    {song.name}
                                                </span>
                                            </div>
                                            <div
                                                className="td col ellipsis s-fc3 f-pr"
                                                title={song.author}
                                                data-url={song.url}
                                                data-id={song.audio_id}
                                                data-extName={song.extName}
                                                style={{ color: 'rgba(var(--md-accent-color-secondary-rgb), 0.5)' }}>
                                                {song.author}
                                            </div>
                                            <div
                                                className="td col ellipsis"
                                                data-url={song.url}>
                                                <a
                                                    className="s-fc3"
                                                    title={song.albumname}
                                                    data-url={song.url}
                                                    data-id={song.audio_id}
                                                    data-extName={song.extName}
                                                    style={{ cursor: 'default' }}>
                                                    {song.albumname}
                                                </a>
                                            </div>
                                            <div
                                                className="td col s-fc4"
                                                data-url={song.url}
                                                data-id={song.audio_id}
                                                data-extName={song.extName}
                                            >
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
            <br />
            <br />
            <br />
        </div>

    );
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

export const NetworkErrorPage = ({ ErrorCode }) => {
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
            >网络错误,如果您网络正常,则可能服务器错误或API访问拒绝<br />错误代码:{ErrorCode}</span>
            <br />
            <br />
            <br />
        </div>
    )
}

export const JSONFormatErrorPage = () => {
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
            >JSON数据格式错误,可能是服务器错误或API格式变更,请联系作者更新</span>
            <br />
            <br />
            <br />
        </div>
    )
}