import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignUp from '../pages/SignUp';
import Signin from '../pages/SignIn';
import Dashboard from '../pages/Dashboard';

const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => (
    <Auth.Navigator
        screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: '#312e38'},
        }}
    >
        <Auth.Screen name="SignIn" component={Signin} />
        <Auth.Screen name="SignUp" component={SignUp} />
        <Auth.Screen name="Dashboard" component={Dashboard} />
    </Auth.Navigator>
);

export default AuthRoutes;

