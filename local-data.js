// Local data simulation for development
// This will be replaced with Firebase later

// Mock Item Table - this represents the inventory database
let itemTable = {
    "a001": {
        sku: "a001",
        name: "Component A001",
        total_amount: 100,
        amount_logistics: 25,
        amount_production_zone_1: 10,
        amount_production_zone_2: 15,
        amount_production_zone_3: 8,
        // Initialize all production zones to 0
        ...Object.fromEntries(
            Array.from({length: 30}, (_, i) => [`amount_production_zone_${i + 1}`, 0])
        )
    },
    "a002": {
        sku: "a002", 
        name: "Component A002",
        total_amount: 80,
        amount_logistics: 20,
        amount_production_zone_1: 5,
        amount_production_zone_2: 12,
        amount_production_zone_3: 3,
        ...Object.fromEntries(
            Array.from({length: 30}, (_, i) => [`amount_production_zone_${i + 1}`, 0])
        )
    },
    "b003": {
        sku: "b003",
        name: "Component B003", 
        total_amount: 60,
        amount_logistics: 15,
        amount_production_zone_1: 8,
        amount_production_zone_2: 7,
        amount_production_zone_3: 5,
        ...Object.fromEntries(
            Array.from({length: 30}, (_, i) => [`amount_production_zone_${i + 1}`, 0])
        )
    },
    "b004": {
        sku: "b004",
        name: "Component B004",
        total_amount: 120,
        amount_logistics: 30,
        amount_production_zone_1: 15,
        amount_production_zone_2: 20,
        amount_production_zone_3: 12,
        ...Object.fromEntries(
            Array.from({length: 30}, (_, i) => [`amount_production_zone_${i + 1}`, 0])
        )
    }
};

// Initialize with some realistic data for zones 1-3
itemTable.a001.amount_production_zone_1 = 10;
itemTable.a001.amount_production_zone_2 = 15;
itemTable.a001.amount_production_zone_3 = 8;

itemTable.a002.amount_production_zone_1 = 5;
itemTable.a002.amount_production_zone_2 = 12;
itemTable.a002.amount_production_zone_3 = 3;

itemTable.b003.amount_production_zone_1 = 8;
itemTable.b003.amount_production_zone_2 = 7;
itemTable.b003.amount_production_zone_3 = 5;

itemTable.b004.amount_production_zone_1 = 15;
itemTable.b004.amount_production_zone_2 = 20;
itemTable.b004.amount_production_zone_3 = 12;

// Version 2.0.0: Three-table system
// 1. Yesterday Result Table - Final confirmed inventory from previous day
let yesterdayResultTable = {};

// 2. Checked Item Table - What workers actually counted today
let checkedItemTable = {};

// 3. Transaction Item Table - Yesterday + Today's transactions = Expected
let transactionItemTable = {};

// Transaction log for audit trail
let transactionLog = [];

// Pending transactions (waiting for confirmation)
let pendingTransactions = [];

// Current user simulation
let currentUser = null;

// Available SKUs for dropdown
const availableSKUs = ["a001", "a002", "b003", "b004"];

// Available locations
const locations = {
    logistics: "Logistics",
    ...Object.fromEntries(
        Array.from({length: 30}, (_, i) => [`production_zone_${i + 1}`, `Production Zone ${i + 1}`])
    )
};

// Version 2.0.0: Initialize three-table system
function initializeThreeTables() {
    // Copy current itemTable as yesterday's result (starting point)
    yesterdayResultTable = JSON.parse(JSON.stringify(itemTable));
    
    // Transaction table starts as copy of yesterday
    transactionItemTable = JSON.parse(JSON.stringify(yesterdayResultTable));
    
    // Checked table starts empty (workers will fill it)
    checkedItemTable = {};
    
    console.log('Three-table system initialized');
}

// Local storage management
function saveDataToLocalStorage() {
    localStorage.setItem('berjaya_item_table', JSON.stringify(itemTable));
    localStorage.setItem('berjaya_transaction_log', JSON.stringify(transactionLog));
    
    // Version 2.0.0: Save three tables
    localStorage.setItem('berjaya_yesterday_table', JSON.stringify(yesterdayResultTable));
    localStorage.setItem('berjaya_checked_table', JSON.stringify(checkedItemTable));
    localStorage.setItem('berjaya_transaction_table', JSON.stringify(transactionItemTable));
    localStorage.setItem('berjaya_pending_transactions', JSON.stringify(pendingTransactions));
}

