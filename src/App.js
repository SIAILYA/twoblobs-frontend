import React, {useState, useEffect} from 'react';
import '@vkontakte/vkui/dist/vkui.css';

import {
	Div, Header, Group, PanelHeader, View, AppRoot,
	Button, Cell, Epic, Panel, Root, Tabbar, TabbarItem,
	Avatar, Card, SimpleCell, RichCell, PanelHeaderBack
} from "@vkontakte/vkui";
import {
	Icon16ArticleOutline,
	Icon16LinkOutline,
	Icon24Flash, Icon28AdvertisingOutline, Icon28DoneOutline,
	Icon28FireOutline, Icon28MenuOutline, Icon28NewsfeedOutline
} from "@vkontakte/icons";

import "./main.css"
import BannerBlock from "./components/BannerBlock";

import banner_reg_big from "./img/banner_reg_big.png"
import bridge from "@vkontakte/vk-bridge";

const articles = [
	{
		type: "article",
		text: [
			{section: "Первый заголовок", text: "Ахвхахвххахвха я хочу пиццы лолололололо пиццы мне пиццыы аааа хочу есть!!!!!!"},
			{section: "Еще заголовок", text: "Ахвхахвххахвха я хочу пиццы лолололололо пиццы мне пиццыы аааа хочу есть!!!!!!"},
		],
		title: "10 мифов",
		image: "https://i.ibb.co/MftjnsY/1.png",
		caption: "о донорстве костного мозга",
		description: "",
	},
	{
		type: "link",
		link: "https://rdkm.rusfond.ru/registr_stat/009",
		title: "Как стать донором",
		image: "https://i.ibb.co/8KwLCgn/2.png",
		caption: "костного мозга",
		description: "10 шагов к цели",
	}
]

