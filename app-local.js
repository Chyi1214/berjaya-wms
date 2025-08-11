// Local development version of app.js
// This version works without Firebase for testing

document.addEventListener('DOMContentLoaded', function() {
    console.log('Berjaya WMS app starting (LOCAL MODE)...');
    
    // Get references to all sections
    const loginSection = document.getElementById('login-section');
    const roleSelectionSection = document.getElementById('role-selection-section');
    const logisticsSection = document.getElementById('logistics-section');
    const productionSection = document.getElementById('production-section');
    const managerSection = document.getElementById('manager-section');
    
    // Get references to buttons and elements
    const googleLoginBtn = document.getElementById('google-login-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const userNameSpan = document.getElementById('user-name');
    
    // Role buttons
    const logisticsBtn = document.getElementById('logistics-btn');
    const productionBtn = document.getElementById('production-btn');
    const managerBtn = document.getElementById('manager-btn');
    
    // Back buttons
    const backBtn1 = document.getElementById('back-to-roles-btn-1');
    const backBtn2 = document.getElementById('back-to-roles-btn-2');
    const backBtn3 = document.getElementById('back-to-roles-btn-3');
    
    // Current state
    let currentRole = null;
    let selectedZone = null;
    
    // Simple test login (replaces Firebase auth for local development)
    googleLoginBtn.addEventListener('click', function() {
        console.log('Test login clicked');
        
        // Simulate login loading
        googleLoginBtn.textContent = languageManager.getText('logging_in');
        googleLoginBtn.disabled = true;
        
        // Simulate network delay
        setTimeout(() => {
            // Create test user
            const testUser = {
                email: 'test@berjaya.com',
                name: 'Test User'
            };
            
            setCurrentUser(testUser);
            showRoleSelection();
            
            console.log('Test login successful');
        }, 1000);
    });
    
    // Logout functionality
    logoutBtn.addEventListener('click', function() {
        console.log('Logout clicked');
        clearCurrentUser();
        currentRole = null;
        selectedZone = null;
        showLoginSection();
    });
    
    // Role selection event listeners
    logisticsBtn.addEventListener('click', function() {
        console.log('Logistics role selected');
        currentRole = 'logistics';
        showLogisticsSection();
    });
    
    productionBtn.addEventListener('click', function() {
        console.log('Production role selected');
        currentRole = 'production';
        showProductionSection();
    });
    
    managerBtn.addEventListener('click', function() {
        console.log('Manager role selected');
        currentRole = 'manager';
        showManagerSection();
    });
    
    // Back button event listeners
    backBtn1.addEventListener('click', function() {
        showRoleSelection();
    });
    
    backBtn2.addEventListener('click', function() {
        showRoleSelection();
        selectedZone = null; // Reset selected zone
    });
    
    backBtn3.addEventListener('click', function() {
        showRoleSelection();
    });
    
    // Section display functions
    function hideAllSections() {
        loginSection.style.display = 'none';
        roleSelectionSection.style.display = 'none';
        logisticsSection.style.display = 'none';
        productionSection.style.display = 'none';
        managerSection.style.display = 'none';
    }
    
    function showLoginSection() {
        hideAllSections();
        loginSection.style.display = 'block';
        
        // Reset login button
        googleLoginBtn.textContent = 'Login with Google (Test Mode)';
        googleLoginBtn.disabled = false;
    }
    
    function showRoleSelection() {
        hideAllSections();
        roleSelectionSection.style.display = 'block';
        
        // Display user name
        const user = getCurrentUser();
        if (user) {
            userNameSpan.textContent = user.name || user.email;
        }
    }
    
    function showLogisticsSection() {
        hideAllSections();
        logisticsSection.style.display = 'block';
        setupLogisticsWorkflow();
    }
    
    function showProductionSection() {
        hideAllSections();
        productionSection.style.display = 'block';
        setupProductionWorkflow();
    }
    
    function showManagerSection() {
        hideAllSections();
        managerSection.style.display = 'block';
        setupManagerView();
    }
    
    // Logistics workflow setup
    function setupLogisticsWorkflow() {
        const checkInventoryBtn = document.getElementById('check-inventory-logistics-btn');
        const transactionBtn = document.getElementById('transaction-logistics-btn');
        const countingForm = document.getElementById('logistics-counting-form');
        const transactionForm = document.getElementById('logistics-transaction-form');
        
        checkInventoryBtn.addEventListener('click', function() {
            console.log('Check Inventory clicked in Logistics');
            transactionForm.style.display = 'none';
            showCountingForm(countingForm, 'logistics');
        });
        
        // Version 2.0.0: Transaction button
        transactionBtn.addEventListener('click', function() {
            console.log('Transaction clicked in Logistics');
            countingForm.style.display = 'none';
            showTransactionForm(transactionForm, 'logistics');
        });
    }
    
    // Production workflow setup
    function setupProductionWorkflow() {
        const zoneInput = document.getElementById('zone-input');
        const selectZoneBtn = document.getElementById('select-zone-btn');
        const productionCounting = document.getElementById('production-counting');
        
        selectZoneBtn.addEventListener('click', function() {
            const zoneNumber = parseInt(zoneInput.value);
            
            if (zoneNumber >= 1 && zoneNumber <= 30) {
                selectedZone = zoneNumber;
                console.log('Zone selected:', selectedZone);
                
                // Hide zone selection, show counting interface
                document.getElementById('zone-selection').style.display = 'none';
                productionCounting.style.display = 'block';
                
                setupProductionCounting();
            } else {
                alert(languageManager.getText('zone_error') || 'Please enter a valid zone number between 1 and 30');
            }
        });
    }
    
    function setupProductionCounting() {
        const productionCounting = document.getElementById('production-counting');
        productionCounting.style.display = 'block';
        
        const checkInventoryProductionBtn = document.getElementById('check-inventory-production-btn');
        const transactionProductionBtn = document.getElementById('transaction-production-btn');
        const productionCountingForm = document.getElementById('production-counting-form');
        const productionTransactionForm = document.getElementById('production-transaction-form');
        
        // Clear any existing listeners first
        const newCheckBtn = checkInventoryProductionBtn.cloneNode(true);
        checkInventoryProductionBtn.parentNode.replaceChild(newCheckBtn, checkInventoryProductionBtn);
        const newTransBtn = transactionProductionBtn.cloneNode(true);
        transactionProductionBtn.parentNode.replaceChild(newTransBtn, transactionProductionBtn);
        
        // Add event listeners
        document.getElementById('check-inventory-production-btn').addEventListener('click', function() {
            console.log('Check Inventory clicked in Production Zone', selectedZone);
            productionTransactionForm.style.display = 'none';
            showCountingForm(productionCountingForm, `production_zone_${selectedZone}`);
        });
        
        // Version 2.0.0: Transaction button for production
        document.getElementById('transaction-production-btn').addEventListener('click', function() {
            console.log('Transaction clicked in Production Zone', selectedZone);
            productionCountingForm.style.display = 'none';
            showTransactionForm(productionTransactionForm, `production_zone_${selectedZone}`);
        });
    }
    
    // Universal counting form
    function showCountingForm(container, location) {
        const availableSKUs = getAvailableSKUs();
        
        container.innerHTML = `
            <h3 data-lang="inventory_counting">${languageManager.getText('inventory_counting') || 'Inventory Counting'}</h3>
            <div class="counting-form">
                <div class="form-group">
                    <label for="sku-search" data-lang="sku_label">${languageManager.getText('sku_label')}</label>
                    <div class="searchable-dropdown">
                        <input type="text" id="sku-search" placeholder="Type to search SKU..." autocomplete="off" required>
                        <div id="sku-dropdown" class="dropdown-list" style="display: none;">
                            <!-- SKU options will be populated here -->
                        </div>
                    </div>
                    <input type="hidden" id="selected-sku" value="">
                </div>
                
                <div class="form-group">
                    <label for="amount-input" data-lang="amount_label">${languageManager.getText('amount_label')}</label>
                    <input type="number" id="amount-input" min="0" data-lang-placeholder="amount_placeholder" required>
                </div>
                
                <div class="form-group">
                    <label data-lang="location_label">${languageManager.getText('location_label') || 'Location:'}:</label>
                    <p><strong>${getLocationDisplayName(location)}</strong></p>
                </div>
                
                <div class="form-actions">
                    <button id="submit-count-btn" data-lang="submit_count">${languageManager.getText('submit_count')}</button>
                    <button id="cancel-count-btn" data-lang="cancel">${languageManager.getText('cancel')}</button>
                </div>
            </div>
            
            <div id="count-status"></div>
        `;
        
        // Update placeholders after creating the form
        const amountInput = container.querySelector('#amount-input');
        if (amountInput) {
            amountInput.placeholder = languageManager.getText('amount_placeholder');
        }
        
        container.style.display = 'block';
        
        // Setup searchable SKU dropdown
        setupSearchableDropdown(availableSKUs);
        
        // Add event listeners for the form
        const submitBtn = document.getElementById('submit-count-btn');
        const cancelBtn = document.getElementById('cancel-count-btn');
        const selectedSkuInput = document.getElementById('selected-sku');
        const statusDiv = document.getElementById('count-status');
        
        submitBtn.addEventListener('click', function() {
            const sku = selectedSkuInput.value;
            const amount = amountInput.value;
            
            if (!sku) {
                alert(languageManager.getText('select_sku_error') || 'Please select a SKU');
                return;
            }
            
            if (!amount || amount < 0) {
                alert(languageManager.getText('valid_amount_error') || 'Please enter a valid amount');
                return;
            }
            
            // Submit the count
            const success = updateItemCount(sku, amount, location);
            
            if (success) {
                statusDiv.innerHTML = `<p style="color: green;">✓ ${languageManager.getText('count_saved')}</p>`;
                
                // Clear form
                skuSelect.value = '';
                amountInput.value = '';
                
                console.log('Count submitted successfully');
            } else {
                statusDiv.innerHTML = `<p style="color: red;">✗ ${languageManager.getText('error_occurred')}</p>`;
            }
        });
        
        cancelBtn.addEventListener('click', function() {
            container.style.display = 'none';
        });
    }
    
    // Manager view setup - Version 2.0.0 Complete Dashboard
    function setupManagerView() {
        setupDropdownNavigation();
        refreshManagerDashboard();
        
        const refreshBtn = document.getElementById('refresh-dashboard-btn');
        refreshBtn.addEventListener('click', function() {
            console.log('Refreshing dashboard...');
            refreshManagerDashboard();
        });
        
        const resetBtn = document.getElementById('reset-data-btn');
        resetBtn.addEventListener('click', async function() {
            const confirmed = await modal.confirm(
                '⚠️ Reset All Data?',
                'This will:\n• Clear all transactions\n• Reset checked items\n• Set fresh starting point\n\nThis cannot be undone!'
            );
            if (confirmed) {
                resetAllData();
            }
        });
        
        const finalizeBtn = document.getElementById('finalize-day-btn');
        finalizeBtn.addEventListener('click', async function() {
            const confirmed = await modal.confirm(
                '🎯 Finalize Day?',
                'This will set today\'s results as tomorrow\'s starting point.\n\nAre you sure you want to finalize the day?'
            );
            if (confirmed) {
                finalizeDay();
            }
        });
    }
    
    // Dropdown navigation setup
    function setupDropdownNavigation() {
        const selector = document.getElementById('table-selector');
        
        selector.addEventListener('change', function() {
            const selectedTable = this.value;
            refreshTableDisplay(selectedTable);
        });
        
        // Show overview by default
        refreshTableDisplay('overview');
    }
    
    // Refresh specific table display
    function refreshTableDisplay(tableType) {
        const display = document.getElementById('table-display');
        
        switch(tableType) {
            case 'overview':
                displayOverview();
                break;
            case 'yesterday':
                display.innerHTML = generateTableHTML(yesterdayResultTable, 'Yesterday\'s Final Inventory');
                break;
            case 'checked':
                display.innerHTML = generateTableHTML(checkedItemTable, 'Today\'s Counted Items');
                break;
            case 'transaction':
                display.innerHTML = generateTableHTML(transactionItemTable, 'Expected Based on Transactions');
                break;
            case 'logs':
                displayTransactionLogs();
                break;
        }
    }
    
    // Refresh entire dashboard
    function refreshManagerDashboard() {
        // Load fresh data
        loadDataFromLocalStorage();
        
        // Refresh current view
        const selector = document.getElementById('table-selector');
        if (selector) {
            const currentTable = selector.value;
            refreshTableDisplay(currentTable);
        }
    }
    
    // Reset all data function
    async function resetAllData() {
        console.log('Resetting all data to synchronized state...');
        
        // Load current itemTable as the baseline
        loadDataFromLocalStorage();
        const currentItemTable = getItemTable();
        
        // Set all three tables to be identical (current itemTable)
        yesterdayResultTable = JSON.parse(JSON.stringify(currentItemTable));
        transactionItemTable = JSON.parse(JSON.stringify(currentItemTable));  
        checkedItemTable = JSON.parse(JSON.stringify(currentItemTable));
        
        // Clear all transactions and logs
        pendingTransactions = [];
        transactionLog = [];
        
        // Save the synchronized state
        saveDataToLocalStorage();
        
        console.log('✅ Reset complete: All tables now synchronized');
        console.log('Yesterday =', Object.keys(yesterdayResultTable).length, 'items');
        console.log('Transaction =', Object.keys(transactionItemTable).length, 'items'); 
        console.log('Checked =', Object.keys(checkedItemTable).length, 'items');
        
        // Refresh the current view
        refreshManagerDashboard();
        
        await modal.alert(
            '✅ Data Reset Complete!',
            '• All tables now synchronized\n• Transactions cleared\n• Ready for fresh testing'
        );
    }
    
    // Display overview with comparison
    function displayOverview() {
        const display = document.getElementById('table-display');
        
        // Load all three tables
        loadDataFromLocalStorage();
        
        let html = `
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                <div>
                    <h4>Checked vs Transaction Comparison</h4>
                    ${generateComparisonTable()}
                </div>
                <div>
                    <h4>Summary Statistics</h4>
                    ${generateSummaryStats()}
                </div>
            </div>
        `;
        
        display.innerHTML = html;
    }
    
    // Generate comparison table
    function generateComparisonTable() {
        // Ensure we have the latest data
        loadDataFromLocalStorage();
        
        const allSKUs = new Set([
            ...Object.keys(checkedItemTable),
            ...Object.keys(transactionItemTable)
        ]);
        
        let html = '<table class="item-table"><thead><tr><th>SKU</th><th>Checked</th><th>Expected</th><th>Difference</th></tr></thead><tbody>';
        
        allSKUs.forEach(sku => {
            const checked = checkedItemTable[sku];
            const expected = transactionItemTable[sku];
            
            // Helper function to calculate correct total
            function calculateTotal(item) {
                if (!item) return 0;
                let total = (item.amount_logistics || 0);
                for (let i = 1; i <= 30; i++) {
                    total += (item[`amount_production_zone_${i}`] || 0);
                }
                return total;
            }
            
            if (!checked && expected) {
                // Not counted yet
                const expectedTotal = calculateTotal(expected);
                html += `<tr class="missing-item">
                    <td>${sku}</td>
                    <td>Not counted</td>
                    <td>${expectedTotal}</td>
                    <td>Missing count</td>
                </tr>`;
            } else if (checked && !expected) {
                // Extra item counted
                const checkedTotal = calculateTotal(checked);
                html += `<tr class="extra-item">
                    <td>${sku}</td>
                    <td>${checkedTotal}</td>
                    <td>No record</td>
                    <td>Unexpected item</td>
                </tr>`;
            } else if (checked && expected) {
                const checkedTotal = calculateTotal(checked);
                const expectedTotal = calculateTotal(expected);
                const diff = checkedTotal - expectedTotal;
                
                if (diff !== 0) {
                    html += `<tr class="difference-highlight">
                        <td>${sku}</td>
                        <td>${checkedTotal}</td>
                        <td>${expectedTotal}</td>
                        <td>${diff > 0 ? '+' : ''}${diff}</td>
                    </tr>`;
                } else {
                    html += `<tr>
                        <td>${sku}</td>
                        <td>${checkedTotal}</td>
                        <td>${expectedTotal}</td>
                        <td>✓ Match</td>
                    </tr>`;
                }
            }
        });
        
        html += '</tbody></table>';
        return html;
    }
    
    // Generate summary statistics
    function generateSummaryStats() {
        // Ensure we have the latest data
        loadDataFromLocalStorage();
        
        const pendingCount = pendingTransactions.filter(t => t.status === 'pending').length;
        const completedToday = transactionLog.filter(t => {
            const today = new Date().toDateString();
            return new Date(t.created_at || t.timestamp).toDateString() === today;
        }).length;
        
        return `
            <div style="padding: 10px; background: #f5f5f5; border-radius: 5px;">
                <p><strong>Pending Transactions:</strong> ${pendingCount}</p>
                <p><strong>Completed Today:</strong> ${completedToday}</p>
                <p><strong>Items Checked:</strong> ${Object.keys(checkedItemTable).length}</p>
                <p><strong>Expected Items:</strong> ${Object.keys(transactionItemTable).length}</p>
            </div>
        `;
    }
    
    // Display yesterday's result table
    function displayYesterdayTable() {
        const display = document.getElementById('yesterday-table-display');
        display.innerHTML = generateTableHTML(yesterdayResultTable, 'Yesterday\'s Final Inventory');
    }
    
    // Display checked items table
    function displayCheckedTable() {
        const display = document.getElementById('checked-table-display');
        display.innerHTML = generateTableHTML(checkedItemTable, 'Today\'s Counted Items');
    }
    
    // Display transaction table
    function displayTransactionTable() {
        const display = document.getElementById('transaction-table-display');
        display.innerHTML = generateTableHTML(transactionItemTable, 'Expected Based on Transactions');
    }
    
    // Generic table generator
    function generateTableHTML(tableData, title) {
        if (!tableData || Object.keys(tableData).length === 0) {
            return `<p>No data available for ${title}</p>`;
        }
        
        let html = `
            <table class="item-table">
                <thead>
                    <tr>
                        <th>SKU</th>
                        <th>Name</th>
                        <th>Logistics</th>
                        <th>Production</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
        `;
        
        Object.values(tableData).forEach(item => {
            let productionTotal = 0;
            for (let i = 1; i <= 30; i++) {
                productionTotal += item[`amount_production_zone_${i}`] || 0;
            }
            
            // Calculate correct total: Logistics + Production
            const logisticsAmount = item.amount_logistics || 0;
            const calculatedTotal = logisticsAmount + productionTotal;
            
            html += `
                <tr>
                    <td><strong>${item.sku}</strong></td>
                    <td>${item.name}</td>
                    <td>${logisticsAmount}</td>
                    <td>${productionTotal}</td>
                    <td><strong>${calculatedTotal}</strong></td>
                </tr>
            `;
        });
        
        html += '</tbody></table>';
        return html;
    }
    
    // Display transaction logs
    function displayTransactionLogs() {
        const display = document.getElementById('table-display');
        
        if (transactionLog.length === 0) {
            display.innerHTML = '<p>No transactions recorded yet.</p>';
            return;
        }
        
        let html = `
            <table class="item-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Time</th>
                        <th>SKU</th>
                        <th>Amount</th>
                        <th>From → To</th>
                        <th>Status</th>
                        <th>By</th>
                    </tr>
                </thead>
                <tbody>
        `;
        
        // Show recent transactions first
        const sortedLogs = [...transactionLog].reverse();
        
        sortedLogs.forEach(log => {
            const time = new Date(log.created_at || log.timestamp).toLocaleString();
            
            // Format status with visual indicators
            let statusDisplay = log.status || 'completed';
            if (log.status === 'auto-approved') {
                statusDisplay = '🗑️ Auto-approved';
            } else if (log.status === 'completed') {
                statusDisplay = '✅ Completed';
            } else if (log.status === 'pending') {
                statusDisplay = '⏳ Pending';
            }
            
            html += `
                <tr>
                    <td>${log.id || 'N/A'}</td>
                    <td>${time}</td>
                    <td>${log.sku}</td>
                    <td>${log.amount}</td>
                    <td>${getLocationDisplayName(log.from_location || log.location)} → ${getLocationDisplayName(log.to_location || 'N/A')}</td>
                    <td>${statusDisplay}</td>
                    <td>${log.created_by || log.counted_by}</td>
                </tr>
            `;
        });
        
        html += '</tbody></table>';
        display.innerHTML = html;
    }
    
    // Finalize day function
    function finalizeDay() {
        // Check if there are discrepancies
        const hasDiscrepancies = checkForDiscrepancies();
        
        if (hasDiscrepancies) {
            alert('Warning: There are discrepancies between Checked and Transaction tables. Please investigate before finalizing.');
            return;
        }
        
        // Set today's transaction table as tomorrow's yesterday table
        yesterdayResultTable = JSON.parse(JSON.stringify(transactionItemTable));
        
        // Reset checked table for new day
        checkedItemTable = {};
        
        // Clear completed transactions
        transactionLog = transactionLog.filter(t => {
            const today = new Date().toDateString();
            return new Date(t.created_at || t.timestamp).toDateString() === today;
        });
        
        // Save everything
        saveDataToLocalStorage();
        
        alert('Day finalized successfully! Today\'s results are now set as tomorrow\'s starting point.');
        refreshManagerDashboard();
    }
    
    // Check for discrepancies
    function checkForDiscrepancies() {
        const allSKUs = new Set([
            ...Object.keys(checkedItemTable),
            ...Object.keys(transactionItemTable)
        ]);
        
        for (let sku of allSKUs) {
            const checked = checkedItemTable[sku];
            const expected = transactionItemTable[sku];
            
            if (!checked || !expected) {
                return true; // Missing data
            }
            
            if (checked.total_amount !== expected.total_amount) {
                return true; // Mismatch
            }
        }
        
        return false;
    }
    
    // Keep old displayItemTable for compatibility
    function displayItemTable() {
        // Redirect to transaction table display
        displayTransactionTable();
        
        let tableHTML = `
            <h3 data-lang="current_inventory_status">${languageManager.getText('current_inventory_status') || 'Current Inventory Status'}</h3>
            <table class="item-table">
                <thead>
                    <tr>
                        <th data-lang="table_sku">${languageManager.getText('table_sku')}</th>
                        <th data-lang="table_name">${languageManager.getText('table_name')}</th>
                        <th data-lang="table_logistics">${languageManager.getText('table_logistics')}</th>
                        <th data-lang="table_production">${languageManager.getText('table_production')}</th>
                        <th data-lang="table_total">${languageManager.getText('table_total')}</th>
                    </tr>
                </thead>
                <tbody>
        `;
        
        Object.values(itemTable).forEach(item => {
            let productionTotal = 0;
            for (let i = 1; i <= 30; i++) {
                productionTotal += item[`amount_production_zone_${i}`] || 0;
            }
            
            tableHTML += `
                <tr>
                    <td><strong>${item.sku}</strong></td>
                    <td>${item.name}</td>
                    <td>${item.amount_logistics}</td>
                    <td>${productionTotal}</td>
                    <td><strong>${item.amount_logistics + productionTotal}</strong></td>
                </tr>
            `;
        });
        
        tableHTML += `
                </tbody>
            </table>
            <p style="margin-top: 1rem; font-size: 0.9rem; color: #666;" data-lang="last_updated">
                ${languageManager.getText('last_updated') || 'Last updated:'} ${new Date().toLocaleString()}
            </p>
        `;
        
        tableDisplay.innerHTML = tableHTML;
    }
    
    // Helper functions
    function getLocationDisplayName(location) {
        const locations = getLocations();
        return locations[location] || location;
    }
    
    // Initialize language system AFTER all elements are set up
    initializeLanguageSystem();
    
    // Initialize app
    console.log('Local app setup complete - ready for user interaction');
    
    // Start with login section
    showLoginSection();
});

// Language system initialization and menu handling
function initializeLanguageSystem() {
    // Check if languageManager is available
    if (typeof languageManager === 'undefined') {
        console.error('languageManager is not defined. Make sure languages.js is loaded first.');
        return;
    }
    
    // Create language options in the menu
    createLanguageOptions();
    
    // Set up menu event listeners
    setupMenuEventListeners();
    
    // Apply saved language or default
    languageManager.updateAllText();
}

function createLanguageOptions() {
    const languageOptionsContainer = document.getElementById('language-options');
    const languages = languageManager.getLanguagesList();
    const currentLang = languageManager.getCurrentLanguage();
    
    languageOptionsContainer.innerHTML = '';
    
    languages.forEach(lang => {
        const option = document.createElement('div');
        option.className = `language-option ${lang.code === currentLang ? 'active' : ''}`;
        option.setAttribute('data-lang-code', lang.code);
        
        option.innerHTML = `
            <span class="language-emoji">${lang.emoji}</span>
            <span class="language-name">${lang.name}</span>
        `;
        
        option.addEventListener('click', function() {
            selectLanguage(lang.code);
            closeMenu();
        });
        
        languageOptionsContainer.appendChild(option);
    });
}

function selectLanguage(langCode) {
    // Update language manager
    languageManager.setLanguage(langCode);
    
    // Update active state in menu
    document.querySelectorAll('.language-option').forEach(option => {
        option.classList.remove('active');
    });
    document.querySelector(`[data-lang-code="${langCode}"]`).classList.add('active');
    
    // Update login button text if it's in loading state
    const loginBtn = document.getElementById('google-login-btn');
    if (loginBtn.disabled) {
        loginBtn.textContent = languageManager.getText('logging_in');
    }
}

function setupMenuEventListeners() {
    const menuToggle = document.getElementById('menu-toggle');
    const menuClose = document.getElementById('menu-close');
    const menuOverlay = document.getElementById('menu-overlay');
    const sideMenu = document.getElementById('side-menu');
    
    // Check if elements exist before adding listeners
    if (!menuToggle || !menuClose || !menuOverlay || !sideMenu) {
        console.error('Menu elements not found:', {
            menuToggle: !!menuToggle,
            menuClose: !!menuClose,
            menuOverlay: !!menuOverlay,
            sideMenu: !!sideMenu
        });
        return;
    }
    
    // Open menu
    menuToggle.addEventListener('click', openMenu);
    
    // Close menu
    menuClose.addEventListener('click', closeMenu);
    menuOverlay.addEventListener('click', closeMenu);
    
    // Close menu on Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && sideMenu.classList.contains('open')) {
            closeMenu();
        }
    });
}

