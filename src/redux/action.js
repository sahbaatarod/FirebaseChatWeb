import { CALL, CHANGE_LOAD } from "./type";

export const callAction = () => {
  return {
    type: CALL,
  };
};

// Show Blocked Loading
export const changeLoad = () => {
  return {
    type: CHANGE_LOAD,
  };
};
