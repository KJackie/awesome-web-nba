import React from 'react';

function UserPicks({ item, labels }) {
	let recordCount = 0;

	return (
		<div className='user-pick-box'>
			<div className='user'>
				<p className='user-email'>{item.username}</p>
			</div>
			<div className='user-pick'>
				{item.picks.map((picks, index) => {
					if (
						(labels[index]?.home_team_id === picks &&
							labels[index]?.live_home_team_score >
								labels[index]?.live_road_team_score) ||
						(labels[index]?.road_team_id === picks &&
							labels[index]?.live_road_team_score >
								labels[index]?.live_home_team_score)
					) {
						recordCount++;
					}
					return (
						<div
							className={
								// if HOME team = your pick and HOME team is winning... apply 'winning'
								labels[index]?.home_team_id === picks &&
								labels[index]?.live_home_team_score >
									labels[index]?.live_road_team_score
									? 'winner'
									: // if AWAY team = your pick and AWAY team is winning... apply 'winning'
									labels[index]?.road_team_id === picks &&
									  labels[index]?.live_road_team_score >
											labels[index]?.live_home_team_score
									? 'winner'
									: // if AWAY team = your pick and AWAY team is losing... apply 'losing'
									labels[index]?.road_team_id === picks &&
									  labels[index]?.live_road_team_score <
											labels[index]?.live_home_team_score
									? 'loser'
									: // if HOME team = your pick and HOME team is losing... apply 'losing'
									labels[index]?.home_team_id === picks &&
									  labels[index]?.live_home_team_score <
											labels[index]?.live_road_team_score
									? 'loser'
									: 'picked-logo'
							}>
							<img src={`../icons/${picks}.svg`} className='logo' alt='' />
						</div>
					);
				})}
			</div>
			<div className='user'>
				<p className='record'>{recordCount}</p>
			</div>
		</div>
	);
}

export default UserPicks;