function openMenu() {
    const sideMenu = document.getElementById('side-menu');
    const menuOverlay = document.getElementById('menu-overlay');
    
    sideMenu.classList.add('open');
    menuOverlay.classList.add('show');
    
    // Prevent body scrolling when menu is open
    document.body.style.overflow = 'hidden';
}

function closeMenu() {
    const sideMenu = document.getElementById('side-menu');
    const menuOverlay = document.getElementById('menu-overlay');
    
    sideMenu.classList.remove('open');
    menuOverlay.classList.remove('show');
    
    // Restore body scrolling
    document.body.style.overflow = '';
}

// Version 2.0.0: Transaction form functions
function showTransactionForm(container, fromLocation) {
    // Check for pending incoming transactions first
    const pendingIncoming = getPendingTransactions(fromLocation);
    
    let html = `<h3 data-lang="transaction_title">Transaction</h3>`;
    
    // Show pending incoming transactions
    if (pendingIncoming.length > 0) {
        html += `
            <div class="pending-transactions">
                <h4>Incoming Transactions</h4>
                ${pendingIncoming.map(t => `
                    <div class="transaction-card" style="border: 2px solid #ffa500; padding: 10px; margin: 10px 0; border-radius: 5px;">
                        <p><strong>ID:</strong> ${t.id}</p>
                        <p><strong>From:</strong> ${getLocationDisplayName(t.from_location)}</p>
                        <p><strong>SKU:</strong> ${t.sku} - Amount: ${t.amount}</p>
                        <p><strong>Sender:</strong> ${t.created_by}</p>
                        <button onclick="confirmIncomingTransaction('${t.id}')" style="background-color: #4CAF50;">
                            Confirm Receipt
                        </button>
                    </div>
                `).join('')}
            </div>
            <hr>
        `;
    }
    
    // Outgoing transaction form (only for logistics)
    if (fromLocation === 'logistics') {
        const availableSKUs = getAvailableSKUs();
        const productionZones = Array.from({length: 30}, (_, i) => i + 1);
        
        html += `
            <div class="outgoing-transaction">
                <h4>Send Items</h4>
                <div class="form-group">
                    <label for="trans-sku-search">SKU:</label>
                    <div class="searchable-dropdown">
                        <input type="text" id="trans-sku-search" placeholder="Type to search SKU..." autocomplete="off" required>
                        <div id="trans-sku-dropdown" class="dropdown-list" style="display: none;">
                            <!-- SKU options will be populated here -->
                        </div>
                    </div>
                    <input type="hidden" id="trans-selected-sku" value="">
                </div>
                
                <div class="form-group">
                    <label for="trans-amount">Amount:</label>
                    <input type="number" id="trans-amount" min="1" required>
                </div>
                
                <div class="form-group">
                    <label for="trans-destination">Send to:</label>
                    <select id="trans-destination" required>
                        <option value="">Select destination...</option>
                        ${productionZones.map(zone => 
                            `<option value="production_zone_${zone}">Production Zone ${zone}</option>`
                        ).join('')}
                        <option value="waste">Waste Bin</option>
                        <option value="lost">Lost Items</option>
                    </select>
                </div>
                
                <button onclick="createOutgoingTransaction('${fromLocation}')" style="background-color: #2196F3;">
                    Create Transaction
                </button>
            </div>
        `;
    }
    
    container.innerHTML = html;
    container.style.display = 'block';
    
    // Setup searchable dropdown for transaction form if it exists
    if (document.getElementById('trans-sku-search')) {
        setupTransactionDropdown(availableSKUs);
    }
}

