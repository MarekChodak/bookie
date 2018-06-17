import React from 'react';
import moment from 'moment';
import './bets-popup.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


class BetsPopup extends React.Component {

  constructor(props) {
    super(props);

    let bet = {};
     if(this.props.game.bettingAllowed){
       bet = this.findUserBet(this.props.user.username, this.props.game.bets);
     }

    this.state = {
      bet: Object.assign({}, bet)
    };
    this.handleScoreAChange = this.handleScoreAChange.bind(this);
    this.handleScoreBChange = this.handleScoreBChange.bind(this);
    this.handleAddButton = this.handleAddButton.bind(this);
    this.reset = this.reset.bind(this);
    this.createPopup = this.createPopup.bind(this);
  }

  findUserBet(username, bets) {
    if(bets.length === 0 ){
      return {};
    }
    return bets.filter( bet => bet.user === username)[0];
  }

  componentWillReceiveProps(nextProps) {
    let bet;
    if(nextProps.game.bettingAllowed){
      bet = this.findUserBet(nextProps.user.username, nextProps.game.bets);
    }

    this.state = {
      bet: Object.assign({}, bet)
    };
  }

  handleAddButton() {
    this.props.onBetSave(this.props.game, this.state.bet.scoreA, this.state.bet.scoreB);
    this.reset();
  }

  reset() {
    const resetDate = moment();
    let game = Object.assign(this.state.bet, {scoreA: null, scoreB: null});
    this.setState({
      game: game,
      date: resetDate
    });
  }

  handleScoreAChange(event) {
    let bet = Object.assign(this.state.bet, {scoreA: event.target.value});
    this.setState({
      bet: bet
    });
  }

  handleScoreBChange(event) {
    let bet = Object.assign(this.state.bet, {scoreB: event.target.value});
    this.setState({
      bet: bet
    });
  }

  renderBetForm(){
    return <div><div className="form-group">
      <label htmlFor="newMeasureWeight">{this.props.game.teamA} score:</label>
      <input onChange={this.handleScoreAChange} value={this.state.bet.scoreA} placeholder="Score"
             id="newMeasureWeight" type="text" className="form-control"/>
    </div>

      <div className="form-group">
        <label htmlFor="newMeasureHeight">{this.props.game.teamB} score:</label>
        <input onChange={this.handleScoreBChange} value={this.state.bet.scoreB} placeholder="Score"
               id="newMeasureHeight" type="text" className="form-control"/>
      </div>
    </div>
  }

  renderAllBets(){
    let rows = this.props.game.bets.map(bet => <tr>
      <td>{bet.user}</td>
      <td>{bet.scoreA}</td>
      <td>{bet.scoreB}</td>
    </tr>);

    return <div>
      <table width="300px">
        <th>User</th>
        <th>{this.props.game.teamA}</th>
        <th>{this.props.game.teamB}</th>
        {rows}
      </table>
    </div>;
  }

  renderContent(){
    if(this.props.game.bettingAllowed){
      return this.renderBetForm();
    } else {
      return this.renderAllBets();
    }
  }

  createPopup(){

    let saveButton = '';
    if(this.props.game.bettingAllowed){
      saveButton = <div className="modal-footer">
        <button onClick={this.handleAddButton} type="button" className="btn btn-success">Save</button>
      </div>;
    }

    return <div className="modal"
                style={{display: "block", position: "absolute", marginTop: "10px"}}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header custom-modal-header">
            <div>
              <h3 style={{display: "inline"}}>Bet</h3>
              <button onClick={this.props.onClose} type="button"
                      className="btn btn-warning btn-sm measurePanelClose">Close
              </button>
            </div>
          </div>
          <div className="modal-body">
            {this.renderContent()}
          </div>
          {saveButton}
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

export default BetsPopup;
