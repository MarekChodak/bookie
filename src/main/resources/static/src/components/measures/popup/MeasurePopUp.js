import React from 'react';
import moment from 'moment';
import './measures-popup.css';
import DatePicker from 'react-datepicker';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


class MeasurePopUp extends React.Component {

  constructor(props) {
    super(props);
    const startDate = moment();
    this.state = {
      measure: {measureDate: startDate}
    };
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleHeightChange = this.handleHeightChange.bind(this);
    this.handleWeightChange = this.handleWeightChange.bind(this);
    this.handleAddButton = this.handleAddButton.bind(this);
    this.reset = this.reset.bind(this);
    this.createPopup = this.createPopup.bind(this);
  }

  handleAddButton() {
    let measure = Object.assign({}, this.state.measure);
    this.props.addMeasure(measure);
    this.reset();
  }

  reset() {
    const resetDate = moment();
    let measure = Object.assign(this.state.measure, {measureDate: resetDate, weight: "", height: ""});
    this.setState({
      measure: measure,
      date: resetDate
    });
  }

  handleDateChange(date) {
    let measure = Object.assign(this.state.measure, {measureDate: date});
    debugger;
    this.setState({
      measure: measure
    });
  }

  handleWeightChange(event) {
    let measure = Object.assign(this.state.measure, {weight: event.target.value});
    this.setState({
      measure: measure
    });
  }

  handleHeightChange(event) {
    let measure = Object.assign(this.state.measure, {height: event.target.value});
    this.setState({
      measure: measure
    });
  }

  createPopup(){
    return <div className="modal"
                style={{display: "block", position: "absolute", marginTop: "10px"}}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header custom-modal-header">
            <div>
              <h3 style={{display: "inline"}}>Add Measurement</h3>
              <button onClick={this.props.onClose} type="button"
                      className="btn btn-warning btn-sm measurePanelClose">Close
              </button>
            </div>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="measureDate" className="block" style={{marginRight: '10px'}}>Measurement date:</label>
              <DatePicker id={"measureDate"}
                          selected={this.state.measure.measureDate}
                          onChange={this.handleDateChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="newMeasureWeight">Weight(in grams):</label>
              <input onChange={this.handleWeightChange} value={this.state.measure.weight} placeholder="Weight"
                     id="newMeasureWeight" type="number" className="form-control"/>
            </div>

            <div className="form-group">
              <label htmlFor="newMeasureHeight">Height(in cm):</label>
              <input onChange={this.handleHeightChange} value={this.state.measure.height} placeholder="Height"
                     id="newMeasureHeight" type="number" className="form-control"/>
            </div>
          </div>
          <div className="modal-footer">
            <button onClick={this.handleAddButton} type="button" className="btn btn-success">Add</button>
          </div>
        </div>
      </div>
    </div>
  }

  render() {
    let component;
    if(this.props.visible){
        component = this.createPopup();
    }

    return (
      <ReactCSSTransitionGroup transitionName="measurePopup" >
        {component}
      </ReactCSSTransitionGroup>
    );
  }
}

export default MeasurePopUp;
