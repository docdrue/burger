import React from 'react';

import classes from './BuildControls.css'
import BuildControl from '../BuildControls/BuildControl/BuildControl'
import button from "eslint-plugin-jsx-a11y/src/util/implicitRoles/button";

const controls = [
    { label: 'Salad', type: 'salad'},
    { label: 'Bacon', type: 'bacon'},
    { label: 'Cheese', type: 'cheese'},
    { label: 'Meat', type: 'meat'}
]

const buildControls = props => (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(item => (
            <BuildControl
                key={item.label}
                label={item.label}
                added={() => props.ingredientAdded(item.type)}
                remove={()=> props.ingredientRemove(item.type)}
                disabled={props.disabled[item.type]}
            />
        ))}
        <button
            className={classes.OrderButton}
            disabled={!props.purchasable}
            onClick={props.ordered}
        >{props.isAuth ? 'ORDER NOW' : "Sing Up to Order"}</button>

    </div>
);

export default buildControls;
