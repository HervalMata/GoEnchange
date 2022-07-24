import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import { useAuth } from '../hooks/auth';
import AppRoutes from "./app.routes";

const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Auth.Navigator screenOptions={{headerShown: false, cardStyle: {backgroundColor: '#312e38'},}}>
        <Auth.Screen name="SignIn" component={SignIn}/>
        <Auth.Screen name="SignUp" component={SignUp}/>
      </Auth.Navigator>
    );
  }

  return user ? <AppRoutes /> : <AuthRoutes />;
};

export default AuthRoutes;
