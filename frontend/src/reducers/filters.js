import {
  ADD_FILTER,
  REMOVE_FILTER,
  UPDATE_TYPE,
  UPDATE_FILTER
} from "../actions/types";

const initialFilters = {
  type: "",
  manufacturer: [],
  model: [],
  title: [],
  course: []
};

const filters = (state = initialFilters, action) => {
  switch (action.type) {
    case ADD_FILTER:
      return {
        ...state,
        [action.name]: [...state[action.name], action.value]
      };
    case REMOVE_FILTER:
      return {
        ...state,
        [action.name]: state[action.name].filter(
          value => value !== action.value
        )
      };
    case UPDATE_FILTER:
      return {
        ...state,
        [action.name]: action.value
      };
    case UPDATE_TYPE:
      return { ...state, type: action.payload };
    default:
      return state;
  }
};

export default filters;