// Handle incoming transaction confirmation
window.confirmIncomingTransaction = async function(transactionId) {
    const transaction = pendingTransactions.find(t => t.id === transactionId);
    if (!transaction) {
        await modal.alert('Error', 'Transaction not found');
        return;
    }
    
    // Show OTP input dialog
    const otp = await modal.prompt(
        'Confirm Transaction', 
        `Enter OTP for transaction ${transactionId}:`,
        'Enter 4-digit OTP'
    );
    
    if (!otp) return;
    
    const result = confirmTransaction(transactionId, otp);
    
    if (result.success) {
        await modal.alert(
            '✅ Transaction Confirmed!',
            `SKU: ${transaction.sku}\nAmount: ${transaction.amount}\nTransaction completed successfully.`
        );
        // Refresh the form
        const currentLocation = currentRole === 'logistics' ? 'logistics' : `production_zone_${selectedZone}`;
        const container = currentRole === 'logistics' ? 
            document.getElementById('logistics-transaction-form') : 
            document.getElementById('production-transaction-form');
        showTransactionForm(container, currentLocation);
    } else {
        await modal.alert('❌ Transaction Failed', result.message);
    }
};

// Setup searchable dropdown for transaction form
function setupTransactionDropdown(availableSKUs) {
    const searchInput = document.getElementById('trans-sku-search');
    const dropdown = document.getElementById('trans-sku-dropdown');
    const hiddenInput = document.getElementById('trans-selected-sku');
    
    if (!searchInput || !dropdown || !hiddenInput) return;
    
    // Create all SKU options
    function renderDropdown(skus) {
        dropdown.innerHTML = '';
        
        if (skus.length === 0) {
            dropdown.innerHTML = '<div class="dropdown-item no-results">No SKUs found</div>';
            dropdown.style.display = 'block';
            return;
        }
        
        skus.forEach(sku => {
            const item = getItemBySKU(sku);
            const div = document.createElement('div');
            div.className = 'dropdown-item';
            div.innerHTML = `<strong>${sku}</strong> - ${item ? item.name : 'Unknown'}`;
            div.dataset.sku = sku;
            
            div.addEventListener('click', function() {
                searchInput.value = `${sku} - ${item ? item.name : 'Unknown'}`;
                hiddenInput.value = sku;
                dropdown.style.display = 'none';
            });
            
            dropdown.appendChild(div);
        });
        
        dropdown.style.display = 'block';
    }
    
    // Search functionality (same as regular dropdown)
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        if (searchTerm.length === 0) {
            dropdown.style.display = 'none';
            hiddenInput.value = '';
            return;
        }
        
        const filteredSKUs = availableSKUs.filter(sku => {
            const item = getItemBySKU(sku);
            const skuMatch = sku.toLowerCase().includes(searchTerm);
            const nameMatch = item && item.name.toLowerCase().includes(searchTerm);
            return skuMatch || nameMatch;
        });
        
        renderDropdown(filteredSKUs);
    });
    
    searchInput.addEventListener('focus', function() {
        if (this.value.length === 0) {
            renderDropdown(availableSKUs);
        }
    });
    
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.style.display = 'none';
        }
    });
}

