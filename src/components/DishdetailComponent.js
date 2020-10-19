import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Label, Row, Col,  } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component{
constructor(props) {
        super(props);
		this.toggleModal = this.toggleModal.bind(this);
		 this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
		  isModalOpen: false	
        };
      }
	
	toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
      }
	
	 handleSubmit(values) {
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    }
	
	
	render(){
		return(
			<div>
			<Button outline onClick={this.toggleModal} ><span className="fa fa-pencil fa-lg"></span> Sumbit Comments</Button>
			
			<Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                   <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                       <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                           <Row className="form-group">
							   <Col>
								 <Label htmlFor="rating"> Rating</Label>
								
							    <Control.select model=".rating" name="rating"
                                        className="form-control">
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
                                <Label htmlFor="author">Your Name</Label>
							
                                <Control.text model=".author" id="author" name="author"
                                        placeholder="Your Name"
                                        className="form-control"
										validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
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
                                 <Label htmlFor="comment" >Comment</Label>
                                     <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="12"
                                        className="form-control" />
                               </Col> 
                            </Row>
                            <Button type="submit" value="submit" color="primary">Submit</Button>
                        </LocalForm>        
                    </ModalBody>
                </Modal>
				</div>
		);		
	}
}
 
function RenderDish({dish}) {
        if (dish != null)
            return (
                <Card >
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        else
            return (
                <div></div>
            );
    }
	
function RenderComments({comments, addComment, dishId}) {
        if (comments.length !== 0) {
            return (
                <div>
                    <h4>Comments</h4>
                    {comments.map(comment => (
                        <ul className="list-unstyled">
                            <li>
                                <p>{comment.comment}</p>
                                <p>-- {comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                            </li>
                        </ul>
                    )
                    )}
				    <p>
					 <CommentForm dishId={dishId} addComment={addComment} />
					</p>
                </div>
			
          
            );
        }
        else {
            return (
                <div></div>
            );

        }
    }
	
	
	
const DishDetail = (props) =>  {
     	if (props.dish != null) {
           return  (
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
                        <RenderComments comments={props.comments}
                          addComment={props.addComment}
                          dishId={props.dish.id} />
                    </div>
                </div>
                </div>
            )
        } 
		else { return (
            <div></div>
        )}

} 	

	

export default DishDetail ;

