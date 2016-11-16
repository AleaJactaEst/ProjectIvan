import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Link } from 'react-router';

class Profile extends Component {
    componentWillMount() {
       this.props.getUser();
    }

    render() {
        if(this.props.data){
           const data =this.props.data.data;
            return (
                <div className="profile">
                    <h1>{data.name} {data.surname}</h1>
                    <img src="../../img/photo.jpg" alt=""/>
                    <p>Description : <strong>{data.description}</strong></p>
                    <p>Status : <strong>{data.status}</strong></p>
                    <p>Birthday: <strong>{data.birthday}</strong></p>
                    <button className="btn btn-success">
                        <Link className="nav-link" to="/edit">Edit profile</Link>
                    </button>
                </div>
            );
        }else{
            return (
                <div></div>
            );
        }

    }
}

function mapStateToProps(state) {
    return { data: state.auth.data };
}

export default connect(mapStateToProps, actions)(Profile);