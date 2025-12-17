// TONOPTIK Wireframe Hero Animation
// Single mesh with spring + noise deformation

(function() {
  'use strict';

  // ===== CONFIGURATION =====
  const CONFIG = {
    // Geometry settings
    geometryType: 'plane',  // 'plane' | 'box' | 'icosahedron' | 'torus'

    // PlaneGeometry (flat mesh - fabric-like)
    plane: {
      width: 1.5,           // Even smaller to keep well within bounds
      height: 1.5,
      widthSegments: 50,    // Reduced for cleaner wireframe (half density)
      heightSegments: 50
    },

    // BoxGeometry (3D grid)
    box: {
      width: 2,
      height: 2,
      depth: 2,
      widthSegments: 30,
      heightSegments: 30,
      depthSegments: 30
    },

    // IcosahedronGeometry (organic blob)
    icosahedron: {
      radius: 1.5,
      detail: 4
    },

    // TorusGeometry (donut shape)
    torus: {
      radius: 1.2,
      tube: 0.5,
      radialSegments: 30,
      tubularSegments: 60
    },

    // Spring Physics Parameters
    spring: {
      constant: 0.12,      // Spring stiffness (higher = more dynamic)
      damping: 0.08,       // Damping factor (lower = more bounce)
      initialDisp: 1.5,    // Starting displacement
      maxDisp: 3.0,        // Maximum displacement (much higher)
      triggerInterval: 25000 // ms between triggers (10x slower)
    },

    // Noise Deformation
    noise: {
      frequency: 0.4,      // Lower = larger features
      amplitude: 0.3,      // Reduced - let peaks dominate
    },

    // Localized displacement peaks - will be randomly generated on load
    peakCount: 8,          // Number of deformation peaks
    peakStrengthMin: 15,   // Minimum peak strength
    peakStrengthMax: 35,   // Maximum peak strength
    peakAreaRadius: 0.2,   // Peaks within this radius from center

    // Twist/Rotation
    twistAmount: 1.5,      // Much higher twist for crumpled look

    // Radial masking (for center-only deformation)
    radialFalloff: 0.4,    // Tighter - deformation fades closer to center
    radialSharpness: 4.0,  // Sharper fade for more containment

    // Animation
    timeScale: 0.00008,    // 10x slower
    autoRotate: true,      // Rotate mesh
    rotationSpeed: 0.03,   // More visible rotation
    rotationVariation: 0.02, // Speed variation range
    directionChangeSpeed: 0.0001, // How fast rotation direction changes

    // Camera
    cameraDistance: 4.5,   // Pulled back for better framing
    cameraAngle: { x: 0.3, y: 0.4 },  // More oblique angle

    // Canvas
    canvasWidth: 800,
    canvasHeight: 450,

    // Colors
    backgroundColor: 0xffffff,
    wireframeColor: 0x000000,
  };

  // ===== GLOBAL VARIABLES =====
  let scene, camera, renderer, mesh, material;
  let animationId = null;
  let startTime = Date.now();

  // Random peaks generated once on load
  let randomPeaks = [];

  // ===== RANDOM PEAK GENERATION =====
  function generateRandomPeaks() {
    const peaks = [];
    for (let i = 0; i < CONFIG.peakCount; i++) {
      // Random position within center area
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * CONFIG.peakAreaRadius;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      // Random direction (normalized)
      const dx = (Math.random() - 0.5) * 2;
      const dy = (Math.random() - 0.5) * 2;
      const dz = (Math.random() - 0.5) * 2 + 1; // Bias toward positive Z

      // Random strength (can be negative for push)
      const strengthSign = Math.random() > 0.7 ? -1 : 1; // 30% chance of push
      const strength = (Math.random() * (CONFIG.peakStrengthMax - CONFIG.peakStrengthMin) + CONFIG.peakStrengthMin) * strengthSign;

      peaks.push({ x, y, dx, dy, dz, strength });
    }
    return peaks;
  }

  // ===== GEOMETRY CREATION =====
  function createGeometry() {
    switch(CONFIG.geometryType) {
      case 'plane':
        return new THREE.PlaneGeometry(
          CONFIG.plane.width,
          CONFIG.plane.height,
          CONFIG.plane.widthSegments,
          CONFIG.plane.heightSegments
        );

      case 'box':
        return new THREE.BoxGeometry(
          CONFIG.box.width,
          CONFIG.box.height,
          CONFIG.box.depth,
          CONFIG.box.widthSegments,
          CONFIG.box.heightSegments,
          CONFIG.box.depthSegments
        );

      case 'icosahedron':
        return new THREE.IcosahedronGeometry(
          CONFIG.icosahedron.radius,
          CONFIG.icosahedron.detail
        );

      case 'torus':
        return new THREE.TorusGeometry(
          CONFIG.torus.radius,
          CONFIG.torus.tube,
          CONFIG.torus.radialSegments,
          CONFIG.torus.tubularSegments
        );

      default:
        return new THREE.PlaneGeometry(3, 3, 100, 100);
    }
  }


  // ===== INITIALIZATION =====
  function init() {
    const canvas = document.getElementById('hero-canvas');
    const fallbackImg = document.getElementById('hero-fallback');

    console.log('Initializing WebGL hero animation...');
    console.log('Canvas:', canvas);
    console.log('THREE:', window.THREE);
    console.log('SpringDeformShader:', window.SpringDeformShader);

    if (!canvas || !window.THREE || !window.SpringDeformShader) {
      console.error('Required dependencies not loaded:', {
        canvas: !!canvas,
        THREE: !!window.THREE,
        SpringDeformShader: !!window.SpringDeformShader
      });
      // Keep static image visible if WebGL fails
      if (fallbackImg) {
        fallbackImg.classList.remove('fade-out');
        fallbackImg.style.opacity = '1';
      }
      return;
    }

    // Create scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(CONFIG.backgroundColor);

    // Create camera
    camera = new THREE.PerspectiveCamera(
      45,
      CONFIG.canvasWidth / CONFIG.canvasHeight,
      0.1,
      1000
    );
    camera.position.set(
      Math.sin(CONFIG.cameraAngle.y) * CONFIG.cameraDistance,
      CONFIG.cameraAngle.x * CONFIG.cameraDistance,
      Math.cos(CONFIG.cameraAngle.y) * CONFIG.cameraDistance
    );
    camera.lookAt(0, 0, 0);

    // Create geometry
    const geometry = createGeometry();

    // Generate random peaks once on load
    randomPeaks = generateRandomPeaks();
    console.log('Generated random peaks:', randomPeaks);

    // Prepare peak arrays for shader
    const peakPos = randomPeaks.map(p => new THREE.Vector2(p.x, p.y));
    const peakDir = randomPeaks.map(p => new THREE.Vector3(p.dx, p.dy, p.dz));
    const peakStr = randomPeaks.map(p => p.strength);

    console.log('Peak arrays:', { peakPos, peakDir, peakStr });

    // Create wireframe material with custom shader
    try {
      material = new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0.0 },               // Static - not animated
          uSpringDisplacement: { value: 1.0 }, // Fixed at 1.0 (full strength)
          uNoiseFrequency: { value: CONFIG.noise.frequency },
          uNoiseAmplitude: { value: CONFIG.noise.amplitude },
          uTwistAmount: { value: CONFIG.twistAmount },
          uRadialFalloff: { value: CONFIG.radialFalloff },
          uRadialSharpness: { value: CONFIG.radialSharpness },
          uPeakPos: { value: peakPos },
          uPeakDir: { value: peakDir },
          uPeakStr: { value: peakStr }
        },
        vertexShader: SpringDeformShader.vertexShader,
        fragmentShader: SpringDeformShader.fragmentShader,
        wireframe: true,  // ← KEY: Wireframe rendering
        side: THREE.DoubleSide
      });
      console.log('Material created successfully');
    } catch (error) {
      console.error('Error creating material:', error);
      // Keep static image visible if material creation fails
      if (fallbackImg) {
        fallbackImg.classList.remove('fade-out');
        fallbackImg.style.opacity = '1';
      }
      return;
    }

    // Create mesh
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Create renderer
    renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: false
    });
    renderer.setSize(CONFIG.canvasWidth, CONFIG.canvasHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Start animation
    let lastTime = Date.now();

    function animate() {
      animationId = requestAnimationFrame(animate);

      const currentTime = Date.now();
      const deltaTime = (currentTime - lastTime) / 1000; // seconds
      lastTime = currentTime;

      // No deformation animation - shape is static
      // Only rotation animates

      // Auto-rotate mesh with varying direction and speed
      if (CONFIG.autoRotate) {
        // Slowly changing rotation direction using sine waves
        const directionTime = currentTime * CONFIG.directionChangeSpeed;

        // Y-axis rotation: direction varies between -1 and 1
        const yDirection = Math.sin(directionTime * 0.7);
        const ySpeed = CONFIG.rotationSpeed + Math.sin(directionTime * 1.3) * CONFIG.rotationVariation;
        mesh.rotation.y += yDirection * ySpeed * deltaTime;

        // X-axis rotation: independent direction change
        const xDirection = Math.cos(directionTime * 0.5);
        const xSpeed = CONFIG.rotationSpeed * 0.3 + Math.cos(directionTime * 0.9) * CONFIG.rotationVariation * 0.3;
        mesh.rotation.x += xDirection * xSpeed * deltaTime;

        // Z-axis: subtle rotation for more organic movement
        const zDirection = Math.sin(directionTime * 0.3);
        mesh.rotation.z += zDirection * CONFIG.rotationSpeed * 0.15 * deltaTime;
      }

      renderer.render(scene, camera);
    }

    animate();

    // Fade in canvas after successful initialization
    setTimeout(() => {
      console.log('Fading in WebGL canvas...');
      canvas.classList.add('active');
      canvas.style.display = 'block';
      fallbackImg.classList.add('fade-out');
    }, 100);
  }

  // ===== ERROR HANDLER =====
  window.addEventListener('error', function(e) {
    console.error('Global error:', e.message, e.filename, e.lineno);
  });

  // ===== WINDOW RESIZE =====
  function onWindowResize() {
    if (!camera || !renderer) return;

    const container = document.querySelector('.featured');
    const width = Math.min(CONFIG.canvasWidth, container.clientWidth);
    const height = width * (CONFIG.canvasHeight / CONFIG.canvasWidth);

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

  // ===== CLEANUP =====
  function cleanup() {
    if (animationId) cancelAnimationFrame(animationId);
    if (renderer) renderer.dispose();
    if (material) material.dispose();
  }

  // ===== START =====
  init();

  // ===== EVENT LISTENERS =====
  window.addEventListener('resize', onWindowResize);
  window.addEventListener('beforeunload', cleanup);

})();
