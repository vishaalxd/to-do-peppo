import { combineReducers } from 'redux'


const todos = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TASK':
            return [
                ...state,
                {
                    id: action.id,
                    text: action.text,
                    completed: false
                }
            ]
        case 'UPDATE_LIST':
            return [...action.list]
        default:
            return state
    }
}





export default combineReducers({
    todos,
    //For more reducer
})
