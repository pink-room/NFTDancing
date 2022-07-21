import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {useAuthState} from '../contexts/AuthContext';

import Authenticate from '../screens/Authenticate';
import CreateDance from '../screens/CreateDance';
import Unsupported from '../screens/Unsupported';
import Marketplace from '../screens/Marketplace';
import Profile from '../screens/Profile';

import CreateIcon from '../../assets/icons/Create';
import MarketplaceIcon from '../../assets/icons/Marketplace';
import ProfileIcon from '../../assets/icons/Profile';

export default function Routes() {
    const authState = useAuthState();
    const MainStack = createNativeStackNavigator();
    const TabStack = createBottomTabNavigator();

    const BottomTabs = (): JSX.Element => (
        <TabStack.Navigator initialRouteName="CreateDance">
            <TabStack.Screen
                name="Create New Dance"
                component={CreateDance}
                options={{
                    tabBarIcon: (props: {
                        focused: boolean;
                        color: string;
                        size: number;
                    }) => <CreateIcon size={props.size} color={props.color} />,
                }}
            />
            <TabStack.Screen
                name="Marketplace"
                component={Marketplace}
                options={{
                    tabBarIcon: (props: {
                        focused: boolean;
                        color: string;
                        size: number;
                    }) => (
                        <MarketplaceIcon
                            size={props.size}
                            color={props.color}
                        />
                    ),
                }}
            />
            <TabStack.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: (props: {
                        focused: boolean;
                        color: string;
                        size: number;
                    }) => <ProfileIcon size={props.size} color={props.color} />,
                }}
            />
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
