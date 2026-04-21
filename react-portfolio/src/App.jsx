import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import * as THREE from "three";
import Loader from "./components/Loader";
import { 
  getAudioCtx, 
  playRevealSound, 
  playCuteSound, 
  playStaggerPop, 
  playRelaxingOpening, 
  playShimmerSound,
  playMechanicalClick
} from "./utils/audio";
import "./ProjectsCube.css";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Climate Risk Interpreter",
    description: "Developed for Google Praxis 2.0, this system utilizes advanced data modeling to analyze and visualize environmental impact metrics.",
    stack: "Python, TensorFlow, Geospatial APIs",
    href: "#",
    video: "/videos/rec3.mp4",
  },
  {
    title: "AI Money Coach",
    description: "An Open Innovation project for ET Gen AI Hackathon. An intelligent assistant for personalized wealth management and fiscal coaching.",
    stack: "OpenAI API, LangChain, Vector DB",
    href: "#",
    video: "/videos/rec4.mp4",
  },
  {
    title: "Anime Storefront",
    description: "An immersive e-commerce experience designed for enthusiasts, utilizing Three.js and 3D modeling for an interactive environment.",
    stack: "Three.js, React Three Fiber, GLSL",
    href: "#",
    video: "/videos/rec5.mp4",
  },
  {
    title: "Nomad Journey",
    description: "A visually rich travel landing page focused on seamless user experience and modern web aesthetics.",
    stack: "HTML5, CSS3, JavaScript",
    href: "#",
    video: "/videos/rec1.mp4",
  },
  {
    title: "EY Techathon Solution",
    description: "A strategic digital transformation tool built for the EY Techathon, focusing on automated financial auditing and anomaly detection.",
    stack: "Azure AI, PowerBI, Python, Snowflake",
    href: "#",
    video: "/videos/rec2.mp4",
  },
  {
    title: "Hyperlocal AQI Dashboard",
    description: "Developed for India Innovates 2026, providing real-time street-level pollution insights using IoT and predictive modeling.",
    stack: "IoT Hub, React, Node.js, ML Regression",
    href: "#",
    video: "/videos/rec6.mp4",
  },
];

const achievements = [
  {
    title: "Hackathon and Build Challenges",
    eyebrow: "Achievement 01",
    description:
      "Built and presented practical product ideas under time pressure while improving teamwork, rapid prototyping, and pitching confidence.",
    meta: "Problem solving, delivery, collaboration",
  },
  {
    title: "Frontend Portfolio Iterations",
    eyebrow: "Achievement 02",
    description:
      "Created multiple portfolio design directions and refined them into stronger, more polished interfaces with better hierarchy and visual consistency.",
    meta: "UI systems, polish, iteration",
  },
  {
    title: "AI and MVP Exploration",
    eyebrow: "Achievement 03",
    description:
      "Explored AI-powered MVP ideas, backend integration, and model-driven features to understand how intelligent products are shaped end to end.",
    meta: "GenAI, APIs, MVP thinking",
  },
];

const certifications = [
  {
    title: "Frontend Development Certification",
    issuer: "Add your platform here",
    detail: "HTML, CSS, JavaScript, responsive layouts, and modern web fundamentals.",
  },
  {
    title: "React or Next.js Certification",
    issuer: "Add your platform here",
    detail: "Component-based UI, routing, app structure, state handling, and reusable frontend architecture.",
  },
  {
    title: "Python / C++ Programming Certification",
    issuer: "Add your platform here",
    detail: "Programming logic, problem solving, data structures, and core coding foundations.",
  },
  {
    title: "AI / Machine Learning Certification",
    issuer: "Add your platform here",
    detail: "GenAI basics, AI APIs, model workflows, and practical ML concepts for product building.",
  },
];

const skills = [
  {
    title: "Development",
    eyebrow: "Web Architecture",
    description:
      "Architecting high-performance layouts, brutalist web applications, and dynamic UI ecosystems using React, Next.js, and modern CSS to deliver seamless user experiences.",
    meta: "// HTML, CSS, JavaScript, React, Next.js",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Programming",
    eyebrow: "Logic and Optimization",
    description:
      "Engineering robust computational logic, advanced data structure applications, and algorithmic solutions in Python and C++ to drive complex scalable systems.",
    meta: "// Python, C++, DSA, OOP",
    image:
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "3D Motion",
    eyebrow: "Immersive Visuals",
    description:
      "Designing interactive spatial environments, fluid motion graphics, and rich web-rendered scenes bridging the threshold between traditional 2D interfaces and deep 3D data.",
    meta: "// Spline, WebGL, Three.js, Blender",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "AI and ML",
    eyebrow: "Intelligent Systems",
    description:
      "Deploying intelligent pipeline architectures, GenAI protocol integrations, and practical machine learning layers directly into functional product endpoints.",
    meta: "// GenAI, ML, APIs, MVPs, LLMs",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=80",
  },
];

const tools = [
  "Python",
  "C++",
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "3D Animation",
  "Spline",
  "WebGL",
  "Three.js",
  "Blender",
  "GSAP",
  "Generative AI",
  "Machine Learning",
  "AI APIs",
  "MVP Building",
  "Model Serving",
  "Backend Servers",
  "Responsive Design",
];

const D7_DRIPS = Array.from({ length: 15 }).map(() => ({
  left: `${Math.random() * 100}%`,
  animationDelay: `${Math.random() * 3}s`,
  animationDuration: `${0.8 + Math.random() * 1.5}s`,
  opacity: 0.2 + Math.random() * 0.4
}));

// Reusable UI sound functions using Web Audio API

