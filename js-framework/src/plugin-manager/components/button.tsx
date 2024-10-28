

export const Button: React.FC<
	React.PropsWithChildren<React.HTMLAttributes<HTMLAnchorElement>>
> = (props) => {
	const { children, className, ...other } = props;
	const wrapperClass = React.useMemo(() => {
		const is300 = APP_CONF.appver.startsWith('3.')
		return is300 && [...((document.querySelector('.cmd-button'))!.classList as unknown as string[])].find(v => v.startsWith('ButtonWrapper_'))
	}, [])
	return (
		<a className={`${wrapperClass} u-ibtn5 u-ibtnsz8 cmd-button cmd-button-outlineSec cmd-button-size-m cmd-button-outline-sec button-item
		 ${className || ""}`} {...other}>
			{children}
		</a>
	);
};
