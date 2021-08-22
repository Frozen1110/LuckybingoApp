import React,{ Component,useState } from 'react'
import { Router, Scene,Actions ,ActionConst} from 'react-native-router-flux'

import LoginScreen from './src/screens/LoginScreen';
import MenuScreen from './src/screens/MenuScreen';
import NewsaleScreen1 from './src/screens/NewSale/NewsaleScreen1';
import NewsaleScreen2 from './src/screens/NewSale/NewsaleScreen2';
import CashierScreen from './src/screens/CashierScreen';
import SoldcardsScreen from './src/screens/SoldcardsScreen';
import ResultScreen from './src/screens/ResultScreen';
import SettingsScreen from './src/screens/SettingsScreen';

import { useDispatch, useSelector } from 'react-redux';

import {store} from './src/redux/store';
import {Provider} from 'react-redux';
import BluetoothPrinter from './src/components/BluetoothPrinter';
import BluetoothPrinter1 from './src/components/BluetoothPrinter1';
import BluetoothPrinter2 from './src/components/BluetoothPrinter2';
export default function Routes() {
    const loggingIn = useSelector(state => state.auth.isLoggedIn);
    const [isLoggedIn, setLogin] = useState(loggingIn);
    return (
        <Router>
            <Scene key="root">
                <Scene key="loginScreen"
                component={LoginScreen}
                    animation='fade'
                hideNavBar={true}
                initial={!isLoggedIn}
                />
                <Scene key="menuScreen"
                component={MenuScreen}
                animation='fade'
                hideNavBar={true}
                initial={isLoggedIn}
                />
                <Scene key="newsaleScreen1"
                component={NewsaleScreen1}
                animation='fade'
                hideNavBar={true}
                />
                <Scene key="newsaleScreen2"
                component={NewsaleScreen2}
                animation='fade'
                hideNavBar={true}
                />
                <Scene key="cashierScreen"
                component={CashierScreen}
                animation='fade'
                hideNavBar={true}
                />
                <Scene key="soldcardsScreen"
                component={SoldcardsScreen}
                animation='fade'
                hideNavBar={true}
                />
                <Scene key="resultScreen"
                component={ResultScreen}
                animation='fade'
                hideNavBar={true}
                />
                <Scene key="settingsScreen"
                component={SettingsScreen}
                animation='fade'
                hideNavBar={true}
                />
                <Scene key="bluetoothPrinter"
                component={BluetoothPrinter}
                animation='fade'
                hideNavBar={true}
                />
                <Scene key="bluetoothPrinter1"
                component={BluetoothPrinter1}
                animation='fade'
                hideNavBar={true}
                />
                <Scene key="bluetoothPrinter2"
                component={BluetoothPrinter2}
                animation='fade'
                hideNavBar={true}
                />
            </Scene>
        </Router>
    );
}