import {
    ADD_FILTER,
    REMOVE_FILTER,
    UPDATE_TYPE,
    RECEIVE_LISTINGS,
    UPDATE_FILTER,
} from '../actions/types';

const initialFilters = {
    type: '',
    category: [],
    varietal: [],
    country: [],
    winery: [],
    size: [],
    price: [],
    producer: [],
    initialPrice: [],
    initialSize: [],
};

const getMinMax = (property, products, ids) => {
    let list = ids
        .map((id) => products[id])
        .map((product) => product[property]);
    return [Math.min(...list), Math.max(...list)];
};

const filters = (state = initialFilters, action) => {
    switch (action.type) {
        case RECEIVE_LISTINGS:
            let size = getMinMax('size', action.payload, action.ids);
            let price = getMinMax('salePrice', action.payload, action.ids);
            return {
                ...state,
                size,
                price,
                initialPrice: price,
                initialSize: size,
            };
        case ADD_FILTER:
            return {
                ...state,
                [action.name]: [...state[action.name], action.value],
            };
        case REMOVE_FILTER:
            return {
                ...state,
                [action.name]: state[action.name].filter(
                    (value) => value !== action.value
                ),
            };
        case UPDATE_FILTER:
            return {
                ...state,
                [action.name]: action.value,
            };
        case UPDATE_TYPE:
            return { ...state, type: action.payload };
        default:
            return state;
    }
};

export default filters;
