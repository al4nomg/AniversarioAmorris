// ── Fondo animado con blobs de color suave ──
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

function resize() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

const blobs = [
  { x:0.10, y:0.10, r:0.42, color:[184,205,216], ox:0.08, oy:0.06, sp:0.00018 },
  { x:0.55, y:0.05, r:0.38, color:[201,216,226], ox:0.07, oy:0.09, sp:0.00014 },
  { x:0.88, y:0.30, r:0.40, color:[232,221,212], ox:0.09, oy:0.06, sp:0.00016 },
  { x:0.75, y:0.85, r:0.45, color:[240,232,224], ox:0.06, oy:0.08, sp:0.00013 },
  { x:0.20, y:0.75, r:0.38, color:[220,210,200], ox:0.08, oy:0.07, sp:0.00017 },
  { x:0.50, y:0.50, r:0.30, color:[245,225,215], ox:0.05, oy:0.07, sp:0.00015 },
];

let t = 0;
function draw() {
  const W = canvas.width, H = canvas.height;
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = '#d8cfc8';
  ctx.fillRect(0, 0, W, H);

  blobs.forEach((b, i) => {
    const phase = i * 1.3;
    const cx = (b.x + Math.sin(t * b.sp * 1000 + phase) * b.ox) * W;
    const cy = (b.y + Math.cos(t * b.sp * 800  + phase) * b.oy) * H;
    const radius = b.r * Math.max(W, H);

    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
    const [r, g, bl] = b.color;
    grad.addColorStop(0,   `rgba(${r},${g},${bl},0.75)`);
    grad.addColorStop(0.5, `rgba(${r},${g},${bl},0.30)`);
    grad.addColorStop(1,   `rgba(${r},${g},${bl},0)`);

    ctx.beginPath();
    ctx.ellipse(cx, cy, radius * 1.1, radius * 0.85, t * 0.00004 + phase, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();
  });

  t++;
  requestAnimationFrame(draw);
}
draw();