function CustomCursor() {
  const mountRef = useRef(null);
  const ringRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    // 1. Three.js Setup for 3D Cursor Element
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(40, 40);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    if (mountRef.current) mountRef.current.appendChild(renderer.domElement);

    // Create a sharp, minimalist 3D shape (Octahedron)
    const geometry = new THREE.OctahedronGeometry(1, 0);
    const material = new THREE.MeshBasicMaterial({ 
      color: 0xff0000, 
      wireframe: true,
      transparent: true,
      opacity: 0.8
    });
    const octahedron = new THREE.Mesh(geometry, material);
    scene.add(octahedron);

    camera.position.z = 2.5;

    // 2. GSAP smooth movement for Dot and Ring
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let currentRotateSpeed = 0.02;
    
    const moveCursor = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Immediate 3D mount movement
      gsap.to(mountRef.current, {
        x: mouseX,
        y: mouseY,
        duration: 0.15,
        ease: "power2.out"
      });

      // Simple dot still used for the glow effect
      gsap.to(dotRef.current, {
        x: mouseX,
        y: mouseY,
        duration: 0.1,
        ease: "power2.out"
      });
    };

    let lastX = 0, lastY = 0;
    const ticker = () => {
      const vx = mouseX - lastX;
      const vy = mouseY - lastY;
      lastX = mouseX;
      lastY = mouseY;
      
      const speed = Math.sqrt(vx * vx + vy * vy);
      const angle = Math.atan2(vy, vx) * 180 / Math.PI;
      
      // 3D Rotation based on movement
      octahedron.rotation.y += currentRotateSpeed + (speed * 0.005);
      octahedron.rotation.x += currentRotateSpeed * 0.5;
      
      // Smoothly follow with lag for the ring
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      
      gsap.set(ringRef.current, {
        x: ringX,
        y: ringY,
        rotate: angle,
        scaleX: 1 + Math.min(speed * 0.02, 0.8),
        scaleY: 1 - Math.min(speed * 0.01, 0.3)
      });
      
      renderer.render(scene, camera);
      requestAnimationFrame(ticker);
    };
    ticker();

    const onMouseDown = () => {
      playCuteSound(600, 0.04);
      currentRotateSpeed = 0.15;
      gsap.to(octahedron.scale, { x: 0.5, y: 0.5, z: 0.5, duration: 0.2 });
      gsap.to(ringRef.current, { 
        scale: 1.2, 
        borderColor: "#ff0000",
        backgroundColor: "rgba(255, 0, 0, 0.2)",
        duration: 0.2 
      });
    };
    const onMouseUp = () => {
      playCuteSound(800, 0.03);
      currentRotateSpeed = 0.02;
      gsap.to(octahedron.scale, { x: 1, y: 1, z: 1, duration: 0.4, ease: "back.out(2)" });
      gsap.to(ringRef.current, { 
        scale: 1, 
        borderColor: "rgba(139, 0, 0, 0.8)",
        backgroundColor: "transparent",
        duration: 0.4 
      });
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    const selector = "a, button, .cta, .cta-back, .home-nav-btn, .home-nav-links a, .home-about-card, .skill-lore-card";
    const onEnter = () => {
      playCuteSound(1200, 0.02);
      currentRotateSpeed = 0.08;
      gsap.to(material, { opacity: 1, duration: 0.3 });
      gsap.to(ringRef.current, { 
        scale: 1.4, 
        borderColor: "#ff0000", 
        opacity: 1, 
        rotate: 45,
        backgroundColor: "rgba(139, 0, 0, 0.2)",
        duration: 0.3 
      });
    };
    const onLeave = () => {
      currentRotateSpeed = 0.02;
      gsap.to(material, { opacity: 0.8, duration: 0.3 });
      gsap.to(ringRef.current, { 
        scale: 1, 
        borderColor: "rgba(139, 0, 0, 0.8)", 
        opacity: 0.8, 
        rotate: 0,
        backgroundColor: "transparent",
        duration: 0.3 
      });
    };

    const refreshHovers = () => {
      document.querySelectorAll(selector).forEach(t => {
        t.addEventListener('mouseenter', onEnter);
        t.addEventListener('mouseleave', onLeave);
      });
    };

    refreshHovers();
    const interval = setInterval(refreshHovers, 2000);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      clearInterval(interval);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="custom-cursor-container">
      <div ref={mountRef} className="cursor-3d-mount" />
      <div ref={ringRef} className="cursor-ring" />
      <div ref={dotRef} className="cursor-dot-glow" />
    </div>
  );
}

function App() {
  const [isIntroDone, setIsIntroDone] = useState(false);

  const getPageFromHash = () => {
    if (window.location.hash === "#projects") return "projects";
    if (window.location.hash === "#achievements") return "achievements";
    return "home";
  };

  const [page, setPage] = useState(getPageFromHash);

  useEffect(() => {
    const onHashChange = () => {
      setPage(getPageFromHash());
    };

    window.addEventListener("hashchange", onHashChange);

    // Colorful GSAP Hovers
    const interactiveEls = document.querySelectorAll(".home-nav-links a, .home-nav-btn, .cta, .cta-back, .home-background-link, .home-nav-brand");
    
    const colors = ["#ff0055", "#00ffee", "#ffaa00", "#cc00ff", "#00ff66"];

    interactiveEls.forEach((el, i) => {
      const color = colors[i % colors.length];
      
      el.addEventListener("mouseenter", () => {
        gsap.to(el, {
          color: color,
          textShadow: `0 0 10px ${color}, 0 0 20px ${color}44`,
          scale: 1.08,
          duration: 0.4,
          ease: "back.out(1.7)",
          overwrite: true
        });
        
        // If it's a button with a border
        if (getComputedStyle(el).borderStyle !== "none") {
          gsap.to(el, {
            borderColor: color,
            boxShadow: `0 0 15px ${color}66`,
            duration: 0.4
          });
        }
      });

      el.addEventListener("mouseleave", () => {
        gsap.to(el, {
          color: "",
          textShadow: "none",
          scale: 1,
          borderColor: "",
          boxShadow: "none",
          duration: 0.4,
          ease: "power2.out",
          overwrite: true
        });
      });
    });

    return () => {
      window.removeEventListener("hashchange", onHashChange);
    };
  }, []);

  useEffect(() => {
    if (window.location.hash && window.location.hash !== "#home") {
      setIsIntroDone(true);
    }
  }, []);

  return (
    <>
      <div className="glitch-overlay" />
      <div className="scanline" />
      <div className={`app-loader${isIntroDone ? " is-hidden" : ""}`} aria-hidden={isIntroDone}>
        <Loader onComplete={() => {
          playRelaxingOpening();
          window.setTimeout(() => setIsIntroDone(true), 220);
        }} />
      </div>

      <CustomCursor />

      {page === "projects" ? (
        <ProjectsPage />
      ) : page === "achievements" ? (
        <AchievementsPage />
      ) : (
        <HomePage />
      )}
    </>
  );
}

