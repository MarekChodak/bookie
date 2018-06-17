import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import DashboardPage from './home/DashboardPage';
import SideMenu from './sideMenu/SideMenu';
import AdminGamesPage from "./games/AdminGamesPage";
import UsersPage from "./users/UsersPage";

class App extends React.Component {

  render() {
    return (
      <Router>
        <div className="container-fluid">
          <div className="row">
            <SideMenu/>
            <div className="container-fluid">
              <div className="mainView">
                <Route exact path="/" component={DashboardPage}/>
                <Route exact path="/games" component={AdminGamesPage}/>
                <Route exact path="/users" component={UsersPage}/>
              </div>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
