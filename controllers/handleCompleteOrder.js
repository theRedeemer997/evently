const mongoose = require('mongoose');
const user = require('../model/user');
const events = require('../model/approvedevents');
const handleCompleteOrder = async (req, res) => {
    try {
        res.redirect('/events');
    } catch (error) {
        console.log('🚀 ~ handleCompleteOrder ~ error:', error.message);
    }
};

module.exports = handleCompleteOrder;
