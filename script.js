// Acordeón para las secciones de experiencia
document.querySelectorAll('.job-header').forEach(header => {
    const toggleJob = () => {
      const job = header.closest('.job');
      const description = job.querySelector('.job-description');
      const toggle = job.querySelector('.job-toggle');
      
      description.classList.toggle('active');
      toggle.classList.toggle('rotated');
    };
  
    header.addEventListener('click', toggleJob);
    header.addEventListener('touchstart', toggleJob, { passive: true });
  });
  
  // Cambio de tema oscuro/claro
  const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
  const currentTheme = localStorage.getItem('theme');
  
  if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
      toggleSwitch.checked = true;
      document.body.classList.add('dark-mode');
    }
  }
  
  function switchTheme(e) {
    document.body.classList.toggle('dark-mode', e.target.checked);
    localStorage.setItem('theme', e.target.checked ? 'dark' : 'light');
  }
  
  toggleSwitch.addEventListener('change', switchTheme, false);
  
  // Animación de las barras de habilidades
  function animateSkill(skillElement) {
      const level = parseInt(skillElement.getAttribute('data-level'));
      let currentLevel = 0;
      
      function step() {
          if (currentLevel < level) {
              currentLevel += 1;
              skillElement.textContent = `${currentLevel}%`;
              requestAnimationFrame(step);
          }
      }
      
      requestAnimationFrame(step);
  }
  
  function animateSkills() {
      const skillLevels = document.querySelectorAll('.skill-level');
      skillLevels.forEach(animateSkill);
  }
  
  // Intersection Observer para animar las habilidades cuando sean visibles
  const options = {
    threshold: window.innerWidth <= 768 ? 0.1 : 0.5,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateSkills();
        observer.unobserve(entry.target);
      }
    });
  }, options);
  
  const skillsSection = document.querySelector('.skills-container');
  observer.observe(skillsSection);
  
  // Llamar a la función cuando la página se carga
  window.addEventListener('load', animateSkills);