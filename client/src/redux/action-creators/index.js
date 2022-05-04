// update the schdule
export const updateSchedule = (amount) => {
	return (dispatch) => {
		dispatch({
			type: 'schedule',
			payload: amount,
		});
	};
};

// update the news
export const updateNews = (amount) => {
	return (dispatch) => {
		dispatch({
			type: 'news',
			payload: amount,
		});
	};
};

// update the team_id
export const updateTeamDetails = (amount) => {
	return (dispatch) => {
		dispatch({
			type: 'team_id',
			payload: amount,
		});
	};
};

// update the team schedule
export const updateTeamSchedule = (amount) => {
	return (dispatch) => {
		dispatch({
			type: 'team_schedule',
			payload: amount,
		});
	};
};
