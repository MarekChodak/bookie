import React from 'react';
import './game-display.css'
import moment from "moment";

class GameDisplay extends React.Component {

  constructor(props) {
    super(props);
    this.showBetPopup = this.showBetPopup.bind(this);
    let bet = this.findUserBet(this.props.user.username, this.props.game.bets);
    this.state = {
      bet
    }
  }

  componentWillReceiveProps(nextProps) {
    let bet = this.findUserBet(nextProps.user.username, nextProps.game.bets);
    this.state = {
      bet
    }
  }

  showBetPopup(){
    this.props.betAction(this.props.game);
  }

  findUserBet(username, bets) {
    if(bets.length === 0 ){
      return null;
    }
    return bets.filter( bet => bet.user === username)[0];
  }

  renderActionButton(bettingAllowed) {
    if(bettingAllowed){
      return <button id="addMeasureBtn" className="btn btn-success" onClick={this.showBetPopup}>
        <i className="fa fa-usd fa-sm" aria-hidden="true"/> Bet
      </button>;
    } else {
      return <button id="addMeasureBtn" className="btn btn-success" onClick={this.showBetPopup}>
        <i className="fa fa-usd fa-sm" aria-hidden="true"/> Show All Bets
      </button>;
    }
  }


  renderYourBet() {
    if(this.state.bet){
      return <div className="yourBet">Your bet {this.state.bet.scoreA} : {this.state.bet.scoreB}</div>
    } else {
      return <span/>
    }
  }

  render() {
    const bettingAllowed = this.props.game.bettingAllowed;
    const game = this.props.game;
    const actionButton = this.renderActionButton(bettingAllowed);
    const yourBet = this.renderYourBet();
    return (
      <div className="center-block panel panel-primary gamePanel">
        <div id="gameHeadPanel" className="panel-heading gameHead">
          {yourBet}
          <h3 className="panel-title">{moment.utc(game.gameDate).format('YYYY-MM-DD HH:mm')}</h3>
          {actionButton}
        </div>
        <div className="panel-body">
          <div className="container-fluid">
            <div className="row">
              <div className="gameField col-lg-5 col-md-5 col-sm-5">
                {game.teamA}
                <span className="score-left">{game.scoreA}</span>
              </div>
              <div className="gameField col-lg-2 col-md-2 col-sm-2">
                :
              </div>
              <div className="gameField col-lg-5 col-md-5 col-sm-5">
                <span className="score-right">{game.scoreB}</span>
                {game.teamB}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GameDisplay;
