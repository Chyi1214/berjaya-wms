# Security Configuration Guide

## 🔒 Firebase Credentials Setup

**IMPORTANT**: This repository uses secure configuration management for Firebase credentials.

### Initial Setup

1. **Copy the template file:**
   ```bash
   cp firebase-config.template.js firebase-config.js
   ```

2. **Get your Firebase credentials:**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Select your project (or create one)
   - Click the gear icon → **Project settings**
   - Scroll to **"Your apps"** section
   - Click on your web app or **"Add app"** to create one
   - Copy the configuration object

3. **Fill in the credentials:**
   - Open `firebase-config.js`
   - Replace all `YOUR_*_HERE` placeholders with actual values
   - Save the file

### Security Best Practices

#### ✅ DO:
- Keep `firebase-config.js` local only (it's in `.gitignore`)
- Use environment variables in production
- Regularly rotate API keys
- Set up Firebase Security Rules
- Use Firebase App Check for production

#### ❌ DON'T:
- **Never** commit real credentials to version control
- **Never** share credentials in screenshots or logs
- **Never** hardcode credentials in source code
- **Never** use production credentials for development

### File Structure
```
├── firebase-config.template.js  ✅ Safe to commit (template only)
├── firebase-config.js          ❌ NEVER commit (real credentials)
├── .gitignore                  ✅ Contains firebase-config.js
└── SECURITY.md                 ✅ This file
```

### Production Deployment

For production, use environment variables instead of local files:

#### Vercel/Netlify:
Set environment variables in your dashboard:
- `REACT_APP_FIREBASE_API_KEY`
- `REACT_APP_FIREBASE_AUTH_DOMAIN`
- `REACT_APP_FIREBASE_PROJECT_ID`
- etc.

#### GitHub Actions:
Add to repository secrets and use in workflow:
```yaml
env:
  REACT_APP_FIREBASE_API_KEY: ${{ secrets.FIREBASE_API_KEY }}
```

### Troubleshooting

**"Configuration Required" error?**
- Make sure you've created `firebase-config.js` from the template
- Check that all placeholder values are replaced
- Verify Firebase project is active

**Still see placeholder values?**
- Double-check you're editing `firebase-config.js` (not the template)
- Make sure all `YOUR_*_HERE` values are replaced
- Restart your development server

### Firebase Security Rules

Don't forget to set up proper security rules in Firebase Console:

```javascript
// Firestore Rules Example
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Only authenticated users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Public read for item catalog, authenticated write
    match /item_catalog/{itemId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### Contact

If you have security concerns or find credentials accidentally committed, please:
1. Contact the repository maintainer immediately
2. Rotate the exposed credentials in Firebase Console
3. Update your local `firebase-config.js` with new credentials

---

**Remember: Security is everyone's responsibility! 🛡️**