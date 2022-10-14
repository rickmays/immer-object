import { connect } from "react-redux";
import "./Airplane.css";

const Airplane = (props) => (
  <div className="container">
    <h2>Airplane Dashboard</h2>
    <p>Altitude: {props.altitude}</p>
    <div className="position"><span>Latitude: {props.position.latitude}</span><span>Longitude: {props.position.longitude}</span></div>
    <h3>Passenger Manifest</h3>
    <ul className="manifest">
      {Object.values(props.seats).map((seat, index) => (
        <li key={index}><span>{`Seat Number: ${index}`}</span><span>{seat ? `Passenger: ${seat.name}` : `Passenger: Vacant`}</span></li>
      ))}
    </ul>
    <h3>Planned Route</h3>
    <ul className="planned-route">
      {props.plannedRoute.map((route, index) => (
        <li key={index}>{route}</li>))}
    </ul>
  </div>
);

const mapState = (state) => {
  return {
    altitude: state.altitude,
    airspeed: state.airspeed,
    position: state.position,
    plannedRoute: state.plannedRoute,
    seats: state.seats,
  };
};

export default connect(mapState)(Airplane);
