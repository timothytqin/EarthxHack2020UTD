import * as firebase from 'firebase';
import { FIREBASE_API_KEY } from './config/keys';

const firebaseConfig = {
    apiKey: FIREBASE_API_KEY,
    authDomain: 'utdloanthrone.firebaseapp.com',
    databaseURL: 'https://utdloanthrone.firebaseio.com',
    projectId: 'utdloanthrone',
    storageBucket: 'utdloanthrone.appspot.com',
    messagingSenderId: '627189332835',
    appId: '1:627189332835:web:04be482956bd4e812fb156',
};
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
const chatroomsdb = firebase.firestore().collection('chatrooms');
export { storage, chatroomsdb };
