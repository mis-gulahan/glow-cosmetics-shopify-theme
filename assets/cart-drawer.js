/**
 * GLOW. — Ultra-Luxury Ajax Cart Drawer & PDP Interactive Engine
 */

class LuxuryCartDrawer {
  constructor() {
    this.drawer = document.getElementById('LuxuryCartDrawer');
    this.threshold = 7500; // $75.00 in cents
    this.init();
  }

  init() {
    if (!this.drawer) return;

    // Close triggers
    document.querySelectorAll('[data-drawer-close]').forEach(btn => {
      btn.addEventListener('click', () => this.close());
    });

    // Cart trigger in header
    document.querySelectorAll('.cart-trigger, [data-cart-drawer-trigger]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.open();
      });
    });

    // Ajax form submission for PDP
    const productForm = document.getElementById('LuxuryProductForm');
    if (productForm) {
      productForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleProductFormSubmit(productForm);
      });
    }

    // Quick Add buttons on cards
    document.addEventListener('click', (e) => {
      const quickAddBtn = e.target.closest('.btn-quick-add-luxury');
      if (quickAddBtn && !quickAddBtn.classList.contains('sold-out')) {
        e.preventDefault();
        const variantId = quickAddBtn.getAttribute('data-variant-id');
        const title = quickAddBtn.getAttribute('data-product-title');
        const price = quickAddBtn.getAttribute('data-product-price');
        const img = quickAddBtn.getAttribute('data-product-img');
        this.addItemAjax(variantId, 1, { title, price, img });
      }
    });

    // Delegate cart item remove & quantity update inside drawer
    this.drawer.addEventListener('click', (e) => {
      const removeBtn = e.target.closest('[data-remove-key]');
      if (removeBtn) {
        const key = removeBtn.getAttribute('data-remove-key');
        this.updateItemQuantity(key, 0);
        return;
      }

      const qtyBtn = e.target.closest('[data-update-key]');
      if (qtyBtn) {
        const key = qtyBtn.getAttribute('data-update-key');
        const newQty = parseInt(qtyBtn.getAttribute('data-qty'), 10);
        this.updateItemQuantity(key, newQty);
      }
    });

    // Escape key closes drawer
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen()) {
        this.close();
      }
    });
  }

  isOpen() {
    return this.drawer.classList.contains('active');
  }

  open() {
    this.drawer.classList.add('active');
    this.drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.drawer.classList.remove('active');
    this.drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  handleProductFormSubmit(form) {
    const formData = new FormData(form);
    const submitBtn = form.querySelector('.btn-luxury-add-cart');
    if (submitBtn) {
      submitBtn.classList.add('loading');
      submitBtn.querySelector('.btn-cart-text').textContent = 'ADDING...';
    }

    fetch('/cart/add.js', {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(item => {
        this.refreshCart();
        this.open();
      })
      .catch(err => {
        console.warn('Shopify Ajax Add error (or demo mode):', err);
        // Fallback demo simulation
        this.simulateItemAdd(form);
        this.open();
      })
      .finally(() => {
        if (submitBtn) {
          submitBtn.classList.remove('loading');
          submitBtn.querySelector('.btn-cart-text').textContent = 'ADD TO CART';
        }
      });
  }

  addItemAjax(variantId, quantity = 1, metadata = {}) {
    fetch('/cart/add.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: variantId, quantity: quantity })
    })
      .then(res => res.json())
      .then(data => {
        this.refreshCart();
        this.open();
      })
      .catch(err => {
        console.warn('Shopify Cart add simulated for preview/offline:', err);
        this.simulateItemAddQuick(metadata);
        this.open();
      });
  }

  updateItemQuantity(key, quantity) {
    fetch('/cart/change.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: key, quantity: quantity })
    })
      .then(res => res.json())
      .then(cart => {
        this.renderCartFromData(cart);
      })
      .catch(err => {
        console.warn('Cart update simulated:', err);
      });
  }

  refreshCart() {
    fetch('/cart.js')
      .then(res => res.json())
      .then(cart => {
        this.renderCartFromData(cart);
      })
      .catch(err => console.warn('Could not fetch /cart.js:', err));
  }

  renderCartFromData(cart) {
    const countEl = document.getElementById('DrawerCartCount');
    const headerCount = document.querySelector('.cart-counter');
    if (countEl) countEl.textContent = `(${cart.item_count})`;
    if (headerCount) headerCount.textContent = cart.item_count;

    this.updateFreeShippingBar(cart.total_price);

    const subtotalEl = document.getElementById('DrawerSubtotal');
    if (subtotalEl) {
      subtotalEl.textContent = this.formatMoney(cart.total_price);
    }

    const footerEl = document.getElementById('CartDrawerFooter');
    if (footerEl) {
      footerEl.style.display = cart.item_count === 0 ? 'none' : 'block';
    }
  }

  updateFreeShippingBar(cents) {
    const msgEl = document.getElementById('ShippingMessageText');
    const fillEl = document.getElementById('ShippingProgressFill');
    if (!msgEl || !fillEl) return;

    const percent = Math.min(100, Math.round((cents / this.threshold) * 100));
    fillEl.style.width = `${percent}%`;

    if (cents >= this.threshold) {
      msgEl.innerHTML = '<span class="shipping-unlocked">✨ You have unlocked <strong>Free Complimentary Shipping</strong>!</span>';
    } else {
      const remaining = this.threshold - cents;
      msgEl.innerHTML = `Add <strong>${this.formatMoney(remaining)}</strong> more to enjoy <strong>Free Complimentary Shipping</strong>`;
    }
  }

  formatMoney(cents) {
    return '$' + (cents / 100).toFixed(2);
  }

  // Visual simulation for local preview & offline inspection
  simulateItemAddQuick(meta) {
    const headerCount = document.querySelector('.cart-counter');
    const drawerCount = document.getElementById('DrawerCartCount');
    let current = parseInt(headerCount ? headerCount.textContent : '0', 10) || 0;
    current += 1;
    if (headerCount) headerCount.textContent = current;
    if (drawerCount) drawerCount.textContent = `(${current})`;

    this.updateFreeShippingBar(current * 6800);
    const subtotalEl = document.getElementById('DrawerSubtotal');
    if (subtotalEl) subtotalEl.textContent = this.formatMoney(current * 6800);

    const emptyView = document.getElementById('CartEmptyView');
    if (emptyView) emptyView.style.display = 'none';

    const footerEl = document.getElementById('CartDrawerFooter');
    if (footerEl) footerEl.style.display = 'block';

    const itemsList = document.getElementById('CartDrawerItemsList');
    if (itemsList) {
      const itemEl = document.createElement('div');
      itemEl.className = 'cart-drawer-item';
      itemEl.innerHTML = `
        <div class="item-thumb-box">
          <img src="${meta.img || 'product-bottle-green.svg'}" alt="${meta.title || 'Product'}">
        </div>
        <div class="item-info-box">
          <div class="item-title-row">
            <h4 class="item-title"><a href="#">${meta.title || 'Luminous Smooth Essence'}</a></h4>
            <button type="button" class="item-remove-btn" onclick="this.closest('.cart-drawer-item').remove()">&times;</button>
          </div>
          <span class="item-variant-label">Standard / 50 ml</span>
          <div class="item-price-qty-row">
            <div class="drawer-qty-stepper">
              <span class="drawer-qty-val">1</span>
            </div>
            <span class="item-line-total">${meta.price || '$68.00'}</span>
          </div>
        </div>
      `;
      itemsList.prepend(itemEl);
    }
  }

  simulateItemAdd(form) {
    const qtyInput = form.querySelector('.qty-step-input');
    const qty = parseInt(qtyInput ? qtyInput.value : '1', 10) || 1;
    const activeColor = document.getElementById('ActiveColorLabel');
    const color = activeColor ? activeColor.textContent : 'Default';

    this.simulateItemAddQuick({
      title: 'Luminous Smooth Essence (' + color + ')',
      price: '$68.00',
      img: '../assets/product-bottle-green.svg'
    });
  }
}

