import BetterNCM from "../betterncm-api";
import { isSafeMode, loadedPlugins } from "../loader";
import { NCMPlugin } from "../plugin";
import { HeaderComponent } from "./components/header";
import { SafeModeInfo } from "./components/safe-mode-info";
import { StartupWarning } from "./components/warning";

const OPENED_WARNINGS = "config.betterncm.manager.openedwarnings";

export async function initPluginManager() {
	// 准备设置页面和访问按钮
	const settingsView = document.createElement("section");
	const mainPageView: HTMLElement = (await BetterNCM.utils.waitForElement(
		".right-container, section.g-mn",
	))!!;
	const settingsButton = (await BetterNCM.utils.waitForElement(
		'.cmd-icon-setting, a[href="#/m/setting/"]',
	))!! as HTMLAnchorElement;
	const betterNCMSettingsButton = settingsButton.cloneNode(
		true,
	) as HTMLAnchorElement;
	betterNCMSettingsButton.href = "javascript:void(0)";
	betterNCMSettingsButton.title = "BetterNCM";

	if (localStorage.getItem(OPENED_WARNINGS) !== "true")
		betterNCMSettingsButton.classList.add("bncm-btn-twinkling");
	betterNCMSettingsButton.innerHTML = `<svg viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" focusable="false" aria-hidden="true" style="
    transform: scale(1.3);
"><path fill-rule="evenodd" clip-rule="evenodd" d="M14.3707 22.342C16.9214 22.342 19.3998 21.0048 20.6842 18.9345C22.2492 16.4133 21.8458 13.1462 19.7247 11.1649C18.8879 10.3829 17.7719 9.89053 16.5779 9.77494L16.5289 9.58894L16.517 9.54384C16.4653 9.34756 16.4077 9.12931 16.3596 8.9496C16.2977 8.72364 16.2901 8.51814 16.3377 8.35497C16.351 8.30693 16.3724 8.26316 16.4019 8.20846C16.5123 8.00343 16.7197 7.85739 16.9561 7.81838C17.0603 7.80078 17.1697 7.80601 17.2729 7.83313C17.379 7.86167 17.4837 7.91305 17.575 7.98155C17.6341 8.02647 17.6857 8.07986 17.74 8.1361L17.741 8.1371C17.7462 8.14245 17.7514 8.14782 17.7566 8.15318C17.7851 8.18261 17.8136 8.21201 17.8438 8.23938C18.0126 8.39778 18.2334 8.48484 18.4646 8.48484C18.9669 8.48484 19.3755 8.07573 19.3755 7.5734C19.3755 7.42831 19.3417 7.28893 19.2756 7.15906C19.2699 7.14764 19.2637 7.1367 19.2575 7.12624L19.2461 7.10531C19.1605 6.96165 19.0382 6.82369 18.8608 6.67147C18.5892 6.43838 18.26 6.25571 17.9099 6.14392C17.7453 6.09111 17.5759 6.05449 17.4075 6.03546C17.0336 5.99264 16.6469 6.03213 16.2892 6.14963C14.8754 6.61676 14.197 7.93398 14.6019 9.4272L14.7256 9.89481C14.4487 9.9576 14.1752 10.0413 13.9112 10.1431C12.5464 10.6683 11.4632 11.8361 11.0841 13.1905C10.949 13.6728 10.9028 14.1728 10.9466 14.6765C11.0417 15.7683 11.624 16.7849 12.5045 17.3971C13.3346 17.9736 14.3283 18.1434 15.3031 17.8747C15.9933 17.6839 16.6069 17.2739 17.0308 16.7202C17.7006 15.8449 17.9004 14.697 17.594 13.4868C17.4861 13.0607 17.3511 12.589 17.2201 12.1315L17.213 12.1068C17.1759 11.9779 17.1388 11.8485 17.1021 11.7201C17.6259 11.8732 18.1006 12.1401 18.4817 12.4964C19.9449 13.8631 20.2265 16.2178 19.1367 17.9741C18.1768 19.5211 16.3058 20.521 14.3707 20.521C11.106 20.521 8.45012 17.8652 8.45012 14.6004C8.45012 14.3107 8.47248 14.0177 8.51672 13.729C8.55239 13.4978 8.60234 13.2661 8.66561 13.0401C8.72793 12.818 8.80451 12.5973 8.89204 12.3846C8.98052 12.1725 9.08137 11.9641 9.19269 11.7662C9.3021 11.5702 9.42578 11.3766 9.5604 11.1906C9.68979 11.0108 9.83488 10.8329 9.99043 10.6626C10.1436 10.4961 10.3082 10.3363 10.479 10.1883C10.6507 10.0394 10.8324 9.89957 11.0189 9.77303C11.2058 9.64554 11.4033 9.52757 11.6059 9.42149C11.7167 9.36393 11.83 9.30922 11.9418 9.25975C12.0031 9.23264 12.065 9.20647 12.1268 9.18174C12.3528 9.09183 12.5302 8.91915 12.6263 8.69557C12.7224 8.47199 12.7257 8.22463 12.6358 7.99867C12.5454 7.77224 12.3727 7.5948 12.1487 7.49871C11.9256 7.40262 11.6782 7.39976 11.4523 7.49015C11.37 7.5225 11.2881 7.55722 11.2044 7.59385C11.0536 7.66092 10.9047 7.73275 10.763 7.80696C10.4999 7.94397 10.2411 8.09904 9.99376 8.26744C9.7483 8.43441 9.51045 8.61708 9.28687 8.81117C9.06187 9.00573 8.84685 9.21456 8.64848 9.43196C8.44774 9.6503 8.25793 9.88292 8.0843 10.1227C7.90972 10.3643 7.74751 10.6179 7.6029 10.8767C7.4559 11.1388 7.32366 11.4118 7.20949 11.6877C7.0939 11.967 6.99352 12.2562 6.9117 12.5483C6.82941 12.8418 6.76376 13.1462 6.71619 13.4526C6.65816 13.8327 6.62866 14.2189 6.62866 14.6004C6.62866 18.8694 10.1017 22.342 14.3707 22.342ZM15.1929 11.6583C15.2781 11.9694 15.3699 12.291 15.4617 12.6107C15.5911 13.0602 15.7243 13.5245 15.8285 13.9355C15.9464 14.4017 15.9997 15.0715 15.5844 15.6142H15.584C15.4003 15.8549 15.1282 16.0348 14.8181 16.1204C14.2501 16.2769 13.811 16.0885 13.5437 15.903C13.1027 15.5962 12.8102 15.0791 12.7612 14.5201C12.7364 14.2352 12.7621 13.9536 12.8377 13.6834C13.0647 12.8718 13.7268 12.1673 14.5655 11.8443C14.77 11.7658 14.9808 11.703 15.1929 11.6583Z" fill="currentColor"></path><defs></defs></svg>`;

	const is300 = APP_CONF.appver.startsWith('3.')
	mainPageView.parentElement!!.insertBefore(
		settingsView,
		mainPageView.nextElementSibling,
	);
	settingsButton.parentElement!!.appendChild(betterNCMSettingsButton);
	ReactDOM.render(<PluginManager />, settingsView);

	settingsView.classList.add("better-ncm-manager");
	settingsView.classList.add("g-mn");

	function showSettings() {
		// debugger
		// 有插件似乎会替换主页元素，导致我们的设置页面无法显示，需要进行检查
		if (settingsView.parentElement !== mainPageView.parentElement) {
			mainPageView.parentElement!!.insertBefore(
				settingsView,
				mainPageView.nextElementSibling,
			);
		}
		settingsView.classList.add("ncmm-show");
		// 有些主题插件会给我们主页上 !important 优先级修饰符
		// 所以得这样硬碰硬
		mainPageView.setAttribute("style", "display: none !important;");
	}

	function hideSettings() {
		settingsView.classList.remove("ncmm-show");
		mainPageView.removeAttribute("style");
	}

	window.addEventListener('click', (e) => {
		const clickHideAreas = [
			'[class^=LeftScrollContainer_]',
			'[class^=MiniModeIconBar_]',
			'[class^=CommentWrapper_]'
		];

		for (const ele of e.path) {
			if (ele.title === 'BetterNCM') return;
			if (clickHideAreas.some(s => ele.matches?.(s))) hideSettings();
		}
	})

	!(async () => {
		const lyricButton = (await BetterNCM.utils.waitForElement(
			"div.cover.u-cover.u-cover-sm > a > span",
			1000,
		))!! as HTMLAnchorElement;
		lyricButton.addEventListener("click", hideSettings);
	})();

	settingsButton.addEventListener("click", hideSettings);
	betterNCMSettingsButton.addEventListener("click", () => {
		if (settingsView.classList.contains("ncmm-show")) {
			hideSettings();
		} else {
			showSettings();
		}
	});

	// 如果外部页面变更（点击了其它按钮跳转）则关闭设置页面
	window.addEventListener("hashchange", hideSettings);
	new MutationObserver((rs) => {
		for (const r of rs) {
			if (r.attributeName === "style") {
				// 侧栏是可以拖拽改变大小的，所以我们也要一起同步修改
				settingsView.style.left = mainPageView.style.left;
			}
		}
	}).observe(mainPageView, {
		attributes: true,
	});
}

