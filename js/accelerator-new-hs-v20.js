let cell_tmp = {row: ""};
let oldmap = {row: ""};
let beforeopenmap = {row: ""};
let cell = {lastTriggered: null};

let cell_container = 'home-new';
let cell_container_instance;
let cell_set_instance;
let cell_size = "70";

function getStringCount(string, lookfor) {;
    return string.match(new RegExp(lookfor, 'g')).length
}

function getOrderIndex(node) {
    return Array.prototype.indexOf.call(node.parentNode.children, node);
  }

document.addEventListener("DOMContentLoaded", (event) => {

    cell_container_instance = document.querySelector(`.${cell_container}`);
    cell_set_instance = document.querySelectorAll(`.${cell_container} > *`);

  if (cell_tmp.row == "") {
    for (let i = 1; i <= getStringCount(window.getComputedStyle(cell_container_instance, null)["grid-template-rows"], "px"); i++) {
      cell_tmp.row += '33.33vh ';
    }
    oldmap = cell_tmp;
    cell_container_instance.style.gridTemplateRows = oldmap.row;
  }
  
  cell_container_instance.addEventListener("mouseout", (e) => {
    cell_container_instance.style.gridTemplateRows = cell_tmp.row;
    cell.lastTriggered = null;
    expandCell(cell_set_instance[0], false, cell_size);
  });

  cell_set_instance.forEach((item, index) => {
    item.addEventListener("mouseenter", (e) => {
        if (index > 0) cell_set_instance[0].classList.remove("hide");
        else if (!cell_set_instance[0].classList.contains("hide")) cell_set_instance[0].classList.add("hide");
        expandCell(e.target, false, cell_size);
      });
    });

  expandCell(cell_set_instance[0], false, cell_size);
});

function expandCell(target, double_click = true, scale = "15") {
  if ((cell.lastTriggered == target) && !double_click) return;
  let maxc = getStringCount(window.getComputedStyle(cell_container_instance, null)["grid-template-rows"], "px");
  if (beforeopenmap.row == "") {
    for (let i = 1; i <= maxc; i++) {
      beforeopenmap.row += 100/maxc + 'vh ';
    }
    oldmap = beforeopenmap;
  }

  let newmap = {row: ""};

  let inx = {
    h:1 + getOrderIndex(target)%getStringCount(oldmap.row, "vh")
  };

  let maxcount = {
    row: getStringCount(oldmap.row, "vh")
  }
    
  for (let i = 1; i <= maxcount.row; i++) {
    newmap.row += ((i == inx.h) ? (scale + 'vh ') : ((100 - scale)/(maxcount.row - 1) + 'vh '));
  }
  
    if ((newmap.row == oldmap.row) && double_click) {
      cell_container_instance.style.gridTemplateRows = beforeopenmap.row;
      beforeopenmap.row = "";
    } else {
      cell_container_instance.style.gridTemplateRows = newmap.row;
      beforeopenmap = oldmap;
    }

    oldmap = newmap;

    cell.lastTriggered = target;
}
