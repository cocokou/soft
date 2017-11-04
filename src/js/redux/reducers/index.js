// co
import { combineReducers } from 'redux';
import * as actions from '../actions/setting'
let initstate = {
    "name": 
    {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        id: 'name',
        type: 'text' 
    },
"tel":
    {
        title: '电话',
        dataIndex: 'tel',
        key: 'tel',
        id:'tel',
        type: 'number'
    },

    "id": 
    {
        title: 'id',
        dataIndex: 'id',
        key: 'id',
        id: 'id',
        type: 'text' 
    }
}


function fields(state=initstate, action) {
    switch(action.type) {
        case actions.ADD_COLL:{
            const {id} = action.field;
            return {
                ...state,
                [id]:action.field
              }
        }
        case actions.DEL_COLL:{
            const {id} = action;
           
            return Object.keys(state)
                .filter(v => v !== id)
                .reduce((re, item) => {
                    re[item] = state[item];
                    return re;
                }, {})
        }
        default:
            return state
    }
}



export default combineReducers({
    fields    
});