export let onPluginLoaded = (_: typeof loadedPlugins) => { };

const PluginManager: React.FC = () => {
	const [selectedPlugin, setSelectedPlugin] = React.useState<NCMPlugin | null>(
		loadedPlugins["PluginMarket"],
	);
	const pluginConfigRef = React.useRef<HTMLDivElement | null>(null);
	const [loadedPluginsList, setLoadedPlugins] = React.useState<string[]>([]);
	const [showStartupWarnings, setShowStartupWarnings] = React.useState(
		localStorage.getItem(OPENED_WARNINGS) !== "true",
	);
	const safeMode = React.useMemo(isSafeMode, undefined);

	React.useEffect(() => {
		function sortFunc(key1: string, key2: string) {
			const getSortValue = (key: string) => {
				const loadPlugin = loadedPlugins[key];
				const value = loadPlugin.haveConfigElement() ? 1 : 0;

				// 将插件商店排到最前面
				if (loadPlugin.manifest.name.startsWith("PluginMarket"))
					return Number.MAX_SAFE_INTEGER;

				return value;
			};
			return getSortValue(key2) - getSortValue(key1);
		}
		setLoadedPlugins(Object.keys(loadedPlugins).sort(sortFunc));
		onPluginLoaded = (loadedPlugins) => {
			console.log("插件加载完成！");
			setLoadedPlugins(Object.keys(loadedPlugins).sort(sortFunc));
		};
	}, []);

	React.useEffect(() => {
		const myDomElement =
			(selectedPlugin?.injects
				.map((v) => v._getConfigElement())
				.filter((v) => v !== null) as HTMLElement[] | null) || [];

		if (myDomElement.length === 0) {
			const tipElement = document.createElement("div");
			tipElement.innerText = "该插件没有可用的设置选项";
			myDomElement.push(tipElement);
		}

		pluginConfigRef.current?.replaceChildren(...myDomElement);
	}, [selectedPlugin]);

	return (
		<div className="bncm-mgr">
			<div>
				<HeaderComponent
					onRequestOpenStartupWarnings={() => {
						setShowStartupWarnings(!showStartupWarnings);
					}}
				/>
				{safeMode ? (
					<SafeModeInfo />
				) : showStartupWarnings ? (
					<StartupWarning
						onRequestClose={() => {
							localStorage.setItem(OPENED_WARNINGS, "true");
							setShowStartupWarnings(false);
							document.querySelector('.bncm-btn-twinkling')?.classList.remove("bncm-btn-twinkling");
						}}
					/>
				) : (
					<section
						style={{
							display: "flex",
							flexDirection: "row",
							flex: "1",
							marginBottom: "0",
						}}
					>
						<div
							className="v-scroll loaded-plugins-list"
							style={{
								borderRight: "1px solid #8885",
							}}
						>
							<div>
								<div>
									{loadedPluginsList.map((key) => {
										const loadPlugin = loadedPlugins[key];
										const haveConfig = loadPlugin.haveConfigElement();
										return (
											// rome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
											<div
												className={
													haveConfig
														? selectedPlugin?.manifest.slug === key
															? "plugin-btn selected"
															: "plugin-btn"
														: "plugin-btn-disabled plugin-btn"
												}
												data-plugin-slug={key}
												onClick={() => {
													if (haveConfig) setSelectedPlugin(loadPlugin);
												}}
											>
												<span className="plugin-list-name">
													{loadPlugin.manifest.name}
												</span>
												{/* rome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
												{
													(!loadPlugin.pluginPath.includes("./plugins_dev") && loadPlugin.manifest.name !== "PluginMarket") &&
													(
														<span
															className="plugin-uninstall-btn"
															onClick={async (e) => {
																e.stopPropagation();

																const requireRestart = loadPlugin.manifest.require_restart || loadPlugin.manifest.native_plugin

																const pluginFilePath =
																	await BetterNCM.fs.readFileText(
																		`${loadPlugin.pluginPath}/.plugin.path.meta`,
																	);
																if (pluginFilePath.length > 1) {
																	await BetterNCM.fs.remove(pluginFilePath);

																	if (requireRestart) {
																		betterncm_native.app.restart()
																	} else {
																		await BetterNCM.app.reloadPlugins();
																		BetterNCM.reload();
																	}
																}
															}}
														>
															<svg
																xmlns="http://www.w3.org/2000/svg"
																width={14}
																height={14}
																viewBox="0 0 24 24"
																fill="none"
																stroke="currentColor"
																strokeWidth={2}
																strokeLinecap="round"
																strokeLinejoin="round"
																className="feather feather-trash-2"
																style={{
																	marginTop: 1
																}}
															>
																<polyline points="3 6 5 6 21 6" />
																<path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
																<line x1={10} y1={11} x2={10} y2={17} />
																<line x1={14} y1={11} x2={14} y2={17} />
															</svg>
														</span>
													)
												}


											</div>
										);
									})}
								</div>
							</div>
						</div>
						<div className="v-scroll">
							<div>
								<div
									style={{
										overflowY: "scroll",
										overflowX: "hidden",
										padding: "16px",
									}}
									ref={pluginConfigRef}
								/>
							</div>
						</div>
					</section>
				)}
			</div>
		</div>
	);
};
