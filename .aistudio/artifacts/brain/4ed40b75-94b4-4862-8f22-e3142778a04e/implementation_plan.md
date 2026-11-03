# Implementation Plan — Modern Product Detail Page UI

Redesign the product detail page UI for Orbit Technologies by synthesizing the clean e-commerce clarity of **Medigear** (split hero, 2x3 spec chips, tabbed technical sections, product badges) with the technical authority of **SciMed** (detailed reaction/operating principles, resource downloads, standards compliance) and an interactive **Slide-Out RFQ Drawer** based on your clarified requirements.

---

## User Review Required

> [!IMPORTANT]
> Based on your selections:
> 1. **Hero Layout**: Modern split layout with interactive media gallery on the left and quick specs + key chips on the right.
> 2. **Technical Details**: Fast, responsive **Tabbed Layout** (Description & Principles, Full Technical Specifications, Applications & Standards, Key Features, Documentation & Downloads, FAQs).
> 3. **Quote Interaction**: Quick action buttons opening an intuitive **Slide-out RFQ Drawer** pre-filled with the active product details.

---

## Proposed Changes

### 1. Slide-Out RFQ Drawer Component (`src/components/product-rfq-drawer.tsx`)
- Create an interactive sliding drawer (using `motion/react`) that opens upon clicking "Enquire Now" or "Request a Quote".
- Pre-filled with:
  - Product Name, Catalogue Code, and Manufacturer Brand.
- Form fields:
  - Full Name, Laboratory / Company / University, Email Address, Contact Phone, Sample Type / Application details, Delivery Timeline.
- Instant submission feedback with immediate dispatch message, direct phone link (`+91 40 2712 3456`), and WhatsApp consultation link.
- Accessible from both the hero CTA, tab CTA, and sticky floating action bar.

### 2. Interactive Product Gallery Component (`src/components/product-gallery.tsx`)
- Modern left-column gallery matching Medigear:
  - Main viewport showcasing high-resolution instrument imagery (with fallback to multi-angle SVG CAD schematics via `InstrumentArt`).
  - Interactive multi-thumbnail selector:
    - Primary Instrument Photograph / Front View
    - Control Panel & Digital Touchscreen Interface View
    - Reaction Vessel / Combustion Bomb / Chamber Cutaway View
    - Technical Dimensions & Ports Schematic
  - Top badges: `"Exclusive Parr Partner in India"`, `"ISO 9001 Certified"`, `"Genuine OEM Warranty"`.
  - Social share links & quick compliance metadata below the gallery.

### 3. Comprehensive Product Page (`src/app/products/[slug]/page.tsx` & `src/components/product-detail-view.tsx`)
- **Split Hero Section (Top)**:
  - **Left**: `ProductGallery` with thumbnails and certification tags.
  - **Right**:
    - Hierarchy breadcrumbs & category chip.
    - Prominent H1 Product Title & Model designation.
    - Catalogue SKU badge (`Catalogue No: ORB-7200-CAL`).
    - 1-sentence executive capability statement with amber border callout.
    - Concise intro paragraph (25–35 words) explaining the core measurement purpose.
    - **Medigear-Style 2x3 Spec Chips Matrix**:
      - 6 prominent cards (e.g., *Precision Class*, *Jacket Type*, *Tests Per Hour*, *Resolution*, *Origin & Brand*, *Warranty & Calibration*).
    - **Action Buttons**:
      - Primary: `Enquire Now` (triggers RFQ slide-out drawer).
      - Secondary: `Download Spec Sheet (PDF)` & `Call Laboratory Specialist`.
    - Trust badges footer (CE & ISO Certified, Pan-India Installation, Parr Global #1 Dealer).

- **Medigear-Style Tabbed Content Section**:
  - Clean horizontal tab bar with active indicator:
    1. **Description & Working Principle**: Deep technical walkthrough of the instrument, measurement physics (e.g. true isoperibol jacket equilibrium, automatic bomb washing, digital thermometry), and laboratory workflow.
    2. **Technical Specifications**: Structured, searchable, and clean key-value table categorised into Measurement, Automation, Physical/Electrical, and Compliance.
    3. **Applications & Standard Methods**: Comprehensive test standards matrix (ASTM D5865, ISO 1928, DIN 51900, IS 1350) and supported sample types (coal, coke, biomass, waste-derived fuels, propellants).
    4. **Key Advantages & Engineering Features**: Grid of engineering highlights with checkmark badges and technical explanations.
    5. **Brochures & Resources**: Downloadable PDF spec sheets, technical whitepapers, application notes, and CAD installation requirements.
    6. **Frequently Asked Questions**: Accordion-style FAQ addressing oxygen bomb hydrotesting, calibration frequency, water requirements, and preventative maintenance.

- **Related Instruments Carousel / Grid**:
  - Keep related instruments from the same category or analytical pillar.

- **Direct Call-to-Action Band**:
  - Bottom banner with immediate access to technical engineers and quote request.

### 4. Enriched Product Data & Asset Mapping
- Expand `PRODUCT_IMAGE_MAP` and augment `src/data/products.ts` with standardized technical details, standards compliance (ASTM/ISO), and brochure metadata so every product displays rich, professional content.

---

## Verification Plan

### Automated Verification
1. **Compilation Check**: Run `compile_applet` to ensure Next.js App Router compiles with zero errors.
2. **Lint Validation**: Run `lint_applet` to ensure zero syntax, typing, or unused-import errors.

### Manual / Browser Verification
1. Open `/products/7200-precision-isoperibol-calorimeter` and verify:
   - Split layout renders properly on desktop (gallery left, specs right) and stacks cleanly on mobile.
   - 2x3 spec chips display clean metrics (Precision, Jacket, Tests/Hr, etc.).
   - Clicking thumbnails switches the main viewport between photograph, control panel, and schematics.
   - Clicking "Enquire Now" opens the slide-out RFQ drawer smoothly with pre-filled product details.
   - Tab bar switches smoothly between Description, Specifications, Applications, Features, Downloads, and FAQs.
   - Test across multiple products (e.g., `ash-fusion-analyzer-ht-if2000g-hdbm`, `ecs-8024`, `tga-3000`).
