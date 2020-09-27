const initial: any = {
  data: {},
  logged: false
}

export default (state = initial, action: any) => {
  switch (action.type) {
    case 'VISITOR_SET_DATA':
      return {
        ...state,
        data: action.payload,
        logged: true
      }
    case 'VISITOR_CLEAR_DATA':
      return {
        ...state,
        data: {},
        logged: false
      }
    default:
      return state
  }
}
