import React, { useEffect } from 'react';
import { connect } from 'react-redux'

import axios from '../../axios-orders'
import Order from '../../components/Order/Order';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner'

const orders = props => {
    // state = {
    //     orders: [],
    //     loading: true
    // }
    const {onFetchOrders} = props;
    useEffect (() => {

        props.onFetchOrders(props.token, props.userId);
        // axios.get('/orders.json')
        //     .then(res => {
        //         const fetchOrders = [];
        //         for (let key in res.data) {
        //             fetchOrders.push({
        //                 ...res.data[key],
        //                 id: key
        //             })
        //         }
        //         this.setState({loading: false, orders: fetchOrders})
        //     })
        //     .catch(err => {
        //         this.setState({loading: false})
        //     })
    }, [onFetchOrders]);

    let orders = <Spinner/>;
    if (!props.loading) {
        orders = props.orders.map(order => (
                <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={+order.price}
                />
            ))
    }
    return (
        <div>
            {orders}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(orders, axios));
