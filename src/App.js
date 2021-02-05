import React, {useState} from 'react';
import View from '@vkontakte/vkui/dist/components/View/View';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import '@vkontakte/vkui/dist/vkui.css';

import {AppRoot, Cell, Panel} from "@vkontakte/vkui";
import PanelHeader from "@vkontakte/vkui/dist/components/PanelHeader/PanelHeader";
import Group from "@vkontakte/vkui/dist/components/Group/Group";
import Header from "@vkontakte/vkui/dist/components/Header/Header";

const App = () => {
	// const [activePanel, setActivePanel] = useState('home');
	// const [fetchedUser, setUser] = useState(null);
	// const [popout, setPopout] = useState(<ScreenSpinner size='large' />);

	// useEffect(() => {
	// 	bridge.subscribe(({ detail: { type, data }}) => {
	// 		if (type === 'VKWebAppUpdateConfig') {
	// 			const schemeAttribute = document.createAttribute('scheme');
	// 			schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
	// 			document.body.attributes.setNamedItem(schemeAttribute);
	// 		}
	// 	});
	// 	async function fetchData() {
	// 		const user = await bridge.send('VKWebAppGetUserInfo');
	// 		setUser(user);
	// 		setPopout(null);
	// 	}
	// 	fetchData();
	// }, []);

	return (
		<AppRoot>
			<View activePanel="main">
				<Panel id="main">
					<PanelHeader>Две капли</PanelHeader>
					<Group header={<Header mode="secondary">Три капли</Header>}>
						<Cell>Четыре капли</Cell>
						<Cell>Пять капель</Cell>
					</Group>
				</Panel>
			</View>
		</AppRoot>
	);
}

export default App;

