import { useState, useEffect } from "react";
// import DailyIframe from "@daily-co/daily-js";
import { useLocation } from "react-router-dom";
import debug from 'sabio-debug';
import * as DailyHelper from './dailyHelper'
// import axios from 'axios';

const _logger = debug.extend('Webinar')

const roomName = 'https://advancing-diversity.daily.co/advancing-diversity'; 

const WebinarCall = () => {
 
 const [roomInfo, setRoomInfo] = useState(null);
 const { search } = useLocation();
_logger(roomInfo)

 useEffect(() => {
   if (search && search.match(/^[?t=*+]/)) {
	 // remove the first few characters to isolate the token
     const token = search.replace("?t=", "");

     // validate the token from the URL if supplied
     DailyHelper.roomName(token)
       .then((res) => res.json())
       .then((res) => {
         if (res.is_owner && res.room_name === roomName) { 
           // add admin settings
           setRoomInfo({
             token,
             username: res.user_name,
             accountType: 'admin',
           });
           return;
         }
         // else: handle the error
       })
       .catch((err) => {_logger(err) });
   } else {
     // set the participant to a regular attendee
     setRoomInfo({
       token: null,
       username: null,
       accountType: "participant",
     });
   }
 })}

 export default WebinarCall