;(() => {
  const targetElement = document.documentElement;
  const defaultTheme = targetElement.getAttribute("data-color-mode").toLocaleLowerCase();
  changeGiscusTheme(defaultTheme)
  const observer = new MutationObserver((mutationsList, observer) => {
    for(const mutation of mutationsList) {
      if (mutation.type === 'attributes') {
        const value = targetElement.getAttribute("data-color-mode").toLocaleLowerCase();
        changeGiscusTheme(value)
      }
    }
  });
  
  observer.observe(targetElement, {
    attributes: true,
    attributeOldValue: true
  });
  
  function changeGiscusTheme(theme) {
      const iframe = document.querySelector('.giscus-frame');
      if (iframe) {
          iframe.contentWindow.postMessage({
              giscus: { theme }
          }, 'https://giscus.app');
      }
  }
})();
