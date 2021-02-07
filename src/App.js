import React, {useState, useEffect, useMemo} from 'react';
import '@vkontakte/vkui/dist/vkui.css';
import bridge from "@vkontakte/vk-bridge";

import {
	Div, Header, PanelHeader, View, AppRoot,
	Button, Epic, Panel, Root, Tabbar, TabbarItem,
	Avatar, Card, SimpleCell, RichCell, PanelHeaderBack,
	Radio, FormLayout, Gallery, FormStatus, ScreenSpinner, Placeholder, Snackbar
} from "@vkontakte/vkui";

import {
	Icon16ArticleOutline,
	Icon16LinkOutline, Icon20FavoriteCircleFillYellow,
	Icon24Flash,
	Icon28AdvertisingOutline,
	Icon28ChevronLeftOutline,
	Icon28ChevronRightOutline, Icon28CoinsOutline, Icon28CompassOutline,
	Icon28DoneOutline, Icon28FavoriteOutline,
	Icon28FireOutline, Icon28KeyOutline, Icon28LikeOutline, Icon28MarketLikeOutline,
	Icon28MenuOutline,
	Icon28NewsfeedOutline, Icon56DownloadOutline
} from "@vkontakte/icons";

import "./main.css"

import BannerBlock from "./components/BannerBlock";
import QuestionCard from "./components/QuestionCard";

import banner_reg_big from "./img/banner_reg_big.png"
import banner_knw_big from "./img/banner_knw_big.png"
import hand from "../src/img/privacy_outline_28.svg"
import phone from "../src/img/smartphone_outline_28.svg"
import user from "../src/img/user_added_outline_28.svg"
import fire from "../src/img/fire_outline_28.svg"
import light from "../src/img/lightbulb_star_outline_28.svg"
import narrative from "../src/img/narrative_outline_28.svg"
import poll from "../src/img/poll_32.svg"


