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
    description: "Developed for Google Praxis 2.0, this system utilizes advanced data modeling to analyze metrics.",
    explanation: "A high-performance analytics engine that processes geospatial data to predict environmental risks. Built with a focus on data accuracy and real-time visualization.",
    stack: "Python, TensorFlow, Geospatial APIs",
    liveLink: "https://climate-risk-interpreter-4tupjpeuqp862ytrtnsu5g.streamlit.app/",
    codeLink: "https://github.com/ANKUR172006/CodeNakshatra-CLIMATE-RISK-INTERPRETER",
    video: "/videos/rec3.mp4",
  },
  {
    title: "Anime Page",
    description: "An immersive e-commerce experience designed for enthusiasts, utilizing Three.js and 3D modeling.",
    explanation: "A custom-built 3D storefront that allows users to interact with anime merchandise in a virtual space. Includes custom GLSL shaders for unique visual effects.",
    stack: "Three.js, React Three Fiber, GLSL",
    liveLink: "https://ankur172006.github.io/animepage/",
    codeLink: "https://github.com/ANKUR172006/animepage",
    video: "/videos/rec5.mp4",
  },
  {
    title: "Hyperlocal AQI Dashboard",
    description: "Developed for India Innovates 2026, providing real-time street-level pollution insights.",
    explanation: "Integrates IoT sensor networks with machine learning to provide hyperlocal air quality forecasts. Features a low-latency dashboard for public health monitoring.",
    stack: "IoT Hub, React, Node.js, ML Regression",
    liveLink: "https://hyperlocal-ed.onrender.com/",
    codeLink: "https://github.com/ANKUR172006/HYPERLOCAL-AQI-DASHBOARD",
    video: "/videos/rec6.mp4",
  },
  {
    title: "Nomad Journey",
    description: "A visually rich travel landing page focused on seamless user experience and modern web aesthetics.",
    explanation: "Focuses on high-impact visual storytelling and fluid layout transitions. Optimized for performance and cross-device responsiveness.",
    stack: "HTML5, CSS3, JavaScript",
    liveLink: "https://nomad-journey.example.com",
    codeLink: "https://github.com/username/nomad-journey",
    video: "/videos/rec1.mp4",
  },
  {
    title: "EY Techathon Solution",
    description: "A strategic digital transformation tool built for the EY Techathon, focusing on automated auditing.",
    explanation: "Automates complex financial anomaly detection using Azure AI. Designed to scale across massive datasets with enterprise-grade security protocols.",
    stack: "Azure AI, PowerBI, Python, Snowflake",
    liveLink: "https://ey-techathon.example.com",
    codeLink: "https://github.com/ANKUR172006/provider-validation-system",
    video: "/videos/rec2.mp4",
  },
  
  {
    title: "AI Money Coach",
    description: "An Open Innovation project for ET Gen AI Hackathon. An intelligent assistant for wealth management.",
    explanation: "Leverages Large Language Models to provide personalized financial advice. Features a conversational interface and complex vector-based memory for context-aware coaching.",
    stack: "OpenAI API, LangChain, Vector DB",
    liveLink: "https://ai-money-coach.example.com",
    codeLink: "https://github.com/username/ai-money-coach",
    video: "/videos/rec4.mp4",
  }
];

const achievements = [
  {
    category: "Competitive Excellence",
    items: [
      {
        title: "Finalist – India Innovates 2026",
        description: "Selected among top innovators to present at Bharat Mandapam, building a Hyperlocal AI-powered Pollution Intelligence System.",
        icon: "🏆",
        tag: "NATIONAL"
      },
      {
        title: "Top 20 – Google Praxis 2.0",
        description: "Recognized among the top 20 teams for innovative solution building in a highly competitive Google-sponsored arena.",
        icon: "🏆",
        tag: "GLOBAL"
      },
      {
        title: "Finalist – Blueprint IITD Becon2026",
        description: "Secured finalist position in Blueprint Beacon, demonstrating technical prowess and scalable product thinking.",
        icon: "🏆",
        tag: "TECHATHON"
      },
      {
        title: "Finalist – Hack4Delhi",
        description: "Recognized among top teams for developing a real-world problem-solving tech solution under extreme time constraints.",
        icon: "🏆",
        tag: "HACKATHON"
      },
      {
        title: "Round 2 Qualifier – EY Techathon 6.0",
        description: "Advanced in a national-level innovation challenge competing with top developers from across the country.",
        icon: "🏆",
        tag: "CORPORATE"
      }
    ]
  },
  {
    category: "Incubation & Growth",
    items: [
      {
        title: "Emergence Startup Batch 2026 – IIT Delhi",
        description: "Currently incubated at IIT Delhi, building and scaling a tech-driven venture with world-class mentorship.  working on my startup idea ",
        icon: "🚀",
        tag: "ONGOING"
      }
    ]
  },
  {
    category: "Discipline Beyond Tech",
    items: [
      {
        title: "National Youth Games 2022 – Kabaddi  Gold Medalist",
        description: "Represented at national level, showcasing teamwork, resilience, and competitive excellence.",
        icon: "🏅",
        tag: "ATHLETE"
      }
    ]
  }
];

const certifications = [
  {
    title: "Full Stack Development",
    issuer: "Sheryians Coding School",
    detail: "Comprehensive training in modern web architecture and deployment.",
    skills: ["HTML", "CSS", "JS", "React", "Node.js","Gen Ai","DevOps"

    ]
  },
  {
    title: "Machine Learning & AI Foundations",
    issuer: "Industry Standard",
    detail: "Core concepts of neural networks, model training, and AI implementation."
  },
  {
    title: "Data Analytics & Visualization",
    issuer: "Industry Standard",
    detail: "Processing complex datasets into actionable visual intelligence."
  },
  {
    title: "Modern Web Development",
    issuer: "Sheryians / Industry",
    detail: "Advanced HTML5, CSS3, and JavaScript performance patterns."
  },
  {
    title: "API Integration & Backend Systems",
    issuer: "Industry Standard",
    detail: "Architecting scalable server-side logic and RESTful protocols."
  }
];

const strengths = [
  { title: "Rapid prototyping", icon: "⚡" },
  { title: "AI-driven development", icon: "🤖" },
  { title: "Advanced UI/UX & animations", icon: "🎨" },
  { title: "Real-world problem solving", icon: "🌍" },
  { title: "High performance under pressure", icon: "🚀" }
];

const impactProjects = [
  {
    title: "Hyperlocal Pollution Intelligence",
    features: [
      "Ward-level AQI monitoring + prediction",
      "XGBoost forecasting + IDW interpolation",
      "Real-time anomaly detection matrix"
    ]
  },
  {
    title: "AI GPU Sharing Network",
    features: [
      "Decentralized compute marketplace",
      "Student-accessible GPU nodes",
      "Smart contract-based resource allocation"
    ]
  }
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
  const [startupModalOpen, setStartupModalOpen] = useState(false);

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
        <HomePage 
          startupModalOpen={startupModalOpen} 
          setStartupModalOpen={setStartupModalOpen} 
        />
      )}
    </>
  );
}

