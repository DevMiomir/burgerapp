import React, { Component } from "react";
import { connect } from "react-redux";


import Button from "../../../components/UI/Button/Button";
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Input from "../../../components/UI/Input/Input";

class ContactData extends Component {
    state= {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (e) => {
        e.preventDefault();
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            customer: {
                name: 'Mika Mikic',
                address: {
                    street: 'Testerska 1',
                    zipCode: '123456',
                    country: 'Serb'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
        .then(response => {
            this.setState({ loading: false})
            this.props.history.push('/');
        })
        .catch(error => {
            this.setState({ loading: false})
        });
    }

    render() {
        return(
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Data</h4>
                <form>
                    <Input inputtype='input'  type="text" name="name" placeholder="Your name" />
                    <Input inputtype='input'  type="email" name="email" placeholder="Your email" />
                    <Input inputtype='input'  type="text" name="street" placeholder="Street" />
                    <Input inputtype='input'  type="text" name="postal" placeholder="Postal code" />
                    <Button btnType="Success" clicked={this.orderHandler}>Order here</Button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

export default connect(mapStateToProps)(ContactData);