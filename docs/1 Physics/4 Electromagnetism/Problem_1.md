# Problem 1

<script>
  const canvas = document.getElementById('interferenceCanvas');
  const ctx = canvas.getContext('2d');

  const amplitudeInput = document.getElementById('amplitude');
  const wavelengthInput = document.getElementById('wavelength');
  const sourcesInput = document.getElementById('sources');
  const radiusInput = document.getElementById('radius');
  const updateBtn = document.getElementById('updateBtn');
  const ampValue = document.getElementById('ampValue');
  const waveValue = document.getElementById('waveValue');
  const radiusValue = document.getElementById('radiusValue');

  let A = parseFloat(amplitudeInput.value);
  let wavelength = parseFloat(wavelengthInput.value);
  let numSources = parseInt(sourcesInput.value);
  let sourceRadius = parseFloat(radiusInput.value);
  let frequency = 1.0;
  let k = 2 * Math.PI / wavelength;
  let omega = 2 * Math.PI * frequency;
  let phi = 0;
  let t = 0;
  let animationId;

  ampValue.textContent = A.toFixed(1);
  waveValue.textContent = wavelength.toFixed(1);
  radiusValue.textContent = sourceRadius.toFixed(1);

  amplitudeInput.addEventListener('input', () => {
    A = parseFloat(amplitudeInput.value);
    ampValue.textContent = A.toFixed(1);
  });

  wavelengthInput.addEventListener('input', () => {
    wavelength = parseFloat(wavelengthInput.value);
    k = 2 * Math.PI / wavelength;
    waveValue.textContent = wavelength.toFixed(1);
  });

  radiusInput.addEventListener('input', () => {
    sourceRadius = parseFloat(radiusInput.value);
    radiusValue.textContent = sourceRadius.toFixed(1);
  });

  updateBtn.addEventListener('click', () => {
    cancelAnimationFrame(animationId);
    t = 0;
    runAnimation();
  });

  function regularPolygon(n, radius) {
    const points = [];
    for (let i = 0; i < n; i++) {
      const angle = (2 * Math.PI * i) / n;
      points.push([radius * Math.cos(angle), radius * Math.sin(angle)]);
    }
    return points;
  }

  function mapToColor(value, min, max) {
    const normalized = (value - min) / (max - min);
    let r, g, b;
    if (normalized < 0.5) {
      const t = normalized * 2;
      r = 255 * t;
      g = 255 * t;
      b = 255;
    } else {
      const t = (normalized - 0.5) * 2;
      r = 255;
      g = 255 * (1 - t);
      b = 255 * (1 - t);
    }
    return [r, g, b];
  }

  function runAnimation() {
    numSources = parseInt(sourcesInput.value);
    k = 2 * Math.PI / wavelength;
    const width = canvas.width;
    const height = canvas.height;
    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;
    const scale = 20;
    const offsetX = width / 2;
    const offsetY = height / 2;
    const sources = regularPolygon(numSources, sourceRadius);

    const waveValues = new Array(width * height);
    let minVal = Infinity;
    let maxVal = -Infinity;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const physX = (x - offsetX) / scale;
        const physY = (y - offsetY) / scale;
        let eta = 0;
        for (const [x0, y0] of sources) {
          const R = Math.sqrt((physX - x0) ** 2 + (physY - y0) ** 2);
          const amplitude = R < 0.01 ? A : A / Math.sqrt(R + 0.01);
          eta += amplitude * Math.cos(k * R - omega * t + phi);
        }
        const index = y * width + x;
        waveValues[index] = eta;
        minVal = Math.min(minVal, eta);
        maxVal = Math.max(maxVal, eta);
      }
    }

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const index = y * width + x;
        const eta = waveValues[index];
        const [r, g, b] = mapToColor(eta, minVal, maxVal);
        const pixelIndex = (y * width + x) * 4;
        data[pixelIndex] = r;
        data[pixelIndex + 1] = g;
        data[pixelIndex + 2] = b;
        data[pixelIndex + 3] = 255;
      }
    }

    ctx.putImageData(imageData, 0, 0);
    drawSources(sources, scale, offsetX, offsetY);

    t += 0.05; // Animation speed
    animationId = requestAnimationFrame(runAnimation);
  }

  function drawSources(sources, scale, offsetX, offsetY) {
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    for (const [x0, y0] of sources) {
      const canvasX = x0 * scale + offsetX;
      const canvasY = y0 * scale + offsetY;
      ctx.beginPath();
      ctx.arc(canvasX, canvasY, 5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
    }
  }

  runAnimation();
</script>
