import React, { useState } from 'react';
import { FcInfo } from 'react-icons/fc';
import Labels from './Labels/Labels';
import './Stats.scss';

const Stats = ({ stats, rebounds }) => {
	let offensiveLabels = [
		{
			shortName: 'AST',
			description: 'The number of assists.',
		},
		{
			shortName: 'FGM',
			description: '2pt field goals made.',
		},
		{
			shortName: 'FG%',
			description: '2pt field goal percentage.',
		},
		{
			shortName: 'PTS',
			description: 'The number of points scored.',
		},
		{
			shortName: '3PM',
			description: '3pt field goals made.',
		},
		{
			shortName: '3P%',
			description: '3pt field goal percentage.',
		},
		{
			shortName: 'PIP',
			description: 'Points in the paint.',
		},
		{
			shortName: 'FBPs',
			description: 'Fastbreak points scored.',
		},
		{
			shortName: 'TO',
			description: 'Total number of turnovers.',
		},
	];

	let labelArray = [
		'points',
		'assists',
		'threePointFieldGoalsMade',
		'threePointPct',
		'fieldGoalsMade',
		'fieldGoalPct',
		'pointsInPaint',
		'fastBreakPoints',
		'turnovers',
	];

	// 'AST', 'PTS', 'FGM', '3PA'

	console.log(stats);

	return (
		<div className='stats'>
			<div className='stat-content'>
				<div className='labels'>
					{offensiveLabels.map((item, index) => {
						return <Labels short={item.shortName} desc={item.description} />;
					})}
				</div>
				<div className='values'>
					<div className='value-labels'>
						<h1> Rank </h1>
						<h1> Total</h1>
					</div>

					{labelArray.map((item, index) => {
						console.log(stats?.stats[0]?.shortDisplayName);
					})}
					{stats?.stats?.map((item, index) => {
						if (labelArray.includes(item.name))
							return (
								<div className='bar'>
									<p>{item.rankDisplayValue}</p>
									<p>{item.displayValue}</p>
								</div>
							);
					})}
				</div>
			</div>
		</div>
	);
};

export default Stats;
