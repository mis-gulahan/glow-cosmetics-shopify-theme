# Glow. — Luxury Organic Skincare & Cosmetics Shopify Theme (OS 2.0)

**Glow.** is an authentic, production-ready **Shopify Online Store 2.0** theme crafted specifically for luxury organic cosmetics, skincare, and beauty brands.

---

## 🌟 Key Features

- **Shopify Online Store 2.0 Native**: Full JSON templates (`templates/*.json`) with modular sections and reorderable blocks inside the Shopify Theme Customizer.
- **Identical to High-End UI Designs**:
  - **Homepage (Screenshot 2)**:
    - Top promotional announcement bar with dismissal
    - Luxury header with navigation badges (`NEW`, `HOT`), search modal, account, and reactive cart counter
    - Hero banner with botanical elegance & beauty portrait
    - 4-column value propositions bar (Free Delivery, 24/7 Care, 100% Organic, SSL Payment)
    - Tabbed Trending Products grid with category filters & quick hover actions
    - "What makes us unique?" split comparison section with checkmark benefits
    - "Body Care Product" editorial promo banner
    - Interactive cosmetic bottle hotspots with dermatologist clinical testimonial card
    - In-page "Deal of the Day" showcase with urgency counter, color swatches, and full specifications table
    - Editorial skincare journal / blog post grid
    - Newsletter discount capture section
    - 4-column dark luxury footer with social links & payment badges
  - **Product Detail Page (Screenshot 1)**:
    - Left sidebar: Expandable category accordion, featured collection mini-list, "Winter Care Dry Skin Oil" promo card, special collection mini-list
    - Main PDP: High-definition product gallery with thumbnail slider & navigation arrows
    - Low-stock urgency progress bar (*"Hurry! only 4 units left in stock!"*)
    - Interactive color swatches & quantity stepper
    - Dual CTA buttons: `ADD TO CART` (terracotta) and `BUY IT NOW` (black)
    - 4-box trust feature grid (Free Delivery, Way To Buy, Personal Session, Gift Voucher)
    - Rich tabbed container: Description (with unordered/ordered lists), Reviews, Shipping & Returns, Custom Tab
    - "Related Products - New Season." 3-column recommendation grid

---

## 📁 Repository Structure

```
d:/shopify store 1.1/
├── assets/
│   ├── glow-theme.css             # Complete responsive stylesheet
│   ├── glow-theme.js              # Interactivity (tabs, swatches, gallery, cart)
│   ├── product-bottle-green.svg   # Smooth Essen bottle
│   ├── product-bottle-blue.svg    # Urban Decoy bottle
│   ├── product-bottle-rose.svg    # Smoothing Essence bottle
│   ├── product-bottle-amber.svg   # Anti-aging bottle
│   ├── product-dropper.svg        # Winter Care Dry Skin Oil dropper
│   ├── hero-beauty-model.svg      # Hero section beauty illustration
│   ├── split-comparison.svg       # "What makes us unique?" split graphic
│   ├── body-care-banner.svg       # Body care banner
│   ├── doctor-portrait.svg        # Clinical dermatologist avatar
│   ├── blog-tools.svg             # Gua sha journal graphic
│   ├── blog-roller.svg            # Jade roller journal graphic
│   └── blog-cream.svg             # Velvet cream jar journal graphic
├── config/
│   ├── settings_schema.json       # Shopify theme editor customizer schema
│   └── settings_data.json         # Default brand typography & color values
├── layout/
│   └── theme.liquid               # Master Shopify Liquid layout
├── locales/
│   └── en.default.json            # English translations and store labels
├── sections/
│   ├── announcement-bar.liquid    # Top alert bar
│   ├── header.liquid              # Luxury header
│   ├── hero-banner.liquid         # Hero banner
│   ├── features-bar.liquid        # Value proposition badges
│   ├── trending-products.liquid   # Trending collection grid with filters
│   ├── split-feature.liquid       # Split comparison section
│   ├── promo-banner.liquid        # Body care promo banner
│   ├── product-hotspots.liquid    # Interactive bottle hotspots + doctor quote
│   ├── deal-of-day.liquid         # Deal of the Day showcase & specs table
│   ├── brand-logos.liquid         # Press partner logo strip (Vogue, Elle, etc.)
│   ├── blog-posts.liquid          # 3-column beauty journal
│   ├── newsletter.liquid          # Newsletter subscribe bar
│   ├── footer.liquid              # Dark 4-column footer
│   ├── main-product.liquid        # PDP with gallery, swatches, tabs
│   ├── product-sidebar.liquid     # PDP left sidebar widgets
│   ├── related-products.liquid    # Related products grid
│   ├── main-collection.liquid     # Collection catalog
│   ├── main-cart.liquid           # Shopping cart
│   ├── main-page.liquid           # Standard page layout
│   └── main-404.liquid            # 404 error page
├── snippets/
│   ├── product-card.liquid        # Reusable product card component
│   ├── price.liquid               # Price formatter
│   ├── rating-stars.liquid        # 5-star rating component
│   ├── color-swatches.liquid      # Swatches component
│   ├── icon-cart.liquid           # Cart icon
│   ├── icon-search.liquid         # Search icon
│   ├── icon-user.liquid           # User account icon
│   ├── icon-heart.liquid          # Wishlist heart icon
│   ├── icon-truck.liquid          # Delivery truck icon
│   ├── icon-shield.liquid         # SSL Shield icon
│   ├── icon-leaf.liquid           # Organic leaf icon
│   └── icon-headset.liquid        # Support headset icon
├── templates/
│   ├── index.json                 # OS 2.0 homepage section order
│   ├── product.json               # OS 2.0 product page section order
│   ├── collection.json            # Collection template
│   ├── cart.json                  # Cart template
│   ├── page.json                  # Page template
│   ├── blog.json                  # Blog template
│   ├── article.json               # Article template
│   └── 404.json                   # 404 template
├── preview/
│   ├── index.html                 # Standalone browser preview of Homepage
│   └── product.html               # Standalone browser preview of Product Page
├── .gitignore
└── README.md
```

