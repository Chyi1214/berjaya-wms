// JavaScript - the "brain" of your web app
// This file makes buttons work and handles user interactions

// Wait for the page to fully load before running our code
document.addEventListener('DOMContentLoaded', function() {
    // DOMContentLoaded = "DOM Content Loaded" = HTML is ready
    // function() = a block of code that runs when the event happens
    
    console.log('Berjaya WMS app starting...');
    // console.log = prints messages to browser's developer tools (for debugging)
    
    // Initialize Firebase with our configuration
    // firebase.initializeApp uses the firebaseConfig from firebase-config.js
    firebase.initializeApp(firebaseConfig);
    
    // Get references to Firebase services we'll use
    const auth = firebase.auth();        // For user login/logout
    const db = firebase.firestore();     // For database operations
    
    console.log('Firebase initialized successfully');
    
    // Get references to HTML elements so we can control them
    // document.getElementById finds elements by their id attribute
    const loginSection = document.getElementById('login-section');
    const inventorySection = document.getElementById('inventory-section');
    const googleLoginBtn = document.getElementById('google-login-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const userNameSpan = document.getElementById('user-name');
    const inventoryList = document.getElementById('inventory-list');
    
    // Set up Google Auth Provider for "Login with Google"
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    // This creates a way to login using Google accounts
    
    // Add click event listener to Google login button
    googleLoginBtn.addEventListener('click', function() {
        // addEventListener = "when user clicks this button, run this function"
        
        console.log('User clicked Google login button');
        
        // Show loading state
        googleLoginBtn.textContent = 'Logging in...';
        googleLoginBtn.disabled = true;  // Disable button to prevent multiple clicks
        
        // Use Firebase to sign in with Google popup
        auth.signInWithPopup(googleProvider)
            .then(function(result) {
                // .then = "when login succeeds, do this"
                // result contains information about the logged-in user
                
                console.log('Login successful:', result.user.email);
                
                // The onAuthStateChanged listener below will handle showing the inventory
                // We don't need to do anything else here
            })
            .catch(function(error) {
                // .catch = "when login fails, do this"
                
                console.error('Login failed:', error);
                alert('Login failed: ' + error.message);
                // alert = show popup message to user
                
                // Reset button state
                googleLoginBtn.textContent = 'Login with Google';
                googleLoginBtn.disabled = false;
            });
    });
    
    // Add click event listener to logout button
    logoutBtn.addEventListener('click', function() {
        console.log('User clicked logout button');
        
        // Use Firebase to sign out
        auth.signOut()
            .then(function() {
                console.log('Logout successful');
                // The onAuthStateChanged listener will handle hiding inventory
            })
            .catch(function(error) {
                console.error('Logout failed:', error);
            });
    });
    
    // Listen for changes in user authentication state
    auth.onAuthStateChanged(function(user) {
        // onAuthStateChanged = "whenever login status changes, run this function"
        // user = the logged-in user (or null if not logged in)
        
        if (user) {
            // User is logged in
            console.log('User is logged in:', user.email);
            
            // Show inventory section, hide login section
            showInventorySection();
            
            // Display user's name
            userNameSpan.textContent = user.displayName || user.email;
            
            // Load inventory data (we'll implement this later)
            loadInventoryData();
            
        } else {
            // User is not logged in
            console.log('User is not logged in');
            
            // Show login section, hide inventory section
            showLoginSection();
        }
    });
    
    // Function to show the login section
    function showLoginSection() {
        loginSection.style.display = 'block';     // Make visible
        inventorySection.style.display = 'none';  // Hide
        
        // Reset login button state
        googleLoginBtn.textContent = 'Login with Google';
        googleLoginBtn.disabled = false;
    }
    
    // Function to show the inventory section
    function showInventorySection() {
        loginSection.style.display = 'none';      // Hide
        inventorySection.style.display = 'block'; // Make visible
    }
    
    // Function to load inventory data from database
    function loadInventoryData() {
        console.log('Loading inventory data...');
        
        // For now, show a simple message
        // Later, we'll load real data from Firestore database
        inventoryList.innerHTML = `
            <h3>Inventory Items</h3>
            <p>Welcome! Your inventory counting system is ready.</p>
            <p>Next step: We'll load real inventory items from the database.</p>
            <p style="color: #666; font-size: 0.9rem;">
                (This is just a placeholder - we haven't built the inventory loading yet)
            </p>
        `;
        // innerHTML = sets the HTML content inside an element
        // Template literal (backticks) allows multi-line strings
    }
    
    console.log('App setup complete - ready for user interaction');
});

// Global error handler for any uncaught errors
window.addEventListener('error', function(event) {
    console.error('Global error caught:', event.error);
    // In a production app, you might send this error to a logging service
});

console.log('app.js file loaded successfully');