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
    
    // Get home button reference
    const homeBtn = document.getElementById('home-btn');
    
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
    
    // Home button event listener
    homeBtn.addEventListener('click', function() {
        console.log('Home button clicked');
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
        
        // Hide home button on login screen
        homeBtn.style.display = 'none';
        
        // Reset login button
        googleLoginBtn.textContent = 'Login with Google (Test Mode)';
        googleLoginBtn.disabled = false;
    }
    
    function showRoleSelection() {
        hideAllSections();
        roleSelectionSection.style.display = 'block';
        
        // Hide home button on role selection screen (users are already at home)
        homeBtn.style.display = 'none';
        
        // Display user name
        const user = getCurrentUser();
        if (user) {
            userNameSpan.textContent = user.name || user.email;
        }
    }
    
    function showLogisticsSection() {
        hideAllSections();
        logisticsSection.style.display = 'block';
        
        // Show home button when in role sections
        homeBtn.style.display = 'block';
        
        setupLogisticsWorkflow();
    }
    
    function showProductionSection() {
        hideAllSections();
        productionSection.style.display = 'block';
        
        // Show home button when in role sections
        homeBtn.style.display = 'block';
        
        setupProductionWorkflow();
    }
    
    function showManagerSection() {
        hideAllSections();
        managerSection.style.display = 'block';
        
        // Show home button when in role sections
        homeBtn.style.display = 'block';
        
        setupManagerView();
    }
    
    // Logistics workflow setup
    function setupLogisticsWorkflow() {
        const checkInventoryBtn = document.getElementById('check-inventory-logistics-btn');
        const transactionBtn = document.getElementById('transaction-logistics-btn');
        const countingForm = document.getElementById('logistics-counting-form');
        const transactionForm = document.getElementById('logistics-transaction-form');
        
        // Show transaction form by default (with BOM option)
        console.log('Setting up logistics - showing transaction form by default');
        countingForm.style.display = 'none';
        showTransactionForm(transactionForm, 'logistics');
        
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
        const zoneSelection = document.getElementById('zone-selection');
        
        // Always show zone selection and hide counting interface when entering production
        zoneSelection.style.display = 'block';
        productionCounting.style.display = 'none';
        
        // Clear previous zone selection
        selectedZone = null;
        zoneInput.value = '';
        
        selectZoneBtn.addEventListener('click', function() {
            const zoneNumber = parseInt(zoneInput.value);
            
            if (zoneNumber >= 1 && zoneNumber <= 30) {
                selectedZone = zoneNumber;
                console.log('Zone selected:', selectedZone);
                
                // Hide zone selection, show counting interface
                zoneSelection.style.display = 'none';
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
                document.getElementById('sku-search').value = '';
                document.getElementById('selected-sku').value = '';
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
        console.log('Setting up manager view...');
        setupDropdownNavigation();
        refreshManagerDashboard();
        
        const refreshBtn = document.getElementById('refresh-dashboard-btn');
        console.log('Refresh button found:', refreshBtn);
        if (refreshBtn) {
            refreshBtn.addEventListener('click', function() {
                console.log('Refresh button clicked!');
                refreshManagerDashboard();
            });
        }
        
        const resetBtn = document.getElementById('reset-data-btn');
        console.log('Reset button found:', resetBtn);
        if (resetBtn) {
            resetBtn.addEventListener('click', async function() {
                console.log('Reset button clicked!');
                const confirmed = await modal.confirm(
                    '⚠️ Reset All Data?',
                    'This will:\n• Clear all transactions\n• Reset checked items\n• Set fresh starting point\n\nThis cannot be undone!'
                );
                if (confirmed) {
                    resetAllData();
                }
            });
        }
        
        const finalizeBtn = document.getElementById('finalize-day-btn');
        console.log('Finalize button found:', finalizeBtn);
        if (finalizeBtn) {
            finalizeBtn.addEventListener('click', async function() {
                console.log('Finalize button clicked!');
                const confirmed = await modal.confirm(
                    '🎯 Finalize Day?',
                    'This will set today\'s results as tomorrow\'s starting point.\n\nAre you sure you want to finalize the day?'
                );
                if (confirmed) {
                    finalizeDay();
                }
            });
        }
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
            case 'bom':
                displayBOMManagement();
                break;
        }
    }
    
    // Refresh entire dashboard
    function refreshManagerDashboard() {
        // Load fresh data
        loadDataFromLocalStorage();
        
        // Populate test inventory if empty
        populateTestInventoryData();
        
        // Refresh current view
        const selector = document.getElementById('table-selector');
        if (selector) {
            const currentTable = selector.value;
            refreshTableDisplay(currentTable);
        }
    }
    
    // Populate test inventory data for testing
    function populateTestInventoryData() {
        console.log('Populating fresh test inventory data...');
        
        // Call the centralized function from local-data.js
        populateTestInventory();
        
        // Get the updated data from local-data.js
        const updatedInventory = getInventoryTable();
        const updatedItemTable = getItemTable();
        
        // Initialize three tables if needed
        if (Object.keys(yesterdayResultTable).length === 0) {
            yesterdayResultTable = JSON.parse(JSON.stringify(updatedItemTable));
            transactionItemTable = JSON.parse(JSON.stringify(updatedItemTable));
        }
        
        console.log('Test inventory data populated for', Object.keys(updatedInventory).length, 'items');
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
        
        // Clear all transactions and logs using local-data.js function
        clearAllTransactionData();
        
        // Save the synchronized state
        saveDataToLocalStorage();
        
        console.log('✅ Reset complete: All tables now synchronized');
        console.log('Yesterday =', Object.keys(yesterdayResultTable).length, 'items');
        console.log('Transaction =', Object.keys(transactionItemTable).length, 'items'); 
        console.log('Checked =', Object.keys(checkedItemTable).length, 'items');
        
        // Refresh the current view
        refreshManagerDashboard();
        
        // Force refresh any transaction forms that might be displayed
        const productionContent = document.getElementById('production-content');
        const logisticsContent = document.getElementById('logistics-content');
        if (productionContent && window.selectedZone) {
            showTransactionForm(productionContent, `production_zone_${window.selectedZone}`);
        }
        if (logisticsContent) {
            showTransactionForm(logisticsContent, 'logistics');
        }
        
        await modal.alert(
            '✅ Data Reset Complete!',
            '• All tables now synchronized\n• All transactions cleared\n• BOM groups cleared\n• Ready for fresh testing'
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
}); // End of DOMContentLoaded

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
    
    // Refresh dynamic content that uses languageManager.getText()
    refreshDynamicContent();
}

function refreshDynamicContent() {
    // Refresh transaction forms if they're visible
    const logisticsTransactionForm = document.getElementById('logistics-transaction-form');
    const productionTransactionForm = document.getElementById('production-transaction-form');
    
    if (logisticsTransactionForm && logisticsTransactionForm.style.display !== 'none') {
        console.log('Refreshing logistics transaction form for language change');
        showTransactionForm(logisticsTransactionForm, 'logistics');
    }
    
    if (productionTransactionForm && productionTransactionForm.style.display !== 'none' && window.selectedZone) {
        console.log('Refreshing production transaction form for language change');
        showTransactionForm(productionTransactionForm, `production_zone_${window.selectedZone}`);
    }
    
    // Refresh manager dashboard if visible
    const managerSection = document.getElementById('manager-section');
    if (managerSection && managerSection.style.display !== 'none') {
        console.log('Refreshing manager dashboard for language change');
        refreshManagerDashboard();
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
    console.log('showTransactionForm called for location:', fromLocation);
    
    // Check for pending incoming transactions first
    const pendingIncoming = getPendingTransactions(fromLocation);
    console.log('Pending incoming transactions:', pendingIncoming);
    console.log('All pending transactions:', getPendingTransactions()); // Show all to debug
    
    let html = `<h3 data-lang="transaction_title">${languageManager.getText('transaction_title')}</h3>`;
    
    // Add auto-refresh button only for production (not logistics)
    if (fromLocation.startsWith('production_zone_')) {
        html += `
            <div style="margin: 10px 0;">
                <button id="refresh-transactions-btn" style="background-color: #4CAF50; color: white; padding: 8px 16px; border: none; border-radius: 4px; cursor: pointer;">
                    🔄 ${languageManager.getText('refresh_transactions')}
                </button>
                <span id="auto-refresh-status" style="margin-left: 10px; font-size: 12px; color: #666;">
                    ${languageManager.getText('auto_refresh_status')}
                </span>
            </div>
        `;
    }
    
    // Show pending incoming transactions
    if (pendingIncoming.length > 0) {
        html += `<div class="pending-transactions"><h4>${languageManager.getText('incoming_transactions')}</h4>`;
        
        // Group transactions by BOM group
        const bomGroups = {};
        const individualTransactions = [];
        
        pendingIncoming.forEach(t => {
            if (t.bom_group_id) {
                if (!bomGroups[t.bom_group_id]) {
                    bomGroups[t.bom_group_id] = [];
                }
                bomGroups[t.bom_group_id].push(t);
            } else {
                individualTransactions.push(t);
            }
        });
        
        // Show BOM groups first
        Object.keys(bomGroups).forEach(bomGroupId => {
            const transactions = bomGroups[bomGroupId];
            const firstTransaction = transactions[0];
            const bomGroup = getBOMTransactionGroupById(bomGroupId);
            
            // Skip if BOM group was deleted (e.g., after reset)
            if (!bomGroup) {
                console.warn('BOM group', bomGroupId, 'not found - skipping display');
                return;
            }
            
            html += `
                <div class="transaction-card" style="border: 3px solid #4169E1; padding: 15px; margin: 15px 0; border-radius: 8px; background-color: #f0f8ff;">
                    <div style="font-weight: bold; font-size: 18px; color: #4169E1; margin-bottom: 10px;">
                        🎁 ${languageManager.getText('bom_assembly')} ${bomGroup ? bomGroup.bom_name : 'Unknown BOM'}
                    </div>
                    <p><strong>BOM Code:</strong> ${bomGroup ? bomGroup.bom_code : 'Unknown'}</p>
                    <p><strong>${languageManager.getText('from_location')}</strong> ${getLocationDisplayName(firstTransaction.from_location)}</p>
                    <p><strong>${languageManager.getText('sender')}</strong> ${firstTransaction.created_by}</p>
                    <p><strong>${languageManager.getText('quantity')}</strong> ${bomGroup ? bomGroup.quantity : '1'} ${languageManager.getText('assemblies')}</p>
                    
                    <div style="margin: 10px 0; padding: 10px; background-color: white; border-radius: 5px;">
                        <strong>${languageManager.getText('components_included')}</strong>
                        ${transactions.map(t => {
                            const item = getItemBySKU(t.sku);
                            const itemName = item ? item.name : 'Unknown';
                            return `<div style="margin: 3px 0;">• ${t.amount}x ${t.sku} - ${itemName}</div>`;
                        }).join('')}
                    </div>
                    
                    <button onclick="confirmBOMGroup('${bomGroupId}')" style="background-color: #4169E1; color: white; padding: 12px 20px; border: none; border-radius: 5px; font-weight: bold;">
                        ${languageManager.getText('confirm_bom_receipt')}
                    </button>
                </div>
            `;
        });
        
        // Show individual transactions
        individualTransactions.forEach(t => {
            html += `
                <div class="transaction-card" style="border: 2px solid #ffa500; padding: 10px; margin: 10px 0; border-radius: 5px;">
                    <p><strong>ID:</strong> ${t.id}</p>
                    <p><strong>${languageManager.getText('from_location')}</strong> ${getLocationDisplayName(t.from_location)}</p>
                    <p><strong>SKU:</strong> ${t.sku} - Amount: ${t.amount}</p>
                    <p><strong>${languageManager.getText('sender')}</strong> ${t.created_by}</p>
                    <button onclick="confirmIncomingTransaction('${t.id}')" style="background-color: #4CAF50;">
                        ${languageManager.getText('confirm_receipt')}
                    </button>
                </div>
            `;
        });
        
        html += `</div><hr>`;
    }
    
    // Outgoing transaction form (only for logistics)
    if (fromLocation === 'logistics') {
        const availableSKUs = getAvailableSKUs();
        const availableBOMs = getBOMDefinitions();
        const productionZones = Array.from({length: 30}, (_, i) => i + 1);
        
        html += `
            <div class="outgoing-transaction">
                <h4>${languageManager.getText('send_items')}</h4>
                
                <!-- Transaction Type Selection -->
                <div class="form-group">
                    <label>${languageManager.getText('transfer_type')}</label>
                    <div style="display: flex; gap: 10px; margin: 10px 0;">
                        <label style="display: flex; align-items: center; cursor: pointer;">
                            <input type="radio" name="trans-type" value="individual" checked style="margin-right: 5px;">
                            ${languageManager.getText('individual_components')}
                        </label>
                        <label style="display: flex; align-items: center; cursor: pointer;">
                            <input type="radio" name="trans-type" value="bom" style="margin-right: 5px;">
                            ${languageManager.getText('bom_assembly_option')}
                        </label>
                    </div>
                </div>
                
                <!-- Individual Component Form -->
                <div id="individual-form" class="trans-form-section">
                    <div class="form-group">
                        <label for="trans-sku-search">${languageManager.getText('component_sku')}</label>
                        <div class="searchable-dropdown">
                            <input type="text" id="trans-sku-search" placeholder="${languageManager.getText('type_to_search_sku')}" autocomplete="off">
                            <div id="trans-sku-dropdown" class="dropdown-list" style="display: none;">
                                <!-- SKU options will be populated here -->
                            </div>
                        </div>
                        <input type="hidden" id="trans-selected-sku" value="">
                    </div>
                    
                    <div class="form-group">
                        <label for="trans-amount">${languageManager.getText('amount')}</label>
                        <input type="number" id="trans-amount" min="1">
                    </div>
                </div>
                
                <!-- BOM Assembly Form -->
                <div id="bom-form" class="trans-form-section" style="display: none;">
                    <div class="form-group">
                        <label for="trans-bom-search">BOM Assembly:</label>
                        <div class="searchable-dropdown">
                            <input type="text" id="trans-bom-search" placeholder="${languageManager.getText('type_to_search_bom')}" autocomplete="off">
                            <div id="trans-bom-dropdown" class="dropdown-list" style="display: none;">
                                <!-- BOM options will be populated here -->
                            </div>
                        </div>
                        <input type="hidden" id="trans-selected-bom" value="">
                    </div>
                    
                    <div class="form-group">
                        <label for="trans-bom-quantity">Quantity (sets):</label>
                        <input type="number" id="trans-bom-quantity" min="1" placeholder="How many complete sets?">
                    </div>
                    
                    <div id="bom-expansion-preview" style="background: #f8f9fa; padding: 10px; border-radius: 5px; margin: 10px 0; display: none;">
                        <h5>Components Required:</h5>
                        <div id="bom-expansion-list"></div>
                    </div>
                </div>
                
                <!-- Common destination -->
                <div class="form-group">
                    <label for="trans-destination">${languageManager.getText('send_to')}</label>
                    <select id="trans-destination" required>
                        <option value="">${languageManager.getText('select_destination')}</option>
                        ${productionZones.map(zone => 
                            `<option value="production_zone_${zone}">Production Zone ${zone}</option>`
                        ).join('')}
                        <option value="waste">Waste Bin</option>
                        <option value="lost">Lost Items</option>
                    </select>
                </div>
                
                <button onclick="createOutgoingTransaction('${fromLocation}')" style="background-color: #2196F3;">
                    ${languageManager.getText('create_transaction')}
                </button>
            </div>
        `;
    }
    
    container.innerHTML = html;
    container.style.display = 'block';
    
    // Setup transaction form interactions
    setupTransactionFormInteractions();
    
    // Setup searchable dropdown for transaction form if it exists
    if (document.getElementById('trans-sku-search')) {
        const availableSKUs = getAvailableSKUs();
        setupTransactionDropdown(availableSKUs);
    }
    
    // Setup searchable dropdown for BOM selection if it exists
    if (document.getElementById('trans-bom-search')) {
        console.log('Setting up BOM autocomplete');
        const availableBOMs = getBOMDefinitions();
        setupBOMDropdown(availableBOMs);
    }
    
    // Setup auto-refresh functionality
    setupTransactionAutoRefresh(container, fromLocation);
}

// Auto-refresh functionality for transactions
let transactionRefreshInterval = null;

function setupTransactionAutoRefresh(container, fromLocation) {
    // Clear any existing interval
    if (transactionRefreshInterval) {
        clearInterval(transactionRefreshInterval);
    }
    
    // Only setup refresh for production zones, not logistics
    if (!fromLocation.startsWith('production_zone_')) {
        return;
    }
    
    // Manual refresh button
    const refreshBtn = document.getElementById('refresh-transactions-btn');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', function() {
            console.log('Manual refresh triggered');
            loadDataFromLocalStorage(); // Reload from storage
            showTransactionForm(container, fromLocation);
        });
    }
    
    // Auto-refresh every 10 seconds (only for production)
    transactionRefreshInterval = setInterval(() => {
        console.log('Auto-refreshing transactions for', fromLocation);
        loadDataFromLocalStorage(); // Reload from storage
        const newPendingCount = getPendingTransactions(fromLocation).length;
        
        // Only refresh the display if there are changes
        const currentPendingElements = container.querySelectorAll('.transaction-card').length;
        if (newPendingCount !== currentPendingElements) {
            showTransactionForm(container, fromLocation);
            console.log('Transaction display updated - found', newPendingCount, 'pending transactions');
        }
    }, 10000); // 10 seconds
    
    // Clean up interval when leaving the page/section
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList' && 
                !document.body.contains(container)) {
                clearInterval(transactionRefreshInterval);
                observer.disconnect();
                console.log('Auto-refresh stopped - container removed');
            }
        });
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

