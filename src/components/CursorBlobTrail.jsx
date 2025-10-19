import React, { useEffect, useRef } from 'react';

const CursorBlobTrail = () => {
  const canvasRef = useRef(null);
  const animationFrameId = useRef(null);
  const particles = useRef([]);
  const mouse = useRef({ x: -100, y: -100 }); // Initialize off-screen

  const NUM_PARTICLES = 10; // Number of particles in the trail
  const PARTICLE_SIZE = 3;  // Size of each particle (radius)
  const PARTICLE_COLOR = 'rgba(234, 179, 8, 0.8)'; // Yellow-500 equivalent with transparency
  const TRAIL_LENGTH = 0.8; // How quickly particles follow the mouse (0-1, higher is faster)
  const FRICTION = 0.95; // How quickly particles slow down
  const OPACITY_DECAY = 0.05; // How quickly particles fade

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (event) => {
      mouse.current = { x: event.clientX, y: event.clientY };
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);

    resizeCanvas(); // Set initial canvas size

    // Initialize particles
    for (let i = 0; i < NUM_PARTICLES; i++) {
      particles.current.push({
        x: mouse.current.x,
        y: mouse.current.y,
        vx: 0, // Velocity x
        vy: 0, // Velocity y
        opacity: 1,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

      let prevParticle = mouse.current;

      particles.current.forEach((p, index) => {
        // Calculate target based on mouse or previous particle
        const targetX = index === 0 ? mouse.current.x : particles.current[index - 1].x;
        const targetY = index === 0 ? mouse.current.y : particles.current[index - 1].y;

        // Apply "spring" effect to follow target
        p.vx += (targetX - p.x) * (1 - TRAIL_LENGTH);
        p.vy += (targetY - p.y) * (1 - TRAIL_LENGTH);

        // Apply friction
        p.vx *= FRICTION;
        p.vy *= FRICTION;

        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Decrease opacity over time
        p.opacity = Math.max(0, p.opacity - OPACITY_DECAY);
        // If particle goes off-screen or fades out, reset it to follow the mouse
        if (p.opacity <= 0.1 && (Math.abs(p.x - mouse.current.x) > 100 || Math.abs(p.y - mouse.current.y) > 100)) {
             p.x = mouse.current.x;
             p.y = mouse.current.y;
             p.vx = 0;
             p.vy = 0;
             p.opacity = 1;
        }


        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, PARTICLE_SIZE, 0, Math.PI * 2);
        ctx.fillStyle = PARTICLE_COLOR.replace(/[^,]+\)/, `${p.opacity})`); // Update opacity in rgba string
        ctx.fill();
        ctx.closePath();
      });

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animate(); // Start animation loop

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId.current);
    };
  }, []); // Empty dependency array means this runs once on mount

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-50 pointer-events-none" // Ensure it's on top and doesn't block events
    />
  );
};

export default CursorBlobTrail;