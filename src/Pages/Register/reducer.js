import { ACTIONS } from "../../Actions";

export const reducer = (state, action) => {
  switch (action.type) {
      case ACTIONS.HANDLE_INPUT_CHANGE:
          return {
              ...state,
              [action.id]: action.value,
          };
      case ACTIONS.HANDLE_CHECKBOX_CHANGE:
          return {
              ...state,
              isChecked: action.checked,
          };
      case ACTIONS.LOADING:
          return {
              ...state,
              isLoading: action.isLoading,
          };
      case ACTIONS.ERROR:
          return {
              ...state,
              error: action.error,
          };
      case ACTIONS.SELECT_PHONE:
          return {
              ...state,
              selectPhone: action.value,
          };
      default:
          return state;
  }
};