// Setup searchable dropdown for BOM selection
function setupBOMDropdown(availableBOMs) {
    const searchInput = document.getElementById('trans-bom-search');
    const dropdown = document.getElementById('trans-bom-dropdown');
    const hiddenInput = document.getElementById('trans-selected-bom');
    
    if (!searchInput || !dropdown || !hiddenInput) {
        console.warn('BOM dropdown elements not found');
        return;
    }
    
    if (!availableBOMs || Object.keys(availableBOMs).length === 0) {
        console.warn('No BOM definitions available');
        return;
    }
    
    // Convert BOM object to array
    const bomArray = Object.values(availableBOMs);
    
    // Create all BOM options
    function renderDropdown(boms) {
        dropdown.innerHTML = '';
        
        if (boms.length === 0) {
            dropdown.innerHTML = '<div class="dropdown-item" style="color: #999;">No BOMs found</div>';
            return;
        }
        
        boms.forEach(bom => {
            const item = getItemBySKU(Object.keys(bom.components)[0]); // Get first component for preview
            const componentCount = Object.keys(bom.components).length;
            
            const option = document.createElement('div');
            option.className = 'dropdown-item';
            option.style.cursor = 'pointer';
            option.innerHTML = `
                <div style="font-weight: bold;">${bom.bom_code} - ${bom.name}</div>
                <div style="font-size: 12px; color: #666;">${componentCount} components</div>
            `;
            
            option.addEventListener('click', function() {
                searchInput.value = `${bom.bom_code} - ${bom.name}`;
                hiddenInput.value = bom.bom_code;
                dropdown.style.display = 'none';
                
                // Trigger BOM preview update
                updateBOMPreview();
            });
            
            dropdown.appendChild(option);
        });
    }
    
    // Filter BOMs based on search
    function filterBOMs(searchTerm) {
        return bomArray.filter(bom => 
            bom.bom_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
            bom.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
    
    // Search input event listeners
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value;
        
        if (searchTerm.length === 0) {
            renderDropdown(bomArray);
            dropdown.style.display = 'block';
        } else {
            const filtered = filterBOMs(searchTerm);
            renderDropdown(filtered);
            dropdown.style.display = 'block';
        }
    });
    
    searchInput.addEventListener('focus', function() {
        renderDropdown(bomArray);
        dropdown.style.display = 'block';
    });
    
    // Hide dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.style.display = 'none';
        }
    });
    
    // Clear selection when input is manually cleared
    searchInput.addEventListener('input', function() {
        if (this.value === '') {
            hiddenInput.value = '';
            // Hide BOM preview
            const bomPreview = document.getElementById('bom-expansion-preview');
            if (bomPreview) {
                bomPreview.style.display = 'none';
            }
        }
    });
}

