import React from "react";
import { connect } from "react-redux";
import CardTransparent from './CardTransparent';
import { Container, Row, CardDeck } from 'reactstrap';
import Carousel from './Carousel';

const get = (isSignedIn) => {
  if(isSignedIn === null){
    return(
      <div className="spinner-border text-light" role="status">
         <span className="sr-only">Loading...</span>
      </div>
      )
  } else if (isSignedIn){
    return(
      <CardTransparent 
        src="pexels-photo-669621.jpg" 
        title="See all Incidents" 
        subtitle="See all reported Incidents by people"
        link="/view"
      />
    )
  } else {
    return(
      <React.Fragment>
        <CardTransparent 
         src="pexels-photo-938958.jpg" 
         title="From Insurance Company?" 
         subtitle="Login here"
         link="/login"
        />
        
        <CardTransparent 
         src="pexels-photo-923681.jpg" 
         title="From Police?" 
         subtitle="Login to See all reported Incidents"
         link="/login"
        />
      </React.Fragment>
  )}
}
const Home = (props) => {
    return(
    <React.Fragment>
      <Carousel />
      <Container>
        <Row className = "mt-5">
          <CardDeck>
              <CardTransparent 
                src="pexels-photo-167964.jpg" 
                title="Report an Accident" 
                subtitle="Saw an Accident? Report with anonymity."
                link="/report"
              />
              {get(props.isSignedIn)}
          </CardDeck>
        </Row>
      </Container>
    </React.Fragment>    
    )
}

const mapStateToProps = state => {
  return {
    isSignedIn : state.auth.isSignedIn
  }
}

export default connect(mapStateToProps)(Home);