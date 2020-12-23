/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/components/App';
import {name as appName} from './app.json';
import * as firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyBW37OjSnqwxWCix6XsrzF0R7NKCvnllX8",
    authDomain: "mycustomers-c40c1.firebaseapp.com",
    databaseURL: "https://mycustomers-c40c1.firebaseio.com",
    projectId: "mycustomers-c40c1",
    storageBucket: "mycustomers-c40c1.appspot.com",
    messagingSenderId: "633750314998",
    appId: "1:633750314998:web:1d37c55a2962c98320f1d7"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

AppRegistry.registerComponent(appName, () => App);
