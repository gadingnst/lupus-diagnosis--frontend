const initial: any = {
  data: {},
  logged: false
}

export default (state = initial, action: any) => {
  switch (action.type) {
    case 'ADMIN_SET_DATA':
      return {
        ...state,
        data: action.payload,
        logged: true
      }
    case 'ADMIN_CLEAR_DATA':
      return {
        ...state,
        data: {},
        logged: false
      }
    default:
      return state
  }
}
