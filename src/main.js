/**
 * PDPA_2 Landing Logic
 * Implementing 3-section vertical scroll (Canopy -> Trunk -> Root)
 */

import { initLeafEffects } from './components/LeafEffects.js';
import { initGodRays } from './components/GodRays.js';



const SECTIONS = ['canopy', 'trunk', 'root']; // 0: Top, 1: Middle, 2: Bottom
let currentIndex = 2; // Default to 'root' (bottom)

const scrollWrapper = document.getElementById('scroll-wrapper');
const btnUp = document.getElementById('nav-up');
const btnDown = document.getElementById('nav-down');

function updateView() {
    // Current Index 0 = Top (Canopy), 1 = Trunk, 2 = Root
    // But CSS layout is:
    // [0] Canopy
    // [1] Trunk
    // [2] Root
    //
    // To show Root (index 2), we need to translate Y to show the bottom third.
    // Viewport H = 100%. Wrapper H = 300%.
    // Show Root: translateY(-200%)? No, wait. 
    //   0%  -> Top of Canopy
    // -33.33% -> Top of Trunk
    // -66.66% -> Top of Root (which is the bottom section)

    const percentage = -(currentIndex * (100 / 3));
    scrollWrapper.style.transform = `translateY(${percentage}%)`;

    // Update Buttons
    btnUp.disabled = currentIndex === 0;   // Cant go up from Canopy
    btnDown.disabled = currentIndex === 2; // Cant go down from Root
}

function goUp() {
    if (currentIndex > 0) {
        currentIndex--;
        updateView();
    }
}

function goDown() {
    if (currentIndex < 2) {
        currentIndex++;
        updateView();
    }
}

// Event Listeners
if (btnUp) btnUp.addEventListener('click', goUp);
if (btnDown) btnDown.addEventListener('click', goDown);

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') goUp();
    if (e.key === 'ArrowDown') goDown();
});

// Initial Render
updateView();

console.log('PDPA_2 Landing Initialized: Root Section');

// Initialize Effects
initLeafEffects();
initGodRays();

// Card Flip Interaction
document.querySelectorAll('.leaf-card').forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('flipped');
    });
});

// Apply generated leaf texture to cards
import { generateLeafTextureUrl } from './components/LeafEffects.js';
document.querySelectorAll('.card-front').forEach(el => {
    el.style.backgroundImage = `url("${generateLeafTextureUrl()}")`;
});
