import React from 'react';
import * as gamesActions from '../../actions/gamesActions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import GamesTable from "./GamesTable";

class DashboardPage extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.onBetSave = this.onBetSave.bind(this);
  }

  onBetSave(game, scoreA, scoreB){
    this.props.actions.saveBet(game, scoreA, scoreB);
  }

  render() {
    return (
      <div>
        <GamesTable games={this.props.games} onBetSave={this.onBetSave} user={this.props.user}/>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(gamesActions, dispatch)
  };
}

function mapStateToProps(state, ownProps1) {
  return {
    games: state.games,
    user: state.user
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
