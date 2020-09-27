import { VisitorApi } from 'api/Visitor'

export const setData = (payload: VisitorApi) => {
  return {
    type: 'VISITOR_SET_DATA',
    payload
  }
}

export const clearData = () => {
  return {
    type: 'VISITOR_CLEAR_DATA'
  }
}
