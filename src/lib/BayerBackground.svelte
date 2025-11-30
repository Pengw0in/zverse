<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import * as THREE from 'three';

  export let pixelSize = 4;
  export let bg = '#000000';
  export let blur = 0;

  let container: HTMLDivElement;
  let animationId: number;
  let renderer: THREE.WebGLRenderer;

  const vertexShader = `
    void main() {
      gl_Position = vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    precision highp float;

    uniform vec3  uColors[5];
    uniform vec2  uResolution;
    uniform float uTime;
    uniform float uPixelSize;

    const int MAX_CLICKS = 10;
    uniform vec2  uClickPos[MAX_CLICKS];
    uniform float uClickTimes[MAX_CLICKS];

    out vec4 fragColor;

    // --- Bayer Matrix Logic ---
    float Bayer2(vec2 a) {
        a = floor(a);
        return fract(a.x / 2. + a.y * a.y * .75);
    }
    #define Bayer4(a) (Bayer2(.5*(a))*0.25 + Bayer2(a))
    #define Bayer8(a) (Bayer4(.5*(a))*0.25 + Bayer2(a))

    // --- Noise Functions ---
    float hash11(float n) { return fract(sin(n)*43758.5453); }
    
    // 2D Noise for smooth color transitions
    float noise(vec2 p) {
        vec2 ip = floor(p);
        vec2 u = fract(p);
        u = u*u*(3.0-2.0*u);
        
        float res = mix(
            mix(hash11(dot(ip, vec2(1.0, 57.0))),
                hash11(dot(ip + vec2(1.0, 0.0), vec2(1.0, 57.0))), u.x),
            mix(hash11(dot(ip + vec2(0.0, 1.0), vec2(1.0, 57.0))),
                hash11(dot(ip + vec2(1.0, 1.0), vec2(1.0, 57.0))), u.x), u.y);
        return res;
    }

    // 3D Noise for the dithering pattern
    float vnoise(vec3 p) {
        vec3 ip = floor(p);
        vec3 fp = fract(p);
        float n000 = hash11(dot(ip + vec3(0.0,0.0,0.0), vec3(1.0,57.0,113.0)));
        float n100 = hash11(dot(ip + vec3(1.0,0.0,0.0), vec3(1.0,57.0,113.0)));
        float n010 = hash11(dot(ip + vec3(0.0,1.0,0.0), vec3(1.0,57.0,113.0)));
        float n110 = hash11(dot(ip + vec3(1.0,1.0,0.0), vec3(1.0,57.0,113.0)));
        float n001 = hash11(dot(ip + vec3(0.0,0.0,1.0), vec3(1.0,57.0,113.0)));
        float n101 = hash11(dot(ip + vec3(1.0,0.0,1.0), vec3(1.0,57.0,113.0)));
        float n011 = hash11(dot(ip + vec3(0.0,1.0,1.0), vec3(1.0,57.0,113.0)));
        float n111 = hash11(dot(ip + vec3(1.0,1.0,1.0), vec3(1.0,57.0,113.0)));
        vec3 w = fp*fp*fp*(fp*(fp*6.0-15.0)+10.0);
        float x00 = mix(n000, n100, w.x);
        float x10 = mix(n010, n110, w.x);
        float x01 = mix(n001, n101, w.x);
        float x11 = mix(n011, n111, w.x);
        float y0 = mix(x00, x10, w.y);
        float y1 = mix(x01, x11, w.y);
        return mix(y0, y1, w.z) * 2.0 - 1.0;
    }

    #define FBM_OCTAVES 5
    #define FBM_LACUNARITY 1.25
    #define FBM_GAIN 1.
    #define FBM_SCALE 4.0

    float fbm2(vec2 uv, float t) {
        vec3 p = vec3(uv * FBM_SCALE, t);
        float amp = 1.;
        float freq = 1.;
        float sum = 1.;
        for (int i = 0; i < FBM_OCTAVES; ++i) {
            sum += amp * vnoise(p * freq);
            freq *= FBM_LACUNARITY;
            amp *= FBM_GAIN;
        }
        return sum * 0.5 + 0.5;
    }

    void main() {
        float pixelSize = uPixelSize;
        vec2 fragCoord = gl_FragCoord.xy - uResolution * .5;
        float aspectRatio = uResolution.x / uResolution.y;
        
        float cellPixelSize = 8. * pixelSize;
        vec2 cellId = floor(fragCoord / cellPixelSize);
        vec2 cellCoord = cellId * cellPixelSize;
        vec2 uv = cellCoord / uResolution * vec2(aspectRatio, 1.0);

        // --- Pattern Generation ---
        float feed = fbm2(uv, uTime * 0.05);
        feed = feed * 0.5 - 0.65;

        const float speed = 0.30;
        const float thickness = 0.10;
        const float dampT = 1.0;
        const float dampR = 10.0;

        // --- Click Ripples ---
        for (int i = 0; i < MAX_CLICKS; ++i) {
            vec2 pos = uClickPos[i];
            if (pos.x < 0.0) continue;
            vec2 cuv = (((pos - uResolution * .5 - cellPixelSize * .5) / (uResolution))) * vec2(aspectRatio, 1.0);
            float t = max(uTime - uClickTimes[i], 0.0);
            float r = distance(uv, cuv);
            float waveR = speed * t;
            float ring = exp(-pow((r - waveR) / thickness, 2.0));
            float atten = exp(-dampT * t) * exp(-dampR * r);
            feed = max(feed, ring * atten);
        }

        float bayer = Bayer8(fragCoord / uPixelSize) - 0.5;
        float bw = step(0.5, feed + bayer);
        float coverage = bw;

        // --- Improved Color Logic ---
        float n = noise(uv * 2.0 + vec2(uTime * 0.1, uTime * 0.05)); 
        float texture = hash11(dot(cellId, vec2(12.9898, 78.233))) * 0.2;
        float colorVal = n + texture;
        int colorIndex = int(mod(colorVal * 10.0, 5.0));
        
        vec3 color = uColors[0];
        if (colorIndex == 1) color = uColors[1];
        else if (colorIndex == 2) color = uColors[2];
        else if (colorIndex == 3) color = uColors[3];
        else if (colorIndex == 4) color = uColors[4];

        fragColor = vec4(color, coverage);
    }
  `;

  onMount(() => {
    const MAX_CLICKS = 10;
    
    const colors = [
      new THREE.Color('#FF4081'), // Pink
      new THREE.Color('#00AEEF'), // Cyan
      new THREE.Color('#FFD700'), // Gold
      new THREE.Color('#9C27B0'), // Purple
      new THREE.Color('#FF0000'), // Red
    ];

    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2')!;
    renderer = new THREE.WebGLRenderer({ canvas, context: gl, antialias: true });
    container.appendChild(canvas);

    const uniforms = {
      uResolution: { value: new THREE.Vector2() },
      uTime: { value: Math.random() * 1000 }, 
      uColors: { value: colors },
      uClickPos: { value: Array.from({ length: MAX_CLICKS }, () => new THREE.Vector2(-1, -1)) },
      uClickTimes: { value: new Float32Array(MAX_CLICKS) },
      uPixelSize: { value: pixelSize },
    };

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      glslVersion: THREE.GLSL3,
      transparent: true,
    });
    scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material));

    const resize = () => {
      const w = canvas.clientWidth || window.innerWidth;
      const h = canvas.clientHeight || window.innerHeight;
      renderer.setSize(w, h, false);
      uniforms.uResolution.value.set(w, h);
    };
    window.addEventListener('resize', resize);
    resize();

    let clickIx = 0;
    
    const onPointerDown = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const fx = (e.clientX - rect.left) * (canvas.width / rect.width);
      const fy = (rect.height - (e.clientY - rect.top)) * (canvas.height / rect.height);
      
      uniforms.uClickPos.value[clickIx].set(fx, fy);
      uniforms.uClickTimes.value[clickIx] = uniforms.uTime.value;
      clickIx = (clickIx + 1) % MAX_CLICKS;
    };

    window.addEventListener('pointerdown', onPointerDown);

    const clock = new THREE.Clock();
    function animate() {
      uniforms.uTime.value = clock.getElapsedTime();
      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointerdown', onPointerDown);
      cancelAnimationFrame(animationId);
      renderer.dispose();
      material.dispose();
    };
  });

  onDestroy(() => {
    if (animationId) cancelAnimationFrame(animationId);
    if (renderer) renderer.dispose();
  });
</script>

<div bind:this={container} class="background" style="background-color: {bg}; --blur: {blur}px;" />

<style>
  .background {
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .background :global(canvas) {
    display: block;
    width: 100%;
    height: 100%;
    filter: blur(var(--blur));
  }
</style>