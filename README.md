# 🎄 Christmas Gift Envelope App

A simple, beautiful web app that presents Christmas gifts as virtual envelopes, revealing one gift per day.

## Features

✨ **One Gift Per Day**: Users can open one envelope each day (with warning if they try to open more)
🎨 **Christmas Themed**: Red and white color scheme (colorblind-friendly)
📱 **Responsive Design**: Works on mobile and desktop
🔒 **Persistent Storage**: Remembers which gifts have been opened using localStorage
🎵 **Subtle Sound**: Gentle bell sound when opening envelopes
❄️ **Animated Snowflakes**: Festive background animation
🎁 **Deterministic Order**: Same gifts always appear in same positions

## Quick Start

1. **Add your gift images** to the `gifts/` folder
2. **Update `gifts-list.json`** with your image filenames
3. **Open `index.html`** in a web browser to test
4. **Deploy** using instructions in [DEPLOYMENT.md](DEPLOYMENT.md)

## File Structure

- `index.html` - Main page structure
- `styles.css` - All styling and animations
- `app.js` - Gift management logic
- `gifts-list.json` - List of gift image filenames
- `gifts/` - Folder containing gift images
- `DEPLOYMENT.md` - Detailed deployment instructions

## How It Works

1. Gifts are displayed as clickable envelopes numbered 1-5
2. Each envelope can be clicked to reveal the gift inside
3. After opening one gift, the user must wait until the next day (in their timezone) to open another
4. A warning prompt appears if they try to open multiple gifts in one day
5. Progress is saved in browser localStorage

## Customization

See [DEPLOYMENT.md](DEPLOYMENT.md) for customization options including:
- Changing colors
- Adjusting number of gifts
- Disabling the daily limit warning
- Resetting progress

## Browser Compatibility

Works in all modern browsers that support:
- CSS Grid
- localStorage
- Web Audio API (for sound - gracefully degrades if unavailable)

## License

Free to use and modify as needed!

---

**Merry Christmas!** 🎅🎁
