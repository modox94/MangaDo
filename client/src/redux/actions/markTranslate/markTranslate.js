import * as ACTIONS_TYPES from '../../action-types'

const ADD_NEW_MARK_TRANSLATE = (newMark) => {
  return {
    type: ACTIONS_TYPES.ADD_NEW_MARK_TRANSLATE,
    payload: {
      newMark
    }
  }

}


const DELETE_MARK_TRANSLATE = (_id) => {
  return {
    type: ACTIONS_TYPES.DELETE_MARK_TRANSLATE,
    payload: {
      _id
    }
  }
}

const CHANGE_VISIBLE_MARK_TRANSLATE = (_id) => {
  return {
    type: ACTIONS_TYPES.CHANGE_VISIBLE_MARK_TRANSLATE,
    payload: {
      _id
    }
  }
}

const CHANGE_COORDS_MARK_TRANSLATE = (_id, position) => {
  return {
    type: ACTIONS_TYPES.CHANGE_COORDS_MARK_TRANSLATE,
    payload: {
      _id,
      position
    }
  }
}




export {
  ADD_NEW_MARK_TRANSLATE,
  DELETE_MARK_TRANSLATE,
  CHANGE_VISIBLE_MARK_TRANSLATE,
  CHANGE_COORDS_MARK_TRANSLATE

}
