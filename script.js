
const CONFIG = {
  name: "My Love",                   
  subtitle: "Its Finally 19 · NOVEMBER YEAHHHH 🎉",             
  music: "music/dilruba.mp3.mp3",              

  photos: [
    { src: "photos/photo1.jpeg", caption: "Mera bakasurr💕" },
    { src: "photos/photo2.jpeg", caption: "cutest person ever" },
    { src: "photos/photo3.jpeg", caption: "Your smile is my favourite thing" },
    { src: "photos/photo4.jpeg", caption: "precious Girl✨" },
    { src: "photos/photo5.jpeg", caption: "My favourite person" },
    { src: "photos/photo6.jpeg", caption: "Forever love💖" },
  ],

  letter: {
    title: "My Dear Viduuu",
    text:
      "Happiest Birthday to you!\n\n" +
      "Thank you for being the best part of my life. " +
      "You make every ordinary day feel special, and I'm so grateful to have you.\n\n" +
      "I hope this year brings you all the happiness you give to me. " +
      "I love you more than words can say.",
    sign: "Yours BBG , forever ❤",
  },
};

/* =====================================================
   3D SCENE  (you normally don't need to edit below)
   ===================================================== */
(() => {
  const isMobile = () => window.innerWidth < 700;
  const baseCamZ = () => (isMobile() ? 15.5 : 12);
  const focusCamZ = () => (isMobile() ? 10.5 : 8.2);

  // ----- Fill in text from CONFIG -----
  document.getElementById("introName").textContent = CONFIG.name;
  document.getElementById("subtitle").textContent = CONFIG.subtitle;
  document.getElementById("title").textContent = "Happy Birthday";
  document.getElementById("letterTitle").textContent = CONFIG.letter.title;
  document.getElementById("letterText").textContent = CONFIG.letter.text;
  document.getElementById("letterSign").textContent = CONFIG.letter.sign;

  // ----- Renderer / scene / camera -----
  const container = document.getElementById("scene");
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x12041f, 0.025);

  const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 200);
  camera.position.set(0, 1.5, baseCamZ());

  // ----- Lights -----
  scene.add(new THREE.AmbientLight(0xffffff, 0.7));
  const pinkLight = new THREE.PointLight(0xff5c8a, 2.2, 40);
  pinkLight.position.set(-6, 4, 6);
  scene.add(pinkLight);
  const goldLight = new THREE.PointLight(0xffd37a, 1.8, 40);
  goldLight.position.set(6, -3, 8);
  scene.add(goldLight);
  const centerLight = new THREE.PointLight(0xff3d7f, 2.5, 14);
  scene.add(centerLight);

  // ----- Stars -----
  (function makeStars() {
    const count = 1500;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 120;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 80;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 120;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const m = new THREE.PointsMaterial({ color: 0xffffff, size: 0.18, transparent: true, opacity: 0.85 });
    window.__stars = new THREE.Points(g, m);
    scene.add(window.__stars);
  })();

  // ----- Heart geometry -----
  function heartGeometry() {
    const s = new THREE.Shape();
    s.moveTo(25, 25);
    s.bezierCurveTo(25, 25, 20, 0, 0, 0);
    s.bezierCurveTo(-30, 0, -30, 35, -30, 35);
    s.bezierCurveTo(-30, 55, -10, 77, 25, 95);
    s.bezierCurveTo(60, 77, 80, 55, 80, 35);
    s.bezierCurveTo(80, 35, 80, 0, 50, 0);
    s.bezierCurveTo(35, 0, 25, 25, 25, 25);
    const g = new THREE.ExtrudeGeometry(s, {
      depth: 18, bevelEnabled: true, bevelThickness: 8, bevelSize: 6, bevelSegments: 6, curveSegments: 24,
    });
    g.center();
    g.rotateZ(Math.PI); // make the point face down
    return g;
  }
  const heartGeo = heartGeometry();

  // Big center heart
  const bigHeart = new THREE.Mesh(
    heartGeo,
    new THREE.MeshStandardMaterial({
      color: 0xff2d6f, emissive: 0x7a0a30, emissiveIntensity: 0.8,
      metalness: 0.35, roughness: 0.25,
    })
  );
  bigHeart.scale.setScalar(0.03);
  scene.add(bigHeart);

  // Floating small hearts
  const floaters = [];
  const floaterColors = [0xff5c8a, 0xff8fb3, 0xffd37a, 0xff3d7f, 0xffb3d1];
  for (let i = 0; i < 40; i++) {
    const m = new THREE.Mesh(
      heartGeo,
      new THREE.MeshStandardMaterial({
        color: floaterColors[i % floaterColors.length],
        emissive: 0x330011, roughness: 0.4, metalness: 0.2,
      })
    );
    const sc = 0.004 + Math.random() * 0.005;
    m.scale.setScalar(sc);
    m.position.set((Math.random() - 0.5) * 30, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 24 - 4);
    m.userData = { speed: 0.4 + Math.random() * 0.8, spin: (Math.random() - 0.5) * 1.2, baseX: m.position.x, phase: Math.random() * 6 };
    scene.add(m);
    floaters.push(m);
  }

  // Glowing floor ring
  const ringGlow = new THREE.Mesh(
    new THREE.RingGeometry(4.4, 5.6, 80),
    new THREE.MeshBasicMaterial({ color: 0xff5c8a, transparent: true, opacity: 0.25, side: THREE.DoubleSide })
  );
  ringGlow.rotation.x = -Math.PI / 2;
  ringGlow.position.y = -2.6;
  scene.add(ringGlow);

  // ----- Photo ring -----
  const RADIUS = 5;
  const FRAME_W = 2.3, FRAME_H = 3.0;
  const ring = new THREE.Group();
  scene.add(ring);
  const textureLoader = new THREE.TextureLoader();
  const clickables = [];
  const N = CONFIG.photos.length;

  function placeholderTexture(i) {
    const c = document.createElement("canvas");
    c.width = 512; c.height = 660;
    const x = c.getContext("2d");
    const g = x.createLinearGradient(0, 0, 512, 660);
    g.addColorStop(0, "#ff5c8a"); g.addColorStop(1, "#7b2ff7");
    x.fillStyle = g; x.fillRect(0, 0, 512, 660);
    x.fillStyle = "rgba(255,255,255,.9)";
    x.textAlign = "center";
    x.font = "120px serif"; x.fillText("❤", 256, 300);
    x.font = "bold 34px sans-serif"; x.fillText("Add photo " + (i + 1), 256, 400);
    x.font = "22px sans-serif"; x.fillText(CONFIG.photos[i].src, 256, 440);
    return new THREE.CanvasTexture(c);
  }

  // Crop texture so it fills the frame without stretching ("cover")
  function applyCover(tex, img) {
    const planeAspect = FRAME_W / FRAME_H;
    const imgAspect = img.width / img.height;
    if (imgAspect > planeAspect) {
      tex.repeat.set(planeAspect / imgAspect, 1);
      tex.offset.set((1 - planeAspect / imgAspect) / 2, 0);
    } else {
      tex.repeat.set(1, imgAspect / planeAspect);
      tex.offset.set(0, (1 - imgAspect / planeAspect) / 2);
    }
  }

  CONFIG.photos.forEach((p, i) => {
    const a = (i / N) * Math.PI * 2;
    const holder = new THREE.Group();
    holder.position.set(Math.sin(a) * RADIUS, 0, Math.cos(a) * RADIUS);
    holder.rotation.y = a; // faces outward
    holder.userData = { index: i, angle: a };

    // golden frame
    const frame = new THREE.Mesh(
      new THREE.BoxGeometry(FRAME_W + 0.3, FRAME_H + 0.3, 0.1),
      new THREE.MeshStandardMaterial({ color: 0xffd37a, metalness: 0.85, roughness: 0.25, emissive: 0x3a2400 })
    );
    holder.add(frame);

    const mat = new THREE.MeshBasicMaterial({ map: placeholderTexture(i) });
    const geo = new THREE.PlaneGeometry(FRAME_W, FRAME_H);

    const front = new THREE.Mesh(geo, mat);
    front.position.z = 0.06;
    holder.add(front);

    const back = new THREE.Mesh(geo, mat); // so photo also reads correctly from inside the ring
    back.position.z = -0.06;
    back.rotation.y = Math.PI;
    holder.add(back);

    clickables.push(front, back, frame);
    front.userData.holder = back.userData.holder = frame.userData.holder = holder;

    // try loading the real image
    textureLoader.load(
      p.src,
      (tex) => {
        tex.encoding = THREE.sRGBEncoding;
        applyCover(tex, tex.image);
        mat.map = tex;
        mat.needsUpdate = true;
      },
      undefined,
      () => console.warn("Could not load", p.src, "– showing placeholder")
    );

    ring.add(holder);
  });

  // ----- Interaction -----
  let ringRot = 0;
  let velocity = 0;
  let dragging = false;
  let lastX = 0, downX = 0, downY = 0, moved = 0;
  let focused = -1;
  let mouseX = 0, mouseY = 0;
  let started = false;

  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const caption = document.getElementById("caption");

  function setFocus(i) {
    focused = i;
    if (i >= 0) {
      caption.textContent = CONFIG.photos[i].caption || "";
      caption.classList.remove("hidden");
      caption.classList.add("show");
    } else {
      caption.classList.remove("show");
      caption.classList.add("hidden");
    }
  }

  renderer.domElement.addEventListener("pointerdown", (e) => {
    if (!started) return;
    dragging = true;
    lastX = downX = e.clientX;
    downY = e.clientY;
    moved = 0;
    velocity = 0;
    renderer.domElement.setPointerCapture(e.pointerId);
  });

  renderer.domElement.addEventListener("pointermove", (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    if (!dragging) return;
    const dx = e.clientX - lastX;
    lastX = e.clientX;
    moved += Math.abs(dx) + Math.abs(e.clientY - downY) * 0.1;
    if (moved > 6 && focused >= 0) setFocus(-1);
    if (focused < 0) {
      ringRot += dx * 0.007;
      velocity = dx * 0.007;
    }
  });

  renderer.domElement.addEventListener("pointerup", (e) => {
    if (!dragging) return;
    dragging = false;
    if (moved < 6) handleClick(e.clientX, e.clientY);
  });

  function handleClick(x, y) {
    pointer.x = (x / window.innerWidth) * 2 - 1;
    pointer.y = -(y / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(clickables, false);
    if (hits.length) {
      const holder = hits[0].object.userData.holder;
      setFocus(holder.userData.index);
    } else {
      setFocus(-1);
    }
  }

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { setFocus(-1); closeLetter(); }
    if (!started) return;
    if (e.key === "ArrowRight") setFocus(((focused < 0 ? -1 : focused) + 1) % N);
    if (e.key === "ArrowLeft") setFocus((((focused < 0 ? 0 : focused) - 1) + N) % N);
  });

  // ----- Confetti (3D particles) -----
  let confetti = null;
  function burstConfetti() {
    if (confetti) { scene.remove(confetti.points); }
    const count = 600;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const vel = [];
    const palette = [0xff5c8a, 0xffd37a, 0xffffff, 0x8f6bff, 0x5cd6ff, 0xff8f5c].map((h) => new THREE.Color(h));
    for (let i = 0; i < count; i++) {
      pos[i * 3] = 0; pos[i * 3 + 1] = 0; pos[i * 3 + 2] = 0;
      const c = palette[i % palette.length];
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
      vel.push(new THREE.Vector3((Math.random() - 0.5) * 0.5, Math.random() * 0.5 + 0.1, (Math.random() - 0.5) * 0.5));
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("color", new THREE.BufferAttribute(col, 3));
    const points = new THREE.Points(g, new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true }));
    points.position.set(0, 0, 3);
    scene.add(points);
    confetti = { points, vel, life: 0 };
  }

  function updateConfetti() {
    if (!confetti) return;
    confetti.life += 1;
    const p = confetti.points.geometry.attributes.position;
    for (let i = 0; i < confetti.vel.length; i++) {
      const v = confetti.vel[i];
      v.y -= 0.006;
      p.array[i * 3] += v.x;
      p.array[i * 3 + 1] += v.y;
      p.array[i * 3 + 2] += v.z;
    }
    p.needsUpdate = true;
    confetti.points.material.opacity = Math.max(0, 1 - confetti.life / 220);
    if (confetti.life > 220) { scene.remove(confetti.points); confetti = null; }
  }

  // ----- Buttons -----
  const audio = document.getElementById("bgm");
  audio.src = CONFIG.music;
  audio.volume = 0.7;
  const musicBtn = document.getElementById("musicBtn");
  musicBtn.addEventListener("click", () => {
    if (audio.paused) { audio.play().catch(() => {}); musicBtn.classList.remove("off"); }
    else { audio.pause(); musicBtn.classList.add("off"); }
  });
  document.getElementById("confettiBtn").addEventListener("click", burstConfetti);

  const modal = document.getElementById("letterModal");
  function openLetter() { modal.classList.remove("hidden"); modal.classList.add("open"); }
  function closeLetter() { modal.classList.remove("open"); modal.classList.add("hidden"); }
  document.getElementById("letterBtn").addEventListener("click", openLetter);
  document.getElementById("closeLetter").addEventListener("click", closeLetter);
  modal.addEventListener("click", (e) => { if (e.target === modal) closeLetter(); });

  // ----- Start button -----
  document.getElementById("startBtn").addEventListener("click", () => {
    document.getElementById("intro").classList.add("gone");
    document.body.classList.add("ready");
    ["hud", "hint", "buttons"].forEach((id) => document.getElementById(id).classList.remove("hidden"));
    started = true;
    audio.play().catch(() => musicBtn.classList.add("off"));
    setTimeout(burstConfetti, 700);
  });

  // ----- Animate -----
  const clock = new THREE.Clock();
  const TWO_PI = Math.PI * 2;

  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    // ring rotation
    if (focused >= 0) {
      let target = -(focused / N) * TWO_PI;
      // choose the equivalent angle closest to the current one
      target += Math.round((ringRot - target) / TWO_PI) * TWO_PI;
      ringRot += (target - ringRot) * 0.08;
    } else if (!dragging) {
      ringRot += velocity;
      velocity *= 0.95;
      if (Math.abs(velocity) < 0.0005) ringRot += 0.0025; // gentle auto-rotate
    }
    ring.rotation.y = ringRot;

    // camera
    const targetZ = focused >= 0 ? focusCamZ() : baseCamZ();
    camera.position.z += (targetZ - camera.position.z) * 0.06;
    const targetY = focused >= 0 ? 0.2 : 1.5;
    camera.position.y += (targetY + -mouseY * 0.6 - camera.position.y) * 0.04;
    camera.position.x += (mouseX * 1.2 - camera.position.x) * 0.04;
    camera.lookAt(0, 0, 0);

    // center heart: heartbeat + spin
    const beat = 1 + Math.pow(Math.sin(t * 2.6), 8) * 0.18;
    bigHeart.scale.setScalar(0.03 * beat);
    bigHeart.rotation.y = t * 0.6;
    bigHeart.position.y = Math.sin(t * 1.2) * 0.2;
    centerLight.intensity = 2.2 + Math.sin(t * 2.6) * 0.6;
    ringGlow.material.opacity = 0.2 + Math.sin(t * 1.5) * 0.08;

    // floating hearts
    floaters.forEach((m) => {
      m.position.y += 0.006 * m.userData.speed;
      m.position.x = m.userData.baseX + Math.sin(t * 0.6 + m.userData.phase) * 0.6;
      m.rotation.y += 0.01 * m.userData.spin;
      if (m.position.y > 11) m.position.y = -11;
    });

    window.__stars.rotation.y = t * 0.01;

    updateConfetti();
    renderer.render(scene, camera);
  }
  animate();

  // ----- Resize -----
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
})();