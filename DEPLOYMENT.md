# Christmas Gifts App - Deployment Guide

## Project Setup Complete! ✓

Your Christmas gift envelope app is ready to deploy. Here's everything you need to know.

---

## 📁 Project Structure

```
envelope_app/
├── index.html          # Main HTML file
├── styles.css          # Styling and animations
├── app.js             # JavaScript logic
├── gifts-list.json    # List of gift image filenames
├── gifts/             # Put your gift images here!
│   ├── gift1.jpg
│   ├── gift2.jpg
│   ├── gift3.jpg
│   ├── gift4.jpg
│   └── gift5.jpg
└── DEPLOYMENT.md      # This file
```

---

## 🎁 Step 1: Add Your Gift Images

1. Place your 5 gift images in the `gifts/` folder
2. Name them whatever you want (they'll be sorted alphabetically)
3. Update `gifts-list.json` with the actual filenames

**Example:**
If your images are named:
- beach_photo.jpg
- concert_tickets.jpg
- dinner_voucher.jpg
- new_headphones.jpg
- spa_day.jpg

Update `gifts-list.json` to:
```json
{
  "gifts": [
    "beach_photo.jpg",
    "concert_tickets.jpg",
    "dinner_voucher.jpg",
    "new_headphones.jpg",
    "spa_day.jpg"
  ]
}
```

**Important:** The order in this file determines which gift appears in which envelope! Gift #1 will always be the first file in the list, etc.

---

## 🖥️ Step 2: Deployment Options

### Option A: Unraid Server (Your Original Plan)

#### Prerequisites:
- Unraid server running
- A web server docker container (nginx, Apache, or similar)

#### Steps:

1. **Install a Web Server on Unraid** (if you don't have one):
   - Go to Unraid's Docker tab
   - Search for and install **nginx** or **linuxserver/nginx**
   - Configure the container with:
     - Host Port: `8080` (or any available port)
     - Container Port: `80`
     - Volume mapping: `/path/on/unraid/webroot` → `/usr/share/nginx/html`

2. **Upload Your Files**:
   - Copy the entire `envelope_app` folder to your Unraid server
   - Place it in the web server's document root
   - Example path: `/mnt/user/appdata/nginx/www/xmas/`

3. **Test Locally**:
   - Access `http://your-unraid-ip:8080/xmas/` from your browser
   - Make sure all images load correctly

4. **Set Up Subdomain**:
   - Log in to your domain registrar (where you bought cymbal.ski)
   - Add a new **A Record** or **CNAME**:
     - Name: `xmas`
     - Type: `A`
     - Value: Your Unraid server's public IP address
     - TTL: Automatic or 3600

5. **Configure Reverse Proxy** (if using one):
   - If you use something like Nginx Proxy Manager or Swag:
     - Create a new proxy host for `xmas.cymbal.ski`
     - Point it to your nginx container on port 8080
     - Enable SSL/HTTPS (recommended)

6. **Firewall/Port Forwarding**:
   - Ensure port 80 (and 443 if using HTTPS) is forwarded to your Unraid server
   - Configure your router to forward these ports

### Option B: GitHub Pages (Simpler Alternative)

GitHub Pages is **FREE** and perfect for static sites like this!

#### Important: Keeping Images Private

**Note:** GitHub Pages requires a public repository, which means anyone can see your gift images in the repo. Here are your options:

**Option B1: Private Repository (Recommended)**
- Make repo **private** and use **GitHub Actions** to deploy to Pages
- Your images stay private in the repo
- The live site is public at your subdomain
- See "GitHub Pages with Private Repo" section below

**Option B2: Public Repository with Encrypted Images**
- Keep repo public but encrypt/obscure image filenames
- Images are publicly accessible but hard to find without knowing exact URLs
- Simpler but less secure

**Option B3: External Image Hosting**
- Host images elsewhere (Google Drive, Dropbox, private server)
- Update `gifts-list.json` to use full URLs
- Repo can be public without exposing images

---

#### GitHub Pages with Private Repo (RECOMMENDED)

1. **Create GitHub Repository**:
   ```bash
   cd c:\projects\envelope_app
   git init
   git add .
   git commit -m "Initial commit - Christmas gifts app"
   ```

2. **Create PRIVATE repo on GitHub.com**:
   - Go to github.com and create a new repository
   - Name it `christmas-gifts`
   - **Set visibility to PRIVATE**
   - Don't initialize with README

3. **Push Your Code**:
   ```bash
   git remote add origin https://github.com/YOUR-USERNAME/christmas-gifts.git
   git branch -M main
   git push -u origin main
   ```

4. **Create GitHub Actions Workflow**:
   - In your repo, go to Actions tab
   - Click "Set up a workflow yourself"
   - Name it `.github/workflows/deploy.yml`
   - Paste this content:
   ```yaml
   name: Deploy to GitHub Pages

   on:
     push:
       branches: [ main ]
     workflow_dispatch:

   permissions:
     contents: read
     pages: write
     id-token: write

   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - uses: actions/configure-pages@v4
         - uses: actions/upload-pages-artifact@v3
           with:
             path: '.'
         - uses: actions/deploy-pages@v4
   ```
   - Commit this file

5. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Source: Select "GitHub Actions"
   - Wait 2-3 minutes for deployment

6. **Access Your Site**:
   - Visit: `https://YOUR-USERNAME.github.io/christmas-gifts/`
   - Your images are now public at the URL but remain private in the repo!

7. **Point Your Subdomain**:
   - In your domain registrar, add a CNAME record:
     - Name: `xmas`
     - Type: `CNAME`
     - Value: `YOUR-USERNAME.github.io`
     - TTL: Automatic
   - In GitHub repo Settings → Pages:
     - Custom domain: `xmas.cymbal.ski`
     - Check "Enforce HTTPS"

---

#### GitHub Pages with Public Repo (Simpler but Images are Visible)

If you don't mind images being in a public repo:

1-3. Same as above but create a **PUBLIC** repository

4. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Source: Deploy from branch `main`
   - Folder: `/ (root)`
   - Click Save

5-6. Same as private repo steps 6-7

### Option C: Netlify (Also Simple and Free - KEEPS IMAGES PRIVATE!)

**Best for privacy:** Netlify lets you deploy without exposing source code!

1. **Sign up at netlify.com** (free account)
2. **Drag and drop** your entire `envelope_app` folder into Netlify
3. Your site is instantly live (no repo needed!)
4. **Set custom domain** to `xmas.cymbal.ski` in Site Settings
5. Netlify will give you DNS instructions
6. Enable HTTPS (automatic)

**Advantages:**
- ✅ Images stay private (not in a public repo)
- ✅ Drag-and-drop deployment (no git needed)
- ✅ Automatic HTTPS
- ✅ Easy updates (just drag new files)

### Option D: Simple Python Server (Local Testing Only)

For testing before deployment:
```bash
cd c:\projects\envelope_app
python -m http.server 8000
```
Visit: `http://localhost:8000`

**Note:** This won't be accessible from outside your network!

---

## 🔒 Security Considerations

- **No sensitive data**: Everything is client-side, stored in browser localStorage
- **No backend**: Pure static files, very secure
- **HTTPS recommended**: Especially if on public internet (GitHub Pages and Netlify provide this free)

---

## 🧪 Testing Before Going Live

1. **Test on desktop browser**: Make sure all envelopes display correctly
2. **Test on mobile**: Check responsive design
3. **Test the warning**: Try opening two gifts in one day
4. **Test localStorage**: Open a gift, close browser, reopen - should remember
5. **Test different devices**: localStorage is per-device, so gifts should open in same order

---

## 🔧 Customization Tips

### Change the Number of Gifts:
1. Add/remove images from `gifts/` folder
2. Update `gifts-list.json` with the new list

### Change Colors:
Edit the CSS variables in `styles.css`:
```css
:root {
    --primary-red: #c41e3a;    /* Main red color */
    --dark-red: #8b0000;       /* Darker red */
    --white: #ffffff;          /* White */
}
```

### Disable the Warning:
In `app.js`, find the `openGift()` method and change:
```javascript
if (!forced && !this.canOpenToday()) {
```
to:
```javascript
if (false) {  // Warning disabled
```

### Reset Everything:
Open browser console (F12) and run:
```javascript
localStorage.clear();
location.reload();
```

---

## 🐛 Troubleshooting

### Images Not Loading:
- Check that image filenames in `gifts-list.json` match exactly (case-sensitive!)
- Ensure images are in the `gifts/` folder
- Check browser console (F12) for errors

### Envelopes Not Appearing:
- Check browser console for JavaScript errors
- Make sure `gifts-list.json` is valid JSON
- Try clearing cache and hard refresh (Ctrl+F5)

### LocalStorage Issues:
- User must enable cookies/storage in browser
- Won't work in private/incognito mode
- Each device has separate storage

### DNS Not Working:
- DNS changes can take 24-48 hours to propagate
- Check with: `nslookup xmas.cymbal.ski`
- Try accessing from different network/device

---

## 📱 How It Works (For Reference)

1. **Deterministic Order**: Gifts are sorted alphabetically by filename, so gift #1 is always the first alphabetically
2. **Daily Limit**: Uses browser's timezone to determine "today"
3. **Persistence**: localStorage keeps track of which gifts are opened and when
4. **Cross-Device**: Same subdomain on different devices = separate progress (by design, using localStorage)

---

## 🎄 Ready to Deploy!

Choose your deployment method above and follow the steps. I recommend **GitHub Pages** for simplicity, or **Unraid** if you want full control.

**Questions? Issues?** Check the troubleshooting section or modify the code as needed!

Good luck, and Merry Christmas! 🎁
