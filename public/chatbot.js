// (function() {
//   if (window.ChatbotLoaded) return;
//   window.ChatbotLoaded = true;

//   // Create iframe
//   const iframe = document.createElement("iframe");
//   iframe.src = "https://chatbot-iota-rose.vercel.app";
//   iframe.style.cssText = `
//     position: fixed;
//     bottom: 70px;
//     right: 20px;
//     width: 380px;
//     height: 0; /* Start collapsed */
//     border: none;
//     border-radius: 12px;
//     box-shadow: 0 4px 20px rgba(0,0,0,0.15);
//     z-index: 99999;
//     opacity: 0;
//     transform: translateY(20px);
//     transition: 
//       height 0.3s ease-out,
//       opacity 0.2s ease-out,
//       transform 0.25s ease-out;
//     background: white;
//   `;
//   document.body.appendChild(iframe);

//   // Create chat button
//   const btn = document.createElement('button');
//   btn.innerHTML = `
//     <span>💬 Chat</span>
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style="margin-left: 8px; transition: transform 0.3s ease">
//       <path d="M19 9l-7 7-7-7" stroke="white" stroke-width="2" stroke-linecap="round"/>
//     </svg>
//   `;
//   btn.style.cssText = `
//     position: fixed;
//     bottom: 20px;
//     right: 20px;
//     padding: 12px 20px;
//     background: #5c6ac4;
//     color: white;
//     border: none;
//     border-radius: 50px;
//     cursor: pointer;
//     z-index: 100000;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     box-shadow: 0 2px 10px rgba(92,106,196,0.3);
//     transition: 
//       background 0.2s ease,
//       transform 0.2s ease;
//   `;

//   // Toggle function with animations
//   let isOpen = false;
//   btn.onclick = () => {
//     isOpen = !isOpen;
    
//     if (isOpen) {
//       // Opening animation
//       iframe.style.height = '500px';
//       iframe.style.opacity = '1';
//       iframe.style.transform = 'translateY(0)';
//       iframe.style.display = 'block';
      
//       // Button transform (arrow flip)
//       btn.querySelector('svg').style.transform = 'rotate(180deg)';
//       btn.style.background = '#4a58b3';
//     } else {
//       // Closing animation
//       iframe.style.height = '0';
//       iframe.style.opacity = '0';
//       iframe.style.transform = 'translateY(20px)';
      
//       // Reset button
//       btn.querySelector('svg').style.transform = 'rotate(0deg)';
//       btn.style.background = '#5c6ac4';
      
//       // Hide after animation completes
//       setTimeout(() => {
//         iframe.style.display = 'none';
//       }, 300);
//     }
//   };

//   // Hover effects
//   btn.addEventListener('mouseenter', () => {
//     btn.style.transform = 'translateY(-2px)';
//     btn.style.boxShadow = '0 4px 12px rgba(92,106,196,0.4)';
//   });
  
//   btn.addEventListener('mouseleave', () => {
//     btn.style.transform = 'translateY(0)';
//     btn.style.boxShadow = '0 2px 10px rgba(92,106,196,0.3)';
//   });

//   document.body.appendChild(btn);
// })();

