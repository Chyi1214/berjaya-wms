// Multi-language support for Berjaya WMS
// Contains translations for all user interface text

const LANGUAGES = {
    'en': {
        name: 'English',
        emoji: '🇺🇸',
        translations: {
            // Header
            'header_title': 'Berjaya Warehouse Management',
            'header_subtitle': 'Welcome to the inventory counting system',
            
            // Menu
            'menu_language': 'Language',
            
            // Login
            'login_title': 'Please Login',
            'login_button': 'Login with Google',
            'logging_in': 'Logging in...',
            'logged_in_as': 'Logged in as:',
            
            // Role Selection
            'role_selection_title': 'Select Your Role',
            'role_logistics': 'Logistics',
            'role_production': 'Production', 
            'role_manager': 'Manager',
            'logout_button': 'Logout',
            
            // Logistics
            'logistics_title': 'Logistics - Inventory Count',
            'check_inventory': 'Check Inventory',
            
            // Production
            'production_title': 'Production - Select Zone',
            'zone_label': 'Enter your production zone (1-30):',
            'zone_placeholder': 'Enter zone number',
            'select_zone': 'Select Zone',
            'production_count_title': 'Production Zone {zone} - Inventory Count',
            
            // Manager
            'manager_title': 'Manager - Item Table',
            'refresh_table': 'Refresh Table',
            
            // Form elements
            'sku_label': 'Select Item (SKU):',
            'amount_label': 'Enter Amount:',
            'amount_placeholder': 'Enter quantity',
            'submit_count': 'Submit Count',
            'cancel': 'Cancel',
            
            // Navigation
            'go_back': 'Go Back',
            
            // Status messages
            'count_saved': 'Count saved successfully!',
            'error_occurred': 'An error occurred. Please try again.',
            'loading': 'Loading...',
            
            // Table headers
            'table_sku': 'SKU',
            'table_name': 'Name', 
            'table_logistics': 'Logistics',
            'table_production': 'Production',
            'table_total': 'Total',
            
            // Footer
            'footer_text': '© 2025 Berjaya Autotech - Warehouse Management System',
            
            // Additional form texts
            'inventory_counting': 'Inventory Counting',
            'select_sku': 'Select SKU...',
            'location_label': 'Location',
            'select_sku_error': 'Please select a SKU',
            'valid_amount_error': 'Please enter a valid amount',
            'zone_error': 'Please enter a valid zone number between 1 and 30',
            'change_zone': 'Change Zone',
            'current_inventory_status': 'Current Inventory Status',
            'last_updated': 'Last updated:',
            
            // Transaction related
            'transaction_title': 'Transaction',
            'incoming_transactions': 'Incoming Transactions',
            'components_included': 'Components included:',
            'confirm_receipt': 'Confirm Receipt',
            'confirm_bom_receipt': 'Confirm BOM Receipt',
            'bom_assembly': 'BOM Assembly:',
            'from_location': 'From:',
            'sender': 'Sender:',
            'quantity': 'Quantity:',
            'assemblies': 'assembly(s)',
            'refresh_transactions': 'Refresh Transactions',
            'auto_refresh_status': 'Auto-refresh: ON (every 10s)',
            
            // BOM Management
            'bom_management': 'BOM Management',
            'upload_item_catalog': 'Upload Item Catalog',
            'download_item_catalog': 'Download Item Catalog', 
            'upload_bom_definitions': 'Upload BOM Definitions',
            'download_bom_definitions': 'Download BOM Definitions',
            
            // Transaction Form
            'send_items': 'Send Items',
            'transfer_type': 'Transfer Type:',
            'individual_components': 'Individual Components', 
            'bom_assembly_option': 'BOM Assembly',
            'component_sku': 'Component SKU:',
            'type_to_search_sku': 'Type to search SKU...',
            'type_to_search_bom': 'Type to search BOM...',
            'amount': 'Amount:',
            'send_to': 'Send to:',
            'select_destination': 'Select destination...',
            'create_transaction': 'Create Transaction',
            
            // Button labels
            'transaction': 'Transaction',
            'check_inventory': 'Check Inventory'
        }
    },
    
    'zh': {
        name: '中文',
        emoji: '🇨🇳',
        translations: {
            // Header
            'header_title': 'Berjaya 倉庫管理系統',
            'header_subtitle': '歡迎使用庫存盤點系統',
            
            // Menu
            'menu_language': '語言選擇',
            
            // Login
            'login_title': '請登入',
            'login_button': '使用 Google 登入',
            'logging_in': '登入中...',
            'logged_in_as': '已登入為：',
            
            // Role Selection
            'role_selection_title': '選擇您的角色',
            'role_logistics': '物流',
            'role_production': '生產',
            'role_manager': '經理',
            'logout_button': '登出',
            
            // Logistics
            'logistics_title': '物流 - 庫存盤點',
            'check_inventory': '查看庫存',
            
            // Production
            'production_title': '生產 - 選擇區域',
            'zone_label': '輸入您的生產區域 (1-30)：',
            'zone_placeholder': '輸入區域號碼',
            'select_zone': '選擇區域',
            'production_count_title': '生產區域 {zone} - 庫存盤點',
            
            // Manager
            'manager_title': '經理 - 物品表',
            'refresh_table': '刷新表格',
            
            // Form elements
            'sku_label': '選擇物品 (SKU)：',
            'amount_label': '輸入數量：',
            'amount_placeholder': '輸入數量',
            'submit_count': '提交盤點',
            'cancel': '取消',
            
            // Navigation
            'go_back': '返回',
            
            // Status messages
            'count_saved': '盤點已成功保存！',
            'error_occurred': '發生錯誤，請重試。',
            'loading': '載入中...',
            
            // Table headers
            'table_sku': 'SKU',
            'table_name': '名稱',
            'table_logistics': '物流',
            'table_production': '生產',
            'table_total': '總計',
            
            // Footer
            'footer_text': '© 2025 Berjaya Autotech - 倉庫管理系統',
            
            // Additional form texts
            'inventory_counting': '庫存盤點',
            'select_sku': '選擇 SKU...',
            'location_label': '位置',
            'select_sku_error': '請選擇一個 SKU',
            'valid_amount_error': '請輸入有效的數量',
            'zone_error': '請輸入 1 到 30 之間的有效區域號碼',
            'change_zone': '更改區域',
            'current_inventory_status': '目前庫存狀態',
            'last_updated': '最後更新：',
            
            // Transaction related
            'transaction_title': '交易',
            'incoming_transactions': '傳入交易',
            'components_included': '包含組件：',
            'confirm_receipt': '確認收貨',
            'confirm_bom_receipt': '確認 BOM 收貨',
            'bom_assembly': 'BOM 組裝：',
            'from_location': '來自：',
            'sender': '發送者：',
            'quantity': '數量：',
            'assemblies': '組裝',
            'refresh_transactions': '刷新交易',
            'auto_refresh_status': '自動刷新：開啟（每10秒）',
            
            // BOM Management
            'bom_management': 'BOM 管理',
            'upload_item_catalog': '上傳物品目錄',
            'download_item_catalog': '下載物品目錄',
            'upload_bom_definitions': '上傳 BOM 定義',
            'download_bom_definitions': '下載 BOM 定義',
            
            // Transaction Form
            'send_items': '發送物品',
            'transfer_type': '轉移類型：',
            'individual_components': '個別組件',
            'bom_assembly_option': 'BOM 組裝',
            'component_sku': '組件 SKU：',
            'type_to_search_sku': '輸入搜尋 SKU...',
            'type_to_search_bom': '輸入搜尋 BOM...',
            'amount': '數量：',
            'send_to': '發送至：',
            'select_destination': '選擇目的地...',
            'create_transaction': '建立交易',
            
            // Button labels
            'transaction': '交易',
            'check_inventory': '檢查庫存'
        }
    },
    
    'my': {
        name: 'မြန်မာ',
        emoji: '🇲🇲',
        translations: {
            // Header
            'header_title': 'Berjaya ကုန်လှောင်ရုံစီမံခန့်ခွဲမှု',
            'header_subtitle': 'စာရင်းရေတွက်ခြင်းစနစ်သို့ ကြိုဆိုပါသည်',
            
            // Menu
            'menu_language': 'ဘာသာစကား',
            
            // Login
            'login_title': 'ကျေးဇူးပြု၍ လော့ဂ်အင်ဝင်ပါ',
            'login_button': 'Google ဖြင့် လော့ဂ်အင်ဝင်ပါ',
            'logging_in': 'လော့ဂ်အင်ဝင်နေသည်...',
            'logged_in_as': 'အဖြစ် လော့ဂ်အင်ဝင်ထားသည်:',
            
            // Role Selection
            'role_selection_title': 'သင့်အခန်းကဏ္ဍကို ရွေးချယ်ပါ',
            'role_logistics': 'ပစ္စည်းပို့ဆောင်ရေး',
            'role_production': 'ထုတ်လုပ်မှု',
            'role_manager': 'မန်နေဂျာ',
            'logout_button': 'လော့ဂ်အောက်ထွက်ပါ',
            
            // Logistics
            'logistics_title': 'ပစ္စည်းပို့ဆောင်ရေး - စာရင်းရေတွက်ခြင်း',
            'check_inventory': 'စာရင်းကြည့်ရှုပါ',
            
            // Production
            'production_title': 'ထုတ်လုပ်မှု - ဇုန်ရွေးချယ်ပါ',
            'zone_label': 'သင့်ထုတ်လုပ်မှုဇုန် (1-30) ကို ထည့်ပါ:',
            'zone_placeholder': 'ဇုန်နံပါတ် ထည့်ပါ',
            'select_zone': 'ဇုန်ရွေးချယ်ပါ',
            'production_count_title': 'ထုတ်လုပ်မှုဇုန် {zone} - စာရင်းရေတွက်ခြင်း',
            
            // Manager
            'manager_title': 'မန်နေဂျာ - ပစ္စည်းစာရင်း',
            'refresh_table': 'စာရင်းအသစ်လုပ်ပါ',
            
            // Form elements
            'sku_label': 'ပစ္စည်းရွေးချယ်ပါ (SKU):',
            'amount_label': 'အရေအတွက် ထည့်ပါ:',
            'amount_placeholder': 'အရေအတွက် ထည့်ပါ',
            'submit_count': 'စာရင်းတင်ပြပါ',
            'cancel': 'ပယ်ဖျက်ပါ',
            
            // Navigation
            'go_back': 'ပြန်သွားပါ',
            
            // Status messages
            'count_saved': 'စာရင်းအောင်မြင်စွာ သိမ်းဆည်းပြီးပါပြီ!',
            'error_occurred': 'အမှားတစ်ခု ဖြစ်ပွားခဲ့သည်။ ကျေးဇူးပြု၍ ထပ်ကြိုးစားပါ။',
            'loading': 'လုပ်ဆောင်နေသည်...',
            
            // Table headers
            'table_sku': 'SKU',
            'table_name': 'အမည်',
            'table_logistics': 'ပစ္စည်းပို့ဆောင်ရေး',
            'table_production': 'ထုတ်လုပ်မှု',
            'table_total': 'စုစုပေါင်း',
            
            // Footer
            'footer_text': '© ၂၀၂၅ Berjaya Autotech - ကုန်လှောင်ရုံစီမံခန့်ခွဲမှုစနစ်',
            
            // Additional form texts
            'inventory_counting': 'စာရင်းရေတွက်ခြင်း',
            'select_sku': 'SKU ရွေးချယ်ပါ...',
            'location_label': 'တည်နေရာ',
            'select_sku_error': 'ကျေးဇူးပြု၍ SKU ကို ရွေးချယ်ပါ',
            'valid_amount_error': 'ကျေးဇူးပြု၍ မှန်ကန်သော အရေအတွက်ကို ထည့်ပါ',
            'zone_error': 'ကျေးဇူးပြု၍ ၁ မှ ၃၀ အတွင်း မှန်ကန်သော ဇုန်နံပါတ် ထည့်ပါ',
            'change_zone': 'ဇုန်ပြောင်းရန်',
            'current_inventory_status': 'လက်ရှိ စာရင်းအခြေအနေ',
            'last_updated': 'နောက်ဆုံးပြင်ခဲ့သည်：',
            
            // Transaction related
            'transaction_title': 'ငွေရေးကြေးရေး',
            'incoming_transactions': 'လာရောက်သည့်ငွေပေးငွေယူများ',
            'components_included': 'ပါဝင်သောအစိတ်အပိုင်းများ：',
            'confirm_receipt': 'ရရှိကြောင်းအတည်ပြုပါ',
            'confirm_bom_receipt': 'BOM ရရှိကြောင်းအတည်ပြုပါ',
            'bom_assembly': 'BOM တပ်ဆင်ခြင်း：',
            'from_location': 'မှ：',
            'sender': 'ပို့သူ：',
            'quantity': 'အရေအတွက်：',
            'assemblies': 'တပ်ဆင်မှု',
            'refresh_transactions': 'ငွေပေးငွေယူများ ပြန်လည်ဖတ်ခြင်း',
            'auto_refresh_status': 'အလိုအလျောက်ပြန်လည်ဖတ်ခြင်း: ဖွင့် (၁၀စက္ကန့်တိုင်း)',
            
            // BOM Management  
            'bom_management': 'BOM စီမံခန့်ခွဲမှု',
            'upload_item_catalog': 'ပစ္စည်းစာရင်းတင်ပါ',
            'download_item_catalog': 'ပစ္စည်းစာရင်းဒေါင်းလုဒ်လုပ်ပါ',
            'upload_bom_definitions': 'BOM အဓိပ္ပာယ်တင်ပါ',
            'download_bom_definitions': 'BOM အဓိပ္ပာယ်ဒေါင်းလုဒ်လုပ်ပါ'
        }
    },
    
    'bn': {
        name: 'বাংলা',
        emoji: '🇧🇩',
        translations: {
            // Header
            'header_title': 'বেরজায়া গুদাম ব্যবস্থাপনা',
            'header_subtitle': 'ইনভেন্টরি গণনা সিস্টেমে স্বাগতম',
            
            // Menu
            'menu_language': 'ভাষা',
            
            // Login
            'login_title': 'দয়া করে লগইন করুন',
            'login_button': 'Google দিয়ে লগইন করুন',
            'logging_in': 'লগইন হচ্ছে...',
            'logged_in_as': 'লগইন করেছেন:',
            
            // Role Selection
            'role_selection_title': 'আপনার ভূমিকা নির্বাচন করুন',
            'role_logistics': 'লজিস্টিক্স',
            'role_production': 'উৎপাদন',
            'role_manager': 'ম্যানেজার',
            'logout_button': 'লগআউট',
            
            // Logistics
            'logistics_title': 'লজিস্টিক্স - ইনভেন্টরি গণনা',
            'check_inventory': 'ইনভেন্টরি চেক করুন',
            
            // Production
            'production_title': 'উৎপাদন - জোন নির্বাচন',
            'zone_label': 'আপনার উৎপাদন জোন (১-৩০) লিখুন:',
            'zone_placeholder': 'জোন নম্বর লিখুন',
            'select_zone': 'জোন নির্বাচন করুন',
            'production_count_title': 'উৎপাদন জোন {zone} - ইনভেন্টরি গণনা',
            
            // Manager
            'manager_title': 'ম্যানেজার - আইটেম টেবিল',
            'refresh_table': 'টেবিল রিফ্রেশ করুন',
            
            // Form elements
            'sku_label': 'আইটেম নির্বাচন করুন (SKU):',
            'amount_label': 'পরিমাণ লিখুন:',
            'amount_placeholder': 'পরিমাণ লিখুন',
            'submit_count': 'গণনা জমা দিন',
            'cancel': 'বাতিল',
            
            // Navigation
            'go_back': 'ফিরে যান',
            
            // Status messages
            'count_saved': 'গণনা সফলভাবে সংরক্ষিত হয়েছে!',
            'error_occurred': 'একটি ত্রুটি ঘটেছে। দয়া করে আবার চেষ্টা করুন।',
            'loading': 'লোড হচ্ছে...',
            
            // Table headers
            'table_sku': 'SKU',
            'table_name': 'নাম',
            'table_logistics': 'লজিস্টিক্স',
            'table_production': 'উৎপাদন',
            'table_total': 'মোট',
            
            // Footer
            'footer_text': '© ২০২৫ বেরজায়া অটোটেক - গুদাম ব্যবস্থাপনা সিস্টেম',
            
            // Additional form texts
            'inventory_counting': 'ইনভেন্টরি গণনা',
            'select_sku': 'SKU নির্বাচন করুন...',
            'location_label': 'স্থান',
            'select_sku_error': 'দয়া করে একটি SKU নির্বাচন করুন',
            'valid_amount_error': 'দয়া করে একটি বৈধ পরিমাণ লিখুন',
            'zone_error': 'দয়া করে ১ থেকে ৩০ এর মধ্যে একটি বৈধ জোন নম্বর লিখুন',
            'change_zone': 'জোন পরিবর্তন',
            'current_inventory_status': 'বর্তমান ইনভেন্টরি অবস্থা',
            'last_updated': 'সর্বশেষ আপডেট:',
            
            // Transaction related
            'transaction_title': 'লেনদেন',
            'incoming_transactions': 'আগত লেনদেন',
            'components_included': 'অন্তর্ভুক্ত উপাদান:',
            'confirm_receipt': 'প্রাপ্তি নিশ্চিত করুন',
            'confirm_bom_receipt': 'BOM প্রাপ্তি নিশ্চিত করুন',
            'bom_assembly': 'BOM সমাবেশ:',
            'from_location': 'থেকে:',
            'sender': 'প্রেরক:',
            'quantity': 'পরিমাণ:',
            'assemblies': 'সমাবেশ',
            'refresh_transactions': 'লেনদেন রিফ্রেশ',
            'auto_refresh_status': 'স্বয়ংক্রিয় রিফ্রেশ: চালু (প্রতি ১০ সেকেন্ড)',
            
            // BOM Management
            'bom_management': 'BOM ব্যবস্থাপনা',
            'upload_item_catalog': 'আইটেম ক্যাটালগ আপলোড',
            'download_item_catalog': 'আইটেম ক্যাটালগ ডাউনলোড',
            'upload_bom_definitions': 'BOM সংজ্ঞা আপলোড',
            'download_bom_definitions': 'BOM সংজ্ঞা ডাউনলোড',
            
            // Transaction Form  
            'send_items': 'আইটেম পাঠান',
            'transfer_type': 'স্থানান্তরের ধরন:',
            'individual_components': 'স্বতন্ত্র উপাদান',
            'bom_assembly_option': 'BOM সমাবেশ',
            'component_sku': 'উপাদান SKU:',
            'type_to_search_sku': 'SKU খুঁজতে টাইপ করুন...',
            'type_to_search_bom': 'BOM খুঁজতে টাইপ করুন...',
            'amount': 'পরিমাণ:',
            'send_to': 'পাঠান:',
            'select_destination': 'গন্তব্য নির্বাচন...',
            'create_transaction': 'লেনদেন তৈরি',
            
            // Button labels
            'transaction': 'লেনদেন',
            'check_inventory': 'ইনভেন্টরি চেক'
        }
    },
    
    'ms': {
        name: 'Bahasa Melayu',
        emoji: '🇲🇾',
        translations: {
            // Header
            'header_title': 'Pengurusan Gudang Berjaya',
            'header_subtitle': 'Selamat datang ke sistem pengiraan inventori',
            
            // Menu
            'menu_language': 'Bahasa',
            
            // Login
            'login_title': 'Sila Log Masuk',
            'login_button': 'Log Masuk dengan Google',
            'logging_in': 'Sedang log masuk...',
            'logged_in_as': 'Log masuk sebagai:',
            
            // Role Selection
            'role_selection_title': 'Pilih Peranan Anda',
            'role_logistics': 'Logistik',
            'role_production': 'Pengeluaran',
            'role_manager': 'Pengurus',
            'logout_button': 'Log Keluar',
            
            // Logistics
            'logistics_title': 'Logistik - Pengiraan Inventori',
            'check_inventory': 'Semak Inventori',
            
            // Production
            'production_title': 'Pengeluaran - Pilih Zon',
            'zone_label': 'Masukkan zon pengeluaran anda (1-30):',
            'zone_placeholder': 'Masukkan nombor zon',
            'select_zone': 'Pilih Zon',
            'production_count_title': 'Zon Pengeluaran {zone} - Pengiraan Inventori',
            
            // Manager
            'manager_title': 'Pengurus - Jadual Item',
            'refresh_table': 'Muat Semula Jadual',
            
            // Form elements
            'sku_label': 'Pilih Item (SKU):',
            'amount_label': 'Masukkan Jumlah:',
            'amount_placeholder': 'Masukkan kuantiti',
            'submit_count': 'Hantar Kiraan',
            'cancel': 'Batal',
            
            // Navigation
            'go_back': 'Kembali',
            
            // Status messages
            'count_saved': 'Kiraan berjaya disimpan!',
            'error_occurred': 'Ralat berlaku. Sila cuba lagi.',
            'loading': 'Sedang memuatkan...',
            
            // Table headers
            'table_sku': 'SKU',
            'table_name': 'Nama',
            'table_logistics': 'Logistik',
            'table_production': 'Pengeluaran',
            'table_total': 'Jumlah',
            
            // Footer
            'footer_text': '© 2025 Berjaya Autotech - Sistem Pengurusan Gudang',
            
            // Additional form texts
            'inventory_counting': 'Pengiraan Inventori',
            'select_sku': 'Pilih SKU...',
            'location_label': 'Lokasi',
            'select_sku_error': 'Sila pilih SKU',
            'valid_amount_error': 'Sila masukkan jumlah yang sah',
            'zone_error': 'Sila masukkan nombor zon yang sah antara 1 hingga 30',
            'change_zone': 'Tukar Zon',
            'current_inventory_status': 'Status Inventori Semasa',
            'last_updated': 'Kemaskini terakhir:'
        }
    }
};

