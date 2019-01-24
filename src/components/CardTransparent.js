import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardImg, CardText, CardBody,
  CardTitle } from 'reactstrap';

const CardTransparent = ({src, title, subtitle, link}) => {
    return(
    <Card className="border-light text-light" style={{backgroundColor: 'rgba(1,1,1,0.6)'}}>
        <CardImg top src={src} alt=""/>
        <CardBody>
            <CardTitle>
                <h5>{title}</h5>
            </CardTitle>
            <CardText>{subtitle}</CardText>
            <Link className="btn btn-outline-light btn-lg btn-block" to={link}>Enter</Link>
        </CardBody>
    </Card>
    )
};

export default CardTransparent;