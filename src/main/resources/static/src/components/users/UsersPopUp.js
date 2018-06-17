import React from 'react';
import './users-popup.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


class UsersPopUp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleAddButton = this.handleAddButton.bind(this);
    this.reset = this.reset.bind(this);
    this.createPopup = this.createPopup.bind(this);
  }

  handleAddButton() {
    let user = Object.assign({}, this.state.user);
    this.props.addUser(user);
    this.reset();
  }

  reset() {
    this.setState({
      user: {}
    });
  }

  handleUsernameChange(event) {
    let user = Object.assign(this.state.user, {username: event.target.value});
    this.setState({
      user: user
    });
  }

  handlePasswordChange(event) {
    let user = Object.assign(this.state.user, {password: event.target.value});
    this.setState({
      user: user
    });
  }

  createPopup(){
    return <div className="modal"
                style={{display: "block", position: "absolute", marginTop: "10px"}}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header custom-modal-header">
            <div>
              <h3 style={{display: "inline"}}>Add User</h3>
              <button onClick={this.props.onClose} type="button"
                      className="btn btn-warning btn-sm measurePanelClose">Close
              </button>
            </div>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="measureHour" className="block" style={{marginRight: '10px'}}>Username:</label>
              <input onChange={this.handleUsernameChange} value={this.state.user.username} placeholder="Username"
                     id="newMeasureHour" type="text" className="form-control"/>
            </div>

            <div className="form-group">
              <label htmlFor="newMeasureWeight">Password:</label>
              <input onChange={this.handlePasswordChange} value={this.state.user.password} placeholder="Password"
                     id="newMeasureWeight" type="password" className="form-control"/>
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

export default UsersPopUp;
