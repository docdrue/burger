import React from 'react';

import classes from './Modal.css'
import Backdrop from '../Backdrop/Backdrop'
import Aux from '../../../hoc/Aux/Aux'

const modal = props => {
    // shouldComponentUpdate(nextProps, nextState) {
    //     return nextProps.show !== props.show || nextProps.children !== props.children;
    // }

    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     //console.log('[Modal] Will Update')
    // }

    return (
        <Aux>
            <Backdrop show={props.show} clicked={props.modalClosed}/>
            <div
                style={{
                    transform: props.show ? 'translateY(0)' : "translateY(-100vh)",
                    opacity: props.show ? '1' : '0'
                }}
                className={classes.Modal}>
                {props.children}
            </div>
        </Aux>
    )
};

export default React.memo(modal, (prevProps, nextProps) => nextProps.show === prevProps.show && nextProps.children === prevProps.children);
