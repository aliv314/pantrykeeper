const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

const {serviceAccount, firebaseConfig} = require('./config');

const app = initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

module.exports = {
    db
}