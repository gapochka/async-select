interface StateProps {
  label: string;
  value: string;
}

interface ActionProps {
  type: string;
  payload: StateProps;
}

const initialState = {
  label: '',
  value: '',
};

const reducer = (state: StateProps = initialState, action: ActionProps) => {
  switch (action.type) {
    case 'CHANGE_VALUE':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default reducer;
