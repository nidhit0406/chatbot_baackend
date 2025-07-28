(function() {
  if (window.ChatbotLoaded) return;
  window.ChatbotLoaded = true;

  // Create iframe
  const iframe = document.createElement("iframe");
  iframe.src = "https://chatbot-iota-rose.vercel.app";
  iframe.style.cssText = `
    position: fixed;
    bottom: 70px;
    right: 20px;
    width: 380px;
    height: 0; /* Start collapsed */
    border: none;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.15);
    z-index: 99999;
    opacity: 0;
    transform: translateY(20px);
    transition: 
      height 0.3s ease-out,
      opacity 0.2s ease-out,
      transform 0.25s ease-out;
    background: white;
  `;
  document.body.appendChild(iframe);

  // Create chat button
  const btn = document.createElement('button');
  btn.innerHTML = `
    <span>💬 Chat</span>
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style="margin-left: 8px; transition: transform 0.3s ease">
      <path d="M19 9l-7 7-7-7" stroke="white" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `;
  btn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 12px 20px;
    background: #5c6ac4;
    color: white;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    z-index: 100000;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 10px rgba(92,106,196,0.3);
    transition: 
      background 0.2s ease,
      transform 0.2s ease;
  `;

  // Toggle function with animations
  let isOpen = false;
  btn.onclick = () => {
    isOpen = !isOpen;
    
    if (isOpen) {
      // Opening animation
      iframe.style.height = '500px';
      iframe.style.opacity = '1';
      iframe.style.transform = 'translateY(0)';
      iframe.style.display = 'block';
      
      // Button transform (arrow flip)
      btn.querySelector('svg').style.transform = 'rotate(180deg)';
      btn.style.background = '#4a58b3';
    } else {
      // Closing animation
      iframe.style.height = '0';
      iframe.style.opacity = '0';
      iframe.style.transform = 'translateY(20px)';
      
      // Reset button
      btn.querySelector('svg').style.transform = 'rotate(0deg)';
      btn.style.background = '#5c6ac4';
      
      // Hide after animation completes
      setTimeout(() => {
        iframe.style.display = 'none';
      }, 300);
    }
  };

  // Hover effects
  btn.addEventListener('mouseenter', () => {
    btn.style.transform = 'translateY(-2px)';
    btn.style.boxShadow = '0 4px 12px rgba(92,106,196,0.4)';
  });
  
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'translateY(0)';
    btn.style.boxShadow = '0 2px 10px rgba(92,106,196,0.3)';
  });

  document.body.appendChild(btn);
})();