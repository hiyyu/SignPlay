// ==========================================================================
// Gestigo - First-Person (POV) Detective Crime Scene Renderer
// Renders rich, atmospheric noir crime scenes seen through the detective's eyes:
// - Level 1: Museum Antiquities Vault (Shattered display pedestal, moonbeam, laser grid)
// - Level 2: Foggy Nocturnal Pier (Cobblestones, streetlamp, discarded evidence)
// - Level 3: Sky Tower Observatory (High-tech glass dome, metropolis skyline)
// ==========================================================================

class GestigoSceneRenderer {
  static drawScene(canvas, stage) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Ensure canvas has valid dimensions
    const rect = canvas.getBoundingClientRect();
    const w = rect.width > 50 ? rect.width : (canvas.parentElement ? canvas.parentElement.clientWidth || 640 : 640);
    const h = rect.height > 50 ? rect.height : (canvas.parentElement ? canvas.parentElement.clientHeight || 280 : 280);

    canvas.width = w;
    canvas.height = h;

    ctx.clearRect(0, 0, w, h);

    const level = stage.level || 1;

    if (level === 1) {
      this.drawMuseumVaultPOV(ctx, w, h, stage);
    } else if (level === 2) {
      this.drawHarborStreetPOV(ctx, w, h, stage);
    } else {
      this.drawSkyObservatoryPOV(ctx, w, h, stage);
    }
  }

  // First-Person POV: Inside the Museum Antiquities Vault looking directly at the crime scene
  static drawMuseumVaultPOV(ctx, w, h, stage) {
    // 1. Dark Vault Atmospheric Gradient
    const bg = ctx.createLinearGradient(0, 0, 0, h);
    bg.addColorStop(0, '#070b16');
    bg.addColorStop(0.5, '#0d1527');
    bg.addColorStop(1, '#060a12');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    // 2. High Vaulted Stone Arches in Background
    ctx.fillStyle = '#0a1020';
    ctx.beginPath();
    ctx.arc(w * 0.25, h * 0.45, w * 0.2, Math.PI, 0);
    ctx.lineTo(w * 0.45, h * 0.7);
    ctx.lineTo(w * 0.05, h * 0.7);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(w * 0.75, h * 0.45, w * 0.2, Math.PI, 0);
    ctx.lineTo(w * 0.95, h * 0.7);
    ctx.lineTo(w * 0.55, h * 0.7);
    ctx.closePath();
    ctx.fill();

    // 3. Piercing Blue Moonlight Shaft from Top Skylight
    ctx.save();
    const moon = ctx.createLinearGradient(w * 0.45, 0, w * 0.55, h);
    moon.addColorStop(0, 'rgba(186, 230, 253, 0.35)');
    moon.addColorStop(0.5, 'rgba(56, 189, 248, 0.12)');
    moon.addColorStop(1, 'transparent');
    ctx.fillStyle = moon;
    ctx.beginPath();
    ctx.moveTo(w * 0.4, 0);
    ctx.lineTo(w * 0.55, 0);
    ctx.lineTo(w * 0.78, h);
    ctx.lineTo(w * 0.28, h);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // 4. Marble Tile Floor with Perspective
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, h * 0.65, w, h * 0.35);
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1.5;
    for (let x = -w * 0.2; x < w * 1.2; x += 80) {
      ctx.beginPath();
      ctx.moveTo(x, h * 0.65);
      ctx.lineTo(x * 1.4 - w * 0.2, h);
      ctx.stroke();
    }

    // 5. Center Evidence: The Shattered Glass Pedestal
    ctx.save();
    const pw = w * 0.24;
    const px = (w - pw) / 2;
    const py = h * 0.48;

    // Marble Pillar Pedestal
    const marbleGrad = ctx.createLinearGradient(px, py, px + pw, py);
    marbleGrad.addColorStop(0, '#1e293b');
    marbleGrad.addColorStop(0.5, '#334155');
    marbleGrad.addColorStop(1, '#0f172a');
    ctx.fillStyle = marbleGrad;
    ctx.fillRect(px, py, pw, h * 0.25);
    ctx.strokeStyle = '#475569';
    ctx.strokeRect(px, py, pw, h * 0.25);

    // Velvet Cushion Base (where the stolen seal was placed)
    ctx.fillStyle = '#831843'; // Deep crimson velvet
    ctx.beginPath();
    ctx.ellipse(w / 2, py + 10, pw * 0.42, 14, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#be185d';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Tempered Glass Display Case (Shattered)
    ctx.fillStyle = 'rgba(56, 189, 248, 0.08)';
    ctx.fillRect(px + 10, py - h * 0.28, pw - 20, h * 0.28);
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.8)';
    ctx.lineWidth = 2;
    ctx.strokeRect(px + 10, py - h * 0.28, pw - 20, h * 0.28);

    // Spiderweb Glass Impact Fractures & Scratched Initials
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.shadowBlur = 8;
    ctx.shadowColor = '#38bdf8';
    ctx.beginPath();
    // Center impact
    const cx = w / 2;
    const cy = py - h * 0.14;
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx - 35, cy - 25);
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + 40, cy - 30);
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + 25, cy + 30);
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx - 30, cy + 20);
    ctx.stroke();

    // Etched Cipher Monogram "AVL" glowing on the glass!
    ctx.font = 'bold 16px "JetBrains Mono", monospace';
    ctx.fillStyle = '#fde047'; // Glowing amber yellow scratch
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#facc15';
    ctx.fillText("✦ AVL ✦", cx - 32, cy - 8);
    ctx.restore();

    // 6. Security Laser Tripwires across the room
    ctx.save();
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 1.5;
    ctx.shadowBlur = 12;
    ctx.shadowColor = '#ef4444';
    ctx.beginPath();
    ctx.moveTo(0, h * 0.38);
    ctx.lineTo(w * 0.35, h * 0.52);
    ctx.moveTo(w, h * 0.35);
    ctx.lineTo(w * 0.65, h * 0.55);
    ctx.stroke();
    ctx.restore();

    // 7. Police Evidence Yellow Cones / Markers on Floor
    this.drawEvidenceMarker(ctx, w * 0.32, h * 0.74, "1");
    this.drawEvidenceMarker(ctx, w * 0.68, h * 0.72, "2");

    // 8. Detective First-Person Magnifying Inspection Reticle
    ctx.save();
    ctx.strokeStyle = 'rgba(34, 197, 94, 0.7)';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.arc(w / 2, h * 0.42, 45, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(w / 2 - 55, h * 0.42);
    ctx.lineTo(w / 2 + 55, h * 0.42);
    ctx.moveTo(w / 2, h * 0.42 - 55);
    ctx.lineTo(w / 2, h * 0.42 + 55);
    ctx.stroke();
    ctx.restore();
  }

  // First-Person POV: Foggy Waterfront Pier & Syndicate Bistro
  static drawHarborStreetPOV(ctx, w, h, stage) {
    const bg = ctx.createLinearGradient(0, 0, 0, h);
    bg.addColorStop(0, '#060a12');
    bg.addColorStop(0.5, '#0f172a');
    bg.addColorStop(1, '#070b13');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    // Distant Cargo Ships & Fog
    ctx.fillStyle = '#0a1020';
    ctx.fillRect(w * 0.1, h * 0.35, 120, h * 0.25);
    ctx.fillRect(w * 0.7, h * 0.3, 140, h * 0.3);

    // Glowing Gas Streetlamp casting warm amber light on cobblestones
    ctx.save();
    const lampX = w * 0.78;
    const lampY = h * 0.38;
    const lampGlow = ctx.createRadialGradient(lampX, lampY, 5, lampX, lampY, 110);
    lampGlow.addColorStop(0, '#fef08a');
    lampGlow.addColorStop(0.3, 'rgba(245, 158, 11, 0.45)');
    lampGlow.addColorStop(1, 'transparent');
    ctx.fillStyle = lampGlow;
    ctx.beginPath();
    ctx.arc(lampX, lampY, 110, 0, Math.PI * 2);
    ctx.fill();

    // Lamp Post
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(lampX, h * 0.75);
    ctx.lineTo(lampX, lampY);
    ctx.stroke();
    ctx.restore();

    // Wet Cobblestones with neon reflection
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, h * 0.65, w, h * 0.35);

    // Discarded Evidence: Trench Coat in dumpster
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(w * 0.22, h * 0.62, 50, 40);
    ctx.fillStyle = '#334155';
    ctx.beginPath();
    ctx.ellipse(w * 0.25, h * 0.61, 20, 8, -0.3, 0, Math.PI * 2);
    ctx.fill();

    this.drawEvidenceMarker(ctx, w * 0.28, h * 0.75, "3");
  }

  // First-Person POV: Sky Tower Observatory overlooking city
  static drawSkyObservatoryPOV(ctx, w, h, stage) {
    const bg = ctx.createLinearGradient(0, 0, 0, h);
    bg.addColorStop(0, '#020617');
    bg.addColorStop(1, '#0b1120');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    // Metropolis Night Skyline seen through glass dome
    ctx.fillStyle = '#030712';
    ctx.fillRect(0, h * 0.4, w, h * 0.25);
    for (let k = 0; k < 70; k++) {
      ctx.fillStyle = (k % 4 === 0) ? '#38bdf8' : ((k % 3 === 0) ? '#facc15' : '#ef4444');
      const lx = (k * 19) % w;
      const ly = h * 0.43 + ((k * 13) % (h * 0.18));
      ctx.fillRect(lx, ly, 3, 3);
    }

    // Dome Window Struts
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
    ctx.lineWidth = 2.5;
    for (let x = 0; x <= w; x += w * 0.2) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + 25, h * 0.65);
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.moveTo(0, h * 0.35);
    ctx.lineTo(w, h * 0.35);
    ctx.stroke();

    // High-tech holographic safe console
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(w / 2, h * 0.78, w * 0.22, 16, 0, 0, Math.PI * 2);
    ctx.strokeStyle = '#a855f7';
    ctx.lineWidth = 3;
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#c084fc';
    ctx.stroke();
    ctx.restore();
  }

  static drawEvidenceMarker(ctx, x, y, num) {
    ctx.save();
    ctx.fillStyle = '#facc15';
    ctx.beginPath();
    ctx.moveTo(x, y - 20);
    ctx.lineTo(x + 12, y);
    ctx.lineTo(x - 12, y);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.font = 'bold 11px Inter, sans-serif';
    ctx.fillStyle = '#0f172a';
    ctx.textAlign = 'center';
    ctx.fillText(num, x, y - 4);
    ctx.restore();
  }
}
