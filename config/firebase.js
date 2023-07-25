const { initializeApp } = require("firebase/app");
const { getAnalytics } = require("firebase/analytics");

const firebaseConfig = {
  apiKey: "AIzaSyAKsIHATF6gbf4Z6taMMLuRRBKcjcGZ4vA",
  authDomain: "charity-c7490.firebaseapp.com",
  projectId: "charity-c7490",
  storageBucket: "charity-c7490.appspot.com",
  messagingSenderId: "293374825312",
  appId: "1:293374825312:web:d56c46216eaac597568405",
  measurementId: "G-Y3C4WGC9NM",
};

const fbapp = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
