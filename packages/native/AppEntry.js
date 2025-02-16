import {registerRootComponent} from 'expo';
import { activateKeepAwake } from "expo-keep-awake";
import HomeScreen from './app/(tabs)/index'

if(__DEV__){
    activateKeepAwake(); 
}

registerRootComponent(HomeScreen)