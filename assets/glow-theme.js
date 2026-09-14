/**
 * GLOW. — Shopify Online Store 2.0 Theme Interactive Engine
 */

document.addEventListener('DOMContentLoaded', function () {
  // 1. Tab Switching Functionality (Product description, reviews, shipping, custom tab)
  const tabButtons = document.querySelectorAll('.tab-nav-btn');
  const tabPanes = document.querySelectorAll('.pdp-tab-pane');

  if (tabButtons.length > 0) {
    tabButtons.forEach(button => {
      button.addEventListener('click', function () {
        const targetTab = this.getAttribute('data-tab');

        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));

        this.classList.add('active');
        const activePane = document.getElementById(targetTab);
        if (activePane) {
          activePane.classList.add('active');
        }
      });
    });
  }

  // 2. Quantity Stepper Functionality
  const quantityWrappers = document.querySelectorAll('.quantity-stepper');
  quantityWrappers.forEach(wrap => {
    const minusBtn = wrap.querySelector('.qty-minus');
    const plusBtn = wrap.querySelector('.qty-plus');
    const input = wrap.querySelector('.qty-input');

    if (minusBtn && plusBtn && input) {
      minusBtn.addEventListener('click', () => {
        let val = parseInt(input.value, 10) || 1;
        if (val > 1) {
          input.value = val - 1;
        }
      });

      plusBtn.addEventListener('click', () => {
        let val = parseInt(input.value, 10) || 1;
        input.value = val + 1;
      });
    }
  });

  // 3. PDP Media Gallery Switching
  const thumbs = document.querySelectorAll('.gallery-thumb-btn');
  const mainImage = document.querySelector('.gallery-main-view img');
  const prevBtn = document.querySelector('.gallery-nav-arrow.prev');
  const nextBtn = document.querySelector('.gallery-nav-arrow.next');

  if (thumbs.length > 0 && mainImage) {
    let currentIndex = 0;

    function updateMainImage(index) {
      if (index < 0) index = thumbs.length - 1;
      if (index >= thumbs.length) index = 0;
      currentIndex = index;

      thumbs.forEach((t, i) => {
        t.classList.toggle('active', i === currentIndex);
      });

      const newSrc = thumbs[currentIndex].getAttribute('data-src') || thumbs[currentIndex].querySelector('img').getAttribute('src');
      if (newSrc) {
        mainImage.style.opacity = '0.4';
        setTimeout(() => {
          mainImage.setAttribute('src', newSrc);
          mainImage.style.opacity = '1';
        }, 120);
      }
    }

    thumbs.forEach((thumb, i) => {
      thumb.addEventListener('click', function () {
        updateMainImage(i);
      });
    });

    if (prevBtn) {
      prevBtn.addEventListener('click', () => updateMainImage(currentIndex - 1));
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => updateMainImage(currentIndex + 1));
    }
  }

  // 4. Color Swatch Selector
  const swatchButtons = document.querySelectorAll('.pdp-swatch-btn');
  const selectedColorLabel = document.querySelector('.selected-color-name');

  if (swatchButtons.length > 0) {
    swatchButtons.forEach(btn => {
      btn.addEventListener('click', function () {
        swatchButtons.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        const colorName = this.getAttribute('data-color');
        if (selectedColorLabel && colorName) {
          selectedColorLabel.textContent = colorName;
        }
      });
    });
  }

  // 5. Category Accordion Toggle in PDP Sidebar
  const accordionHeaders = document.querySelectorAll('.accordion-item-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', function () {
      const parent = this.parentElement;
      parent.classList.toggle('open');
      const arrow = this.querySelector('.accordion-arrow');
      if (arrow) {
        arrow.style.transform = parent.classList.contains('open') ? 'rotate(180deg)' : 'rotate(0deg)';
      }
      const sublist = parent.querySelector('.accordion-sublist');
      if (sublist) {
        sublist.style.display = parent.classList.contains('open') ? 'block' : 'none';
      }
    });
  });

  // 6. Announcement Bar Dismissal
  const dismissBtn = document.querySelector('.announcement-bar .close-btn');
  const announcementBar = document.querySelector('.announcement-bar');
  if (dismissBtn && announcementBar) {
    dismissBtn.addEventListener('click', () => {
      announcementBar.style.display = 'none';
    });
  }

  // 7. Add To Cart Toast / Feedback
  const addToCartBtns = document.querySelectorAll('.btn-add-cart, .action-icon-btn.cart');
  addToCartBtns.forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const cartCountEl = document.querySelector('.cart-counter');
      if (cartCountEl) {
        let count = parseInt(cartCountEl.textContent, 10) || 0;
        cartCountEl.textContent = count + 1;
      }
      
      // Simple non-intrusive alert toast
      const toast = document.createElement('div');
      toast.innerText = 'Item added to your shopping bag!';
      toast.style.position = 'fixed';
      toast.style.bottom = '24px';
      toast.style.right = '24px';
      toast.style.background = '#1b1b1b';
      toast.style.color = '#ffffff';
      toast.style.padding = '12px 24px';
      toast.style.borderRadius = '6px';
      toast.style.boxShadow = '0 6px 20px rgba(0,0,0,0.15)';
      toast.style.zIndex = '9999';
      toast.style.fontSize = '0.9rem';
      document.body.appendChild(toast);
      
      setTimeout(() => {
        toast.remove();
      }, 2500);
    });
  });

  // 8. Category Filter Tabs in Trending Section
  const categoryFilterBtns = document.querySelectorAll('.category-tab-btn');
  const productCards = document.querySelectorAll('.trending-grid .product-card');

  if (categoryFilterBtns.length > 0 && productCards.length > 0) {
    categoryFilterBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        categoryFilterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        const filterCategory = this.getAttribute('data-category');

        productCards.forEach(card => {
          const cardCat = card.getAttribute('data-category');
          if (filterCategory === 'all' || cardCat === filterCategory) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }
});
