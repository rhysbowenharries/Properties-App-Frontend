import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import "./App.css";
import Routes from "./Routes";
import { LinkContainer } from "react-router-bootstrap";
import { Auth } from "aws-amplify";


class App extends Component {

  constructor(props) {
    super(props);
  
    this.state = {
      isAuthenticated: false,
      isAuthenticating: true
    };
  }

  async componentDidMount() {
    try {
      await Auth.currentSession();
      this.userHasAuthenticated(true);
    }
    catch(e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }
  
    this.setState({ isAuthenticating: false });
  }
  
  
  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }
  
  handleLogout = event => {
    this.userHasAuthenticated(false);
    this.props.history.push("/login");

  }

  render() {
  const childProps = {
    isAuthenticated: this.state.isAuthenticated,
    userHasAuthenticated: this.userHasAuthenticated
  };

  return (
    !this.state.isAuthenticating &&
    <div className="App container">
      <Navbar fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/properties">D-Lux Properties</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            {this.state.isAuthenticated

              ? 
              <Fragment>
                 <LinkContainer to="/clients">
                  <NavItem>Clients</NavItem>
                </LinkContainer>
                <LinkContainer to="/properties">
                  <NavItem>Properties</NavItem>
                </LinkContainer>
                  <NavItem onClick={this.handleLogout}>Logout</NavItem>
              </Fragment>
              : <Fragment>
                 
                  <LinkContainer to="/signup">
                    <NavItem>Signup</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <NavItem>Login</NavItem>
                  </LinkContainer>
                </Fragment>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes childProps={childProps} />
    </div>
  );
}

}

export default withRouter(App);


