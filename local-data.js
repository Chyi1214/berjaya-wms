// Local data simulation for development
// This will be replaced with Firebase later

// NEW ARCHITECTURE: Separate Item Catalog from Inventory

// Item Catalog - Master list of all components (SKU + Name only)
let itemCatalog = {
    "a001": { sku: "a001", name: "Bolt M8x20 Steel" },
    "a002": { sku: "a002", name: "Washer M8 Zinc" },
    "a003": { sku: "a003", name: "Nut M8 Steel" },
    "b001": { sku: "b001", name: "Spring Coil Heavy Duty" },
    "b002": { sku: "b002", name: "Rubber Gasket Large" },
    "b003": { sku: "b003", name: "Metal Bracket L-Type" },
    "c001": { sku: "c001", name: "Wire Harness Main" },
    "c002": { sku: "c002", name: "Connector 4-Pin" },
    "c003": { sku: "c003", name: "Relay 12V 30A" },
    "d001": { sku: "d001", name: "Filter Oil Primary" },
    "d002": { sku: "d002", name: "Filter Air Secondary" },
    "d003": { sku: "d003", name: "Seal Ring Rubber" },
    "e001": { sku: "e001", name: "Bearing Ball 6203" },
    "e002": { sku: "e002", name: "Shaft Steel 15mm" },
    "e003": { sku: "e003", name: "Gear Wheel 24T" }
};

// Inventory Table - Current quantities by location (separate from catalog)
let inventoryTable = {};

// BOM Definitions - Assembly recipes
let bomDefinitions = {
    "TK1": {
        bom_code: "TK1",
        name: "Wheel Assembly Kit",
        components: {
            "a001": 2,  // 2x Bolt M8x20 Steel
            "b003": 3,  // 3x Metal Bracket L-Type
            "e001": 1   // 1x Bearing Ball 6203
        }
    },
    "TK2": {
        bom_code: "TK2", 
        name: "Brake System Kit",
        components: {
            "a002": 4,  // 4x Washer M8 Zinc
            "b002": 2,  // 2x Rubber Gasket Large
            "c003": 1   // 1x Relay 12V 30A
        }
    },
    "TK3": {
        bom_code: "TK3",
        name: "Electronics Package",
        components: {
            "c001": 1,  // 1x Wire Harness Main
            "c002": 6,  // 6x Connector 4-Pin
            "d001": 1,  // 1x Filter Oil Primary
            "d003": 2   // 2x Seal Ring Rubber
        }
    }
};

// BOM Transaction Groups - Track assembly-level transactions
let bomTransactionGroups = [];

// Legacy itemTable - for backward compatibility, combines catalog + inventory
let itemTable = {};

// Function to rebuild legacy itemTable from catalog + inventory
function rebuildLegacyItemTable() {
    itemTable = {};
    Object.keys(itemCatalog).forEach(sku => {
        // Always create entry if in catalog, even if not in inventory yet
        const catalogItem = itemCatalog[sku];
        const inventoryItem = inventoryTable[sku] || {
            sku: sku,
            total_amount: 0,
            amount_logistics: 0,
            ...Object.fromEntries(
                Array.from({length: 30}, (_, i) => [`amount_production_zone_${i + 1}`, 0])
            )
        };
        
        itemTable[sku] = {
            sku: sku,
            name: catalogItem.name,
            ...inventoryItem
        };
    });
}

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
const availableSKUs = ["a001", "a002", "a003", "b001", "b002", "b003", "c001", "c002", "c003", "d001", "d002", "d003", "e001", "e002", "e003"];

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
    // Save new architecture data
    localStorage.setItem('berjaya_item_catalog', JSON.stringify(itemCatalog));
    localStorage.setItem('berjaya_inventory_table', JSON.stringify(inventoryTable));
    localStorage.setItem('berjaya_bom_definitions', JSON.stringify(bomDefinitions));
    localStorage.setItem('berjaya_bom_transaction_groups', JSON.stringify(bomTransactionGroups));
    
    // Legacy support
    localStorage.setItem('berjaya_item_table', JSON.stringify(itemTable));
    localStorage.setItem('berjaya_transaction_log', JSON.stringify(transactionLog));
    
    // Version 2.0.0: Save three tables
    localStorage.setItem('berjaya_yesterday_table', JSON.stringify(yesterdayResultTable));
    localStorage.setItem('berjaya_checked_table', JSON.stringify(checkedItemTable));
    localStorage.setItem('berjaya_transaction_table', JSON.stringify(transactionItemTable));
    localStorage.setItem('berjaya_pending_transactions', JSON.stringify(pendingTransactions));
}

