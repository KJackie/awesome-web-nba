const scheduleReducer = (state = [], action) => {
	switch (action.type) {
		case 'schedule':
			return (state = action.payload);
		default:
			return state;
	}
};

export default scheduleReducer;
