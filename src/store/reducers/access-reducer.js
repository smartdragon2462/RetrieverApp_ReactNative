const setAccess = (state = {}, action) => {
  switch (action.type) {
    case 'SET_ACCESS':
      return action.access;
    default:
      return state;
  }
};
export default setAccess;
