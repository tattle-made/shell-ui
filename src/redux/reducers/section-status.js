import { types } from '../actions/section-status';
const {
    SET_APP_STATUS_LOADING,
    SET_APP_STATUS_MESSAGE,
    SET_APP_STATUS_ERROR
} = types;

const sectionStatus = (state={}, action) => {
    switch(action.type){
        case SET_APP_STATUS_LOADING:
            return action.data;
        case SET_APP_STATUS_MESSAGE:
                return action.data;
        case SET_APP_STATUS_ERROR:
                return action.data;
        default:
            return state;
    }
}

export default sectionStatus