import { combineReducers } from 'redux';

import NavigationReducer from './Navigation';
import ProfileReducer from './Profile'
import HomeReducer from "./Home";

const reducers = combineReducers({
  navigation: NavigationReducer,
  home: HomeReducer,
  profile: ProfileReducer,
});

export default reducers;
