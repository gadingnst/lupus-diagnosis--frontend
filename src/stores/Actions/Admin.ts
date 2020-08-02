import { AdminData } from 'api/Admin'

export const setData = (payload: AdminData) => {
  return {
    type: 'ADMIN_SET_DATA',
    payload
  }
}

export const clearData = () => {
  return {
    type: 'ADMIN_CLEAR_DATA'
  }
}
