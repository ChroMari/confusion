import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Row, Col, Label, Modal, ModalHeader, ModalBody, Form, FormGroup, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);


function RenderDish({dish}) {
  if (dish != null) {
    return (
      <Card>
        <CardImg top src={dish.image} alt={dish.name} />
        <CardBody className ="text-left">
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    );
  } else {
    return (
      <div></div>
    );
  }
 }

function RenderComments ({commentsDish, addComment, dishId}) {
  if (commentsDish != null) {
    const dishComments = commentsDish.map(comment => {
      return (
        <div>
        <p>{comment.comment}</p>
        <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
      </div>
      );
    });
    return (
      <div className="text-left">
        <h4>Comments</h4>
        <ul className="list-unstyled">
          {dishComments}
        </ul>
        <CommentForm dishId={dishId} addComment={addComment} />
      </div>
    )
  } else {
    return (
      <div></div>
    )
  }
}

class CommentForm extends React.Component {

  constructor(props) {
      super(props);

      this.toggleModal = this.toggleModal.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      
      this.state = {
        isNavOpen: false,
        isModalOpen: false
      };
  }

  toggleModal() {
      this.setState({
        isModalOpen: !this.state.isModalOpen
      });
  }

  handleSubmit(values) {
    
    this.toggleModal();
    this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);



    //event.preventDefault();
}

  render() {
      return(
      <div>
          <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
          <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
              <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                  <Row className="form-group">
                      <Col>
                      <Label htmlFor="rating">Rating</Label>
                      <Control.select model=".rating" id="rating" className="form-control">
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                      </Control.select>
                      </Col>
                  </Row>
                  <Row className="form-group">
                      <Col>
                      <Label htmlFor="comment">Your Name</Label>
                      <Control.text model=".firstname" id="firstname" name="firstname"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".firstname"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                      </Col>
                  </Row>
                  <Row className="form-group">
                      <Col>
                      <Label htmlFor="comment">Comment</Label>
                      <Control.textarea model=".comment" id="comment"
                                  rows="6" className="form-control" />
                      </Col>
                  </Row>
                  <Button type="submit" className="bg-primary">
                      Submit
                  </Button>
              </LocalForm>
          </ModalBody>
         </Modal>
      </div>
      );
  }

}

const  DishDetail = (props) => {

  return (
    <div className="container">
    <div className="row">
        <Breadcrumb>

            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
        </div>                
    </div>
    <div className="row">
        <div className="col-12 col-md-5 m-1">
            <RenderDish dish={props.dish} />
        </div>
        <div className="col-12 col-md-5 m-1">
            <RenderComments commentsDish ={props.comments} addComment={props.addComment} dishId={props.dish.id}/>
        </div>
    </div>
                
    </div>
);
};


export default DishDetail;