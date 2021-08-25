import {
    GET_RECIPE_ERROR,
    GET_RECIPE_REQUEST,
    GET_RECIPE_SUCCESS,
} from "../constants";

export const getRecipe = (search) => async (dispatch, getState) => {
    dispatch({
        type: GET_RECIPE_REQUEST,
        payload: {
            loading: true,
        },
    });
    let checkFetch = (response) => {
        if (!response.ok) {
            throw alert("Please enter a food name.");
        }
        return response;
    };
    fetch(
        `https://api.edamam.com/search?q=${search}&app_id=${process.env.REACT_APP_EDAMAM_ID}&app_key=${process.env.REACT_APP_EDAMAM_KEY}`
    )
        .then(checkFetch)
        .then((res) => res.json())
        .then((data) =>
            dispatch({
                type: GET_RECIPE_SUCCESS,
                payload: {
                    loading: false,
                    recipes: data.hits,
                },
            })
        )
        .catch((e) =>
            dispatch({
                type: GET_RECIPE_ERROR,
                payload: {
                    loading: false,
                    error: e,
                },
            })
        );
};
