export const initialState = null

export const reducer = (state, action) => {
  switch (action.type) {
    case 'USER':
      return action.payload
    case 'CLEAR':
      return null
    case 'UPDATE':
      return {
        ...state,
        ...action.payload,
      }

    default:
      return state
  }
}
