import React from 'react';
import AdminGamesPopUp from "./AdminGamesPopup";
import TableEditButton from "./TableEditButton";
import moment from "moment";

class AdminGamesTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      popupVisible: false
    };
    this.showAddPopup = this.showAddPopup.bind(this);
    this.onClose = this.onClose.bind(this);
    this.addGame = this.addGame.bind(this);
    this.updateGame = this.updateGame.bind(this);
    this.onEdit = this.onEdit.bind(this);
  }

  showAddPopup() {
    this.setState({
      popupVisible: true,
      update: false,
      gameToEdit: {},
    });
  }

  addGame(game) {
    this.props.onAddGame(game);
    this.onClose();
  }

  updateGame(game) {
    this.props.onUpdateGame(game);
    this.onClose();
  }

  onClose() {
    this.setState({
      popupVisible: false
    });
  }

  onEdit(index) {
    this.setState({
      popupVisible: true,
      update: true,
      gameToEdit: this.props.games[index],
    });
  }

  render() {
    const rows =
      this.props.games.map(
        (game, idx) => <tr key={idx}>
          <td>{moment.utc(game.gameDate).format('YYYY-MM-DD HH:mm')}</td>
          <td>{game.teamA}</td>
          <td>{game.teamB}</td>
          <td>{game.scoreA}</td>
          <td>{game.scoreB}</td>
          <td><TableEditButton onEdit={this.onEdit} index={idx}/></td>
        </tr>
      );

    var popupFunction = this.state.update ? this.updateGame: this.addGame;


    return (
      <div style={{position: "relative"}}>
        <div id="measuresPanel">
          <div className="panel panel-primary">
            <div id="measuresHeadPanel" className="panel-heading">
              <h3 className="panel-title">Games</h3>
              <button id="addMeasureBtn" className="btn btn-success" onClick={this.showAddPopup}>
                <i className="fa fa-plus fa-lg" aria-hidden="true"/> Add Game
              </button>
            </div>
          </div>
          <div className="panel-body">
            <table className="table">
              <thead>
              <tr>
                <th>Date</th>
                <th>Team A</th>
                <th>Team B</th>
                <th>Score A</th>
                <th>Score B</th>
                <th></th>
              </tr>
              </thead>
              <tbody>
              {rows}
              </tbody>
            </table>
          </div>
        </div>
        <AdminGamesPopUp visible={this.state.popupVisible} onClose={this.onClose} addGame={popupFunction}
                         game={this.state.gameToEdit}/>
      </div>
    );
  }
}

export default AdminGamesTable;
