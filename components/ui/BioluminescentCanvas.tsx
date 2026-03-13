"use client";

import { useEffect, useRef, useCallback } from "react";

const COLORS = {
  green: { r: 10, g: 177, b: 114 },
  purple: { r: 85, g: 35, b: 222 },
  gold: { r: 212, g: 162, b: 70 },
};

type RGB = { r: number; g: number; b: number };

interface ParticleData {
  x: number;
  y: number;
  color: RGB;
  radius: number;
  baseRadius: number;
  vx: number;
  vy: number;
  alpha: number;
  baseAlpha: number;
  pulseSpeed: number;
  pulseOffset: number;
  life: number;
  maxLife: number;
  isBurst: boolean;
}

interface ShockwaveData {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  life: number;
  speed: number;
}

function createParticle(
  canvasW: number,
  canvasH: number,
  x?: number,
  y?: number,
  color?: RGB,
  opts: {
    vx?: number;
    vy?: number;
    radius?: number;
    alpha?: number;
    life?: number;
    isBurst?: boolean;
  } = {}
): ParticleData {
  const radius = opts.radius ?? 1 + Math.random() * 2.5;
  const alpha = opts.alpha ?? 0.1 + Math.random() * 0.4;
  return {
    x: x ?? Math.random() * canvasW,
    y: y ?? Math.random() * canvasH,
    color: color ?? COLORS.green,
    radius,
    baseRadius: radius,
    vx: opts.vx ?? (Math.random() - 0.5) * 0.3,
    vy: opts.vy ?? (Math.random() - 0.5) * 0.3 - 0.1,
    alpha,
    baseAlpha: alpha,
    pulseSpeed: 0.5 + Math.random() * 2,
    pulseOffset: Math.random() * Math.PI * 2,
    life: opts.life ?? Infinity,
    maxLife: opts.life ?? Infinity,
    isBurst: opts.isBurst ?? false,
  };
}

function pickColor(): RGB {
  const roll = Math.random() * 100;
  if (roll < 55) return COLORS.purple;
  if (roll < 80) return COLORS.gold;
  return COLORS.green;
}

export interface BioluminescentCanvasRef {
  burst: (x: number, y: number, count?: number) => void;
}

export default function BioluminescentCanvas({
  canvasRef,
}: {
  canvasRef: React.MutableRefObject<BioluminescentCanvasRef | null>;
}) {
  const particleCanvasRef = useRef<HTMLCanvasElement>(null);
  const shockwaveCanvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<ParticleData[]>([]);
  const shockwavesRef = useRef<ShockwaveData[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const rafRef = useRef<number>(0);
  const startTimeRef = useRef(performance.now());

  const burst = useCallback((x: number, y: number, count = 30) => {
    for (let i = 0; i < count; i++) {
      const angle =
        (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.8;
      const speed = 1.5 + Math.random() * 3.5;
      const color =
        Math.random() < 0.6
          ? COLORS.purple
          : Math.random() < 0.4
            ? COLORS.gold
            : COLORS.green;
      particlesRef.current.push(
        createParticle(0, 0, x, y, color, {
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: 1 + Math.random() * 2.5,
          alpha: 0.5 + Math.random() * 0.5,
          life: 35 + Math.random() * 35,
          isBurst: true,
        })
      );
    }
    shockwavesRef.current.push({
      x,
      y,
      radius: 0,
      maxRadius: count > 20 ? 280 : 100,
      life: 1,
      speed: 5,
    });
  }, []);

  useEffect(() => {
    canvasRef.current = { burst };
  }, [canvasRef, burst]);

  useEffect(() => {
    const pCanvas = particleCanvasRef.current;
    const swCanvas = shockwaveCanvasRef.current;
    if (!pCanvas || !swCanvas) return;

    const pCtx = pCanvas.getContext("2d")!;
    const swCtx = swCanvas.getContext("2d")!;

    function resize() {
      const section = pCanvas!.parentElement;
      if (!section) return;
      const w = section.offsetWidth;
      const h = section.offsetHeight;
      pCanvas!.width = w;
      pCanvas!.height = h;
      swCanvas!.width = w;
      swCanvas!.height = h;
    }

    resize();
    window.addEventListener("resize", resize);

    // Spawn ambient particles
    const w = pCanvas.width;
    const h = pCanvas.height;
    for (let i = 0; i < 120; i++) {
      particlesRef.current.push(createParticle(w, h, undefined, undefined, pickColor()));
    }

    const handleMouse = (e: MouseEvent) => {
      const rect = pCanvas!.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    window.addEventListener("mousemove", handleMouse);

    function animate() {
      const time = (performance.now() - startTimeRef.current) / 1000;
      const cw = pCanvas!.width;
      const ch = pCanvas!.height;

      pCtx.clearRect(0, 0, cw, ch);

      // Update + draw particles
      particlesRef.current = particlesRef.current.filter((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (!p.isBurst) {
          p.alpha =
            p.baseAlpha *
            (0.6 + 0.4 * Math.sin(time * p.pulseSpeed + p.pulseOffset));
          p.radius =
            p.baseRadius *
            (0.8 +
              0.2 * Math.sin(time * p.pulseSpeed * 0.7 + p.pulseOffset));
        }

        // Mouse repulsion
        const dx = p.x - mouseRef.current.x;
        const dy = p.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100 && dist > 0) {
          const force = ((100 - dist) / 100) * 0.4;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        p.vx *= 0.99;
        p.vy *= 0.99;

        if (p.life !== Infinity) {
          p.life--;
          p.alpha = p.baseAlpha * (p.life / p.maxLife);
          p.radius = p.baseRadius * (p.life / p.maxLife);
        }

        // Wrap ambient particles
        if (p.life === Infinity) {
          if (p.x < -10) p.x = cw + 10;
          if (p.x > cw + 10) p.x = -10;
          if (p.y < -10) p.y = ch + 10;
          if (p.y > ch + 10) p.y = -10;
        }

        // Draw
        if (p.alpha > 0.01 && p.radius > 0.1) {
          pCtx.beginPath();
          pCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          pCtx.fillStyle = `rgba(${p.color.r},${p.color.g},${p.color.b},${p.alpha})`;
          pCtx.fill();

          if (p.radius > 1.5) {
            pCtx.beginPath();
            pCtx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2);
            pCtx.fillStyle = `rgba(${p.color.r},${p.color.g},${p.color.b},${p.alpha * 0.08})`;
            pCtx.fill();
          }
        }

        return p.life > 0;
      });

      // Update + draw shockwaves
      swCtx.clearRect(0, 0, cw, ch);
      shockwavesRef.current = shockwavesRef.current.filter((sw) => {
        sw.radius += sw.speed;
        sw.life = 1 - sw.radius / sw.maxRadius;
        if (sw.life <= 0) return false;

        swCtx.beginPath();
        swCtx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        swCtx.strokeStyle = `rgba(85,35,222,${sw.life * 0.20})`;
        swCtx.lineWidth = 1.5 * sw.life;
        swCtx.stroke();
        return true;
      });

      rafRef.current = requestAnimationFrame(animate);
    }

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  return (
    <>
      <canvas
        ref={particleCanvasRef}
        className="absolute inset-0 z-[1] pointer-events-none"
      />
      <canvas
        ref={shockwaveCanvasRef}
        className="absolute inset-0 z-[3] pointer-events-none"
      />
    </>
  );
}
