import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../redux';
import { Link } from 'react-router-dom';
import domain from '../../../util/domain';

const Teams = ({ showTeams, close, setShowTeams }) => {
	const [teams, setTeams] = useState([]);

	// import dispatch
	const dispatch = useDispatch();
	// import from action-creators.
	const { updateTeamDetails } = bindActionCreators(actionCreators, dispatch);

	useEffect(() => {
		axios.get(`${domain}/teams`).then((res) => {
			const data = res.data;
			setTeams(data.sports[0].leagues[0].teams);
		});
	}, []);

	return (
		<div
			className={showTeams ? 'team-dropdown' : 'hide'}
			onMouseOut={() => close()}
			onMouseOver={() => setShowTeams(true)}>
			{teams.map((item, index) => {
				return (
					<Link
						to='/details'
						className='option'
						onClick={() => {
							updateTeamDetails(item.team.id);
							close();
						}}>
						<img
							src={`../icons/${item.team.abbreviation}.svg`}
							alt={`${item.team.abbreviation} logo`}
						/>
						<p>{item.team.displayName}</p>
					</Link>
				);
			})}
		</div>
	);
};

export default Teams;
