const teamScheduleReducer = (state = [], action) => {
	switch (action.type) {
		case 'team_schedule':
			return (state = action.payload);
		default:
			return state;
	}
};

export default teamScheduleReducer;
