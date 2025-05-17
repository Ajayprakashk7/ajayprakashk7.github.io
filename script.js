// Theme toggle functionality
const themeToggle = document.getElementById("modeToggle");
const themeToggle2 = document.getElementById("modeToggle2");
const body = document.body;

function setTheme(theme) {
  requestAnimationFrame(() => {
    document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    document.body.setAttribute("theme", theme);
    localStorage.setItem("theme", theme);
    updateThemeIcons(theme);
  });
}

function updateThemeIcons(theme) {
  const icons = [themeToggle, themeToggle2];
  icons.forEach(icon => {
    if (icon) {
      icon.src = theme === "dark" ? icon.getAttribute("src-dark") : icon.getAttribute("src-light");
    }
  });
}

// Initialize theme from localStorage
const savedTheme = localStorage.getItem("theme") || "light";
setTheme(savedTheme);

// Theme toggle click handlers
[themeToggle, themeToggle2].forEach(toggle => {
  if (toggle) {
    toggle.addEventListener("click", () => {
      const currentTheme = body.getAttribute("theme");
      setTheme(currentTheme === "dark" ? "light" : "dark");
    });
  }
});

// Mobile menu functionality
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// Initialize particles.js with optimized settings
particlesJS("particles-js", {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800
      }
    },
    color: {
      value: "#3b82f6"
    },
    shape: {
      type: "circle"
    },
    opacity: {
      value: 0.5,
      random: true,
      anim: {
        enable: true,
        speed: 1,
        opacity_min: 0.1,
        sync: false
      }
    },
    size: {
      value: 3,
      random: true,
      anim: {
        enable: true,
        speed: 2,
        size_min: 0.1,
        sync: false
      }
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#3b82f6",
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: 2,
      direction: "none",
      random: true,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: {
        enable: true,
        rotateX: 600,
        rotateY: 1200
      }
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "grab"
      },
      onclick: {
        enable: true,
        mode: "push"
      },
      resize: true
    },
    modes: {
      grab: {
        distance: 140,
        line_linked: {
          opacity: 0.8
        }
      },
      push: {
        particles_nb: 4
      }
    }
  },
  retina_detect: true
});

// Optimized scroll handling with RAF
let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      updateScroll();
      ticking = false;
    });
    ticking = true;
  }
});

function updateScroll() {
  const scrollProgress = document.querySelector('.scroll-progress');
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = window.scrollY;
  const progress = (scrolled / scrollable) * 100;
  scrollProgress.style.width = `${progress}%`;
}

// Optimized section animations with better performance
const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: [0.1, 0.5]
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      requestAnimationFrame(() => {
        entry.target.classList.add("visible");
        const skillBar = entry.target.querySelector('.skill-progress-bar');
        if (skillBar) {
          const level = skillBar.getAttribute('data-level');
          skillBar.style.width = `${level}%`;
        }
      });
    }
  });
}, observerOptions);

// Observe sections with a small delay between each
document.querySelectorAll("section").forEach((section, index) => {
  setTimeout(() => {
    observer.observe(section);
  }, index * 100);
});

// Smooth scroll with debounce
let isScrollingToSection = false;

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    
    if (isScrollingToSection) return;
    isScrollingToSection = true;
    
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const headerOffset = 100;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      
      const menu = document.querySelector(".menu-links");
      const icon = document.querySelector(".hamburger-icon");
      if (menu.classList.contains("open")) {
        menu.classList.remove("open");
        icon.classList.remove("open");
      }
    }
    
    setTimeout(() => {
      isScrollingToSection = false;
    }, 1000);
  });
});

// Optimized typing animation for profile title only
function typeWriter(element, text, speed = 100) {
  if (!element || element.dataset.typed === 'true') return;
  
  let i = 0;
  element.innerHTML = '';
  element.classList.add('typing');
  element.dataset.typed = 'true';
  
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      requestAnimationFrame(() => setTimeout(type, speed));
    } else {
      element.classList.remove('typing');
    }
  }
  
  type();
}

// Only apply typing animation to the profile section title
const profileTitleObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const title = entry.target;
      if (title.closest('#profile')) {
        const text = title.textContent;
        typeWriter(title, text);
        profileTitleObserver.unobserve(title);
      }
    }
  });
}, { threshold: 0.5 });

// Only observe the title in the profile section
document.querySelector('#profile .title')?.forEach(title => {
  profileTitleObserver.observe(title);
});

// Add hover effect to project cards
document.querySelectorAll(".color-container").forEach(card => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-10px) scale(1.02)";
    card.style.boxShadow = "0 20px 30px rgba(0, 0, 0, 0.15)";
  });
  
  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) scale(1)";
    card.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.1)";
  });
});

// Add loading animation for images
document.querySelectorAll("img").forEach(img => {
  img.addEventListener("load", () => {
    img.classList.add("loaded");
  });
});

// Skill progress bars animation
function animateSkillBars() {
  document.querySelectorAll('.skill-progress-bar').forEach(bar => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const level = bar.getAttribute('data-level');
        bar.style.width = `${level}%`;
        observer.unobserve(bar);
      }
    }, { threshold: 0.5 });
    
    observer.observe(bar);
  });
}

// Add skill progress bars to experience section
document.querySelectorAll('.article-container article').forEach(article => {
  const level = article.querySelector('p').textContent.toLowerCase();
  const progressBar = document.createElement('div');
  progressBar.className = 'skill-progress';
  
  const bar = document.createElement('div');
  bar.className = 'skill-progress-bar';
  bar.setAttribute('data-level', level === 'expert' ? '90' : level === 'intermediate' ? '70' : '50');
  
  progressBar.appendChild(bar);
  article.appendChild(progressBar);
});

// Initialize skill bars animation
animateSkillBars();

