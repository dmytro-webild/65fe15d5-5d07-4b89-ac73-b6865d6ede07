import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Phone, Instagram, MapPin } from "lucide-react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { FACET_SHAPES, FACET_SIZE, type FacetBuilt, type FacetShapeDef } from "@/components/kit/facetShapes";
import { introSignal } from "@/components/kit/introSignal";

type TitleLine = { text: string };
type Button = { text: string; href: string };

type HeroGlassCubeProps = {
  titleLines?: TitleLine[];
  primaryButton?: Button;
  tag?: string;
  statement?: string;
  label?: string;
  description?: string;
  shape?: string;
  shapeDef?: FacetShapeDef;
  finish?: "glass" | "metal";
  introDelay?: number;
  className?: string;
};

type Cubie = {
  g: THREE.Object3D;
  cell: THREE.Vector3;
  q: THREE.Quaternion;
  jitter: THREE.Vector3;
  tumble: THREE.Quaternion;
  axis: THREE.Vector3;
  order: number;
  e: number;
  v: number;
  k: number;
  delay: number;
};

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const glbCache = new Map<string, Promise<ArrayBuffer>>();
const fetchGlb = (url: string) => {
  let job = glbCache.get(url);
  if (!job) {
    job = fetch(url).then((r) => {
      if (!r.ok) throw new Error(`${r.status} ${url}`);
      return r.arrayBuffer();
    });
    job.catch(() => glbCache.delete(url));
    glbCache.set(url, job);
  }
  return job;
};
if (typeof window !== "undefined") for (const s of Object.values(FACET_SHAPES)) if (s.model) fetchGlb(s.model).catch(() => undefined);

