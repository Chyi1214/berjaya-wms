// Firebase Configuration Template
// Copy this file to 'firebase-config.js' and fill in your actual Firebase credentials
// NEVER commit the actual firebase-config.js file to version control

const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.firebasestorage.app",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID" // Optional for Analytics
};

// Initialize Firebase
// Note: We'll import Firebase libraries in our HTML file
// This config will be used by our main app

// How to get your Firebase config:
// 1. Go to https://console.firebase.google.com/
// 2. Select your project
// 3. Click the gear icon → Project settings
// 4. Scroll down to "Your apps" section
// 5. Click on your web app or create one
// 6. Copy the configuration values