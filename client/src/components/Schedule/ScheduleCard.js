import React from 'react';
import moment from 'moment';

const ScheduleCard = ({ data }) => {

	let date = data.date;

	// moment.js date
	let gameDay = moment(date).format('ddd');
	let gameTime = moment(date).format('h:mm a');

	// destructure
	let competition = data.competitions[0];
	let homePath = competition.competitors[0];
	let awayPath = competition.competitors[1];
	let homeName = homePath.team.name;
	let awayName = awayPath.team.name;
	let homeAbbr = homePath.team.abbreviation;
	let awayAbbr = awayPath.team.abbreviation;
	let channel = competition.geoBroadcasts[0].media.shortName;
	let headline = competition.notes[0].headline;
	let series = competition.series;

	return (
		<div className='card'>
			<div
				className='top-bar'
				style={{
					backgroundColor: '#' + homePath.team.color,
				}}>
				<div className='matchup'>
					<h1>{headline}</h1>
				</div>
				<div className='extra-info'>
					<h1>{series.summary}</h1>
				</div>
			</div>
			<div className='matchup-info'>
				{/* home team info */}
				<div className='home'>
					<div className='top'>
						<div className='name'>
							<h1>{homeName}</h1>

							<p className='record'>
								{series.competitors[0].wins} - {series.competitors[0].ties}
							</p>
						</div>
						<div className='logo'>
							<img src={`../icons/${homeAbbr}.svg`} alt={`${homeAbbr} logo`} />
						</div>
					</div>
					<div className='bottom'>
						<div className='leaders'>
							{homePath.leaders.map((item, index) => {
								if (item.displayName !== 'Rating')
									return (
										<div className='leader-row' key={index}>
											<div className='player'>
												<div className='img-container'>
													<img src={item.leaders[0].athlete.headshot} alt='' />
												</div>

												<h1>{item.leaders[0].athlete.fullName}</h1>
											</div>
											<div className='stats'>
												<h1>{item.shortDisplayName}: </h1>
												<h2>{item.leaders[0].displayValue}</h2>
											</div>
										</div>
									);
							})}
						</div>
					</div>
				</div>

				{/* game info */}
				<div className='game-info'>
					<p>{channel}</p>
					<h1>{gameDay}</h1>
					<p>{gameTime}</p>
				</div>

				{/* away team info */}
				<div className='away'>
					<div className='top'>
						<div className='logo'>
							<img src={`../icons/${awayAbbr}.svg`} alt={`${awayAbbr} logo`} />
						</div>
						<div className='name'>
							<h1>{awayName}</h1>
							<p className='record'>
								{competition.series.competitors[0].wins} -{' '}
								{competition.series.competitors[0].ties}
							</p>
						</div>
					</div>
					<div className='bottom'>
						<div className='leaders'>
							{awayPath.leaders.map((item, index) => {
								if (item.displayName !== 'Rating')
									return (
										<div className='leader-row'>
											<div className='player'>
												<div className='img-container'>
													<img src={item.leaders[0].athlete.headshot} alt='' />
												</div>

												<h1>{item.leaders[0].athlete.fullName}</h1>
											</div>
											<div className='stats'>
												<h1>{item.shortDisplayName}: </h1>
												<h2>{item.leaders[0].displayValue}</h2>
											</div>
										</div>
									);
							})}
						</div>
					</div>
				</div>
			</div>
			<div className='broadcast'></div>
		</div>
	);
};

export default ScheduleCard;