export default function HeroGlassCube({
  titleLines = [{ text: "Objects for rooms" }, { text: "that are lived in" }],
  primaryButton,
  tag,
  statement,
  label,
  description,
  shape = "cube",
  shapeDef,
  finish = "glass",
  introDelay = 0,
  className,
}: HeroGlassCubeProps) {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const def = shapeDef ?? FACET_SHAPES[shape] ?? FACET_SHAPES.cube;
  const [lifted, setLifted] = useState(() => typeof window !== "undefined" && introSignal.isClaimed() && !introSignal.isRevealed() && !matchMedia("(prefers-reduced-motion: reduce)").matches);

  const [held] = useState(lifted);
  const [shown, setShown] = useState(!lifted);
  useEffect(() => (held ? introSignal.onReveal(() => setShown(true)) : undefined), [held]);
  const wait = held ? 0 : introDelay;

  useEffect(() => {
    if (!lifted) return;
    let t = 0;
    const off = introSignal.onReveal(() => {
      t = window.setTimeout(() => setLifted(false), 900);
    });
    return () => {
      off();
      window.clearTimeout(t);
    };
  }, [lifted]);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    if (!section || !canvas || !stage) return;

    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const touch = matchMedia("(hover: none)").matches;
    const puzzle = !!def.model;
    const isGlass = finish !== "metal";
    const playing = !reduced && introSignal.isClaimed() && !introSignal.isRevealed();
    let born = performance.now();
    const span = Math.max(0.7, introDelay - 0.1);
    const introAt = () => (performance.now() - born) / 1000;
    const gather = (order: number) => {
      if (!playing) return 0;
      const x = Math.min(1, Math.max(0, (introAt() - 0.1 - order * span * 0.3) / (span * 0.7)));
      return Math.pow(1 - x, 4);
    };

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    const dpr = Math.min(devicePixelRatio, 1.5);
    renderer.setPixelRatio(dpr);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = isGlass ? 1 : 0.92;
    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);

    const room = isGlass ? null : new RoomEnvironment();
    let envTarget: THREE.WebGLRenderTarget | null = room ? pmrem.fromScene(room, 0.04) : null;
    if (envTarget) scene.environment = envTarget.texture;

    const studio = new THREE.Scene();
    studio.background = new THREE.Color(0x020202);
    const formers: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>[] = [];
    const former = (w: number, h: number, at: [number, number, number], strength: number) => {
      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, toneMapped: false }));
      mesh.position.set(...at);
      mesh.lookAt(0, 0, 0);
      mesh.userData.strength = strength;
      mesh.material.color.setScalar(strength);
      studio.add(mesh);
      formers.push(mesh);
      return mesh;
    };
    former(7, 7, [0, 7, 0.5], 0.9);
    former(1.1, 9, [-6, 1, 2.5], 6);
    former(0.7, 7, [6, 0.5, 1.5], 3.5);
    former(12, 1, [0, 2.5, -6], 2.2);
    former(4, 2, [2.5, 3, 6], 0.7);
    const floor = former(12, 4, [0, -6, 1.5], 2.4);

    const hemi = new THREE.HemisphereLight(0x1a0101, 0xff8a2c, isGlass ? 0.5 : 1.1);
    const key = new THREE.DirectionalLight(0xffffff, isGlass ? 1.2 : 1.6);
    key.position.set(-4, 6, 5);
    const under = new THREE.PointLight(0xff8a2c, isGlass ? 20 : 45, 14, 1.6);
    under.position.set(0, -4.5, 2.5);
    scene.add(hemi, key, under);

    const glassMat = new THREE.MeshPhysicalMaterial(
      isGlass
        ? {
            color: 0xffffff,
            metalness: 0,
            roughness: 0.16,
            transmission: 1,
            thickness: 1.5,
            ior: 1.45,
            dispersion: 1.2,
            attenuationColor: 0xff8a2c,
            attenuationDistance: 2.4,
            specularIntensity: 1,
            clearcoat: 1,
            clearcoatRoughness: 0.04,
            envMapIntensity: 1.5,
          }
        : {
            color: 0xa8100a,
            roughness: 0.32,
            metalness: 1,
            clearcoat: 0.5,
            clearcoatRoughness: 0.12,
            envMapIntensity: 1.1,
          },
    );
    const coreMat = new THREE.MeshPhysicalMaterial({ color: 0xff8a2c, emissive: 0xff8a2c, emissiveIntensity: 0.55, roughness: 0.3, metalness: 0.2, clearcoat: 1 });

    const backCanvas = document.createElement("canvas");
    backCanvas.width = 256;
    backCanvas.height = 256;
    const backTex = new THREE.CanvasTexture(backCanvas);
    backTex.colorSpace = THREE.SRGBColorSpace;
    const backdrop = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: backTex, toneMapped: false }));
    backdrop.position.z = -8;
    backdrop.renderOrder = -1;
    backdrop.visible = isGlass;
    backdrop.onBeforeRender = (r) => {
      const inPass = r.getRenderTarget() !== null;
      backdrop.material.colorWrite = inPass;
      backdrop.material.depthWrite = inPass;
    };
    scene.add(backdrop);

    const swatch = document.createElement("canvas").getContext("2d", { willReadFrequently: true });
    const resolve = (name: string) => {
      const probe = document.createElement("i");
      probe.style.cssText = `display:none;color:var(${name}, transparent)`;
      section.appendChild(probe);
      const colour = getComputedStyle(probe).color;
      probe.remove();
      if (!swatch) return colour;
      swatch.clearRect(0, 0, 1, 1);
      swatch.fillStyle = colour;
      swatch.fillRect(0, 0, 1, 1);
      const [r, g, b, a] = swatch.getImageData(0, 0, 1, 1).data;
      return a ? `rgb(${r},${g},${b})` : "";
    };

    const paintBackdrop = () => {
      const ctx = backCanvas.getContext("2d");
      if (!ctx) return;
      const v = (name: string) => resolve(name) || "black";
      const W = backCanvas.width;
      const H = backCanvas.height;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.save();
      ctx.translate(W * 0.5, H * 1.08);
      ctx.scale(W * 1.3, H * 1.2);
      const g = ctx.createRadialGradient(0, 0, 0, 0, 0, 1);
      g.addColorStop(0, v("--glow-floor"));
      g.addColorStop(0.22, v("--glow-low"));
      g.addColorStop(0.46, v("--glow-mid"));
      g.addColorStop(0.66, v("--glow-deep"));
      g.addColorStop(0.95, v("--glow-deep"));
      ctx.fillStyle = g;
      ctx.fillRect(-1, -2, 2, 2);
      ctx.restore();
      backTex.needsUpdate = true;
    };

    const rebuildStudio = () => {
      if (!isGlass) return;
      const next = pmrem.fromScene(studio, 0.03);
      envTarget?.dispose();
      envTarget = next;
      scene.environment = next.texture;
    };

    let colourKey = "";
    const readColours = () => {
      const tint = resolve("--glass-tint");
      const glow = resolve("--glass-glow");
      const sky = resolve("--glass-sky");
      const next = `${tint}|${glow}|${sky}|${resolve("--glow-mid")}|${resolve("--glow-floor")}`;
      if (next === colourKey) return;
      colourKey = next;
      if (isGlass) {
        if (glow) glassMat.attenuationColor.setStyle(glow);
        if (tint) glassMat.color.set(0xffffff).lerp(new THREE.Color().setStyle(tint), 0.08);
        if (glow) floor.material.color.setStyle(glow).multiplyScalar(floor.userData.strength);
        paintBackdrop();
        rebuildStudio();
      } else if (tint) {
        glassMat.color.setStyle(tint).lerp(new THREE.Color(0x2a2a2e), 0.35);
      }
      if (glow) {
        hemi.groundColor.setStyle(glow);
        under.color.setStyle(glow);
        coreMat.color.setStyle(glow);
        coreMat.emissive.setStyle(glow);
      }
      if (sky) hemi.color.setStyle(sky);
    };
    readColours();
    const colourWatch = new MutationObserver(readColours);
    colourWatch.observe(document.documentElement, { attributes: true });
    const host = section.closest("main");
    if (host) colourWatch.observe(host, { attributes: true });

    let seed = 7;
    const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    const cube = new THREE.Group();
    const units = new THREE.Group();
    cube.add(units);
    scene.add(cube);
    const cubies: Cubie[] = [];
    let pitch = 1;
    let appear = 0;
    let ready = false;
    let disposed = false;
    let loaded: THREE.Object3D | null = null;
    let built: FacetBuilt | null = null;
    let flights: { g: THREE.Object3D; dir: THREE.Vector3; axis: THREE.Vector3; order: number }[] = [];

    const markReady = () => {
      if (playing && introAt() > 0.25) born = performance.now();
      introSignal.markReady();
    };

    if (def.model) {
      const loader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
      fetchGlb(def.model)
        .then((buf) => loader.parseAsync(buf.slice(0), ""))
        .then((gltf) => {
          loaded = gltf.scene;
          if (disposed) {
            disposeTree(gltf.scene);
            return;
          }
          const centres = new Map<string, THREE.Vector3>();
          const marks: THREE.Mesh[] = [];
          for (const part of [...gltf.scene.children]) {
            const m = part.name.match(/^part-x(\d)y(\d)z(\d)$/);
            if (!m) continue;
            const centre = new THREE.Box3().setFromObject(part).getCenter(new THREE.Vector3());
            for (const child of part.children) child.position.sub(centre);
            part.position.copy(centre);
            centres.set(m.slice(1).join(""), centre);
            part.traverse((o) => {
              const mesh = o as THREE.Mesh;
              if (!mesh.isMesh) return;
              const mat = mesh.material as THREE.Material;
              if (mat.name === "Ember glass") {
                mat.dispose();
                mesh.material = glassMat;
              } else marks.push(mesh);
            });
            for (const mesh of marks.splice(0)) {
              mesh.removeFromParent();
              mesh.geometry.dispose();
              (mesh.material as THREE.Material).dispose();
            }
            units.add(part);
            const cell = new THREE.Vector3(+m[1] - 1, +m[2] - 1, +m[3] - 1);
            cubies.push({
              g: part,
              cell,
              q: new THREE.Quaternion(),
              jitter: new THREE.Vector3((rnd() - 0.5) * 0.35, (rnd() - 0.5) * 1.2, (rnd() - 0.5) * 1.2),
              tumble: new THREE.Quaternion().setFromEuler(new THREE.Euler((rnd() - 0.5) * 1.5, (rnd() - 0.5) * 1.6, (rnd() - 0.5) * 0.8)),
              axis: new THREE.Vector3(rnd() - 0.5, rnd() - 0.5, rnd() - 0.5).normalize(),
              order: (cell.length() / Math.sqrt(3)) * 0.75 + rnd() * 0.25,
              e: 0,
              v: 0,
              k: 150 + rnd() * 110,
              delay: 0,
            });
          }
          const a = centres.get("211");
          const b = centres.get("111");
          if (a && b) pitch = a.x - b.x;
          units.scale.setScalar(1 / pitch);
          ready = cubies.length > 0;
          if (ready) markReady();
          kick();
        })
        .catch(() => undefined);
    } else if (def.build) {
      built = def.build(glassMat, coreMat);
      loaded = built.object;
      units.add(loaded);
      ready = true;
      markReady();
      scene.updateMatrixWorld(true);
      flights = built.parts.map((g, i, all) => {
        const dir = new THREE.Box3().setFromObject(g).getCenter(new THREE.Vector3());
        g.parent?.worldToLocal(dir);
        if (dir.lengthSq() < 1e-4) dir.set(rnd() - 0.5, rnd() - 0.5, 0);
        dir.normalize().add(new THREE.Vector3((rnd() - 0.5) * 0.5, (rnd() - 0.5) * 0.5, 0.45)).normalize();
        return { g, dir, axis: new THREE.Vector3(rnd() - 0.5, rnd() - 0.5, rnd() - 0.5).normalize(), order: all.length > 1 ? i / (all.length - 1) : 0 };
      });
    }

    const ndc = new THREE.Vector2(0, 0);
    const tilt = new THREE.Vector2(0, 0);
    const ray = new THREE.Raycaster();
    const hit = new THREE.Sphere(new THREE.Vector3(), 2.3);
    let open = false;
    let pointerIn = false;
    let tap = false;
    let burst = 0;
    let burstV = 0;
    const reach = () => (puzzle ? 2.45 * (1 + (cubies[13]?.e ?? 0) * 0.55) : (FACET_SIZE / 2) * 1.05 * (1 + Math.max(0, burst) * 0.2));

    const aim = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      pointerIn = true;
      aim(e);
    };
    const onLeave = () => {
      pointerIn = false;
    };
    const onUp = (e: PointerEvent) => {
      if (!touch) return;
      aim(e);
      ray.setFromCamera(ndc, camera);
      hit.center.copy(cube.position);
      hit.radius = reach() * fit * (open ? 1.3 : 1);
      if (ray.ray.intersectsSphere(hit) || open) {
        tap = !tap;
      }
    };
    section.addEventListener("pointermove", onMove);
    section.addEventListener("pointerleave", onLeave);
    canvas.addEventListener("pointerup", onUp);

    const hovering = () => {
      if (touch) return tap;
      if (!pointerIn) return false;
      ray.setFromCamera(ndc, camera);
      hit.center.copy(cube.position);
      hit.radius = reach() * fit;
      return ray.ray.intersectsSphere(hit);
    };

    let twist: { a: number; layer: number; dir: number; t: number } | null = null;
    let nextTwist = 1.6 + (playing ? introDelay : 0);
    const AX = [new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 1)];
    const comp = ["x", "y", "z"] as const;
    const startTwist = () => {
      twist = { a: Math.floor(Math.random() * 3), layer: Math.floor(Math.random() * 3) - 1, dir: Math.random() < 0.5 ? 1 : -1, t: 0 };
    };
    const endTwist = () => {
      if (!twist) return;
      const q = new THREE.Quaternion().setFromAxisAngle(AX[twist.a], (twist.dir * Math.PI) / 2);
      for (const c of cubies)
        if (Math.round(c.cell[comp[twist.a]]) === twist.layer) {
          c.cell.applyQuaternion(q).round();
          c.q.premultiply(q);
        }
      twist = null;
    };
    const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

    let fit = 1;
    let restX = 0;
    let restY = 0;
    let riseBy = 0;
    const resize = () => {
      const w = section.clientWidth;
      const h = section.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      renderer.transmissionResolutionScale = Math.min(1, 768 / (Math.max(w, h) * dpr));
      camera.aspect = w / h;
      const portrait = w / h < 0.9;
      const dist = portrait ? 15.5 : 13.5;
      camera.fov = portrait ? 42 : 30;
      camera.position.set(0, 0, dist);
      camera.lookAt(0, 0, 0);
      camera.updateProjectionMatrix();
      const unit = (2 * dist * Math.tan((camera.fov * Math.PI) / 360)) / h;
      const s = section.getBoundingClientRect();
      const r = stage.getBoundingClientRect();
      const desktop = w >= 880;
      const size = desktop ? Math.min(r.width * 1.2, r.height * 0.84) * 0.8 : Math.min(w * 0.92, r.height * 0.95);
      restX = 0;
      restY = (h / 2 - (desktop ? s.height / 2 : r.top - s.top + r.height / 2)) * unit;
      riseBy = r.height * 0.08 * unit;
      fit = (size * unit) / (puzzle ? 4.2 : FACET_SIZE);
      if (playing) {
        document.documentElement.style.setProperty("--intro-x", `${s.left + w / 2}px`);
        document.documentElement.style.setProperty("--intro-y", `${desktop ? s.top + s.height / 2 : r.top + r.height / 2}px`);
      }
      const backH = 2 * (dist + 8) * Math.tan((camera.fov * Math.PI) / 360);
      backdrop.scale.set(backH * camera.aspect, backH, 1);
      kick();
    };
    const sizeWatch = new ResizeObserver(resize);
    sizeWatch.observe(section);
    sizeWatch.observe(stage);

    const tmpQ = new THREE.Quaternion();
    const tq = new THREE.Quaternion();
    const base = new THREE.Vector3();
    const out = new THREE.Vector3();
    const SPREAD = new THREE.Vector3(1.0, 0.42, 0.8);
    let yaw = -0.62;
    let clock = 0;
    let last = performance.now();
    let raf = 0;
    let onScreen = true;

    const frame = (now: number) => {
      raf = 0;
      const dt = Math.min((now - last) / 1000, 1 / 30);
      last = now;
      const want = hovering();
      if (want !== open) {
        open = want;
        for (const c of cubies) c.delay = (open ? c.cell.length() : 2 - c.cell.length()) * 0.035;
      }

      if (puzzle && !twist && !reduced && cubies.every((c) => c.e < 0.02 && !open)) {
        nextTwist -= dt;
        if (nextTwist <= 0) {
          startTwist();
          nextTwist = 1.4 + Math.random() * 1.6;
        }
      }
      if (twist) {
        twist.t = Math.min(1, twist.t + dt / 0.75);
        if (twist.t >= 1) endTwist();
      }

      for (const c of cubies) {
        if (c.delay > 0) c.delay -= dt;
        else {
          const k = reduced ? 60 : c.k;
          const d = reduced ? 2 * Math.sqrt(60) : 2 * Math.sqrt(c.k) * 0.55;
          c.v += (k * ((open ? 1 : 0) - c.e) - d * c.v) * dt;
          c.e += c.v * dt;
        }
        base.copy(c.cell);
        tmpQ.copy(c.q);
        if (twist && Math.round(c.cell[comp[twist.a]]) === twist.layer) {
          tq.setFromAxisAngle(AX[twist.a], (twist.dir * ease(twist.t) * Math.PI) / 2);
          base.applyQuaternion(tq);
          tmpQ.premultiply(tq);
        }
        const s = gather(c.order);
        const e = c.e + s * 3.2;
        out.copy(base).multiply(SPREAD).add(c.jitter).multiplyScalar(e).add(base);
        c.g.position.copy(out).multiplyScalar(pitch);
        c.g.quaternion.copy(tmpQ).premultiply(tq.identity().slerp(c.tumble, Math.max(0, Math.min(1.25, e))));
        if (s > 0) c.g.quaternion.premultiply(tq.setFromAxisAngle(c.axis, s * 2.8));
      }

      for (const f of flights) {
        const s = gather(f.order);
        f.g.position.copy(f.dir).multiplyScalar(s * 2.6);
        f.g.quaternion.setFromAxisAngle(f.axis, s * 2.8);
      }

      if (built) {
        const k = reduced ? 60 : 110;
        const d = reduced ? 2 * Math.sqrt(60) : 2 * Math.sqrt(110) * 0.6;
        burstV += (k * ((open ? 1 : 0) - burst) - d * burstV) * dt;
        burst += burstV * dt;
        if (!reduced) clock += dt;
        built.tick(clock, Math.max(0, Math.min(1.15, burst)));
      }

      if (!reduced) yaw += dt * (open ? 0.05 : 0.16);
      const px = pointerIn && !touch ? ndc.x : 0;
      const py = pointerIn && !touch ? ndc.y : 0;
      tilt.x += (py * 0.28 - tilt.x) * Math.min(1, dt * 4);
      tilt.y += (px * 0.45 - tilt.y) * Math.min(1, dt * 4);
      const whirl = playing ? Math.pow(1 - Math.min(1, introAt() / (span + 0.2)), 3) : 0;
      cube.rotation.set((puzzle ? 0.52 : 0.18) - tilt.x, yaw + tilt.y - whirl * 1.6, 0.06);
      if (ready) appear += (1 - appear) * Math.min(1, dt * (reduced ? 20 : 2.6));
      cube.scale.setScalar(fit * (0.7 + 0.3 * appear));
      cube.position.set(restX, restY - (1 - appear) * riseBy, 0);
      units.visible = ready;

      canvas.style.cursor = !touch && open ? "grab" : "";
      renderer.render(scene, camera);
      if (onScreen && !document.hidden) raf = requestAnimationFrame(frame);
    };

    function kick() {
      if (raf || disposed || !onScreen || document.hidden) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    }

    const viewWatch = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      if (onScreen) kick();
      else if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    });
    viewWatch.observe(stage);
    const onVisibility = () => {
      if (!document.hidden) kick();
    };
    document.addEventListener("visibilitychange", onVisibility);
    resize();

    function disposeTree(root: THREE.Object3D) {
      const seen = new Set<THREE.BufferGeometry>();
      root.traverse((o) => {
        const mesh = o as THREE.Mesh;
        if (!mesh.isMesh) return;
        if (!seen.has(mesh.geometry)) {
          seen.add(mesh.geometry);
          mesh.geometry.dispose();
        }
        const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        for (const mat of mats) {
          for (const value of Object.values(mat)) if (value instanceof THREE.Texture) value.dispose();
          mat.dispose();
        }
      });
    }

    return () => {
      disposed = true;
      if (raf) cancelAnimationFrame(raf);
      document.documentElement.style.removeProperty("--intro-x");
      document.documentElement.style.removeProperty("--intro-y");
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("pointerup", onUp);
      document.removeEventListener("visibilitychange", onVisibility);
      sizeWatch.disconnect();
      viewWatch.disconnect();
      colourWatch.disconnect();
      if (loaded) disposeTree(loaded);
      glassMat.dispose();
      coreMat.dispose();
      backTex.dispose();
      backdrop.geometry.dispose();
      backdrop.material.dispose();
      for (const f of formers) {
        f.geometry.dispose();
        f.material.dispose();
      }
      envTarget?.dispose();
      room?.dispose();
      pmrem.dispose();
      renderer.dispose();
    };
  }, [def, finish, introDelay]);

  const rise = (i: number) =>
    reduce
      ? {}
      : {
          initial: { y: "105%" },
          animate: { y: shown ? "0%" : "105%" },
          transition: { duration: 1.1, delay: wait + i * 0.08, ease: EASE },
        };
  const fade = (i: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: shown ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
          transition: { duration: 0.8, delay: wait + 0.3 + i * 0.1, ease: EASE },
        };

  const lines = titleLines.filter((line) => line.text.trim());
  const hasBottom = !!label || !!description;

  return (
    <section ref={sectionRef} aria-label="Introduction" style={lifted ? { zIndex: 210 } : undefined} className={`relative isolate flex min-h-svh flex-col overflow-clip text-foreground lg:h-svh lg:min-h-[35rem] ${className ?? ""}`}>
      <canvas ref={canvasRef} aria-label={def.alt} role="img" className="absolute inset-0 z-[2] block size-full touch-pan-y" />
      <div className="pointer-events-none relative z-[5] mx-auto flex w-[var(--container)] flex-1 flex-col pb-[clamp(1.5rem,4vh,2.5rem)] pt-[5.5rem] lg:pt-[clamp(5.5rem,13vh,7.5rem)]">
        <div className="flex flex-1 flex-col gap-y-8 lg:grid lg:grid-cols-12 lg:gap-x-[var(--gap)] lg:gap-y-0">
          <div className="lg:col-span-5 lg:row-start-1 lg:self-center">
            {lines.length > 0 && (
              <h1 className="pointer-events-auto text-balance text-[length:var(--text-h1)] leading-[0.95] tracking-[-0.035em]">
                {lines.map((line, i) => (
                  <div key={i} className="overflow-hidden pb-[0.1em] -mb-[0.1em]">
                    <motion.p {...rise(i)} className="text-balance">
                      {line.text}
                    </motion.p>
                  </div>
                ))}
              </h1>
            )}
            <motion.div {...fade(0)} className="mt-[clamp(1.5rem,5vh,3rem)] flex flex-wrap items-center gap-3">
              {primaryButton && (
                <a href={primaryButton.href} className="btn-arrow pointer-events-auto">
                  <p>{primaryButton.text}</p>
                  <div aria-hidden="true" className="btn-arrow-dot">
                    <svg viewBox="0 0 14 14" className="size-3.5">
                      <path d="M4 10 10 4M5.5 4H10v4.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </a>
              )}
              <a href="tel:2155947640" className="btn-secondary pointer-events-auto flex items-center gap-2">
                <Phone className="size-4 text-primary" />
                <span>(215) 594-7640</span>
              </a>
              <a href="https://www.instagram.com/baccara.buket_philadelphia/" target="_blank" rel="noopener noreferrer" className="btn-secondary pointer-events-auto flex items-center gap-2">
                <Instagram className="size-4 text-primary" />
                <span>Instagram</span>
              </a>
              <a href="https://maps.app.goo.gl/b2Kueyuh7xVfXj758" target="_blank" rel="noopener noreferrer" className="btn-secondary pointer-events-auto flex items-center gap-2">
                <MapPin className="size-4 text-primary" />
                <span>Google Maps</span>
              </a>
            </motion.div>
          </div>
          <div ref={stageRef} className="relative min-h-[16rem] flex-1 lg:col-span-4 lg:col-start-6 lg:row-start-1 lg:min-h-0" />
          {(tag || statement) && (
            <motion.div {...fade(1)} className="pointer-events-auto hidden justify-items-start gap-5 lg:grid lg:col-span-3 lg:col-start-10 lg:row-start-1 lg:self-end lg:pb-[clamp(1rem,6vh,4rem)]">
              {tag && (
                <p className="whitespace-nowrap rounded-full border border-[color-mix(in_srgb,var(--foreground)_22%,transparent)] px-5 py-2 text-[length:var(--text-small)] leading-[1.2] text-[color-mix(in_srgb,var(--foreground)_72%,transparent)]">
                  {tag}
                </p>
              )}
              {statement && <p className="max-w-[22rem] text-balance text-[length:var(--text-h3)] leading-[1.2]">{statement}</p>}
            </motion.div>
          )}
        </div>
        {hasBottom && (
          <motion.div {...fade(2)} className="pointer-events-auto mt-8 grid grid-cols-1 gap-y-3 lg:mt-[clamp(1.5rem,4vh,3rem)] lg:grid-cols-12 lg:items-end lg:gap-x-[var(--gap)]">
            {label && <p className="text-[length:var(--text-small)] font-medium leading-[1.4] lg:col-span-3">{label}</p>}
            {description && (
              <p className="max-w-[40rem] text-balance text-[length:var(--text-h3)] leading-[1.25] text-[color-mix(in_srgb,var(--foreground)_55%,transparent)] lg:col-span-6 lg:col-start-4">
                {description}
              </p>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}
