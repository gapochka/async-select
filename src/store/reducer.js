const initialState = {
  label: '',
  value: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_VALUE':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default reducer;