function loadDataFromLocalStorage() {
    const savedItemTable = localStorage.getItem('berjaya_item_table');
    const savedTransactionLog = localStorage.getItem('berjaya_transaction_log');
    
    if (savedItemTable) {
        itemTable = JSON.parse(savedItemTable);
    }
    
    if (savedTransactionLog) {
        transactionLog = JSON.parse(savedTransactionLog);
    }
    
    // Version 2.0.0: Load three tables
    const savedYesterday = localStorage.getItem('berjaya_yesterday_table');
    const savedChecked = localStorage.getItem('berjaya_checked_table');
    const savedTransaction = localStorage.getItem('berjaya_transaction_table');
    const savedPending = localStorage.getItem('berjaya_pending_transactions');
    
    if (savedYesterday) {
        yesterdayResultTable = JSON.parse(savedYesterday);
    }
    if (savedChecked) {
        checkedItemTable = JSON.parse(savedChecked);
    }
    if (savedTransaction) {
        transactionItemTable = JSON.parse(savedTransaction);
    }
    if (savedPending) {
        pendingTransactions = JSON.parse(savedPending);
    }
}

// Data access functions
function getItemTable() {
    // Always load fresh data from localStorage when getting the item table
    loadDataFromLocalStorage();
    return itemTable;
}

// Add a new function to just load item table (not transaction log)
function loadItemTable() {
    const savedItemTable = localStorage.getItem('berjaya_item_table');
    if (savedItemTable) {
        itemTable = JSON.parse(savedItemTable);
        console.log('Item table reloaded from localStorage');
    }
}

function getItemBySKU(sku) {
    return itemTable[sku] || null;
}

function getAvailableSKUs() {
    return availableSKUs;
}

function getLocations() {
    return locations;
}

// Transaction functions
function recordTransaction(sku, amount, location, transactionType = 'count') {
    const transaction = {
        id: Date.now() + Math.random(), // Simple ID generation
        sku: sku,
        amount: parseInt(amount),
        location: location,
        transaction_type: transactionType,
        counted_by: currentUser ? currentUser.email : 'test@user.com',
        timestamp: new Date().toISOString(),
        user_name: currentUser ? currentUser.name : 'Test User'
    };
    
    transactionLog.push(transaction);
    saveDataToLocalStorage();
    
    console.log('Transaction recorded:', transaction);
    return transaction;
}

function updateItemCount(sku, amount, location) {
    console.log('updateItemCount called with:', { sku, amount, location });
    
    if (!itemTable[sku]) {
        console.error('SKU not found:', sku);
        return false;
    }
    
    const locationKey = `amount_${location}`;
    console.log('Looking for locationKey:', locationKey);
    console.log('Available keys for', sku, ':', Object.keys(itemTable[sku]));
    
    if (!(locationKey in itemTable[sku])) {
        console.error('Location not found:', location, 'locationKey:', locationKey);
        return false;
    }
    
    // Version 2.0.0: Update CHECKED table for worker counts
    // Initialize SKU in checked table if not exists
    if (!checkedItemTable[sku]) {
        checkedItemTable[sku] = JSON.parse(JSON.stringify(itemTable[sku]));
        // Reset all amounts to 0 for fresh counting
        Object.keys(checkedItemTable[sku]).forEach(key => {
            if (key.startsWith('amount_')) {
                checkedItemTable[sku][key] = 0;
            }
        });
        checkedItemTable[sku].total_amount = 0;
    }
    
    // Update the checked table
    const oldValue = checkedItemTable[sku][locationKey];
    checkedItemTable[sku][locationKey] = parseInt(amount);
    console.log(`Updated CHECKED table ${sku} at ${locationKey}: ${oldValue} → ${checkedItemTable[sku][locationKey]}`);
    
    // Update total in checked table
    let total = checkedItemTable[sku].amount_logistics || 0;
    for (let i = 1; i <= 30; i++) {
        total += checkedItemTable[sku][`amount_production_zone_${i}`] || 0;
    }
    checkedItemTable[sku].total_amount = total;
    
    // Also update the legacy itemTable for backward compatibility
    itemTable[sku][locationKey] = parseInt(amount);
    updateTotalAmount(sku);
    
    // Record transaction
    recordTransaction(sku, amount, location);
    
    // Save all changes
    saveDataToLocalStorage();
    
    console.log(`Successfully updated ${sku} at ${location} to ${amount}`);
    return true;
}

