import {NavigationActions} from 'react-navigation';
//Clever function to get access to the navigator
let navigator;

export const setNavigator = (nav) => {
    navigator = nav;
};

//function to navigate to different screens
export const navigate = (routeName, params) =>{
    navigator.dispatch(
        NavigationActions.navigate({
            routeName,
            params
        })
    )
};