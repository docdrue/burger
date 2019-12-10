import React, { useState, useEffect, useCallback } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';

import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as burgerBuilderActions from '../../store/actions/index'


const burgerBuilder = props => {
    // state = {
    //     //ingredients: null,
    //     //totalPrice: 4,
    //     //purchasable: false,
    //     purchasing: false,
    //     //loading: false,
    //     //error: false
    // };
    const [purchasing, setPurchasing] = useState(false);

    const dispatch = useDispatch();

    const ings = useSelector(state => {
        return state.burgerBuilder.ingredients
    });
    const ttPrice = useSelector(state => state.burgerBuilder.totalPrice);
    const error = useSelector(state => state.burgerBuilder.error);
    const isAuthenticated = useSelector(state => state.auth.token !== null);

    const onIngredientAdded = (name) => dispatch(burgerBuilderActions.addIngredient(name));
    const onIngredientRemove = (name) => dispatch(burgerBuilderActions.removeIngredient(name));
    const onInitIngredient = useCallback(() => dispatch(burgerBuilderActions.initIngredients()), []);
    const onInitPurchase = () => dispatch(burgerBuilderActions.purchaseInit());
    const onSetAuthRedirect = (path) => dispatch(burgerBuilderActions.setAuthRedirectPath(path));


    //const {onInitIngredient} = props;

    useEffect(() => {
        onInitIngredient();
        // axios.get('https://burger-81278.firebaseio.com/ingredients.json')
        //     .then(res => {
        //         setState({ingredients: res.data})
        //     })
        //     .catch(error => {
        //         this.setState({error: true})
        //     } )
    }, [onInitIngredient]);

    const updatePurchasable  = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return  sum > 0;
        // this.setState({purchasable: sum > 0});
    }

    // addIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCounted = oldCount + 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updatedCounted;
    //     const priceAddition = INGREDIENT_PRICE[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;
    //     this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
    //     this.updatePurchasable(updatedIngredients);
    // };

    // removeIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     if (oldCount <= 0) {
    //         return;
    //     }
    //     const updatedCounted = oldCount - 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updatedCounted;
    //     const priceDeduction = INGREDIENT_PRICE[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - priceDeduction;
    //     this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
    //     this.updatePurchasable(updatedIngredients);
    //
    // };

    const purchaseHandler = () => {
        if (isAuthenticated) {
            setPurchasing(true);
        } else {
            onSetAuthRedirect('/checkout')
            props.history.push('/auth')
        }
    };

    const closeModalHandler = () => {
        setPurchasing(false);
    };

    const purchaseContinueHandler = () => {
        // alert('You Continue!')
        // this.setState({loading: true});
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'Max',
        //         address: {
        //             street: 'Test street',
        //             zipCode: '5443435',
        //             country: 'USA'
        //         },
        //         email: 'test@test.com'
        //     },
        //     deliveryMethod: 'fastest'
        // }
        // axios.post('/orders.json', order)
        //     .then(res => {
        //         this.setState({loading: false, purchasing: false})
        //     })
        //     .catch(error => {
        //         this.setState({loading: false, purchasing: false})
        //     });

        // const queryParams = [];
        // for (let i in this.state.ingredients) {
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        // }
        // queryParams.push('price=' + (this.state.totalPrice).toFixed(2))
        // const queryString = queryParams.join('&');
        // this.props.history.push({
        //     pathname: '/checkout',
        //     search: '?' + queryString
        // })
        onInitPurchase();
        props.history.push('/checkout')

    };

    const disableInfo = {
        // ...this.state.ingredients
        ...ings
    };
    for (let key in disableInfo) {
        disableInfo[key] = disableInfo[key] <= 0
    }

    let orderSummary = null;
    let burger = error ? <p>Ingredients can't be loaded</p> : <Spinner/>;
    if (ings) {
        burger =  (
            <Aux>
                <Burger ingredients={ings}/>
                <BuildControls
                    ingredientAdded={onIngredientAdded}
                    ingredientRemove={onIngredientRemove}
                    disabled={disableInfo}
                    price={ttPrice}
                    purchasable={updatePurchasable(ings)}
                    ordered={purchaseHandler}
                    isAuth={isAuthenticated}
                />
            </Aux>
        );
        orderSummary = <OrderSummary
            ingredients={ings}
            cancelled={closeModalHandler}
            continue={purchaseContinueHandler}
            // price={state.totalPrice}
            price={ttPrice}
        />;

    }
    // if (state.loading) {
    //     orderSummary = <Spinner/>
    // }

    return(
        <Aux>
            <Modal show={purchasing} modalClosed={closeModalHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </Aux>
    );
};

// const mapStateToProps = state => {
//     return {
//         ings: state.burgerBuilder.ingredients,
//         ttPrice: state.burgerBuilder.totalPrice,
//         error: state.burgerBuilder.error,
//         isAuthenticated: state.auth.token !== null
//     }
// };
//
// const mapDispatchToProps = dispatch => {
//     return {
//         onIngredientAdded: (name) => dispatch(burgerBuilderActions.addIngredient(name)),
//         onIngredientRemove: (name) => dispatch(burgerBuilderActions.removeIngredient(name)),
//         onInitIngredient: () => dispatch(burgerBuilderActions.initIngredients()),
//         onInitPurchase: () => dispatch(burgerBuilderActions.purchaseInit()),
//         onSetAuthRedirect: (path) => dispatch(burgerBuilderActions.setAuthRedirectPath(path))
//     }
// };

// export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(burgerBuilder, axios));
export default withErrorHandler(burgerBuilder, axios);