(function() {
  if (window.ChatbotLoaded) return;
  window.ChatbotLoaded = true;

  // ======= LUXURY IFRAME ======= //
  const iframe = document.createElement("iframe");
  iframe.src = "https://chatbot-iota-rose.vercel.app";
  iframe.style.cssText = `
    position: fixed;
    bottom: 90px;
    right: 25px;
    width: 400px;
    height: 0;
    border: none;
    border-radius: 24px;
    box-shadow: 
      0 12px 40px rgba(0,0,0,0.15),
      0 0 0 1px rgba(255,255,255,0.1) inset;
    z-index: 99999;
    opacity: 0;
    transform: translateY(30px) scale(0.9);
    transform-origin: bottom right;
    transition: 
      height 0.4s cubic-bezier(0.33, 1, 0.68, 1),
      opacity 0.3s ease-out,
      transform 0.4s cubic-bezier(0.33, 1, 0.68, 1);
    background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
    overflow: hidden;
    display: none;
    backdrop-filter: blur(10px);
  `;
  document.body.appendChild(iframe);

  // ======= PREMIUM TOGGLE BUTTON ======= //
  const btn = document.createElement('button');
  btn.innerHTML = `
    <span class="chatbot-icon">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12c0 1.6.376 3.112 1.043 4.453.178.356.237.764.134 1.148l-.596 2.226c-.258.966.626 1.85 1.592 1.592l2.226-.596c.384-.103.792-.044 1.148.134C8.888 21.624 10.4 22 12 22z" 
              fill="url(#btn-gradient)"/>
        <circle cx="8" cy="12" r="1" fill="white"/>
        <circle cx="12" cy="12" r="1" fill="white"/>
        <circle cx="16" cy="12" r="1" fill="white"/>
        <defs>
          <linearGradient id="btn-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#667eea"/>
            <stop offset="100%" stop-color="#764ba2"/>
          </linearGradient>
        </defs>
      </svg>
    </span>
    <span class="chatbot-pulse"></span>
    <span class="chatbot-notification-badge"></span>
  `;
  
  btn.style.cssText = `
    position: fixed;
    bottom: 25px;
    right: 25px;
    width: 68px;
    height: 68px;
    padding: 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    z-index: 100000;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 
      0 6px 30px rgba(102, 126, 234, 0.4),
      0 0 0 1px rgba(255,255,255,0.2) inset;
    transition: all 0.4s cubic-bezier(0.33, 1, 0.68, 1);
    outline: none;
    border: 2px solid rgba(255,255,255,0.15);
  `;

  // ======= ENHANCED STYLES ======= //
  const style = document.createElement('style');
  style.textContent = `
    /* Icon animation */
    .chatbot-icon {
      display: flex;
      transition: transform 0.4s cubic-bezier(0.33, 1, 0.68, 1);
      filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
    }
    
    /* Pulse effect */
    .chatbot-pulse {
      position: absolute;
      width: 100%;
      height: 100%;
      background: rgba(255,255,255,0.3);
      border-radius: 50%;
      opacity: 0;
      transform: scale(1);
      pointer-events: none;
    }
    
    /* Notification badge */
    .chatbot-notification-badge {
      position: absolute;
      top: 12px;
      right: 12px;
      width: 12px;
      height: 12px;
      background: #ff5e5e;
      border-radius: 50%;
      border: 2px solid #764ba2;
      opacity: 0;
      transform: scale(0.5);
      transition: all 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55);
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    }
    
    /* Animations */
    @keyframes pulse {
      0% { transform: scale(1); opacity: 0.8; }
      100% { transform: scale(1.8); opacity: 0; }
    }
    
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-8px); }
    }
    
    .has-notification .chatbot-notification-badge {
      opacity: 1;
      transform: scale(1);
    }
    
    .is-floating {
      animation: float 3s ease-in-out infinite;
    }
  `;
  document.head.appendChild(style);

  // ======= INTERACTIONS ======= //
  let isOpen = false;
  let hasNotification = false;

  const toggleChat = () => {
    isOpen = !isOpen;
    
    if (isOpen) {
      // Open animation
      iframe.style.display = 'block';
      setTimeout(() => {
        iframe.style.height = 'min(650px, 85vh)';
        iframe.style.opacity = '1';
        iframe.style.transform = 'translateY(0) scale(1)';
      }, 10);
      
      btn.classList.remove('has-notification');
      btn.style.transform = 'translateY(-8px)';
      btn.style.background = 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)';
      btn.querySelector('.chatbot-icon').style.transform = 'rotate(1turn)';
      
      hasNotification = false;
    } else {
      // Close animation
      iframe.style.height = '0';
      iframe.style.opacity = '0';
      iframe.style.transform = 'translateY(30px) scale(0.9)';
      
      btn.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
      btn.querySelector('.chatbot-icon').style.transform = 'rotate(0)';
      
      setTimeout(() => {
        if (!isOpen) iframe.style.display = 'none';
      }, 400);
    }
  };

  btn.onclick = toggleChat;

  // ======= HOVER EFFECTS ======= //
  btn.addEventListener('mouseenter', () => {
    if (!isOpen) {
      btn.style.transform = 'translateY(-8px) scale(1.08)';
      btn.style.boxShadow = '0 12px 40px rgba(102, 126, 234, 0.6)';
      btn.classList.add('is-floating');
    }
  });
  
  btn.addEventListener('mouseleave', () => {
    if (!isOpen) {
      btn.style.transform = 'translateY(0) scale(1)';
      btn.style.boxShadow = '0 6px 30px rgba(102, 126, 234, 0.4)';
      btn.classList.remove('is-floating');
    }
  });

  // ======= NOTIFICATION SYSTEM ======= //
  window.showChatbotNotification = () => {
    if (!isOpen && !hasNotification) {
      hasNotification = true;
      btn.classList.add('has-notification');
      
      // Add temporary pulse effect
      const pulse = btn.querySelector('.chatbot-pulse');
      pulse.style.animation = 'pulse 1.5s ease-out';
      pulse.addEventListener('animationend', () => {
        pulse.style.animation = '';
      });
    }
  };

  document.body.appendChild(btn);

  // ======= CLICK OUTSIDE TO CLOSE ======= //
  document.addEventListener('click', (e) => {
    if (isOpen && !iframe.contains(e.target) && e.target !== btn && !btn.contains(e.target)) {
      toggleChat();
    }
  });

  // ======= INITIAL FLOAT ANIMATION ======= //
  setTimeout(() => {
    btn.classList.add('is-floating');
  }, 1000);
})();