// Language management system
class LanguageManager {
    constructor() {
        this.currentLanguage = this.loadLanguage();
    }
    
    loadLanguage() {
        // Load saved language or default to English
        return localStorage.getItem('wms_language') || 'en';
    }
    
    saveLanguage(lang) {
        localStorage.setItem('wms_language', lang);
        this.currentLanguage = lang;
    }
    
    setLanguage(lang) {
        if (LANGUAGES[lang]) {
            this.saveLanguage(lang);
            this.updateAllText();
        }
    }
    
    getText(key, variables = {}) {
        const translation = LANGUAGES[this.currentLanguage]?.translations[key] || 
                          LANGUAGES['en'].translations[key] || 
                          key;
        
        // Replace variables in text (e.g., {zone} with actual zone number)
        let result = translation;
        Object.keys(variables).forEach(varKey => {
            result = result.replace(`{${varKey}}`, variables[varKey]);
        });
        
        return result;
    }
    
    updateAllText() {
        // Update all elements with data-lang attributes
        document.querySelectorAll('[data-lang]').forEach(element => {
            const key = element.getAttribute('data-lang');
            const variables = this.getVariablesFromElement(element);
            element.textContent = this.getText(key, variables);
        });
        
        // Update placeholders
        document.querySelectorAll('[data-lang-placeholder]').forEach(element => {
            const key = element.getAttribute('data-lang-placeholder');
            element.placeholder = this.getText(key);
        });
        
        // Update HTML lang attribute
        document.documentElement.lang = this.currentLanguage;
    }
    
    getVariablesFromElement(element) {
        const variables = {};
        // Check for data attributes that contain variables
        Array.from(element.attributes).forEach(attr => {
            if (attr.name.startsWith('data-var-')) {
                const varName = attr.name.replace('data-var-', '');
                variables[varName] = attr.value;
            }
        });
        return variables;
    }
    
    getCurrentLanguage() {
        return this.currentLanguage;
    }
    
    getLanguagesList() {
        return Object.keys(LANGUAGES).map(code => ({
            code,
            name: LANGUAGES[code].name,
            emoji: LANGUAGES[code].emoji
        }));
    }
}

// Initialize language manager
const languageManager = new LanguageManager();