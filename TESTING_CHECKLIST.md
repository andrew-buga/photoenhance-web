# PhotoEnhance Web - Comprehensive Testing Checklist

**Dev Server**: http://localhost:3000
**Last Updated**: March 2026

---

## Page Navigation & Load Tests

### Homepage (`/`)
- [ ] **Page loads** - No 404 or errors
- [ ] **Hero section displays** - Main heading visible
- [ ] **Demo showcase visible** - Before/after sliders visible
- [ ] **Feature cards visible** - "Instant quality boost", "Built for ecommerce", "No signup" cards display
- [ ] **Navigation header** - Logo, links, theme toggle visible
- [ ] **Footer visible** - Copyright, links, social buttons visible
- [ ] **Sticky CTA visible** (on mobile) - Bottom "Enhance photo" button visible
- [ ] **Theme toggle works** - Dark/light mode switches (check var(--bg) colors change)

### Enhance Tool (`/enhance`)
- [ ] **Page loads with full editor interface**
- [ ] **Upload area visible** - Dashed border box with "Drop your photo here" text
- [ ] **"Choose a photo" button** - Clickable file input button
- [ ] **Before/After slider section** (after upload) - Shows in preview area
- [ ] **Scale options** - Buttons for x2, x4, x6 appear after image upload
- [ ] **Download button** - Shows after enhancement completes
- [ ] **Sidebar advertisement** - Ad slot container visible
- [ ] **Overlay advertisement modal** - Appears with skip timer during processing

### Blog/SEO Article (`/how-to-upscale-image`)
- [ ] **Article loads**
- [ ] **Heading visible**
- [ ] **Content paragraphs display**
- [ ] **Related links in article**

### Legal Pages
- [ ] **Privacy Policy (`/privacy`)** - Loads with content
- [ ] **Terms (`/terms`)** - Loads with legal text
- [ ] **Cookies Policy (`/cookies`)** - Loads with cookie explanation
- [ ] **Privacy Policy 2 (`/privacy-policy`)** - Loads (check if duplicate needed)

### Contact (`/contact`)
- [ ] **Page loads** (if implemented)
- [ ] **Contact form displays** (if implemented)
- [ ] **Submit button works** (if implemented)

---

## Interactive Features

### Image Upload & Handling

#### File Input
- [ ] **Click "Choose a photo" button** - Opens file picker
- [ ] **Select valid image** (JPG, PNG, WebP) - Image loads in preview
- [ ] **Try invalid file type** (TXT, PDF) - Should show error
- [ ] **Try oversized file** (>12MB) - Should show error message

#### Drag & Drop
- [ ] **Drag image to drop zone** - File loads in preview
- [ ] **Drag non-image file** - Should not load
- [ ] **Visual feedback** - Drop zone changes appearance during drag

#### Clipboard Paste
- [ ] **Copy image to clipboard** - Press Ctrl+V to paste
- [ ] **Pasted image loads** - Preview shows pasted image
- [ ] **Only images accepted** - Text/other clipboard content ignored

#### Image Display
- [ ] **Original image dimensions show** - "Original: 800x600 px" displays
- [ ] **Correct dimensions for pasted image** - Shows actual pasted image size

### Scale Selection
- [ ] **x2 button** - Selects 2x scale, shows new output size
- [ ] **x4 button** - Selects 4x scale (default), shows new output size  
- [ ] **x6 button** - Selects 6x scale, shows new output size
- [ ] **Output size calculates correctly** - Width & height multiplied by scale
- [ ] **Active button styling** - Selected scale button highlighted

### Download/Enhancement Process

#### Start Download
- [ ] **Click "Download" button** - Processing starts
- [ ] **Progress bar appears** - Shows 8% ... 100%
- [ ] **"Enhancing image..." message** - Displays during processing
- [ ] **Processing takes ~4-6 seconds** - Reasonable processing time

#### Ad Modal During Processing
- [ ] **Ad modal appears** - "Sponsored" header visible
- [ ] **Skip button has timer** - Shows "Skip (4)" countdown
- [ ] **Skip button enabled after countdown** - Can click after timer ends
- [ ] **Clicking Skip** - Modal closes, processing continues
- [ ] **Almost done message** - Shows "Keep this tab open" message
- [ ] **Modal closes when ad skipped** - No longer visible

