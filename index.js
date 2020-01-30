const redux = require("redux");

const createStore = redux.createStore;
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;

const createLogger = require("redux-logger").createLogger();

console.log("started");

//--- Actions
// Actions name
const BUY_CAKE = "BUY_CAKE";
const BUY_SANDWICH = "BUY_SANDWICH";

// actionFunction([data]) => object(type,data)
function buyCake(data) {
    return {
        type: BUY_CAKE,
        payload: data
    };
}

function buySandwich(data) {
    return {
        type: BUY_SANDWICH,
        payload: data
    };
}

//--- Reducers
// reducerFunction(previous state, action )=> new state
const initialCakeState = {
    nbCake: 10,
};

const cakeReducer = (state = initialCakeState, action) => {
    switch (action.type) {
        case BUY_CAKE:
            return {
                // create a copy of state
                ...state,
                // update only the number of cake
                nbCake: state.nbCake - action.payload
            };
        default:
            return state
    }
};

const initialSandwichState = {
    nbSandwich: 14
};

const sandwichReducer = (state = initialSandwichState, action) => {
    switch (action.type) {
        case BUY_SANDWICH:
            return {
                // create a copy of state
                ...state,
                // update only the number of cake
                nbSandwich: state.nbSandwich - action.payload
            };
        default:
            return state
    }
};

//--- Store
// combine all the reducers in one single reducer
const mainReducer = combineReducers({cakeReducer, sandwichReducer});
// create the store
const store = createStore(
    mainReducer,
    // logger print in the console all the changes (prev, action ,next) that happen to the state.
    applyMiddleware(createLogger)
);

// get the current state
console.log("Initial state", store.getState());

// subscribe to the store
const unsubscribable = store.subscribe(() => {
    // each time the store is updated this method will be called
    console.log("The current updated state", store.getState());
});

// update the state
store.dispatch(buyCake(2));
store.dispatch(buySandwich(4));
store.dispatch(buyCake(3));

// unsubscribable
unsubscribable();
