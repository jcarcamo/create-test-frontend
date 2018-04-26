import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, ButtonGroup, ButtonToolbar } from 'reactstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faEdit from '@fortawesome/fontawesome-free-solid/faEdit'
import faListUl from '@fortawesome/fontawesome-free-solid/faListUl'
import faEraser from '@fortawesome/fontawesome-free-solid/faEraser'

const QuestionListItem  = (props) =>  {
  let src = "http://cdn4.crystalcommerce.com/themes/clients/bluehighwaygames/assets/img/ui/no-image-available.png";
  if(props.thumbnail !== ''){
      src = props.thumbnail;
  }
  return (
    <tr>
      <td>{props.description}</td>
      <td>{props.answersLength}</td>
      <td>
          <img src={src} alt="Computer Man" className="thumbnail"/>
      </td>
      <td>
        <ButtonToolbar className="text-center">
            <div className="text-center">
                <ButtonGroup size="sm">
                    <Link to={`/tests/${props.test_id}/questions/${props.id}/answers`}>
                        <Button color="success">
                            <FontAwesomeIcon icon={faListUl} /> <span> Answers </span>
                        </Button>
                  </Link>
                  <Button color="warning" onClick={event => props.onEdit("edit",props)}>
                      <FontAwesomeIcon icon={faEdit} /> <span> Edit </span>
                  </Button>
                  <Button color="danger" onClick={event => props.onDelete(props.id)}>
                    <FontAwesomeIcon icon={faEraser} /> <span> Delete </span>
                  </Button>
                </ButtonGroup>
            </div>
        </ButtonToolbar>
    </td>
  </tr>
);
}

const QuestionList = (props) => {
  const questionItems = props.questions.map((question)  => {
    return (
      <QuestionListItem
        description={question.description}
        thumbnail={question.thumbnail}
        answersLength={question.answers.length}
        id={question.id}
        key={question.id}
        test_id={question.test_id}
        onDelete={props.onDelete}
        onEdit={props.onEdit}
      />
    )
  });

  return (
      <div className="table-responsive">
          <Table hover>
            <thead>
              <tr>
                <th>Question</th>
                <th># Answers</th>
                <th>thumbnail</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {questionItems}
            </tbody>
          </Table>
      </div>
  );
}

export default QuestionList;
