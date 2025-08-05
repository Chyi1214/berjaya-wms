# Berjaya Warehouse Management System (WMS) Project

## Project Overview
Building a Warehouse Management System with Claude's assistance.

## User Profile
- Computer engineer with BS from Purdue
- Experienced with Python and C but very rusty
- First coding project in a long time, never had professional dev job
- Learning to code with AI assistance
- Open to learning JavaScript for this project
- Sole software developer for Berjaya Autotech
- **IMPORTANT**: Needs to understand the code deeply enough to maintain and troubleshoot it
- **Teaching Approach**: Build together step-by-step, explain concepts, ensure user can be responsible for the system

## Company Context
- **Client**: Berjaya Autotech (car production company)
- **Current System**: Excel-based (working well for them)
- **Goal**: Modernize with web-based solution

## Project Status
- **Started**: August 4, 2025
- **Current Phase**: Initial planning and requirements gathering
- **Previous Work**: Had discussions with previous Claude instance (details not preserved)

## Requirements
- [x] **Platform**: Web-based application, primarily for mobile use
- [x] **Authentication**: Login system with Google integration
- [x] **Backend**: Firebase (chosen for ease of use)
- [x] **Initial Feature**: Inventory counting at different locations
- [x] **Excel Integration**: CSV upload/download for BOM and inventory data
- [x] **User Roles**: Managers and Workers with accountability tracking
- [x] **Locations**: 1 warehouse, 1 logistics zone + 30 production zones
- [x] **BOM Structure**: SKU, quantity, production zone, name
- [x] **Focus**: Online-first (offline capability future enhancement)
- [ ] Future features (cabinet-level precision, offline sync)

## Excel/Data Integration Strategy (DECIDED)
**Chosen Approach**: CSV Upload/Download with Firebase Storage + Firestore

**Manager Workflow**:
1. Create/edit BOMs and inventory in Excel (current comfort zone)
2. Save as CSV files
3. Upload CSV through web app
4. System processes and stores in Firebase

**Worker Workflow**:
1. Use mobile web app for inventory counting
2. Data syncs to Firebase in real-time
3. Export reports as CSV for managers

**Technical Implementation**:
- Use PapaParse library for CSV processing in JavaScript
- Firebase Storage for CSV file storage
- Firebase Firestore for processed inventory data
- Export functionality using Firebase Cloud Functions

**Why This Choice**:
- ✅ Managers keep familiar Excel workflow
- ✅ Simple enough for user to learn and maintain
- ✅ Works well on mobile devices
- ✅ Strong Firebase integration support
- ✅ Perfect for BOM (Bill of Materials) tabular data

## Technical Decisions
- [x] **Frontend**: JavaScript (web-based)
- [x] **Backend/Database**: Firebase
- [x] **Authentication**: Google OAuth via Firebase
- [x] **Target Device**: Mobile-first web app
- [x] **Development Path**: Start with vanilla JavaScript, then migrate to React
- **Note**: React is better for mobile responsiveness and component reusability

## Data Structure Design

### Inventory Count Record
- **SKU**: Item identifier
- **Quantity**: Amount counted
- **Zone**: Production zone (1-30) or logistics zone
- **Timestamp**: When counted
- **User**: Who counted (accountability)
- **Name**: Item description

### User Roles
- **Manager**: Upload BOMs, view all reports, manage users
- **Worker**: Count inventory in assigned zones only

### Zone Structure
- **Logistics Zone**: 1 zone (receiving/shipping)
- **Production Zones**: 30 zones (manufacturing areas)
- **Future**: Cabinet-level precision (Zone-Cabinet-Shelf)

## Progress Log
### August 4, 2025
- Created project documentation file
- Completed comprehensive requirements gathering and data structure design
- Decided on CSV integration strategy (PapaParse + Firebase Storage)
- Researched and decided on GitHub + Firebase Hosting deployment
- Created detailed development progress tracking (DEVELOPMENT_PROGRESS.csv)
- **READY TO START CODING** - All planning complete!

## Status for Next Claude Session
**Where we left off**: Completed all planning and requirements gathering. User is excited and ready to begin actual development.

**Next Steps**:
1. Set up GitHub repository 
2. Create Firebase project and get API keys
3. Build basic project structure (HTML/CSS/JS files)
4. Implement Google authentication
5. Create inventory counting interface

**Important Context**:
- User wants to learn proper development practices (GitHub, version control)
- Focus on teaching - explain concepts as we build
- User needs to understand code for maintenance responsibility
- Build step-by-step, confirm understanding before proceeding
- User is enthusiastic about learning with AI assistance

**Files Created Today**:
- PROJECT_NOTES.md (this file) - Complete project documentation
- DEVELOPMENT_PROGRESS.csv - Detailed task tracking for development
- hello_world.py - Simple test file (can be removed when ready)

## Notes for Future Claude
- User has already discussed this project previously but details weren't preserved
- Focus on clear explanations and step-by-step guidance
- Confirm understanding before proceeding with implementation