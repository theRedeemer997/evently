const { initializeApp } = require('firebase/app');
const { getStorage, ref, deleteObject } = require('firebase/storage');
// get the firebase config
const config = require('../config/firebaseConfig');

//Initialize a firebase application
const app = initializeApp(config);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

const handleDeleteImage = async (req, res) => {
    //get the required fields from the body and the file
    let filename = 'name of the file which needs to be deleted from firebase';

    const storageRef = ref(storage, 'images/' + filename);
    await deleteObject(storageRef);
    console.log(
        '🚀 ~ DeleteEventAction ~ action:',
        'Image Deleted Successfully'
    );
    res.render('home');
};

module.exports = handleCreateEventAction;
