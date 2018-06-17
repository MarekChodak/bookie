import React from 'react';
import './dose.css'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class Dose extends React.Component {

  constructor(props) {
    super(props);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  handleDateChange(date) {
    this.props.updateDoseDate(this.props.dose.number, date);
  }

  render() {
    let dose = this.props.dose;

    return (
      <div className="form-group">
        <label>Dose {dose.number}:</label>
        <div style={{display: 'inline-block', marginLeft : '10px'}}>
          <DatePicker
            selected={dose.date}
            onChange={this.handleDateChange}
            className="doseCalendar"
          />
        </div>
      </div>
    );
  }
}

export default Dose;
