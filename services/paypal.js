//to set up paypal -- follow https://www.youtube.com/watch?v=QbdDg8wgBYg

//get the environment variables from the .env file
require('dotenv').config();
//get the axios dependency to call the api
const axios = require('axios');

//check the authentication doc of the https://developer.paypal.com/api/rest/authentication/
async function generateAccessToken() {
    const response = await axios({
        url: process.env.PAYPAL_BASE_URL + '/v1/oauth2/token',
        method: 'post',
        data: 'grant_type=client_credentials',
        auth: {
            username: process.env.PAYPAL_CLIENT_ID,
            password: process.env.PAYPAL_SECRET,
        },
    });
    //console.log('🚀 ~ generateAccessToken ~ response:', response.data);
    return response.data.access_token;
}

//check the create order doc
exports.createOrder = async (eventName, finalPrice) => {
    console.log('🚀 ~ exports.createOrder= ~ finalPrice:', finalPrice);
    console.log('🚀 ~ exports.createOrder= ~ eventName:', eventName);
    const formattedPrice = parseFloat(finalPrice).toFixed(2);
    console.log('🚀 ~ exports.createOrder= ~ finalPrice:', finalPrice);
    console.log('🚀 ~ exports.createOrder= ~ eventName:', eventName);

    const access_token = await generateAccessToken();
    console.log('🚀 ~ exports.createOrder= ~ access_token:', access_token);
    const response = await axios({
        url: process.env.PAYPAL_BASE_URL + '/v2/checkout/orders',
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + access_token,
        },
        data: JSON.stringify({
            intent: 'CAPTURE',
            purchase_units: [
                {
                    items: [
                        {
                            name: eventName,
                            description: eventName,
                            quantity: 1,
                            unit_amount: {
                                currency_code: 'CAD',
                                value: formattedPrice,
                            },
                        },
                    ],

                    amount: {
                        currency_code: 'CAD',
                        value: formattedPrice,
                        breakdown: {
                            item_total: {
                                currency_code: 'CAD',
                                value: formattedPrice,
                            },
                        },
                    },
                },
            ],
            application_context: {
                return_url: process.env.BASE_URL + '/complete-order',
                cancel_url: process.env.BASE_URL + '/cancel-order',
                shipping_preference: 'NO_SHIPPING',
                user_action: 'PAY_NOW',
                brand_name: 'evently',
            },
        }),
    });
    console.log('🚀 ~ createOrder ~ response:', response.data);
    return response.data.links.find((link) => link.rel === 'approve').href;
};
