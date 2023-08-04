const Reducer = (state = {
    userData: {
        _id: "",
        date: "",
        email: "",
        username: "",
    },
    hasToken: false,
    ongoingTodoList: [],
    completedTodoList: []
}, action) => {
    if (action.type === 'addUserData') {
        const { _id, date, email, username } = action.payload
        // console.log(_id)
        let data = {
            _id, date, email, username
        }


        return { ...state, userData: data, hasToken: true }
    }
    else if (action.type === 'fetchTodos') {
        // console.log(action.payload)
        const ongoingTodoListArr = action.payload.filter((el) => {
            if (!el.status) {
                return true
            }
            return false
        })
        const completedTodoListArr = action.payload.filter((el) => {
            if (el.status) {
                return true
            }
            return false
        })
        // console.log(completedTodoListArr)
        return { ...state, ongoingTodoList: ongoingTodoListArr, completedTodoList: completedTodoListArr }
    }
    else if (action.type === 'addTodo') {
        const newTodo = action.payload
        let completedTodoListArr = state.completedTodoList
        let ongoingTodoListArr = state.ongoingTodoList

        if (newTodo.status) {
            completedTodoListArr.push(newTodo)
        }
        else {
            ongoingTodoListArr.push(newTodo)
        }
        // console.log(completedTodoListArr)
        // console.log(ongoingTodoListArr)
        return { ...state, ongoingTodoList: ongoingTodoListArr, completedTodoList: completedTodoListArr }
    }
    else if (action.type === 'updateStatus') {
        const _id = action.payload._id
        const newcompletedTodoList = state.completedTodoList
        newcompletedTodoList.push(action.payload)
        const newOngoingTodoListArr = state.ongoingTodoList.filter((el) => {
            if (el._id === _id) {
                return false
            }
            return true;
        })

        return { ...state, ongoingTodoList: newOngoingTodoListArr, completedTodoList: newcompletedTodoList }
    }
    else if (action.type === 'deleteTodo') {
        const _id = action.payload
        console.log(_id)
        const newOngoingTodoListArr = state.ongoingTodoList.filter((el) => {
            if (el._id === _id) {
                return false
            }
            return true;
        })
        const newCompletedTodoListArr = state.completedTodoList.filter((el) => {
            if (el._id === _id) {
                return false
            }
            return true;
        })
        
        return { ...state, ongoingTodoList: newOngoingTodoListArr, completedTodoList: newCompletedTodoListArr }
    }
    return state
}
export default Reducer