#### Completion
- [ ] **Before/After slider displays** - Shows original vs enhanced side-by-side
- [ ] **"Ready" badge appears** - Green up-badge near "Result" heading
- [ ] **Download button shows** - "Download enhanced photo" link visible
- [ ] **Enhanced filename correct** - Downloads as `original_x4.jpg` (or chosen scale)
- [ ] **"Enhance another photo" button** - Resets tool for next image

#### Download File
- [ ] **File downloads** - Browser downloads upscaled image
- [ ] **File is larger** - Upscaled image bigger than original
- [ ] **File has correct dimensions** - Image size matches output size shown
- [ ] **Image quality acceptable** - Visual inspection of upscaled image

### Error Handling
- [ ] **Large file (>12MB)** - Shows "File size exceeds 12MB limit"
- [ ] **Invalid file type** - Shows "Only image files are supported"
- [ ] **Network error** - Shows "Processing failed. Please try another image."
- [ ] **Error persists** - Can try uploading again without page refresh

### Theme Toggle
- [ ] **Dark mode button** - Click toggles dark mode
- [ ] **Light mode button** - Click toggles light mode
- [ ] **Colors change** - Background, text, border colors adjust
- [ ] **Preference persists** (optional) - Theme stays on refresh

### Header Navigation
- [ ] **Logo clickable** - Returns to homepage
- [ ] **All navigation links work** - Enhance, Blog, Privacy, Terms, Cookies, Contact
- [ ] **Active page highlighted** - Current page shows as active in nav
- [ ] **Mobile menu** (if exists) - Hamburger menu works on small screens

### Footer Links
- [ ] **All footer links clickable** - Privacy, Terms, Cookies, Contact
- [ ] **Links go to correct pages** - Verify URLs match routes
- [ ] **Copyright text displays** - Year and company name visible

---

## Component Behavior

### Before/After Slider
- [ ] **Slider visible** - Both before and after images show
- [ ] **Drag slider handle** - Can drag slider left/right
- [ ] **Smooth animation** - Slider moves smoothly
- [ ] **Accessibility** - Can use keyboard to control slider
- [ ] **Shows correct images** - Before = original, After = upscaled

### Demo Showcase (Homepage)
- [ ] **Demo sliders load** - All demo before/after sliders visible
- [ ] **Demo sliders interactive** - Can drag them
- [ ] **Multiple demos visible** - Shows 3+ example upscales
- [ ] **Images load** - All demo images display correctly

### Ad Placeholders
- [ ] **Sidebar ad slot visible** (if ads configured) - Container appears with ad
- [ ] **Overlay ad slot visible** - Modal during processing shows ad space
- [ ] **Ad containers sized correctly** - Proper dimensions for ad content
- [ ] **No broken ad errors** - Console has no ad-related errors (unless ads not configured)

### Cookie Banner (if shown)
- [ ] **Cookie banner displays** - On first visit or if not set
- [ ] **"Accept" button** - Accept button clickable
- [ ] **"Decline" button** - Decline button clickable
- [ ] **Banner dismisses** - Disappears after choice
- [ ] **Analytics disabled until accepted** - GA not sending data if declined

---

## Analytics Tracking

### Event Tracking (DevTools Console)
- [ ] **Open DevTools (F12)** - Developer console ready
- [ ] **Go to Network tab** - Ready to see API calls
- [ ] **Upload image** - Check for GA event
- [ ] **Click scale button** - Event fires
- [ ] **Click Download** - Event fires
- [ ] **Download completes** - Success event fires
- [ ] **Check GA4 dashboard** - Events appear in real-time (if GA4 configured)

---

## API Endpoints

### POST /api/upscale
- [ ] **Upload image via form** - POST request sent
- [ ] **API returns response** - `{ outputUrl, provider }`
- [ ] **Provider is "replicate"** (if token set) OR **"fallback"** (if no token)
- [ ] **Output URL valid** - Returns image data URL or HTTPS URL
- [ ] **Error handling** - Bad requests return error message

---

## Build & Production

### Build Process
- [ ] **npm run build** - Builds without errors
- [ ] **No TypeScript errors** - Build completes successfully
- [ ] **No missing dependencies** - All imports resolve
- [ ] **Next.js optimizations** - Images optimized, code split

### Production Start
- [ ] **npm run start** - Production server starts
- [ ] **Site accessible** - Port 3000 accessible
- [ ] **All pages load** - No 404s in production
- [ ] **Performance good** - Page load time acceptable (<3s)

---

## Accessibility

