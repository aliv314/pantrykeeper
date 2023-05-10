const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const dotenv = require('dotenv')
dotenv.config();

// const {serviceAccount, firebaseConfig} = require('./config');

const serviceAccount = require(`./${process.env.service_account_path}`);
initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

module.exports = {
    db
}