function loadDataFromLocalStorage() {
    // Load new architecture data
    const savedItemCatalog = localStorage.getItem('berjaya_item_catalog');
    const savedInventoryTable = localStorage.getItem('berjaya_inventory_table');
    const savedBomDefinitions = localStorage.getItem('berjaya_bom_definitions');
    const savedBomTransactionGroups = localStorage.getItem('berjaya_bom_transaction_groups');
    
    if (savedItemCatalog) {
        itemCatalog = JSON.parse(savedItemCatalog);
    }
    if (savedInventoryTable) {
        inventoryTable = JSON.parse(savedInventoryTable);
    }
    if (savedBomDefinitions) {
        bomDefinitions = JSON.parse(savedBomDefinitions);
    }
    if (savedBomTransactionGroups) {
        bomTransactionGroups = JSON.parse(savedBomTransactionGroups);
    }
    
    // Rebuild legacy itemTable
    rebuildLegacyItemTable();
    
    // Legacy loading
    const savedTransactionLog = localStorage.getItem('berjaya_transaction_log');
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
    return Object.keys(itemCatalog);
}

function getLocations() {
    return locations;
}

// New BOM access functions
function getItemCatalog() {
    return itemCatalog;
}

function getInventoryTable() {
    return inventoryTable;
}

function getBOMDefinitions() {
    return bomDefinitions;
}

function getBOMTransactionGroups() {
    return bomTransactionGroups;
}

function getBOMBySKU(bomCode) {
    return bomDefinitions[bomCode] || null;
}

