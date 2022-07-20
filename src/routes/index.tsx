import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {useAuthState} from '../contexts/AuthContext';

import Authenticate from '../screens/Authenticate';
import Home from '../screens/Home';
import Unsupported from '../screens/Unsupported';
import Marketplace from '../screens/Marketplace';
import Profile from '../screens/Profile';

export default function Routes() {
    const authState = useAuthState();
    const MainStack = createNativeStackNavigator();
    const TabStack = createBottomTabNavigator();

    const BottomTabs = (): JSX.Element => (
        <TabStack.Navigator initialRouteName="Home">
            <TabStack.Screen name="Home" component={Home} />
            <TabStack.Screen name="Marketplace" component={Marketplace} />
            <TabStack.Screen name="Profile" component={Profile} />
        </TabStack.Navigator>
    );

    return (
        <NavigationContainer>
            <MainStack.Navigator
                screenOptions={{
                    headerShown: false,
                }}>
                {authState.values.connector.connected ? (
                    authState.values.supportedChainId ? (
                        <MainStack.Screen
                            name="BottomTabs"
                            component={BottomTabs}
                        />
                    ) : (
                        <MainStack.Screen
                            name="Unsupported"
                            component={Unsupported}
                        />
                    )
                ) : (
                    <MainStack.Screen
                        name="Authenticate"
                        component={Authenticate}
                    />
                )}
            </MainStack.Navigator>
        </NavigationContainer>
    );
}
