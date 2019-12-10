import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom'

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button'
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import { checkValidity } from '../../shared/utillity';

const auth = props => {
    const [controls, setControls] = useState({
        email: {
            elementType: 'input',
                elementConfig: {
                type: 'email',
                    placeholder: 'Mail Address'
            },
            value: '',
                validation: {
                required: true,
                    isEmail: true
            },
            valid: false,
                touched: false
        },
        password: {
            elementType: 'input',
                elementConfig: {
                type: 'password',
                    placeholder: 'Password'
            },
            value: '',
                validation: {
                required: true,
                    minLength: 6
            },
            valid: false,
                touched: false
        }
    });
    const [isSignUp, setIsSignUp] = useState(true);
    const { onSetAuthRedirectPath, building, authRedirectPath } = props;

    useEffect(() => {
        if (!props.building && props.authRedirectPath !== '/') {
            onSetAuthRedirectPath();
        }
    }, [onSetAuthRedirectPath, authRedirectPath, building]);


    const inputChangedHandler = (e, controlName) => {
        const updatedControls = {
            ...controls,
            [controlName]: {
                ...controls[controlName],
                value: e.target.value,
                valid: checkValidity(e.target.value, controls[controlName].validation),
                touched: true
            }
        };
        setControls(updatedControls)
        // this.setState({controls: updatedControls})
    };

    const submitHandler = (event) => {
        event.preventDefault();
        props.onAuth(controls.email.value, controls.password.value, isSignUp)
    };

    const switchAuthModeHandler = (e) => {
        e.preventDefault();
        setIsSignUp(!isSignUp)
    };

    const formElementsArray = [];
    for (let key  in controls) {
        formElementsArray.push({
            id: key,
            config: controls[key]
        })
    }

    let form = formElementsArray.map (formElement => (
        <Input
            key={formElement.id}
            invalid={!formElement.config.valid}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            shouldValidate={formElement.config.validation}
            changed={(event) => inputChangedHandler(event, formElement.id)}
            touched={formElement.config.touched}
        />
    ));
    if (props.loading) {
        form = <Spinner/>
    }

    let errorMsg = null;
    if (props.error) {
        errorMsg = (<p>{props.error.message}</p>)
    }

    let authRedirect = null;

    if (props.isAuthenticated) {
        authRedirect = <Redirect to={props.authRedirectPath}/>
    }

    return (
        <div className={classes.Auth}>
            {authRedirect}
            {errorMsg}
            <form onSubmit={submitHandler}>
                {form}
                <Button btnType="Success">Submit</Button>
            </form>
                <Button btnType="Danger" clicked={(e) => switchAuthModeHandler(e)}>SWITCH TO {isSignUp ? 'SIGN IN' : 'SIGN UP'}</Button>
        </div>
    )
};

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        building: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirect
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, method) => dispatch(actions.auth(email, password, method)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(auth);
