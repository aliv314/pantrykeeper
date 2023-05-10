'use strict';
const dotenv = require('dotenv');
const { auth } = require('firebase-admin');
dotenv.config();

const {
    type,
    project_id,
    private_key_id,
    private_key,
    client_email, 
    client_id ,
    auth_uri,  
    token_uri,
    auth_provider_x509_cert_url,
    client_x509_cert_url,
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
    measurementId
} = process.env;


module.exports = { 
    serviceAccount : {
        "type": type,
        "project_id": project_id,
        "private_key_id": private_key_id,
        "private_key": private_key,
        "client_email": client_email,
        "client_id": client_id,
        "auth_uri": auth_uri,
        "token_uri": token_uri,
        "auth_provider_x509_cert_url": auth_provider_x509_cert_url,
        "client_x509_cert_url": client_x509_cert_url
    },
    firebaseConfig : {
        "apiKey": apiKey,
        "authDomain": authDomain,
        "projectId": projectId,
        "storageBucket": storageBucket,
        "messagingSenderId": messagingSenderId,
        "appId": appId,
        "measurementId": measurementId,
    }
}