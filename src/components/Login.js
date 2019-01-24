import React from 'react';
import {connect} from "react-redux"
import { Field, reduxForm } from 'redux-form';
import {signIn} from "../actions";
import { Button, Container, Form, Input, FormGroup, Label } from 'reactstrap';
const qs = require('qs');



class login extends React.Component{
    renderInput({input, label}){
        const inputField = (label === "Email")?<Input {...input} type= "email"  required id={label}/>: <Input {...input} type= "password" id={label} required/>;
        return(
        <FormGroup>
        <Label for={label} className="text-light">{label}</Label>
        {inputField}
        </FormGroup>
    )}
     onSubmit = (data) => {
        this.props.signIn(qs.stringify(data));
        
    }
    render(){
        return(
            <Container>
            <Form className = "mt-5" onSubmit= {this.props.handleSubmit(this.onSubmit)}>
            <Field name = "email" component={this.renderInput} label="Email"/>
            <Field name = "password" component={this.renderInput} label="Password"/>
            <Button outline color="light" >Login</Button>
            </Form>
            </Container>
    )}
}

export default connect(null, {signIn})(reduxForm({form: "login"})(login));