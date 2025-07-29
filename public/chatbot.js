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

  // Create iframe
  const iframe = document.createElement("iframe");
  iframe.src = "https://chatbot-iota-rose.vercel.app";
  iframe.style.cssText = `
    position: fixed;
    bottom: 80px;
    right: 20px;
    width: 380px;
    height: 0;
    border: none;
    border-radius: 16px;
    box-shadow: 0 8px 30px rgba(0,0,0,0.15);
    z-index: 99999;
    opacity: 0;
    transform: translateY(20px) scale(0.95);
    transform-origin: bottom right;
    transition: 
      height 0.3s cubic-bezier(0.22, 1, 0.36, 1),
      opacity 0.25s ease-out,
      transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
    background: white;
    overflow: hidden;
    display: none;
  `;
  document.body.appendChild(iframe);

  // Create toggle button
  const btn = document.createElement('button');
  btn.innerHTML = `
    <span class="chatbot-icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22Z" fill="white"></path>
        <path d="M15 12C15 12.5523 15.4477 13 16 13C16.5523 13 17 12.5523 17 12C17 11.4477 16.5523 11 16 11C15.4477 11 15 11.4477 15 12Z" fill="currentColor"></path>
        <path d="M11 12C11 12.5523 11.4477 13 12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12Z" fill="currentColor"></path>
        <path d="M7 12C7 12.5523 7.44772 13 8 13C8.55228 13 9 12.5523 9 12C9 11.4477 8.55228 11 8 11C7.44772 11 7 11.4477 7 12Z" fill="currentColor"></path>
      </svg>
    </span>
    <span class="chatbot-pulse"></span>
  `;
  
  btn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 60px;
    height: 60px;
    padding: 0;
    background: linear-gradient(135deg, #5c6ac4 0%, #4a58b3 100%);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    z-index: 100000;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 20px rgba(92,106,196,0.3);
    transition: 
      all 0.3s cubic-bezier(0.22, 1, 0.36, 1),
      transform 0.2s ease;
    outline: none;
  `;

  // Add styles for the icon and pulse effect
  const style = document.createElement('style');
  style.textContent = `
    .chatbot-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
    }
    .chatbot-pulse {
      position: absolute;
      width: 100%;
      height: 100%;
      background: rgba(92,106,196,0.4);
      border-radius: 50%;
      opacity: 0;
      transform: scale(1);
      animation: none;
    }
    @keyframes pulse {
      0% {
        transform: scale(1);
        opacity: 1;
      }
      100% {
        transform: scale(1.5);
        opacity: 0;
      }
    }
    .chatbot-notification .chatbot-pulse {
      animation: pulse 1.5s infinite;
    }
  `;
  document.head.appendChild(style);

  let isOpen = false;
  let hasNotification = false;

  // Toggle function
  const toggleChat = () => {
    isOpen = !isOpen;
    
    if (isOpen) {
      // Open chat
      iframe.style.display = 'block';
      setTimeout(() => {
        iframe.style.height = 'min(600px, 80vh)';
        iframe.style.opacity = '1';
        iframe.style.transform = 'translateY(0) scale(1)';
      }, 10);
      
      btn.classList.remove('chatbot-notification');
      btn.style.transform = 'translateY(-5px)';
      btn.style.background = 'linear-gradient(135deg, #4a58b3 0%, #3a4799 100%)';
      
      // Animate icon
      btn.querySelector('.chatbot-icon').style.transform = 'rotate(180deg)';
      
      // Remove notification if it exists
      hasNotification = false;
    } else {
      // Close chat
      iframe.style.height = '0';
      iframe.style.opacity = '0';
      iframe.style.transform = 'translateY(20px) scale(0.95)';
      
      btn.style.background = 'linear-gradient(135deg, #5c6ac4 0%, #4a58b3 100%)';
      btn.querySelector('.chatbot-icon').style.transform = 'rotate(0deg)';
      
      setTimeout(() => {
        if (!isOpen) {
          iframe.style.display = 'none';
        }
      }, 300);
    }
  };

  btn.onclick = toggleChat;

  // Hover effects
  btn.addEventListener('mouseenter', () => {
    if (!isOpen) {
      btn.style.transform = 'translateY(-5px) scale(1.05)';
      btn.style.boxShadow = '0 6px 25px rgba(92,106,196,0.4)';
    }
  });
  
  btn.addEventListener('mouseleave', () => {
    if (!isOpen) {
      btn.style.transform = 'translateY(0) scale(1)';
      btn.style.boxShadow = '0 4px 20px rgba(92,106,196,0.3)';
    }
  });

  // Add notification effect (you can trigger this from your iframe messages)
  window.showChatbotNotification = () => {
    if (!isOpen && !hasNotification) {
      hasNotification = true;
      btn.classList.add('chatbot-notification');
    }
  };

  document.body.appendChild(btn);

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (isOpen && !iframe.contains(e.target) && e.target !== btn && !btn.contains(e.target)) {
      toggleChat();
    }
  });
})();