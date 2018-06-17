import React from 'react';
import moment from 'moment';
import './adminGames-popup.css';
import DatePicker from 'react-datepicker';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


class AdminGamesPopup extends React.Component {

  constructor(props) {
    super(props);
    let game = Object.assign({}, this.props.game);
    if(!game.gameDate){
        game.gameDate = moment();
    } else {
        game.gameDate = moment.utc(game.gameDate);
    }
    this.state = {
      game: game
    };
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleTeamBChange = this.handleTeamBChange.bind(this);
    this.handleTeamAChange = this.handleTeamAChange.bind(this);
    this.handleScoreAChange = this.handleScoreAChange.bind(this);
    this.handleScoreBChange = this.handleScoreBChange.bind(this);
    this.handleAddButton = this.handleAddButton.bind(this);
    this.handleHourChange = this.handleHourChange.bind(this);
    this.reset = this.reset.bind(this);
    this.createPopup = this.createPopup.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let game = Object.assign({}, nextProps.game);
    if(!game.gameDate){
      game.gameDate = moment();
    } else {
      game.gameDate = moment.utc(game.gameDate);
    }
    this.state = {
      game: game
    };
  }

  handleAddButton() {
    let game = Object.assign({}, this.state.game);
    this.props.addGame(game);
    this.reset();
  }

  reset() {
    const resetDate = moment();
    let game = Object.assign(this.state.game, {gameDate: resetDate, teamA: "", teamB: ""});
    this.setState({
      game: game,
      date: resetDate
    });
  }

  handleDateChange(date) {
    let game = Object.assign(this.state.game, {gameDate: date});
    this.setState({
      game: game
    });
  }

  handleHourChange(event) {
    let date = this.state.game.gameDate;
    let time = event.target.value;
    date.set({hour:time, minute : 0});
    let game = Object.assign(this.state.game, {gameDate: date});
    this.setState({
      game: game
    });
  }

  handleTeamAChange(event) {
    let game = Object.assign(this.state.game, {teamA: event.target.value});
    this.setState({
      game: game
    });
  }

  handleTeamBChange(event) {
    let game = Object.assign(this.state.game, {teamB: event.target.value});
    this.setState({
      game: game
    });
  }

  handleScoreAChange(event) {
    let game = Object.assign(this.state.game, {scoreA: event.target.value});
    this.setState({
      game: game
    });
  }

  handleScoreBChange(event) {
    let game = Object.assign(this.state.game, {scoreB: event.target.value});
    this.setState({
      game: game
    });
  }

  createPopup(){
    return <div className="modal"
                style={{display: "block", position: "absolute", marginTop: "10px"}}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header custom-modal-header">
            <div>
              <h3 style={{display: "inline"}}>Add Game</h3>
              <button onClick={this.props.onClose} type="button"
                      className="btn btn-warning btn-sm measurePanelClose">Close
              </button>
            </div>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="measureDate" className="block" style={{marginRight: '10px'}}>Game date:</label>
              <DatePicker id={"measureDate"}
                          selected={this.state.game.gameDate}
                          onChange={this.handleDateChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="measureHour" className="block" style={{marginRight: '10px'}}>Game time:</label>
              <input onChange={this.handleHourChange} value={this.state.game.gameDate.format('HH')} placeholder="Hour"
                     id="newMeasureHour" type="number" className="form-control"/>
            </div>

            <div className="form-group">
              <label htmlFor="newMeasureWeight">Team A:</label>
              <input onChange={this.handleTeamAChange} value={this.state.game.teamA} placeholder="Name"
                     id="newMeasureWeight" type="text" className="form-control"/>
            </div>

            <div className="form-group">
              <label htmlFor="newMeasureHeight">Team B:</label>
              <input onChange={this.handleTeamBChange} value={this.state.game.teamB} placeholder="Name"
                     id="newMeasureHeight" type="text" className="form-control"/>
            </div>
            <div className="form-group">
              <label htmlFor="newScoreA">Score A:</label>
              <input onChange={this.handleScoreAChange} value={this.state.game.scoreA} placeholder="Score"
                     id="newScoreA" type="number" className="form-control"/>
            </div>
            <div className="form-group">
              <label htmlFor="newScoreB">Score B:</label>
              <input onChange={this.handleScoreBChange} value={this.state.game.scoreB} placeholder="Score"
                     id="newScoreB" type="number" className="form-control"/>
            </div>
          </div>
          <div className="modal-footer">
            <button onClick={this.handleAddButton} type="button" className="btn btn-success">Save</button>
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

export default AdminGamesPopup;