// BOM Transaction Group Functions
function createBOMTransactionGroup(bomCode, quantity, fromLocation, toLocation) {
    const bom = getBOMBySKU(bomCode);
    if (!bom) {
        throw new Error(`BOM ${bomCode} not found`);
    }
    
    // Generate unique group ID
    const groupId = `BG-${Date.now()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
    
    const bomGroup = {
        group_id: groupId,
        bom_code: bomCode,
        bom_name: bom.name,
        quantity: parseInt(quantity),
        from_location: fromLocation,
        to_location: toLocation,
        created_by: currentUser ? currentUser.email : 'test@user.com',
        created_at: new Date().toISOString(),
        status: 'pending',
        component_transactions: [],
        expansion: {}
    };
    
    // Calculate component expansion
    Object.keys(bom.components).forEach(componentSku => {
        const componentQuantity = bom.components[componentSku] * quantity;
        bomGroup.expansion[componentSku] = componentQuantity;
    });
    
    // Generate single OTP for the entire BOM group
    const bomOTP = Math.floor(1000 + Math.random() * 9000).toString();
    bomGroup.otp = bomOTP;
    
    // Create individual component transactions with same OTP
    Object.keys(bomGroup.expansion).forEach(componentSku => {
        const componentQuantity = bomGroup.expansion[componentSku];
        const componentTransaction = createTransactionWithOTP(
            componentSku, 
            componentQuantity, 
            fromLocation, 
            toLocation,
            groupId, // Link back to BOM group (without BOM- prefix)
            bomOTP // Use same OTP for all components in BOM
        );
        bomGroup.component_transactions.push(componentTransaction.id);
    });
    
    // Save BOM group
    bomTransactionGroups.push(bomGroup);
    saveDataToLocalStorage();
    
    console.log(`BOM Transaction Group created: ${groupId} (${quantity}x ${bomCode})`);
    console.log(`Expanded to:`, bomGroup.expansion);
    
    return bomGroup;
}

function getBOMTransactionGroupById(groupId) {
    return bomTransactionGroups.find(group => group.group_id === groupId) || null;
}

function updateBOMTransactionGroupStatus(groupId, status) {
    const group = getBOMTransactionGroupById(groupId);
    if (group) {
        group.status = status;
        group.updated_at = new Date().toISOString();
        saveDataToLocalStorage();
    }
    return group;
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

// Clear all transaction data
function clearAllTransactionData() {
    pendingTransactions = [];
    transactionLog = [];
    bomTransactionGroups = [];
    saveDataToLocalStorage(); // Make sure changes are saved immediately
    console.log('All transaction data cleared and saved');
}

// Version 2.0.0: Transaction functions with OTP
function createTransactionWithOTP(sku, amount, fromLocation, toLocation, bomGroupId = null, providedOTP = null) {
    // Check if this is a waste or lost transaction (auto-confirm these)
    const isWasteOrLost = (toLocation === 'waste' || toLocation === 'lost');
    
    // Generate transaction ID (TRX-YYYYMMDD-XXX)
    const date = new Date();
    const dateStr = date.getFullYear() + 
                   String(date.getMonth() + 1).padStart(2, '0') + 
                   String(date.getDate()).padStart(2, '0');
    const sequence = (pendingTransactions.length + transactionLog.length + 1).toString().padStart(3, '0');
    const transactionId = `TRX-${dateStr}-${sequence}`;
    
    const transaction = {
        id: transactionId,
        sku: sku,
        amount: parseInt(amount),
        from_location: fromLocation,
        to_location: toLocation,
        created_by: currentUser ? currentUser.email : 'test@user.com',
        created_at: new Date().toISOString(),
        transaction_type: 'transfer',
        bom_group_id: bomGroupId  // Link to BOM group if this is part of a BOM transaction
    };
    
    if (isWasteOrLost) {
        // Auto-confirm waste/lost transactions immediately
        transaction.status = 'auto-approved';
        transaction.confirmed_by = 'system';
        transaction.confirmed_at = new Date().toISOString();
        transaction.otp = 'N/A';
        
        // Immediately update transaction table
        if (transactionItemTable[sku]) {
            const fromKey = `amount_${fromLocation}`;
            const toKey = `amount_${toLocation}`;
            
            // Subtract from source
            transactionItemTable[sku][fromKey] = Math.max(0, (transactionItemTable[sku][fromKey] || 0) - parseInt(amount));
            
            // For waste/lost, we don't add to destination (items are gone)
            // Update total
            let total = transactionItemTable[sku].amount_logistics || 0;
            for (let i = 1; i <= 30; i++) {
                total += transactionItemTable[sku][`amount_production_zone_${i}`] || 0;
            }
            transactionItemTable[sku].total_amount = total;
        }
        
        // Add directly to transaction log
        transactionLog.push(transaction);
        
        console.log('Waste/Lost transaction auto-approved:', transaction);
    } else {
        // Regular transaction - use provided OTP or generate new one
        const otp = providedOTP || Math.floor(1000 + Math.random() * 9000).toString();
        transaction.otp = otp;
        transaction.status = 'pending';
        transaction.expires_at = new Date(Date.now() + 3600000).toISOString(); // 1 hour expiry
        
        pendingTransactions.push(transaction);
        console.log('Regular transaction created (pending OTP):', transaction);
    }
    
    saveDataToLocalStorage();
    return transaction;
}

// Original createTransaction function now calls the new one
function createTransaction(sku, amount, fromLocation, toLocation, bomGroupId = null) {
    return createTransactionWithOTP(sku, amount, fromLocation, toLocation, bomGroupId, null);
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

// Function to populate test inventory data
function populateTestInventory() {
    console.log('Populating test inventory data...');
    
    // Clear existing inventory
    inventoryTable = {};
    
    // Generate random inventory for all catalog items
    Object.keys(itemCatalog).forEach(sku => {
        const baseAmount = Math.floor(Math.random() * 200) + 50; // 50-250 base amount
        const logisticsAmount = Math.floor(baseAmount * 0.6); // 60% in logistics
        
        inventoryTable[sku] = {
            sku: sku,
            amount_logistics: logisticsAmount,
            ...Object.fromEntries(
                Array.from({length: 30}, (_, i) => [`amount_production_zone_${i + 1}`, 0])
            )
        };
        
        // Distribute remaining to first 5 production zones
        let remaining = baseAmount - logisticsAmount;
        for (let i = 1; i <= 5 && remaining > 0; i++) {
            const zoneAmount = Math.floor(Math.random() * (remaining * 0.4)) + 1;
            inventoryTable[sku][`amount_production_zone_${i}`] = zoneAmount;
            remaining -= zoneAmount;
        }
        
        // Calculate total
        let total = inventoryTable[sku].amount_logistics;
        for (let i = 1; i <= 30; i++) {
            total += inventoryTable[sku][`amount_production_zone_${i}`] || 0;
        }
        inventoryTable[sku].total_amount = total;
    });
    
    // Rebuild legacy itemTable and save
    rebuildLegacyItemTable();
    saveDataToLocalStorage();
    
    console.log('Test inventory populated for', Object.keys(inventoryTable).length, 'items');
    return inventoryTable;
}

// Initialize data on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Loading local data...');
    loadDataFromLocalStorage();
    
    // If no inventory data exists, populate test data
    if (Object.keys(inventoryTable).length === 0) {
        populateTestInventory();
    }
    
    // Build legacy itemTable from new architecture
    rebuildLegacyItemTable();
    
    console.log('Local data loaded:');
    console.log('- Item catalog:', Object.keys(itemCatalog).length, 'items');
    console.log('- Inventory table:', Object.keys(inventoryTable).length, 'items');
    console.log('- BOM definitions:', Object.keys(bomDefinitions).length, 'BOMs');
    console.log('- Legacy item table:', Object.keys(itemTable).length, 'items');
    
    // Initialize three-table system if not already done
    if (Object.keys(yesterdayResultTable).length === 0) {
        initializeThreeTables();
    }
});