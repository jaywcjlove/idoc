const demo = document.querySelectorAll('.idoc-demo-previw.language-html');

function getButton(elm, type = 'BUTTON') {
  let btn;
  do {
    elm = elm.nextElementSibling
    if (elm.tagName === type) {
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
        if (item.tagName === 'DIV') {
          item.innerHTML = item.nextElementSibling.defaultValue
        }
        button.onclick = () => {
          item.classList.toggle('ishiden');
          button.innerHTML = item.classList.contains('ishiden') ? 'Preview' : 'Show Code';
        }
      }
    }
  });
}