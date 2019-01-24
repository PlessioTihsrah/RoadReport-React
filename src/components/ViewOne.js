import React from "react";
import { getPost } from "../actions";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { CardGroup, Button, Card, CardBody, Container, CardTitle, CardText, CardFooter, CardColumns,ModalBody, CardImg, ModalFooter, Modal} from 'reactstrap';

class ViewOne extends React.Component{
    
    constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
    
    
  }
    
    componentDidMount(){this.props.getPost(this.props.match.params.id);}
    
    getMap = () => {
        if(this.props.post && this.props.post.latitude!=="NA" && this.props.post.latitude!=="undefined")
        return(
            <Card>
                <CardBody>
                <h1 className="card-title text-center">Location</h1>
                <hr/>
                <iframe title="map"
                    width="100%"
                    height="400"
                    frameBorder="0" 
                    src={`https://www.google.com/maps/embed/v1/view?key=AIzaSyDvc3HWIYxPNjvJVu4oNTLKMaAY3toI2pQ
                    &center=${this.props.post.latitude},${this.props.post.longitude}
                    &zoom=20`} allowFullScreen>
                </iframe>
                <hr/>
                <CardText>
                    The accident happened around this area. You can scroll the map for more information
                </CardText>
                <CardFooter>
                    <small className="text-muted ">Reported on {this.props.post.date}</small>
                </CardFooter>
                </CardBody>
            </Card>
            )}
            
    getPhoto = (photos) =>{
        if(photos.length>0){
            const pics = photos.map((photo) =>{
                return(
                    <Card key={photo}>
                        <CardImg top src={photo} alt=""/>
                        <Button color="dark" outline block onClick={this.toggle}>View</Button>
                        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                         <ModalBody>
                            <img src ={photo} alt="" width="100%"/>
                         </ModalBody>
                        <ModalFooter>
                            <Button color="dark" outline block onClick={this.toggle}>Close</Button>
                        </ModalFooter>
                        </Modal>
                    </Card>
                        )
                })
            return pics;
                }}
                
    getPhotos = () => {
        return(
             <Card className="ml-1">
                <CardBody>
                    <CardTitle>
                        <h1 className="text-center">Photographs</h1>
                    </CardTitle>
                <hr/>
                    <CardColumns>
                        { this.getPhoto(this.props.post.photos) }
                    </CardColumns>
                </CardBody>
             </Card>
             )}
    
    getDetails = () => {
        return (
        <Card class="ml-1">
    <CardBody>
        <CardTitle>
      <h1 class="text-center">Details</h1>
      </CardTitle>
      <hr/>
      <CardText className="mt-4"><span class = "h5"><b>Reported By: </b></span>{this.props.post.name}</CardText>
      <CardText><span class = "h5"><b>Mobile Number: </b></span>+91{this.props.post.mobile}</CardText>
      <CardText><span class = "h5"><b>Additional Details: </b></span>{this.props.post.extra}</CardText>
      <hr/>
      <CardText><span class = "h5"><b>Injuries: </b></span>{this.props.post.injuries}</CardText>
      <CardText><span class = "h5"><b>Interview with eyewitness: </b></span>{this.props.post.interview}</CardText>
      <CardText><span class = "h5"><b>Reason for Accident: </b></span>{this.props.post.reason}</CardText>
      <CardText><span class = "h5"><b>Road Conditions: </b></span>{this.props.post.conditions}</CardText>
      <CardText><span class = "h5"><b>Speed: </b></span>{this.props.post.speed}</CardText>
      <hr/>

      <CardFooter>
       <Link class = "btn btn-outline-dark btn-block" to = {`/add/${this.props.match.params.id}`}>Add Photographs</Link>
       <Link class = "btn btn-outline-dark btn-block" to = {`/addinfo/${this.props.match.params.id}`}>Add/Edit Information</Link>
    </CardFooter>
    </CardBody>
</Card>
            )}
    
    render(){
        if(this.props.post._id){
            return(
        <Container>
            <CardGroup>
        {this.getMap()}
        {this.getPhotos()}
        {this.getDetails()}
        </CardGroup>
         </Container>)
            
        } else {
            return(<div></div>)
        }
        
    }
}

const mapStateToPros = state =>{
    return{
        post: state.report.post
    }
}
export default connect(mapStateToPros, {getPost})(ViewOne);