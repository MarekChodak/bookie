import React from 'react';
import UsersPopUp from "./UsersPopUp";

class UsersTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      popupVisible: false
    };
    this.showAddPopup = this.showAddPopup.bind(this);
    this.onClose = this.onClose.bind(this);
    this.addUser = this.addUser.bind(this);
  }

  showAddPopup() {
    this.setState({
      popupVisible: true,
      update: false,
      gameToEdit: {},
    });
  }

  addUser(user) {
    this.props.onAddUser(user);
    this.onClose();
  }


  onClose() {
    this.setState({
      popupVisible: false
    });
  }

  render() {
    const rows =
      this.props.users.map(
        (game, idx) => <tr key={idx}>
          <td>{game.username}</td>
        </tr>
      );
    return (
      <div style={{position: "relative"}}>
        <div id="measuresPanel">
          <div className="panel panel-primary">
            <div id="measuresHeadPanel" className="panel-heading">
              <h3 className="panel-title">Users</h3>
              <button id="addMeasureBtn" className="btn btn-success" onClick={this.showAddPopup}>
                <i className="fa fa-plus fa-lg" aria-hidden="true"/> Add User
              </button>
            </div>
          </div>
          <div className="panel-body">
            <table className="table">
              <thead>
              <tr>
                <th>Username</th>
              </tr>
              </thead>
              <tbody>
              {rows}
              </tbody>
            </table>
          </div>
        </div>
        <UsersPopUp visible={this.state.popupVisible} onClose={this.onClose} addUser={this.addUser}/>
      </div>
    );
  }
}

export default UsersTable;