const App = () => {
	const [activeView, setActiveView] = useState("knowledge-test");
	const [activePanel, setActivePanel] = useState("main");
	const [activeArticlePanel, setActiveArticlePanel] = useState("feed");
	const [activeStory, setActiveStory] = useState("match");
	const [popout, setPopout] = useState(null);
	const [article, setArticle] = useState({text: []})
	const [fetchedUser, setUser] = useState({});


	useEffect(() => {
		bridge.send("VKWebAppInit")

		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}
		});

		async function fetchData() {
			const user = await bridge.send('VKWebAppGetUserInfo');
			setUser(user);
			setPopout(null);
		}

		fetchData();
	}, []);

	const goPanel = (to) => {
		setActivePanel(to)
	}

	const openArticleViewer = (item) => {
		setActiveArticlePanel("articleViewer")
		setArticle(item)
	}

	const onStoryChange = e => {
		setActiveStory(e.currentTarget.dataset.story)
	}


	return (
		<AppRoot>
			<Root activeView={activeView}>
				<View id="main" activePanel="epic_panel">
					<Panel id="epic_panel">
						<Epic
							activeStory={activeStory}
							tabbar={
								<Tabbar>
									<TabbarItem
										onClick={onStoryChange}
										selected={activeStory === 'feed'}
										data-story="feed"
									>
										<Icon28NewsfeedOutline/>
									</TabbarItem>
									<TabbarItem
										onClick={onStoryChange}
										selected={activeStory === 'match'}
										data-story="match"
									>
										<div className="TabbarInWrapper">
											<Icon28FireOutline/>
										</div>
									</TabbarItem>
									<TabbarItem
										onClick={onStoryChange}
										selected={activeStory === 'profile'}
										data-story="profile"
									>
										<Icon28MenuOutline/>
									</TabbarItem>
								</Tabbar>
							}
						>
							<View id="feed" activePanel={activeArticlePanel}>
								<Panel id="feed">
									<PanelHeader>Много о донорстве</PanelHeader>
									{
										articles.map((item, index) => {
											return (
												<RichCell
													key={index}
													text={item.caption}
													caption={item.description}
													before={
														<Avatar
															size={100}
															src={item.image}
															mode="image"
														>
														</Avatar>
													}
													actions={<React.Fragment>
														<Button href={item.type === "link" ? item.link : ""}
																target="_blank"
																onClick={item.type === "article" ? () => {openArticleViewer(item)} : () => {}}
																before={item.type === "link" ? <Icon16LinkOutline/> : <Icon16ArticleOutline/>}
																style={{textTransform: "uppercase"}}
														>
															{
																item.type === "link" ?
																	"Открыть" :
																	"Читать"
															}
														</Button>
													</React.Fragment>
													}
												>
													{item.title}
												</RichCell>
											)
										})
									}
								</Panel>
								<Panel id="articleViewer">
									<PanelHeader left={<PanelHeaderBack onClick={() => {setActiveArticlePanel("feed")}}/>}>{article.title}</PanelHeader>
									<Div>
										{article.text.map((item, index) => {
											return (
												<div key={index} className="article-section">
													<h2>{item.section}</h2>
													{item.text}
												</div>
											)
										})}
									</Div>
								</Panel>
							</View>
							<View id="match" activePanel="match">
								<Panel id="match">
									<PanelHeader>Искать пару</PanelHeader>
									<Div className="d-flex">
										<div style={{width: 20, backgroundColor: "#aeaeae", marginRight: 10}}>
										</div>
										<div style={{fontStyle: "italic", fontSize: "13px"}}>
											Костный мозг у каждого свой, и найти подходящего донора с подходящими стволовыми клетками не так просто, как найти человека с такой же группой крови.
											Найти человека с таким же костным мозгом - все равно, что найти своего двойника по интересам.
											Пройдите наш небольшой тест, чтобы убедиться, что каждый из нас уникален.
										</div>
									</Div>
									<BannerBlock
										size="m"
										class="banner_main"
										header="Ответьте на все вопросы"
										subheader="И поймите, как трудно найти человека, похожего на вас"
										image={banner_reg_big}
										button="Пройти тест"
										// action={() => {go("registration")}}
									>
									</BannerBlock>
								</Panel>
							</View>
							<View id="profile" activePanel="profile">
								<Panel id="profile">
									<PanelHeader>Профиль</PanelHeader>
									<div className="d-flex justify-content-center user-profile">
										<Avatar size={80} src={fetchedUser.photo_100}/>
									</div>
									<span className="text-center user-name">{fetchedUser.first_name} {fetchedUser.last_name}</span>
									{/*<span className="text-center user-stat">5 достижений | 15 вопросов</span>*/}
									<div style={{marginTop: 10}}>
										<SimpleCell description="Расскажите о приложении в своих историях!" after={<Icon28AdvertisingOutline/>}>
											Поделиться с друзьями
										</SimpleCell>
									</div>
									<Div>
										<Card style={{overflow: "hidden"}}>
											<Header mode="secondary">Достижения</Header>
											<SimpleCell
												disabled
												before={<Icon24Flash width={28} className="icon-achieve-complete"/>}
												description="Выполненное достижение"
												after={<Icon28DoneOutline className="done-achieve"/>}
											>
												Название достижения
											</SimpleCell>
											<SimpleCell
												disabled
												before={<Icon28FireOutline className="icon-achieve-uncomplete"/>}
												description="Описание достижения"
											>
												Название достижения
											</SimpleCell>
										</Card>
									</Div>
								</Panel>
							</View>
						</Epic>
					</Panel>
				</View>
				<View id="onboarding" activePanel={activePanel} popout={popout}>
					<Panel id="main2">
						<PanelHeader>Две капли 2 панель</PanelHeader>
						<Group header={<Header mode="secondary">Три капли</Header>}>
							<Cell>Привет</Cell>
							<Cell>Одна капля</Cell>
							<Button onClick={() => {setActivePanel("main")}}>Переход на другую панель</Button>
						</Group>
					</Panel>
				</View>
				<View id="knowledge-test" activePanel="knowledge-test">
					<Panel id="test">

					</Panel>
				</View>
			</Root>
		</AppRoot>
	);
}

export default App;