// Interactive Accordions & Media Gallery Initializer
document.addEventListener('DOMContentLoaded', () => {
  new LuxuryCartDrawer();

  // 1. Collapsible Accordions (Description, How to Use, Ingredients)
  const accordionCards = document.querySelectorAll('.luxury-accordion-card');
  accordionCards.forEach(card => {
    const triggerBtn = card.querySelector('.accordion-trigger-btn');
    const collapseBody = card.querySelector('.accordion-collapse-body');

    if (triggerBtn && collapseBody) {
      triggerBtn.addEventListener('click', () => {
        const isOpen = card.classList.contains('open');

        // Toggle clicked
        if (isOpen) {
          card.classList.remove('open');
          triggerBtn.setAttribute('aria-expanded', 'false');
          collapseBody.style.display = 'none';
        } else {
          card.classList.add('open');
          triggerBtn.setAttribute('aria-expanded', 'true');
          collapseBody.style.display = 'block';
        }
      });
    }
  });

  // 2. Main Product Sticky Media Gallery Switcher
  const thumbBtns = document.querySelectorAll('.thumb-item-btn');
  const mainImage = document.querySelector('.product-featured-img');

  if (thumbBtns.length > 0 && mainImage) {
    thumbBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        thumbBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        const newSrc = this.getAttribute('data-full-src');
        if (newSrc) {
          mainImage.style.opacity = '0.3';
          setTimeout(() => {
            mainImage.setAttribute('src', newSrc);
            mainImage.style.opacity = '1';
          }, 100);
        }
      });
    });
  }

  // 3. Variant Swatches & Pills Active State Listener
  const swatchRadios = document.querySelectorAll('.swatch-radio-input');
  const activeColorLabel = document.getElementById('ActiveColorLabel');

  swatchRadios.forEach(radio => {
    radio.addEventListener('change', function () {
      if (this.checked && activeColorLabel) {
        activeColorLabel.textContent = this.value;
      }
    });
  });

  // 4. Quantity Stepper Controls on PDP
  const qtyMinus = document.querySelector('.qty-decrement');
  const qtyPlus = document.querySelector('.qty-increment');
  const qtyInput = document.querySelector('.qty-step-input');

  if (qtyMinus && qtyPlus && qtyInput) {
    qtyMinus.addEventListener('click', () => {
      let val = parseInt(qtyInput.value, 10) || 1;
      if (val > 1) qtyInput.value = val - 1;
    });

    qtyPlus.addEventListener('click', () => {
      let val = parseInt(qtyInput.value, 10) || 1;
      qtyInput.value = val + 1;
    });
  }
});
