# Testing Checklist

Use this checklist to verify everything works before deploying.

## Pre-Flight Checks

- [ ] All 5 gift images are in the `gifts/` folder
- [ ] `gifts-list.json` has been updated with correct filenames
- [ ] Filenames in `gifts-list.json` match exactly (including case and extension)

## Visual Tests

- [ ] Open `index.html` in a browser
- [ ] 5 envelopes appear on the page
- [ ] Envelopes are numbered 1-5
- [ ] Envelopes have different red shades
- [ ] Snowflakes are falling in the background
- [ ] Page looks good on desktop
- [ ] Page looks good on mobile (use browser dev tools to test)

## Functionality Tests

### Test 1: Opening First Gift
- [ ] Click on envelope #1
- [ ] Envelope flips/animates
- [ ] Gift image appears in a modal
- [ ] Modal can be closed by clicking X or outside
- [ ] Envelope #1 now shows as "Opened" and is grayed out
- [ ] Subtle sound plays (if speakers are on)

### Test 2: Daily Limit Warning
- [ ] Try to click envelope #2 immediately after opening #1
- [ ] Warning modal appears with message about waiting until tomorrow
- [ ] "Cancel" button closes the warning
- [ ] "Continue Anyway" button opens the gift despite warning

### Test 3: Persistence
- [ ] Open a gift
- [ ] Close the browser completely
- [ ] Reopen `index.html`
- [ ] Previously opened gift should still show as opened
- [ ] Can't open another gift today (warning should appear)

### Test 4: Reset Functionality
To test the "next day" functionality without waiting:
1. Open browser console (F12)
2. Run: `localStorage.clear(); location.reload();`
3. All gifts should be reset to unopened

### Test 5: Cross-Device Consistency
- [ ] Note which envelope is #1, #2, etc. on desktop
- [ ] Open page on mobile device (same URL)
- [ ] Same numbered envelopes appear in same positions
- [ ] (Progress will be different since localStorage is per-device)

## Browser Compatibility Tests

Test in multiple browsers if possible:
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (if on Mac/iOS)
- [ ] Mobile Safari (iPhone)
- [ ] Mobile Chrome (Android)

## Edge Cases

### What if JavaScript is disabled?
- Page won't work, but user will see unstyled HTML

### What if localStorage is disabled?
- App will work but won't remember opened gifts between sessions

### What if an image fails to load?
- Broken image icon will appear in modal
- Check browser console (F12) for the error
- Verify filename matches exactly

### What if gifts-list.json is invalid?
- App falls back to assuming gift1.jpg through gift5.jpg exist

## Performance Checks

- [ ] Page loads quickly
- [ ] Animations are smooth
- [ ] No JavaScript errors in console (F12)
- [ ] Images load reasonably fast

## Final Check

- [ ] All tests passed
- [ ] Ready to deploy!

---

## Quick Reset During Testing

To reset and test again:
```javascript
// Open browser console (F12) and run:
localStorage.clear();
location.reload();
```

## Simulate "Next Day" for Testing

To test the daily limit without waiting 24 hours:
```javascript
// Open browser console (F12) and run:
let state = JSON.parse(localStorage.getItem('christmasGifts'));
state.lastOpenedDate = '2000-01-01';  // Set to old date
localStorage.setItem('christmasGifts', JSON.stringify(state));
location.reload();
```

Now you can open another gift!