// Create outgoing transaction
window.createOutgoingTransaction = async function(fromLocation) {
    const sku = document.getElementById('trans-selected-sku').value;
    const amount = document.getElementById('trans-amount').value;
    const destination = document.getElementById('trans-destination').value;
    
    if (!sku || !amount || !destination) {
        await modal.alert('Missing Information', 'Please fill all fields before creating transaction.');
        return;
    }
    
    const transaction = createTransaction(sku, amount, fromLocation, destination);
    
    // Show different success messages for waste/lost vs regular transactions
    if (transaction.status === 'auto-approved') {
        await modal.alert(
            '✅ Items Disposed!',
            `Transaction ID: ${transaction.id}\n\nItems sent to ${destination === 'waste' ? 'Waste Bin' : 'Lost Items'} successfully.\n\nNo confirmation needed - transaction completed automatically.`
        );
    } else {
        await modal.alert(
            '🚀 Transaction Created!',
            `Transaction ID: ${transaction.id}\nOTP: ${transaction.otp}\n\nShare this OTP with the receiver to confirm the transaction.`
        );
    }
    
    // Clear form
    document.getElementById('trans-sku-search').value = '';
    document.getElementById('trans-selected-sku').value = '';
    document.getElementById('trans-amount').value = '';
    document.getElementById('trans-destination').value = '';
};

