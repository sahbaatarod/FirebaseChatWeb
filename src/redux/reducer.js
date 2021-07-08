import { CALL, CHANGE_LOAD } from "./type";

const initialState = {
  name: "max",
  loading: false,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CALL:
      console.log("action called");
      return state;
    case CHANGE_LOAD:
      return {
        ...state,
        loading: !state.loading,
      };
    default:
      return state;
  }
};
