import React from 'react';
import './PicksPopup.scss';
import { Link } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';

function PicksPopup({ pick, setPopUp, addPicks, setPick, labels }) {
	// get game data

	return (
		<>
			<div className='overlay'></div>
			<div className='popup-container'>
				<h1> Review your picks </h1>
				<div className='chosen-picks'>
					{pick.map((item) => {
						if (item !== 'no-pick') {
							return (
								<>
									<img
										src={`../mlb-icons/${item}.svg`}
										className='popup-logo'
										alt=''
									/>
									{/* <p>{item}</p> */}
								</>
							);
						}
					})}
				</div>
				{/* <div className='kickoff'>
					<p> This game is scheduled for {kickoff}</p>
				</div> */}
				<div className='btn-container-popup'>
					<button
						className='edit-btn'
						onClick={() => {
							setPopUp(false);
							setPick([]);
						}}>
						Edit
					</button>
					<Link className='save-btn' onClick={addPicks} to='/pool'>
						Save Picks
					</Link>
				</div>
			</div>
		</>
	);
}

export default PicksPopup;
