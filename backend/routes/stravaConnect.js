const express = require('express');
const axios = require('axios');
// const {RunReport} = require('../model/database');

const router = express.Router();

let tokenExpiry = null;

const STRAVA_CLIENT_ID = process.env.STRAVA_CLIENT_ID;
const STRAVA_CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET;

function convertSecondsToHMS(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600); // Calculate hours
    const minutes = Math.floor((totalSeconds % 3600) / 60); // Calculate minutes
    const seconds = totalSeconds % 60; // Calculate remaining seconds

    // Return the formatted string
    return { 
        hours: hours.toString(), 
        minutes: minutes.toString(), 
        seconds: seconds.toString() 
      };
}

// Route to exchange the authorization code for access and refresh tokens
router.post('/', async (req, res) => {
    const { code } = req.body; // Get the authorization code from the request
    console.log(code);
    let accessToken;
    let refreshToken;

    try {
      const tokenResponse = await axios.post('https://www.strava.com/api/v3/oauth/token', null, {
        params: {
          client_id: STRAVA_CLIENT_ID,
          client_secret: STRAVA_CLIENT_SECRET,
          code: code,
          grant_type: 'authorization_code', // Specify grant type
        },
      });
  
      // Extract tokens from response
      accessToken = tokenResponse.data.access_token;
      refreshToken = tokenResponse.data.refresh_token; // Store the new refresh token if provided
      tokenExpiry = Date.now() + tokenResponse.data.expires_in * 1000;
  
      console.log('Access Token:', accessToken);
      console.log('Refresh Token:', refreshToken);

        const activitiesResponse = await axios.get('https://www.strava.com/api/v3/athlete/activities', {
         params: { access_token: `${accessToken}` }
        });

        const movingTime = convertSecondsToHMS(activitiesResponse.data[15].moving_time);
        const distance = activitiesResponse.data[0].distance/1000;
        const date = activitiesResponse.data[0].start_date_local.substring(0,activitiesResponse.data[0].start_date_local.indexOf('T'));
        const time = activitiesResponse.data[0].start_date_local.substring(activitiesResponse.data[0].start_date_local.indexOf('T')+1,activitiesResponse.data[0].start_date_local.indexOf('Z'));
        const elevationGained = activitiesResponse.data[0].total_elevation_gain;
        const id = activitiesResponse.data[0].id;
        
        
        const selectedActivitiyResponse = await axios.get(`https://www.strava.com/api/v3/activities/${id}`, {
          headers: { Authorization: `Bearer ${accessToken}`}
         });
         const map = selectedActivitiyResponse.data.map;
        console.log(map.polyline);
        res.json({ movingTime, distance, date, time, elevationGained, map }); 
          
    } catch (error) {
      console.error('Error exchanging code for tokens:', error.response ? error.response.data : error.message);
      res.status(500).json({ error: 'Failed to obtain tokens' });
    }
  });

module.exports = router;
