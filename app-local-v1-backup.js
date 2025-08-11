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
        const countingForm = document.getElementById('logistics-counting-form');
        
        checkInventoryBtn.addEventListener('click', function() {
            console.log('Check Inventory clicked in Logistics');
            showCountingForm(countingForm, 'logistics');
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
        productionCounting.innerHTML = `
            <h3 data-lang="production_count_title" data-var-zone="${selectedZone}">${languageManager.getText('production_count_title', {zone: selectedZone})}</h3>
            <button id="check-inventory-production-btn" data-lang="check_inventory">${languageManager.getText('check_inventory')}</button>
            <div id="production-counting-form" style="display: none;">
                <!-- Counting form will be inserted here -->
            </div>
            <button id="back-to-zone-selection" data-lang="change_zone">${languageManager.getText('change_zone') || 'Change Zone'}</button>
        `;
        
        // Add event listeners for production counting
        const checkInventoryProductionBtn = document.getElementById('check-inventory-production-btn');
        const backToZoneBtn = document.getElementById('back-to-zone-selection');
        const productionCountingForm = document.getElementById('production-counting-form');
        
        checkInventoryProductionBtn.addEventListener('click', function() {
            console.log('Check Inventory clicked in Production Zone', selectedZone);
            showCountingForm(productionCountingForm, `production_zone_${selectedZone}`);
        });
        
        backToZoneBtn.addEventListener('click', function() {
            document.getElementById('zone-selection').style.display = 'block';
            productionCounting.style.display = 'none';
            selectedZone = null;
        });
    }
    
    // Universal counting form
    function showCountingForm(container, location) {
        const availableSKUs = getAvailableSKUs();
        
        container.innerHTML = `
            <h3 data-lang="inventory_counting">${languageManager.getText('inventory_counting') || 'Inventory Counting'}</h3>
            <div class="counting-form">
                <div class="form-group">
                    <label for="sku-select" data-lang="sku_label">${languageManager.getText('sku_label')}</label>
                    <select id="sku-select" required>
                        <option value="">${languageManager.getText('select_sku') || 'Select SKU...'}</option>
                        ${availableSKUs.map(sku => {
                            const item = getItemBySKU(sku);
                            return `<option value="${sku}">${sku} - ${item ? item.name : 'Unknown'}</option>`;
                        }).join('')}
                    </select>
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
        
        // Add event listeners for the form
        const submitBtn = document.getElementById('submit-count-btn');
        const cancelBtn = document.getElementById('cancel-count-btn');
        const skuSelect = document.getElementById('sku-select');
        const statusDiv = document.getElementById('count-status');
        
        submitBtn.addEventListener('click', function() {
            const sku = skuSelect.value;
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
    
    // Manager view setup
    function setupManagerView() {
        displayItemTable();
        
        const refreshBtn = document.getElementById('refresh-table-btn');
        refreshBtn.addEventListener('click', function() {
            console.log('Refreshing item table...');
            displayItemTable();
        });
    }
    
    function displayItemTable() {
        const tableDisplay = document.getElementById('item-table-display');
        const itemTable = getItemTable();
        
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