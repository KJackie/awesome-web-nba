import React from 'react';

function UserPicks({ item }) {
	let recordCount = 0;

	const { username } = item;

	return (
		<div className='player-pick-box'>
			<div className='pick'>
				<p className='user-email'>{username}</p>
			</div>
			<div className='show-picks'>
				{item.picks.map((picks, index) => {
					return (
						<div className='pick-box' key={index}>
							<img src={`../mlb-icons/${picks}.svg`} className='logo' alt='' />
						</div>
					);
				})}
			</div>
			{/* <div className='user'>
				<p className='record'>{recordCount}</p>
			</div> */}
		</div>
	);
}

export default UserPicks;
