

/**
 * Wait for the DOM to be fully loaded before running any script.
 */
document.addEventListener('DOMContentLoaded', () => {

    // --- STATE & DATA ---

    /**
     * NEW: Hard-coded food data localized for India with INR (₹) pricing.
     * @type {Array<Object>}
     */
    const foodData = [
        {
            id: 1,
            name: "Pizza",
            category: "Pizza",
            price: 299,
            description: "Classic pizza with fresh mozzarella, tomatoes, and basil.",
            imageUrl: "https://ooni.com/cdn/shop/articles/20220211142347-margherita-9920_ba86be55-674e-4f35-8094-2067ab41a671.jpg?v=1737104576&width=1080",
            keywords: ["pizza", "classic", "cheese", "vegetarian", "veg"]
        },
        {
            id: 2,
            name: "Crispy Burger",
            category: "Burgers",
            price: 55,
            description: "A crispy veg patty with fresh veggies and tasty sauce inside a soft bun, giving a delicious and satisfying bite every time. ",
            imageUrl: "https://www.francoislambert.one/cdn/shop/articles/mac_poulet_corn_flakes.webp?v=1723557298",
            keywords: ["burger", "veg", "spicy", "fried", "zinger"]
        },
        {
            id: 3,
            name: "French Fries",
            category: "Fries",
            price: 49,
            description: "Crispy, Potato fries, deliciously crunchy and addictive.",
            imageUrl: "https://www.simplyrecipes.com/thmb/J1VspbyJLSLXZsw7U04eIIGGXRA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Fries-LEAD-06-303e022e2c174640916eabfb2bf45f0d.jpg",
            keywords: ["fried", "tasty", "soft", "spicy", "potato", "chilly"]
        },
        {
            id: 4,
            name: "Chilly Potato",
            category: "Chilly Potato",
            price: 129,
            description: "Crispy, golden chilly potato tossed in spicy sauce tasty, crunchy and irresistible.",
            imageUrl: "https://static.toiimg.com/photo/52532656.cms",
            keywords: ["fried", "tasty", "soft", "spicy", "potato", "chilly"]
        },
        {
            id: 5,
            name: "Fried Momo",
            category: "Momo",
            price: 149,
            description: "Crispy fried momos filled with flavorful mixed vegetables, a perfect crunchy experience.",
            imageUrl: "https://www.brahminsfoods.com/wp-content/uploads/2020/11/Fried-veg-Momo.jpg",
            keywords: ["momo", "tasty", "spicy", "fried", "crunchy"]
        },
        {
            id: 6,
            name: "Spring Roll",
            category: "Roll",
            price: 69,
            description: "Crispy veg spring rolls filled with fresh vegetables.",
            imageUrl: "https://thai-foodie.com/wp-content/uploads/2023/07/thai-egg-rolls-redo.jpg",
            keywords: ["crunchy", "tasty", "spicy", "hot", "crispy", "masala"]
        },
        {
            id: 7,
            name: "Idli Sambar",
            category: "Idli",
            price: 99,
            description: "Soft, fluffy idlis served with flavorful, aromatic sambar create a light, healthy, and satisfying taste.",
            imageUrl: "https://www.spicekitchenuk.com/cdn/shop/articles/IDLIHEALTHYBREAKFASTSTUDY1_15.jpg?v=1479206314",
            keywords: ["tasty", "veggie", "vegetarian", "veg", "healthy"]
        },
        {
            id: 8,
            name: "Dosa",
            category: "Indian",
            price: 99,
            description: "A dish made from fermented rice batter, served with chutney and sambar for a light, flavorful meal.",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/8f/Rameshwaram_Cafe_Dosa.jpg",
            keywords: ["indian", "roll", "dosa", "vegetarian", "veg", "spicy", "lihgt"]
        },
        {
            id: 9,
            name: "Veg Chaap Biryani",
            category: "Biryani",
            price: 89,
            description: "Aromatic basmati rice cooked with Chaap, mixed vegetables and spices.",
            imageUrl: "https://img-global.cpcdn.com/recipes/9fe286796c16a134/1200x630cq80/photo.jpg",
            keywords: ["biryani", "veg", "vegetarian", "rice", "chaap"]
        },
        {
            id: 10,
            name: "Shezwan Fried Rice",
            category: "Fried Rice",
            price: 89,
            description: "Flavorful stir-fried rice tossed with vegetables and spices, tasty, aromatic, and satisfying.",
            imageUrl: "https://www.pavaniskitchen.com/wp-content/uploads/2021/08/schezwan-veg-fried-rice.jpg",
            keywords: ["fried","rice", "veg", "vegetarian", "rice", "vegetables"]
        },
        {
            id: 11,
            name: "Gulab Jamun (2 pcs)",
            category: "Desserts",
            price: 79,
            description: "Soft, spongy milk-solid balls soaked in sweet sugar syrup.",
            imageUrl: "https://static.toiimg.com/thumb/63799510.cms?imgsize=1091643&width=800&height=800",
            keywords: ["dessert", "sweet", "indian", "gulab jamun"]
        },
        {
            id: 12,
            name: "Mango Lassi",
            category: "Drinks",
            price: 79,
            description: "Milk, and mango that delivers comfort and a soothing taste in every sip.",
            imageUrl: "https://palatesdesire.com/wp-content/uploads/2022/03/mango-lassi-recipe@palate-desire.jpg",
            keywords: ["lassi", "milk", "mango", "beverage", "fresh", "refreshing"]
        }
    ];

    /**
     * The main shopping cart array.
     */
    let cart = [];

    /**
     * NEW: Gemini API Key.
     * This is left blank. The environment (like Canvas) will provide it.
     */
    const apiKey = "AIzaSyC04SUorGBWn8O4NSC76T5XRhKJ4YWX36Y";
    const geminiApiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

    // --- ELEMENT SELECTORS ---
    const pages = document.querySelectorAll('.page');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
    const mobileNavClose = document.querySelector('.mobile-nav-close');
    const cartCountElement = document.querySelector('.cart-count');
    const menuGrid = document.getElementById('menu-grid-container');
    const featuredGrid = document.getElementById('featured-grid-container');
    const menuSearchInput = document.getElementById('menu-search-input');
    const heroSearchInput = document.getElementById('hero-search-input');
    const cartContentWrapper = document.getElementById('cart-content-wrapper');
    const checkoutForm = document.getElementById('checkout-form');
    const loginToggleLink = document.getElementById('toggle-link');
    const loginToggleText = document.getElementById('toggle-text');
    const loginTitle = document.getElementById('login-title');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const contactForm = document.getElementById('contact-form');

    // NEW: AI Modal Selectors
    const aiModal = document.getElementById('ai-modal');
    const openAiModalBtn = document.getElementById('ask-ai-btn');
    const closeAiModalBtn = document.getElementById('ai-modal-close-btn');
    const aiChatBox = document.getElementById('ai-chat-box');
    const aiInput = document.getElementById('ai-input');
    const aiSendBtn = document.getElementById('ai-send-btn');

    // --- INITIALIZATION ---

    function loadCartFromStorage() {
        const storedCart = localStorage.getItem('foodNowCart');
        if (storedCart) {
            cart = JSON.parse(storedCart);
        }
    }

    function init() {
        loadCartFromStorage();
        renderMenu(foodData); // Render all items
        renderFeatured(); // Render featured items
        updateCartUI(); // Update cart count and render cart page

        const initialPage = window.location.hash.substring(1) || 'home';
        navigateTo(initialPage);

        setupEventListeners();
    }

    // --- PAGE NAVIGATION ---

    function navigateTo(pageId) {
        pages.forEach(page => page.classList.remove('active'));

        const targetPage = document.getElementById(`page-${pageId}`);
        if (targetPage) {
            targetPage.classList.add('active');
        } else {
            document.getElementById('page-home').classList.add('active');
            pageId = 'home';
        }

        navLinks.forEach(link => {
            link.classList.toggle('active', link.dataset.page === pageId);
        });

        window.location.hash = pageId;
        closeMobileNav();
        window.scrollTo(0, 0);

        if (pageId === 'cart') {
            renderCartPage();
        }
        if (pageId === 'checkout') {
            renderCheckoutSummary();
        }
    }

    // --- MOBILE NAVIGATION ---

    function openMobileNav() {
        mobileNav.classList.add('open');
        mobileNavOverlay.classList.add('open');
    }

    function closeMobileNav() {
        mobileNav.classList.remove('open');
        mobileNavOverlay.classList.remove('open');
    }

    // --- RENDER FUNCTIONS ---

    /**
     * Renders product cards.
     * Prices are now in INR (₹).
     */
    function renderMenu(items) {
        if (!menuGrid) return;
        menuGrid.innerHTML = '';

        const noResultsEl = document.getElementById('menu-no-results');

        if (items.length === 0) {
            if (noResultsEl) noResultsEl.style.display = 'block';
            return;
        }

        if (noResultsEl) noResultsEl.style.display = 'none';

        items.forEach(item => {
            const card = document.createElement('div');
            card.className = 'product-card card';
            card.innerHTML = `
                        <img src="${item.imageUrl}" alt="${item.name}" class="product-card-image">
                        <div class="product-card-content">
                            <h3>${item.name}</h3>
                            <span class="category">${item.category}</span>
                            <p class="description">${item.description}</p>
                            <div class="product-card-footer">
                                <span class="price">₹${item.price.toFixed(0)}</span>
                                <button class="btn btn-small add-to-cart-btn" data-id="${item.id}">Add</button>
                            </div>
                        </div>
                    `;
            menuGrid.appendChild(card);
        });
    }

    function renderFeatured() {
        if (!featuredGrid) return;
        const featuredItems = foodData.slice(0, 4);

        featuredItems.forEach(item => {
            const card = document.createElement('div');
            card.className = 'product-card card';
            card.innerHTML = `
                        <img src="${item.imageUrl}" alt="${item.name}" class="product-card-image">
                        <div class="product-card-content">
                            <h3>${item.name}</h3>
                            <span class="category">${item.category}</span>
                            <p class="description">${item.description}</p>
                            <div class="product-card-footer">
                                <span class="price">₹${item.price.toFixed(0)}</span>
                                <button class="btn btn-small add-to-cart-btn" data-id="${item.id}">Add</button>
                            </div>
                        </div>
                    `;
            featuredGrid.appendChild(card);
        });
    }

    /**
     * Renders cart page, now with INR (₹).
     */
    function renderCartPage() {
        if (cart.length === 0) {
            cartContentWrapper.innerHTML = `
                        <div class="empty-cart-message card">
                            <h2>Your cart is empty!</h2>
                            <p>Looks like you haven't added anything yet.</p>
                            <a href="#" class="btn btn-primary nav-link" data-page="menu">Browse Menu</a>
                        </div>
                    `;
            return;
        }

        const subtotal = calculateTotalPrice();
        const tax = subtotal * 0.05; // 5% GST
        const deliveryFee = 30;
        const total = subtotal + tax + deliveryFee;

        cartContentWrapper.innerHTML = `
                    <div class="cart-container">
                        <div class="cart-items">
                            ${cart.map(item => `
                                <div class="cart-item card">
                                    <img src="${item.imageUrl}" alt="${item.name}" class="cart-item-image">
                                    <div class="cart-item-info">
                                        <h3>${item.name}</h3>
                                        <span class="price">₹${item.price.toFixed(0)}</span>
                                    </div>
                                    <div class="cart-item-actions">
                                        <div class="cart-item-quantity">
                                            <button class="quantity-btn" data-action="decrease" data-id="${item.id}">-</button>
                                            <span class="quantity-amount">${item.quantity}</span>
                                            <button class="quantity-btn" data-action="increase" data-id="${item.id}">+</button>
                                        </div>
                                        <a class="cart-item-remove" data-action="remove" data-id="${item.id}">
                                            <svg class="icon" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                        </a>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                        
                        <div class="cart-summary card">
                            <h3>Bill Details</h3>
                            <div class="summary-row">
                                <span>Item Total</span>
                                <span id="cart-subtotal">₹${subtotal.toFixed(0)}</span>
                            </div>
                            <div class="summary-row">
                                <span>Delivery Fee</span>
                                <span id="cart-delivery">₹${deliveryFee.toFixed(0)}</span>
                            </div>
                            <div class="summary-row">
                                <span>Taxes (5% GST)</span>
                                <span id="cart-tax">₹${tax.toFixed(2)}</span>
                            </div>
                            <div class="summary-row total">
                                <span>To Pay</span>
                                <span class="total-price" id="cart-total">₹${total.toFixed(2)}</span>
                            </div>
                            <a href="#" class="btn btn-primary checkout-btn nav-link" data-page="checkout">Proceed to Checkout</a>
                        </div>
                    </div>
                `;
    }

    /**
     * Renders checkout summary, now with INR (₹).
     */
    function renderCheckoutSummary() {
        const summaryContainer = document.getElementById('checkout-summary-items');
        const totalElement = document.getElementById('checkout-summary-total');

        if (!summaryContainer || !totalElement) return;

        if (cart.length === 0) {
            summaryContainer.innerHTML = "<p>Your cart is empty.</p>";
            totalElement.textContent = "₹0.00";
            return;
        }

        summaryContainer.innerHTML = cart.map(item => `
                    <div class="summary-item">
                        <div class="summary-item-info">
                            ${item.name}
                            <span>(x${item.quantity})</span>
                        </div>
                        <span class="summary-item-price">₹${(item.price * item.quantity).toFixed(0)}</span>
                    </div>
                `).join('');

        const subtotal = calculateTotalPrice();
        const tax = subtotal * 0.05;
        const deliveryFee = 30;
        const total = subtotal + tax + deliveryFee;
        totalElement.textContent = `₹${total.toFixed(2)}`;
    }

    /**
     * Renders order success page, now with INR (₹).
     */
    function renderOrderSuccessPage(details) {
        document.getElementById('success-order-id').textContent = details.orderId;
        document.getElementById('success-user-name').textContent = details.name;
        document.getElementById('success-user-phone').textContent = details.phone;
        document.getElementById('success-user-address').textContent = details.address;
        document.getElementById('success-total-price').textContent = `₹${details.total}`;

        localStorage.removeItem('foodNowOrderDetails');
    }

    // --- CART LOGIC ---

    function addToCart(itemId) {
        const numericItemId = parseInt(itemId);
        const existingItem = cart.find(item => item.id === numericItemId);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            const itemToAdd = foodData.find(item => item.id === numericItemId);
            if (itemToAdd) {
                cart.push({ ...itemToAdd, quantity: 1 });
            }
        }

        showToast(`${existingItem ? 'Quantity updated' : 'Added to cart!'}`);
        saveCartToStorage();
        updateCartUI();
    }

    function updateCartQuantity(itemId, action) {
        const numericItemId = parseInt(itemId);
        const itemInCart = cart.find(item => item.id === numericItemId);

        if (!itemInCart) return;

        if (action === 'increase') {
            itemInCart.quantity++;
        } else if (action === 'decrease') {
            itemInCart.quantity--;
            if (itemInCart.quantity <= 0) {
                removeFromCart(itemId);
                return;
            }
        }

        saveCartToStorage();
        updateCartUI();
    }

    function removeFromCart(itemId) {
        const numericItemId = parseInt(itemId);
        cart = cart.filter(item => item.id !== numericItemId);

        saveCartToStorage();
        updateCartUI();
    }

    function saveCartToStorage() {
        localStorage.setItem('foodNowCart', JSON.stringify(cart));
    }

    function calculateTotalPrice() {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    function updateCartUI() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountElement.textContent = totalItems;
        cartCountElement.style.display = totalItems > 0 ? 'flex' : 'none';

        if (document.getElementById('page-cart').classList.contains('active')) {
            renderCartPage();
        }
    }

    function clearCart() {
        cart = [];
        saveCartToStorage();
        updateCartUI();
    }

    // --- SEARCH/FILTER LOGIC ---

    function filterMenu(searchTerm) {
        const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();

        const filteredItems = foodData.filter(item => {
            const nameMatch = item.name.toLowerCase().includes(lowerCaseSearchTerm);
            const categoryMatch = item.category.toLowerCase().includes(lowerCaseSearchTerm);
            const keywordsMatch = item.keywords.some(kw => kw.toLowerCase().includes(lowerCaseSearchTerm));

            return nameMatch || categoryMatch || keywordsMatch;
        });

        renderMenu(filteredItems);
    }

    // --- CHECKOUT & VALIDATION ---

    function validateCheckoutForm() {
        let isValid = true;

        const name = document.getElementById('checkout-name').value;
        const phone = document.getElementById('checkout-phone').value;
        const address = document.getElementById('checkout-address').value;

        const nameError = document.getElementById('name-error');
        const phoneError = document.getElementById('phone-error');
        const addressError = document.getElementById('address-error');

        const nameRegex = /^[a-zA-Z\s]+$/;
        const phoneRegex = /^\d{10}$/; // Perfect for India

        if (!nameRegex.test(name) || name.trim().length === 0) {
            nameError.style.display = 'block';
            isValid = false;
        } else {
            nameError.style.display = 'none';
        }

        if (!phoneRegex.test(phone)) {
            phoneError.style.display = 'block';
            isValid = false;
        } else {
            phoneError.style.display = 'none';
        }

        if (address.trim().length < 10) {
            addressError.style.display = 'block';
            isValid = false;
        } else {
            addressError.style.display = 'none';
        }

        return isValid;
    }

    function handleCheckoutSubmit(e) {
        e.preventDefault();

        if (validateCheckoutForm()) {
            if (cart.length === 0) {
                showToast("Your cart is empty. Add items to place an order.", "error");
                return;
            }

            const name = document.getElementById('checkout-name').value;
            const phone = document.getElementById('checkout-phone').value;
            const address = document.getElementById('checkout-address').value;

            const subtotal = calculateTotalPrice();
            const tax = subtotal * 0.05;
            const deliveryFee = 30;
            const total = (subtotal + tax + deliveryFee).toFixed(2);

            const orderId = `FN${Math.floor(Math.random() * 900000) + 100000}`;

            const orderDetails = { orderId, name, phone, address, total };
            localStorage.setItem('foodNowOrderDetails', JSON.stringify(orderDetails));

            clearCart();
            checkoutForm.reset();
            navigateTo('order-success');
            renderOrderSuccessPage(orderDetails);
        }
    }

    // --- NEW: GEMINI AI LOGIC ---

    /**
     * Adds a message to the AI chat box.
     * @param {string} message - The text content of the message.
     * @param {string} sender - 'user' or 'ai'.
     * @param {string|null} id - An optional ID for the message (used for loading).
     */
    function addMessageToChat(message, sender, id = null) {
        const messageEl = document.createElement('div');
        messageEl.className = `chat-message ${sender}`;
        if (id) {
            messageEl.id = id;
        }

        if (sender === 'ai' && message === 'loading') {
            messageEl.classList.add('loading');
            messageEl.innerHTML = '<div class="spinner"></div> Thinking...';
        } else {
            messageEl.textContent = message;
        }

        aiChatBox.appendChild(messageEl);
        aiChatBox.scrollTop = aiChatBox.scrollHeight; // Auto-scroll to bottom
    }

    /**
     * Handles sending the user's query to the Gemini API.
     */
    async function handleAiQuery() {
        const userQuery = aiInput.value.trim();
        if (userQuery.length === 0) return;

        addMessageToChat(userQuery, 'user');
        aiInput.value = '';
        addMessageToChat('loading', 'ai', 'ai-loading');

        const systemPrompt = `You are 'Foodie AI', a helpful assistant for the 'FOOD NOW' app.
                Your goal is to give a short, friendly recommendation (1-2 sentences) based on the user's query.
                You MUST also identify 1-3 keywords from the query or your recommendation (like 'pizza', 'healthy', 'spicy', 'salad', 'burger', 'biryani', 'veg') and return them in a specific, parseable format AT THE VERY END of your response.
                The format MUST be exactly: KEYWORDS: [keyword1, keyword2]
                
                Example User: "i want something healthy"
                Example Response: "A fresh salad or a Paneer Tikka Roll sounds like a great healthy choice! KEYWORDS: [salad, paneer, healthy, veg]"
                
                Example User: "spicy and non-veg"
                Example Response: "How about a spicy Chicken Zinger Burger or a delicious Chicken Biryani? KEYWORDS: [spicy, chicken, burger, biryani]"
                
                Example User: "veg breakfast"
                Example Response: "An Aloo Tikki Burger is a classic veg choice! KEYWORDS: [veg, burger, aloo]"`;

        const payload = {
            contents: [{ parts: [{ text: userQuery }] }],
            systemInstruction: {
                parts: [{ text: systemPrompt }]
            },
        };

        try {
            // Use fetchWithBackoff to handle potential 429 errors
            const result = await fetchWithBackoff(geminiApiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const candidate = result.candidates?.[0];
            let aiResponseText = "Sorry, I couldn't think of anything. Please try again.";
            let keywords = [];

            if (candidate && candidate.content?.parts?.[0]?.text) {
                const fullText = candidate.content.parts[0].text;

                // Extract keywords and clean the response text
                const keywordMatch = fullText.match(/KEYWORDS: \[([^\]]+)\]/);
                if (keywordMatch && keywordMatch[1]) {
                    keywords = keywordMatch[1].split(',').map(kw => kw.trim().replace(/'|"/g, ''));
                    aiResponseText = fullText.replace(/KEYWORDS: \[.*\]/, '').trim();
                } else {
                    aiResponseText = fullText; // Use full text if keyword match fails
                }
            }

            // Update the "loading" message with the actual response
            const loadingEl = document.getElementById('ai-loading');
            if (loadingEl) {
                loadingEl.classList.remove('loading');
                loadingEl.textContent = aiResponseText;
            } else {
                addMessageToChat(aiResponseText, 'ai');
            }

            // If we found keywords, trigger the search
            if (keywords.length > 0) {
                handleAiSearch(keywords);
            }

        } catch (error) {
            const loadingEl = document.getElementById('ai-loading');
            const errorMsg = "Oops! Something went wrong. Please check your connection and try again.";
            if (loadingEl) {
                loadingEl.classList.remove('loading');
                loadingEl.textContent = errorMsg;
            } else {
                addMessageToChat(errorMsg, 'ai');
            }
        }
    }

    /**
     * Handles the API response to filter the menu.
     * @param {Array<string>} keywords - Keywords from the AI.
     */
    function handleAiSearch(keywords) {
        if (!keywords || keywords.length === 0) return;

        const searchTerm = keywords.join(' ');

        // Show a final message from the AI
        addMessageToChat(`I'm searching for "${searchTerm}" for you...`, 'ai');

        // Close modal, navigate, and filter
        setTimeout(() => {
            closeAiModal();
            menuSearchInput.value = searchTerm;
            filterMenu(searchTerm);
            navigateTo('menu');
        }, 1500); // Wait 1.5s so user can read the message
    }

    /**
     * Exponential backoff fetch wrapper.
     */
    async function fetchWithBackoff(url, options, retries = 3, delay = 1000) {
        try {
            const response = await fetch(url, options);
            if (response.status === 429 && retries > 0) {
                await new Promise(res => setTimeout(res, delay));
                return fetchWithBackoff(url, options, retries - 1, delay * 2);
            }
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            if (retries > 0) {
                await new Promise(res => setTimeout(res, delay));
                return fetchWithBackoff(url, options, retries - 1, delay * 2);
            }
            throw error;
        }
    }

    function openAiModal() {
        aiModal.classList.add('open');
    }

    function closeAiModal() {
        aiModal.classList.remove('open');
        // Clear chat history? For now, no.
    }

    // --- EVENT LISTENERS ---

    function setupEventListeners() {

        document.body.addEventListener('click', e => {
            const navLink = e.target.closest('.nav-link');
            if (navLink) {
                e.preventDefault();
                const pageId = navLink.dataset.page;
                if (pageId) {
                    if (navLink.dataset.category) {
                        const category = navLink.dataset.category;
                        menuSearchInput.value = category;
                        filterMenu(category);
                        navigateTo('menu');
                    } else {
                        navigateTo(pageId);
                    }
                }
            }

            const mobileNavLink = e.target.closest('.mobile-nav-link');
            if (mobileNavLink) {
                e.preventDefault();
                const pageId = mobileNavLink.dataset.page;
                if (pageId) {
                    navigateTo(pageId);
                }
            }

            const cartIcon = e.target.closest('.cart-icon');
            if (cartIcon) {
                e.preventDefault();
                navigateTo('cart');
            }
        });

        hamburger.addEventListener('click', openMobileNav);
        mobileNavClose.addEventListener('click', closeMobileNav);
        mobileNavOverlay.addEventListener('click', closeMobileNav);

        menuSearchInput.addEventListener('input', () => {
            filterMenu(menuSearchInput.value);
        });

        heroSearchInput.addEventListener('keypress', e => {
            if (e.key === 'Enter') {
                const searchTerm = heroSearchInput.value;
                menuSearchInput.value = searchTerm;
                filterMenu(searchTerm);
                navigateTo('menu');
            }
        });

        menuGrid.addEventListener('click', e => {
            const btn = e.target.closest('.add-to-cart-btn');
            if (btn) {
                e.preventDefault();
                addToCart(btn.dataset.id);
            }
        });

        featuredGrid.addEventListener('click', e => {
            const btn = e.target.closest('.add-to-cart-btn');
            if (btn) {
                e.preventDefault();
                addToCart(btn.dataset.id);
            }
        });

        cartContentWrapper.addEventListener('click', e => {
            const quantityBtn = e.target.closest('.quantity-btn');
            if (quantityBtn) {
                e.preventDefault();
                updateCartQuantity(quantityBtn.dataset.id, quantityBtn.dataset.action);
                return;
            }

            const removeBtn = e.target.closest('.cart-item-remove');
            if (removeBtn) {
                e.preventDefault();
                removeFromCart(removeBtn.dataset.id);
                return;
            }
        });

        if (checkoutForm) {
            checkoutForm.addEventListener('submit', handleCheckoutSubmit);
        }

        if (loginToggleLink) {
            loginToggleLink.addEventListener('click', () => {
                const action = loginToggleLink.dataset.action;
                if (action === 'signup') {
                    loginForm.style.display = 'none';
                    signupForm.style.display = 'block';
                    loginTitle.textContent = 'Sign Up';
                    loginToggleText.textContent = 'Already have an account?';
                    loginToggleLink.textContent = 'Login';
                    loginToggleLink.dataset.action = 'login';
                } else {
                    loginForm.style.display = 'block';
                    signupForm.style.display = 'none';
                    loginTitle.textContent = 'Login';
                    loginToggleText.textContent = 'Need an account?';
                    loginToggleLink.textContent = 'Sign up';
                    loginToggleLink.dataset.action = 'signup';
                }
            });
        }

        // Fake form submissions
        [loginForm, signupForm, contactForm].forEach(form => {
            if (form) {
                form.addEventListener('submit', e => {
                    e.preventDefault();
                    let msg = "Message sent!";
                    if (form === loginForm) msg = "Login successful!";
                    if (form === signupForm) msg = "Account created!";
                    showToast(msg);
                    form.reset();
                    navigateTo('home');
                });
            }
        });

        // NEW: AI Modal Listeners
        openAiModalBtn.addEventListener('click', openAiModal);
        closeAiModalBtn.addEventListener('click', closeAiModal);
        aiModal.addEventListener('click', e => {
            if (e.target === aiModal) { // Click on overlay
                closeAiModal();
            }
        });
        aiSendBtn.addEventListener('click', handleAiQuery);
        aiInput.addEventListener('keypress', e => {
            if (e.key === 'Enter') {
                handleAiQuery();
            }
        });
    }

    // --- UTILITY FUNCTIONS ---

    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;

        toast.style.position = 'fixed';
        toast.style.bottom = '-50px'; // Start off-screen
        toast.style.left = '50%';
        toast.style.transform = 'translateX(-50%)';
        toast.style.padding = '0.75rem 1.5rem';
        toast.style.borderRadius = '8px';
        toast.style.color = 'white';
        toast.style.background = type === 'error' ? '#e74c3c' : '#27ae60';
        toast.style.zIndex = '2000';
        toast.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s ease, bottom 0.3s ease';

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '1';
            toast.style.bottom = '20px';
        }, 10);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.bottom = '-50px';
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }

    // --- RUN ---
    init();

});