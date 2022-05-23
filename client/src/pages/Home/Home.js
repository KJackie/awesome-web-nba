import React, { useContext, useState, useEffect } from 'react';
import './Home.scss';
import UserContext from '../../context/UserContext';
import DemoLogin from '../../components/Auth/DemoLogin';
import domain from '../../util/domain';
import HomeNavbar from '../../components/Navbar/HomeNavbar';
import Register from '../../components/Auth/Register';
import Login from '../../components/Auth/Login';
import Flickity from 'react-flickity-component';

function Home({ gameAPI }) {
	const [register, setRegister] = useState(false);
	const [login, setLogin] = useState(false);

	const { user } = useContext(UserContext);

	const [consensus, setConsensus] = useState([]);

	useEffect(() => {
		fetch(`${domain}/consensus`)
			.then((res) => res.json())
			.then((data) => {
				setConsensus(data);
			});
	}, []);

	// default carousel cell start location
	const flickityOptions = {
		initialIndex: 1,
		autoPlay: 5000,
		wrapAround: true,
		prevNextButtons: true,
		arrowShape: true,
	};

	return (
		<div className='home-page'>
			<HomeNavbar setRegister={setRegister} setLogin={setLogin} />
			<div className='home-content'>
				{!user ? (
					<div className='left'>
						<div className='title'>
							<div className='home-text'>
								<h1> Join the Pool </h1>

								<p>
									Stay updated on what's going on in the league and make daily
									nba picks against real players in the pool!
								</p>
								<div className='btns'>
									<p className='register-btn' onClick={() => setRegister(true)}>
										Get started for free
									</p>
									<p className='mobile'>or</p>
									{!user && <DemoLogin />}
								</div>
							</div>
						</div>
					</div>
				) : (
					<div className='left'>
						<div className='title'>
							<div className='home-text'>
								{consensus.length === 1 ? (
									<>
										<h1> Todays Top Pick </h1>
										<p>The experts most confident pick.</p>
									</>
								) : consensus.length > 2 ? (
									<>
										<h1> Todays Top Picks </h1>
										<p>The experts most confident picks.</p>
									</>
								) : (
									<>
										<h1> No Games today</h1>
										<p> Stay tuned for upcomming matches.</p>
									</>
								)}
							</div>
						</div>
					</div>
				)}
				{consensus.length !== 0 && (
					<div className='right'>
						<div className='demo-bar first'>
							{consensus.map((item, index) => {
								if (item.ht_pct_ats_combined > item.rt_pct_ats_combined) {
									return (
										<div className='demo-bar-content' key={index}>
											<>
												<div className='home'>
													<img
														src={`../icons/${item?.road_team_id}.svg`}
														className='team-logo'
														alt=''
													/>
													<p>{item?.road_team_id}</p>
												</div>
												<div className='vegas-odds'>
													<p>{item?.rt_pct_su_combined}% </p>
													<p> vs </p>
													<p>{item?.ht_pct_su_combined}% </p>
												</div>
												<div className='away'>
													<img
														src={`../icons/${item?.home_team_id}.svg`}
														className='team-logo'
														alt=''
													/>
													<p>{item?.home_team_id}</p>
												</div>
											</>
										</div>
									);
								}
							})}
						</div>
						{consensus.length > 2 && (
							<div className='demo-bar second'>
								{consensus.map((item, index) => {
									return (
										<div className='demo-bar-content' key={index}>
											<>
												<div className='home'>
													<img
														src={`../icons/${item?.road_team_id}.svg`}
														className='team-logo'
														alt=''
													/>
													<p>{item?.road_team_id}</p>
												</div>
												<div className='vegas-odds'>
													<p>{item?.rt_pct_su_combined}% </p>
													<p> vs </p>
													<p>{item?.ht_pct_su_combined}% </p>
												</div>
												<div className='away'>
													<img
														src={`../icons/${item?.home_team_id}.svg`}
														className='team-logo'
														alt=''
													/>
													<p>{item?.home_team_id}</p>
												</div>
											</>
										</div>
									);
								})}
							</div>
						)}
					</div>
				)}
			</div>
			<div className='video-container-home'>
				<h1 className='highlights-title'> Highlights / News </h1>

				<div className='videos'>
					<Flickity
						className={'carousel'} // default ''
						elementType={'div'} // default 'div'
						options={flickityOptions} // takes flickity options {}
						disableImagesLoaded={false} // default false
						reloadOnUpdate // default false
						static // default false
					>
						{gameAPI?.videos?.map((item, index) => {
							return (
								<div className='video-box' key={index}>
									<video
										src={item.links.mobile.source.href}
										controls='controls'
										poster={item.thumbnail}></video>
									<div className='video-text'>
										<p className='headline'>{item.headline}</p>
										<p className='description'>{item.description}</p>
									</div>
								</div>
							);
						})}
					</Flickity>
				</div>
			</div>
			{register && !user && (
				<Register setRegister={setRegister} setLogin={setLogin} />
			)}
			{login && !user && (
				<Login setLogin={setLogin} setRegister={setRegister} />
			)}
		</div>
	);
}

export default Home;