// Setup transaction form interactions
function setupTransactionFormInteractions() {
    const transTypeRadios = document.querySelectorAll('input[name="trans-type"]');
    const individualForm = document.getElementById('individual-form');
    const bomForm = document.getElementById('bom-form');
    const bomSelect = document.getElementById('trans-selected-bom'); // Hidden input with selected BOM code
    const bomQuantity = document.getElementById('trans-bom-quantity');
    const bomPreview = document.getElementById('bom-expansion-preview');
    const bomExpansionList = document.getElementById('bom-expansion-list');
    
    if (!transTypeRadios.length) return; // Not a transaction form
    
    // Handle radio button changes
    transTypeRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'individual') {
                individualForm.style.display = 'block';
                bomForm.style.display = 'none';
                bomPreview.style.display = 'none';
            } else {
                individualForm.style.display = 'none';
                bomForm.style.display = 'block';
                updateBOMPreview();
            }
        });
    });
    
    // Handle BOM selection changes and quantity updates
    // The BOM preview will be updated when user selects from dropdown or changes quantity
    if (bomQuantity) {
        bomQuantity.addEventListener('input', window.updateBOMPreview);
    }
    
    window.updateBOMPreview = function() {
        const hiddenBomInput = document.getElementById('trans-selected-bom');
        const bomQuantityInput = document.getElementById('trans-bom-quantity');
        const bomPreview = document.getElementById('bom-expansion-preview');
        const bomExpansionList = document.getElementById('bom-expansion-list');
        
        const bomCode = hiddenBomInput?.value;
        const quantity = parseInt(bomQuantityInput?.value) || 0;
        
        if (!bomPreview || !bomExpansionList) return;
        
        if (!bomCode || !quantity) {
            bomPreview.style.display = 'none';
            return;
        }
        
        const bom = getBOMBySKU(bomCode);
        if (!bom) {
            bomPreview.style.display = 'none';
            return;
        }
        
        // Calculate expansion
        let expansionHTML = '<ul>';
        Object.entries(bom.components).forEach(([sku, componentQty]) => {
            const totalQty = componentQty * quantity;
            const item = getItemBySKU(sku);
            const itemName = item ? item.name : 'Unknown Component';
            expansionHTML += `<li><strong>${totalQty}x ${sku}</strong> - ${itemName}</li>`;
        });
        expansionHTML += '</ul>';
        
        bomExpansionList.innerHTML = expansionHTML;
        bomPreview.style.display = 'block';
    }
}

