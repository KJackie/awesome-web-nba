// Combine reducers in this file.

import { combineReducers } from 'redux';
import newsReducer from './news/newsReducer';
import scheduleReducer from './schedule/scheduleReducer';
import teamScheduleReducer from './schedule/teamScheduleReducer';
import teamReducer from './team/teamReducer';

const reducers = combineReducers({
	schedule: scheduleReducer,
	news: newsReducer,
	team_id: teamReducer,
	team_schedule: teamScheduleReducer,
});

export default reducers;
