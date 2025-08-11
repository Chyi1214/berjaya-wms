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

// Transaction log for audit trail
let transactionLog = [];

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

// Local storage management
function saveDataToLocalStorage() {
    localStorage.setItem('berjaya_item_table', JSON.stringify(itemTable));
    localStorage.setItem('berjaya_transaction_log', JSON.stringify(transactionLog));
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
    
    // For now, we'll SET the count (replace existing)
    // Later we can change this to ADD or implement different logic
    const oldValue = itemTable[sku][locationKey];
    itemTable[sku][locationKey] = parseInt(amount);
    console.log(`Updated ${sku} at ${locationKey}: ${oldValue} → ${itemTable[sku][locationKey]}`);
    
    // Update total amount (sum of all locations)
    updateTotalAmount(sku);
    
    // Record transaction
    recordTransaction(sku, amount, location);
    
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

// Initialize data on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Loading local data...');
    loadDataFromLocalStorage();
    console.log('Local data loaded. Item table:', itemTable);
});