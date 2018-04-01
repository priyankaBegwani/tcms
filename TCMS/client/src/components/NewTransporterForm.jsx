import React from 'react';
import PropTypes from 'prop-types';
import { NavLink  } from 'react-router-dom';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';


const NewTransporterForm = ({
  onSubmit,
  onChange,
  errors,
  data
}) => (
  <div className="">
    <form onSubmit={(event) => onSubmit(event,"newTransporter","transporterModal")}>
      <h3 className="heading">New Transporter Details</h3>
      {errors.summary && <p className="error-message">{errors.summary}</p>}
      <hr/>
      <div className="form-style-1">
          <div className="display-inline form-div">
            <label>Name:</label>
            <input type="text" className="field-divided" name="name" value={data.name} placeholder="transporter name" onChange={(event) => onChange(event.target.name, event.target.value,"newTransporter")}/>
          </div>
          <div className="display-inline form-div">
            <label>City:</label>
            <input type="text" name="city" value={data.city} placeholder="city" onChange={(event) => onChange(event.target.name, event.target.value,"newTransporter")}/>
          </div>
      </div>
      <div className="form-style-1">
          <div className="display-inline form-div">
            <label>State:</label>
            <input type="text" className="field-divided" name="state" value={data.state} placeholder="state" onChange={(event) => onChange(event.target.name, event.target.value,"newTransporter")}/>
          </div>
          <div className="display-inline form-div">
            <label>Phone No:</label>
            <input type="text" name="phone" value={data.phone} placeholder="phone no" onChange={(event) => onChange(event.target.name, event.target.value,"newTransporter")}/>
          </div>
      </div>
      <div className="button-line text-center">
        <RaisedButton type="submit" label="Submit" primary />
      </div>
    </form>
  </div>
);

NewTransporterForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired
};

export default NewTransporterForm;