function HomePage() {
  const pageRef = useRef(null);
  const navRef = useRef(null);
  const backgroundCardRef = useRef(null);
  const aboutSectionRef = useRef(null);
  const aboutIntroRef = useRef(null);
  const aboutCardRefs = useRef([]);
  const aboutPillRefs = useRef([]);
  const skillsSectionRef = useRef(null);
  const skillsCardRefs = useRef([]);
  const heroSectionRef = useRef(null);
  const logoPathRef = useRef(null);

  useEffect(() => {
      // 1. Magnetic Effect for Buttons and Nav
      const magneticTargets = document.querySelectorAll(".home-nav-links a, .home-nav-btn, .get-in-touch-btn, .home-background-link, .home-nav-brand");
    
    const handleMagneticMove = (e) => {
      const target = e.currentTarget;
      const rect = target.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      gsap.to(target, {
        x: x * 0.4,
        y: y * 0.4,
        duration: 0.5,
        ease: "power2.out"
      });
      
      const inner = target.querySelector("span, svg");
      if (inner) {
        gsap.to(inner, {
          x: x * 0.2,
          y: y * 0.2,
          duration: 0.5,
          ease: "power2.out"
        });
      }
    };

    const handleMagneticLeave = (e) => {
      const target = e.currentTarget;
      gsap.to(target, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: "elastic.out(1, 0.3)"
      });
      
      const inner = target.querySelector("span, svg");
      if (inner) {
        gsap.to(inner, {
          x: 0,
          y: 0,
          duration: 0.7,
          ease: "elastic.out(1, 0.3)"
        });
      }
    };

    magneticTargets.forEach(btn => {
      btn.addEventListener("mousemove", handleMagneticMove);
      btn.addEventListener("mouseleave", handleMagneticLeave);
    });

    // 2. Mouse Parallax for Hero Card and Section Elements
    const handleGlobalParallax = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      
      // Hero Card
      if (backgroundCardRef.current) {
        gsap.to(backgroundCardRef.current, {
          rotateY: x * 8,
          rotateX: -y * 8,
          x: x * 15,
          y: y * 15,
          duration: 1,
          ease: "power2.out"
        });
      }

      // About Cards and Pills - Liquid Physics Movement
      const movableElements = [
        ...aboutCardRefs.current, 
        ...aboutPillRefs.current,
        ...skillsCardRefs.current
      ].filter(Boolean);

      movableElements.forEach((el, i) => {
        const factor = (i % 3 + 1) * 15;
        const rotateFactor = (i % 2 === 0 ? 1 : -1) * 5;
        
        gsap.to(el, {
          x: x * factor,
          y: y * factor,
          rotateZ: x * rotateFactor,
          rotateX: -y * rotateFactor,
          rotateY: x * rotateFactor,
          duration: 1.2 + (i * 0.05),
          ease: "power2.out",
          transformPerspective: 1000
        });
      });
    };
    window.addEventListener("mousemove", handleGlobalParallax);

    return () => {
      magneticTargets.forEach(btn => {
        btn.removeEventListener("mousemove", handleMagneticMove);
        btn.removeEventListener("mouseleave", handleMagneticLeave);
      });
      window.removeEventListener("mousemove", handleGlobalParallax);
    };
  }, []);

  useEffect(() => {
    const pageElement = pageRef.current;
    const aboutElement = aboutSectionRef.current;
    const introElement = aboutIntroRef.current;
    const backgroundCardElement = backgroundCardRef.current;
    const cards = aboutCardRefs.current.filter(Boolean);
    const pills = aboutPillRefs.current.filter(Boolean);
    const skillsElement = skillsSectionRef.current;
    const skillCards = skillsCardRefs.current.filter(Boolean);
    const skillHeader = gsap.utils.toArray(".home-skills-header > *");
    const heroChars = gsap.utils.toArray(".home-background-title .skills-title-char");
    const heroText = gsap.utils.toArray(".home-background-card > p, .home-background-actions");
    const navElement = navRef.current;

    if (
      !pageElement ||
      !aboutElement ||
      !introElement ||
      !skillsElement ||
      !cards.length
    ) {
      return undefined;
    }

    const setAboutProgress = gsap.quickSetter(aboutElement, "--about-progress");
    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      media.add(
        {
          desktop: "(min-width: 901px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (mq) => {
          if (mq.conditions?.reduceMotion) {
            gsap.set(
              [
                navElement,
                ...heroChars,
                ...heroText,
                introElement,
                ...cards,
                ...pills,
                backgroundCardElement,
                ...skillCards,
                ...skillHeader,
              ],
              {
                clearProps: "all",
              },
            );
            setAboutProgress(1);
            return;
          }

          setAboutProgress(0);

          gsap.set(navElement, {
            opacity: 0,
            y: -18,
          });

          gsap.set(heroChars, {
            opacity: 0,
            yPercent: 115,
          });

          gsap.set(heroText, {
            opacity: 0,
            y: 22,
          });

          gsap.set(backgroundCardElement, {
            opacity: 0,
            y: 30,
            scale: 0.98,
          });

          gsap.set(introElement, {
            opacity: 0,
            y: 88,
          });

          gsap.set(cards, {
            opacity: 0,
            y: 112,
            rotateX: 12,
            transformPerspective: 1200,
            transformOrigin: "center top",
          });

          if (pills.length) {
            gsap.set(pills, {
              opacity: 0,
              y: 34,
              scale: 0.94,
            });
          }

          if (backgroundCardElement) {
            gsap.set(backgroundCardElement, {
              transformOrigin: "left bottom",
            });
          }

          gsap.set(skillHeader, {
            opacity: 0,
            y: 38,
          });

          gsap.set(skillCards, {
            opacity: 0,
            y: 56,
            scale: 0.97,
          });

          const progressState = {
            value: 0,
          };
          const progressTo = gsap.quickTo(progressState, "value", {
            duration: 0.65,
            ease: "power3.out",
            onUpdate: () => {
              setAboutProgress(progressState.value);
            },
          });

          gsap
            .timeline({
              defaults: {
                ease: "power3.out",
              },
            })
            .to(
              navElement,
              {
                opacity: 1,
                y: 0,
                duration: 0.55,
              },
              0,
            )
            .to(
              backgroundCardElement,
              {
                opacity: 1,
                y: 0,
                scale: 1,
                rotateX: 0,
                duration: 1,
                ease: "expo.out"
              },
              0.08,
            )
            .to(
              heroChars,
              {
                opacity: 1,
                yPercent: 0,
                rotateX: 0,
                scale: 1,
                duration: 1.2,
                stagger: {
                  amount: 0.6,
                  from: "center"
                },
                ease: "back.out(1.7)"
              },
              0.15,
            )
            .to(
              heroText,
              {
                opacity: 1,
                y: 0,
                duration: 0.7,
                stagger: 0.1,
                ease: "power4.out"
              },
              0.5,
            );

          // Stunning Parallax for Silhouette and Drips
          gsap.to(".mask-silhouette", {
            yPercent: -20,
            scale: 1.1,
            scrollTrigger: {
              trigger: ".design7-hero",
              start: "top top",
              end: "bottom top",
              scrub: 1
            }
          });

          gsap.to(".drip-container", {
            yPercent: 30,
            scrollTrigger: {
              trigger: ".design7-hero",
              start: "top top",
              end: "bottom top",
              scrub: 1.5
            }
          });

          gsap.set(backgroundCardElement, {
            rotateX: 20,
            transformPerspective: 1000
          });

          gsap.set(heroChars, {
            rotateX: -90,
            scale: 0.8,
            transformPerspective: 1000
          });

          gsap
            .timeline({
              defaults: {
                ease: "power4.out",
              },
              scrollTrigger: {
                trigger: aboutElement,
                start: "top 88%",
                end: "top 18%",
                scrub: 1.2,
                onEnter: () => playRevealSound(300, "sine", 1.2),
              },
            })
            .to(
              introElement,
              {
                opacity: 1,
                y: 0,
                scale: 1,
                filter: "blur(0px)",
              },
              0,
            )
            .to(
              cards,
              {
                opacity: 1,
                y: 0,
                rotateY: 0,
                rotateX: 0,
                scale: 1,
                stagger: 0.1,
              },
              0.1,
            )
            .to(
              pills,
              {
                opacity: 1,
                y: 0,
                scale: 1,
                stagger: 0.05,
              },
              0.3,
            );

          gsap.set(introElement, { scale: 0.9, opacity: 0 });
          gsap.set(cards, { 
            rotateY: (i) => i % 2 === 0 ? 15 : -15, 
            rotateX: 10,
            scale: 0.9,
            transformPerspective: 1200 
          });

          ScrollTrigger.create({
            trigger: aboutElement,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.6,
            onUpdate: ({ progress }) => {
              progressTo(Number(progress.toFixed(3)));
            },
          });

          if (backgroundCardElement) {
            gsap.to(backgroundCardElement, {
              yPercent: mq.conditions?.desktop ? -22 : -12,
              scale: 1.05,
              rotateX: -5,
              ease: "none",
              scrollTrigger: {
                trigger: aboutElement,
                start: "top bottom",
                end: "bottom top",
                scrub: 2.2,
              },
            });
          }

          cards.forEach((card, index) => {
            gsap.fromTo(
              card,
              {
                yPercent: 0,
              },
              {
                yPercent: mq.conditions?.desktop ? -10 - index * 5 : 0,
                rotateY: index % 2 === 0 ? 5 : -5,
                ease: "none",
                scrollTrigger: {
                  trigger: card,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 1.5,
                },
              },
            );
          });

          gsap
            .timeline({
              defaults: {
                ease: "expo.out",
              },
              scrollTrigger: {
                trigger: skillsElement,
                start: "top 85%",
                end: "top 25%",
                scrub: 1,
                onEnter: () => playRevealSound(500, "sine", 1.0),
              },
            })
            .to(
              skillHeader,
              {
                opacity: 1,
                y: 0,
                rotateX: 0,
                stagger: 0.05,
              },
              0,
            )
            .to(
              skillCards,
              {
                opacity: 1,
                y: 0,
                scale: 1,
                rotateY: 0,
                stagger: 0.1,
              },
              0.15,
            );

          gsap.set(skillHeader, { rotateX: -45, transformPerspective: 1000 });
          gsap.set(skillCards, { rotateY: 15, scale: 0.95, transformPerspective: 1000 });

          // Pulse effect for availability dot
          gsap.to(".home-availability-dot", {
            scale: 1.5,
            opacity: 0.5,
            duration: 1,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
          });

          // 3. Live Floating Animations for Cards and Pills
          [...cards, ...skillCards, ...aboutPillRefs.current].filter(Boolean).forEach((el, i) => {
            gsap.to(el, {
              y: "-=15",
              duration: 2 + Math.random() * 2,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
              delay: i * 0.15
            });
          });

          // 4. Marquee Speed Up on Scroll
          const marqueeTrack = document.querySelector(".home-marquee-track");
          if (marqueeTrack) {
            ScrollTrigger.create({
              trigger: ".home-marquee",
              start: "top bottom",
              end: "bottom top",
              onUpdate: (self) => {
                const speed = 1 + self.getVelocity() / 500;
                gsap.to(marqueeTrack, {
                  timeScale: Math.abs(speed),
                  duration: 0.5,
                  overwrite: true
                });
              }
            });
          }

          // 5. Stunning Image Parallax for Skill Cards
          skillCards.forEach((card) => {
            const img = card.querySelector("img");
            if (img) {
              gsap.to(img, {
                yPercent: 20,
                scale: 1.1,
                ease: "none",
                scrollTrigger: {
                  trigger: card,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true
                }
              });
            }
          });

          // 6. Reveal Reveal for About Text Blocks
            const aboutTexts = document.querySelectorAll(".home-about-text, .home-about-card p");
            aboutTexts.forEach((text) => {
              gsap.fromTo(text, {
                opacity: 0,
                y: 20,
                filter: "blur(8px)"
              }, {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: text,
                  start: "top 90%",
                  toggleActions: "play none none reverse"
                }
              });
            });

            // 7. Dynamic Background Shift on Scroll
            gsap.to(".home-page", {
              backgroundPositionY: "20%",
              ease: "none",
              scrollTrigger: {
                trigger: ".home-page",
                start: "top top",
                end: "bottom bottom",
                scrub: true
              }
            });

            // 8. Staggered reveal for skills tags
            const skillTags = document.querySelectorAll(".home-skills-tag");
            if (skillTags.length) {
              gsap.fromTo(skillTags, {
                opacity: 0,
                scale: 0.5,
                y: 20
              }, {
                opacity: 1,
                scale: 1,
                y: 0,
                stagger: {
                  each: 0.05,
                  onStart: function() {
                    playStaggerPop(1400 + Math.random() * 200);
                  }
                },
                duration: 0.8,
                ease: "back.out(2)",
                scrollTrigger: {
                  trigger: ".home-skills-tags",
                  start: "top 95%",
                  toggleActions: "play none none reverse"
                }
              });
            }

            // 10. Magnetic Headers
          const headers = document.querySelectorAll(".home-about-title, .skills-heading, .home-background-title");
          headers.forEach(header => {
            const chars = header.querySelectorAll(".skills-title-char");
            header.addEventListener("mousemove", (e) => {
              const rect = header.getBoundingClientRect();
              const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
              const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
              
              gsap.to(chars, {
                x: (i) => x * (1 + i * 0.05),
                y: (i) => y * (1 + i * 0.05),
                duration: 0.6,
                ease: "power2.out",
                stagger: 0.01
              });
            });
            
            header.addEventListener("mouseleave", () => {
              gsap.to(chars, {
                x: 0,
                y: 0,
                duration: 1,
                ease: "elastic.out(1, 0.3)",
                stagger: 0.01
              });
            });
          });

          ScrollTrigger.create({
            start: 100,
              end: 140,
              onUpdate: ({ progress }) => {
                if (navElement) {
                  navElement.style.boxShadow =
                    progress > 0 ? "0 6px 36px rgba(0, 0, 0, 0.24)" : "none";
                }
              },
            });

            // 9. Glitch and Scanline Effects on Scroll
            gsap.to(".scanline", {
              y: "100vh",
              opacity: 0.1,
              duration: 2,
              repeat: -1,
              ease: "none"
            });

            ScrollTrigger.create({
              trigger: "body",
              start: "top top",
              end: "bottom bottom",
              onUpdate: (self) => {
                if (Math.abs(self.getVelocity()) > 1000) {
                  gsap.to(".glitch-overlay", {
                    opacity: 0.15,
                    duration: 0.1,
                    yoyo: true,
                    repeat: 1,
                    ease: "power2.inOut"
                  });
                }
              }
            });
        },
      );
    }, pageElement);

    const handlePointerMove = (event) => {
      const card = event.currentTarget;
      const rect = card.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;

      gsap.to(card, {
        duration: 0.4,
        ease: "power2.out",
        "--skill-rx": `${(0.5 - py) * 15}deg`,
        "--skill-ry": `${(px - 0.5) * 15}deg`,
        y: -10,
        scale: 1.02,
        overwrite: true
      });
      
      // Update glare/light effect if we add it in CSS
      const glare = card.querySelector(".skill-lore-card-wash");
      if (glare) {
        gsap.to(glare, {
          opacity: 0.4,
          x: (px - 0.5) * 100,
          y: (py - 0.5) * 100,
          duration: 0.4
        });
      }
    };

    const handlePointerLeave = (event) => {
      const card = event.currentTarget;
      gsap.to(card, {
        duration: 0.8,
        ease: "elastic.out(1, 0.5)",
        "--skill-rx": "0deg",
        "--skill-ry": "0deg",
        y: 0,
        scale: 1,
        overwrite: true
      });
      
      const glare = card.querySelector(".skill-lore-card-wash");
      if (glare) {
        gsap.to(glare, {
          opacity: 0,
          duration: 0.8
        });
      }
    };

    skillCards.forEach((card) => {
      card.addEventListener("pointermove", handlePointerMove);
      card.addEventListener("pointerleave", handlePointerLeave);
    });

    return () => {
      skillCards.forEach((card) => {
        card.removeEventListener("pointermove", handlePointerMove);
        card.removeEventListener("pointerleave", handlePointerLeave);
      });
      media.revert();
      context.revert();
      aboutCardRefs.current = [];
      aboutPillRefs.current = [];
      skillsCardRefs.current = [];
    };
  }, []);

  return (
    <main className="home-page" ref={pageRef}>
      <nav className="home-nav" ref={navRef}>
        <a className="home-nav-brand" href="#home">
          <span className="home-nav-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M12 2 15 9 22 12 15 15 12 22 9 15 2 12 9 9Z"></path>
            </svg>
          </span>
          <span className="home-nav-brand-copy">
            <span className="home-nav-brand-title">Ankur</span>
            <span className="home-nav-brand-subtitle">Portfolio Archive</span>
          </span>
        </a>

        <div className="home-nav-links">
          <a href="#home">
            <span className="home-nav-index">00</span>
            Home
          </a>
          <a href="#projects">
            <span className="home-nav-index">01</span>
            Projects
          </a>
          <a href="#achievements">
            <span className="home-nav-index">02</span>
            Achievements
          </a>
          <a href="#about">
            <span className="home-nav-index">03</span>
            About
          </a>
          <a href="#skills">
            <span className="home-nav-index">04</span>
            Skills
          </a>
        </div>

        <div className="home-nav-actions">
          <a className="home-nav-btn" href="#home" aria-label="Home section">
            <span className="home-nav-tip">Home</span>
            <svg viewBox="0 0 24 24">
              <path d="M3 10.5 12 3l9 7.5"></path>
              <path d="M5 9.5V21h14V9.5"></path>
            </svg>
          </a>
          <a className="home-nav-btn" href="#projects" aria-label="Open projects page">
            <span className="home-nav-tip">Projects</span>
            <svg viewBox="0 0 24 24">
              <rect x="3" y="4" width="18" height="14" rx="1"></rect>
              <path d="M7 20h10"></path>
              <path d="M9 8h6"></path>
              <path d="M9 12h3"></path>
            </svg>
          </a>
          <a className="home-nav-btn" href="#about" aria-label="About section">
            <span className="home-nav-tip">About</span>
            <svg viewBox="0 0 24 24">
              <circle cx="12" cy="8" r="3"></circle>
              <path d="M6 20c1.8-3.6 4.1-5.4 6-5.4S16.2 16.4 18 20"></path>
            </svg>
          </a>
          <a className="home-nav-btn" href="#achievements" aria-label="Achievements page">
            <span className="home-nav-tip">Achievements</span>
            <svg viewBox="0 0 24 24">
              <path d="M12 3 14.8 8.7 21 9.6l-4.5 4.4 1.1 6.2L12 17.3 6.4 20.2 7.5 14 3 9.6l6.2-.9Z"></path>
            </svg>
          </a>
          <a className="home-nav-btn" href="#skills" aria-label="Skills page">
            <span className="home-nav-tip">Skills</span>
            <svg viewBox="0 0 24 24">
              <path d="M5 12h14"></path>
              <path d="M13 6l6 6-6 6"></path>
            </svg>
          </a>
        </div>
      </nav>

      <section className="home-background design7-hero" aria-hidden="true">
        {/* === DESIGN 7 BACKGROUND LAYERS === */}
        <div className="design7-hero-bg"></div>
        <div className="design7-red-bleed"></div>
        
        <div className="mask-silhouette">
          <div className="mask-shape">
            <div className="mask-face">
              <svg viewBox="0 0 100 150">
                <path d="M50 0 C20 0 10 30 10 70 C10 120 40 150 50 150 C60 150 90 120 90 70 C90 30 80 0 50 0 Z" fill="#fff" />
                <ellipse cx="35" cy="55" rx="8" ry="16" fill="#000" />
                <ellipse cx="65" cy="55" rx="8" ry="16" fill="#000" />
                <path d="M42 100 Q50 130 58 100 Z" fill="#000" />
                <path d="M48 85 L50 82 L52 85 Z" fill="#000" />
              </svg>
            </div>
          </div>
        </div>

        <div className="drip-container">
          {D7_DRIPS.map((style, i) => (
            <div key={i} className="drip" style={style} />
          ))}
        </div>

        <img className="hero-ghost-overlay" src="https://images.unsplash.com/photo-1610118833912-70b1063625f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Ghost" />
        
        <div style={{ position: "absolute", bottom: "clamp(24px, 4vw, 48px)", left: "clamp(24px, 4vw, 48px)", zIndex: 10 }}>
          <a href="#about" className="get-in-touch-btn">Get In Touch</a>
        </div>
        <div className="home-background-card" ref={backgroundCardRef}>
          <p className="home-background-eyebrow">Frontend Developer</p>
          <SplitChars text="Ankur Bishyer" as="h1" className="home-background-title" />
          <p className="home-background-text">
            I build sharp, modern interfaces with clean structure, bold visual rhythm,
            and smooth user interaction.
          </p>
          <p className="home-background-text">
            Frontend Developer crafting experiences that look strong, feel fast, and
            leave a lasting impression.
          </p>
          <div className="home-background-actions">
            <a className="home-background-link" href="#projects">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="3" y="4" width="18" height="14" rx="1"></rect>
                <path d="M7 20h10"></path>
                <path d="M9 8h6"></path>
                <path d="M9 12h3"></path>
              </svg>
              <span>Open Projects</span>
            </a>
            <a className="home-background-link secondary" href="#skills">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 7h16"></path>
                <path d="M4 12h10"></path>
                <path d="M4 17h13"></path>
              </svg>
              <span>Scroll to Skills</span>
            </a>
            <a className="home-background-link secondary" href="#achievements">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 3 14.8 8.7 21 9.6l-4.5 4.4 1.1 6.2L12 17.3 6.4 20.2 7.5 14 3 9.6l6.2-.9Z"></path>
              </svg>
              <span>View Achievements</span>
            </a>
          </div>
          <div className="home-background-meta">
            <div className="home-availability">
              <span className="home-availability-dot"></span>
              Available for projects
            </div>
            <div className="home-scroll-indicator" aria-hidden="true">
              <span>Scroll</span>
              <span className="home-scroll-line"></span>
            </div>
          </div>
        </div>
      </section>

      <section className="home-content">
        <div className="home-hero-spacer" aria-hidden="true"></div>
        <section className="home-marquee" aria-label="Technology marquee">
          <div className="home-marquee-track">
            {[...tools, ...tools].map((tool, index) => (
              <React.Fragment key={`${tool}-${index}`}>
                <span className="home-marquee-item">{tool}</span>
                <span className="home-marquee-sep" aria-hidden="true">
                  ✦
                </span>
              </React.Fragment>
            ))}
          </div>
        </section>

        <section className="home-about" id="about" ref={aboutSectionRef}>
          <div className="home-about-stage">
            <div className="home-about-intro" ref={aboutIntroRef}>
              <p className="home-about-kicker">About</p>
              <SplitChars
                text="Frontend developer with a strong visual instinct."
                className="home-about-title"
              />
              <p className="home-about-text">
                I am a Computer Science student at University Institute of Engineering
                and Technology, MDU Rohtak, currently studying in 4th semester. I enjoy
                building frontend experiences that feel clean, modern, and purposeful.
              </p>
              <p className="home-about-text">
                Alongside academics, I spend time improving my React skills, exploring
                animation with GSAP, and designing interfaces that combine strong visual
                presentation with practical usability.
              </p>
            </div>

            <div className="home-about-grid">
              <article
                className="home-about-card accent compact"
                ref={(element) => {
                  aboutCardRefs.current[0] = element;
                }}
              >
                <p className="home-about-card-label">Role</p>
                <h3>CSE Student and Frontend Developer</h3>
                <p>
                  My branch is Computer Science and Engineering, and I like working on
                  responsive layouts, interaction polish, component-driven UI, and
                  visual refinement for modern web experiences.
                </p>
              </article>

              <article
                className="home-about-card"
                ref={(element) => {
                  aboutCardRefs.current[1] = element;
                }}
              >
                <p className="home-about-card-label">Approach</p>
                <h3>Clean, bold, fast</h3>
                <p>
                  I like interfaces that look sharp, feel lightweight, and stay easy to
                  use. I care about smooth behavior, clear hierarchy, readable code,
                  and building projects that help me grow as a developer.
                </p>
              </article>

              <article
                className="home-about-card wide"
                ref={(element) => {
                  aboutCardRefs.current[2] = element;
                }}
              >
                <p className="home-about-card-label">What I Do</p>
                <div className="home-about-list">
                  {[
                    "Make projects",
                    "Design UI",
                    "Make 3D models",
                    "Build websites",
                  ].map((item, index) => (
                    <span
                      key={item}
                      ref={(element) => {
                        aboutPillRefs.current[index] = element;
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="home-skills" id="skills" ref={skillsSectionRef}>
          <span className="home-skills-orb home-skills-orb-one" aria-hidden="true"></span>
          <span className="home-skills-orb home-skills-orb-two" aria-hidden="true"></span>

          <div className="home-skills-inner">
            <div className="home-skills-header">
              <p className="home-skills-kicker">Skills</p>
              <SplitChars
                text="Technical Arsenal"
                className="skills-heading"
              />
              <p className="home-skills-copy">
                Operating at the bleeding edge of front-end architecture, computational logic, generative AI, and immersive spatial web design.
              </p>
              <p className="home-skills-copy">
                I synthesize sophisticated engineering paradigms with high-end sci-fi aesthetics to architect digital experiences that are functional, performant, and ruthlessly modern.
              </p>
            </div>

            <div className="home-skills-grid">
              {skills.map((skill, index) => (
                <article
                  key={skill.title}
                  className="skill-lore-card"
                  ref={(element) => {
                    skillsCardRefs.current[index] = element;
                  }}
                >
                  <div className="skill-lore-card-img">
                    <img src={skill.image} alt={skill.title} />
                  </div>
                  <div className="skill-lore-card-wash"></div>
                  <div className="skill-lore-card-overlay"></div>
                  <div className="skill-lore-card-bar"></div>
                  <div className="skill-lore-card-grid"></div>
                  <div className="skill-lore-card-corner tl"></div>
                  <div className="skill-lore-card-corner br"></div>
                  <div className="skill-lore-card-badge">0{index + 1} focus</div>
                  <div className="skill-lore-card-content">
                    <div className="skill-lore-card-eyebrow">{skill.eyebrow}</div>
                    <h3 className="skill-lore-card-name">{skill.title}</h3>
                    <p className="skill-lore-card-text">{skill.description}</p>
                    <div className="skill-lore-card-meta">
                      <div className="skill-lore-card-count">{skill.meta}</div>
                      <div className="skill-lore-card-enter">Explore</div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="home-skills-tags">
              {tools.map((tool) => (
                <span key={tool} className="home-skills-tag">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}

function ThreeBackground() {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Particle Matrix
    const particlesCount = 2000;
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15;

      const r = Math.random();
      colors[i * 3] = r > 0.5 ? 1 : 0.8; // Red focus
      colors[i * 3 + 1] = 0;
      colors[i * 3 + 2] = 0;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.015,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Floating Geometric Shapes
    const shapes = [];
    const shapeGroup = new THREE.Group();
    scene.add(shapeGroup);

    const shapeGeom = new THREE.IcosahedronGeometry(1, 1);
    const shapeMat = new THREE.MeshBasicMaterial({ 
      color: 0xff0000, 
      wireframe: true, 
      transparent: true, 
      opacity: 0.1 
    });

    for (let i = 0; i < 5; i++) {
      const mesh = new THREE.Mesh(shapeGeom, shapeMat);
      mesh.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 5
      );
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      mesh.userData.speed = 0.005 + Math.random() * 0.01;
      shapeGroup.add(mesh);
      shapes.push(mesh);
    }

    // Abstract Grid Floor
    const gridHelper = new THREE.GridHelper(30, 30, 0xff0000, 0x111111);
    gridHelper.position.y = -5;
    scene.add(gridHelper);

    camera.position.z = 8;

    let targetX = 0;
    let targetY = 0;
    const handleMouseMove = (event) => {
      targetX = (event.clientX / window.innerWidth - 0.5) * 0.5;
      targetY = (event.clientY / window.innerHeight - 0.5) * 0.5;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);

      points.rotation.y += 0.001;
      points.rotation.x += 0.0005;

      shapes.forEach(shape => {
        shape.rotation.x += shape.userData.speed;
        shape.rotation.y += shape.userData.speed;
        shape.position.y += Math.sin(Date.now() * 0.001 + shape.position.x) * 0.002;
      });

      // Smooth camera follow
      camera.position.x += (targetX * 5 - camera.position.x) * 0.05;
      camera.position.y += (-targetY * 5 - camera.position.y) * 0.05;
      
      // Interactive particles - subtle pull towards mouse
      points.rotation.y += (targetX * 0.1 - points.rotation.y) * 0.01;
      points.rotation.x += (targetY * 0.1 - points.rotation.x) * 0.01;
      
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return <div ref={mountRef} className="three-bg-canvas" />;
}

function ProjectsPage() {
  const scrollContainerRef = useRef(null);
  const hudPctRef = useRef(null);
  const progFillRef = useRef(null);
  const sceneNameRef = useRef(null);
  const captionNumRef = useRef(null);
  const captionNameRef = useRef(null);

  useEffect(() => {
    const sections = [...scrollContainerRef.current.querySelectorAll("section")];
    const FACE_NAMES = ["START", ...projects.map(p => p.title.toUpperCase()), "END"];
    const N = projects.length + 2;

    // HUD & Progress Updates
    let lastSceneIndex = -1;
    const updateHUD = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      const si = Math.min(Math.floor(progress * (N - 1) + 0.5), N - 1);
      const name = FACE_NAMES[si] || "";

      if (si !== lastSceneIndex && lastSceneIndex !== -1) {
        playCuteSound(1200 + si * 100, 0.02);
        lastSceneIndex = si;
      } else if (lastSceneIndex === -1) {
        lastSceneIndex = si;
      }

      if (hudPctRef.current) {
        hudPctRef.current.innerText = String(Math.round(progress * 100)).padStart(3, "0") + "%";
      }
      if (progFillRef.current) {
        progFillRef.current.style.width = `${progress * 100}%`;
      }
      if (sceneNameRef.current) sceneNameRef.current.innerText = name;
      if (captionNumRef.current) captionNumRef.current.innerText = String(si + 1).padStart(2, "0");
      if (captionNameRef.current) captionNameRef.current.innerText = name;
    };

    window.addEventListener("scroll", updateHUD);
    updateHUD();

    // Stunning GSAP Animations
        const ctx = gsap.context(() => {
          sections.forEach((section, idx) => {
            const card = section.querySelector(".text-card");
            const media = section.querySelector(".project-media-wrap");
            const title = section.querySelector("h1, h2");
            const tags = section.querySelector(".tag");
            const items = section.querySelectorAll(".body-text, .stat-row, .cta-row, .h-line");

            // 1. Media Reveal (Scale & Opacity)
            if (media) {
              gsap.fromTo(media, {
                clipPath: "inset(100% 0% 0% 0%)",
                scale: 1.2,
                opacity: 0,
                rotateY: idx % 2 === 0 ? 10 : -10
              }, {
                clipPath: "inset(0% 0% 0% 0%)",
                scale: 1,
                opacity: 1,
                rotateY: 0,
                duration: 1.5,
                ease: "expo.out",
                scrollTrigger: {
                  trigger: section,
                  start: "top 75%",
                  toggleActions: "play none none reverse",
                  onEnter: () => playRevealSound(300 + idx * 50, "sine", 1.0)
                }
              });

              // Parallax for media content
              gsap.to(media.querySelector("img, video"), {
                yPercent: 20,
                scale: 1.1,
                ease: "none",
                scrollTrigger: {
                  trigger: section,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 1
                }
              });
            }

            // 2. Text Content Reveal
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: section,
                start: "top 65%",
                toggleActions: "play none none reverse"
              }
            });

            // 3D Card Rotation on scroll
            gsap.fromTo(card, {
              rotateY: idx % 2 === 0 ? 20 : -20,
              rotateX: 10,
              transformPerspective: 1200,
              opacity: 0,
              x: idx % 2 === 0 ? -50 : 50
            }, {
              rotateY: idx % 2 === 0 ? -5 : 5,
              rotateX: -5,
              opacity: 1,
              x: 0,
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2
              }
            });

            if (tags) {
              tl.fromTo(tags, { opacity: 0, x: -30, skewX: 15 }, { opacity: 1, x: 0, skewX: 0, duration: 0.8, ease: "power4.out" });
            }

            if (title) {
              const chars = title.querySelectorAll(".skills-title-char");
              tl.fromTo(chars, { 
                opacity: 0, 
                y: 60,
                rotateX: -120,
                scale: 0.4,
                filter: "blur(12px)"
              }, { 
                opacity: 1, 
                y: 0, 
                rotateX: 0,
                scale: 1,
                filter: "blur(0px)",
                stagger: {
                  amount: 0.7,
                  from: "random",
                  onStart: function() {
                    playStaggerPop(800 + Math.random() * 400);
                  }
                },
                duration: 1.4, 
                ease: "back.out(2)" 
              }, "-=1.2");

              // Magnetic title letters on Projects Page
              chars.forEach(char => {
                char.addEventListener("mousemove", (e) => {
                  if (Math.random() > 0.8) playCuteSound(1500, 0.01);
                  const rect = char.getBoundingClientRect();
                  const x = e.clientX - rect.left - rect.width / 2;
                  const y = e.clientY - rect.top - rect.height / 2;
                  gsap.to(char, {
                    x: x * 0.5,
                    y: y * 0.5,
                    duration: 0.4,
                    color: "#ff0055",
                    ease: "power2.out"
                  });
                });
                char.addEventListener("mouseleave", () => {
                  gsap.to(char, {
                    x: 0,
                    y: 0,
                    duration: 0.6,
                    color: "",
                    ease: "elastic.out(1, 0.3)"
                  });
                });
              });
            }

            if (items.length) {
              tl.fromTo(items, { 
                opacity: 0, 
                y: 30,
                rotateX: 15
              }, { 
                opacity: 1, 
                y: 0, 
                rotateX: 0,
                stagger: {
                  each: 0.1,
                  onStart: function() {
                    playStaggerPop(600 + Math.random() * 200);
                  }
                }, 
                duration: 0.9, 
                ease: "power3.out" 
              }, "-=0.8");
            }

            // Magnetic effect on hover
            const onMouseMove = (e) => {
              if (Math.random() > 0.95) playCuteSound(400, 0.01);
              const rect = card.getBoundingClientRect();
              const x = e.clientX - rect.left - rect.width / 2;
              const y = e.clientY - rect.top - rect.height / 2;
              gsap.to(card, {
                x: x * 0.2,
                y: y * 0.2,
                rotateY: (x / rect.width) * 15,
                rotateX: -(y / rect.height) * 15,
                duration: 0.6,
                ease: "power2.out"
              });
            };

            const onMouseLeave = () => {
              gsap.to(card, {
                x: 0,
                y: 0,
                rotateY: 0,
                rotateX: 0,
                duration: 1,
                ease: "elastic.out(1, 0.4)"
              });
            };

            card.addEventListener("mousemove", onMouseMove);
            card.addEventListener("mouseleave", onMouseLeave);

            return () => {
              card.removeEventListener("mousemove", onMouseMove);
              card.removeEventListener("mouseleave", onMouseLeave);
            };
          });

          // Background ambient parallax
          gsap.to(".bg-ambient", {
            scale: 1.8,
            opacity: 0.15,
            duration: 25,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
          });

          // Global Parallax for Background
          gsap.to(".projects-cube-page", {
            backgroundPositionY: "20%",
            ease: "none",
            scrollTrigger: {
              trigger: "body",
              start: "top top",
              end: "bottom bottom",
              scrub: 1
            }
          });
        });

    return () => {
      window.removeEventListener("scroll", updateHUD);
      ctx.revert();
    };
  }, []);

  return (
    <div className="projects-cube-page simplified">
      <ThreeBackground />
      <div className="bg-ambient"></div>

      <div id="hud">
        <div id="hud_pct" ref={hudPctRef}>000%</div>
        <div className="progress-bar">
          <div className="progress-fill" id="prog_fill" ref={progFillRef}></div>
        </div>
        <div className="scene-label" id="scene_name" ref={sceneNameRef}>START</div>
      </div>

      <div id="face_caption">
        <div id="face_caption_num" ref={captionNumRef}>01</div>
        <div id="face_caption_name" ref={captionNameRef}>START</div>
      </div>

      <div id="scroll_container" ref={scrollContainerRef}>
        <section id="s0" className="hero-section">
          <div className="text-card">
            <div className="tag">System Protocol 00</div>
            <SplitChars text="CORE ARCHIVE" as="h1" />
            <p className="body-text">
              Initializing access to the field database. Reviewing 06 active deployments and architectural iterations.
            </p>
            <div className="cta-row">
              <a className="cta" href="#s1">Initialize <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 6h10M6 1l5 5-5 5" /></svg></a>
            </div>
            <div className="cta-row">
               <a className="cta-back" href="#home">Back to Terminal</a>
            </div>
          </div>
          <div className="project-media-wrap hero-media">
             <img src="https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&w=1200&q=80" alt="Core Archive" />
          </div>
        </section>

        {projects.map((proj, idx) => (
          <section id={`s${idx + 1}`} key={idx} className="project-section">
            <div className={`text-card ${idx % 2 !== 0 ? 'right' : ''}`}>
              <div className="h-line"></div>
              <div className="tag">Archive 0{idx + 1} — {proj.stack}</div>
              <SplitChars text={proj.title} as="h2" />
              <p className="body-text">{proj.description}</p>
              
              <div className="stat-row">
                <div className="stat">
                  <span className="stat-label">Status</span>
                  <span className="stat-num" style={{ fontSize: '1rem', color: 'var(--accent)' }}>DEPLOYED</span>
                </div>
                <div className="stat">
                  <span className="stat-label">System</span>
                  <span className="stat-num" style={{ fontSize: '1rem', color: 'var(--fg)' }}>{idx % 2 === 0 ? 'ALPHA' : 'NODE-V'}</span>
                </div>
              </div>

              <div className="cta-row">
                <a className="cta" href={proj.href || "#"} target="_blank" rel="noreferrer">
                  Access Record
                  <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 6h10M6 1l5 5-5 5" /></svg>
                </a>
              </div>
            </div>
            
            <div className={`project-media-wrap ${idx % 2 !== 0 ? 'left' : 'right'}`}>
              <video src={proj.video} muted loop playsInline autoPlay />
            </div>
          </section>
        ))}

        <section id={`s${projects.length + 1}`} className="footer-section">
          <div className={`text-card ${projects.length % 2 !== 0 ? 'right' : ''}`}>
            <div className="h-line"></div>
            <div className="tag">Protocol Completion</div>
            <SplitChars text="ARCHIVE SECURED" as="h2" />
            <p className="body-text">
              System scan complete. All 06 record clusters have been reviewed and successfully compiled into the primary matrix.
            </p>
            <div className="cta-row">
              <a className="cta-back" href={`#s${projects.length}`}>
                <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M11 6H1M6 11L1 6l5-5" /></svg>
                Previous
              </a>
              <a className="cta" href="#home">
                Exit System
                <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 6h10M6 1l5 5-5 5" /></svg>
              </a>
            </div>
          </div>
          <div className="project-media-wrap footer-media">
             <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80" alt="Archive Secured" />
          </div>
        </section>
      </div>

      <div id="credit">
        <a href="#home">RETURN TO INDEX</a>
      </div>
    </div>
  );
}

function AchievementsPage() {
  const stats = [
    { label: "Focus Areas", value: 4 },
    { label: "Skill Tags", value: 21 },
    { label: "Certificates", value: 4 },
    { label: "Highlight Blocks", value: 3 },
  ];

  useEffect(() => {
    const context = gsap.context(() => {
      gsap.set(".achievements-header, .achievements-hero-copy, .achievements-hero-panel", {
        opacity: 0,
        y: 32,
      });
      gsap.set(".achievement-card, .certification-card, .achievements-footer", {
        opacity: 0,
        y: 36,
      });

      gsap
        .timeline({
          defaults: {
            ease: "expo.out",
          },
        })
        .to(".achievements-header", {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1.2,
        })
        .to(
          ".achievements-hero-copy, .achievements-hero-panel",
          {
            opacity: 1,
            y: 0,
            rotateY: 0,
            scale: 1,
            duration: 1.4,
            stagger: 0.2,
          },
          0.1,
        );

      gsap.set(".achievements-header", {
        rotateX: -40,
        transformPerspective: 1000
      });

      gsap.set(".achievements-hero-copy, .achievements-hero-panel", {
        rotateY: 25,
        scale: 0.9,
        transformPerspective: 1200
      });

      // Achievement Cards Staggered Pop-in
      gsap.to(".achievement-card", {
        opacity: 1,
        y: 0,
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 1.2,
        stagger: {
          amount: 0.8,
          from: "start",
          onStart: function() {
            playStaggerPop(1000 + Math.random() * 300);
          }
        },
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: ".achievement-card-grid",
          start: "top 85%",
          onEnter: () => playRevealSound(400, "sine", 0.8)
        },
      });

      gsap.set(".achievement-card", {
        rotateX: 30,
        rotateY: -15,
        scale: 0.85,
        transformPerspective: 1200
      });

      // Parallax for Hero Panel
      gsap.to(".achievements-hero-panel", {
        yPercent: -15,
        rotateX: 5,
        ease: "none",
        scrollTrigger: {
          trigger: ".achievements-hero",
          start: "top top",
          end: "bottom top",
          scrub: 1.5
        }
      });

      // Certification Cards Fluid Stagger
      gsap.to(".certification-card", {
        opacity: 1,
        y: 0,
        x: 0,
        rotateZ: 0,
        duration: 1.2,
        stagger: {
          each: 0.15,
          onStart: function() {
            playStaggerPop(1200 + Math.random() * 200);
          }
        },
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".certification-stack",
          start: "top 80%",
        },
      });

      gsap.set(".certification-card", {
        x: 60,
        rotateZ: 2,
        opacity: 0
      });

      gsap.to(".achievements-footer", {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ".achievements-footer",
          start: "top 90%",
          onEnter: () => playRevealSound(600, "sine", 0.5)
        },
      });

      gsap.set(".achievements-footer", {
        scale: 0.95,
        opacity: 0,
        y: 40
      });

      document.querySelectorAll("[data-count]").forEach((element) => {
        const target = Number(element.getAttribute("data-count"));
        if (Number.isNaN(target)) return;

        ScrollTrigger.create({
          trigger: element,
          start: "top 88%",
          onEnter: () => {
            playRevealSound(800, "sine", 0.4);
            gsap.to(
              { value: 0 },
              {
                value: target,
                duration: 1.4,
                ease: "power2.out",
                onUpdate() {
                  if (Math.random() > 0.7) playCuteSound(2000, 0.005);
                  element.textContent = `${Math.floor(this.targets()[0].value)}+`;
                },
              },
            );
          },
        });
      });
    });

    return () => context.revert();
  }, []);

  return (
    <main className="achievements-page">
      <header className="achievements-header">
        <a href="#home" className="back-link">
          Back to Home
        </a>
        <div>
          <p className="eyebrow">Achievements</p>
          <SplitChars
            text="Achievements and Certifications"
            as="h1"
            className="projects-title"
          />
        </div>
      </header>

      <section className="achievements-hero">
        <div className="achievements-hero-copy">
          <h2>Growth, validation, and proof of learning.</h2>
          <p>
            This page highlights progress through practical achievements, design and
            build work, and certifications that support my development journey.
          </p>
        </div>
        <div className="achievements-hero-panel">
          <span>Focus Areas</span>
          <strong>Development</strong>
          <strong>Programming</strong>
          <strong>3D and AI/ML</strong>
        </div>
      </section>

      <section className="achievements-stats">
        {stats.map((item) => (
          <article key={item.label} className="achievement-stat-box">
            <div className="achievement-stat-value" data-count={item.value}>
              0
            </div>
            <div className="achievement-stat-label">{item.label}</div>
          </article>
        ))}
      </section>

      <section className="achievements-layout">
        <div className="achievements-column">
          <div className="section-intro">
            <p className="eyebrow">Highlights</p>
            <h3>Achievements</h3>
          </div>

          <div className="achievement-card-grid">
            {achievements.map((item, index) => (
              <article key={item.title} className="achievement-card">
                <span className="achievement-index">0{index + 1}</span>
                <p className="achievement-eyebrow">{item.eyebrow}</p>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <strong>{item.meta}</strong>
              </article>
            ))}
          </div>
        </div>

        <div className="achievements-column">
          <div className="section-intro">
            <p className="eyebrow">Recognition</p>
            <h3>Certifications</h3>
          </div>

          <div className="certification-stack">
            {certifications.map((item, index) => (
              <article key={item.title} className="certification-card">
                <div className="certification-top">
                  <span className="achievement-index">0{index + 1}</span>
                  <span className="certification-issuer">{item.issuer}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="achievements-footer">
        <p>You can replace these placeholders with your real achievements and certificates any time.</p>
        <div className="achievements-footer-actions">
          <a href="#projects" className="primary-button">
            Back to Projects
          </a>
          <a href="#home" className="secondary-button">
            Return Home
          </a>
        </div>
      </section>
    </main>
  );
}

function SplitChars({ text, as: Tag = "h2", className = "" }) {
  return (
    <Tag className={className}>
      <span className="skills-title-line" aria-label={text}>
        {Array.from(text).map((char, index) => (
          <span
            key={`${char}-${index}`}
            className="skills-title-char"
            style={{ "--char-index": index }}
            aria-hidden="true"
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </span>
    </Tag>
  );
}

export default App;
