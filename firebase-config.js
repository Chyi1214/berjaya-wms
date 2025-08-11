// Firebase Configuration - SECURE VERSION
// This file should NOT be committed to version control
// Copy from firebase-config.template.js and fill in your actual credentials

// ⚠️ SECURITY WARNING: This file contains sensitive credentials!
// Make sure firebase-config.js is in your .gitignore file

const firebaseConfig = {
  // TODO: Replace these with your actual Firebase credentials
  // Get them from: https://console.firebase.google.com/ → Project Settings → Your Apps
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.firebasestorage.app",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID" // Optional
};

// Validate configuration before using
function validateFirebaseConfig() {
  const requiredFields = ['apiKey', 'authDomain', 'projectId'];
  const missingFields = requiredFields.filter(field => 
    !firebaseConfig[field] || firebaseConfig[field].startsWith('YOUR_')
  );
  
  if (missingFields.length > 0) {
    console.error('❌ Firebase configuration incomplete!');
    console.error('Missing or placeholder values for:', missingFields);
    
    // Show user-friendly error
    document.body.innerHTML = `
      <div style="padding: 20px; background: #f8f9fa; border: 2px solid #dc3545; border-radius: 8px; margin: 20px; font-family: Arial, sans-serif;">
        <h2 style="color: #dc3545;">🔧 Firebase Configuration Required</h2>
        <p><strong>Please configure your Firebase credentials:</strong></p>
        <ol>
          <li>Open <code>firebase-config.js</code></li>
          <li>Replace placeholder values with your actual Firebase credentials</li>
          <li>Get credentials from <a href="https://console.firebase.google.com/" target="_blank">Firebase Console</a></li>
        </ol>
        <p style="background: #fff3cd; padding: 10px; border-radius: 4px;">
          <strong>Missing fields:</strong> ${missingFields.join(', ')}
        </p>
      </div>
    `;
    return false;
  }
  
  console.log('✅ Firebase configuration validated');
  return true;
}

// Export config only if valid
if (validateFirebaseConfig()) {
  // Initialize Firebase (libraries loaded in HTML)
  window.firebaseConfig = firebaseConfig;
} else {
  window.firebaseConfig = null;
}