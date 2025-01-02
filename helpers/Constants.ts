
import moment from "moment";
import { Dimensions, Platform, StatusBar } from "react-native";

const windowHeight = Math.round(Dimensions.get("window").height);
const windowWidth = Math.round(Dimensions.get("window").width);
const deviceHeight = Dimensions.get('screen').height;
const StatusbarHeight = (Platform.OS === 'ios' ? windowHeight * 0.03695 : StatusBar.currentHeight)
const regemail = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
const Google_API_KEY = 'AIzaSyBglEaXbvkpA3FJ_2UA2zYablgeNDgmLPQ';
const AddressURL = 'https://maps.googleapis.com/maps/api/geocode/json?address'
const NearBySearchURL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';

const DB_Mode = 'Test';

function formatTimeDifference(timestamp: any) {

  if (!timestamp || !timestamp.toDate || typeof timestamp.toDate !== 'function') {
    return '';
  }

  const now = new Date();
  const firebaseDate = timestamp.toDate();
  // return firebaseDate.toISOString().split('T')[0];
  const timeDifferenceMs = now - firebaseDate;

  const minutes = Math.floor(timeDifferenceMs / (1000 * 60));
  if (minutes < 60) {
    return minutes == 0 ? 'Just now' : `${minutes} m`;
  }

  const hours = Math.floor(timeDifferenceMs / (1000 * 60 * 60));
  if (hours < 24) {
    return `${hours} hr`;
  }

  const days = Math.floor(timeDifferenceMs / (1000 * 60 * 60 * 24));
  return `${days} ${days === 1 ? 'day' : 'days'}`;
}

function formatTimeAsDate(timestamp: any) {

  if (!timestamp || !timestamp.toDate || typeof timestamp.toDate !== 'function') {
    return '';
  }

  const firebaseDate = timestamp.toDate();
  return firebaseDate.toISOString().split('T')[0];
}


function generateRandomId(length:any) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let id = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    id += characters.charAt(randomIndex);
  }

  return id;
}

const formatTimestamp = (timestamp: any) => {
  const now = moment();
  let messageTime;

  // Handle string timestamp (ISO format)
  if (typeof timestamp === 'string') {
    messageTime = moment(timestamp);
  }
  // Handle object timestamp with seconds and nanoseconds
  else if (timestamp && typeof timestamp === 'object' && 'seconds' in timestamp) {
    messageTime = moment(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
  }
  // Handle direct milliseconds timestamp
  else if (typeof timestamp === 'number') {
    messageTime = moment(timestamp);
  }
  // Invalid format
  else {
    console.error('Invalid timestamp format');
    return '';
  }

  if (!messageTime.isValid()) {
    console.error('Invalid timestamp');
    return '';
  }

  const daysDiff = now.diff(messageTime, 'days');

  if (daysDiff === 0) {
    return messageTime.format('LT'); // Today: show time only
  } else if (daysDiff === 1) {
    return 'Yesterday';
  } else {
    return messageTime.format('MMMM DD, YYYY'); // Other dates
  }
};

const DummyStories = [
  {
    username: "Guilherme",
    title: "Title story",
    profile:
      "https://avatars2.githubusercontent.com/u/26286830?s=460&u=5d586a3783a6edeb226c557240c0ba47294a4229&v=4",
    stories: [
      {
        id: 1,
        url:
          "https://images.unsplash.com/photo-1532579853048-ec5f8f15f88d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
        type: "image",
        duration: 2,
        isReadMore: true,
        url_readmore: "https://github.com/iguilhermeluis",
        created: "2021-01-07T03:24:00",
      },
      {
        id: 1,
        url:
          "https://images.unsplash.com/photo-1532579853048-ec5f8f15f88d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
        type: "image",
        duration: 2,
        isReadMore: true,
        url_readmore: "https://github.com/iguilhermeluis",
        created: "2021-01-07T03:24:00",
      },

    ],
  },
  {
    username: "Bruno",
    profile: "https://avatars2.githubusercontent.com/u/45196619?s=460&v=4",
    title: "Travel",
    stories: [

      {
        id: 1,
        url: "https://firebasestorage.googleapis.com/v0/b/gradient-main.appspot.com/o/G%2FVideos%2F%E2%9A%A0%EF%B8%8F%20Back%20Day%20--._--%20_cbum%20___explorepage%20_explore%20_fitness%20_fitnessmotivation%20_reels%20_reelsinstagram%20_instagram%20_instagood%20_motivation%20_cbum%20_gymlifestyle%20_gymquotes%20_gymwear%20_classicphysique%20_arnoldshwarzenegger%20_arnoldclass%20_worko(MP4)_1.mp4?alt=media&token=4a51e6a6-16f0-4d8a-b288-2d6b5a82263e",
        type: "video",
        duration: 2,
        //   isReadMore: true,
        //   url_readmore: "https://github.com/iguilhermeluis",
        created: "2021-01-07T03:24:00",
      },

    ],
  },

];

export {
  AddressURL, DB_Mode, DummyStories, Google_API_KEY, NearBySearchURL, StatusbarHeight, deviceHeight, formatTimeDifference,
  formatTimestamp, formatTimeAsDate, generateRandomId, regemail, windowHeight,
  windowWidth
};
