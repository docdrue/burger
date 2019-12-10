import React, { useState } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as actions from '../../../store/actions/index';
import { checkValidity } from '../../../shared/utillity';

const contactData = props => {
    const [orderForm, setOrderForm] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Name'
            },
            value: '',
            validation: {
                required: true,
                minLength: 10
            },
            valid: false,
            touched: false
        },
        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Street'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        zipCode: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'ZIP Code'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        country: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Country'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your E-mail'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        deliveryMethod: {
            elementType: 'select',
            elementConfig: {
                options: [
                    {value: 'fastest', displayValue: 'Fastest'},
                    {value: 'cheapest', displayValue: 'Cheapest'},
                ]
            },
            value: 'fastest',
            valid: true

        }});
    const [formIsValid, setFormIsValid ] = useState(false);

    const orderHandler = (e) => {
        e.preventDefault();
        //this.setState({loading: true});
        const formDAta = {};
        for (let formElement in orderForm) {
            formDAta[formElement] = orderForm[formElement].value;
        }

        const order = {
            ingredients: props.ings,
            price: props.price,
            orderData: formDAta,
            userId: props.userId
        };
        props.onOrderBurger(order, props.token)
        // axios.post('/orders.json', order)
        //     .then(res => {
        //         this.setState({loading: false});
        //         props.history.push('/')
        //     })
        //     .catch(error => {
        //         this.setState({loading: false})
        //     });

    };

    const inputChangedHandler = (e, input) => {
        const updatedOrderForm = {
            ...orderForm
        };
        const updatedFormElement = {...updatedOrderForm[input]};
        updatedFormElement.value = e.target.value;
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[input] = updatedFormElement;

        let formIsValid = true;
        for (let input in updatedOrderForm) {
            formIsValid = updatedOrderForm[input].valid && formIsValid;
        }
        setOrderForm(updatedOrderForm);
        setFormIsValid(formIsValid)
        //this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid})
    };

    const formElementsArray = [];
    for (let key  in orderForm) {
        formElementsArray.push({
            id: key,
            config: orderForm[key]
        })
    }
    // console.log(formElementsArray)
    let form = (
        <form onSubmit={orderHandler}>
            {formElementsArray.map(formElement => (
                <Input
                    invalid={!formElement.config.valid}
                    key={formElement.id}
                    name={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    shouldValidate={formElement.config.validation}
                    changed={(event) => inputChangedHandler(event, formElement.id)}
                    touched={formElement.config.touched}
                />
            ))}
            <Button btnType='Success' disabled={!formIsValid}>ORDER</Button>
        </form>
    );
    if ( props.loading) {
        form = <Spinner/>
    }
    return (
        <div className={classes.ContactData}>
            <h4>Enter Your Data</h4>
            {form}
        </div>
    )
};

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loding: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
};

const mapDispatchToProps = dispatch => {
    return {
       onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(contactData, axios));
