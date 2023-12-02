let cell_tmp = {col: ""};
let oldmap = {col: ""};
let beforeopenmap = {col: ""};
let cell = {lastTriggered: null};

let cell_container = 'hs-two-col';
let cell_container_instance;
let cell_set_instance;

function getStringCount(string, lookfor) {;
    return string.match(new RegExp(lookfor, 'g')).length
}

function getOrderIndex(node) {
    return Array.prototype.indexOf.call(node.parentNode.children, node);
  }

document.addEventListener("DOMContentLoaded", (event) => {

    cell_container_instance = document.querySelector(`.${cell_container}`);
    cell_set_instance = document.querySelectorAll(`.${cell_container} > div`);

  if (cell_tmp.col == "") {
    for (let i = 1; i <= getStringCount(window.getComputedStyle(cell_container_instance, null)["grid-template-columns"], "px"); i++) {
      cell_tmp.col += '1fr ';
    }
    oldmap = cell_tmp;
    cell_container_instance.style.gridTemplateColumns = oldmap.col;
  }
  
  cell_container_instance.addEventListener("mouseout", (e) => {
    cell_container_instance.style.gridTemplateColumns = cell_tmp.col;
    cell.lastTriggered = null;
  });

  cell_set_instance.forEach(item => {
    item.addEventListener("mouseenter", (e) => {
        expandCell(e, false, "1.2");
      });
    });
});

function expandCell(target, double_click = true, scale = "15") {
  if ((cell.lastTriggered == target.target) && !double_click) return;
  if (beforeopenmap.col == "") {
    for (let i = 1; i <= getStringCount(window.getComputedStyle(cell_container_instance, null)["grid-template-columns"], "px"); i++) {
      beforeopenmap.col += '1fr ';
    }
    oldmap = beforeopenmap;
  }

  let newmap = {col: ""};

  let inx = {
    h:1 + getOrderIndex(target.target)%getStringCount(oldmap.col, "fr")
  };

  let maxcount = {
    col: getStringCount(oldmap.col, "fr")
  }
  for (let i = 1; i <= maxcount.col; i++) {
    newmap.col += ((i == inx.h) ? (scale + 'fr ') : (((maxcount.col - Math.abs(inx.h - i))/(maxcount.col)) + 'fr '));
  }
  
    if ((newmap.col == oldmap.col) && double_click) {
      cell_container_instance.style.gridTemplateColumns = beforeopenmap.col;
      beforeopenmap.col = "";
    } else {
      cell_container_instance.style.gridTemplateColumns = newmap.col;
      beforeopenmap = oldmap;
    }

    oldmap = newmap;

    cell.lastTriggered = target.target;
}