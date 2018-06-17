import React from 'react';
import './vaccination.css';
import VaccinationsTable from "./VaccinationsTable";
import VaccinationsAddPopup from "./VaccinationsAddPopup";

class VaccinationsPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      addPopupVisible: false
    };

    this.showAddVaccinationPopup = this.showAddVaccinationPopup.bind(this);
  }

  showAddVaccinationPopup() {
    this.setState({
      addPopupVisible: true
    });
  }

  render() {
    return (
      <div style={{position: "relative", minHeight:"700px"}}>
        <div id="vaccinationPanel" >
          <div className="panel panel-primary">
            <div className="panel-heading">
              <h3 className="panel-title">Vaccination</h3>
            </div>
            <div className="panel-body">
              <button onClick={this.showAddVaccinationPopup}>Add Vaccination</button>
              <VaccinationsTable/>
            </div>
          </div>
          <VaccinationsAddPopup visible={this.state.addPopupVisible}/>
        </div>
      </div>
    );
  }
}

export default VaccinationsPage;