### Keyboard Navigation
- [ ] **Tab through page** - All interactive elements reachable
- [ ] **Space/Enter to click buttons** - Button activation works
- [ ] **Focus visible** - Focus ring shows on keyboard focus

### Screen Reader
- [ ] **Headings announce correctly** - H1, H2, etc. properly structured
- [ ] **Alt text on images** - Demo images have alt text
- [ ] **Form labels** - File input has associated label
- [ ] **Buttons have text** - Not just icons

### Color Contrast
- [ ] **Text readable** - Good contrast on all backgrounds
- [ ] **Buttons visible** - Active/inactive states distinguishable
- [ ] **Links underlined or clearly marked** - Visual distinction from plain text

---

## Mobile Responsiveness

### Phone (360-480px)
- [ ] **Layout stacks vertically** - Single column
- [ ] **Buttons properly sized** - Minimum 44px tap target
- [ ] **Text readable** - Font sizes appropriate
- [ ] **Upload area wraps** - Doesn't overflow
- [ ] **Sticky CTA visible** - Bottom button for enhance
- [ ] **Modal closes without issues** - Ad modal responsive

### Tablet (768px)
- [ ] **Two-column layout** if applicable
- [ ] **Sidebar visible** - Ad sidebar appears
- [ ] **All content accessible** - No missing elements
- [ ] **Touch-friendly** - Buttons easy to tap

### Desktop (1920px)
- [ ] **Full layout** - All elements visible
- [ ] **Sidebar on right** - Ad sidebar shows
- [ ] **No overflow** - Horizontal scroll not needed
- [ ] **Spacing appropriate** - Not too cramped

---

## Performance

### Load Times
- [ ] **Homepage loads** - < 3 seconds (perceived)
- [ ] **Enhance page loads** - < 2 seconds  
- [ ] **Image processing** - 4-6 seconds typical
- [ ] **Slider animations smooth** - 60 FPS animations

### Bundle Size
- [ ] **Check network tab** - App JS bundle reasonable
- [ ] **Images optimized** - Demo images compressed
- [ ] **No duplicate dependencies** - Package-lock.json clean

### Memory Usage
- [ ] **Long session** - Memory doesn't constantly increase
- [ ] **Multiple uploads** - No memory leaks with repeated uploads
- [ ] **DevTools Memory tab** - Heap size stable

---

## Browser Compatibility

Test on multiple browsers:
- [ ] **Chrome/Edge (latest)** - Full functionality
- [ ] **Firefox (latest)** - Full functionality  
- [ ] **Safari (latest)** - Full functionality
- [ ] **Mobile Safari** - Touch functionality works
- [ ] **Chrome Mobile** - Touch functionality works

---

## Final Verification Checklist

- [ ] **All pages load without 404**
- [ ] **All buttons are clickable and functional**
- [ ] **Image upload works (file, drag, paste)**
- [ ] **Image processing completes**
- [ ] **Download saves file correctly**
- [ ] **No server errors (500s)**
- [ ] **No console errors in DevTools**
- [ ] **No mixed content (HTTP in HTTPS)**
- [ ] **Mobile layout responsive**
- [ ] **Analytics events firing**
- [ ] **AdSense configured (or removed if not using)**
- [ ] **Accessibility standards met**

---

## Quick Test Script

Run these steps for a full quick test:

```
1. npm run dev                    # Start dev server
2. Open http://localhost:3000    # Homepage test
3. Click "Enhance" in nav        # Go to enhance tool
4. Drag/drop an image           # Test upload
5. Select x4 scale              # Test scale selection
6. Click Download               # Start processing
7. Wait for completion          # Watch progress
8. Click "Enhance another"      # Test reset
9. Check console (F12)          # Verify no errors
10. Check Network tab            # Verify API calls work
11. npm run build                # Test production build
12. npm run start                # Test production start
```

---

## Notes

- **Replicate Token Status**: Not configured - upscaling uses local canvas fallback
- **AdSense Status**: Not configured - no ads will display
- **Analytics Status**: ✅ Configured with G-KQ4MZMLV8J
- **Next.js Version**: 16.1.7 with Turbopack
- **Node Version**: Check with `node --version`

---

## Report Issues

If any test fails:
1. Check browser console (F12) for errors
2. Check terminal where `npm run dev` runs for server errors
3. Verify `.env.local` has required values
4. Check internet connection (for external APIs)
5. Try clearing browser cache (Ctrl+Shift+Delete)
