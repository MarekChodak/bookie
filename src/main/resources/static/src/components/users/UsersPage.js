import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as usersActions from '../../actions/userActions';
import UsersTable from "./UsersTable";

class UsersPage extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.addUser = this.addUser.bind(this);
  }

  addUser(user){
    this.props.actions.addUser(user);
  }

  componentDidMount() {
    this.props.actions.loadAllUsers();
  }

  render() {
    return (
      <div>
        <UsersTable onAddUser={this.addUser} users={this.props.users}/>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(usersActions, dispatch)
  };
}

function mapStateToProps(state, ownProps) {
  return {
    users: state.users
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersPage);
