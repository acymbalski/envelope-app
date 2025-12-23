// =============================================================================
// GIFT CONFIGURATION - Edit this to change your gifts!
// =============================================================================
// Each gift can be either:
//   {type: 'image', content: 'filename.jpg'}  - Shows an image from gifts/ folder
//   {type: 'text', content: 'Description'}     - Shows text in a festive box
// =============================================================================

const GIFTS = [
    {type: 'image', content: 'PXL_20251216_155916023.jpg'},
    {type: 'image', content: 'PXL_20251216_160036481.jpg'},
    {type: 'image', content: 'PXL_20251216_160212345.jpg'},
    {type: 'text', content: 'Masonite shelf covering for your garage steel racks. Supplies & Labor included'},
    {type: 'image', content: 'PXL_20251216_160326473.jpg'}
];

// =============================================================================
// Gift Management System
// =============================================================================
class GiftManager {
    constructor() {
        this.gifts = [];
        this.storageKey = 'christmasGifts';
        this.audioContext = null;
        this.loadState();
    }

    // Initialize audio context (only when needed)
    initAudio() {
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
    }

    // Play a subtle bell sound when opening envelope
    playOpenSound() {
        try {
            this.initAudio();
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);

            // Gentle bell-like sound
            oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(400, this.audioContext.currentTime + 0.3);

            // Very subtle volume
            gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);

            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + 0.3);
        } catch (e) {
            // Silently fail if audio doesn't work
            console.log('Audio not available');
        }
    }

    // Load gifts from the configuration
    async loadGifts() {
        // Use the GIFTS constant defined at the top of the file
        this.gifts = GIFTS;
        this.renderEnvelopes();
    }

    // Load state from localStorage
    loadState() {
        const saved = localStorage.getItem(this.storageKey);
        if (saved) {
            this.state = JSON.parse(saved);
        } else {
            this.state = {
                openedGifts: [], // Array of {index, date} objects
                lastOpenedDate: null
            };
        }
    }

    // Save state to localStorage
    saveState() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.state));
    }

    // Get current date (YYYY-MM-DD) in user's timezone
    getCurrentDate() {
        const now = new Date();
        return now.toLocaleDateString('en-CA'); // en-CA gives YYYY-MM-DD format
    }

    // Check if user can open a gift today
    canOpenToday() {
        const today = this.getCurrentDate();
        return this.state.lastOpenedDate !== today;
    }

    // Check if a specific gift is already opened
    isGiftOpened(index) {
        return this.state.openedGifts.some(gift => gift.index === index);
    }

    // Get next unopened gift index
    getNextUnopened() {
        for (let i = 0; i < this.gifts.length; i++) {
            if (!this.isGiftOpened(i)) {
                return i;
            }
        }
        return null;
    }

    // Open a gift (or re-open if already opened)
    openGift(index, forced = false) {
        const isAlreadyOpened = this.isGiftOpened(index);

        // If already opened, just show it again (no warning needed)
        if (isAlreadyOpened) {
            this.showGiftModal(index);
            return;
        }

        // If trying to open a new gift, check daily limit
        if (!forced && !this.canOpenToday()) {
            this.showWarning(index);
            return;
        }

        // Mark as opened
        const today = this.getCurrentDate();
        this.state.openedGifts.push({ index, date: today });
        this.state.lastOpenedDate = today;
        this.saveState();

        // Play sound
        this.playOpenSound();

        // Animate and show gift
        this.animateEnvelopeOpen(index);
    }

    // Show warning modal
    showWarning(index) {
        const modal = document.getElementById('warningModal');
        const message = document.getElementById('warningMessage');

        message.textContent = "Gifts are intended to be opened one day at a time! Come back tomorrow to open another gift. Or, we can open this one if you are sure you want to continue. Continue?";

        modal.classList.remove('hidden');

        // Set up button handlers
        const cancelBtn = document.getElementById('cancelBtn');
        const continueBtn = document.getElementById('continueBtn');

        const closeWarning = () => {
            modal.classList.add('hidden');
            cancelBtn.onclick = null;
            continueBtn.onclick = null;
        };

        cancelBtn.onclick = closeWarning;

        continueBtn.onclick = () => {
            closeWarning();
            this.openGift(index, true);
        };
    }

    // Animate envelope opening
    animateEnvelopeOpen(index) {
        const envelope = document.querySelector(`[data-index="${index}"]`);
        envelope.classList.add('opening');

        setTimeout(() => {
            envelope.classList.add('opened');
            this.showGiftModal(index);
        }, 600);
    }

    // Show gift in modal
    showGiftModal(index) {
        const modal = document.getElementById('giftModal');
        const display = document.getElementById('giftDisplay');

        const gift = this.gifts[index];

        if (gift.type === 'text') {
            // Display text-based gift
            display.innerHTML = `
                <h2>🎁 Gift #${index + 1}</h2>
                <div class="gift-text">
                    <p>${gift.content}</p>
                </div>
            `;
        } else {
            // Display image-based gift
            display.innerHTML = `
                <h2>🎁 Gift #${index + 1}</h2>
                <img src="gifts/${gift.content}" alt="Gift ${index + 1}">
            `;
        }

        modal.classList.remove('hidden');
    }

    // Render envelopes
    renderEnvelopes() {
        const container = document.getElementById('envelopesContainer');
        container.innerHTML = '';

        this.gifts.forEach((gift, index) => {
            const envelope = document.createElement('div');
            envelope.className = 'envelope';
            envelope.dataset.index = index;

            if (this.isGiftOpened(index)) {
                envelope.classList.add('opened');
            }

            envelope.innerHTML = `
                <div class="envelope-inner">
                    <div class="envelope-front">
                        <div class="envelope-number">${index + 1}</div>
                        <div class="envelope-label">${this.isGiftOpened(index) ? 'Click to View' : 'Click to Open'}</div>
                    </div>
                    <div class="envelope-back">
                        <div class="gift-icon">🎁</div>
                    </div>
                </div>
            `;

            // All envelopes are clickable - opened ones will just show the gift again
            envelope.addEventListener('click', () => this.openGift(index));

            container.appendChild(envelope);
        });
    }

    // Reset all gifts (for testing or starting over)
    resetAllGifts() {
        if (confirm('Are you sure you want to reset all gifts? This will mark all gifts as unopened and you can start fresh!')) {
            this.state = {
                openedGifts: [],
                lastOpenedDate: null
            };
            this.saveState();
            this.renderEnvelopes();
            alert('All gifts have been reset! You can start opening them again.');
        }
    }
}

// Close gift modal
function closeGiftModal() {
    document.getElementById('giftModal').classList.add('hidden');
}

// Reset gifts (exposed globally for the reset button)
function resetGifts() {
    if (giftManager) {
        giftManager.resetAllGifts();
    }
}

// Initialize when page loads
let giftManager;

window.addEventListener('DOMContentLoaded', () => {
    giftManager = new GiftManager();
    giftManager.loadGifts();
});

// Close modals when clicking outside
window.addEventListener('click', (event) => {
    const giftModal = document.getElementById('giftModal');
    const warningModal = document.getElementById('warningModal');

    if (event.target === giftModal) {
        closeGiftModal();
    }

    if (event.target === warningModal) {
        warningModal.classList.add('hidden');
    }
});
