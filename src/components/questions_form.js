import React, { Component } from 'react';
import Formsy from 'formsy-react';
import { Button } from 'reactstrap';
import MyInput from './Input';

class QuestionForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
        canSubmit: true,
        question:{
          description:"",
          thumbnail:"",
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
    console.log(data);
    this.props.onSubmit({
      description:data.description,
      thumbnail:data.thumbnail,
      id: this.state.question.id,
    });
    resetForm();
  }

  handleCancel(event)
  {
    this.props.onCancel("new", {description:"", thumbnail:""});
    event.preventDefault();
  }

  componentWillReceiveProps(newProps) {
      if (newProps.question != null) {
        const question = newProps.question
        this.setState({
          question: question
        });
        console.log(this.state.question.description);
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
    let title = 'Edit Question';
    if (this.props.formMode === "new") {
        title = 'New Question'
    }
    return (
      <div className="question-form">
        <h1> {title} </h1>
        <Formsy
            onSubmit={this.handleSubmit}
            onValid={this.enableButton}
            onInvalid={this.disableButton}
            className="login">
            <MyInput id= "description" placeholder="Enter a description of the problem"  name="description" title="Question" type="textarea" value={this.state.question.description}
                required />
            <MyInput id= "thumbnail" placeholder="Enter the url of an image"  name="thumbnail" title="Thumbnail" type="text" value={this.state.question.thumbnail}
                 />
            {this.renderButtons()}
        </Formsy>
      </div>
    );
  }
}

export default QuestionForm;
