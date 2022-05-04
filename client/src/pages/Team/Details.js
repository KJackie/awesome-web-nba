import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import Stats from '../../components/Stats/Stats';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../redux';
import '../../styles/Pages.scss';
import {
	AiOutlineCaretRight,
	AiOutlineRight,
	AiOutlineLeft,
} from 'react-icons/ai';
import domain from '../../util/domain';

const Details = () => {
	// import team_id from store
	const team_id = useSelector((state) => state.team_id);
	// import team schedule
	const team_schedule = useSelector((state) => state.team_schedule);

	const [details, setDetails] = useState([]);
	const [extraDetails, setExtraDetails] = useState([]);

	const [profile, setProfile] = useState(true);
	const [stats, setStats] = useState(false);

	// import dispatch
	const dispatch = useDispatch();
	// import from action-creators.
	const { updateTeamSchedule } = bindActionCreators(actionCreators, dispatch);

	useEffect(() => {
		axios.get(`${domain}/teams/${team_id}`).then((res) => {
			const data = res.data;
			setDetails(data);
		});
		axios.get(`${domain}/stats/${team_id}`).then((res) => {
			const data = res.data;
			setExtraDetails(data);
		});
		axios.get(`${domain}/schedule/${team_id}`).then((res) => {
			const data = res.data;
			updateTeamSchedule(data);
		});
	}, [team_id]);

	// destructure
	let team = details.team;
	let offensive = extraDetails?.splits?.categories[1];
	let points = offensive?.stats[32];
	let assists = offensive?.stats[34];
	let threes = offensive?.stats[28];
	let general = extraDetails?.splits?.categories[0];
	let rebounds = general?.stats[12];

	let totalRebounds = general?.stats[22];

	const bar = document.getElementById('bar');

	function scrollGameBarRight() {
		bar.scrollLeft += 200;
	}

	function scrollGameBarLeft() {
		bar.scrollLeft += -200;
	}

	return (
		<div className='page'>
			<div
				className='header'
				style={{ backgroundColor: `#${team?.color}`, color: 'white' }}>
				{/* background logo */}
				<img
					src={`../icons/${team?.abbreviation}.svg`}
					alt={`${team?.abbreviation} logo`}
					className='background-logo'
				/>
				<img
					src={`../icons/${team?.abbreviation}.svg`}
					alt={`${team?.abbreviation} logo`}
				/>
				<div className='team-info'>
					<div className='name'>
						<h1> {team?.displayName} </h1>
					</div>
					<div className='info'>
						<p>{team?.record?.items[0]?.summary}</p>
						<p>|</p>
						<p>{team?.standingSummary}</p>
					</div>
				</div>
				<div className='team-stats'>
					<div className='stat-box'>
						<p>{points?.shortDisplayName}</p>
						<p className='value'>{points?.rankDisplayValue}</p>
						<p>{points?.displayValue}</p>
					</div>
					<div className='stat-box'>
						<p>{assists?.shortDisplayName}</p>
						<p className='value'>{assists?.rankDisplayValue}</p>
						<p>{assists?.displayValue}</p>
					</div>
					<div className='stat-box'>
						<p>{rebounds?.shortDisplayName}</p>
						<p className='value'>{rebounds?.rankDisplayValue}</p>
						<p>{rebounds?.displayValue}</p>
					</div>
					<div className='stat-box'>
						<p>{threes?.shortDisplayName}</p>
						<p className='value'>{threes?.rankDisplayValue}</p>
						<p>{threes?.displayValue}</p>
					</div>
				</div>
			</div>
			<div className='control-bar'>
				<p
					className={profile ? 'active' : null}
					onClick={() => {
						setProfile(true);
						setStats(false);
					}}>
					Profile
				</p>
				<p
					className={stats ? 'active' : null}
					onClick={() => {
						setStats(true);
						setProfile(false);
					}}>
					Stats
				</p>
			</div>
			{profile && (
				<div className='detail-content schedule'>
					{team_schedule.events?.length > 6 ? (
						<h1 className='schedule-label'>Playoff Schedule</h1>
					) : (
						<h1 className='schedule-label'>
							{' '}
							This team is out of the playoffs.
						</h1>
					)}
					<div className='team-schedule'>
						{team_schedule.events?.length > 6 && (
							<div className='scroller'>
								<div className='scroll-btn' onClick={scrollGameBarLeft}>
									<AiOutlineLeft />
								</div>
							</div>
						)}

						<div className='scroll-games' id='bar'>
							{team_schedule?.events?.map((item, index) => {
								return (
									<div className='game-box'>
										<div className='top'>
											<p>{moment(item?.date).format('MMMM DD ')}</p>
											<p>{moment(item?.date).format('h:mm a')}</p>
										</div>
										<div className='home'>
											<div className='name'>
												<img
													src={`../icons/${item.competitions[0].competitors[0].team.abbreviation}.svg`}
													alt={`${item.competitions[0].competitors[0].team.abbreviation} logo`}
												/>
												<p>
													{
														item.competitions[0].competitors[0].team
															.shortDisplayName
													}
												</p>
											</div>
											<div className='score'>
												<p
													className={
														item.competitions[0].competitors[0].winner
															? 'winner'
															: 'loser'
													}>
													<AiOutlineCaretRight />
												</p>
												{item?.competitions[0]?.competitors[0]?.score?.value ? (
													<p>
														{
															item?.competitions[0]?.competitors[0]?.score
																?.value
														}
													</p>
												) : (
													<p>- -</p>
												)}
											</div>
										</div>
										<div className='away'>
											<div className='name'>
												<img
													src={`../icons/${item.competitions[0].competitors[1].team.abbreviation}.svg`}
													alt={`${item.competitions[0].competitors[1].team.abbreviation} logo`}
												/>
												<p>
													{
														item.competitions[0].competitors[1].team
															.shortDisplayName
													}
												</p>
											</div>
											<div className='score'>
												<p
													className={
														item.competitions[0].competitors[1].winner
															? 'winner'
															: 'loser'
													}>
													<AiOutlineCaretRight />
												</p>
												{item?.competitions[0]?.competitors[1]?.score?.value ? (
													<p>
														{
															item?.competitions[0]?.competitors[1]?.score
																?.value
														}
													</p>
												) : (
													<p>- -</p>
												)}
											</div>
										</div>
									</div>
								);
							})}
						</div>
						{team_schedule.events?.length > 6 && (
							<div className='scroller'>
								<div className='scroll-btn' onClick={scrollGameBarRight}>
									<AiOutlineRight />
								</div>
							</div>
						)}
					</div>
				</div>
			)}
			{stats && (
				<div className='detail-content stats-container'>
					<Stats stats={offensive} rebounds={totalRebounds} />
				</div>
			)}
		</div>
	);
};

export default Details;
