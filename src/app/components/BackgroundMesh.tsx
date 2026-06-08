'use client';

import { useEffect, useRef } from 'react';

export default function BackgroundMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // 3D Nodes definition
    interface Node {
      x: number;
      y: number;
      z: number;
      vx: number;
      vy: number;
      vz: number;
    }

    const nodeCount = 55;
    const nodes: Node[] = [];
    const maxDistance = 140;

    // Initialize nodes with 3D coordinates
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: (Math.random() - 0.5) * width * 1.2,
        y: (Math.random() - 0.5) * height * 1.2,
        z: (Math.random() - 0.5) * 500,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        vz: (Math.random() - 0.5) * 0.4,
      });
    }

    // Mouse coordinates
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0, active: false };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX - width / 2;
      mouse.targetY = e.clientY - height / 2;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // 3D Rotation angles
    let angleX = 0.0005;
    let angleY = 0.0008;

    const rotateX = (node: Node, angle: number) => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const y1 = node.y * cos - node.z * sin;
      const z1 = node.z * cos + node.y * sin;
      node.y = y1;
      node.z = z1;
    };

    const rotateY = (node: Node, angle: number) => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const x1 = node.x * cos - node.z * sin;
      const z1 = node.z * cos + node.x * sin;
      node.x = x1;
      node.z = z1;
    };

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse coordinates interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // Camera focal length
      const fov = 400;

      // Project 3D to 2D
      const projectedNodes = nodes.map((node) => {
        // Move nodes based on velocity
        node.x += node.vx;
        node.y += node.vy;
        node.z += node.vz;

        // Apply rotation
        rotateX(node, angleX);
        rotateY(node, angleY);

        // Boundary bounce inside 3D box
        const boxWidth = width * 0.6;
        const boxHeight = height * 0.6;
        const boxDepth = 300;

        if (Math.abs(node.x) > boxWidth) node.vx *= -1;
        if (Math.abs(node.y) > boxHeight) node.vy *= -1;
        if (Math.abs(node.z) > boxDepth) node.vz *= -1;

        // Perspective projection
        const scale = fov / (fov + node.z);
        const projX = node.x * scale + width / 2;
        const projY = node.y * scale + height / 2;

        return { x: projX, y: projY, z: node.z, scale };
      });

      // Draw connections
      for (let i = 0; i < projectedNodes.length; i++) {
        const p1 = projectedNodes[i];

        for (let j = i + 1; j < projectedNodes.length; j++) {
          const p2 = projectedNodes[j];

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            // Fading lines based on distance and depth
            const alpha = (1 - dist / maxDistance) * 0.12 * Math.min(p1.scale, p2.scale);
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        // Mouse connection influence
        if (mouse.active) {
          const mX = mouse.x + width / 2;
          const mY = mouse.y + height / 2;
          const dx = p1.x - mX;
          const dy = p1.y - mY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 180) {
            const alpha = (1 - dist / 180) * 0.08 * p1.scale;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mX, mY);
            ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }

        // Draw node points
        const radius = Math.max(0.5, p1.scale * 1.5);
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, radius, 0, Math.PI * 2);
        // Colored points based on depth
        if (p1.z < 0) {
          ctx.fillStyle = `rgba(139, 92, 246, ${0.15 + p1.scale * 0.35})`; // Purple
        } else {
          ctx.fillStyle = `rgba(59, 130, 246, ${0.15 + p1.scale * 0.35})`; // Blue
        }
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.85,
      }}
    />
  );
}
