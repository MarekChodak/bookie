import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import AdminGamesTable from './AdminGamesTable'
import * as gamesActions from '../../actions/gamesActions';

class AdminGamesPage extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.addGame = this.addGame.bind(this);
    this.updateGame = this.updateGame.bind(this);
  }

  addGame(game){
    this.props.actions.addGame(game);
  }

  updateGame(game){
    this.props.actions.updateGame(game);
  }

  componentDidMount() {
    this.props.actions.loadAdminGames();
  }

  render() {
    return (
      <div>
        <AdminGamesTable onAddGame={this.addGame} onUpdateGame={this.updateGame} games={this.props.adminGames}/>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(gamesActions, dispatch)
  };
}

function mapStateToProps(state, ownProps) {
  return {
    adminGames: state.adminGames
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminGamesPage);
