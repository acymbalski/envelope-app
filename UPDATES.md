# Updates & Changes

## December 18, 2024 - Version 1.1

### New Features Added ✨

#### 1. Re-open Previously Opened Gifts
- **What changed:** Opened envelopes now show "Click to View" instead of being disabled
- **How it works:** Click any opened envelope to see the gift again (no animation, just shows the image)
- **Why:** So you can remind yourself what gifts you've already received!

#### 2. Reset Button
- **What changed:** Added a "🔄 Reset" button in the header
- **How it works:** Click it to reset all gifts back to unopened state
- **Confirmation:** Asks "Are you sure?" before resetting
- **Why:** Makes testing easier and lets users start over if needed

#### 3. More Visible Snowflakes
- **What changed:** Snowflakes are now larger, slightly darker gray, and have a subtle glow
- **Why:** Original white snowflakes were invisible against the cream background

#### 4. Deployment Guide Updates
- **What changed:** Added detailed instructions for keeping images private
- **Options:**
  - **Netlify (RECOMMENDED for privacy):** Drag-and-drop, no repo needed, images stay private
  - **GitHub Pages with Private Repo:** Use GitHub Actions to deploy from a private repo
  - **GitHub Pages Public:** Simple but images are visible in the repo
  - **Unraid Server:** Full control, completely private

---

## Technical Changes

### Modified Files:

#### [app.js](app.js)
- **Line 108-134:** Modified `openGift()` to allow re-opening already opened gifts
- **Line 206:** Changed envelope label from "Opened" to "Click to View"
- **Line 215:** Made all envelopes clickable (removed the condition)
- **Line 221-232:** Added `resetAllGifts()` method
- **Line 240-245:** Added global `resetGifts()` function for the button

#### [index.html](index.html)
- **Line 23:** Added reset button in header

#### [styles.css](styles.css)
- **Line 38-46:** Made snowflakes more visible (darker color, larger size, glow effect)
- **Line 91:** Added margin to subtitle
- **Line 94-113:** Added reset button styling

#### [DEPLOYMENT.md](DEPLOYMENT.md)
- **Line 108-217:** Added comprehensive privacy options for GitHub Pages
- **Line 219-234:** Highlighted Netlify as best option for privacy

---

## What Still Works the Same

✅ Daily limit - still can only open one gift per day (with override)
✅ Warning prompt - still appears if trying to open multiple gifts
✅ LocalStorage - still remembers your progress
✅ Deterministic order - gifts still appear in same positions
✅ Timezone aware - still uses your browser's timezone
✅ Mobile responsive - still works great on phones
✅ Subtle sound - still plays when opening new gifts

---

## Testing the New Features

### Test Re-opening Gifts:
1. Open [index.html](index.html)
2. Click an envelope to open it
3. Notice it now says "Click to View" and is grayed out
4. Click it again - gift modal appears instantly (no animation)

### Test Reset Button:
1. Open some gifts
2. Click "🔄 Reset" button in header
3. Confirm the prompt
4. All envelopes are now unopened again!

### Test Snowflakes:
1. Open [index.html](index.html)
2. Look for falling snowflakes against the cream background
3. They should be visible as gray shapes falling down the page

---

## Deployment Recommendations

Given your concern about privacy:

### Option 1: Netlify (EASIEST + MOST PRIVATE) ⭐
1. Go to netlify.com
2. Drag the entire `envelope_app` folder
3. Set domain to xmas.cymbal.ski
4. ✅ Done! Images are NOT in any public repo

### Option 2: GitHub Pages with Private Repo
1. Create PRIVATE repo on GitHub
2. Set up GitHub Actions (see DEPLOYMENT.md)
3. Deploy to Pages via Actions
4. ✅ Images in private repo, site is public

### Option 3: Unraid Server
1. Set up nginx or Apache container
2. Upload files to web root
3. Configure port forwarding and DNS
4. ✅ Completely under your control

---

## Quick Reference

**Open gift again:** Click any opened envelope
**Reset everything:** Click "🔄 Reset" button (or open console and run `localStorage.clear(); location.reload();`)
**Test "tomorrow":** Open console, run:
```javascript
let state = JSON.parse(localStorage.getItem('christmasGifts'));
state.lastOpenedDate = '2000-01-01';
localStorage.setItem('christmasGifts', JSON.stringify(state));
location.reload();
```

---

All changes are backward compatible - any existing opened gifts in localStorage will continue to work!
