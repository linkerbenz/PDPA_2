
let isInitialized = false;

export function initGodRays() {
  if (isInitialized) return;
  isInitialized = true;

  addRayStyles();

  const rayContainer = document.createElement('div');
  rayContainer.id = 'god-rays';
  rayContainer.innerHTML = generateRays(15);

  document.body.appendChild(rayContainer);
}

function generateRays(count) {
  const colors = [
    'rgba(255, 215, 0',    // Gold
    'rgba(255, 255, 255',  // White
    'rgba(255, 239, 150',  // Warm Yellow
    'rgba(255, 180, 100'   // Subtle amber/orange
  ];

  return Array.from({ length: count }, (_, i) => {
    // Randomize properties

    // Position: Top-Right origin means we need rays starting from right side mostly
    const left = -20 + Math.random() * 140; // Spread wide to allow angles to cover screen

    const width = 20 + Math.random() * 120;
    const duration = 10 + Math.random() * 20; // Slow, natural
    const delay = Math.random() * -30; // Start at random times

    // Angle: Positive rotation (Clockwise) moves bottom to Left.
    // We want Top-Right -> Bottom-Left.
    const angle = 30 + Math.random() * 20; // 30 to 50 degrees

    const colorBase = colors[Math.floor(Math.random() * colors.length)];
    const maxOpacity = 0.2 + Math.random() * 0.25; // vary intensity

    return `
    <div class="ray" style="
      left: ${left}%;
      width: ${width}px;
      --angle: ${angle}deg;
      --max-opacity: ${maxOpacity};
      background: linear-gradient(180deg, 
        ${colorBase}, ${maxOpacity}) 0%, 
        ${colorBase}, ${maxOpacity * 0.4}) 50%, 
        ${colorBase}, 0) 90%);
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
    "></div>
  `}).join('');
}

function addRayStyles() {
  if (document.getElementById('god-rays-styles')) return;

  const style = document.createElement('style');
  style.id = 'god-rays-styles';
  style.textContent = `
    #god-rays {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 2; 
      overflow: hidden;
    }

    .ray {
      position: absolute;
      top: -50%;
      height: 250%; /* Long enough to pass through screen */
      filter: blur(30px); /* Soft, dreamy blur */
      transform-origin: top center;
      mix-blend-mode: overlay; /* Essential for lighting effect */
      opacity: 0; 
      animation-name: rayLife;
      animation-timing-function: ease-in-out;
      animation-iteration-count: infinite;
    }

    @keyframes rayLife {
      0% {
        opacity: 0;
        transform: rotate(var(--angle)) translateX(-15px);
      }
      20% {
        opacity: var(--max-opacity); /* Fade In */
      }
      50% {
        opacity: var(--max-opacity); /* Hold */
        transform: rotate(var(--angle)) translateX(0px);
      }
      80% {
         opacity: var(--max-opacity) * 0.5;
      }
      100% {
        opacity: 0; /* Fade Out */
        transform: rotate(var(--angle)) translateX(15px); /* Drift */
      }
    }
  `;
  document.head.appendChild(style);
}
