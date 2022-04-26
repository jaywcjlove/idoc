const demo = document.querySelectorAll('.idoc-demo-previw.language-html');

function getButton(elm) {
  let btn;
  do {
    elm = elm.nextElementSibling
    if (elm.tagName === 'BUTTON') {
      btn = elm;
      elm = undefined;
      break;
    }
  } while (elm);
  return btn;
}
if (demo && demo.length > 0) {
  demo.forEach((item) => {
    if (item.nextElementSibling && item.nextElementSibling.tagName === 'INPUT') {
      const button = getButton(item);
      if (button) {
        button.innerHTML = item.classList.contains('ishiden') ? 'Preview' : 'Show Code';
        button.onclick = () => {
          item.classList.toggle('ishiden');
          button.innerHTML = item.classList.contains('ishiden') ? 'Preview' : 'Show Code';
        }
      }
    }
  });
}