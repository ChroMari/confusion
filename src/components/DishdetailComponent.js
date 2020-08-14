import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component {
  constructor (props) {
    super(props);
    
  }

  renderDish(dish) {
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

  renderComment(comment) {
    return (
      <div>
        <p>{comment.comment}</p>
        <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
      </div>
    )
  }

  renderComments (dish) {
    if (dish != null) {
      const dishComments = dish.comments.map(comment => this.renderComment(comment));
      return (
        <div className="text-left">
          <h4>Comments</h4>
          <ul className="list-unstyled">
            {dishComments}
          </ul>
        </div>
      )
    } else {
      return (
        <div></div>
      )
    }
  }

  render() {
    //const dishComments = this.props.selectedDish.comments.map((comment) => this.renderComments(comment));

    return (
      <div  className="row">
        <div  className="col-12 col-md-5 m-1">
        {this.renderDish(this.props.dish)}
        </div>
        <div  className="col-12 col-md-5 m-1">
          {this.renderComments(this.props.dish)}
        </div>
      </div>
    );
  }
}

export default DishDetail;