---

## 🚀 How to Preview Locally

You can test the entire store layout in your browser immediately without running any server or Shopify CLI:
1. Open `preview/index.html` in any web browser to see the full **Homepage**.
2. Open `preview/product.html` in any web browser to see the complete **Product Detail Page**.
3. All interactive features (tabs, quantity stepper, thumbnail slider, swatches, add-to-cart toast, category filters) work out of the box.

---

## 📤 How to Push to GitHub

To upload this theme to your GitHub account, open PowerShell or Terminal in this folder (`d:\shopify store 1.1`) and run:

```bash
# 1. Initialize Git
git init

# 2. Add all theme files
git add .

# 3. Create your first commit
git commit -m "feat: initial release of Glow Shopify Online Store 2.0 theme"

# 4. Set main branch
git branch -M main

# 5. Add your remote GitHub repository URL
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git

# 6. Push to GitHub
git push -u origin main
```

---

## 🛍️ How to Install on Shopify

### Method 1: Connect Directly from GitHub (Recommended)
1. Go to your **Shopify Admin** &rarr; **Online Store** &rarr; **Themes**.
2. Under the **Theme library** section, click **Add theme** &rarr; **Connect from GitHub**.
3. Log in to GitHub and select this repository.
4. Any future changes you commit and push to GitHub will automatically sync with your live Shopify theme!

### Method 2: Upload as a ZIP file
1. Select the following folders together:
   `assets`, `config`, `layout`, `locales`, `sections`, `snippets`, `templates`
2. Right click &rarr; **Send to &rarr; Compressed (zipped) folder** (name it `glow-theme.zip`).
3. In Shopify Admin &rarr; **Online Store** &rarr; **Themes** &rarr; **Add theme** &rarr; **Upload zip file**.
4. Click **Publish** whenever you are ready!

---

## 🇵🇰 اردو ہدایات (Urdu Guide)

- **براؤزر میں دیکھنے کے لیے**: آپ `preview/index.html` اور `preview/product.html` پر ڈبل کلک کر کے گوگل کروم یا کسی بھی براؤزر میں لائیو اسٹور اور تمام اینیمیشنز دیکھ سکتے ہیں۔
- **گٹ ہب پر اپلوڈ کرنے کے لیے**: اوپر دی گئی گٹ کمانڈز (`git init`, `git add .`, `git commit`, `git push`) چلائیں اور اپنے GitHub ریپو میں پش کر دیں۔
- **شاپیفائی میں لگانے کے لیے**: شاپیفائی ایڈمن میں **Online Store &rarr; Themes &rarr; Add Theme** میں جا کر یا تو GitHub سے ڈائریکٹ کنیکٹ کر لیں یا زپ (ZIP) فائل اپلوڈ کر دیں۔
