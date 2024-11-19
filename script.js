window.addEventListener('load', () => {
    const letters = "TriangleT".split('');
    const logoPlaceholder = document.getElementById('logo-placeholder');
    
    // Create floating letters
    letters.forEach((letter, index) => {
      const floatingLetter = document.createElement('span');
      floatingLetter.classList.add('floating-letter');
      floatingLetter.textContent = letter;
      
      // Random initial positions for the letters
      const initialX = Math.random() * window.innerWidth;
      const initialY = Math.random() * window.innerHeight;
      floatingLetter.style.left = `${initialX}px`;
      floatingLetter.style.top = `${initialY}px`;
      
      // Append floating letters to body
      document.body.appendChild(floatingLetter);
      
      // Animate letters into place
      setTimeout(() => {
        floatingLetter.style.transition = 'all 2s ease-in-out';
        floatingLetter.style.left = `${logoPlaceholder.offsetLeft + (index * 60)}px`;
        floatingLetter.style.top = `${logoPlaceholder.offsetTop}px`;
        floatingLetter.style.opacity = '1';
      }, 1000);
      
      // Remove floating letters after they form the logo
      setTimeout(() => {
        floatingLetter.style.opacity = '0';
        floatingLetter.style.transition = 'opacity 1s ease-out';
      }, 3000);
    });
  });
  