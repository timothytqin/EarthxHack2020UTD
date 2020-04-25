import { ADD_FILTER, REMOVE_FILTER, UPDATE_TYPE, UPDATE_FILTER } from './types';

export const addFilter = (filterName, filterValue) => {
    return {
        type: ADD_FILTER,
        name: filterName,
        value: filterValue,
    };
};

export const removeFilter = (filterName, filterValue) => {
    return {
        type: REMOVE_FILTER,
        name: filterName,
        value: filterValue,
    };
};

export const updateType = (newType) => {
    return {
        type: UPDATE_TYPE,
        payload: newType,
    };
};

export const updateFilter = (filterName, filterValue) => {
    return {
        type: UPDATE_FILTER,
        name: filterName,
        value: filterValue,
    };
};
