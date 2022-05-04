const teamReducer = (state = 2, action) => {
	switch (action.type) {
		case 'team_id':
			return (state = action.payload);
		default:
			return state;
	}
};

export default teamReducer;
