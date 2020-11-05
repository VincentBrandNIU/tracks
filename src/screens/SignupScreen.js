import React, { useContext, useEffect } from 'react';
import {View, StyleSheet} from 'react-native';
import { NavigationEvents } from 'react-navigation';
import NavLink from '../components/NavLink';
import {Context as AuthContext } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';


const SignupScreen = ({navigation}) =>{
    const { state, signup, clearErrorMessage} = useContext(AuthContext);

    return( 
    <View style={styles.container}>
        <NavigationEvents 
                 onWillFocus={clearErrorMessage}               
            />
        <AuthForm
            headerText="Sign Up for Tracker"
            errorMessage={state.errorMessage}
            submitButtonText="Sign Up"
            onSubmit={({email, password}) => signup({email, password})}
        />
        <NavLink 
        routeName="Signin"
        text="Already have an account? Sign in instead"/>
        
    </View>

    )
};

SignupScreen.navigationOptions = () => {
    return {
        headerShown: false
    };
};

const styles = StyleSheet.create({ 
    container: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 200
    },
    errorMessage:{
        fontSize: 16,
        color: 'red',
        marginLeft: 15,
        marginRight: 15
    },
    
});

export default SignupScreen;