function HomePage(props) {
  const [formStatus, setFormStatus] = useState({ sending: false, success: false, error: false });

  const handleFormSubmit = async (e, formType) => {
    e.preventDefault();
    setFormStatus({ sending: true, success: false, error: false });
    
    const formData = new FormData(e.target);
    formData.append("Form Type", formType);

    try {
      // Use the direct email endpoint (no /f/ prefix for email-based routing)
      const endpoint = "https://formspree.io/f/xvzlbkyy";
      
      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      console.log(`Formspree (${formType}) status:`, response.status);

      if (response.ok) {
        setFormStatus({ sending: false, success: true, error: false });
        e.target.reset();
        setTimeout(() => setFormStatus(prev => ({ ...prev, success: false })), 6000);
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error("Formspree Error Details:", errorData);
        throw new Error(`Submission failed with status ${response.status}`);
      }
    } catch (error) {
      console.error("Fatal Form Error:", error);
      setFormStatus({ sending: false, success: false, error: true });
      setTimeout(() => setFormStatus(prev => ({ ...prev, error: false })), 6000);
    }
  };

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
          mobile: "(max-width: 900px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (mq) => {
          const { desktop, mobile, reduceMotion } = mq.conditions;

          if (reduceMotion) {
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

          // Initial Setup - Lighter for Mobile
          gsap.set(navElement, { opacity: 0, y: -18 });
          gsap.set(heroChars, { opacity: 0, yPercent: 115 });
          gsap.set(heroText, { opacity: 0, y: 22 });
          gsap.set(backgroundCardElement, { opacity: 0, y: 30, scale: 0.98 });
          gsap.set(introElement, { opacity: 0, y: 88 });
          
          gsap.set(cards, {
            opacity: 0,
            y: 80, // Reduced y distance
            rotateX: desktop ? 12 : 0, // No rotation on mobile
            transformPerspective: desktop ? 1200 : 0,
            transformOrigin: "center top",
          });

          if (pills.length) {
            gsap.set(pills, { opacity: 0, y: 20, scale: 0.94 });
          }

          gsap.set(skillHeader, { opacity: 0, y: 30 });
          gsap.set(skillCards, { opacity: 0, y: 40, scale: 0.97 });

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

          // 13. Startup Idea Button Logic (Hero Only)
          const startupBtn = document.querySelector(".startup-idea-btn");
          if (startupBtn) {
            gsap.to(startupBtn, {
              opacity: 0,
              scale: 0.8,
              pointerEvents: "none",
              duration: 0.4,
              scrollTrigger: {
                trigger: ".design7-hero",
                start: "bottom 90%",
                toggleActions: "play none none reverse"
              }
            });
          }

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
          if (desktop) {
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
          }

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

            // 11. Contact Section Animations (Brutalist Upgrade)
            const brutalistSection = document.querySelector(".brutalist-section");
            const brutalistGhost = document.querySelector(".brutalist-ghost-bg");
            const brutalistTitle = document.querySelector(".brutalist-title");
            const brutalistCards = document.querySelectorAll(".brutalist-card");
            const brutalistTags = document.querySelectorAll(".brutalist-tag");

            if (brutalistSection) {
              // Ghost text parallax
              gsap.to(brutalistGhost, {
                xPercent: -20,
                ease: "none",
                scrollTrigger: {
                  trigger: brutalistSection,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true
                }
              });

              // Title reveal
              gsap.from(brutalistTitle, {
                y: 100,
                opacity: 0,
                skewY: 5,
                duration: 1.2,
                ease: "expo.out",
                scrollTrigger: {
                  trigger: brutalistTitle,
                  start: "top 90%",
                  toggleActions: "play none none reverse"
                }
              });

              // Cards entrance
              gsap.from(brutalistCards, {
                y: 100,
                opacity: 0,
                scale: 0.9,
                rotateX: 10,
                stagger: 0.15,
                duration: 1,
                ease: "back.out(1.2)",
                scrollTrigger: {
                  trigger: ".brutalist-grid",
                  start: "top 85%",
                  toggleActions: "play none none reverse"
                }
              });

              // Tags reveal
              gsap.from(brutalistTags, {
                x: -30,
                opacity: 0,
                stagger: 0.1,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: ".brutalist-tags",
                  start: "top 90%",
                  toggleActions: "play none none reverse"
                }
              });

              // Floating animation for cards
              brutalistCards.forEach((card, i) => {
                gsap.to(card, {
                  y: "-=10",
                  duration: 2 + i * 0.5,
                  repeat: -1,
                  yoyo: true,
                  ease: "sine.inOut"
                });

                // Add interactive tilt/scanner effect - Only on Desktop
                if (desktop) {
                  card.addEventListener("mousemove", (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = (e.clientX - rect.left) / rect.width - 0.5;
                    const y = (e.clientY - rect.top) / rect.height - 0.5;
                    gsap.to(card, {
                      rotateY: x * 10,
                      rotateX: -y * 10,
                      scale: 1.02,
                      duration: 0.4,
                      ease: "power2.out"
                    });
                    
                    const scanner = card.querySelector(".card-scanner");
                    if (scanner) {
                      gsap.to(scanner, {
                        top: `${(y + 0.5) * 100}%`,
                        opacity: 1,
                        duration: 0.3
                      });
                    }
                  });

                  card.addEventListener("mouseleave", () => {
                    gsap.to(card, {
                      rotateY: 0,
                      rotateX: 0,
                      scale: 1,
                      duration: 0.6,
                      ease: "elastic.out(1, 0.3)"
                    });
                    const scanner = card.querySelector(".card-scanner");
                    if (scanner) {
                      gsap.to(scanner, {
                        opacity: 0,
                        duration: 0.3
                      });
                    }
                  });
                }
              });
            }

            // 12. Bongo Cat Ghostly Animations
            const animatePawState = (selector) =>
              gsap.fromTo(
                selector,
                { autoAlpha: 0 },
                {
                  autoAlpha: 1,
                  duration: 0.01,
                  repeatDelay: 0.19,
                  yoyo: true,
                  repeat: -1,
                }
              );

            const catTl = gsap.timeline({
              scrollTrigger: {
                trigger: ".home-bongo-cat",
                start: "top 80%",
              }
            });

            catTl.add(animatePawState("#bongo-cat .paw-left .up"), "start")
              .add(animatePawState("#bongo-cat .paw-right .down"), "start")
              .add(animatePawState("#bongo-cat .paw-left .down"), "start+=0.19")
              .add(animatePawState("#bongo-cat .paw-right .up"), "start+=0.19")
              .timeScale(1.6);

            gsap.from("#bongo-cat .terminal-code line", {
              drawSVG: "0%",
              duration: 0.1,
              stagger: 0.1,
              ease: "none",
              repeat: -1,
            });

            // Haunted flicker for terminal and notes
            gsap.to(["#bongo-cat .terminal-code", "#bongo-cat .music .note"], {
              opacity: "random(0.3, 1)",
              filter: "blur(random(0, 2)px)",
              duration: 0.2,
              repeat: -1,
              repeatRefresh: true,
              ease: "none"
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
      <div className="cinematic-vignette"></div>
      <CustomCursor />
      <button 
        className="startup-idea-btn" 
        onClick={() => props.setStartupModalOpen(true)}
        aria-label="Work with me on my startup idea"
      >
        <span className="btn-text">STARTUP COLLAB</span>
      </button>

      <div className={`startup-modal-overlay ${props.startupModalOpen ? "is-open" : ""}`} onClick={() => props.setStartupModalOpen(false)}>
        <div className="startup-modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="close-modal-btn" onClick={() => props.setStartupModalOpen(false)}>X</button>
          
          <header className="startup-header">
            <h2>RESQUEKEY</h2>
            <p>✦ SELF-HEALING OFFLINE AI SYSTEM</p>
          </header>

          <div className="startup-grid">
            <div className="startup-info">
              <h3>The Vision</h3>
              <p>ResqueKey is a plug-and-play bootable USB solution designed to diagnose and repair PC issues using local, fully offline AI.</p>
              
              <div className="startup-feature-list">
                <div className="startup-feature-item">✦ OFFLINE LLM (3B-7B)</div>
                <div className="startup-feature-item">✦ BOOTABLE LINUX OS</div>
                <div className="startup-feature-item">✦ AUTO-REPAIR SCRIPTS</div>
                <div className="startup-feature-item">✦ NATURAL LANGUAGE UI</div>
              </div>
              
              <p style={{marginTop: '2rem', fontSize: '0.85rem', opacity: 0.8}}>
                "Building a future where computers heal themselves through natural conversation, even without an internet connection."
              </p>
            </div>

            <div className="startup-form-container">
              <h3>Join the Mission</h3>
              <p style={{fontSize: '0.8rem', marginBottom: '1.5rem', opacity: 0.7}}>We're looking for early collaborators to help build the first truly self-healing PC toolkit. If you're passionate about local AI, Linux system repair, or low-level hardware interaction, let's talk.</p>
              
              {formStatus.success ? (
                <div className="startup-success-msg" style={{color: '#00ff00', border: '1px solid #00ff00', padding: '1rem', textAlign: 'center', background: 'rgba(0,255,0,0.05)'}}>
                  ✦ COLLABORATION PROTOCOL INITIALIZED. I'LL REACH OUT SOON.
                </div>
              ) : (
                <form className="startup-form" onSubmit={(e) => handleFormSubmit(e, "Startup Collab")}>
                  <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
                    <div className="startup-input-group">
                      <label>Name</label>
                      <input type="text" name="name" className="startup-input" placeholder="Your Name" required />
                    </div>
                    <div className="startup-input-group">
                      <label>Contact (Email/Discord)</label>
                      <input type="text" name="contact" className="startup-input" placeholder="info@example.com" required />
                    </div>
                  </div>
                  
                  <div className="startup-input-group">
                    <label>Background / Expertise</label>
                    <select name="expertise" className="startup-input" style={{background: '#111113', color: 'white'}} required>
                      <option value="">Select Expertise</option>
                      <option value="frontend">Frontend Developer (React/UI)</option>
                      <option value="backend">Backend / AI Integration (llama.cpp)</option>
                      <option value="linux">Linux Kernel / System Repair</option>
                      <option value="design">UI/UX Product Design</option>
                      <option value="hardware">Hardware / USB Systems</option>
                    </select>
                  </div>

                  <div className="startup-input-group">
                    <label>How can you contribute to ResqueKey?</label>
                    <textarea name="contribution" className="startup-input" rows="3" placeholder="Describe your interest and how you can help..." required></textarea>
                  </div>

                  <div className="startup-input-group">
                    <label>Weekly Availability</label>
                    <input type="text" name="availability" className="startup-input" placeholder="e.g. 5-10 hours/week" />
                  </div>

                  <button type="submit" className="startup-submit-btn" disabled={formStatus.sending}>
                    {formStatus.sending ? "SENDING ENCRYPTED DATA..." : "INITIALIZE COLLABORATION PROTOCOL →"}
                  </button>
                  {formStatus.error && <p style={{color: '#ff3333', fontSize: '0.8rem', marginTop: '10px'}}>TRANSMISSION ERROR. PLEASE TRY AGAIN.</p>}
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

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
          <a href="#contact" className="nav-contact-link">
            <span className="home-nav-index">05</span>
            Get In Touch
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
          <a className="home-nav-btn" href="#contact" aria-label="Contact section">
            <span className="home-nav-tip">Contact</span>
            <svg viewBox="0 0 24 24">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </a>
        </div>
      </nav>

      <section className="home-background design7-hero" aria-hidden="true">
        {/* === DESIGN 7 BACKGROUND LAYERS === */}
        <div className="design7-hero-bg"></div>
        <div className="design7-red-bleed"></div>
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
          <LiquidGlassBackground textLine1="ABOUT" textLine2="ME" />
          <div className="home-about-stage">
            <div className="home-about-intro" ref={aboutIntroRef}>
              <p className="home-about-kicker">About</p>
              <SplitChars
                text={"FRONTEND\u00A0DEVELOPER WITH A STRONG INSTINCT."}
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
                <h3>CSE Student and FRONTEND&nbsp;DEVELOPER</h3>
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
          <LiquidGlassBackground textLine1="CORE" textLine2="SKILLS" />
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

        <section className="brutalist-section grainy" id="contact">
          <LiquidGlassBackground textLine1="GET IN" textLine2="TOUCH" />
          <div className="contact-bg-info">drag to interact &middot; click to spawn</div>
          <div className="brutalist-ghost-bg">TALK</div>
          <div className="brutalist-container">
            <header className="contact-header-center">
              <span className="brutalist-label">✦ SECURE CHANNEL // ENCRYPTED</span>
              <h2 className="brutalist-title">
                GET IN <span className="stroke">TOUCH</span>
              </h2>
            </header>

            <div className="brutalist-tags">
              <span className="brutalist-tag">✦ AVAILABLE FOR WORK</span>
              <span className="brutalist-tag">✦ FRONTEND DEV</span>
              <span className="brutalist-tag">✦ UI/UX DESIGN</span>
            </div>

            <div className="brutalist-grid">
              {/* Card 1: Contact Methods */}
              <article className="brutalist-card clay">
                <div className="card-scanner"></div>
                <div className="card-corner tl"></div>
                <div className="card-corner br"></div>
                <span className="brutalist-card-badge">DIRECT LINE</span>
                <h3>CONTACT INFO</h3>
                <p><strong>EMAIL:</strong> <a href="mailto:ankurbishyer@gmail.com" style={{color: 'inherit', textDecoration: 'underline'}}>ankurbishyer@gmail.com</a></p>
                <p><strong>BASE:</strong> Rohtak, India</p>
                <p><strong>STATUS:</strong> Open for projects</p>
              </article>

              {/* Card 2: Social Links */}
              <article className="brutalist-card yellow">
                <div className="card-scanner"></div>
                <div className="card-corner tr"></div>
                <div className="card-corner bl"></div>
                <span className="brutalist-card-badge">NETWORKS</span>
                <h3>SOCIAL LINKS</h3>
                <div style={{display: 'flex', flexDirection: 'column', gap: '0.8rem'}}>
                  <a href="https://github.com/ankurbishyer" target="_blank" rel="noreferrer" style={{color: 'inherit', fontWeight: '700'}}>GITHUB ↗</a>
                  <a href="https://linkedin.com/in/ankurbishyer" target="_blank" rel="noreferrer" style={{color: 'inherit', fontWeight: '700'}}>LINKEDIN ↗</a>
                  <a href="https://instagram.com/ankur_172007" target="_blank" rel="noreferrer" style={{color: 'inherit', fontWeight: '700'}}>INSTAGRAM ↗</a>
                </div>
              </article>

              {/* Card 3: Form */}
              <article className="brutalist-card span-2" style={{gridColumn: 'span 2'}}>
                <div className="card-scanner"></div>
                <div className="card-corner tl"></div>
                <div className="card-corner br"></div>
                <span className="brutalist-card-badge">TRANSMISSION</span>
                <h3>SEND MESSAGE</h3>
                
                {formStatus.success ? (
                  <div className="brutalist-success-msg" style={{color: '#00ff00', border: '1px solid #00ff00', padding: '2rem', textAlign: 'center', background: 'rgba(0,255,0,0.05)', fontFamily: '"Share Tech Mono", monospace'}}>
                    ✦ TRANSMISSION SUCCESSFUL. MESSAGE RECEIVED BY THE ARCHIVE.
                  </div>
                ) : (
                  <form className="brutalist-form" onSubmit={(e) => handleFormSubmit(e, "Contact Form")}>
                    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem'}}>
                      <div className="brutalist-input-group">
                        <label htmlFor="b-name">NAME</label>
                        <input type="text" id="b-name" name="name" className="brutalist-input" placeholder="YOUR NAME" required />
                      </div>
                      <div className="brutalist-input-group">
                        <label htmlFor="b-email">EMAIL</label>
                        <input type="email" id="b-email" name="email" className="brutalist-input" placeholder="YOUR@EMAIL.COM" required />
                      </div>
                    </div>
                    <div className="brutalist-input-group">
                      <label htmlFor="b-message">MESSAGE</label>
                      <textarea id="b-message" name="message" className="brutalist-input" rows="4" placeholder="WHAT'S ON YOUR MIND?" required></textarea>
                    </div>
                    <button type="submit" className="brutalist-btn" disabled={formStatus.sending}>
                      {formStatus.sending ? "TRANSMITTING..." : "INITIALIZE TRANSMISSION →"}
                    </button>
                    {formStatus.error && <p style={{color: '#ff3333', fontSize: '0.8rem', marginTop: '10px', fontFamily: '"Share Tech Mono", monospace'}}>✦ TRANSMISSION ERROR. PLEASE TRY AGAIN.</p>}
                  </form>
                )}
              </article>
            </div>
          </div>
        </section>

        <section className="home-bongo-cat" id="bongo-cat-section">
          <div className="bongo-cat-container">
            <BongoCat />
          </div>
        </section>
      </section>
    </main>
  );
}

function BongoCat() {
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const moveX = (e.clientX - centerX) / 25;
      const moveY = (e.clientY - centerY) / 25;

      gsap.to(containerRef.current, {
        x: moveX,
        y: moveY,
        rotateY: moveX / 2,
        rotateX: -moveY / 2,
        duration: 0.8,
        ease: "power2.out"
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    
    // Ghostly Jitter/Glitch animation
    const jitter = gsap.to(containerRef.current, {
      x: "+=2",
      y: "-=2",
      duration: 0.1,
      repeat: -1,
      yoyo: true,
      paused: true,
      ease: "none"
    });

    const startJitter = () => {
      if (Math.random() > 0.95) {
        jitter.play();
        setTimeout(() => jitter.pause(), 100);
      }
      setTimeout(startJitter, 200);
    };
    startJitter();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      jitter.kill();
    };
  }, []);

  return (
    <div className="bongo-cat-container" ref={containerRef}>
      <div className="ghost-glitch-overlay"></div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 783.55 354.91" id="bongo-cat">
        <g className="head">
          <path d="M280.4,221l383.8,62.6a171.4,171.4,0,0,0-9.2-40.5,174,174,0,0,0-28.7-50.5,163.3,163.3,0,0,0,3.2-73.8c-11.6-1.9-42,14.2-44.5,17.5-19.6-24-88.5-52.7-153.7-48.1A78.8,78.8,0,0,0,398,67.1c-9.8,2.9-19,29.7-19.4,33.7a320,320,0,0,0-31.7,23.6c-14,11.8-28.9,24.4-42.5,44.3A173,173,0,0,0,280.4,221Z" />
          {/* Mustache / Beard for male look */}
          <path d="M396.6,178.6c.4.9,2.7,6.5,8.5,8.4s13.4-1.2,17.2-7.9c-.9,7.5,3.8,14.3,10.4,16a14.4,14.4,0,0,0,15-5.7" strokeWidth="6" />
          {/* Glowing Eyes */}
          <path d="M474,179.2a6.6,6.6,0,0,0-4.9,3.6,6,6,0,0,0,1.5,7.3,6,6,0,0,0,7.9-1c2.3-2.6,2-7,.2-8s-5.9,1.6-5.7,3.5,1.9,2.8,3.2,2.3,1.1-2.2,1.1-2.3" fill="#ff0000" />
          <path d="M365.4,168.9c0,.3-.8,3.6,1.5,6a5.9,5.9,0,0,0,7.2,1.4,6.1,6.1,0,0,0,2.2-7.7c-1.5-3.1-5.7-4.5-7.3-3.2s-.8,6,1,6.6,3.3-.7,3.3-2.1-1.5-1.8-1.6-1.9" fill="#ff0000" />
          <g className="headphone headphone-right">
            <g className="speaker">
              <path d="M400.7,80.2c-14.1-20.8-40.2.3-50.7,15-8.7,12.2-9.7,30.3,2.8,37.3,5.4-9,11.8-15.6,21-26.2A214.1,214.1,0,0,1,400.7,80.2Z" />
              <path d="M381.5,79.4c-6.6-7.5-9.6-5.8-12.3-5.5-16.3,1.3-32,20.3-27.8,33.9a21.8,21.8,0,0,0,5.9,8.5c1.7-2.6,3.5-5.1,5.4-7.7A150.7,150.7,0,0,1,381.5,79.4Z" />
              <path d="M367.3,77.8a13.1,13.1,0,0,0-5.1-1.8c-8.5-.9-18.7,7.5-18.4,16.1a12.8,12.8,0,0,0,2.6,7c3.1-3.3,6.3-6.8,9.6-10.2S363.6,81.3,367.3,77.8Z" />
            </g>
            <path className="band" d="M515,40.6c-15.9-4.6-57-14.1-104,2.3a166.9,166.9,0,0,0-60.9,37.3" />
          </g>
        </g>
        <g className="music music-right">
          <g className="note">
            <g>
              <path d="M368.5,46.5c.5,2.1,1.2,3.5,3.8,6.3s5.1,4.3,6.5,7.2a11.1,11.1,0,0,1,.7,2,10.5,10.5,0,0,1-.7,6.5" />
              <path d="M368.5,46.5a20.8,20.8,0,0,0,2.4,11.7c2.3,4.4,5,5.4,6.8,9.5a17.5,17.5,0,0,1,.4,11" />
              <line x1="368.5" y1="47.7" x2="368.5" y2="92.8" />
              <path d="M368.5,92.8c.1-3.1-4.7-6.3-9-6.3s-8.7,2.7-8.7,5.8,4.8,5.7,8.7,5.8S368.3,95.8,368.5,92.8Z" />
            </g>
          </g>
          <g className="note">
            <g>
              <polyline points="350 81.7 350 43.5 382.7 50.7 382.7 89.5" />
              <path d="M350,82.3c0-3.1-4.5-5.7-8.2-5.9s-9.3,2.8-9.2,6,4.7,5.7,8.6,5.7S349.9,85.5,350,82.3Z" />
              <path d="M382.7,89.9c0-3.1-4.4-5.7-8.2-5.8s-9.3,2.7-9.2,5.9,4.7,5.7,8.7,5.7S382.7,93.1,382.7,89.9Z" />
            </g>
          </g>
        </g>
        <g className="table">
          <polygon points="25.3 158.5 783.2 293 513 354.9 25.3 158.5" />
        </g>
        <polygon className="laptop-base" points="103.2 263.6 258.9 219.3 636.5 294.4 452.1 339 103.2 263.6" />
        <g className="laptop-keyboard">
          <polygon points="369.6 265.6 255.3 244.3 255.5 243.5 264.7 241.9 380.9 262.3 380.8 263.1 369.6 265.6" />
          <polygon points="235.9 256.4 219.8 253.2 219.9 252.5 228.7 251 245.3 253.4 245.1 254.2 235.9 256.4" />
          <polygon points="473.1 303.7 248.4 258.9 248.6 258.1 257.7 256.6 486.2 300.4 486 301.3 473.1 303.7" />
        </g>
        <g className="paw paw-right">
          <path className="down" d="M289.1,181.7c-12.1,9.8-20.6,20.7-20.7,32.1-.2,9,3.8,20.4,13.3,25.2s20.1.6,29.6-3.4c13.4-5.7,23.9-14.6,29.4-21.5" />
          <g className="up">
            <path d="M327.3,170c-.4-1.4-6.3-18.8-23.5-23.5-.8-.2-18.6-4.7-28.9,6.3-8.4,9.1-6,22.5-4.6,30.2a54.3,54.3,0,0,0,8.1,19.9" />
          </g>
        </g>
        <polygon className="terminal-frame" points="93.8 63.3 284.1 73 335.9 230.5 146.2 197.6 93.8 63.3" />
        <g className="terminal-code">
          <line x1="260.2" y1="92.3" x2="212.2" y2="88.7" />
          <line x1="197.3" y1="87.5" x2="145.2" y2="83.5" />
          <line x1="251" y1="104.2" x2="223.4" y2="101.8" />
          <line x1="209.4" y1="100.5" x2="154.4" y2="95.6" />
        </g>
        <polygon className="laptop-cover" points="103.2 263.6 452.1 339 360.8 12.4 2 2 103.2 263.6" />
        <g className="paw paw-left">
          <g className="up">
            <path d="M586.6,208.8c-.6-2.3-4.2-15.6-17.2-22.2-2.7-1.3-12.8-6.4-23.6-1.8s-14.6,16.5-14.8,18.4c-1.2,9-.7,18.4,2.4,26.1,2.4,6,7.5,17.2,9.7,20.2" />
          </g>
          <path className="down" d="M534.1,231.4c-19.7,6-32.9,18.4-34.2,29.1a30.1,30.1,0,0,0,1.7,14.1,24.8,24.8,0,0,0,6.1,8.8c6,5.1,16.8,4,38-3.9a288.7,288.7,0,0,0,46.5-22.1" />
        </g>
        <g className="headphone headphone-left">
          <g className="speaker">
            <path d="M609.5,137.3c-17.1,6.3-20.7,51.4-4.5,67.3,1.4,1.5,5.5,5.5,11.3,5.9,8.2.5,14.5-6.3,16.9-8.9,10.1-11,11.5-27.5,8.1-40.1-1.4-4.8-3.9-14-12.7-19.9C627.4,140.8,617.7,134.3,609.5,137.3Z" />
            <path d="M626.5,196.1c2.7-.4,5.9-2.6,9.3-6,6.6-6.6,6.8-16.6,5.8-24s-4.2-16.1-11.3-19.7a18.7,18.7,0,0,0-10.9-1.9C614,149.3,615.3,192.6,626.5,196.1Z" />
            <path d="M631.6,151c-4.5,3.3-.5,27.1,3.8,28.2s6.9-6.6,6.2-13.1S637.4,153.5,631.6,151Z" />
          </g>
          <path className="band" d="M638.9,157.7c-4-16.8-25.9-61.9-75.3-95.3A155.5,155.5,0,0,0,515,40.6" />
        </g>
        <g className="music music-left">
          <g className="note">
            <g>
              <path d="M633.3,119.9c.6,2,1.3,3.5,3.8,6.3s5.2,4.3,6.5,7.2a6.9,6.9,0,0,1,.7,1.9,10.2,10.2,0,0,1-.7,6.6" />
              <path d="M633.3,119.9a23,23,0,0,0,2.4,11.7c2.4,4.3,5.1,5.4,6.8,9.5a16.9,16.9,0,0,1,.5,11" />
              <line x1="633.3" y1="121.1" x2="633.3" y2="166.2" />
              <path d="M633.3,166.2c.2-3.2-4.6-6.3-8.9-6.3s-8.7,2.6-8.7,5.7,4.7,5.7,8.7,5.8S633.1,169.2,633.3,166.2Z" />
            </g>
          </g>
        </g>
      </svg>
    </div>
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

    let isMobile = window.innerWidth <= 768;

    // Particle Matrix
    const particlesCount = isMobile ? 1500 : 4000;
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    const sizes = new Float32Array(particlesCount);

    for (let i = 0; i < particlesCount; i++) {
      // Spiral/Vortex distribution
      const radius = Math.random() * 10;
      const angle = i * 0.1;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = Math.sin(angle) * radius;

      const r = Math.random();
      colors[i * 3] = r > 0.3 ? 1 : 0.4; // Red/Crimson focus
      colors[i * 3 + 1] = 0;
      colors[i * 3 + 2] = r > 0.8 ? 0.2 : 0;
      
      sizes[i] = Math.random() * 0.03 + 0.01;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.02,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Floating Geometric Shapes with Glow
    const shapes = [];
    const shapeGroup = new THREE.Group();
    scene.add(shapeGroup);

    const shapeGeoms = [
      new THREE.IcosahedronGeometry(0.8, 0),
      new THREE.OctahedronGeometry(1, 0),
      new THREE.TetrahedronGeometry(0.6, 0)
    ];

    for (let i = 0; i < 8; i++) {
      const geom = shapeGeoms[Math.floor(Math.random() * shapeGeoms.length)];
      const mat = new THREE.MeshPhongMaterial({ 
        color: 0xff0000, 
        wireframe: true, 
        transparent: true, 
        opacity: 0.2,
        emissive: 0x330000
      });
      const mesh = new THREE.Mesh(geom, mat);
      mesh.position.set(
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 10
      );
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      mesh.userData.speed = 0.005 + Math.random() * 0.01;
      mesh.userData.rotSpeed = (Math.random() - 0.5) * 0.02;
      shapeGroup.add(mesh);
      shapes.push(mesh);
    }

    // Lighting for 3D depth
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xff0000, 2, 20);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    camera.position.z = 10;

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

      // Vortex motion - Lighter for mobile
      const time = Date.now() * 0.001;
      const positions = geometry.attributes.position.array;
      
      // Skip position updates on mobile to save CPU
      if (!isMobile) {
        for (let i = 0; i < particlesCount; i++) {
          const i3 = i * 3;
          const x = positions[i3];
          const z = positions[i3 + 2];
          const angle = 0.001 * (i % 10 + 1);
          positions[i3] = x * Math.cos(angle) - z * Math.sin(angle);
          positions[i3 + 2] = x * Math.sin(angle) + z * Math.cos(angle);
          positions[i3 + 1] += Math.sin(time + x) * 0.005;
        }
        geometry.attributes.position.needsUpdate = true;
      }

      shapes.forEach(shape => {
        shape.rotation.x += shape.userData.rotSpeed;
        shape.rotation.y += shape.userData.rotSpeed;
        if (!isMobile) {
          shape.position.y += Math.sin(time + shape.position.x) * 0.005;
        }
      });

      // Smooth camera follow - Only on desktop
      if (!isMobile) {
        camera.position.x += (targetX * 5 - camera.position.x) * 0.05;
        camera.position.y += (-targetY * 5 - camera.position.y) * 0.05;
      }
      
      // Dynamic zoom based on scroll
      const scrollY = window.scrollY;
      const scrollMax = document.documentElement.scrollHeight - window.innerHeight;
      const scrollRatio = scrollMax > 0 ? scrollY / scrollMax : 0;
      camera.position.z = 10 - scrollRatio * 4;
      
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      isMobile = window.innerWidth <= 768;
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

function LiquidGlassBackground({ textLine1 = "GET IN", textLine2 = "TOUCH" }) {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    let isMobile = window.innerWidth <= 768;
    let MAX_DROPLETS = isMobile ? 15 : 40;
    const FIXED_DT_MS = 8;
    const MAX_FRAME_DT_MS = 100;
    const MAX_CATCHUP = 6;
    const MAX_ENTRIES = MAX_DROPLETS * 2;


    const container = mountRef.current;
    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);


    const bgCanvas = document.createElement("canvas");
    const bgCtx = bgCanvas.getContext("2d");
    const bgTexture = new THREE.CanvasTexture(bgCanvas);
    bgTexture.minFilter = THREE.LinearFilter;
    bgTexture.magFilter = THREE.LinearFilter;

    function drawBackground() {
      const w = renderer.domElement.width;
      const h = renderer.domElement.height;
      bgCanvas.width = w;
      bgCanvas.height = h;

      /* gradient background - adjusted for portfolio sections */
      const grd = bgCtx.createLinearGradient(0, 0, w * 0.6, h);
      grd.addColorStop(0, "#050505");
      grd.addColorStop(0.35, "#080505");
      grd.addColorStop(0.6, "#0a0505");
      grd.addColorStop(1, "#050505");
      bgCtx.fillStyle = grd;
      bgCtx.fillRect(0, 0, w, h);

      /* decorative colour waves */
      bgCtx.save();
      bgCtx.globalAlpha = 0.2;
      for (let i = 0; i < 5; i++) {
        const cx = w * (0.2 + i * 0.18);
        const cy = h * (0.3 + Math.sin(i * 1.3) * 0.25);
        const rg = bgCtx.createRadialGradient(cx, cy, 0, cx, cy, w * 0.35);
        const hue = 0 + i * 10; // Red hues
        rg.addColorStop(0, `hsla(${hue}, 80%, 30%, 0.4)`);
        rg.addColorStop(1, `hsla(${hue}, 60%, 10%, 0)`);
        bgCtx.fillStyle = rg;
        bgCtx.fillRect(0, 0, w, h);
      }
      bgCtx.restore();

      /* main title */
      bgCtx.fillStyle = "#000000";
      bgCtx.textAlign = "center";
      bgCtx.textBaseline = "middle";

      const titleSize = Math.round(w * 0.08);
      bgCtx.font = `700 ${titleSize}px 'Space Grotesk', sans-serif`;
      bgCtx.globalAlpha = 0.15;
      bgCtx.fillText(textLine1, w * 0.5, h * 0.42);
      bgCtx.fillText(textLine2, w * 0.5, h * 0.42 + titleSize * 1.05);

      /* scattered small text */
      const words = [
        
      ];
      bgCtx.globalAlpha = 0.05;
      const scatterSize = Math.round(w * 0.015);
      bgCtx.font = `500 ${scatterSize}px 'Space Grotesk', sans-serif`;
      for (let i = 0; i < words.length; i++) {
        bgCtx.fillText(
          words[i],
          w * (0.12 + (i % 4) * 0.25),
          h * (0.08 + Math.floor(i / 4) * 0.35 + (i % 3) * 0.12),
        );
      }
      bgCtx.globalAlpha = 1;

      bgTexture.needsUpdate = true;
    }

    drawBackground();

    /* ── Droplet data ───────────────────────────────────────── */
    const dropletBuf = new Float32Array(MAX_ENTRIES * 4);
    const dropletTex = new THREE.DataTexture(
      dropletBuf,
      MAX_ENTRIES,
      1,
      THREE.RGBAFormat,
      THREE.FloatType,
    );
    dropletTex.minFilter = THREE.NearestFilter;
    dropletTex.magFilter = THREE.NearestFilter;
    dropletTex.needsUpdate = true;

    let drops = [];
    let uid = 0;

    function spawn(x, y, r, vx = 0, vy = 0) {
      if (drops.length >= MAX_DROPLETS) return null;
      const area = Math.PI * r * r;
      const angle = Math.random() * Math.PI * 2;
      const spd = 0.0003 + Math.random() * 0.0008;
      const d = {
        id: uid++,
        x,
        y,
        r,
        area,
        vx: vx || Math.cos(angle) * spd,
        vy: vy || Math.sin(angle) * spd,
        alive: true,
        wanderAngle: Math.random() * Math.PI * 2,
        wanderSpeed: 0.3 + Math.random() * 0.5,
        softPrevX: x,
        softPrevY: y,
        softOffX: 0,
        softOffY: 0,
        softVelX: 0,
        softVelY: 0,
      };
      drops.push(d);
      return d;
    }

    for (let i = 0; i < 12; i++) {
      spawn(
        (Math.random() - 0.5) * 0.7,
        (Math.random() - 0.5) * 0.5,
        0.03 + Math.random() * 0.05,
      );
    }

    /* ── Shaders ────────────────────────────────────────────── */
    const vertSrc = `void main(){ gl_Position = vec4(position, 1.0); }`;
    const fragSrc = `
      precision highp float;
      #define MAX_N ${MAX_ENTRIES}
      uniform vec2      uRes;
      uniform sampler2D uData;
      uniform sampler2D uBg;
      uniform int       uCount;
      uniform float     uTime;
      void main(){
        vec2  uv  = gl_FragCoord.xy / uRes;
        float asp = uRes.x / uRes.y;
        vec2  p   = (uv - 0.5) * vec2(asp, 1.0);
        float field = 0.0;
        vec2  grad  = vec2(0.0);
        vec2  lens  = vec2(0.0);
        float lensW = 0.0;
        for(int i = 0; i < MAX_N; i++){
          if(i >= uCount) break;
          vec4  d = texture2D(uData, vec2((float(i)+0.5)/float(MAX_N), 0.5));
          vec2  c = d.xy;
          float r = d.z;
          if(r < 0.001) continue;
          vec2  delta = p - c;
          float dSq   = dot(delta, delta) + 1e-5;
          float contrib = r * r / dSq;
          field += contrib;
          grad  += -2.0 * contrib / dSq * delta;
          float w = r * r / (dSq + r * r);
          lens += (c - p) * w;
          lensW += w;
        }
        lens /= (lensW + 0.001);
        float lensLen = length(lens);
        float thr  = 1.0;
        float edge = smoothstep(thr - 0.08, thr + 0.03, field);
        float refractStrength = 0.035;
        float mappedLens = atan(lensLen * 6.0) * refractStrength;
        vec2  refractDir = (lensLen > 1e-5) ? lens / lensLen : vec2(0.0);
        float refractMask = smoothstep(thr - 0.2, thr + 1.5, field);
        vec2  refractedUV = clamp(uv + refractDir * mappedLens * refractMask, 0.001, 0.999);
        vec3  bgClean = texture2D(uBg, uv).rgb;
        float gradLen = length(grad);
        float nScale = atan(gradLen * 0.5) * 0.3;
        vec2  nGrad  = (gradLen > 1e-4) ? (grad / gradLen) * nScale : vec2(0.0);
        vec3  N = normalize(vec3(-nGrad, 1.0));
        vec3  L = normalize(vec3(0.3, 0.6, 1.0));
        vec3  V = vec3(0.0, 0.0, 1.0);
        vec3  H = normalize(L + V);
        float diff = max(dot(N, L), 0.0);
        float spec = pow(max(dot(N, H), 0.0), 180.0);
        float cosTheta = max(dot(N, V), 0.0);
        float fresnel  = 0.04 + 0.96 * pow(1.0 - cosTheta, 4.0);
        float rim = smoothstep(thr + 0.6, thr, field) * edge;
        float caStr = 0.0018 * edge;
        vec3 bgCA;
        bgCA.r = texture2D(uBg, refractedUV + vec2(caStr, caStr * 0.5)).r;
        bgCA.g = texture2D(uBg, refractedUV).g;
        bgCA.b = texture2D(uBg, refractedUV - vec2(caStr, caStr * 0.5)).b;
        float depth = smoothstep(thr, thr + 3.0, field);
        vec3  tint  = mix(vec3(1.0), vec3(1.0, 0.9, 0.9), depth * 0.45);
        vec3 glassColor = bgCA * tint * (0.92 + 0.08 * diff)
                        + vec3(1.0) * spec * 0.85
                        + vec3(1.0, 0.9, 0.9) * rim * 0.22
                        + vec3(1.0) * fresnel * 0.10;
        float shadowField = smoothstep(thr - 0.35, thr - 0.05, field);
        vec3 bg = bgClean * (1.0 - shadowField * 0.06);
        float borderOuter = smoothstep(thr - 0.10, thr - 0.01, field);
        float borderInner = smoothstep(thr + 0.0, thr + 0.06, field);
        float border = borderOuter * (1.0 - borderInner) * 0.28;
        vec3  col = mix(bg, glassColor, edge);
        col += vec3(1.0) * border;
        gl_FragColor = vec4(col, 1.0);
      }
    `;

    const mat = new THREE.ShaderMaterial({
      vertexShader: vertSrc,
      fragmentShader: fragSrc,
      uniforms: {
        uRes: { value: new THREE.Vector2(renderer.domElement.width, renderer.domElement.height) },
        uData: { value: dropletTex },
        uBg: { value: bgTexture },
        uCount: { value: 0 },
        uTime: { value: 0 },
      },
    });
    scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat));

    /* ── Interaction ────────────────────────────────────────── */
    let aspect = container.clientWidth / container.clientHeight;
    const mouse = { x: 999, y: 999, active: false, down: false };
    let spawnCD = 0;

    const onPointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width - 0.5) * aspect;
      mouse.y = 0.5 - (e.clientY - rect.top) / rect.height;
      mouse.active = true;
    };
    const onPointerDown = () => { mouse.down = true; };
    const onPointerUp = () => { mouse.down = false; };
    const onPointerLeave = () => { mouse.active = false; mouse.down = false; };

    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerdown", onPointerDown);
    container.addEventListener("pointerup", onPointerUp);
    container.addEventListener("pointerleave", onPointerLeave);

    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      renderer.setSize(w, h);
      aspect = w / h;
      mat.uniforms.uRes.value.set(renderer.domElement.width, renderer.domElement.height);
      drawBackground();

      const newIsMobile = window.innerWidth <= 768;
      if (newIsMobile !== isMobile) {
        isMobile = newIsMobile;
        MAX_DROPLETS = isMobile ? 15 : 40;
      }
    };
    window.addEventListener("resize", handleResize);

    /* ── Physics ────────────────────────────────────────────── */
    const DAMP = 0.993;
    const MOUSE_R = 0.18;
    const MOUSE_F = 0.004;
    const TENSION_RANGE = 0.12;
    const TENSION_F = 0.0004;
    const MERGE_RATIO = 0.62;
    const SPLIT_SPEED = 0.013;
    const SPLIT_MIN_R = 0.04;
    const MAX_SPEED = 0.015;
    const BOUNCE = 0.4;
    const WANDER_F = 0.00004;
    const CENTER_PULL = 0.000008;

    function applyForces() {
      for (const d of drops) {
        d.wanderAngle += (Math.random() - 0.5) * d.wanderSpeed;
        d.vx += Math.cos(d.wanderAngle) * WANDER_F;
        d.vy += Math.sin(d.wanderAngle) * WANDER_F;
        d.vx -= d.x * CENTER_PULL;
        d.vy -= d.y * CENTER_PULL;
        if (mouse.active) {
          const dx = d.x - mouse.x;
          const dy = d.y - mouse.y;
          const dSq = dx * dx + dy * dy;
          const rr = MOUSE_R + d.r;
          if (dSq < rr * rr && dSq > 1e-5) {
            const dist = Math.sqrt(dSq);
            const s = 1 - dist / rr;
            const f = s * s * MOUSE_F;
            d.vx += (dx / dist) * f;
            d.vy += (dy / dist) * f;
          }
        }
      }
      for (let i = 0; i < drops.length; i++) {
        const a = drops[i];
        for (let j = i + 1; j < drops.length; j++) {
          const b = drops[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dSq = dx * dx + dy * dy;
          const rng = TENSION_RANGE + a.r + b.r;
          if (dSq < rng * rng && dSq > 1e-5) {
            const dist = Math.sqrt(dSq);
            const s = 1 - dist / rng;
            const f = s * TENSION_F;
            const fx = (dx / dist) * f;
            const fy = (dy / dist) * f;
            a.vx += fx; a.vy += fy;
            b.vx -= fx; b.vy -= fy;
          }
        }
      }
    }

    function integrate() {
      for (const d of drops) {
        const sp = Math.sqrt(d.vx * d.vx + d.vy * d.vy);
        if (sp > MAX_SPEED) { const s = MAX_SPEED / sp; d.vx *= s; d.vy *= s; }
        d.x += d.vx; d.y += d.vy;
        d.vx *= DAMP; d.vy *= DAMP;
        const wx = aspect * 0.5 + 0.1; /* Extra margin */
        const wy = 0.5 + 0.1;         /* Extra margin */
        if (d.x - d.r < -wx) { d.x = -wx + d.r; d.vx = Math.abs(d.vx) * BOUNCE; }
        if (d.x + d.r > wx) { d.x = wx - d.r; d.vx = -Math.abs(d.vx) * BOUNCE; }
        if (d.y - d.r < -wy) { d.y = -wy + d.r; d.vy = Math.abs(d.vy) * BOUNCE; }
        if (d.y + d.r > wy) { d.y = wy - d.r; d.vy = -Math.abs(d.vy) * BOUNCE; }
      }
    }

    function mergeDroplets() {
      for (let i = 0; i < drops.length; i++) {
        const a = drops[i]; if (!a.alive) continue;
        for (let j = i + 1; j < drops.length; j++) {
          const b = drops[j]; if (!b.alive) continue;
          const dx = b.x - a.x; const dy = b.y - a.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < (a.r + b.r) * MERGE_RATIO) {
            const na = a.area + b.area;
            a.x = (a.x * a.area + b.x * b.area) / na;
            a.y = (a.y * a.area + b.y * b.area) / na;
            a.vx = (a.vx * a.area + b.vx * b.area) / na;
            a.vy = (a.vy * a.area + b.vy * b.area) / na;
            a.r = Math.sqrt(na / Math.PI); a.area = na;
            b.alive = false;
          }
        }
      }
      drops = drops.filter(d => d.alive);
    }

    function splitDroplets() {
      const add = [];
      for (const d of drops) {
        if (d.r < SPLIT_MIN_R) continue;
        const sp = Math.sqrt(d.vx * d.vx + d.vy * d.vy);
        if (sp < SPLIT_SPEED) continue;
        const ha = d.area * 0.5; const nr = Math.sqrt(ha / Math.PI);
        const nx = -d.vy / sp; const ny = d.vx / sp; const off = nr * 0.7;
        d.r = nr; d.area = ha; d.x -= nx * off; d.y -= ny * off;
        add.push({
          id: uid++, x: d.x + nx * off * 2, y: d.y + ny * off * 2, r: nr, area: ha,
          vx: d.vx + nx * sp * 0.35, vy: d.vy + ny * sp * 0.35, alive: true,
          wanderAngle: Math.random() * Math.PI * 2, wanderSpeed: 0.3 + Math.random() * 0.5,
          softPrevX: d.x + nx * off * 2, softPrevY: d.y + ny * off * 2,
          softOffX: 0, softOffY: 0, softVelX: 0, softVelY: 0,
        });
      }
      for (const a of add) if (drops.length < MAX_DROPLETS) drops.push(a);
    }

    function updateSoftBodies() {
      for (const d of drops) {
        const dx = d.x - d.softPrevX; const dy = d.y - d.softPrevY;
        d.softVelX += (dx - d.softOffX) * 0.22; d.softVelY += (dy - d.softOffY) * 0.22;
        d.softVelX *= 0.6; d.softVelY *= 0.6;
        d.softOffX += d.softVelX; d.softOffY += d.softVelY;
        d.softPrevX = d.x; d.softPrevY = d.y;
      }
    }

    function fixedUpdate() {
      applyForces(); integrate(); mergeDroplets(); splitDroplets(); updateSoftBodies();
      if (mouse.down && mouse.active) {
        spawnCD -= FIXED_DT_MS;
        if (spawnCD <= 0 && drops.length < MAX_DROPLETS) {
          spawnCD = 120;
          spawn(mouse.x + (Math.random() - 0.5) * 0.02, mouse.y + (Math.random() - 0.5) * 0.02, 0.02 + Math.random() * 0.015);
        }
      }
    }

    function sync() {
      dropletBuf.fill(0);
      const n = Math.min(drops.length, MAX_DROPLETS);
      for (let i = 0; i < n; i++) {
        const d = drops[i];
        dropletBuf[i * 4] = d.x; dropletBuf[i * 4 + 1] = d.y; dropletBuf[i * 4 + 2] = d.r; dropletBuf[i * 4 + 3] = 1;
        const gi = (n + i) * 4;
        dropletBuf[gi] = d.x - d.softOffX * 3.5; dropletBuf[gi + 1] = d.y - d.softOffY * 3.5; dropletBuf[gi + 2] = d.r * 0.7; dropletBuf[gi + 3] = 1;
      }
      dropletTex.needsUpdate = true;
      mat.uniforms.uCount.value = n * 2;
    }

    let last = performance.now();
    let acc = 0;
    let frameId;

    const loop = () => {
      const now = performance.now();
      const dt = Math.min(now - last, MAX_FRAME_DT_MS);
      last = now;
      acc += dt;
      let g = 0;
      
      // Fixed update - Run only if not under heavy load on mobile
      while (acc >= FIXED_DT_MS && g < MAX_CATCHUP) {
        fixedUpdate();
        acc -= FIXED_DT_MS;
        g++;
      }
      
      mat.uniforms.uTime.value = now * 0.001;
      sync();
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerdown", onPointerDown);
      container.removeEventListener("pointerup", onPointerUp);
      container.removeEventListener("pointerleave", onPointerLeave);
      if (mountRef.current) mountRef.current.removeChild(renderer.domElement);
      bgTexture.dispose();
      dropletTex.dispose();
      mat.dispose();
    };
  }, []);

  return <div ref={mountRef} className="liquid-glass-bg" />;
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

    const updateHUD = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      const si = Math.min(Math.floor(progress * (N - 1) + 0.5), N - 1);
      const name = FACE_NAMES[si] || "";

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

    const ctx = gsap.context(() => {
      sections.forEach((section, idx) => {
        const card = section.querySelector(".text-card");
        const media = section.querySelector(".project-media-wrap");
        
        if (media) {
          // 3D Entrance for media
          gsap.fromTo(media, {
            opacity: 0,
            scale: 0.8,
            rotateY: idx % 2 === 0 ? 45 : -45,
            rotateX: 20,
            transformPerspective: 1000
          }, {
            opacity: 1,
            scale: 1,
            rotateY: 0,
            rotateX: 0,
            duration: 1.5,
            ease: "expo.out",
            scrollTrigger: {
              trigger: section,
              start: "top 70%",
              toggleActions: "play none none reverse"
            }
          });

          // 3D Tilt on Hover for media
          media.addEventListener("mousemove", (e) => {
            const rect = media.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            gsap.to(media, {
              rotateY: x * 20,
              rotateX: -y * 20,
              scale: 1.05,
              duration: 0.5,
              ease: "power2.out"
            });
          });

          media.addEventListener("mouseleave", () => {
            gsap.to(media, {
              rotateY: 0,
              rotateX: 0,
              scale: 1,
              duration: 0.8,
              ease: "elastic.out(1, 0.3)"
            });
          });

          // Parallax for inner media content
          const mediaInner = media.querySelector("img, video");
          if (mediaInner) {
            gsap.to(mediaInner, {
              yPercent: 20,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: true
              }
            });
          }
        }

        if (card) {
          // 3D Entrance for card
          gsap.fromTo(card, {
            opacity: 0,
            x: idx % 2 === 0 ? -100 : 100,
            rotateY: idx % 2 === 0 ? -30 : 30,
            transformPerspective: 1000
          }, {
            opacity: 1,
            x: 0,
            rotateY: 0,
            duration: 1.2,
            ease: "power4.out",
            scrollTrigger: {
              trigger: section,
              start: "top 65%",
              toggleActions: "play none none reverse"
            }
          });

          // Floating animation for card
          gsap.to(card, {
            y: "-=15",
            duration: 2 + Math.random(),
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
          });

          // Magnetic text effect
          const chars = card.querySelectorAll(".skills-title-char");
          chars.forEach(char => {
            char.addEventListener("mousemove", (e) => {
              const rect = char.getBoundingClientRect();
              const x = (e.clientX - rect.left - rect.width / 2) * 0.5;
              const y = (e.clientY - rect.top - rect.height / 2) * 0.5;
              gsap.to(char, {
                x, y,
                color: "#ff0000",
                duration: 0.3
              });
            });
            char.addEventListener("mouseleave", () => {
              gsap.to(char, {
                x: 0, y: 0,
                color: "",
                duration: 0.5
              });
            });
          });
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
              Initializing access to the field database. Reviewing architectural iterations.
            </p>
            <div className="cta-row">
              <a className="cta" href="#s1">Initialize <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 6h10M6 1l5 5-5 5" /></svg></a>
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
              
              <div className="project-links-grid">
                <div className="link-explanation">
                  <span className="expl-label">TECHNICAL PROTOCOL</span>
                  <p className="expl-text">{proj.explanation}</p>
                  
                  <div className="link-actions">
                    <a className="cta neon-btn" href={proj.liveLink} target="_blank" rel="noreferrer">
                      <span className="btn-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" /></svg>
                      </span>
                      VISIT PROJECT
                    </a>
                    <a className="cta-back code-btn" href={proj.codeLink} target="_blank" rel="noreferrer">
                      <span className="btn-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
                      </span>
                      SEE CODE
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className={`project-media-wrap ${idx % 2 !== 0 ? 'left' : 'right'}`}>
              <video src={proj.video} muted loop playsInline autoPlay />
            </div>
          </section>
        ))}

        <section id={`s${projects.length + 1}`} className="footer-section">
          <div className="text-card">
            <div className="h-line"></div>
            <div className="tag">Protocol Completion</div>
            <SplitChars text="ARCHIVE SECURED" as="h2" />
            <p className="body-text">
              System scan complete. All record clusters have been reviewed.
            </p>
            <div className="cta-row">
              <a className="cta" href="#home">Exit System</a>
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
  useEffect(() => {
    const context = gsap.context(() => {
      const mm = gsap.matchMedia();

      // --- COMMON ANIMATIONS ---
      gsap.fromTo(".achievements-page", {
        opacity: 0,
        backgroundColor: "#000"
      }, {
        opacity: 1,
        backgroundColor: "#0a0a0a",
        duration: 1.5,
        ease: "power2.inOut"
      });

      gsap.fromTo(".ach-header-title", {
        y: 100,
        opacity: 0,
        skewY: 10
      }, {
        y: 0,
        opacity: 1,
        skewY: 0,
        duration: 1.2,
        ease: "expo.out"
      });

      // Bento Cards Entrance
      gsap.fromTo(".bento-card", {
        opacity: 0,
        y: 50,
        scale: 0.9,
        rotateX: 15,
        transformPerspective: 1000
      }, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        stagger: {
          amount: 0.8,
          onStart: function() {
            playStaggerPop(800 + Math.random() * 400);
          }
        },
        duration: 1.2,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: ".bento-grid",
          start: "top 85%"
        }
      });

      // Staggered reveal for internal list items
      const listItems = document.querySelectorAll(".ach-list-item, .strength-tag, .cert-item, .impact-item");
      gsap.fromTo(listItems, {
        opacity: 0,
        x: -20,
        filter: "blur(5px)"
      }, {
        opacity: 1,
        x: 0,
        filter: "blur(0px)",
        stagger: 0.05,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".bento-grid",
          start: "top 70%"
        }
      });

      // --- DESKTOP SPECIFIC (MOUSE) ---
      mm.add("(pointer: fine)", () => {
        const cards = document.querySelectorAll(".bento-card");
        cards.forEach(card => {
          card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            gsap.to(card, {
              rotateY: x * 10,
              rotateX: -y * 10,
              scale: 1.02,
              borderColor: "rgba(255, 0, 0, 0.4)",
              duration: 0.4,
              ease: "power2.out"
            });
            
            const scanner = card.querySelector(".card-scanner");
            if (scanner) {
              gsap.to(scanner, {
                top: `${(y + 0.5) * 100}%`,
                opacity: 1,
                duration: 0.3
              });
            }
          });

          card.addEventListener("mouseleave", () => {
            gsap.to(card, {
              rotateY: 0,
              rotateX: 0,
              scale: 1,
              borderColor: "rgba(255, 0, 0, 0.1)",
              duration: 0.6,
              ease: "elastic.out(1, 0.3)"
            });
            const scanner = card.querySelector(".card-scanner");
            if (scanner) {
              gsap.to(scanner, {
                opacity: 0,
                duration: 0.3
              });
            }
          });
        });

        const achButtons = document.querySelectorAll(".ach-footer-btn, .ach-back-btn");
        achButtons.forEach(btn => {
          btn.addEventListener("mousemove", (e) => {
            const rect = btn.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) * 0.4;
            const y = (e.clientY - rect.top - rect.height / 2) * 0.4;
            gsap.to(btn, {
              x: x,
              y: y,
              duration: 0.3,
              ease: "power2.out"
            });
          });
          btn.addEventListener("mouseleave", () => {
            gsap.to(btn, {
              x: 0,
              y: 0,
              duration: 0.5,
              ease: "elastic.out(1, 0.3)"
            });
          });
        });
      });

      // --- MOBILE SPECIFIC (TOUCH/SCROLL) ---
      mm.add("(pointer: coarse)", () => {
        // Auto-scanning for mobile
        gsap.to(".card-scanner", {
          top: "100%",
          opacity: 0.6,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: {
            each: 0.5,
            from: "random"
          }
        });

        // Scroll-synced tilting for cards
        const cards = document.querySelectorAll(".bento-card");
        cards.forEach(card => {
          gsap.fromTo(card, {
            rotateX: 5
          }, {
            rotateX: -5,
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: true
            }
          });
        });

        // Subtle background glow movement on scroll
        gsap.to(".ach-background-glow", {
          yPercent: 20,
          scrollTrigger: {
            trigger: ".achievements-page",
            start: "top top",
            end: "bottom bottom",
            scrub: 1
          }
        });
      });

      // Glitch text animation for header
      const glitch = document.querySelector(".glitch-text");
      if (glitch) {
        gsap.to(glitch, {
          skewX: 2,
          duration: 0.1,
          repeat: -1,
          yoyo: true,
          ease: "rough({ strength: 2, points: 20, template: none, taper: none, randomize: true, clamp: false })"
        });
      }

    });

    return () => context.revert();
  }, []);

  return (
    <main className="achievements-page black-red-theme">
      <div className="ach-background-glow"></div>
      <div className="ach-data-stream"></div>
      
      <header className="ach-header">
        <div className="ach-nav">
          <a href="#home" className="ach-back-btn">
            <span className="btn-glitch-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              BACK TO TERMINAL
            </span>
          </a>
        </div>
        <div className="ach-header-content">
          <div className="ach-status-line">
            <span className="status-dot animate-pulse"></span>
            <span className="status-text">SECURE ARCHIVE ACCESS // GRANTED</span>
          </div>
          <h1 className="ach-header-title glitch-text" data-text="Achievements & Credentials">
             Achievements & Credentials
          </h1>
        </div>
      </header>

      <div className="bento-grid">
        {/* Section 1: Competitive Excellence */}
        <section className="bento-card large span-2 competitive-excellence glass-morph">
          <div className="card-scanner"></div>
          <div className="card-glow"></div>
          <div className="card-corner tl"></div>
          <div className="card-corner br"></div>
          <div className="card-header">
            <span className="card-icon">🏆</span>
            <h3>Competitive Excellence</h3>
          </div>
          <div className="card-body">
            {achievements[0].items.map((item, i) => (
              <div key={i} className="ach-list-item-pro">
                <div className="ach-item-header">
                  <span className="ach-item-tag">{item.tag}</span>
                  <h4>{item.title}</h4>
                </div>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Incubation (NEW) */}
        <section className="bento-card incubation-card glass-morph">
          <div className="card-scanner"></div>
          <div className="card-corner tr"></div>
          <div className="card-corner bl"></div>
          <div className="card-header">
            <span className="card-icon">🚀</span>
            <h3>Incubation</h3>
          </div>
          <div className="card-body">
            <div className="incubation-highlight">
              <div className="i-brand">IIT DELHI</div>
              <h4>{achievements[1].items[0].title}</h4>
              <p>{achievements[1].items[0].description}</p>
              <div className="i-status">ACTIVE DEPLOYMENT</div>
            </div>
          </div>
        </section>

        {/* Section 3: Core Strengths */}
        <section className="bento-card strengths-card glass-morph">
          <div className="card-scanner"></div>
          <div className="card-header">
            <span className="card-icon">⚡</span>
            <h3>Core Strengths</h3>
          </div>
          <div className="strengths-list-v2">
            {strengths.map((s, i) => (
              <div key={i} className="strength-tag-v2">
                <span className="s-icon">{s.icon}</span>
                <span className="s-text">{s.title}</span>
                <div className="s-bar-bg"><div className="s-bar-fill" style={{width: '90%'}}></div></div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Innovation & Project Impact */}
        <section className="bento-card impact-card span-2 glass-morph">
          <div className="card-scanner"></div>
          <div className="card-header">
            <span className="card-icon">🌍</span>
            <h3>Innovation & Project Impact</h3>
          </div>
          <div className="impact-grid-pro">
            {impactProjects.map((p, i) => (
              <div key={i} className="impact-card-inner">
                <div className="impact-header">
                  <div className="impact-node"></div>
                  <h4>{p.title}</h4>
                </div>
                <ul>
                  {p.features.map((f, j) => (
                    <li key={j}>{f}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: Certifications */}
        <section className="bento-card certifications-card glass-morph">
          <div className="card-scanner"></div>
          <div className="card-header">
            <span className="card-icon">📜</span>
            <h3>Certifications</h3>
          </div>
          <div className="cert-stack-v2">
            {certifications.slice(0, 3).map((cert, i) => (
              <div key={i} className="cert-item-mini">
                <span className="c-issuer">{cert.issuer}</span>
                <h4>{cert.title}</h4>
              </div>
            ))}
            <div className="cert-more">+ {certifications.length - 3} MORE CREDENTIALS</div>
          </div>
        </section>

        {/* Section 6: Athlete (NEW) */}
        <section className="bento-card discipline-card glass-morph">
          <div className="card-scanner"></div>
          <div className="card-header">
            <span className="card-icon">🏅</span>
            <h3>Discipline</h3>
          </div>
          <div className="discipline-box">
             <div className="d-title">NATIONAL LEVEL</div>
             <h4>{achievements[2].items[0].title}</h4>
             <p>Competitive resilience & teamwork.</p>
          </div>
        </section>
      </div>

      <footer className="ach-footer">
        <p className="ach-footer-status">SYSTEM STATUS: FULLY COMPILED // 2026</p>
        <div className="ach-footer-links">
          <a href="#projects" className="ach-footer-btn primary">VIEW PROJECTS</a>
          <a href="#home" className="ach-footer-btn">RETURN TO INDEX</a>
        </div>
      </footer>
    </main>
  );
}

function SplitChars({ text, as: Tag = "h2", className = "" }) {
  const words = text.split(" ");
  let charIndexCounter = 0;

  return (
    <Tag className={className}>
      <span className="skills-title-line" aria-label={text}>
        {words.map((word, wordIdx) => {
          const chars = Array.from(word);
          const result = (
            <span key={`word-${wordIdx}`} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
              {chars.map((char) => {
                const currentIndex = charIndexCounter++;
                return (
                  <span
                    key={`${char}-${currentIndex}`}
                    className="skills-title-char"
                    style={{ "--char-index": currentIndex }}
                    aria-hidden="true"
                  >
                    {char}
                  </span>
                );
              })}
              {/* Add a space after the word if it's not the last word */}
              {wordIdx < words.length - 1 && (
                <span
                  className="skills-title-char"
                  style={{ "--char-index": charIndexCounter++ }}
                  aria-hidden="true"
                >
                  {"\u00A0"}
                </span>
              )}
            </span>
          );
          return result;
        })}
      </span>
    </Tag>
  );
}

export default App;
