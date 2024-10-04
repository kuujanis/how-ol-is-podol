import { combineReducers } from 'redux'
import mapReducer from './slices/map/map-slice'

export const rootReducer = combineReducers({
    map: mapReducer
})