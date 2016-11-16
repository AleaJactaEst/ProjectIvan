import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Link } from 'react-router';

class Feature extends Component {
    componentWillMount() {
        this.props.fetchMessage();
           }

    render() {
        return (
            <button className="btn btn-success">
                <Link className="nav-link" to="/profile">{this.props.message}</Link>
            </button>
        );
    }
}

function mapStateToProps(state) {

    return { message: state.auth.message };
}

export default connect(mapStateToProps, actions)(Feature);