function updateTotalAmount(sku) {
    if (!itemTable[sku]) return;
    
    let total = itemTable[sku].amount_logistics;
    
    // Add all production zone amounts
    for (let i = 1; i <= 30; i++) {
        total += itemTable[sku][`amount_production_zone_${i}`] || 0;
    }
    
    itemTable[sku].total_amount = total;
    saveDataToLocalStorage();
}

// User management
function setCurrentUser(user) {
    currentUser = user;
    console.log('Current user set:', currentUser);
}

function getCurrentUser() {
    return currentUser;
}

function clearCurrentUser() {
    currentUser = null;
}

// Version 2.0.0: Transaction functions with OTP
function createTransaction(sku, amount, fromLocation, toLocation) {
    // Generate 4-digit OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    
    // Generate transaction ID (TRX-YYYYMMDD-XXX)
    const date = new Date();
    const dateStr = date.getFullYear() + 
                   String(date.getMonth() + 1).padStart(2, '0') + 
                   String(date.getDate()).padStart(2, '0');
    const sequence = (pendingTransactions.length + 1).toString().padStart(3, '0');
    const transactionId = `TRX-${dateStr}-${sequence}`;
    
    const transaction = {
        id: transactionId,
        sku: sku,
        amount: parseInt(amount),
        from_location: fromLocation,
        to_location: toLocation,
        otp: otp,
        status: 'pending',
        created_by: currentUser ? currentUser.email : 'test@user.com',
        created_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + 3600000).toISOString() // 1 hour expiry
    };
    
    pendingTransactions.push(transaction);
    saveDataToLocalStorage();
    
    console.log('Transaction created:', transaction);
    return transaction;
}

function confirmTransaction(transactionId, enteredOtp) {
    const transaction = pendingTransactions.find(t => t.id === transactionId);
    
    if (!transaction) {
        return { success: false, message: 'Transaction not found' };
    }
    
    // Check if expired
    if (new Date() > new Date(transaction.expires_at)) {
        transaction.status = 'expired';
        saveDataToLocalStorage();
        return { success: false, message: 'Transaction expired' };
    }
    
    // Verify OTP
    if (transaction.otp !== enteredOtp) {
        return { success: false, message: 'Invalid OTP' };
    }
    
    // Process the transaction
    // Update transaction table
    const sku = transaction.sku;
    const amount = transaction.amount;
    const fromKey = `amount_${transaction.from_location}`;
    const toKey = `amount_${transaction.to_location}`;
    
    if (transactionItemTable[sku]) {
        // Subtract from source
        transactionItemTable[sku][fromKey] = Math.max(0, (transactionItemTable[sku][fromKey] || 0) - amount);
        // Add to destination
        transactionItemTable[sku][toKey] = (transactionItemTable[sku][toKey] || 0) + amount;
        
        // Update total
        let total = transactionItemTable[sku].amount_logistics || 0;
        for (let i = 1; i <= 30; i++) {
            total += transactionItemTable[sku][`amount_production_zone_${i}`] || 0;
        }
        transactionItemTable[sku].total_amount = total;
    }
    
    // Mark as completed
    transaction.status = 'completed';
    transaction.confirmed_by = currentUser ? currentUser.email : 'test@user.com';
    transaction.confirmed_at = new Date().toISOString();
    
    // Move to transaction log
    transactionLog.push({
        ...transaction,
        transaction_type: 'transfer'
    });
    
    // Remove from pending
    pendingTransactions = pendingTransactions.filter(t => t.id !== transactionId);
    
    saveDataToLocalStorage();
    
    return { success: true, message: 'Transaction confirmed', transaction };
}

function getPendingTransactions(location = null) {
    if (!location) {
        return pendingTransactions;
    }
    
    // Filter for transactions going TO this location
    return pendingTransactions.filter(t => 
        t.to_location === location && 
        t.status === 'pending' &&
        new Date() < new Date(t.expires_at)
    );
}

// Add waste and lost as special locations
locations.waste = "Waste Bin";
locations.lost = "Lost Items";

// Initialize data on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Loading local data...');
    loadDataFromLocalStorage();
    console.log('Local data loaded. Item table:', itemTable);
    
    // Initialize three-table system if not already done
    if (Object.keys(yesterdayResultTable).length === 0) {
        initializeThreeTables();
    }
});