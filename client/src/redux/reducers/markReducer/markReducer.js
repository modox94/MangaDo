import * as ACTIONS_TYPES from '../../action-types'

const translateReducer = (state = [], action) => {
  switch (action.type) {


    case ACTIONS_TYPES.ADD_NEW_MARK:

      return [
        ...state, action.payload.newMark
      ]

    case ACTIONS_TYPES.DELETE_MARK:
      return state.filter(el => el._id !== action.payload._id)


    case ACTIONS_TYPES.CHANGE_VISIBLE_MARK:
      return state.map(el => {
        if (el._id === action.payload._id) return { ...el, visible: !el.visible }
        return el
      })

    case ACTIONS_TYPES.CHANGE_COORDS_MARK:
      return state.map(el => {
        if (el._id === action.payload._id) return { ...el, position: action.payload.position }
        return el
      })

      case ACTIONS_TYPES.ADD_MESSAGE_MARK:
        return state.map(el => {
          if (el._id === action.payload._id) return { ...el, messages: [...el.messages, action.payload.newMessage ]}
          return el
        })

    default:
      return state

  }
}

export default translateReducer
