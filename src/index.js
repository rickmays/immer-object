import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { legacy_createStore as createStore } from "redux";
import { Provider } from "react-redux";
import produce from "immer";
import Airplane from "./Airplane";

const UPDATE_ALTITUDE = "UPDATE_ALTITUDE";
const UPDATE_LATITUDE = "UPDATE_LATITUDE";
const ASSIGN_PASSENGER = "ASSIGN_PASSENGER";
const CHANGE_PILOT_NAME = "CHANGE_PILOT_NAME";
const ADD_AIRPORT = "ADD_AIRPORT";
const CLEAR_ROUTE = "CLEAR_ROUTE";

const updateAltitude = (newAltitude) => ({
  type: UPDATE_ALTITUDE,
  newAltitude: newAltitude,
});

const updateLatitude = (newLatitude) => ({
  type: UPDATE_LATITUDE,
  newLatitude: newLatitude,
});

const assignPassenger = (passenger) => ({
  type: ASSIGN_PASSENGER,
  passenger: passenger,
});

const changePilotName = (pilot) => ({
  type: CHANGE_PILOT_NAME,
  pilot: pilot,
});

const addAirport = (newAirport) => ({
  type: ADD_AIRPORT,
  newAirport: newAirport,
});

const clearRoute = () => ({
  type: CLEAR_ROUTE,
});

const initialState = {
  altitude: 1200,
  airspeed: 120,
  position: {
    latitide: 72,
    longitude: 42,
  },
  plannedRoute: ["KBOS", "KBED", "KORH"],
  seats: {
    0: {
      name: "Dave",
    },
    1: null,
    2: null,
    3: null,
  },
};

const reducer = produce((draft = initialState, action) => {
  switch (action.type) {
    case UPDATE_ALTITUDE:
      draft.altitude = action.newAltitude;
      return draft;
    case UPDATE_LATITUDE:
      draft.position.latitude = action.newLatitude;
      return draft;
    case ASSIGN_PASSENGER:
      draft.seats[1] = { name: action.passenger };
      return draft;
    case CHANGE_PILOT_NAME:
      draft.seats[0] = { name: action.pilot };
      return draft;
    case ADD_AIRPORT:
      draft.plannedRoute.push(action.newAirport);
      return draft;
    case CLEAR_ROUTE:
      draft.plannedRoute = [];
      return draft;
    default:
      return draft;
  }
});

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__({ trace: true })
);

store.dispatch(updateAltitude(1300));
store.dispatch(updateLatitude(73));
store.dispatch(assignPassenger("Jimmy"));
store.dispatch(changePilotName("Lynne"));
store.dispatch(addAirport("KASH"));
// store.dispatch(clearRoute());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <Provider store={store}>
      <Airplane />
    </Provider>
  </StrictMode>
);
