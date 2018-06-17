import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Dose from "./Dose";

class VaccinationsAddPopup extends React.Component {

  constructor(props) {
    super(props);

    let vaccination = {};

    vaccination.doses = [];

    this.state = {
      vaccination,
      dosesWarning:false
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.addVaccination = this.addVaccination.bind(this);
    this.handleDosesNumberChange = this.handleDosesNumberChange.bind(this);
    this.updateDoseDate = this.updateDoseDate.bind(this);
  }

  createPopup() {

    let doses = this.createDosesRows();
    let warningDiv;
    if(this.state.dosesWarning){
      warningDiv = <div className="doseWarn" >Maximum of five doses are allowed</div>
    }

    return <div className="modal"
                style={{display: "block", position: "absolute", marginTop: "10px"}}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header custom-modal-header">
            <div>
              <h3 style={{display: "inline"}}>Add Vaccination</h3>
              <button onClick={this.props.onClose} type="button"
                      className="btn btn-warning btn-sm measurePanelClose">Close
              </button>
            </div>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="newVaccName">Name:</label>
              <input onChange={this.handleNameChange} value={this.state.vaccination.name} placeholder="Name"
                     id="newVaccName" type="text" className="form-control"/>
            </div>
            <div className="form-group">
              <label htmlFor="dosesNumber">Number of doses:</label>
              <input onChange={this.handleDosesNumberChange} value={this.state.vaccination.doses.length} placeholder="Number"
                     id="dosesNumber" type="number" className="form-control"/>
              <ReactCSSTransitionGroup transitionName="doseWarning">{warningDiv}</ReactCSSTransitionGroup>
            </div>
            <div className="doses">
              {doses}
            </div>
          </div>
          <div className="modal-footer">
            <button onClick={this.addVaccination} type="button" className="btn btn-success">Add</button>
          </div>
        </div>
      </div>
    </div>
  }

  createDosesRows() {
    let doses = this.state.vaccination.doses;
    return doses.map((dose, index) => this.createDoseRow(index, dose));
  }

  createDoseRow(idx, dose){
    return <Dose key={idx} updateDoseDate={this.updateDoseDate} dose={dose} />;
  }

  updateDoseDate(doseNumber, date){
    let newDoses = this.state.vaccination.doses.map(d => Object.assign({}, d));
    let dose = newDoses.filter(dose => dose.number === doseNumber)[0];
    dose.date = date;
    let vacc = Object.assign({}, this.state.vaccination, {doses:newDoses});
    this.setState({
      vaccination : vacc
    });
  }

  addVaccination() {

  }

  handleDosesNumberChange(event) {
    let vacc = this.state.vaccination;
    let dosesNumber = event.target.value;
    let numDosesWarning = false;
    let numberOfDoses = Number(dosesNumber);
    if(numberOfDoses > 5){
      numDosesWarning = true;
      numberOfDoses = 5;
      setTimeout(() => this.setState({ dosesWarning:false}), 3000);
    }

    let doses = Array.from(Array(numberOfDoses), (e, i) => {
     return {number : i + 1}
    });

    vacc = Object.assign({}, vacc, {doses});
    this.setState({
      vaccination:vacc,
      dosesWarning:numDosesWarning
    });
  }

  handleNameChange(event) {
    let vacc = this.state.vaccination;
    vacc = Object.assign({}, vacc, {name : event.target.value});
    this.setState({
      vaccination:vacc
    });
  }

  render() {
    let component;
    if (this.props.visible) {
      component = this.createPopup();
    }
    return (
      <ReactCSSTransitionGroup transitionName="measurePopup" >
        {component}
      </ReactCSSTransitionGroup>
    );
  }



}

export default VaccinationsAddPopup;