// Handle BOM group confirmation with single OTP
window.confirmBOMGroup = async function(bomGroupId) {
    console.log('Confirming BOM group:', bomGroupId);
    const bomGroup = getBOMTransactionGroupById(bomGroupId);
    if (!bomGroup) {
        await modal.alert('Error', 'BOM group not found');
        return;
    }
    
    console.log('BOM Group found:', bomGroup);
    console.log('Component transactions:', bomGroup.component_transactions);
    
    // Show OTP input dialog with BOM details
    const otp = await modal.prompt(
        'Confirm BOM Receipt', 
        `Enter single OTP for entire BOM:\n\n${bomGroup.bom_name} (${bomGroup.bom_code})\nQuantity: ${bomGroup.quantity} assembly(s)\n\nThis will confirm all ${bomGroup.component_transactions.length} components.`,
        'Enter 4-digit OTP'
    );
    
    if (!otp) return;
    
    console.log('Entered OTP:', otp, 'Expected OTP:', bomGroup.otp);
    
    // Confirm all component transactions with the single OTP
    let successCount = 0;
    let failedTransactions = [];
    let totalComponents = bomGroup.component_transactions.length;
    
    for (const transactionId of bomGroup.component_transactions) {
        console.log('Confirming transaction:', transactionId);
        const result = confirmTransaction(transactionId, otp);
        console.log('Result for', transactionId, ':', result);
        if (result.success) {
            successCount++;
        } else {
            failedTransactions.push({ id: transactionId, reason: result.message });
        }
    }
    
    console.log('Success count:', successCount, 'Total:', totalComponents);
    console.log('Failed transactions:', failedTransactions);
    
    // Update BOM group status
    if (successCount === totalComponents) {
        updateBOMTransactionGroupStatus(bomGroupId, 'completed');
        await modal.alert('✅ BOM Received!', 
            `Successfully received:\n${bomGroup.bom_name} (${bomGroup.bom_code})\n\nAll ${totalComponents} components confirmed.`);
    } else {
        await modal.alert('⚠️ Partial Success', 
            `Confirmed ${successCount} of ${totalComponents} components.\n\nSome components may have expired or invalid OTP.`);
    }
    
    // Refresh the current view
    const currentLocation = window.selectedZone ? `production_zone_${window.selectedZone}` : 'logistics';
    const currentContainer = document.getElementById('production-transaction-form') || document.getElementById('logistics-transaction-form');
    if (currentContainer) {
        showTransactionForm(currentContainer, currentLocation);
    }
};

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
    const destination = document.getElementById('trans-destination').value;
    
    if (!destination) {
        await modal.alert('Missing Information', 'Please select a destination.');
        return;
    }
    
    // Check transaction type
    const transType = document.querySelector('input[name="trans-type"]:checked')?.value;
    
    if (transType === 'bom') {
        // BOM Transaction  
        const bomCode = document.getElementById('trans-selected-bom').value;
        const quantity = document.getElementById('trans-bom-quantity').value;
        
        if (!bomCode || !quantity) {
            await modal.alert('Missing Information', 'Please select BOM assembly and quantity.');
            return;
        }
        
        try {
            const bomGroup = createBOMTransactionGroup(bomCode, quantity, fromLocation, destination);
            
            // Show BOM transaction success
            await modal.show({
                title: '🛠️ BOM Transaction Created!',
                message: `BOM Group: ${bomGroup.group_id}\nAssembly: ${quantity}x ${bomCode}\n\nExpanded to ${bomGroup.component_transactions.length} component transactions.\n\nShare these OTPs with receivers:`,
                showCancel: false,
                confirmText: 'OK',
                customContent: generateBOMOTPsDisplay(bomGroup)
            });
            
        } catch (error) {
            await modal.alert('Error', 'Failed to create BOM transaction: ' + error.message);
            return;
        }
        
        // Clear BOM form
        const bomSearchInput = document.getElementById('trans-bom-search');
        const bomHiddenInput = document.getElementById('trans-selected-bom');
        if (bomSearchInput) bomSearchInput.value = '';
        if (bomHiddenInput) bomHiddenInput.value = '';
        document.getElementById('trans-bom-quantity').value = '';
        document.getElementById('bom-expansion-preview').style.display = 'none';
        
    } else {
        // Individual Component Transaction (existing logic)
        const sku = document.getElementById('trans-selected-sku').value;
        const amount = document.getElementById('trans-amount').value;
        
        if (!sku || !amount) {
            await modal.alert('Missing Information', 'Please select component and amount.');
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
            // Create a custom modal for OTP display with big font
            await modal.show({
                title: '🚀 Transaction Created!',
                message: `Transaction ID: ${transaction.id}\n\nShare this OTP with the receiver:`,
                showCancel: false,
                confirmText: 'OK',
                customContent: `<div style="text-align: center; margin: 20px 0;">
                    <div style="font-size: 36px; font-weight: bold; color: #4169E1; letter-spacing: 4px; 
                               padding: 15px; background: #f0f8ff; border-radius: 8px; border: 2px dashed #4169E1;">
                        ${transaction.otp}
                    </div>
                    <p style="margin-top: 10px; color: #666;">Receiver needs to enter this code</p>
                </div>`
            });
        }
        
        // Clear individual form
        document.getElementById('trans-sku-search').value = '';
        document.getElementById('trans-selected-sku').value = '';
        document.getElementById('trans-amount').value = '';
    }
    
    // Clear destination
    document.getElementById('trans-destination').value = '';
};

