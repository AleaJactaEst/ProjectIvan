import React, { Component } from 'react';
import * as actions from '../actions';
import { reduxForm } from 'redux-form';

class Edit extends Component {

    componentWillMount() {
        this.props.getUser();

    }
    handleFormSubmit() {
        const data = this.props.values;
        // Call action creator to edit  the user!

        this.props.editUser(data);


    }
    handleChange(event) {
        this.setState({name: event.target.value});
    }



    render() {

        if(this.props.data) {
            this.handleChange = this.handleChange.bind(this);
            const { handleSubmit, fields: { name, surname, description,status,birthday }} = this.props;
            const data = this.props.data.data;
            return (
                <form id="add" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                    <fieldset className="form-group">
                        <label>Name:</label>
                        <input className="form-control" {...name}  placeholder={data.name}   />
                    </fieldset>
                    <fieldset className="form-group">
                        <label>Surname:</label>
                        <input className="form-control" {...surname}  placeholder={data.surname} type="text"  />
                    </fieldset>
                    <fieldset className="form-group">
                        <img src="../../img/photo.jpg" alt=""/>
                    </fieldset>
                    <fieldset className="form-group">
                        <label>Description:</label>
                        <input className="form-control" {...description} type="text" placeholder={data.description}/>
                    </fieldset>
                    <fieldset className="form-group">
                        <label>Status:</label>
                        <input className="form-control" {...status} type="text" placeholder={data.status}/>
                    </fieldset>
                    <fieldset className="form-group">
                        <label>Birthday:</label>
                        <input className="form-control" {...birthday} type="text" placeholder={data.birthday}/>
                    </fieldset>
                    <button action="submit" className="btn btn-primary">Save changes</button>
                </form>
            );
        }else{
            return (
                <div></div>
            )
        }
    }

}

function mapStateToProps(state) {
    return { data: state.auth.data };
}

export default reduxForm({
    form: 'edituser',
    fields: ['name', 'surname', 'description', 'status','birthday'],
}, mapStateToProps, actions)(Edit);