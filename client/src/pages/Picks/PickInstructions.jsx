import React from 'react';
import moment from 'moment';
import './PickInstructions.scss';
function PickInstructions({ data }) {
	let gameDate = moment(data[1]?.date).format('MMMM DD');

	return (
		<div className='instructions-content'>
			<p className='content-date'>Make your picks for {gameDate}</p>

			<div className='instructions-text'>
				<p> Choose one team from each game. </p>
				<p>
					If a game is in progress you will not be able to make a pick for that
					game.
				</p>
				<p> Once you have made your picks click the add picks button.</p>
				<p>
					If you want to change your picks later you can do so before the
					deadline.
				</p>
			</div>
		</div>
	);
}

export default PickInstructions;
