
let isInitialized = false;

export function initLeafEffects() {
  if (isInitialized) return;
  isInitialized = true;

  addLeafStyles();

  const leafDiv = document.createElement('div');
  leafDiv.id = 'leaf-effects';
  leafDiv.innerHTML = generateLeaves(30);
  document.body.insertBefore(leafDiv, document.body.firstChild);
}

// Leaf SVG path (simple generic leaf shape)
export const leafPath = "M15,0 C5,5 0,15 0,25 C0,40 10,50 15,60 C20,50 30,40 30,25 C30,15 25,5 15,0 Z M15,0 L15,60";

export function generateLeafTextureUrl() {
  const width = 300;
  const height = 400; // Aspect ratio of card roughly
  const count = 40; // Number of leaves in pile

  const colors = [
    '#5a8c4f', // Fresh Green
    '#4a7c59', // Mid Green
    '#6b8c42', // Yellow-Green
    '#8cbf68'  // Lighter Green (Highlight)
  ];

  let svgContent = '';

  for (let i = 0; i < count; i++) {
    const color = colors[Math.floor(Math.random() * colors.length)];
    const x = Math.random() * width;
    const y = Math.random() * height;
    const rotation = Math.random() * 360;
    const scale = 0.8 + Math.random() * 0.8; // 0.8x to 1.6x

    // Add leaf
    svgContent += `<g transform="translate(${x}, ${y}) rotate(${rotation}) scale(${scale})">
      <path d="${leafPath}" fill="${color}" opacity="0.95" />
      <path d="M15,0 L15,60" stroke="rgba(0,0,0,0.3)" stroke-width="1" fill="none" />
    </g>`;
  }

  const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <rect width="100%" height="100%" fill="#1a2b1f"/> <!-- Darker base -->
    ${svgContent}
  </svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`;
}

function generateLeaves(count) {
  const colors = [
    '#5a8c4f', // Fresh Green
    '#2d4a35', // Dark Green
    '#8c6d3f', // Brown
    '#6b8c42'  // Yellow-Green
  ];

  return Array.from({ length: count }, (_, i) => {
    // Randomize size 
    const size = 20 + Math.random() * 20; // 20px to 40px

    // Random Start Position
    const left = Math.random() * 100;

    // Animation durations
    const duration = 15 + Math.random() * 15; // 15-30s fall
    const delay = -(Math.random() * 30); // Start mid-fall
    const swayDuration = 5 + Math.random() * 4; // 5-9s sway cycle

    const color = colors[Math.floor(Math.random() * colors.length)];
    const rotation = Math.random() * 360;

    // Nested structure to isolate transforms and avoid conflicts
    // Wrapper 1: Falling (Top -> Bottom)
    // Wrapper 2: Swaying (Left <-> Right)
    // Inner: Static Rotation + SVG

    return `
    <div class="leaf-fall-wrapper" style="
      left: ${left}%;
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
    ">
      <div class="leaf-sway-wrapper" style="
        animation-duration: ${swayDuration}s;
        animation-delay: ${Math.random() * -5}s;
      ">
        <div class="leaf-visual" style="
          width: ${size}px;
          height: ${size * 1.5}px;
          transform: rotate(${rotation}deg);
          color: ${color};
        ">
          <svg viewBox="0 0 30 60" width="100%" height="100%" style="fill: currentColor; overflow: visible;">
            <path d="${leafPath}" />
            <path d="M15,0 L15,60" stroke="rgba(0,0,0,0.2)" stroke-width="1" fill="none" />
          </svg>
        </div>
      </div>
    </div>
  `}).join('');
}

function addLeafStyles() {
  if (document.getElementById('leaf-effects-styles')) return;

  const style = document.createElement('style');
  style.id = 'leaf-effects-styles';
  style.textContent = `
    #leaf-effects {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1; 
      overflow: hidden;
    }

    .leaf-fall-wrapper {
      position: absolute;
      top: -10%;
      animation: leafFall linear infinite;
    }

    .leaf-sway-wrapper {
      animation: leafSway ease-in-out infinite alternate;
    }
    
    .leaf-visual {
      /* This holds the rotation and size, static relative to the parent */
      filter: drop-shadow(0 2px 3px rgba(0,0,0,0.1));
      opacity: 0.9;
    }

    @keyframes leafFall {
      0% {
        top: -15%;
      }
      100% {
        top: 115%;
      }
    }

    @keyframes leafSway {
      0% {
        transform: translateX(-40px) rotate(-10deg);
      }
      100% {
        transform: translateX(40px) rotate(10deg);
      }
    }
  `;
  document.head.appendChild(style);
}
