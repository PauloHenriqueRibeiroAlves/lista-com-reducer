import { Item } from "../types/Item";

type AddAction = {
    type: 'add';
    payload: {
        text: string;
    }
}
type EditTextAcition = {
    type: 'editText';
    payload: {
        id: number;
        newText: string;
    }
}
type toggleDoneAction = {
    type: 'toggleDone';
    payload: {
        id: number;
    }
}
type RemoveAction = {
    type: 'remove';
    payload: {
        id: number;
    }
}


type ListActions = AddAction | EditTextAcition | toggleDoneAction | RemoveAction ;

export const listReducer = (list: Item[], action: ListActions) => {
    switch(action.type) {
        case 'add':
            return [ ...list, {
                id: list.length, 
                text: action.payload.text, 
                done: false
              }]
        case 'editText':
            list.map(t => {
                if (t.id === action.payload.id) {
                    t.text = action.payload.newText;
                }
                return t;
            });
        case 'toggleDone':            
            return list.map(t => {
                if (t.id === action.payload.id) t.done = !t.done;
                return t;
            })
        case 'remove':
            return list.filter (t => t.id !==action.payload.id)

        default:
            return list;
    }

}