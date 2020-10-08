import * as ACTIONS_TYPES from '../../action-types'

const ADD_NEW_MARK = (newMark) => {
  return {
    type: ACTIONS_TYPES.ADD_NEW_MARK,
    payload: {
      newMark
    }
  }

}


const DELETE_MARK = (_id) => {
  return {
    type: ACTIONS_TYPES.DELETE_MARK,
    payload: {
      _id
    }
  }
}

const CHANGE_VISIBLE_MARK = (_id) => {
  return {
    type: ACTIONS_TYPES.CHANGE_VISIBLE_MARK,
    payload: {
      _id
    }
  }
}

const CHANGE_COORDS_MARK = (_id, position) => {
  return {
    type: ACTIONS_TYPES.CHANGE_COORDS_MARK,
    payload: {
      _id,
      position
    }
  }
}

const ADD_MESSAGE_MARK = (_id, newMessage) => {
  return {
    type: ACTIONS_TYPES.ADD_MESSAGE_MARK,
    payload: {
      _id,
      newMessage
    }
  }
}








export {
  ADD_NEW_MARK,
  DELETE_MARK,
  CHANGE_VISIBLE_MARK,
  CHANGE_COORDS_MARK,
  ADD_MESSAGE_MARK
}
