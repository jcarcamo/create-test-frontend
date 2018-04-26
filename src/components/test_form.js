import React, { Component } from 'react';
import Formsy from 'formsy-react';
import { Button } from 'reactstrap';
import MyInput from './Input';
import MySelect from './Select';

class TestForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
        canSubmit: true,
        test:{
          description:"",
          status:"",
          id:0
        }
    };
    this.enableButton = this.enableButton.bind(this);
    this.disableButton = this.disableButton.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  enableButton() {
      this.setState({ canSubmit: true });
  }

  disableButton() {
      this.setState({ canSubmit: false });
  }

  handleSubmit(data, resetForm)
  {
    this.props.onSubmit({
      description:data.description,
      status:data.status,
      id: this.state.test.id,
    });
    resetForm();
  }

  handleCancel(event)
  {
    this.props.onCancel("new", {description:"", status:""});
    event.preventDefault();
  }

  componentWillReceiveProps(newProps) {
      if (newProps.test != null) {
        const test = newProps.test
        this.setState({
          test: test
        });
        console.log("Not sure if it arrives here");
        console.log(this.state.test);
      }
  }

  renderButtons() {
    if (this.props.formMode === "new") {
      return(
        <Button color="primary" type="submit" disabled={!this.state.canSubmit}>Create</Button>
      );
    } else {
      return(
        <div className="form-group">
          <Button color="primary" type="submit" disabled={!this.state.canSubmit}>Save</Button>
          <Button color="danger" type="submit" onClick={this.handleCancel} >Cancel</Button>
        </div>
      );
    }
  }

  render()  {
    const options = [
            {
                title:"-- Select One --",
                value:''
            },
            {
                title:"published",
                value:"published",
            },
            {
                title:"unpublished",
                value:"unpublished"
            }
        ];
    let title = 'Edit Test';
    if (this.props.formMode === "new") {
        title = 'New Test'
    }
    return (
      <div className="test-form">
        <h1> {title} </h1>
        <Formsy
            onSubmit={this.handleSubmit}
            onValid={this.enableButton}
            onInvalid={this.disableButton}
            className="test">
            <MyInput id= "description" placeholder="Enter a description"  name="description" title="Description" type="textarea" value={this.state.test.description}
                required />
            <MySelect
                id="status"
                name="status"
                title="Status"
                options={options}
                value={this.state.test.status}
                required
            />
            {this.renderButtons()}
        </Formsy>
      </div>
    );
  }
}

export default TestForm;