// Generate OTP display for BOM transactions
function generateBOMOTPsDisplay(bomGroup) {
    let otpsHTML = '<div style="margin: 20px 0;">';
    
    // Show single OTP for entire BOM group at the top
    otpsHTML += `
        <div style="margin: 15px 0; padding: 15px; border: 3px solid #4169E1; border-radius: 8px; background-color: #f0f8ff; text-align: center;">
            <div style="font-size: 18px; font-weight: bold; color: #333; margin-bottom: 10px;">
                Single OTP for entire BOM:
            </div>
            <div style="font-size: 32px; font-weight: bold; color: #4169E1; letter-spacing: 3px;">
                ${bomGroup.otp}
            </div>
        </div>
    `;
    
    // Show all components in the BOM
    otpsHTML += `<div style="margin: 15px 0;"><strong>${languageManager.getText('components_included')}</strong></div>`;
    
    bomGroup.component_transactions.forEach(transId => {
        const transaction = pendingTransactions.find(t => t.id === transId);
        if (transaction) {
            const item = getItemBySKU(transaction.sku);
            const itemName = item ? item.name : 'Unknown';
            
            otpsHTML += `
                <div style="margin: 5px 0; padding: 8px; border: 1px solid #ddd; border-radius: 4px; background-color: #f9f9f9;">
                    <div style="font-weight: bold;">${transaction.amount}x ${transaction.sku} - ${itemName}</div>
                    <div style="font-size: 12px; color: #666;">Transaction ID: ${transaction.id}</div>
                </div>
            `;
        }
    });
    
    otpsHTML += '</div>';
    return otpsHTML;
}

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
            
            // Handle custom content (like big OTP display)
            if (config.customContent) {
                this.message.innerHTML = (config.message || '') + config.customContent;
            }
            
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

