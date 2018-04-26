import React,{ Component } from 'react';
import QuestionForm from './questions_form';
import QuestionList from './questions_list';
import axios from 'axios';

// const API_BASE = "http://localhost:3000";
const API_BASE = "https://cis-658-create-test-api.herokuapp.com";

function getSession(){
    const session = JSON.parse(sessionStorage.getItem('session'));
    let jwt = '';
    let user_id = '';
    if(session !== null){
        jwt = session.jwt;
        user_id = session.user.id;
    }
    const headers = {
      'Content-Type':'application/json',
      'Authorization':`Bearer ${jwt}`
    };
    return {user_id:user_id, headers};
}


class Questions extends Component {

  constructor(props) {
    super(props);
    const test_id = props.match.params.test_id;
    this.state = {
      questions:[],
      test_id:test_id,
      formMode: "new",
      question:{description:"", thumbnail:""}

    };
    this.loadQuestions = this.loadQuestions.bind(this);
    this.removeQuestion = this.removeQuestion.bind(this);
    this.addQuestion = this.addQuestion.bind(this);
    this.updateQuestion = this.updateQuestion.bind(this);
  }

  updateQuestionForm(mode, answerVals) {
    this.setState({
      question: Object.assign({}, answerVals),
      formMode: mode,
    });
    console.log(this.state.question);
  }
  clearForm()
  {
    console.log("clear form");
    this.updateQuestionForm("new",{description:"",thumbnail:""});
  }

  formSubmitted(question) {
    if(this.state.formMode === "new") {
      this.addQuestion(question);
    } else {
      this.updateQuestion(question);
    }
    this.clearForm();
  }

  loadQuestions() {
    const sess = getSession();
    const test_id = this.state.test_id;
    axios
    .get(`${API_BASE}/users/${sess.user_id}/tests/${test_id}/questions`, {headers:sess.headers})
    .then(res => {
      console.log(res.data);
      this.setState({ questions: res.data });
      console.log(`Questions loaded! = ${JSON.stringify(this.state.tests)}`)
    })
    .catch(err => console.log(err));
  }

  addQuestion(newQuestion) {
    const sess = getSession();
    const test_id = this.state.test_id;
    axios
    .post(`${API_BASE}/users/${sess.user_id}/tests/${test_id}/questions`,newQuestion,{headers:sess.headers})
    .then(res => {
      res.data.key = res.data.id;
      this.setState({ questions: [...this.state.questions, res.data] });
    })
    .catch(err => console.log(err));
  }

  updateQuestion(question) {
    console.log(question);
    const sess = getSession();
    const test_id = this.state.test_id;
    axios
    .put(`${API_BASE}/users/${sess.user_id}/tests/${test_id}/questions/${question.id}`,question,{headers:sess.headers})
    .then(res => {
      this.loadQuestions();
    })
    .catch(err => console.log(err));
  }

  removeQuestion(id) {
    const sess = getSession();
    let filteredArray = this.state.questions.filter(item => item.id !== id)
    this.setState({questions: filteredArray});
    const test_id = this.state.test_id;
    axios
    .delete(`${API_BASE}/users/${sess.user_id}/tests/${test_id}/questions/${id}`,{headers:sess.headers})
    .then(res => {
      console.log(`Record Deleted`);
    })
    .catch(err => console.log(err));
  }

  componentDidMount() {
    console.log("Tests just got mounted")
    this.loadQuestions();
  }

  render() {
    const title = `Test # ${this.state.test_id} Workspace`;
    return (
        <div className="py-5 bg-light">
            <div className="container">
              <div className="row">
                  <div className="col-md-9">
                      <h1>{title}</h1>
                  </div>
              </div>
              <div className="row">
                <div className="col-md-8">
                    <QuestionList
                      questions={this.state.questions}
                      onDelete={(id) => this.removeQuestion(id)}
                      onEdit={(mode,question) => this.updateQuestionForm(mode,question)}
                    />
                </div>
                <div className="col-md-4">
                    <QuestionForm
                      onSubmit={(question) => this.formSubmitted(question)}
                      onCancel={(mode,question) => this.updateQuestionForm(mode,question)}
                      formMode={this.state.formMode}
                      question={this.state.question}
                    />
                </div>
              </div>
            </div>
        </div>
    );
  }
}

export default Questions;
