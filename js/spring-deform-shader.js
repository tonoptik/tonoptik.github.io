// TONOPTIK Spring-Based Deformation Shader
// Combines spring physics with Perlin noise

const SpringDeformShader = {

  vertexShader: `
    ${window.NoiseGLSL}

    // Uniforms from JavaScript
    uniform float uTime;
    uniform float uSpringDisplacement;  // From spring physics (CPU)
    uniform float uNoiseFrequency;      // Noise detail level
    uniform float uNoiseAmplitude;      // Noise strength multiplier
    uniform float uTwistAmount;         // Rotation/twist strength
    uniform float uRadialFalloff;       // Radial masking distance
    uniform float uRadialSharpness;     // Radial masking sharpness

    // 8 displacement peaks: position (xy), direction (xyz), strength
    uniform vec2 uPeakPos[8];           // Peak positions
    uniform vec3 uPeakDir[8];           // Peak pull directions (3D)
    uniform float uPeakStr[8];          // Peak strengths

    // Varyings to fragment shader
    varying vec3 vPosition;
    varying vec3 vNormal;
    varying float vDisplacement;

    // Rotation matrix around Y axis
    mat3 rotateY(float angle) {
      float c = cos(angle);
      float s = sin(angle);
      return mat3(
        c, 0.0, s,
        0.0, 1.0, 0.0,
        -s, 0.0, c
      );
    }

    // Rotation matrix around X axis
    mat3 rotateX(float angle) {
      float c = cos(angle);
      float s = sin(angle);
      return mat3(
        1.0, 0.0, 0.0,
        0.0, c, -s,
        0.0, s, c
      );
    }

    // Rotation matrix around Z axis
    mat3 rotateZ(float angle) {
      float c = cos(angle);
      float s = sin(angle);
      return mat3(
        c, -s, 0.0,
        s, c, 0.0,
        0.0, 0.0, 1.0
      );
    }

    void main() {
      vec3 pos = position;

      // === TWIST DEFORMATION (STATIC) ===
      // Create twisted/spiraling effect - no time animation
      float twistAngle = pos.y * uTwistAmount;
      pos = rotateY(twistAngle) * pos;

      // === NOISE DEFORMATION (STATIC) ===
      // Multi-octave noise for organic variation - NO TIME ANIMATION
      vec3 noisePos = pos * uNoiseFrequency;

      // Octave 1: Large features (static seed offset)
      float noise1 = snoise(noisePos + vec3(123.456, 789.012, 345.678));

      // Octave 2: Medium features (different static seed)
      float noise2 = snoise(noisePos * 2.0 + vec3(987.654, 321.098, 765.432)) * 0.5;

      // Octave 3: Fine details (another static seed)
      float noise3 = snoise(noisePos * 4.0 + vec3(555.111, 222.333, 999.888)) * 0.25;

      // Combine octaves
      float totalNoise = (noise1 + noise2 + noise3) * uNoiseAmplitude;

      // === SPRING-BASED DISPLACEMENT ===
      // Spring displacement modulates noise strength
      float noiseDisplacement = totalNoise * uSpringDisplacement * 0.5;

      // === RADIAL MASKING ===
      // Only deform center area - outer vertices stay flat
      float distFromCenter = length(pos.xy);
      float radialMask = 1.0 - smoothstep(uRadialFalloff, uRadialFalloff + 0.3, distFromCenter);
      radialMask = pow(radialMask, uRadialSharpness); // Make fade sharper

      // === LOCALIZED PEAKS (MULTI-DIRECTIONAL) ===
      // Each peak pulls vertices in 3D direction with sharp falloff
      vec3 peakDisplacement = vec3(0.0);

      // Process all 8 peaks
      for(int i = 0; i < 8; i++) {
        // Distance from vertex to peak center
        vec2 diff = pos.xy - uPeakPos[i];
        float dist = length(diff);

        // MUCH SHARPER falloff for extreme bunching
        float influence = exp(-dist * dist * 12.0);

        // Pull in 3D direction (not just perpendicular)
        vec3 pullDir = normalize(uPeakDir[i]);
        peakDisplacement += pullDir * uPeakStr[i] * influence * uSpringDisplacement;
      }

      // Apply radial mask to concentrat deformation in center
      peakDisplacement *= radialMask;

      // Move vertex: noise (subtle) + peaks (extreme, multi-directional)
      vec3 newPosition = pos + vec3(0.0, 0.0, noiseDisplacement * radialMask) + peakDisplacement;

      // === SOFT BOUNDARY CLAMPING ===
      // Keep deformation well within visible bounds (conservative)
      float boundLimit = 0.9;    // Tighter XY bounds
      float boundLimitZ = 1.2;   // Tighter Z bounds

      // Soft clamp with smoothstep for natural containment
      newPosition.x = clamp(newPosition.x, -boundLimit, boundLimit);
      newPosition.y = clamp(newPosition.y, -boundLimit, boundLimit);
      newPosition.z = clamp(newPosition.z, -boundLimitZ, boundLimitZ);

      // Calculate total displacement magnitude for fragment shader
      float totalDisplacement = length(vec3(0.0, 0.0, noiseDisplacement) + peakDisplacement);

      // Update normal for lighting (if needed)
      vec3 newNormal = normalize(normal + vec3(
        snoise(noisePos + vec3(0.1, 0.0, 0.0)),
        snoise(noisePos + vec3(0.0, 0.1, 0.0)),
        snoise(noisePos + vec3(0.0, 0.0, 0.1))
      ) * 0.1);

      // Pass to fragment shader
      vPosition = newPosition;
      vNormal = newNormal;
      vDisplacement = totalDisplacement;

      // Final position
      gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    }
  `,

  fragmentShader: `
    varying vec3 vNormal;
    varying float vDisplacement;

    void main() {
      // Pure black for wireframe
      // Optional: add subtle variation based on displacement
      float intensity = 0.0; // Pure black

      // Uncomment for subtle shading:
      // float intensity = vDisplacement * 0.05;

      gl_FragColor = vec4(vec3(intensity), 1.0);
    }
  `
};

window.SpringDeformShader = SpringDeformShader;
