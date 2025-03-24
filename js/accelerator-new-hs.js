let cell_tmp = {row: ""};
let oldmap = {row: ""};
let beforeopenmap = {row: ""};
let cell = {lastTriggered: null};

let cell_container = 'home-new';
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
    cell_set_instance = document.querySelectorAll(`.${cell_container} > a`);

  if (cell_tmp.row == "") {
    for (let i = 1; i <= getStringCount(window.getComputedStyle(cell_container_instance, null)["grid-template-rows"], "px"); i++) {
      cell_tmp.row += '1fr ';
    }
    oldmap = cell_tmp;
    cell_container_instance.style.gridTemplateRows = oldmap.row;
  }
  
  cell_container_instance.addEventListener("mouseout", (e) => {
    cell_container_instance.style.gridTemplateRos = cell_tmp.row;
    cell.lastTriggered = null;
  });

  cell_set_instance.forEach(item => {
    item.addEventListener("mouseenter", (e) => {
        expandCell(e, false, "2");
      });
    });
});

function expandCell(target, double_click = true, scale = "15") {
  if ((cell.lastTriggered == target.target) && !double_click) return;
  if (beforeopenmap.row == "") {
    for (let i = 1; i <= getStringCount(window.getComputedStyle(cell_container_instance, null)["grid-template-rows"], "px"); i++) {
      beforeopenmap.row += '1fr ';
    }
    oldmap = beforeopenmap;
  }

  let newmap = {row: ""};

  let inx = {
    h:1 + getOrderIndex(target.target)%getStringCount(oldmap.row, "fr")
  };

  let maxcount = {
    row: getStringCount(oldmap.row, "fr")
  }
  for (let i = 1; i <= maxcount.row; i++) {
    newmap.row += ((i == inx.h) ? (scale + 'fr ') : (((maxcount.row - Math.abs(inx.h - i))/(maxcount.row)) + 'fr '));
  }
  
    if ((newmap.row == oldmap.row) && double_click) {
      cell_container_instance.style.gridTemplateRows = beforeopenmap.row;
      beforeopenmap.row = "";
    } else {
      cell_container_instance.style.gridTemplateRows = newmap.row;
      beforeopenmap = oldmap;
    }

    oldmap = newmap;

    cell.lastTriggered = target.target;
}
