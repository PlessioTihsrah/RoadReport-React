import React from "react";
import {connect} from "react-redux"
import { Link } from 'react-router-dom';
import {getPosts} from "../actions";
import { Table } from 'reactstrap';

class View extends React.Component{
    componentDidMount(){
        this.props.getPosts();
    }
    
    showPosts = (posts) => {
        if(posts.length === 0){
            return(
                <div className="spinner-border text-light m-5 text-center" style={{width: '3rem', height: '3rem'}} role="status">
                <span className="sr-only">Loading...</span>
            </div>
            )}else{
           const postss =  posts.map((post, index)=>{
               return(
          <tbody key = {post._id}>
            <tr>
                <th scope="row">{index+1}</th>
        <td>{post._id}</td>
            <td>{post.date}</td>
                <td><Link to={`/viewOne/${post._id}`}>Click here</Link></td>
            </tr> 
  </tbody>
                  )
  })
              return(
    <Table dark bordered style={{backgroundColor: 'rgba(1,1,1,0.6)'}}>
    <thead>
    <tr>
      <th scope="col">S.No</th>
      <th scope="col">ID</th>
      <th scope="col">Date of Report</th>
      <th scope="col">More Info</th>
    </tr>
  </thead>
  {postss}
   </Table>
                  ) }}
                     
                
    render(){
    return(
    <div className = "container mt-5">
  {this.showPosts(this.props.posts)}
    </div>    
    )}}

const mapStateToProps = (state) => {
    return{
    posts: state.report.posts
    }
}

export default connect(mapStateToProps, {getPosts})(View);