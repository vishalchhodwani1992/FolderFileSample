// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import Home from './Home/Home';
import FileExplorer from './FileExplorer/FileExplorer';
const Stack = createStackNavigator();

function RootContainer(props) {

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home" 
                screenOptions={({ route, navigation }) => ({
                    gestureEnabled: true,
                    cardOverlayEnabled: true,
                    headerStatusBarHeight: Platform.OS === 'android' ?
                        (route.key > 0
                            ? 0
                            : undefined) : undefined,
                    ...TransitionPresets.SlideFromRightIOS,
                })}>
                <Stack.Screen
                    name="Home"
                    component={Home}
                />
                <Stack.Screen
                    name="FileExplorer"
                    component={FileExplorer}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default RootContainer;