// Helper function for location display names
function getLocationDisplayName(location) {
    const locations = getLocations();
    return locations[location] || location;
}

// Setup searchable dropdown for SKU selection
function setupSearchableDropdown(availableSKUs) {
    const searchInput = document.getElementById('sku-search');
    const dropdown = document.getElementById('sku-dropdown');
    const hiddenInput = document.getElementById('selected-sku');
    
    if (!searchInput || !dropdown || !hiddenInput) return;
    
    // Create all SKU options
    function renderDropdown(skus) {
        dropdown.innerHTML = '';
        
        if (skus.length === 0) {
            dropdown.innerHTML = '<div class="dropdown-item no-results">No SKUs found</div>';
            dropdown.style.display = 'block';
            return;
        }
        
        skus.forEach(sku => {
            const item = getItemBySKU(sku);
            const div = document.createElement('div');
            div.className = 'dropdown-item';
            div.innerHTML = `<strong>${sku}</strong> - ${item ? item.name : 'Unknown'}`;
            div.dataset.sku = sku;
            
            div.addEventListener('click', function() {
                searchInput.value = `${sku} - ${item ? item.name : 'Unknown'}`;
                hiddenInput.value = sku;
                dropdown.style.display = 'none';
            });
            
            dropdown.appendChild(div);
        });
        
        dropdown.style.display = 'block';
    }
    
    // Search functionality
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        if (searchTerm.length === 0) {
            dropdown.style.display = 'none';
            hiddenInput.value = '';
            return;
        }
        
        // Filter SKUs based on search
        const filteredSKUs = availableSKUs.filter(sku => {
            const item = getItemBySKU(sku);
            const skuMatch = sku.toLowerCase().includes(searchTerm);
            const nameMatch = item && item.name.toLowerCase().includes(searchTerm);
            return skuMatch || nameMatch;
        });
        
        renderDropdown(filteredSKUs);
    });
    
    // Show all options when focused
    searchInput.addEventListener('focus', function() {
        if (this.value.length === 0) {
            renderDropdown(availableSKUs);
        }
    });
    
    // Hide dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.style.display = 'none';
        }
    });
    
    // Handle keyboard navigation
    searchInput.addEventListener('keydown', function(e) {
        const items = dropdown.querySelectorAll('.dropdown-item:not(.no-results)');
        let currentIndex = -1;
        
        // Find currently selected item
        items.forEach((item, index) => {
            if (item.classList.contains('selected')) {
                currentIndex = index;
            }
        });
        
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            currentIndex = Math.min(currentIndex + 1, items.length - 1);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            currentIndex = Math.max(currentIndex - 1, 0);
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (currentIndex >= 0 && items[currentIndex]) {
                items[currentIndex].click();
            }
            return;
        } else if (e.key === 'Escape') {
            dropdown.style.display = 'none';
            return;
        }
        
        // Update selection
        items.forEach((item, index) => {
            if (index === currentIndex) {
                item.classList.add('selected');
            } else {
                item.classList.remove('selected');
            }
        });
    });
}

