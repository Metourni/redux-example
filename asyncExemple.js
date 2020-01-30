const redux = require("redux");
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const thunkMiddleware = require("redux-thunk").default;
const axios = require("axios");


// The initial state
const initialState = {
    loading: false,
    data: [],
    error: ''
};

// The actions name
const FETCH_DATA_REQUEST = "FETCH_DATA_REQUEST";
const FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS";
const FETCH_DATA_FAILURE = "FETCH_DATA_FAILURE";

// Actions
const fetchDataRequest = () => {
    return {
        type: FETCH_DATA_REQUEST
    }
};

const fetchDataSuccess = (data) => {
    return {
        type: FETCH_DATA_SUCCESS,
        payload: data
    }
};

const fetchDataFailure = (error) => {
    return {
        type: FETCH_DATA_FAILURE,
        payload: error
    }
};

// Reducer

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DATA_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: ""
            };
        case FETCH_DATA_FAILURE:
            return {
                ...state,
                loading: false,
                data: [],
                error: action.payload
            };
        default:
            return state;
    }
};

// fetch data from api
// we will fetch data from fake api for demo
const fetchData = () => {
    return function (dispatch) {
        dispatch(fetchDataRequest());
        axios.get("https://jsonplaceholder.typicode.com/users")
            .then((response) => {
                //response.data;
                let names= response.data.map(raw => raw.name);
                dispatch(fetchDataSuccess(names));
            })
            .catch((error) => {
                // error.message
                dispatch(fetchDataFailure(error.message));
            })
    }
};

// Create store
/*
* Thunks are the recommended middleware for basic Redux side effects logic,
* including complex synchronous logic that needs access to the store,
* and simple async logic like AJAX requests.
* */

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

const unsubscribable = store.subscribe(()=>{
    console.log("Updated state",store.getState());
});
/*
* Using thunkMiddleware we can dispatch a function instance of action
* and this function can have access to dispatch so it can dispatch other actions by it self.
* */
store.dispatch(fetchData());