const articles = [
	{
		type: "article",
		text: [
			{section: "Костный мозг — то же самое, что спинной мозг", text: "Эти два органа выполняют совершенно разные функции и состоят из разных видов клеток. Спинной мозг состоит из нейронов и отростков нервных клеток и относится к центральной нервной системе. Костный мозг — это орган кроветворной системы, ткань, находящаяся внутри кости.\n" +
					"\n" +
					"Если главная задача спинного мозга — передача импульсов, то костный мозг отвечает за процесс кроветворения и выработки иммунных клеток."},
			{section: "Сдавать костный мозг очень больно", text: "Донорство кроветворных клеток не связано с сильным болевым синдромом. Поскольку костный мозг часто путают со спинным, то распространен миф о том, что забор будет делаться из позвоночника и при этом донор будет испытывать острую боль."},
			{section: "Сдавать костный мозг опасно", text: "Прежде чем человек сдаст кроветворные клетки, врачи проводят тщательное обследование, определяющее отсутствие противопоказаний. Это сводит к минимуму риск осложнений. Развитие медицинских технологий делает эту процедуру достаточно безопасной.\n" +
					"\n" +
					"Согласно принятому в международной практике регламенту, решение о том, допустить ли человека к донорству, принимают врачи из клиники, никак не связанной с той больницей, где будет проходить трансплантация. Это делается для того, чтобы максимально защитить донора.\n" +
					"\n" +
					"Донор и реципиент не должны знать друг о друге и не могут находиться в одной больнице. Знакомство донора и реципиента возможно только спустя два года после трансплантации."},
			{section: "Восстановиться после донорства костного мозга трудно", text: "Способность к регенерации стволовых клеток настолько высока, что при необходимости донором можно становиться несколько раз в жизни без последствий для здоровья."},
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


const questions = [
	{type: "question", text: "Мне нравится рок-музыка"},
	{type: "question", text: "Я люблю собак"},
	{type: "question", text: "Я стараюсь, по возможности, сразу же ответить на все сообщения в соцсетях"},
	{type: "ads", text: "Я бы хотел стать донором", action: "Стать донором", link: "https://rdkm.rusfond.ru/registr_stat/donation"},
	{type: "question", text: "Я люблю дискотеки"},
	{type: "question", text: "Моё любимое время года - зима"},
	{type: "question", text: "Я люблю пиццу"},
	{type: "question", text: "Я проживаю в городе-миллионнике"},
	{type: "question", text: "Мне нравится играть в компьютерные игры"},
	{type: "question", text: "Я боюсь летать на самолётах"},
	{type: "question", text: "Мне нравится учится или работать дистанционно"},
	{type: "question", text: "Мне нравятся комедии"},
	{type: "question", text: "Я люблю кошек"},
	{type: "ads", text: "Я хочу сделать мир лучше", action: "Сделать мир лучше", link: "https://rdkm.rusfond.ru/registr_stat/donation"},
	{type: "question", text: "Зачастую я одеваюсь в тёмную одежду"},
	{type: "question", text: "Я студент и живу в общежитии"},
	{type: "question", text: "У меня был опыт в программировании"},
	{type: "question", text: "Я люблю путешествовать"},
	{type: "question", text: "Для меня интересная книга или игра зачастую лучше, чем светское мероприятие"},
	{type: "question", text: "Я люблю хлеб"}
]


const knowledge = [
	{
		question: "Кто может стать донором костного мозга?",
		variants: ["Любой гражданин РФ в возрасте от 14 до 45 лет", "Любой совершеннолетний здоровый гражданин РФ", "Любой здоровый гражданин РФ без хронических заболеваний в возрасте от 18 до 45 лет весом более 50кг", "Любой гражданин РФ без хронических заболеваний"],
		correct: "Любой здоровый гражданин РФ без хронических заболеваний в возрасте от 18 до 45 лет весом более 50кг",
		description: "Донором может стать каждый здоровый гражданин РФ, достигший совершеннолетия и имеющий массу тела более 50 килограмм"
	},
	{
		question: "По статистике, генетическим двойником может стать только 1 человек из ...",
		variants: ["10000", "50000", "100000", "100"],
		correct: "10000",
		description: "Шанс найти донора с подходящим костным мозгом - 0,01%. А встретить двойника, у которого полностью совпадет HLA генотип - 1 на 500000!"
	},
	{
		question: "Трудно ли восстановиться после донорства?",
		variants: ["Трудно", "Легко"],
		correct: "Легко",
		description: "Потеря части стволовых клеток донором не ощущается, и их объем полностью восстанавливается в течение 7—10 дней!"
	},
	{
		question: "Правда ли, что донором костного мозга можно стать только один раз?",
		variants: ["Да", "Нет"],
		correct: "Нет",
		description: "Способность к регенерации стволовых клеток настолько высока, что при необходимости донором можно становиться несколько раз в жизни без последствий для здоровья!"
	},
	{
		question: "Костный мозг - это ...",
		variants: ["То же самое, что и спинной мозг", "Полужидкое вещество внутри костей человека, играющее ключевую роль в выработке клеток крови"],
		correct: "Полужидкое вещество внутри костей человека, играющее ключевую роль в выработке клеток крови",
		description: "Костный и спинной мозг - совершенно разные органы! Костный мозг - важнейший орган кроветворной системы, осуществляющий гемопоэз, или кроветворение - процесс создания новых клеток крови!"
	},
	{
		question: "Правда ли, что есть только 2 способа забора костного мозга?",
		variants: ["Да", "Нет, костный мозг забирается только одним способом", "Нет, костный мозг можно забрать множеством способов"],
		correct: "Да",
		description: "Костный мозг забирается только двумя способами: с хирургическим вмешательством забирается ткань из тазобедренной кости, либо забирается некоторое количество крови пациента"
	}
]


const achievements = [
	{
		id: 1,
		icon: <Icon28FavoriteOutline/>,
		title: "Зайти в приложение",
		description: "Зайди в приложение и пройди онбординг"
	},
	{
		id: 2,
		icon: <Icon28CompassOutline/>,
		title: "Ответить на 20 вопросов из теста",
		description: "Пройди тест с карточками!"
	},
	{
		id: 3,
		icon: <Icon28FireOutline/>,
		title: "Поделитесь...",
		description: "Ой, что?"
	},
	{
		id: 4,
		icon: <Icon28MarketLikeOutline/>,
		title: "Захотеть помочь",
		description: "Перейди по одной из ссылок на сайт РусФонда с пожерствованиями"
	},
	{
		id: 5,
		icon: <Icon28KeyOutline/>,
		title: "Пройти тест на знание",
		description: "Докажи всем, что знаете, что такое костный мозг"
	}
]


const App = () => {
	const [activeView, setActiveView] = useState("main");
	const [activePanel, setActivePanel] = useState("main");
	const [activeArticlePanel, setActiveArticlePanel] = useState("feed");
	const [activeStory, setActiveStory] = useState("match");
	const [popout, setPopout] = useState(<ScreenSpinner size="large"/>);
	const [article, setArticle] = useState({text: []})
	const [fetchedUser, setUser] = useState({});
	const [questionIndex, setQuestionIndex] = useState(1)
	const [answers, setAnswers] = useState([])
	const [slideIndex, setSlideIndex] = useState(0)
	const [knowledgeAnswers, setKnowledgeAnswers] = useState(Array(knowledge.length).fill(null))
	const [knowledgeResult, setKnowledgeResult] = useState(0)
	const [userAchievements, setUserAcvievements] = useState([])
	const [snackBar, setSnackBar] = useState(null)

	const childRefs = useMemo(() => Array(questions.length).fill(0).map(i => React.createRef()), [])


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

		async function fetchOnboardingVisit() {
			const visit = await bridge.send("VKWebAppStorageGet", {"keys": ["onb_visit"]})
			console.log(visit)
			if (visit.keys[0].onb_visit === "true") {
				setActiveView("main")
			} else {
				setActiveView("onboarding")
			}
		}

		fetchData();
		fetchOnboardingVisit();
	}, []);

	function setOnboardingVisit() {
		bridge.send("VKWebAppStorageSet", {"key": "onb_visit", "value": "true"}).then(() => {
			setPopout(null)
		})
	}

	const openArticleViewer = (item) => {
		setActiveArticlePanel("articleViewer")
		setArticle(item)
	}

	const onStoryChange = e => {
		setActiveStory(e.currentTarget.dataset.story)
	}

	function questionSwiped(index, event) {
		setQuestionIndex((prev) => {return (prev + 1)})
		answers.push(event)

		if (index === 20) {
			setActivePanel("cards-results")
			achievementGet(2)
		}
	}

	function answerQuestion(answer) {
		childRefs[questions.length - questionIndex].current.swipe(answer === 1 ? "right" : "left")
	}

	function answerKnowledge(index, item, answer) {
		console.log(item.correct === answer)
		let new_answers = JSON.parse(JSON.stringify(knowledgeAnswers))
		new_answers[index] = (item.correct === answer)
		setKnowledgeAnswers(new_answers)
		console.log(knowledgeAnswers)
	}

	function completeKnowledgeTest() {
		setActivePanel("results");
		setSlideIndex(0);
		setKnowledgeResult(knowledgeAnswers.filter(value => value === true).length)
		achievementGet(5)
	}

	function completeStartOnboarding() {
		setPopout(<ScreenSpinner size="large"/>)
		setOnboardingVisit();
		setActiveView("main");
		setSlideIndex(0)
		achievementGet(1)
	}

	function completeCardsOnboarding() {
		setActivePanel("cards-panel");
		setSlideIndex(0)
	}

	function achievementGet(achieve_id) {
		setSnackBar(<Snackbar before={<Icon20FavoriteCircleFillYellow/>} onClose={() => {setSnackBar(null)}}>Новое достижение!</Snackbar>)
		let old_achievements = JSON.parse(JSON.stringify(userAchievements))
		old_achievements.push(achieve_id)
		setUserAcvievements(old_achievements)
	}

	function applyStoryShare() {
		bridge.send("VKWebAppShowStoryBox", { "background_type" : "image", "url" : "https://i.ibb.co/X7NzTFN/1.png"}).then(r => {
			console.log(r)
		})
		achievementGet(3)
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
									<PanelHeader>Тесты</PanelHeader>
									<Div className="d-flex">
										<div style={{width: "20px", backgroundColor: "#aeaeae", marginRight: 10}}>
										</div>
										<div style={{fontStyle: "italic", fontSize: "13px"}}>
											Найти подходящего тебе донора костного мозга не так просто, как, например,
											найти человека с такой же группой крови, это все равно, что встретить своего двойника по интересам.
											Пройди наш небольшой тест, чтобы убедиться, что каждый из нас уникален.
										</div>
									</Div>
									<BannerBlock
										size="m"
										class="banner_main"
										header="Ответь на все вопросы"
										subheader="И пойми, как трудно найти человека, похожего на тебя"
										image={banner_reg_big}
										button="Пройти тест"
										action={() => {setActiveView("cards-test"); setActivePanel("cards-onboarding")}}
									>
									</BannerBlock>

									<Div className="d-flex">
										<div style={{width: "7px", backgroundColor: "#aeaeae", marginRight: 10}}>
										</div>
										<div style={{fontStyle: "italic", fontSize: "13px"}}>
											Прочитал все статьи из базы знаний?
											Проверь свои знания в области донорства костного мозга!
										</div>
									</Div>
									<BannerBlock
										size="m"
										class="banner_knowledge"
										header="Проверка знаний"
										subheader="Узнай, как хорошо ты знаешь устройство донорской системы!"
										image={banner_knw_big}
										button="Пройти тест"
										color="#0084ff"
										action={() => {setActiveView("knowledge-test"); setActivePanel("test")}}
									>
									</BannerBlock>
									{snackBar}
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
										<SimpleCell description="Расскажи о приложении в своих историях!" after={<Icon28AdvertisingOutline/>} onClick={() => {
											applyStoryShare()
										}}>
											Поделиться с друзьями
										</SimpleCell>
									</div>
									<Div>
										<Card style={{overflow: "hidden"}}>
											<Header mode="secondary">Достижения</Header>
											{
												achievements.map((item, index) => {
													return(
														<SimpleCell
															key={index}
															disabled
															before={item.icon}
															description={item.description}
															after={userAchievements.indexOf(item.id)!== -1 ? <Icon28DoneOutline className="done-achieve"/> : null}
														>
															{item.title}
														</SimpleCell>
													)
												})
											}
										</Card>
									</Div>
									{snackBar}
								</Panel>
							</View>
						</Epic>
					</Panel>
				</View>

				<View id="onboarding" activePanel="onboarding" popout={popout}>
					<Panel id="onboarding">
						<Gallery
							slideWidth="100%"
							align="center"
							className="gallery-onb"
							slideIndex={slideIndex}
							isDraggable
							onChange={slideIndexChange => setSlideIndex(slideIndexChange)}
						>
							<div className="slide-onb">
								<Div>
									<span className="hello-onb blue-gradient-cl">Привет!</span>
									<img src={hand} alt="logo-s" className="hand-onb-pic pic-onb"/>
									<div className="text-onb">Мы - проект "Две капли", призванный привлечь внимание к проблеме донорства костного мозга в России</div>
								</Div>
							</div>
							<div className="slide-onb">
								<Div>
									<span className="answer-onb blue-gradient-cl">Проблема</span>
									<img src={narrative} alt="marker" className="marker-onb-pic pic-onb"/>
									<div className="text-onb">В России каждые 20 минут один человек узнает, что у него рак крови и ему срочно требуется донор костного мозга</div>
								</Div>
							</div>
							<div className="slide-onb">
								<Div>
									<span className="result-onb blue-gradient-cl">Шансы</span>
									<img src={light} alt="result" className="result-onb-pic pic-onb"/>
									<div className="text-onb">Шанс встретить своего генетического близнеца, чей костный мозг подойдет - 1 на 10000. Но шансы растут по мере пополнения Национального регистра доноров костного мозга!</div>
								</Div>
							</div>
							<div className="slide-onb">
								<Div>
									<span className="result-onb blue-gradient-cl">Помощь</span>
									<img src={fire} alt="result" className="result-onb-pic pic-onb"/>
									<div className="text-onb">Ты всегда можешь помочь и другими способами, для этого не нужно становиться донором - можно помочь регистру и финансово</div>
									<Div>
										<Button size="m" href="https://rdkm.rusfond.ru/registr_stat/donation" target="_blank" onclick={() => {achievementGet(4)}} before={<Icon28LikeOutline/>}>Хочу помочь!</Button>
									</Div>
								</Div>
							</div>
						</Gallery>
						<Div>
							<Button stretched size="l" onClick={() => {slideIndex < 3 ? setSlideIndex((prev) => {return (prev + 1)}) : completeStartOnboarding()}}>
								{
									slideIndex === 3 ? "Начать" :"Дальше"
								}
							</Button>
						</Div>
					</Panel>
				</View>

				<View id="knowledge-test" activePanel={activePanel}>
					<Panel id="test">
						<PanelHeader>Тест на знания</PanelHeader>
						<Gallery
							slideWidth="100%"
							align="center"
							className="gallery-knowledge"
							slideIndex={slideIndex}
							isDraggable
							onChange={slideIndexChange => setSlideIndex(slideIndexChange)}
						>
							{
								knowledge.map((item, index) => {
									return(
										<div key={index}>
											<FormLayout style={{padding: 10, display: "flex", flexDirection: "column"}}>
												<div className="text-center knowledge-question">{item.question}</div>
												<div className="knowledge-answers">
													{
														knowledgeAnswers[index] === null ?
														item.variants.map((answer, answer_index) => {
															return(
																<Radio key={answer_index}
																	   name="test"
																	   onClick={(e) => {
																	   	if (knowledgeAnswers[index] === null) answerKnowledge(index, item, e.currentTarget.value)
																	   }}
																	   value={answer}
																>
																	{answer}
																</Radio>
															)
														}) :
														item.variants.map((answer, answer_index) => {
															return(
																<Radio key={answer_index}
																	   name="test"
																	   checked={item.correct === answer}
																	   className={item.correct === answer ? "correct-variant" : "uncorrect-variant"}
																>
																	{answer}
																</Radio>
															)
														})
													}
													{
														knowledgeAnswers[index] === true &&
														<FormStatus className="form-status-answer" mode="correct" header="Правильно!">
															{item.description}
														</FormStatus>
													}
													{
														knowledgeAnswers[index] === false &&
														<FormStatus className="form-status-answer" mode="error" header="А вот и нет!">
															{item.description}
														</FormStatus>
													}
												</div>
											</FormLayout>
										</div>
									)
								})
							}
						</Gallery>
						<Div>
							<Button stretched
									size="l"
									disabled={(slideIndex === (knowledge.length - 1)) && (knowledgeAnswers.some((value => {return (value == null)})))}
									onClick={() => {
										slideIndex < (knowledge.length - 1) ?
										setSlideIndex((prev) => {return (prev + 1)}) :
										completeKnowledgeTest();
									}}>
								{
									slideIndex === (knowledge.length - 1) ? "Закончить" :"Дальше"
								}
							</Button>
						</Div>
						{snackBar}
					</Panel>
					<Panel id="results">
						<PanelHeader left={<PanelHeaderBack onClick={() => {setActiveView("main")}}/>}>Результаты</PanelHeader>
						<div className="results-knowledge-header text-center">Вы ответили правильно на</div>
						<div className="results-knowledge">
							{knowledgeResult}/{knowledge.length}
						</div>
						<div className="text-center results-knowledge-questions">
							вопросов
						</div>
						<Div className="results-knowledge-caption text-center">
							{
								knowledgeResult <= 2 &&
									"Стоит подучить матчасть!"
							}
							{
								(knowledgeResult > 2) && (knowledgeResult <= 4) &&
									"Неплохо, но не идеал!"
							}
							{
								(knowledgeResult > 4) && (knowledgeResult <= 5) &&
									"Отлично!"
							}
							{
								(knowledgeResult > 5) && (knowledgeResult <= 6) &&
									"Отлично!"
							}
						</Div>
						<Div style={{marginTop: "25vh"}}>
							<Button stretched size="l" onClick={() => {setActiveView("main")}}>
								Домой
							</Button>
						</Div>
					</Panel>
					{snackBar}
				</View>
				<View id="cards-test" activePanel={activePanel}>
					<Panel id="cards-onboarding">
						<Gallery
							slideWidth="100%"
							align="center"
							className="gallery-onb"
							slideIndex={slideIndex}
							isDraggable
							onChange={slideIndexChange => setSlideIndex(slideIndexChange)}
						>
							<div className="slide-onb">
								<Div>
									<span className="hello-onb blue-gradient-cl">Привет!</span>
									<img src={hand} alt="logo-s" className="hand-onb-pic pic-onb"/>
									<div className="text-onb">Сейчас тебе нужно будет ответить на 20 вопросов как в психологическом тесте</div>
								</Div>
							</div>
							<div className="slide-onb">
								<Div>
									<span className="answer-onb blue-gradient-cl">Отвечайте</span>
									<img src={phone} alt="marker" className="marker-onb-pic pic-onb"/>
									<div className="text-onb">Чтобы отвечать - свайпай карточки влево и вправо или пользуйтесь кнопками</div>
								</Div>
							</div>
							<div className="slide-onb">
								<Div>
									<span className="result-onb blue-gradient-cl">Результат</span>
									<img src={user} alt="result" className="result-onb-pic pic-onb"/>
									<div className="text-onb">Он покажет, насколько трудно найти такого же, как ты</div>
								</Div>
							</div>
						</Gallery>
						<Div>
							<Button stretched size="l" onClick={() => {slideIndex < 2 ? setSlideIndex((prev) => {return (prev + 1)}) : completeCardsOnboarding()}}>
								{
									slideIndex === 2 ? "Начать" :"Дальше"
								}
							</Button>
						</Div>
					</Panel>
					<Panel id="cards-panel">
						<div className="question-box">
							{
								questions.map((item, index) => {
									return(
										<QuestionCard achievementGet={achievementGet} ref={childRefs[index]} currentIndex={questionIndex} questionIndex={questions.length - index} questionItem={item} questionSwiped={questionSwiped} key={index}/>
									)
								})
							}
						</div>
						<Div className="question-buttons">
							<div>
								<Button onClick={() => {answerQuestion(0)}} className="question-button"><Icon28ChevronLeftOutline/></Button>
								Нет
							</div>
							<div className="swipe-or-buttons">
								Свайпай или пользуйся кнопками
							</div>
							<div>
								<Button onClick={() => {answerQuestion(1)}} className="question-button"><Icon28ChevronRightOutline/></Button>
								Да
							</div>
						</Div>
					</Panel>
					<Panel id="cards-results">
						<PanelHeader left={<PanelHeaderBack onClick={() => {setActiveView("main")}}/>}>Результаты</PanelHeader>
						<div className="cards-result-header">Твой ответ - один на миллион</div>
						<div className="cards-result-chart">
							<img src={poll}/>
						</div>
						<Div className="cards-result-caption">И это не шутка! Найти такую же комбинацию ответов, как у тебя почти так же трудно, как найти подходящего донора костного мозга! Но уже сейчас ты можешь помочь! Вступай в реестр доноров или помогай материально!</Div>
						<Div className="d-flex justify-content-center">
							<Button size="m" href="https://rdkm.rusfond.ru/registr_stat/donation" target="_blank" onclick={() => {achievementGet(4)}} before={<Icon28LikeOutline/>}>Хочу помочь!</Button>
						</Div>
						<Div className="cards-result-home">
							<Button size="l" stretched onClick={() => {setActiveView("main")}}>Домой</Button>
						</Div>
						{snackBar}
					</Panel>
				</View>
				<View id="loading" activePanel="loading">
					<Panel id="loading">
						<Placeholder icon={<Icon56DownloadOutline width={128} height={128} fill="#e99787"/>} header="Загружаем картиночки и скрипты..." style={{marginTop: "20vh"}}>
						</Placeholder>
					</Panel>
				</View>
			</Root>
		</AppRoot>
	);
}

export default App;

