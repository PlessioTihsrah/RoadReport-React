import React from "react";
import {connect} from "react-redux"
import { Field, reduxForm } from 'redux-form';
import { getLocation, locationError} from "../actions";
import api from '../api/api';
import history from '../history';
import { Input, Button, Label, InputGroup, InputGroupAddon, FormGroup, Container, Row, Form} from 'reactstrap';
const qs = require('qs');


class Report extends React.Component{
    locError = (e) => {
        e.preventDefault();
        this.props.locationError();
    }
    renderInput({input, label}){
        switch (label) {
            case 'First Name':
            case 'Last Name':
                return(
                <div className="col">
                <Label htmlFor={label} className="text-light mt-3"><h5>{label}*</h5></Label>
                <Input id={label} {...input} type="text" placeholder={label}  required/>
                </div>
                )
            case 'Mobile No.':
                return(
            <InputGroup className="mb-3 mt-4">
            <InputGroupAddon addonType="prepend">+91</InputGroupAddon>
            <Input type="number" {...input} aria-describedby="code" min="4000000000" max="9999999999" placeholder={label} required />
            </InputGroup>
            )
            case 'Additional Details' :
                return(
            <FormGroup>
            <Label for="{label}" className="text-light mt-3"><h4>{label}</h4></Label>
            <Input type="textarea"  htmlFor="form" {...input} id="{label}" rows="3" />
            </FormGroup>
            )
            default: 
        }
    }
    
    componentDidMount(){
        this.props.getLocation();
        }
    getMap = () => {
        if(this.props.latitude!=='NA' && this.props.latitude!=null){
            return(
    <>            
    <div className="text-light mt-3" id="hehe">
        <h5>Is this your current location?</h5>
        <Button onClick={this.locationYes} color="success" className="mb-1">Yes, submit Report</Button>
        <Button onClick={this.locError} color = "danger" className="ml-2 mb-1">No</Button>
    </div>
    <iframe
        title='map'
        width= "100%"
        height="400"
        frameBorder="0" 
        src={`https://www.google.com/maps/embed/v1/search?key=AIzaSyDvc3HWIYxPNjvJVu4oNTLKMaAY3toI2pQ
        &q=hospitals+near+me&center=${this.props.latitude},${this.props.longitude}
        &zoom=20`} allowFullScreen>
    </iframe>
    </>
        )
        } else if (this.props.latitude == null){
        return(
            <div className="spinner-border text-light m-5 text-center" style={{width: '3rem', height: '3rem'}} role="status">
                <span className="sr-only">Loading...</span>
            </div>
        )
    } else{
        return(
            <div className="text-light mt-3">
                    <h3>Cannot get your Location. Please add accident location details in additional details</h3>
                    <Button color="success" className="mt-3" block>Submit Report</Button>  
            </div>
        )
    }}
     onSubmit = async (data) => {
         const response = await api.post("/report", qs.stringify({
             first: data.first,
             last: data.last,
             mobile: data.mobile,
             extra: data.extra,
             latitude: this.props.latitude,
             longitude: this.props.latitude
         }))
         if(response.data.message === "success"){
             history.push("/");
         }
    }
    render(){
        return(
            <Container>
            <Form id="form" className = "container mt-5" onSubmit= {this.props.handleSubmit(this.onSubmit)}>
                <Row>
                    <Field name = "first" component={this.renderInput} label="First Name"/>
                    <Field name = "last" component={this.renderInput} label="Last Name"/>
                </Row>
                    <Field name="mobile" component={this.renderInput} label="Mobile No."/>
                    <Field name="extra" component={this.renderInput} label="Additional Details"/>
                <div id="map">
                {this.getMap()}
                </div>
                
            </Form>
            </Container>
    )}
}
const mapStateToProps = state =>{
  return {
    latitude: state.location.latitude,
    longitude : state.location.longitude
  }
}

export default connect(mapStateToProps, {getLocation, locationError})(reduxForm({form: "Report"})(Report));