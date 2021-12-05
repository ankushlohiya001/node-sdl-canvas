const eves = [
  "onclick",
  "ondblclick",
  "onmousedown",
  "onmouseup",
  "onmouseenter",
  "onmouseleave",
  "onmouseout",
  "onmouseover",
  "onmousemove",
  "onwheel",
  "ondrag",
  "onresize",
  "onkeydown",
  "onkeypress",
  "onkeyup",
  "onfocus",
  "onblur",
  "onhide",
  "onfullscreenchange",
  "onminimize",
  "onmaximize",
  "onshow",
  "onhide",
  "onexit"
];


function implement(target) {
  for (let eve of eves) {
    target[eve] = null;
  }
}

module.exports = implement;