import './App.css';
import { Fragment, useState } from "react";
import Header from "../appHeader/Header";
import Navigation from './Navigation.js';
import Login from "../Login";
import { API_URL_I } from "../../index.js";
import axios from "axios";
import { Theme, presetGpnDefault } from '@consta/uikit/Theme';
import { Nav, NavItem } from 'reactstrap';
import { Button } from '@consta/uikit/Button';
import { Card } from '@consta/uikit/Card';
import { cnMixSpace } from '@consta/uikit/MixSpace';
import { Grid, GridItem } from '@consta/uikit/Grid';
import { IconExit } from '@consta/icons/IconExit';

function App() {
	const [nav, setNav] = useState(0)
	const [item, setItem] = useState(localStorage.getItem('accessToken'))

	const API_URL = API_URL_I + "token/refresh"

	const handleLogOut = (e) => {

		axios.post(API_URL, {
			refresh: localStorage.getItem('refreshToken'),
		})
			.then(response => {
				if (response.status != 200) return
				localStorage.removeItem('accessToken');
				localStorage.removeItem('refreshToken');

				window.location.reload()
			})
			.catch(error => console.error(error))


	}


	if (!item) return (
		<Login />
	)

	return (
		<Theme preset={presetGpnDefault}>
			<Fragment>
				<Grid cols={5} colGap={"xs"}>
					<GridItem col={1} row={1} style={{ background: "#ebf1f5" }}>
						<Header />
					</GridItem>
					<GridItem col={3} row={1}>
						{/* Placeholder */}
					</GridItem>
					<Grid xAlign='right' yAlign='center'>
						<GridItem colStart={5} rowStart={1} col={1}>
							<Button onClick={handleLogOut} iconLeft={IconExit} view="ghost" />
						</GridItem>
					</Grid>
					<GridItem col={1} rowStart={2} row={1} style={{ background: "#ebf1f5", "min-height": "92vh" }}>
						<Card horizontalSpace='s' form='square' shadow={false}>
							<Nav vertical card>
								<NavItem>
									<Button
										label={"Проекты"}
										width="full"
										view={nav == 1 ? "primary" : "ghost"}
										onClick={() => setNav(1)}
										className={cnMixSpace({
											mB: '2xs',
										})}
										form='brick' />
									<Button
										label={"Заказчики"}
										width="full"
										view={nav == 2 ? "primary" : "ghost"}
										onClick={() => setNav(2)}
										className={cnMixSpace({
											mB: '2xs',
										})}
										form='brick' />
									<Button
										label={"Подрядчики"}
										width="full"
										view={nav == 3 ? "primary" : "ghost"}
										onClick={() => setNav(3)}
										className={cnMixSpace({
											mB: '2xs',
										})}
										form='brick' />
									<Button
										label={"Доп. соглашения"}
										width="full"
										view={nav == 7 ? "primary" : "ghost"}
										onClick={() => setNav(4)}
										className={cnMixSpace({
											mB: '2xs',
										})}
										form='brick' />										
									<Button
										label={"Акты"}
										width="full"
										view={nav == 4 ? "primary" : "ghost"}
										onClick={() => setNav(4)}
										className={cnMixSpace({
											mB: '2xs',
										})}
										form='brick' />
									<Button
										label={"Накладные"}
										width="full"
										view={nav == 5 ? "primary" : "ghost"}
										onClick={() => setNav(5)}
										className={cnMixSpace({
											mB: '2xs',
										})}
										form='brick' />
									<Button
										label={"Отчеты"}
										width="full"
										view={nav == 6 ? "primary" : "ghost"}
										onClick={() => setNav(6)}
										className={cnMixSpace({
											mB: '2xs',
										})}
										form='brick' />
								</NavItem>
							</Nav>
						</Card>
					</GridItem>
					<GridItem colStart={2} col={4} rowStart={2} row={2} style={{ "max-width": "79vw" }}>
						<Navigation nav={nav} />
					</GridItem>

				</Grid>
				{/* <Container fluid>
					<Row><Container fluid>
					<Row>
						<Col>
							<Header />
						</Col>
					</Row>
					<Row xs="9">
							<Col xs="2">
							<Card verticalSpace='s' horizontalSpace='s' form='square'>
								<Nav vertical card>
									<NavItem>
										<Button
											label={"Проекты"}
											width="full"
											view={nav == 1 ? "primary" : "ghost"}
											onClick={() => setNav(1)}
											className={cnMixSpace({
												mB: '2xs',
											})} />
										<Button
											label={"Заказчики"}
											width="full"
											view={nav == 2 ? "primary" : "ghost"}
											onClick={() => setNav(2)}
											className={cnMixSpace({
												mB: '2xs',
											})} />
										<Button
											label={"Подрядчики"}
											width="full"
											view={nav == 3 ? "primary" : "ghost"}
											onClick={() => setNav(3)}
											className={cnMixSpace({
												mB: '2xs',
											})} />
										<Button
											label={"Акты"}
											width="full"
											view={nav == 4 ? "primary" : "ghost"}
											onClick={() => setNav(4)}
											className={cnMixSpace({
												mB: '2xs',
											})} />
										<Button
											label={"Накладные"}
											width="full"
											view={nav == 5 ? "primary" : "ghost"}
											onClick={() => setNav(5)}
											className={cnMixSpace({
												mB: '2xs',
											})} />
										<Button
											label={"Отчеты"}
											width="full"
											view={nav == 6 ? "primary" : "ghost"}
											onClick={() => setNav(6)}
											className={cnMixSpace({
												mB: '2xs',
											})} />
									</NavItem>
								</Nav>
							</Card>
						</Col>
						<Col xs="10">
							<Navigation nav = {nav} />
						</Col>
						<Col xs={"2"}>
							<Card verticalSpace='s' horizontalSpace='s' form='square'>
								<Button onClick={handleLogOut} label={"Выход"} view="ghost"  width="full"/> 
							</Card>
						</Col>
					</Row>
				</Container>
						<Col>
							<Header />
						</Col>
					</Row>
					<Row xs="9">
							<Col xs="2">
							<Card verticalSpace='s' horizontalSpace='s' form='square'>
								<Nav vertical card>
									<NavItem>
										<Button
											label={"Проекты"}
											width="full"
											view={nav == 1 ? "primary" : "ghost"}
											onClick={() => setNav(1)}
											className={cnMixSpace({
												mB: '2xs',
											})} />
										<Button
											label={"Заказчики"}
											width="full"
											view={nav == 2 ? "primary" : "ghost"}
											onClick={() => setNav(2)}
											className={cnMixSpace({
												mB: '2xs',
											})} />
										<Button
											label={"Подрядчики"}
											width="full"
											view={nav == 3 ? "primary" : "ghost"}
											onClick={() => setNav(3)}
											className={cnMixSpace({
												mB: '2xs',
											})} />
										<Button
											label={"Акты"}
											width="full"
											view={nav == 4 ? "primary" : "ghost"}
											onClick={() => setNav(4)}
											className={cnMixSpace({
												mB: '2xs',
											})} />
										<Button
											label={"Накладные"}
											width="full"
											view={nav == 5 ? "primary" : "ghost"}
											onClick={() => setNav(5)}
											className={cnMixSpace({
												mB: '2xs',
											})} />
										<Button
											label={"Отчеты"}
											width="full"
											view={nav == 6 ? "primary" : "ghost"}
											onClick={() => setNav(6)}
											className={cnMixSpace({
												mB: '2xs',
											})} />
									</NavItem>
								</Nav>
							</Card>
						</Col>
						<Col xs="10">
							<Navigation nav = {nav} />
						</Col>
						<Col xs={"2"}>
							<Card verticalSpace='s' horizontalSpace='s' form='square'>
								<Button onClick={handleLogOut} label={"Выход"} view="ghost"  width="full"/> 
							</Card>
						</Col>
					</Row>
				</Container> */}
			</Fragment>
		</Theme>
	);
}

export default App;