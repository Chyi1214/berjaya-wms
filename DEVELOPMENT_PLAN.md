# Berjaya WMS Development Plan
## Complete Guide for Implementation and Future Maintenance

---

## **Project Overview**
We are building a warehouse management system for Berjaya Autotech, a car production company. The system will modernize their current Excel-based inventory tracking with a mobile-first web application. The user (you) is a computer engineer from Purdue who needs to understand every aspect of this system to maintain it independently.

---

## **The Big Picture: What We're Building**

### **Core Purpose**
Replace Excel spreadsheets with a web app that workers can use on their phones to count inventory items at different locations in the warehouse and production zones.

### **Key Users**
- **Managers**: Upload inventory lists, view reports, manage the system
- **Workers**: Count items using their phones, update quantities in real-time

### **Physical Setup**
- 1 main warehouse
- 1 logistics zone (for receiving/shipping)
- 30 production zones (where cars are assembled)

---

## **Technical Architecture Explained**

### **Why We Chose These Technologies**

**Frontend: Vanilla JavaScript → React**
- Start with basic HTML/CSS/JavaScript because you're learning
- Later upgrade to React for better mobile experience
- Everything runs in a web browser (no app store needed)

**Backend: Firebase**
- Google's cloud service that handles databases and user accounts
- No need to manage servers - Firebase does it all
- Perfect for beginners because it's simple to set up

**Authentication: Google Login**
- Workers and managers log in with their Google accounts
- Firebase handles all the security automatically
- No need to create password systems

**Data Storage: Firestore Database**
- Stores all inventory counts, user information, and BOMs
- Real-time updates: when a worker counts items, managers see it instantly
- Works like Excel but accessible from anywhere

---

## **Development Phases Explained**

### **Phase 1: Foundation (Must Do First)**

#### **Task 1: GitHub Repository Setup (2 hours)**
**What it is**: Create a place to store all your code online
**Why we need it**: 
- Backup your work safely
- Track changes you make over time
- Professional development practice
- Share code with future Claude sessions

**What you'll learn**: 
- How to create repositories
- Basic git commands (save, upload, download changes)
- Collaboration workflows

#### **Task 2: Firebase Project Creation (3 hours)**
**What it is**: Set up your "backend server" on Google's cloud
**Why we need it**: 
- This is where all your data will live
- Handles user logins automatically
- Provides database for inventory counts

**What you'll learn**:
- How cloud services work
- API keys and security configurations
- Database setup and rules

**Technical details you'll understand**:
- Firebase console navigation
- Project configuration files
- Environment variables for security

#### **Task 3: Basic Project Structure (2 hours)**
**What it is**: Create the skeleton files for your web app
**Why we need it**: 
- Organize code logically
- Set up folder structure that scales
- Prepare for future features

**Files you'll create**:
- `index.html` - The main page users see
- `style.css` - Makes everything look nice
- `app.js` - The brain of your application
- `config.js` - Stores Firebase settings safely

---

### **Phase 2: User Authentication (Must Do Second)**

#### **Task 4: Google Login Implementation (4 hours)**
**What it is**: Let users sign in with their Google accounts
**Why we need it**: 
- Security: only authorized people can access inventory
- Accountability: track who counted what items
- Simplicity: no need to remember new passwords

**What you'll learn**:
- OAuth authentication (how "login with Google" works)
- User session management
- Security best practices

**Technical concepts**:
- Authentication vs Authorization
- Token-based security
- Firebase Auth SDK usage

---

### **Phase 3: Core Functionality (The Heart of the System)**

#### **Task 5: Display Inventory List (4 hours)**
**What it is**: Show workers a list of items they need to count
**Why we need it**: 
- Workers need to see what items exist
- Display current quantities from database
- Organize by zones/locations

**What you'll learn**:
- Database queries and retrieval
- Dynamic HTML generation
- Mobile-responsive design principles

**Technical details**:
- Firestore queries and filters
- JavaScript DOM manipulation
- CSS Grid/Flexbox for mobile layouts

#### **Task 6: Update Quantities (3 hours)**
**What it is**: Add buttons so workers can increase/decrease item counts
**Why we need it**: 
- Core functionality: counting inventory
- Real-time updates to database
- Track who made each change

**What you'll learn**:
- Event handling in JavaScript
- Database write operations
- State management in web apps

**Technical concepts**:
- Click event listeners
- Form validation
- Optimistic UI updates

---

### **Phase 4: Enhanced Features (Nice to Have)**

