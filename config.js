// Secure Configuration System
// This file provides a secure way to handle Firebase configuration

class ConfigManager {
    constructor() {
        this.isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        this.config = null;
    }

    // Load configuration based on environment
    async loadConfig() {
        if (this.config) return this.config;

        try {
            // Try to load from environment variables (if available)
            if (this.hasEnvConfig()) {
                this.config = this.getEnvConfig();
                console.log('✅ Firebase config loaded from environment');
                return this.config;
            }

            // Fallback to local config file (for development)
            if (this.isDevelopment) {
                // Check if firebase-config.js exists
                try {
                    const response = await fetch('./firebase-config.js');
                    if (response.ok) {
                        // Note: This is a simplified approach for development
                        // In production, use proper environment variables
                        console.warn('⚠️ Using local firebase-config.js - NOT recommended for production');
                        // We can't directly import the config this way, so we'll use a different approach
                    }
                } catch (e) {
                    console.warn('📄 firebase-config.js not found. Please create it from firebase-config.template.js');
                }
            }

            throw new Error('Firebase configuration not available');

        } catch (error) {
            console.error('❌ Failed to load Firebase config:', error);
            this.showConfigError();
            throw error;
        }
    }

    // Check if environment variables are available
    hasEnvConfig() {
        // This would work with environment variables in a proper build system
        return typeof process !== 'undefined' && 
               process.env && 
               process.env.REACT_APP_FIREBASE_API_KEY; // Example for React
    }

    // Get configuration from environment variables
    getEnvConfig() {
        return {
            apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
            authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
            projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
            storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
            messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
            appId: process.env.REACT_APP_FIREBASE_APP_ID,
            measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
        };
    }

    // Show user-friendly error when config is missing
    showConfigError() {
        if (this.isDevelopment) {
            document.body.innerHTML = `
                <div style="padding: 20px; background: #f8f9fa; border: 2px solid #dc3545; border-radius: 8px; margin: 20px; font-family: Arial, sans-serif;">
                    <h2 style="color: #dc3545;">🔧 Configuration Required</h2>
                    <p><strong>Firebase configuration is missing!</strong></p>
                    <p>To set up the application:</p>
                    <ol>
                        <li>Copy <code>firebase-config.template.js</code> to <code>firebase-config.js</code></li>
                        <li>Fill in your actual Firebase credentials</li>
                        <li>Refresh the page</li>
                    </ol>
                    <p><strong>How to get Firebase credentials:</strong></p>
                    <ol>
                        <li>Go to <a href="https://console.firebase.google.com/" target="_blank">Firebase Console</a></li>
                        <li>Select your project (or create one)</li>
                        <li>Click the gear icon → Project settings</li>
                        <li>Scroll to "Your apps" section</li>
                        <li>Click on your web app or create one</li>
                        <li>Copy the configuration values</li>
                    </ol>
                    <p style="background: #fff3cd; padding: 10px; border-radius: 4px;">
                        <strong>⚠️ Security Note:</strong> Never commit the actual firebase-config.js to version control!
                    </p>
                </div>
            `;
        } else {
            document.body.innerHTML = `
                <div style="padding: 20px; text-align: center; font-family: Arial, sans-serif;">
                    <h2>⚙️ Configuration Error</h2>
                    <p>The application is not properly configured. Please contact the administrator.</p>
                </div>
            `;
        }
    }

    // Get the loaded config
    getConfig() {
        if (!this.config) {
            throw new Error('Configuration not loaded. Call loadConfig() first.');
        }
        return this.config;
    }
}

// Export as global for compatibility with existing code
window.ConfigManager = ConfigManager;