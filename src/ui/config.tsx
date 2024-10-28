type SettingOption = {
    key: string;
    label: string;
    defaultValue: string;
    options: Array<{ label: string; value: string}>;
};

const settingOptions: SettingOption[] = [
    {
        key: 'quantity',
        label: '选择音质  ',
        defaultValue: '128',
        options: [
            { label: '标准', value: '128' },
            { label: '极高', value: '320' },
            { label: '无损音质', value: '999' },
            { label: '无损音质(这俩其实一样的只是怕报错)', value: '1999' },
        ],
    },
    {
        key: 'bottom0rtop',
        label: '播放器垂直位置  ',
        defaultValue: 'bottom',
        options: [
            { label: '居下', value: 'bottom' },
            { label: '居上', value: 'top' },
        ],
    },
    {
        key: 'left0rright',
        label: '播放器水平位置  ',
        defaultValue: 'right',
        options: [
            { label: '居右', value: 'right' },
            { label: '居左', value: 'left' },
        ],
    },
    {
        key: 'opacity',
        label: '半透明效果  ',
        defaultValue: 'false',
        options: [
            { label: '关闭', value: 'false' },
            { label: '启用(跟随LyricBarBlur插件)', value: 'true' },
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
            <h1>为什么单独写一个播放器? 因为找不到网易云播放接口 凑合用吧</h1>
            <h1>至于兼容性 我自己用的插件已经基本适配完了</h1>
            <h4>张栋还我首发音乐!!!</h4>
            <br />
            <br />
            <br />
            <span
                style={{
                    cursor: 'pointer'
                }}
                onClick={() => betterncm.ncm.openUrl('https://github.com/etherfun/MHYNotRelease')}>
                源代码
            </span>
            <br />
            <span
                style={{
                    cursor: 'pointer'
                }}
                onClick={() => betterncm.ncm.openUrl('https://github.com/etherfun/MHYNotRelease/issues')}>
                问题反馈
            </span>
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
