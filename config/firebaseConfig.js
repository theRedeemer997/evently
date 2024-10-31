require('dotenv').config();

const firebaseConfig = {
    apiKey: process.env.APIKEY,
    authDomain: process.env.AUTHDOMAIN,
    projectId: process.env.PROJECTID,
    storageBucket: process.env.STORAGEBUCKET,
    messagingSenderId: process.env.MESSAGINGSENDERID,
    appId: process.env.APPID,
};

console.log('🚀 ~ firebaseConfig ~ config:', firebaseConfig);

//export default firebaseConfig;
module.exports = firebaseConfig;
