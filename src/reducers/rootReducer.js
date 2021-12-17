const initState = {
  userID: "",
  history: [],
  givenID: 0,
};

const rootReducer = (state = initState, action) => {
  if (action.type === "GET_USER_ID") {
    state = {
      ...state,
      userID: action.id,
      givenID: state.givenID + 1,
    };
  }
  if (action.type === "MAKE_HISTORY") {
    state = {
      ...state,
      history: [...state.history, action.item],
    };

    console.log(state.history);
  }
  return state;
};

export default rootReducer;
