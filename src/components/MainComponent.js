import React, { Component } from 'react';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';

import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';

import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import Home from './HomeComponent';


const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}
class Main extends Component {

  constructor(props) {
    super(props);
	 
  }

  render() {
	  
	  const HomePage = () => {
      return(
           <Home 
              dish={this.props.dishes.filter((dish) => dish.featured)[0]}
              promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
              leader={this.props.leaders.filter((leader) => leader.featured)[0]}
          />
      );
    }
	
	const Aboutuspage = () => {
      return(
           <About 
              leaders={this.props.leaders}
          />
      );
    }
	
	
	const DishWithId = ({match}) => {
      return(
          <DishDetail dish={this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
            comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} />
      );
    };
		  
    return (
      <div>
		<Header />
		  <Switch>
			  <Route path='/aboutus' component={Aboutuspage} />
              <Route path='/home' component={HomePage} />
		  	  <Route exact path='/contactus' component={Contact} />} />
	   		  <Route path='/menu/:dishId' component={DishWithId} />
              <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />} />
              <Redirect to="/home" />
          </Switch>

		<Footer />	
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(Main));