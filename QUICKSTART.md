# 🚀 Quick Start Guide

Get your Christmas gift app running in 5 minutes!

## Step 1: Add Your Gift Images (2 minutes)

### Option A: Use Your Own Images
1. Copy your 5 gift images into the `gifts/` folder
2. Open `gifts-list.json` and update with your actual filenames:
   ```json
   {
     "gifts": [
       "your-first-image.jpg",
       "your-second-image.jpg",
       "your-third-image.jpg",
       "your-fourth-image.jpg",
       "your-fifth-image.jpg"
     ]
   }
   ```

### Option B: Generate Test Images First
1. Open `create-test-images.html` in your browser
2. Click "Generate Test Images"
3. Download all 5 images and save them in the `gifts/` folder
4. `gifts-list.json` is already configured for these test images

## Step 2: Test Locally (1 minute)

Simply open `index.html` in your web browser!

- Double-click `index.html`, OR
- Right-click → Open with → Chrome/Firefox/Edge

You should see 5 envelopes. Click one to test!

## Step 3: Deploy (2 minutes)

Choose the easiest option for you:

### Easiest: GitHub Pages (FREE)
1. Create a GitHub account if you don't have one
2. Create a new repository called `christmas-gifts`
3. Upload all files (or use git if you know it)
4. Go to Settings → Pages → Enable Pages
5. Visit `https://your-username.github.io/christmas-gifts/`

### For Your Subdomain (xmas.cymbal.ski):
- Add a CNAME record pointing `xmas` to `your-username.github.io`
- In GitHub Pages settings, set custom domain to `xmas.cymbal.ski`

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions!

## That's It! 🎉

Your app is ready to use. The recipient can now open one gift per day!

---

## Need Help?

- **Testing**: See [TESTING.md](TESTING.md)
- **Deployment**: See [DEPLOYMENT.md](DEPLOYMENT.md)
- **Customization**: Edit the files directly or ask for help!

## Common Issues

**Images not showing?**
- Check that filenames in `gifts-list.json` match exactly
- Filenames are case-sensitive!

**Envelopes not appearing?**
- Open browser console (F12) and check for errors
- Make sure `gifts-list.json` is valid JSON

**Want to reset for testing?**
- Open browser console (F12)
- Run: `localStorage.clear(); location.reload();`

---

Enjoy! 🎄🎁