// BOM Management System
function displayBOMManagement() {
    const display = document.getElementById('table-display');
    
    // Get current BOM status
    const bomStatus = getBOMStatus();
    
    display.innerHTML = `
        <div class="bom-management">
            <h3>📁 Item & BOM Management</h3>
            
            <!-- Item Catalog Section -->
            <div class="item-catalog-section" style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <h4>📋 Item Catalog Management</h4>
                <p style="color: #666; margin-bottom: 15px;">Upload master list of components (SKU, Name only)</p>
                <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
                    <input type="file" id="catalog-file-input" accept=".csv" style="display: none;">
                    <button id="catalog-upload-btn" style="background-color: #28a745; color: white; padding: 10px 20px;">
                        📁 Upload Item Catalog CSV
                    </button>
                    <button id="catalog-export-btn" style="background-color: #17a2b8; color: white; padding: 10px 20px;">
                        📤 Export Item Catalog
                    </button>
                    <span id="catalog-file-name" style="color: #666; font-style: italic;">No file selected</span>
                </div>
                <button id="catalog-process-btn" style="background-color: #007bff; color: white; padding: 10px 20px; margin-top: 10px; display: none;">
                    🔄 Process & Import Catalog
                </button>
            </div>

            <!-- BOM Definitions Section -->
            <div class="bom-definitions-section" style="background: #fff3cd; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <h4>🛠️ BOM Definitions Management</h4>
                <p style="color: #666; margin-bottom: 15px;">Upload assembly recipes (BOM_Code, Component_SKU, Quantity)</p>
                <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
                    <input type="file" id="bom-file-input" accept=".csv" style="display: none;">
                    <button id="bom-upload-btn" style="background-color: #fd7e14; color: white; padding: 10px 20px;">
                        📁 Upload BOM Recipes CSV
                    </button>
                    <button id="bom-export-btn" style="background-color: #6f42c1; color: white; padding: 10px 20px;">
                        📤 Export BOM Recipes
                    </button>
                    <span id="bom-file-name" style="color: #666; font-style: italic;">No file selected</span>
                </div>
                <button id="bom-process-btn" style="background-color: #007bff; color: white; padding: 10px 20px; margin-top: 10px; display: none;">
                    🔄 Process & Import BOMs
                </button>
            </div>
            
            <!-- Current Status -->
            <div class="bom-status" style="background: #e9ecef; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                <h4>📊 Current System Status</h4>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <div>
                        <p><strong>Item Catalog:</strong> ${Object.keys(getItemCatalog()).length} components</p>
                        <p><strong>BOM Definitions:</strong> ${Object.keys(getBOMDefinitions()).length} assemblies</p>
                        <p><strong>Inventory Items:</strong> ${Object.keys(getInventoryTable()).length} tracked</p>
                    </div>
                    <div>
                        <p><strong>Transaction Groups:</strong> ${getBOMTransactionGroups().length} BOM transfers</p>
                        <p><strong>Data Source:</strong> ${bomStatus.source}</p>
                        <p><strong>Last Updated:</strong> ${bomStatus.lastUpdated}</p>
                    </div>
                </div>
            </div>
            
            <!-- Preview/Current Data -->
            <div id="bom-preview" style="margin-top: 20px;">
                ${generateCurrentBOMTable()}
            </div>
        </div>
    `;
    
    // Set up event listeners
    setupBOMEventListeners();
}

function getBOMStatus() {
    const itemTableKeys = Object.keys(getItemTable());
    const bomData = localStorage.getItem('berjaya_bom_metadata');
    
    if (bomData) {
        const metadata = JSON.parse(bomData);
        return {
            totalSKUs: itemTableKeys.length,
            source: metadata.filename || 'CSV Import',
            lastUpdated: metadata.uploadedAt ? new Date(metadata.uploadedAt).toLocaleString() : 'Unknown'
        };
    } else {
        return {
            totalSKUs: itemTableKeys.length,
            source: 'Hardcoded (Development)',
            lastUpdated: 'Never (Using default data)'
        };
    }
}

