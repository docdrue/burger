import React from 'react';

import Aux from '../../../hoc/Aux/Aux'
import Button from '../../UI/Button/Button'

const orderSummary = props => {
    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     console.log('OrderSummary')
    // }

    const ingredientsSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
                </li>
            )
        });

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger from ingredients:</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <strong>Total price: {props.price.toFixed(2)}</strong>
            <p>Continue to CheckOut</p>
            <Button btnType='Danger' clicked={props.cancelled}>CANCEL</Button>
            <Button btnType='Success' clicked={props.continue}>CONTINUE</Button>
        </Aux>
    )
};

export default orderSummary;