// Custom Modal System (replaces alert/prompt)
class CustomModal {
    constructor() {
        this.overlay = document.getElementById('modal-overlay');
        this.title = document.getElementById('modal-title');
        this.message = document.getElementById('modal-message');
        this.input = document.getElementById('modal-input');
        this.inputContainer = document.getElementById('modal-input-container');
        this.cancelBtn = document.getElementById('modal-cancel');
        this.confirmBtn = document.getElementById('modal-confirm');
        this.closeBtn = document.getElementById('modal-close');
        
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // Close modal events
        this.closeBtn.addEventListener('click', () => this.close());
        this.cancelBtn.addEventListener('click', () => this.close());
        
        // Close on overlay click
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) {
                this.close();
            }
        });
        
        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.overlay.style.display === 'flex') {
                this.close();
            }
        });
    }
    
    show(config) {
        return new Promise((resolve) => {
            // Set content
            this.title.textContent = config.title || 'Confirmation';
            this.message.textContent = config.message || '';
            
            // Handle input field
            if (config.showInput) {
                this.inputContainer.style.display = 'block';
                this.input.value = '';
                this.input.placeholder = config.inputPlaceholder || 'Enter here...';
                this.input.type = config.inputType || 'text';
            } else {
                this.inputContainer.style.display = 'none';
            }
            
            // Handle buttons
            this.cancelBtn.style.display = config.showCancel !== false ? 'block' : 'none';
            this.confirmBtn.textContent = config.confirmText || 'OK';
            this.cancelBtn.textContent = config.cancelText || 'Cancel';
            
            // Set up confirm handler
            const handleConfirm = () => {
                const result = config.showInput ? this.input.value : true;
                this.close();
                resolve(result);
            };
            
            const handleCancel = () => {
                this.close();
                resolve(null);
            };
            
            // Remove old listeners and add new ones
            this.confirmBtn.replaceWith(this.confirmBtn.cloneNode(true));
            this.confirmBtn = document.getElementById('modal-confirm');
            this.confirmBtn.addEventListener('click', handleConfirm);
            
            // Show modal
            this.overlay.style.display = 'flex';
            
            // Focus input if present
            if (config.showInput) {
                setTimeout(() => this.input.focus(), 100);
                
                // Allow Enter to confirm
                this.input.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        handleConfirm();
                    }
                });
            }
        });
    }
    
    close() {
        this.overlay.style.display = 'none';
    }
    
    // Convenience methods
    alert(title, message) {
        return this.show({
            title,
            message,
            showCancel: false,
            confirmText: 'OK'
        });
    }
    
    confirm(title, message) {
        return this.show({
            title,
            message,
            confirmText: 'Yes',
            cancelText: 'No'
        });
    }
    
    prompt(title, message, placeholder = '') {
        return this.show({
            title,
            message,
            showInput: true,
            inputPlaceholder: placeholder,
            confirmText: 'Submit'
        });
    }
}

// Initialize modal system
const modal = new CustomModal();