let cell_tmp = {row: ""};
let oldmap = {row: ""};
let beforeopenmap = {row: ""};
let cell = {lastTriggered: null};

let cell_container = 'home-new';
let cell_container_instance;
let cell_set_instance;
let cell_size = "70";
let breakpoint = 992;
let cell_height_tmp = '26.67vh ';
let hero_cell_height;

let bg_highlight;
let descr1991;

function getStringCount(string, lookfor) {;
    return string.match(new RegExp(lookfor, 'g')).length
}

function getOrderIndex(node) {
    return Array.prototype.indexOf.call(node.parentNode.children, node);
  }

document.addEventListener("DOMContentLoaded", (event) => {

  hero_cell_height = toString(window.getComputedStyle(document.querySelector(`.home-new.v20`)).height/window.innerHeight * 100)+"vh ";

  cell_container_instance = document.querySelector(`.${cell_container}`);
  cell_set_instance = document.querySelectorAll(`.${cell_container} > *`);
  bg_highlight = cell_set_instance[0].querySelector('.hover-mask');
  descr1991 = cell_set_instance[0].querySelector('.new-home-p');

  if ((cell_tmp.row == "") && (window.innerWidth >= breakpoint)) {
    for (let i = 1; i <= getStringCount(window.getComputedStyle(cell_container_instance, null)["grid-template-rows"], "px"); i++) {
      cell_tmp.row += cell_height_tmp;
    }
    oldmap = cell_tmp;
    cell_container_instance.style.gridTemplateRows = oldmap.row;
  }
  
  cell_container_instance.addEventListener("mouseout", (e) => {
    if (window.innerWidth < breakpoint) return;

    cell_container_instance.style.gridTemplateRows = cell_tmp.row;
    cell.lastTriggered = null;
    expandCell(cell_set_instance[0], false, cell_size);
    bg_highlight.classList.remove("hide");
    descr1991.classList.remove("hidden");
  });

  cell_set_instance.forEach((item, index) => {
    if (window.innerWidth < breakpoint) return;

    item.addEventListener("mouseenter", (e) => {
        if (index == 0) {
          bg_highlight.classList.remove("hide");
          descr1991.classList.remove("hidden");
        } else {
          if (!bg_highlight.classList.contains("hide")) bg_highlight.classList.add("hide");
          if (!descr1991.classList.contains("hidden")) descr1991.classList.add("hidden");
        }
        expandCell(e.target, false, cell_size);
      });
    });

  expandCell(cell_set_instance[0], false, cell_size);
});

function expandCell(target, double_click = true, scale = "15") {
  if (window.innerWidth < breakpoint) return;

  if ((cell.lastTriggered == target) && !double_click) return;
  let maxc = getStringCount(window.getComputedStyle(cell_container_instance, null)["grid-template-rows"], "px");
  if (beforeopenmap.row == "") {
    for (let i = 1; i <= maxc; i++) {
      beforeopenmap.row += parseInt(hero_cell_height, 10)/maxc + 'vh ';
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
    newmap.row += ((i == inx.h) ? (scale + 'vh ') : ((parseInt(hero_cell_height, 10) - scale)/(maxcount.row - 1) + 'vh '));
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
