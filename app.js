/**
 * cros — Future Coffee & Specialty Brews
 * Interactive Client Application
 */

document.addEventListener('DOMContentLoaded', () => {
  // Helper format mata uang Rupiah (IDR)
  function formatIDR(amount) {
    return 'Rp ' + Math.round(amount).toLocaleString('id-ID');
  }

  // ==========================================
  // Data: Coffee Menu Items matching Mockup (Harga Indonesia / IDR)
  // ==========================================
  const menuItems = [
    {
      id: 'espresso',
      name: 'Espresso',
      desc: 'pure strong coffee',
      price: 22000,
      image: 'assets/espresso.png',
      categories: ['iced', 'classic', 'all'],
      featured: true
    },
    {
      id: 'americano',
      name: 'Americano',
      desc: 'espresso + hot water',
      price: 25000,
      image: 'assets/americano.png',
      categories: ['iced', 'classic', 'all'],
      featured: true
    },
    {
      id: 'latte',
      name: 'Latte',
      desc: 'espresso + lots of milk + little foam',
      price: 30000,
      image: 'assets/latte.png',
      categories: ['iced', 'milk', 'all'],
      featured: true
    },
    {
      id: 'macchiato',
      name: 'Macchiato',
      desc: 'espresso + small milk foam',
      price: 32000,
      image: 'assets/macchiato.png',
      categories: ['iced', 'milk', 'specialty', 'all'],
      featured: true
    },
    {
      id: 'irish-coffee',
      name: 'Irish Coffee',
      desc: 'coffee + whiskey + cream',
      price: 38000,
      image: 'assets/irish_coffee.png',
      categories: ['iced', 'specialty', 'sweet', 'all'],
      featured: true
    },
    {
      id: 'flat-white',
      name: 'Flat White',
      desc: 'espresso + thin layer of milk foam',
      price: 28000,
      image: 'assets/flat_white.png',
      categories: ['iced', 'milk', 'classic', 'all'],
      featured: true
    },
    {
      id: 'lungo',
      name: 'Lungo',
      desc: 'long espresso, more water',
      price: 26000,
      image: 'assets/lungo.png',
      categories: ['iced', 'classic', 'all'],
      featured: true
    },
    {
      id: 'vienna-coffee',
      name: 'Vienna Coffee',
      desc: 'espresso + whipped cream',
      price: 35000,
      image: 'assets/vienna_coffee.png',
      categories: ['iced', 'specialty', 'sweet', 'all'],
      featured: true
    },
    // Extended signature items for "More" view
    {
      id: 'nitro-cold-brew',
      name: 'Nitro Cold Brew',
      desc: 'steeped 24h, infused with micro-nitrogen bubbles',
      price: 35000,
      image: 'assets/espresso.png',
      categories: ['specialty', 'all'],
      featured: false
    },
    {
      id: 'caramel-frappe',
      name: 'Caramel Macchiato',
      desc: 'blended espresso + handcrafted caramel drizzle',
      price: 36000,
      image: 'assets/americano.png',
      categories: ['sweet', 'milk', 'all'],
      featured: false
    },
    {
      id: 'matcha-espresso',
      name: 'Matcha Espresso Fusion',
      desc: 'ceremonial grade matcha + cold milk + ristretto',
      price: 38000,
      image: 'assets/latte.png',
      categories: ['specialty', 'milk', 'all'],
      featured: false
    },
    {
      id: 'affogato-deluxe',
      name: 'Affogato al Caffè',
      desc: 'double ristretto over artisan vanilla gelato',
      price: 34000,
      image: 'assets/vienna_coffee.png',
      categories: ['specialty', 'sweet', 'all'],
      featured: false
    }
  ];

  // ==========================================
  // App State
  // ==========================================
  let currentCategory = 'iced';
  let isMoreExpanded = false;
  let cart = [];
  let wishlist = new Set();
  let discountRate = 0.0;
  let activeModalDrink = null;
  let modalCustomizations = {
    size: 'Regular',
    ice: 'Normal Ice',
    sugar: 'Normal 100%',
    milk: 'Dairy Milk',
    extraCost: 0,
    qty: 1
  };

  // Try to load saved cart & wishlist from localStorage
  try {
    const savedCart = localStorage.getItem('cros_cart');
    if (savedCart) cart = JSON.parse(savedCart);
    const savedWish = localStorage.getItem('cros_wishlist');
    if (savedWish) wishlist = new Set(JSON.parse(savedWish));
  } catch (e) {
    console.warn('LocalStorage not available', e);
  }

  // ==========================================
  // DOM Elements
  // ==========================================
  const menuGrid = document.getElementById('menuGrid');
  const categoryPills = document.querySelectorAll('.category-pill');
  const toggleMoreBtn = document.getElementById('toggleMoreBtn');
  const moreBtnText = document.getElementById('moreBtnText');
  const moreBtnIcon = document.getElementById('moreBtnIcon');
  const slidePrevBtn = document.getElementById('slidePrev');
  const slideNextBtn = document.getElementById('slideNext');

  // Basket & Header Elements
  const basketToggle = document.getElementById('basketToggle');
  const myBasketBtn = document.getElementById('myBasketBtn');
  const closeBasketBtn = document.getElementById('closeBasketBtn');
  const basketDrawer = document.getElementById('basketDrawer');
  const basketOverlay = document.getElementById('basketOverlay');
  const cartItemsList = document.getElementById('cartItemsList');
  const emptyBasket = document.getElementById('emptyBasket');
  const cartCountBadges = [
    document.getElementById('cartCount'),
    document.getElementById('basketPillCounter'),
    document.getElementById('drawerItemCount')
  ];

  // Calculations
  const subtotalVal = document.getElementById('subtotalVal');
  const discountRow = document.getElementById('discountRow');
  const discountVal = document.getElementById('discountVal');
  const taxVal = document.getElementById('taxVal');
  const totalVal = document.getElementById('totalVal');
  const couponInput = document.getElementById('couponInput');
  const applyCouponBtn = document.getElementById('applyCouponBtn');
  const couponStatus = document.getElementById('couponStatus');
  const checkoutBtn = document.getElementById('checkoutBtn');

  // Wishlist & Profile
  const wishlistCountBadge = document.getElementById('wishlistCount');
  const profileToggle = document.getElementById('profileToggle');
  const profileModal = document.getElementById('profileModal');
  const closeProfileBtn = document.getElementById('closeProfileBtn');

  // Customizer Modal
  const customizerModal = document.getElementById('customizerModal');
  const closeCustomizerBtn = document.getElementById('closeCustomizerBtn');
  const modalDrinkImg = document.getElementById('modalDrinkImg');
  const modalDrinkTitle = document.getElementById('modalDrinkTitle');
  const modalDrinkDesc = document.getElementById('modalDrinkDesc');
  const modalDrinkPrice = document.getElementById('modalDrinkPrice');
  const modalFinalPrice = document.getElementById('modalFinalPrice');
  const modalQtyDisplay = document.getElementById('modalQtyDisplay');
  const modalQtyMinus = document.getElementById('modalQtyMinus');
  const modalQtyPlus = document.getElementById('modalQtyPlus');
  const modalAddToCartBtn = document.getElementById('modalAddToCartBtn');

  // Promo Section Buttons
  const orderPromoBtn = document.getElementById('orderPromoBtn');
  const heroQuickOrder = document.getElementById('heroQuickOrder');

  // Checkout Success Modal
  const checkoutSuccessModal = document.getElementById('checkoutSuccessModal');
  const closeCheckoutSuccessBtn = document.getElementById('closeCheckoutSuccessBtn');
  const generatedOrderId = document.getElementById('generatedOrderId');
  const orderFinalAmount = document.getElementById('orderFinalAmount');

  // Ambient Audio
  const ambientToggle = document.getElementById('ambientToggle');

  // Delivery check
  const deliveryInput = document.getElementById('deliveryInput');
  const deliveryCheckBtn = document.getElementById('deliveryCheckBtn');
  const deliveryResult = document.getElementById('deliveryResult');

  // Mobile menu
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileNav = document.getElementById('mobileNav');

  // Toast container
  const toastContainer = document.getElementById('toastContainer');

  // ==========================================
  // Render Menu Cards
  // ==========================================
  function renderMenu() {
    menuGrid.innerHTML = '';

    // Filter drinks based on active category
    let filtered = menuItems.filter(item => {
      if (currentCategory === 'all') return true;
      return item.categories.includes(currentCategory);
    });

    // If not expanded and showing all or iced, show top 8 items
    if (!isMoreExpanded && filtered.length > 8) {
      filtered = filtered.slice(0, 8);
    }

    filtered.forEach(drink => {
      const isFav = wishlist.has(drink.id);
      const card = document.createElement('div');
      card.className = 'coffee-card';
      card.dataset.id = drink.id;

      card.innerHTML = `
        <button class="fav-toggle-btn ${isFav ? 'favorited' : ''}" data-id="${drink.id}" title="Simpan ke favorit" aria-label="Favorite">
          <i class="${isFav ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
        </button>

        <div class="card-image-box" data-action="customize" data-id="${drink.id}">
          <img src="${drink.image}" alt="${drink.name} by cros" loading="lazy" />
        </div>

        <div class="card-details">
          <h3 class="drink-name" data-action="customize" data-id="${drink.id}">${drink.name}</h3>
          <p class="drink-desc">${drink.desc}</p>
          
          <div class="card-action-row">
            <span class="drink-price">${formatIDR(drink.price)}</span>
            <button class="to-cart-btn" data-action="quick-add" data-id="${drink.id}">
              <i class="fa-solid fa-plus"></i>
              <span>to cart</span>
            </button>
          </div>
        </div>
      `;

      menuGrid.appendChild(card);
    });

    // Attach card event listeners
    attachCardListeners();
  }

  function attachCardListeners() {
    // Quick Add to cart
    menuGrid.querySelectorAll('[data-action="quick-add"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const drinkId = btn.dataset.id;
        const drink = menuItems.find(d => d.id === drinkId);
        if (!drink) return;

        // Button feedback
        btn.classList.add('added-anim');
        btn.innerHTML = `<i class="fa-solid fa-check"></i> <span>added!</span>`;
        setTimeout(() => {
          btn.classList.remove('added-anim');
          btn.innerHTML = `<i class="fa-solid fa-plus"></i> <span>to cart</span>`;
        }, 1200);

        addToCart(drink, {
          size: 'Regular',
          ice: 'Normal Ice',
          sugar: 'Normal 100%',
          milk: 'Standard'
        }, 1, drink.price);

        showToast(`✨ ${drink.name} ditambahkan ke basket!`);
      });
    });

    // Open Customizer Modal on card image or name click
    menuGrid.querySelectorAll('[data-action="customize"]').forEach(el => {
      el.addEventListener('click', () => {
        const drinkId = el.dataset.id;
        const drink = menuItems.find(d => d.id === drinkId);
        if (drink) openCustomizer(drink);
      });
    });

    // Wishlist Toggle
    menuGrid.querySelectorAll('.fav-toggle-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const drinkId = btn.dataset.id;
        if (wishlist.has(drinkId)) {
          wishlist.delete(drinkId);
          btn.classList.remove('favorited');
          btn.querySelector('i').className = 'fa-regular fa-heart';
          showToast(`Dihapus dari daftar favorit`);
        } else {
          wishlist.add(drinkId);
          btn.classList.add('favorited');
          btn.querySelector('i').className = 'fa-solid fa-heart';
          showToast(`❤️ Disimpan ke favorit cros!`);
        }
        updateWishlistCount();
      });
    });
  }

  // ==========================================
  // Category Pill Filter Switching
  // ==========================================
  categoryPills.forEach(pill => {
    pill.addEventListener('click', () => {
      categoryPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentCategory = pill.dataset.category;
      renderMenu();
    });
  });

  // Footer category links
  document.querySelectorAll('[data-cat-filter]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const cat = link.dataset.catFilter;
      const targetPill = document.querySelector(`.category-pill[data-category="${cat}"]`);
      if (targetPill) {
        targetPill.click();
        document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ==========================================
  // Carousel Arrows (Smooth Scrolling Grid)
  // ==========================================
  slidePrevBtn.addEventListener('click', () => {
    menuGrid.scrollBy({ left: -260, behavior: 'smooth' });
  });

  slideNextBtn.addEventListener('click', () => {
    menuGrid.scrollBy({ left: 260, behavior: 'smooth' });
  });

  // ==========================================
  // More / Less Toggle
  // ==========================================
  toggleMoreBtn.addEventListener('click', () => {
    isMoreExpanded = !isMoreExpanded;
    if (isMoreExpanded) {
      moreBtnText.textContent = 'Less';
      moreBtnIcon.className = 'fa-solid fa-chevron-up';
    } else {
      moreBtnText.textContent = 'More';
      moreBtnIcon.className = 'fa-solid fa-chevron-down';
    }
    renderMenu();
  });

  // ==========================================
  // Drink Customizer Modal Logic
  // ==========================================
  function openCustomizer(drink) {
    activeModalDrink = drink;
    modalDrinkImg.src = drink.image;
    modalDrinkTitle.textContent = drink.name;
    modalDrinkDesc.textContent = drink.desc;
    modalDrinkPrice.textContent = formatIDR(drink.price);

    // Reset options
    modalCustomizations = {
      size: 'Regular',
      ice: 'Normal Ice',
      sugar: 'Normal 100%',
      milk: 'Dairy Milk',
      extraCost: 0,
      qty: 1
    };

    // Reset UI chips to active defaults
    document.querySelectorAll('.chips-selector').forEach(group => {
      const chips = group.querySelectorAll('.chip');
      chips.forEach((c, idx) => {
        if (idx === 0) c.classList.add('active');
        else c.classList.remove('active');
      });
    });

    updateModalPrice();
    customizerModal.classList.add('active');
  }

  function closeCustomizer() {
    customizerModal.classList.remove('active');
    activeModalDrink = null;
  }

  closeCustomizerBtn.addEventListener('click', closeCustomizer);
  customizerModal.addEventListener('click', (e) => {
    if (e.target === customizerModal) closeCustomizer();
  });

  // Chips selection
  document.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const parent = chip.parentElement;
      parent.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const optionType = chip.dataset.name;
      const optionVal = chip.dataset.val;

      modalCustomizations[optionType] = optionVal;
      calculateModalExtra();
    });
  });

  function calculateModalExtra() {
    let extra = 0;
    // Check all active chips with data-add
    document.querySelectorAll('.chip.active[data-add]').forEach(chip => {
      extra += parseFloat(chip.dataset.add || 0);
    });
    modalCustomizations.extraCost = extra;
    updateModalPrice();
  }

  function updateModalPrice() {
    if (!activeModalDrink) return;
    const singlePrice = activeModalDrink.price + modalCustomizations.extraCost;
    const finalPrice = singlePrice * modalCustomizations.qty;
    modalFinalPrice.textContent = formatIDR(finalPrice);
    modalQtyDisplay.textContent = modalCustomizations.qty;
  }

  modalQtyMinus.addEventListener('click', () => {
    if (modalCustomizations.qty > 1) {
      modalCustomizations.qty--;
      updateModalPrice();
    }
  });

  modalQtyPlus.addEventListener('click', () => {
    modalCustomizations.qty++;
    updateModalPrice();
  });

  modalAddToCartBtn.addEventListener('click', () => {
    if (!activeModalDrink) return;
    const singleItemPrice = activeModalDrink.price + modalCustomizations.extraCost;
    
    addToCart(activeModalDrink, {
      size: modalCustomizations.size,
      ice: modalCustomizations.ice,
      sugar: modalCustomizations.sugar,
      milk: modalCustomizations.milk
    }, modalCustomizations.qty, singleItemPrice);

    closeCustomizer();
    showToast(`✨ ${modalCustomizations.qty}x ${activeModalDrink.name} (${modalCustomizations.size}) masuk ke keranjang!`);
    openBasket();
  });

  // ==========================================
  // Shopping Cart & Basket Management
  // ==========================================
  function addToCart(drink, options, qty, unitPrice) {
    const existingIndex = cart.findIndex(item => 
      item.id === drink.id &&
      item.options.size === options.size &&
      item.options.ice === options.ice &&
      item.options.sugar === options.sugar &&
      item.options.milk === options.milk
    );

    if (existingIndex > -1) {
      cart[existingIndex].qty += qty;
    } else {
      cart.push({
        id: drink.id,
        name: drink.name,
        image: drink.image,
        unitPrice: unitPrice,
        options: options,
        qty: qty
      });
    }

    saveAndRenderCart();
  }

  function saveAndRenderCart() {
    try {
      localStorage.setItem('cros_cart', JSON.stringify(cart));
    } catch (e) {}

    // Update counts
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    cartCountBadges.forEach(b => {
      if (b) b.textContent = totalItems;
    });

    // Render drawer list
    cartItemsList.innerHTML = '';
    if (cart.length === 0) {
      emptyBasket.style.display = 'flex';
      cartItemsList.style.display = 'none';
      subtotalVal.textContent = 'Rp 0';
      taxVal.textContent = 'Rp 0';
      totalVal.textContent = 'Rp 0';
      return;
    }

    emptyBasket.style.display = 'none';
    cartItemsList.style.display = 'flex';

    let subtotal = 0;

    cart.forEach((item, index) => {
      const itemTotal = item.unitPrice * item.qty;
      subtotal += itemTotal;

      const row = document.createElement('div');
      row.className = 'cart-item-row';
      row.innerHTML = `
        <div class="cart-item-thumb">
          <img src="${item.image}" alt="${item.name}" />
        </div>
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-options">${item.options.size} • ${item.options.ice} • ${item.options.milk}</div>
          <div class="cart-item-price">${formatIDR(itemTotal)}</div>
        </div>
        <div class="cart-stepper">
          <button class="cart-step-btn" data-step="minus" data-index="${index}">-</button>
          <span class="cart-qty">${item.qty}</span>
          <button class="cart-step-btn" data-step="plus" data-index="${index}">+</button>
        </div>
        <button class="cart-remove-btn" data-action="remove" data-index="${index}" title="Hapus item">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      `;

      cartItemsList.appendChild(row);
    });

    // Calculations
    const discountAmount = subtotal * discountRate;
    const taxableSubtotal = Math.max(0, subtotal - discountAmount);
    const tax = taxableSubtotal * 0.10; // Pajak Restoran 10%
    const grandTotal = taxableSubtotal + tax;

    subtotalVal.textContent = formatIDR(subtotal);
    if (discountRate > 0) {
      discountRow.style.display = 'flex';
      discountVal.textContent = `-${formatIDR(discountAmount)}`;
    } else {
      discountRow.style.display = 'none';
    }

    taxVal.textContent = formatIDR(tax);
    totalVal.textContent = formatIDR(grandTotal);

    // Add Stepper and Remove Listeners
    cartItemsList.querySelectorAll('[data-step]').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.index, 10);
        const action = btn.dataset.step;
        if (action === 'plus') {
          cart[idx].qty++;
        } else if (action === 'minus') {
          if (cart[idx].qty > 1) {
            cart[idx].qty--;
          } else {
            cart.splice(idx, 1);
          }
        }
        saveAndRenderCart();
      });
    });

    cartItemsList.querySelectorAll('[data-action="remove"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.index, 10);
        cart.splice(idx, 1);
        saveAndRenderCart();
        showToast('Item berhasil dihapus dari basket');
      });
    });
  }

  // ==========================================
  // Drawer Open / Close Controls
  // ==========================================
  function openBasket() {
    basketDrawer.classList.add('open');
    basketOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeBasket() {
    basketDrawer.classList.remove('open');
    basketOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (basketToggle) basketToggle.addEventListener('click', openBasket);
  if (myBasketBtn) myBasketBtn.addEventListener('click', openBasket);
  if (closeBasketBtn) closeBasketBtn.addEventListener('click', closeBasket);
  if (basketOverlay) basketOverlay.addEventListener('click', closeBasket);

  const startOrderingBtn = document.getElementById('startOrderingBtn');
  if (startOrderingBtn) {
    startOrderingBtn.addEventListener('click', () => {
      closeBasket();
    });
  }

  // ==========================================
  // Coupon Code (CROS20)
  // ==========================================
  applyCouponBtn.addEventListener('click', () => {
    const code = couponInput.value.trim().toUpperCase();
    if (code === 'CROS20') {
      discountRate = 0.20; // 20% OFF
      couponStatus.className = 'coupon-msg success';
      couponStatus.textContent = '✓ Diskon 20% berhasil diterapkan!';
      saveAndRenderCart();
      showToast('🎉 Diskon 20% berhasil diterapkan ke pesanan!');
    } else if (code === '') {
      discountRate = 0.0;
      couponStatus.textContent = '';
      saveAndRenderCart();
    } else {
      couponStatus.className = 'coupon-msg error';
      couponStatus.textContent = '✕ Kode promo tidak valid (Gunakan: CROS20)';
    }
  });

  // ==========================================
  // Promotional Iced Latte Deal Order
  // ==========================================
  orderPromoBtn.addEventListener('click', () => {
    const promoItem = {
      id: 'iced-latte-promo',
      name: 'Iced Latte (Promo Special)',
      image: 'assets/promo_iced_latte.png',
      price: 32000
    };

    addToCart(promoItem, {
      size: 'Large (16oz)',
      ice: 'Normal Ice',
      sugar: '100% Caramel/Vanilla',
      milk: 'Coconut & Dairy Cream'
    }, 1, 32000);

    showToast('🔥 Paket Promo Iced Latte masuk ke keranjang!');
    openBasket();
  });

  heroQuickOrder.addEventListener('click', () => {
    const latte = menuItems.find(d => d.id === 'latte');
    if (latte) {
      openCustomizer(latte);
    }
  });

  // ==========================================
  // Checkout Order Simulation
  // ==========================================
  checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
      showToast('Basket Anda masih kosong!');
      return;
    }

    const randomId = '#CROS-' + Math.floor(1000 + Math.random() * 9000);
    generatedOrderId.textContent = randomId;
    orderFinalAmount.textContent = totalVal.textContent;

    closeBasket();
    checkoutSuccessModal.classList.add('active');

    // Clear cart after checkout
    cart = [];
    saveAndRenderCart();
  });

  closeCheckoutSuccessBtn.addEventListener('click', () => {
    checkoutSuccessModal.classList.remove('active');
  });

  checkoutSuccessModal.addEventListener('click', (e) => {
    if (e.target === checkoutSuccessModal) {
      checkoutSuccessModal.classList.remove('active');
    }
  });

  // ==========================================
  // Wishlist & Profile Modals
  // ==========================================
  function updateWishlistCount() {
    wishlistCountBadge.textContent = wishlist.size;
    try {
      localStorage.setItem('cros_wishlist', JSON.stringify(Array.from(wishlist)));
    } catch (e) {}
  }

  profileToggle.addEventListener('click', () => {
    profileModal.classList.add('active');
  });

  closeProfileBtn.addEventListener('click', () => {
    profileModal.classList.remove('active');
  });

  profileModal.addEventListener('click', (e) => {
    if (e.target === profileModal) profileModal.classList.remove('active');
  });

  // Wishlist toggle in navbar scrolls to menu or opens list
  document.getElementById('wishlistToggle').addEventListener('click', () => {
    if (wishlist.size === 0) {
      showToast('Belum ada kopi yang Anda sukai. Klik ikon ❤️ pada cangkir!');
    } else {
      showToast(`Anda memiliki ${wishlist.size} kopi favorit di menu cros!`);
      document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
    }
  });

  // ==========================================
  // Ambient Cafe Audio Simulator (Web Audio API)
  // ==========================================
  let audioCtx = null;
  let noiseNode = null;
  let isPlayingAudio = false;

  function toggleCafeSound() {
    if (!isPlayingAudio) {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioCtx = new AudioContext();

        // White noise buffer for gentle cafe murmur / steam sound
        const bufferSize = audioCtx.sampleRate * 2;
        const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 2 - 1;
        }

        const whiteNoise = audioCtx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        // Bandpass filter for gentle rain/cafe warm frequency
        const filter = audioCtx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 650;
        filter.Q.value = 1.2;

        const gainNode = audioCtx.createGain();
        gainNode.gain.value = 0.04; // Gentle volume

        whiteNoise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        whiteNoise.start(0);
        noiseNode = whiteNoise;
        isPlayingAudio = true;
        ambientToggle.classList.add('playing');
        ambientToggle.querySelector('.ambient-label').textContent = 'Playing';
        showToast('🎧 Cafe sound simulator diaktifkan');
      } catch (err) {
        showToast('Audio synthesizer tidak didukung di browser ini.');
      }
    } else {
      if (noiseNode) {
        try { noiseNode.stop(); } catch(e) {}
      }
      if (audioCtx) {
        try { audioCtx.close(); } catch(e) {}
      }
      isPlayingAudio = false;
      ambientToggle.classList.remove('playing');
      ambientToggle.querySelector('.ambient-label').textContent = 'Lo-Fi';
      showToast('Audio simulator dinonaktifkan.');
    }
  }

  ambientToggle.addEventListener('click', toggleCafeSound);

  // ==========================================
  // Delivery Radius Checker
  // ==========================================
  deliveryCheckBtn.addEventListener('click', () => {
    const address = deliveryInput.value.trim();
    if (!address) {
      deliveryResult.style.color = '#FFAA5A';
      deliveryResult.textContent = 'Mohon masukkan nama jalan atau kelurahan Anda.';
      return;
    }

    deliveryResult.style.color = '#4EBA6F';
    deliveryResult.innerHTML = `✓ Lokasi "<strong>${address}</strong>" berada dalam radius 3.5 km. Estimasi antar: <strong>12 - 18 Menit</strong>!`;
  });

  // ==========================================
  // Mobile Nav Toggle
  // ==========================================
  mobileMenuBtn.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
  });

  mobileNav.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
    });
  });

  // ==========================================
  // Navbar Glassmorphism on Scroll
  // ==========================================
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Newsletter Submit
  document.getElementById('newsletterForm').addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('🎉 Selamat datang di cros VIP Member Club!');
    e.target.reset();
  });

  // ==========================================
  // Toast Helper
  // ==========================================
  function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fa-solid fa-mug-hot"></i> <span>${message}</span>`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'toastFadeOut 0.3s forwards';
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 2800);
  }

  // Initial Render
  renderMenu();
  updateWishlistCount();
  saveAndRenderCart();
});
