import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, ButtonGroup, ButtonToolbar } from 'reactstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faEdit from '@fortawesome/fontawesome-free-solid/faEdit'
import faListUl from '@fortawesome/fontawesome-free-solid/faListUl'
import faEraser from '@fortawesome/fontawesome-free-solid/faEraser'

const TestListItem  = (props) =>  {
  return (
    <tr>
      <td>{props.description}</td>
      <td>{props.questionsLength}</td>
      <td>{props.status}</td>
      <td>
        <ButtonToolbar className="text-center">
            <div className="text-center">
                <ButtonGroup size="sm">
                    <Link to={`/users/${props.user_id}/tests/${props.id}/questions`}>
                        <Button color="success">
                            <FontAwesomeIcon icon={faListUl} /> <span> Questions </span>
                        </Button>
                  </Link>
                  <Button color="warning" onClick={event => props.onEdit("edit",props)}>
                     <FontAwesomeIcon icon={faEdit} /> <span>  Edit </span>
                  </Button>
                  <Button color="danger" onClick={event => props.onDelete(props.user_id,props.id)}>
                    <FontAwesomeIcon icon={faEraser} /> <span>  Delete </span>
                  </Button>
                </ButtonGroup>
            </div>
        </ButtonToolbar>
    </td>
  </tr>
);
}

const TestList = (props) => {
  const testItems = props.tests.map((test)  => {
    return (
      <TestListItem
        description={test.description}
        status={test.status}
        user_id={test.user_id}
        questionsLength={test.questions.length}
        id={test.id}
        key={test.id}
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
                <th>Description</th>
                <th># Questions</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {testItems}
            </tbody>
          </Table>
      </div>
  );
}

export default TestList;
