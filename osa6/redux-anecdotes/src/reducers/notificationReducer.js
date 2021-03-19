let notificationTimeout

export const setNotification = (content, time) => {
    return async dispatch => {
        console.log('Timeout:', notificationTimeout)
        // If the previous notification is still visible
        if (notificationTimeout) {
            clearTimeout(notificationTimeout)
        }
        dispatch({
            type: 'SET_NOTIFICATION',
            data: content
        })
        notificationTimeout = setTimeout(() => {
            dispatch({
                type:'REMOVE_NOTIFICATION',
            })
        }, 1000 * time)
    }
}

export const removeNotification = () => {
    return {
        type: 'REMOVE_NOTIFICATION'
    }
}

const notificationReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.data
        case 'REMOVE_NOTIFICATION':
            return ''
        default:
            return state
    }
}

export default notificationReducer