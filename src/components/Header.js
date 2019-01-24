import React from "react";
import { Link } from 'react-router-dom';
import {  Collapse, Navbar, NavbarToggler, Nav, NavItem} from 'reactstrap';
import { getSignInStatus, signOut } from "../actions";
import { connect } from "react-redux";

class Header extends React.Component {
      constructor(props){
        super(props);
      this.getData = (isSignedIn, user) =>{
        
        if(isSignedIn == null){
          return(
            <div className="spinner-border text-light" role="status">
                <span className="sr-only">Loading...</span>
                </div>
            )} else if(isSignedIn){
          return (
           <React.Fragment>
            <NavItem>
              <Link className="nav-link text-light" to="#">Hello, {user}</Link>
            </NavItem>
            <NavItem>
              <Link className="nav-link text-light" to="/view">View All Reports</Link>
            </NavItem>
            <NavItem>
              <button onClick={this.props.signOut}className="btn nav-link text-light">Logout</button>
            </NavItem></React.Fragment>
            )} else {
            return (
            <React.Fragment>
            <NavItem>
              <Link className="nav-link" to="/login">Login</Link>
            </NavItem>
            <NavItem>
              <Link className="nav-link" to="/signup">Signup</Link>
            </NavItem>
            </React.Fragment>
            )}}
      
        
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
      }
    componentDidMount(){
      this.props.getSignInStatus();
      
    }
    render() {

    return(
      
    <div>
        <Navbar className="navbar navbar-expand-lg navbar-dark sticky-top" style={{backgroundColor: 'rgba(1,1,1,0.3)'}}>
          <Link className="navbar-brand" to="/">Accident Report</Link>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
            {this.getData(this.props.isSignedIn, this.props.user.email)}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
        
    )
    }
}
const mapStateToProps = state =>{
  return {
    user: state.auth.user,
    isSignedIn : state.auth.isSignedIn
  }
}

export default connect(mapStateToProps, {getSignInStatus, signOut})(Header);