#### **Task 7: Zone Selection (3 hours)**
**What it is**: Dropdown menu to choose which zone to work in
**Why it helps**: 
- Workers only see items for their area
- Reduces confusion and errors
- Improves performance

#### **Task 8: CSV Upload for BOMs (5 hours)**
**What it is**: Managers can upload Excel files to update inventory lists
**Why it's important**: 
- Managers stay comfortable with Excel
- Bulk updates instead of one-by-one entry
- Integration with existing workflows

**Technical complexity**:
- File upload handling
- CSV parsing with PapaParse library
- Data validation and error handling

#### **Task 9: CSV Export for Reports (3 hours)**
**What it is**: Export current inventory counts to Excel format
**Why managers need it**: 
- Generate reports for management
- Backup data in familiar format
- Integration with existing reporting systems

---

### **Phase 5: Deployment and Testing**

#### **Task 10: Firebase Hosting (2 hours)**
**What it is**: Make your app available on the internet
**Why we need it**: 
- Workers can access it from their phones anywhere
- Professional deployment practice
- Secure HTTPS connection

#### **Task 11: Mobile Testing (4 hours)**
**What it is**: Test the app on actual phones and tablets
**Why it's critical**: 
- This is primarily a mobile app
- Different screen sizes behave differently
- Touch interfaces work differently than mouse clicks

#### **Task 12: User Role Management (6 hours)**
**What it is**: Different permissions for managers vs workers
**Why it matters**: 
- Security: workers shouldn't access manager functions
- User experience: show only relevant features
- Data integrity: prevent accidental changes

---

## **Data Flow Explanation**

### **How Information Moves Through the System**

1. **Manager uploads BOM (Bill of Materials)**:
   - Excel file → CSV conversion → Firebase Storage → Firestore database
   - System validates data and creates inventory items

2. **Worker counts inventory**:
   - Login → Zone selection → Item list → Count updates → Firestore database
   - Real-time sync: other users see changes immediately

3. **Manager views reports**:
   - Database query → Format data → Display/Export to CSV
   - Current counts, who counted, when counted

### **Database Structure You'll Build**

```
inventory_items/
  ├── sku: "BOLT001"
  ├── name: "Hex Bolt 10mm"
  ├── current_quantity: 150
  ├── zone: "Production-15"
  └── last_updated: timestamp

inventory_counts/
  ├── sku: "BOLT001"
  ├── counted_by: "worker@company.com"
  ├── quantity_change: +5
  ├── timestamp: "2025-08-05 14:30"
  └── zone: "Production-15"

users/
  ├── email: "manager@company.com"
  ├── role: "manager"
  ├── assigned_zones: ["all"]
  └── last_login: timestamp
```

---

## **Learning Checkpoints**

After each phase, you should understand:

### **After Phase 1**:
- How version control works
- How cloud services replace traditional servers
- Basic web development file structure

### **After Phase 2**:
- How modern authentication works
- Why security matters in web apps
- User session management

### **After Phase 3**:
- How databases work in web applications
- Real-time data synchronization
- Mobile-first development principles

### **After Phase 4**:
- File handling in web applications
- Data import/export workflows
- Advanced user interface patterns

### **After Phase 5**:
- Professional deployment practices
- Testing methodologies
- Production maintenance considerations

---

## **Future Maintenance Responsibilities**

### **What You'll Need to Monitor**:
- Firebase usage and costs
- User access management
- Data backup and recovery
- Performance optimization
- Security updates

### **Common Issues You'll Handle**:
- Workers reporting login problems
- Data inconsistencies between zones
- Mobile device compatibility
- Export/import file format issues

### **Skills You'll Develop**:
- Reading error logs and debugging
- Database query optimization
- User training and support
- System scaling decisions

---

## **Questions to Ask During Development**

Before starting each phase, confirm you understand:
1. **Why** we're building this feature
2. **How** it fits into the bigger system
3. **What** technologies we're using and why
4. **Where** the data comes from and goes to
5. **Who** will use this feature and how
6. **When** this feature should be used in the workflow

---

## **Success Criteria**

### **For the User (You)**:
- Can explain how every part of the system works
- Can troubleshoot common problems independently
- Can make small modifications and improvements
- Can train others to use the system

### **For the System**:
- Workers can count inventory faster than with Excel
- Managers get real-time visibility into inventory
- Data is more accurate and accountable
- Mobile experience is smooth and intuitive

---

*This document serves as your roadmap and reference. Each time you work with Claude, refer back to this plan to maintain consistency and understanding throughout the development process.*