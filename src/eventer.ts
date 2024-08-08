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


export function implement(target: any) {
  for (let eve of eves) {
    target[eve] = null;
  }
}
