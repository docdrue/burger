import React from 'react';

import classes from './DrawerToggle.css'

const drawerToggle = props => {

    return (
    <div onClick={props.clicked} className={classes.DrawerToggle}>
        <span></span>
        <span></span>
        <span></span>
    </div>
)};

export default drawerToggle;