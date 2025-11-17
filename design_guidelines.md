# Design Guidelines: Product Coding Management System

## Design Approach

**Selected Approach:** Design System - Enterprise Data Management Pattern

**Justification:** This is a utility-focused, information-dense enterprise application requiring efficiency, consistency, and clarity across extensive CRUD operations. Drawing inspiration from **Ant Design** and **Linear** for clean data presentation, **Notion** for organized content hierarchy, and modern admin dashboards for form-heavy interfaces.

**Key Principles:**
- Information clarity over visual flair
- Consistent patterns for rapid learning
- Efficient data entry workflows
- Bilingual (Arabic/English) support with clear RTL/LTR handling

---

## Typography

**Font Stack:**
- Primary: Inter (Google Fonts) - excellent multilingual support, clean at small sizes
- Arabic: Cairo or Tajawal (Google Fonts) - modern Arabic typeface for labels and content
- Monospace: JetBrains Mono - for SKU codes display

**Hierarchy:**
- Page Titles: text-2xl md:text-3xl font-semibold
- Section Headers: text-xl font-semibold
- Table Headers: text-sm font-medium uppercase tracking-wide
- Body/Labels: text-sm md:text-base
- Input Fields: text-base
- SKU Codes: text-sm font-mono
- Helper Text: text-xs

---

## Layout System

**Spacing Primitives:** Use Tailwind units: **2, 4, 6, 8, 12, 16** for consistent rhythm
- Component padding: p-4 to p-6
- Section spacing: mb-8 to mb-12
- Form field gaps: space-y-4
- Table cell padding: px-4 py-3
- Card padding: p-6
- Page container: px-4 md:px-8 max-w-7xl mx-auto

**Grid System:**
- Form layouts: 1-column mobile, 2-3 columns desktop (grid-cols-1 md:grid-cols-2 lg:grid-cols-3)
- Master data tables: Full-width responsive with horizontal scroll
- Dashboard cards: grid-cols-1 sm:grid-cols-2 lg:grid-cols-4

---

## Component Library

### Navigation
- **Top Navigation Bar:**
  - Full-width sticky header with shadow
  - Logo/brand left
  - Horizontal menu items (collapsible hamburger on mobile)
  - Dropdown menus for grouped sections (Master Data submenu: Seasons, Categories, Types, etc.)
  - Consistent height: h-16
  - Padding: px-6

### Data Tables
- **Table Structure:**
  - Striped rows for readability (alternate row styling)
  - Sticky headers on scroll
  - Compact cell padding: px-4 py-3
  - Right-align numeric codes, left-align text
  - Action column (Edit/Delete icons) always visible on right
  - Responsive: horizontal scroll on mobile, full table on desktop

- **Filtering Bar:**
  - Positioned above table
  - Inline filters: dropdowns and search inputs in flex layout
  - Clear filters button on right
  - Spacing: gap-4 flex-wrap

### Forms
- **Form Layout:**
  - Card container with subtle border
  - Two-column grid on desktop (related fields grouped)
  - Full-width on mobile
  - Section dividers for field groups (e.g., "Basic Info", "Classification", "Manufacturing")
  - Clear field labels above inputs
  - Required field indicators (asterisk)

- **Input Fields:**
  - Consistent height: h-10 to h-12
  - Full rounded corners: rounded-lg
  - Border with focus states
  - Dropdowns: Full-width select with chevron icon
  - Text areas: min-h-24
  - Helper text below fields: text-xs

- **SKU Display Fields:**
  - Read-only inputs with monospace font
  - Slightly different styling to indicate non-editable
  - Copy-to-clipboard button inline
  - Three separate fields for: Text SKU, Segmented Numeric, Compact Numeric

### Cards
- **Master Data Cards:**
  - Rounded corners: rounded-lg
  - Border with subtle shadow
  - Padding: p-6
  - Header with title and action button
  - Content area with clear spacing

### Buttons
- **Primary Actions:** rounded-lg px-4 py-2 font-medium
- **Secondary Actions:** border variant with same sizing
- **Icon Buttons:** square p-2 for table actions
- **Button Groups:** gap-2 flex layout

### Modals
- **Delete Confirmation:**
  - Centered overlay with backdrop
  - Compact content: p-6
  - Clear warning message
  - Action buttons at bottom (Cancel/Delete)

### Product Display
- **Product Detail Card:**
  - Header: Product name (Arabic + English)
  - Grid layout showing all attributes in labeled rows
  - SKU section prominently displayed with all three formats
  - Monospace font for all code values
  - Clear visual separation between sections

### Badges & Tags
- **Status Indicators:** rounded-full px-3 py-1 text-xs font-medium
- **Code Badges:** inline-block font-mono text-xs px-2 py-1 rounded

---

## Bilingual Support Patterns

- **Label Structure:** Arabic label primary, English in parentheses or below
- **Form Direction:** Forms adapt RTL/LTR based on content language
- **Tables:** Headers show both languages when space permits
- **Consistent Spacing:** Same padding/margins regardless of text direction

---

## Page-Specific Layouts

### Dashboard/Home
- Statistics cards grid: 4 columns showing counts (Total Products, Seasons, Categories, Factories)
- Recent products table (last 10 items)
- Quick action buttons

### Master Data List Pages
- Page header with title and "Add New" button (right-aligned)
- Filter/search bar
- Data table with edit/delete actions
- Pagination at bottom

### Product List
- Advanced filter panel (collapsible)
- Multi-column table with horizontal scroll
- All SKU formats visible in table
- Bulk action support (future consideration)

### Product Form
- Multi-section form with clear grouping
- All dropdowns showing Arabic names
- Real-time SKU preview as user fills fields
- Prominent save/cancel buttons at top and bottom

### Mapping Token Management
- Simple two-column table: Token | Numeric Code
- Inline editing capability
- Search/filter for tokens
- Validation warnings for missing mappings

---

## Animation Guidelines

**Minimal Animations Only:**
- Dropdown menu transitions: 150ms ease
- Modal fade-in: 200ms
- Table row hover: instant
- No page transitions, no scroll animations
- Focus: subtle shadow/border change only