function generateCurrentBOMTable() {
    const itemTable = getItemTable();
    const items = Object.values(itemTable).slice(0, 10); // Show first 10 items
    
    if (items.length === 0) {
        return '<p>No BOM data available</p>';
    }
    
    let html = `
        <h4>Current Items Preview (First 10)</h4>
        <table class="item-table">
            <thead>
                <tr>
                    <th>SKU</th>
                    <th>Name</th>
                    <th>Logistics</th>
                    <th>Production Total</th>
                    <th>Total Amount</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    items.forEach(item => {
        let productionTotal = 0;
        for (let i = 1; i <= 30; i++) {
            productionTotal += item[`amount_production_zone_${i}`] || 0;
        }
        
        html += `
            <tr>
                <td><strong>${item.sku}</strong></td>
                <td>${item.name}</td>
                <td>${item.amount_logistics || 0}</td>
                <td>${productionTotal}</td>
                <td><strong>${(item.amount_logistics || 0) + productionTotal}</strong></td>
            </tr>
        `;
    });
    
    html += '</tbody></table>';
    
    if (Object.keys(itemTable).length > 10) {
        html += `<p style="margin-top: 10px; color: #666; font-style: italic;">
            Showing 10 of ${Object.keys(itemTable).length} total items
        </p>`;
    }
    
    return html;
}

function setupBOMEventListeners() {
    // Item Catalog handlers
    setupCatalogEventListeners();
    
    // BOM Definitions handlers
    setupBOMDefinitionsEventListeners();
}

function setupCatalogEventListeners() {
    const catalogFileInput = document.getElementById('catalog-file-input');
    const catalogUploadBtn = document.getElementById('catalog-upload-btn');
    const catalogExportBtn = document.getElementById('catalog-export-btn');
    const catalogProcessBtn = document.getElementById('catalog-process-btn');
    const catalogFileName = document.getElementById('catalog-file-name');
    
    let selectedCatalogFile = null;
    
    // File selection
    catalogUploadBtn.addEventListener('click', () => {
        catalogFileInput.click();
    });
    
    catalogFileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file && file.type === 'text/csv') {
            selectedCatalogFile = file;
            catalogFileName.textContent = file.name;
            catalogProcessBtn.style.display = 'block';
        } else {
            selectedCatalogFile = null;
            catalogFileName.textContent = 'Please select a valid CSV file';
            catalogProcessBtn.style.display = 'none';
        }
    });
    
    // Process catalog CSV
    catalogProcessBtn.addEventListener('click', async () => {
        if (!selectedCatalogFile) return;
        
        try {
            await processCatalogCSVFile(selectedCatalogFile);
        } catch (error) {
            console.error('Error processing catalog CSV:', error);
            await modal.alert('Error', 'Failed to process catalog CSV: ' + error.message);
        }
    });
    
    // Export catalog
    catalogExportBtn.addEventListener('click', async () => {
        try {
            await exportItemCatalog();
        } catch (error) {
            console.error('Error exporting catalog:', error);
            await modal.alert('Error', 'Failed to export catalog: ' + error.message);
        }
    });
}

function setupBOMDefinitionsEventListeners() {
    const bomFileInput = document.getElementById('bom-file-input');
    const bomUploadBtn = document.getElementById('bom-upload-btn');
    const bomExportBtn = document.getElementById('bom-export-btn');
    const bomProcessBtn = document.getElementById('bom-process-btn');
    const bomFileName = document.getElementById('bom-file-name');
    
    let selectedBOMFile = null;
    
    // File selection
    bomUploadBtn.addEventListener('click', () => {
        bomFileInput.click();
    });
    
    bomFileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file && file.type === 'text/csv') {
            selectedBOMFile = file;
            bomFileName.textContent = file.name;
            bomProcessBtn.style.display = 'block';
        } else {
            selectedBOMFile = null;
            bomFileName.textContent = 'Please select a valid CSV file';
            bomProcessBtn.style.display = 'none';
        }
    });
    
    // Process BOM CSV
    bomProcessBtn.addEventListener('click', async () => {
        if (!selectedBOMFile) return;
        
        try {
            await processBOMDefinitionsCSVFile(selectedBOMFile);
        } catch (error) {
            console.error('Error processing BOM definitions CSV:', error);
            await modal.alert('Error', 'Failed to process BOM definitions CSV: ' + error.message);
        }
    });
    
    // Export BOM definitions
    bomExportBtn.addEventListener('click', async () => {
        try {
            await exportBOMDefinitions();
        } catch (error) {
            console.error('Error exporting BOM definitions:', error);
            await modal.alert('Error', 'Failed to export BOM definitions: ' + error.message);
        }
    });
}

// Process Item Catalog CSV (SKU, Name only)
async function processCatalogCSVFile(file) {
    return new Promise((resolve, reject) => {
        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: async function(results) {
                try {
                    // Validate and convert catalog CSV data
                    const catalogData = await validateAndConvertCatalogCSV(results.data);
                    
                    // Show preview and confirm
                    const confirmed = await showCatalogPreview(catalogData, file.name);
                    
                    if (confirmed) {
                        // Save catalog data
                        await saveCatalogData(catalogData, file.name);
                        
                        await modal.alert(
                            '✅ Catalog Import Success!', 
                            `Successfully imported ${Object.keys(catalogData).length} items from ${file.name}`
                        );
                        
                        // Refresh the BOM display
                        displayBOMManagement();
                    }
                    
                    resolve(catalogData);
                } catch (error) {
                    reject(error);
                }
            },
            error: function(error) {
                reject(new Error('CSV parsing failed: ' + error.message));
            }
        });
    });
}

// Process BOM Definitions CSV (BOM_Code, Component_SKU, Quantity)
async function processBOMDefinitionsCSVFile(file) {
    return new Promise((resolve, reject) => {
        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: async function(results) {
                try {
                    // Validate and convert BOM definitions CSV data
                    const bomDefsData = await validateAndConvertBOMDefinitionsCSV(results.data);
                    
                    // Show preview and confirm
                    const confirmed = await showBOMDefinitionsPreview(bomDefsData, file.name);
                    
                    if (confirmed) {
                        // Save BOM definitions data
                        await saveBOMDefinitionsData(bomDefsData, file.name);
                        
                        await modal.alert(
                            '✅ BOM Definitions Import Success!', 
                            `Successfully imported ${Object.keys(bomDefsData).length} BOMs from ${file.name}`
                        );
                        
                        // Refresh the BOM display
                        displayBOMManagement();
                    }
                    
                    resolve(bomDefsData);
                } catch (error) {
                    reject(error);
                }
            },
            error: function(error) {
                reject(new Error('CSV parsing failed: ' + error.message));
            }
        });
    });
}

// Validate Item Catalog CSV
async function validateAndConvertCatalogCSV(csvData) {
    if (!csvData || csvData.length === 0) {
        throw new Error('CSV file is empty');
    }
    
    const firstRow = csvData[0];
    const requiredColumns = ['SKU', 'Name'];
    const missingColumns = requiredColumns.filter(col => !(col in firstRow));
    
    if (missingColumns.length > 0) {
        throw new Error(`Missing required columns: ${missingColumns.join(', ')}`);
    }
    
    const catalogData = {};
    
    csvData.forEach((row, index) => {
        const sku = row.SKU?.trim();
        const name = row.Name?.trim();
        
        if (!sku || !name) {
            console.warn(`Skipping row ${index + 1}: missing SKU or Name`);
            return;
        }
        
        catalogData[sku] = {
            sku: sku,
            name: name
        };
    });
    
    if (Object.keys(catalogData).length === 0) {
        throw new Error('No valid items found in CSV');
    }
    
    return catalogData;
}

// Validate BOM Definitions CSV  
async function validateAndConvertBOMDefinitionsCSV(csvData) {
    if (!csvData || csvData.length === 0) {
        throw new Error('CSV file is empty');
    }
    
    const firstRow = csvData[0];
    const requiredColumns = ['BOM_Code', 'Component_SKU', 'Quantity'];
    const missingColumns = requiredColumns.filter(col => !(col in firstRow));
    
    if (missingColumns.length > 0) {
        throw new Error(`Missing required columns: ${missingColumns.join(', ')}`);
    }
    
    const bomData = {};
    
    csvData.forEach((row, index) => {
        const bomCode = row.BOM_Code?.trim();
        const componentSku = row.Component_SKU?.trim();
        const quantity = parseInt(row.Quantity);
        const bomName = row.BOM_Name?.trim() || bomCode;
        
        if (!bomCode || !componentSku || !quantity) {
            console.warn(`Skipping row ${index + 1}: missing required data`);
            return;
        }
        
        // Initialize BOM if doesn't exist
        if (!bomData[bomCode]) {
            bomData[bomCode] = {
                bom_code: bomCode,
                name: bomName,
                components: {}
            };
        }
        
        // Add component to BOM
        bomData[bomCode].components[componentSku] = quantity;
    });
    
    if (Object.keys(bomData).length === 0) {
        throw new Error('No valid BOM definitions found in CSV');
    }
    
    return bomData;
}

// Show preview functions
async function showCatalogPreview(catalogData, filename) {
    const itemCount = Object.keys(catalogData).length;
    const sampleItems = Object.values(catalogData).slice(0, 5);
    
    let previewText = sampleItems.map(item => `${item.sku} - ${item.name}`).join('\n');
    
    return await modal.confirm(
        '📋 Confirm Catalog Import',
        `Ready to import ${itemCount} components from "${filename}"?\n\nPreview (first 5):\n${previewText}` +
        (itemCount > 5 ? `\n\n+ ${itemCount - 5} more items...` : '')
    );
}

async function showBOMDefinitionsPreview(bomData, filename) {
    const bomCount = Object.keys(bomData).length;
    const sampleBOMs = Object.values(bomData).slice(0, 3);
    
    let previewText = sampleBOMs.map(bom => {
        const componentList = Object.entries(bom.components).map(([sku, qty]) => `${qty}x ${sku}`).join(', ');
        return `${bom.bom_code}: ${componentList}`;
    }).join('\n\n');
    
    return await modal.confirm(
        '🛠️ Confirm BOM Import',
        `Ready to import ${bomCount} BOMs from "${filename}"?\n\nPreview (first 3):\n\n${previewText}` +
        (bomCount > 3 ? `\n\n+ ${bomCount - 3} more BOMs...` : '')
    );
}

// Save functions with adapter pattern
async function saveCatalogData(catalogData, filename) {
    if (typeof saveToFirestore === 'function') {
        // Firebase version (when implemented)
        await saveCatalogToFirestore(catalogData, filename);
    } else {
        // Local storage version
        await saveCatalogToLocalStorage(catalogData, filename);
    }
}

async function saveBOMDefinitionsData(bomData, filename) {
    if (typeof saveToFirestore === 'function') {
        // Firebase version (when implemented)
        await saveBOMDefinitionsToFirestore(bomData, filename);
    } else {
        // Local storage version
        await saveBOMDefinitionsToLocalStorage(bomData, filename);
    }
}

async function saveCatalogToLocalStorage(catalogData, filename) {
    // Replace item catalog
    itemCatalog = catalogData;
    
    // Create default inventory entries for new items
    Object.keys(catalogData).forEach(sku => {
        if (!inventoryTable[sku]) {
            inventoryTable[sku] = {
                sku: sku,
                total_amount: 0,
                amount_logistics: 0,
                ...Object.fromEntries(
                    Array.from({length: 30}, (_, i) => [`amount_production_zone_${i + 1}`, 0])
                )
            };
        }
    });
    
    // Rebuild legacy itemTable
    rebuildLegacyItemTable();
    
    // Save metadata
    const metadata = {
        filename: filename,
        uploadedAt: new Date().toISOString(),
        itemCount: Object.keys(catalogData).length,
        type: 'catalog'
    };
    localStorage.setItem('berjaya_catalog_metadata', JSON.stringify(metadata));
    
    // Save all data
    saveDataToLocalStorage();
    console.log(`Item catalog saved: ${Object.keys(catalogData).length} items from ${filename}`);
}

async function saveBOMDefinitionsToLocalStorage(bomData, filename) {
    // Replace BOM definitions
    bomDefinitions = bomData;
    
    // Save metadata
    const metadata = {
        filename: filename,
        uploadedAt: new Date().toISOString(),
        bomCount: Object.keys(bomData).length,
        type: 'bom_definitions'
    };
    localStorage.setItem('berjaya_bom_metadata', JSON.stringify(metadata));
    
    // Save all data
    saveDataToLocalStorage();
    console.log(`BOM definitions saved: ${Object.keys(bomData).length} BOMs from ${filename}`);
}

// Export functions
async function exportItemCatalog() {
    const catalog = getItemCatalog();
    const csvContent = 'SKU,Name\n' + 
        Object.values(catalog).map(item => `${item.sku},${item.name}`).join('\n');
    
    downloadCSV(csvContent, 'item_catalog.csv');
}

async function exportBOMDefinitions() {
    const boms = getBOMDefinitions();
    const csvContent = 'BOM_Code,Component_SKU,Quantity,BOM_Name\n' + 
        Object.values(boms).flatMap(bom => 
            Object.entries(bom.components).map(([sku, qty]) => 
                `${bom.bom_code},${sku},${qty},${bom.name}`
            )
        ).join('\n');
    
    downloadCSV(csvContent, 'bom_definitions.csv');
}

function downloadCSV(content, filename) {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

async function saveToLocalStorage(bomData, filename) {
    // Save the BOM data as the new itemTable
    itemTable = bomData;
    
    // Update all three tables with new BOM data
    yesterdayResultTable = JSON.parse(JSON.stringify(bomData));
    transactionItemTable = JSON.parse(JSON.stringify(bomData));
    // Keep checkedItemTable as is (worker counts)
    
    // Save to localStorage
    localStorage.setItem('berjaya_item_table', JSON.stringify(itemTable));
    localStorage.setItem('berjaya_yesterday_table', JSON.stringify(yesterdayResultTable));
    localStorage.setItem('berjaya_transaction_table', JSON.stringify(transactionItemTable));
    
    // Save BOM metadata
    const metadata = {
        filename: filename,
        uploadedAt: new Date().toISOString(),
        itemCount: Object.keys(bomData).length
    };
    localStorage.setItem('berjaya_bom_metadata', JSON.stringify(metadata));
    
    console.log(`BOM data saved: ${Object.keys(bomData).length} items from ${filename}`);
}