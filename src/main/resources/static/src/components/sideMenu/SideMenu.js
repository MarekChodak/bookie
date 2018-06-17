import React from 'react';
import {NavLink} from 'react-router-dom';
import * as userActions from '../../actions/userActions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class SideMenu extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  adminMenu(){
    return <ul className="nav nav-sidebar main-bar">
      <li>
        <NavLink exact to="/games" activeClassName="active"><i className="fa fa-signal"/>Games</NavLink>
        <NavLink exact to="/users" activeClassName="active"><i className="fa fa-signal"/>Users</NavLink>
      </li>
    </ul>;
  }

  render() {
    let showAdminMenu = this.props.user.role === "ADMIN";

    let menu = showAdminMenu ? this.adminMenu() : null;

    return (<div className="sidebar">
      <NavLink exact to="/" activeClassName="active" className="appNameLink">
        <div className="appName">
          <img src="images/logo.png" className="sideBabyPic" title="No baby"/>
          Bookie
        </div>
        {menu}
      </NavLink>

    </div>);
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
}

function mapStateToProps(state, ownProps1) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
