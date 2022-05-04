import React from 'react';
import './Schedule.scss';
import { useSelector } from 'react-redux';
import ScheduleCard from './ScheduleCard';

const Schedule = () => {
	// import schedule from store
	const schedule = useSelector((state) => state.schedule);

	console.log(schedule);
	return (
		<div className='schedule'>
			<div className='show-schedule'>
				{schedule?.events?.map((item, index) => {
					return <ScheduleCard data={item} key={index} />;
				})}
			</div>
		</div>
	);
};

export default Schedule;
