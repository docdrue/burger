import React, { useEffect, Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from 'react-redux'

import Layout from './hoc/Layout/Layout'
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
// import Checkout from "./containers/Ckeckout/Ckeckout";
// import Orders from "./containers/Orders/Orders";
// import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import * as actions from './store/actions/index';
// import asyncComponent from "./hoc/asyncComponent/asyncComponent";

const Checkout = React.lazy(() => {
    return import('./containers/Ckeckout/Ckeckout');
});

const Order = React.lazy(() => {
    return import('./containers/Orders/Orders');
});

const Auth = React.lazy(() => {
    return import('./containers/Auth/Auth');
});

const app = props => {
    const { onTryAutoSignUp } = props;

    useEffect(() => {
        onTryAutoSignUp();
    }, [onTryAutoSignUp]);

    // componentDidMount() {
    //     setTimeout(() => {
    //         this.setState({show: false})
    //     }, 5000)
    // }

        let routes = (
            <Switch>
                <Route path='/auth' render={(props) => <Auth {...props}/>} />
                <Route path='/' exact component={BurgerBuilder} />
                <Redirect to='/' />
            </Switch>
        );
        if (props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route path='/checkout' render={(props) => <Checkout {...props}/>} />
                    <Route path='/orders' render={(props) => <Order {...props}/>} />
                    <Route path='/logout' component={Logout} />
                    <Route path='/auth' render={(props) => <Auth {...props}/>} />
                    <Route path='/' exact component={BurgerBuilder} />
                    <Redirect to='/' />
                </Switch>
            )
        }
    return (
      <div>
        <Layout>
            {/*{this.state.show ? <BurgerBuilder/> : null}*/}
            {/*<BurgerBuilder/>*/}
            {/*<Checkout />*/}
            <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
        </Layout>
      </div>
    );
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignUp: () => dispatch(actions.authCheckState())
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(app));
