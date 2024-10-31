const { initializeApp } = require('firebase/app');
const { getStorage, ref, deleteObject } = require('firebase/storage');
// get the firebase config
const config = require('../config/firebaseConfig');

//Initialize a firebase application
const app = initializeApp(config);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

const handleDeleteImage = async (filename) => {
    //get the required fields from the body and the file
    const storageRef = ref(storage, 'images/' + filename);
    await deleteObject(storageRef);
    console.log(
        '🚀 ~ DeleteEventAction ~ action:',
        'Image Deleted Successfully from Firebase'
    );
};

module.exports = handleDeleteImage;
