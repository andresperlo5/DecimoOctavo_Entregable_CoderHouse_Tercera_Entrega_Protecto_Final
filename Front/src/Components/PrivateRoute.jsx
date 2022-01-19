import React from 'react'
import { Redirect, useHistory } from 'react-router'
import { Route } from 'react-router-dom';

const idAdmin = localStorage.getItem('idUser')
const roleAdmin = localStorage.getItem('admin')

const PrivateRoute = ({ component: Component, role, ...rest }) => (

<	Route {...rest} render={(props) => (
		idAdmin && (role ? roleAdmin : true)
		?	<Component {...props} /> 
		:	<Redirect to={{ 
			pathname: '/', 
			state: { from: props.location } 
		}} />
	)} /> 
)

export default PrivateRoute;