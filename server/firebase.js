const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

const dotenv = require('dotenv')
dotenv.config();

const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    // The value of `databaseURL` depends on the location of the database
    databaseURL: process.env.databaseURL,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
    // For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
    measurementId:  process.env.measurementId
};

const app = initializeApp(firebaseConfig);
