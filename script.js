// Add smooth loading animation for all elements
document.addEventListener('DOMContentLoaded', () => {
  // Animate skills on scroll
  const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateX(0)';
      }
    });
  }, { threshold: 0.1 });

  // Animate skills items with stagger
  const skillItems = document.querySelectorAll('.skills-grid > div');
  skillItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-20px)';
    item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    skillsObserver.observe(item);
  });

  // Add typing effect to subtitle
  const subtitle = document.querySelector('.site-subtitle');
  if (subtitle) {
    const text = subtitle.textContent;
    subtitle.textContent = '';
    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        subtitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
      }
    };
    setTimeout(typeWriter, 1000);
  }
});

// Enhanced form validation
const form = document.getElementById('contact-form');
form?.addEventListener('submit', e => {
  e.preventDefault();
  
  const name = form.querySelector('#name').value.trim();
  const email = form.querySelector('#email').value.trim();
  const message = form.querySelector('#message').value.trim();
  
  // Enhanced validation
  if (!name || !email || !message) {
    showNotification('Please fill in all fields before sending.', 'error');
    return;
  }
  
  if (!isValidEmail(email)) {
    showNotification('Please enter a valid email address.', 'error');
    return;
  }
  
  // Show success message with better UX
  showNotification('Thanks! Your message was captured locally. I\'ll get back to you soon!', 'success');
  form.reset();
});

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showNotification(message, type) {
  const notification = document.createElement('div');
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    color: white;
    font-weight: 500;
    z-index: 1000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    background: ${type === 'error' ? '#ef4444' : '#10b981'};
  `;
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => notification.style.transform = 'translateX(0)', 100);
  
  // Animate out and remove
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => notification.remove(), 300);
  }, 4000);
}