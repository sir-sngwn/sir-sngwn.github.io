/**
 * Reusable Components Interactive Scripts
 * Handles: Copy-to-clipboard, Tab switching, Accordions
 */

document.addEventListener('DOMContentLoaded', () => {
  initCopyButtons();
  initTabs();
});

/**
 * 1. Initialize Copy to Clipboard Buttons
 */
function initCopyButtons() {
  document.querySelectorAll('.btn-copy').forEach(button => {
    button.addEventListener('click', async (e) => {
      e.stopPropagation();
      
      // Determine what to copy
      let textToCopy = '';
      const codeBlock = button.closest('.code-block');
      const promptBox = button.closest('.prompt-box');

      if (codeBlock) {
        const codeElement = codeBlock.querySelector('pre code') || codeBlock.querySelector('pre');
        if (codeElement) {
          textToCopy = codeElement.innerText.trim();
        }
      } else if (promptBox) {
        const promptContent = promptBox.querySelector('.prompt-box-content');
        if (promptContent) {
          textToCopy = promptContent.innerText.trim();
        }
      }

      if (!textToCopy && button.dataset.copyText) {
        textToCopy = button.dataset.copyText;
      }

      if (!textToCopy) return;

      try {
        await navigator.clipboard.writeText(textToCopy);
        
        const originalHtml = button.innerHTML;
        button.classList.add('copied');
        button.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>복사됨!</span>
        `;

        setTimeout(() => {
          button.classList.remove('copied');
          button.innerHTML = originalHtml;
        }, 2000);
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    });
  });
}

/**
 * 2. Initialize Interactive Tabs
 */
function initTabs() {
  document.querySelectorAll('.tabs-container').forEach(container => {
    const buttons = container.querySelectorAll('.tab-button');
    const panels = container.querySelectorAll('.tab-panel');

    buttons.forEach((button, index) => {
      button.addEventListener('click', () => {
        // Deactivate all buttons & panels within this container
        buttons.forEach(btn => btn.classList.remove('active'));
        panels.forEach(panel => panel.classList.remove('active'));

        // Activate selected
        button.classList.add('active');
        
        const targetId = button.dataset.target;
        if (targetId) {
          const targetPanel = container.querySelector(targetId);
          if (targetPanel) targetPanel.classList.add('active');
        } else if (panels[index]) {
          panels[index].classList.add('active');
        }
      });
    });
  });
}
