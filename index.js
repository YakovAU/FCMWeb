// index.js

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Setting the view engine to ejs
app.set('view engine', 'ejs');
app.use('/public', express.static('public'));

// Middleware to parse POST request data
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('input');
});

app.post('/convert', (req, res) => {
    // Extract data from the request
    const inputData = req.body.data;

    try {
        const data = JSON.parse(inputData);

        // Convert to secondary format
        const output = `/credentials add keys_private_key: ${data.fcm_credentials.keys.private} keys_public_key: ${data.fcm_credentials.keys.public} keys_auth_secret: ${data.fcm_credentials.keys.secret} fcm_token: ${data.fcm_credentials.fcm.token} fcm_push_set: ${data.fcm_credentials.fcm.pushSet} gcm_token: ${data.fcm_credentials.gcm.token} gcm_android_id: ${data.fcm_credentials.gcm.androidId} gcm_security_token: ${data.fcm_credentials.gcm.securityToken} gcm_app_id: ${data.fcm_credentials.gcm.appId} steam_id: ${data.rustplus_auth_token}`;

        res.render('output', { data: output });

    } catch (error) {
        res.send("An error occurred while converting the data. Ensure you input valid JSON data.");
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
