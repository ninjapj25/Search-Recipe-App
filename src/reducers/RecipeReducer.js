import {
    GET_RECIPE_ERROR,
    GET_RECIPE_SUCCESS,
    GET_RECIPE_REQUEST,
} from "../constants";

const initialState = {
    loading: false,
    recipes: [],
    error: null,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_RECIPE_REQUEST:
        case GET_RECIPE_ERROR:
        case GET_RECIPE_SUCCESS:
            return {
                ...state,
                ...action.payload,
            };

        default:
            return state;
    }
}
