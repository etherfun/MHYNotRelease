import { TipComponent } from './page';

type SettingOption = {
    key: string;
    label: string;
    defaultValue: string;
    options: Array<{ label: string; value: string}>;
};

const settingOptions: SettingOption[] = [
    {
        key: 'quantity',
        label: '选择音质',
        defaultValue: '128',
        options: [
            { label: '标准', value: '128' },
            { label: '极高', value: '320' },
            { label: '无损音质', value: '999' },
            { label: '无损音质(这俩其实一样的只是怕报错)', value: '1999' },
        ],
    },
    {
        key: 'cover',
        label: '歌曲列表显示封面',
        defaultValue: 'false',
        options: [
            { label: '隐藏', value: 'false' },
            { label: '显示', value: 'true' },
        ],
    },
    {
        key: 'bottom0rtop',
        label: '播放器垂直位置 (插件内置播放器)',
        defaultValue: 'bottom',
        options: [
            { label: '居下', value: 'bottom' },
            { label: '居上', value: 'top' },
        ],
    },
    {
        key: 'left0rright',
        label: '播放器水平位置 (插件内置播放器)',
        defaultValue: 'right',
        options: [
            { label: '居右', value: 'right' },
            { label: '居左', value: 'left' },
        ],
    },
    {
        key: 'opacity',
        label: '半透明效果 (插件内置播放器)',
        defaultValue: 'false',
        options: [
            { label: '关闭', value: 'false' },
            { label: '启用(跟随LyricBarBlur插件)', value: 'true' },
        ],
    },
    {
        key: 'playermode',
        label: '播放模式',
        defaultValue: 'native',
        options: [
            { label: '插件内置播放器', value: 'plugin' },
            { label: '原生播放器(测试版本, 支持歌词, 原生控制 | 不支持AMLL类苹果歌词插件, 无损音质)', value: 'native' },
        ],
    },
    //
    // {
    //     key: 'newSetting',
    //     label: '新设置项',
    //     defaultValue: 'value1',
    //     options: [
    //         { label: '选项1', value: 'value1' },
    //         { label: '选项2', value: 'value2' },
    //     ],
    // },
];

export function Config() {
    const initialSettings = settingOptions.reduce((acc, setting) => {
        acc[setting.key] = getSetting(setting.key, setting.defaultValue);
        return acc;
    }, {} as Record<string, string>);

    const [settings, setSettings] = React.useState(initialSettings);

    React.useEffect(() => {
        Object.keys(settings).forEach((key) => setSetting(key, settings[key]));
    }, [settings]);

    const handleSettingChange = (key: string, value: string) => {
        setSettings((prevSettings) => ({ ...prevSettings, [key]: value }));
    };

    return (
        <div>
            {settingOptions.map((setting) => (
                <div key={setting.key} className="item u-cklist">
                    <span>{setting.label}</span>
                    {setting.options.map((option) => (
                        <label key={option.value}>
                            <input
                                type="radio"
                                style={{
                                    cursor: 'pointer'
                                }}
                                name={setting.key}
                                value={option.value}
                                checked={settings[setting.key] === option.value}
                                onChange={() => handleSettingChange(setting.key, option.value)}
                            />
                            <span>
                                <i className="circle"></i>
                            </span>
                            {option.label}
                        </label>
                    ))}
                </div>
            ))}
            <br />
            <h1>启用原生播放会产生缓存文件,缓存文件位置位于您的网易云音乐缓存目录(可在设置查看具体位置) 下 'MHYNotRelease_Cache' 文件夹内
                <br />
                <span>您的存储位置为: {(JSON.parse(localStorage.getItem("NM_SETTING_CUSTOM")).storage.cachePath + '\\Cache\\MHYNotRelease_Cache')}</span>
                <br />
                <span style={{
                    cursor: 'pointer',
                    color: '#ff4d40'
                }}
                    onClick={async () => {
                        let message = "删除失败, 请手动删除"
                        if (await betterncm.fs.remove(JSON.parse(localStorage.getItem("NM_SETTING_CUSTOM")).storage.cachePath + '\\Cache\\MHYNotRelease_Cache\\')) message = "删除成功"
                        const tipContainer = document.createElement('div');
                        document.body.appendChild(tipContainer);
                        ReactDOM.render(<TipComponent message={message} />, tipContainer);

                        setTimeout(() => {
                            ReactDOM.unmountComponentAtNode(tipContainer);
                            document.body.removeChild(tipContainer);
                        }, 2000);
                    }}>点我清除缓存
                </span>
                <span> 点击后如果无法删除可能是您正在播放缓存中的歌曲</span>  
            </h1>
            <br />
            <h1>为什么单独写一个播放器? 因为找不到网易云播放接口(在现在还是找不到但是用了一些奇怪的方法来实现原生播放) 凑合用吧</h1>
            <br />
            <h1>至于兼容性 我自己用的插件已经基本适配完了</h1>
            <br />
            <br />
            <h1
                style={{
                    cursor: 'pointer'
                }}
                onClick={() => betterncm.ncm.openUrl('https://github.com/etherfun/MHYNotRelease')}>
                源代码
            </h1>
            <br />
            <h1
                style={{
                    cursor: 'pointer'
                }}
                onClick={() => betterncm.ncm.openUrl('https://github.com/etherfun/MHYNotRelease/issues')}>
                问题反馈
            </h1>
            <br />
            <br />
            <br />
        </div>
    );
}

const getSetting = (option: string, defaultValue: string) => {
    const key = "MHYNotRelease-" + option;
    const value = localStorage.getItem(key);
    return value ?? defaultValue;
};

const setSetting = (option: string, value: string) => {
    const key = "MHYNotRelease-" + option;
    localStorage.setItem(key, value);
};
