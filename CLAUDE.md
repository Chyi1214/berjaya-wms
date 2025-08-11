# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Warehouse Management System (WMS) for Berjaya Autotech, a car production company. The system replaces Excel-based inventory tracking with a mobile-first web application that allows workers to count inventory items at different locations using their phones.

**Version 1.0.0 Goal**: Basic inventory counting system with three user roles and simple workflow.

## Architecture

### Technology Stack
- **Frontend**: Vanilla JavaScript (HTML/CSS/JS) - planned migration to React later
- **Backend**: Firebase (Firestore database, Authentication, Storage)
- **Authentication**: Google OAuth via Firebase Auth
- **Deployment**: Firebase Hosting (planned)
- **Data Format**: CSV import/export for BOM (Bill of Materials) integration

### Key Files Structure
- `index.html` - Main application page with login and inventory sections
- `app.js` - Core application logic with Firebase integration and authentication
- `firebase-config.js` - Firebase project configuration and API keys
- `style.css` - Mobile-first CSS with responsive design
- `DEVELOPMENT_PLAN.md` - Comprehensive development roadmap and learning guide
- `PROJECT_NOTES.md` - Project context, requirements, and progress tracking
- `Eugene_note.md` - **READ ONLY** - User's personal notes in simple language
- `CLAUDE.md` - This file - guidance for Claude Code instances

### Application Flow (Version 1.0.0)
1. **Authentication**: Users login via Google OAuth
2. **Role Selection**: After login, users choose from three roles:
   - **Logistics**: Access to logistics inventory counting
   - **Production**: Select zone (1-30), then access zone-specific counting
   - **Manager**: View Item Table with inventory summary
3. **Inventory Counting**: 
   - SKU dropdown with autocomplete (hardcoded: "a001", "a002", "b003", "b004")
   - Amount input field
   - Location selection (Logistics or Production zones 1-30)
   - Submit updates Item Table
4. **Navigation**: Users stay in their role, "go back" button for navigation

### Database Structure - Item Table (Firestore)
```
item_table/
  ├── sku: "a001"
  ├── name: "Component A001"
  ├── total_amount: 150
  ├── amount_logistics: 50
  ├── amount_production_zone_1: 20
  ├── amount_production_zone_2: 15
  └── ... (zones 3-30)

inventory_transactions/
  ├── sku: "a001"
  ├── amount: 5
  ├── location: "logistics" or "production_zone_15"
  ├── counted_by: "worker@company.com"
  ├── timestamp: "2025-08-05 14:30"
  └── transaction_type: "count"

users/
  ├── email: "worker@company.com"
  ├── display_name: "Worker Name"
  ├── last_login: timestamp
  └── preferred_role: "logistics" or "production" or "manager"
```

### Version 1.0.0 Hardcoded Data
- **SKUs**: ["a001", "a002", "b003", "b004"]
- **Locations**: "logistics" + "production_zone_1" through "production_zone_30"

## Development Commands

This project currently has no build system - it uses vanilla HTML/CSS/JavaScript served directly. Files are loaded in browser without compilation.

### Running the Application
- Open `index.html` in a web browser
- For development: Use a local server like `python -m http.server` or VS Code Live Server
- For deployment: Use Firebase Hosting CLI

### Version Control
- Repository is git-initialized
- Use standard git workflow for changes
- No automated CI/CD currently configured

## Development Context

### User Profile
- New to web development but experienced with Python/C
- Learning JavaScript for this project
- Needs clear explanations and step-by-step guidance
- Will be sole maintainer of the system

### Current Status - Version 1.0.0 ✅ COMPLETED (Aug 7, 2025)
- **✅ Completed**: Full local simulation working perfectly
- **✅ Tested**: Mobile interface on iPhone, desktop on Mac
- **✅ Working Features**:
  1. Test login system (bypasses Firebase for development)
  2. Role selection screen (Logistics/Production/Manager) 
  3. SKU dropdown with hardcoded values (a001, a002, b003, b004)
  4. Logistics counting workflow with visual feedback
  5. Production zone selection (1-30) and counting
  6. Manager view with real-time Item Table display
  7. Complete navigation with "Go Back" buttons
  8. Data persistence via localStorage
  9. Mobile-responsive design tested on actual devices

### Implementation Notes (Aug 7, 2025)
- **Local Development Approach**: Commented out Firebase, created `local-data.js` simulation
- **File Structure**: `app-local.js` for development, original `app.js` preserved for Firebase migration
- **Data Sync**: Each browser/device has separate localStorage (expected behavior for local dev)
- **Mobile Testing**: Successfully tested on iPhone via local network (192.168.0.x:8000)
- **User Workflow**: Matches exactly with Eugene's vision in `Eugene_note.md`

### Code Style Notes
- Extensive comments throughout for educational purposes
- Mobile-first responsive design approach
- Defensive error handling and user feedback
- Console logging for debugging and development tracking

## Important Considerations

### Security
- Firebase API keys are committed (typical for client-side Firebase apps)
- Google OAuth provides secure authentication
- Firestore security rules needed for production

### Next Phase - Version 2.0.0 (Planned)
- **Firebase Migration**: Replace local storage with Firestore for real-time sync
- **CSV Integration**: Upload BOMs, export inventory reports (planned with PapaParse)
- **Enhanced Production Features**: "Car Complete" buttons, transaction confirmations
- **Advanced Item Table**: Historical comparison, discrepancy detection
- **React Migration**: Planned for better mobile UX and component reusability

### Development Learnings (Aug 7, 2025)
- **Local simulation approach works excellently** for rapid prototyping
- **Mobile-first design crucial** - iPhone testing revealed true user experience
- **Eugene's simple vision translated perfectly** into working system
- **localStorage per-browser separation helps multi-role testing**
- **Clear file organization** (local vs Firebase versions) enables smooth migration path

### Testing Strategy
- Manual testing on mobile devices is critical
- Test authentication flow thoroughly
- Validate mobile responsiveness across devices
- Test CSV import/export workflows when implemented

## Maintenance Notes

When working on this codebase:
1. Maintain extensive commenting for user learning
2. Test all changes on mobile devices
3. Follow mobile-first responsive design principles
4. Ensure Firebase security rules are appropriate
5. Keep user experience simple and intuitive for warehouse workers