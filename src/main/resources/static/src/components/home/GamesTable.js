import React from 'react';
import GameDisplay from "./GameDisplay";
import BetsPopup from "./BetsPopup";

class GamesTable extends React.Component {

  constructor(props) {
    super(props);
    this.renderGames = this.renderGames.bind(this);
    this.onBetSave = this.onBetSave.bind(this);
    this.onClose = this.onClose.bind(this);
    this.betAction = this.betAction.bind(this);
    this.state = {
      popupVisible: false,
      game: {}
    }
  }

  onBetSave(game, scoreA, scoreB) {
    this.props.onBetSave(game, scoreA, scoreB);
    this.onClose();
  }

  onClose() {
    this.setState({
      popupVisible: false
    });
  }

  betAction(game) {
    this.setState({
      popupVisible: true,
      game: game
    });
  }

  renderGames() {
    let games = this.props.games.slice(0);
    return games.map(game => <GameDisplay game={game} betAction={this.betAction} user={this.props.user}/>);
  }

  render() {
    return (
      <div style={{position: "relative"}}>
        {this.renderGames()}
        <BetsPopup visible={this.state.popupVisible} onClose={this.onClose} onBetSave={this.onBetSave}
                   game={this.state.game} user={this.props.user}/>
      </div>
    );
  }
}

export default GamesTable;
