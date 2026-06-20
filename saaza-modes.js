/* ============================================================
   SAAZA display modes — shared toggle logic.
   - Three modes: default (untouched), sunlight, nvg.
   - Choice persists in localStorage across the whole origin, so
     switching on one tool carries to the others.
   - DEFAULT IS NEVER AUTO-OVERRIDDEN: no prefers-color-scheme,
     no system detection. The default theme shows until the user
     explicitly picks a mode.
   - The toggle is mounted on <html> (outside <body>) so the page
     recolor filter (applied to <body>) never inverts or unpins it.
   ============================================================ */
(function(){
  var KEY="saaza_theme_v1";
  var THEMES=["default","sunlight","nvg"];
  var LABELS={ "default":"Default", "sunlight":"\u2600 Sun", "nvg":"NVG" };
  var TITLES={ "default":"Default view", "sunlight":"Sunlight / high-contrast", "nvg":"Low-light / NVG-considerate (also lower your screen brightness)" };

  function get(){
    try{ var v=localStorage.getItem(KEY); return THEMES.indexOf(v)>=0 ? v : "default"; }
    catch(e){ return "default"; }
  }
  function apply(t){
    if(t==="default") document.documentElement.removeAttribute("data-theme");
    else document.documentElement.setAttribute("data-theme", t);
  }
  var box=null;
  function paint(){
    if(!box) return;
    var cur=get();
    [].forEach.call(box.querySelectorAll("button"), function(b){
      b.classList.toggle("on", b.getAttribute("data-t")===cur);
    });
  }
  function set(t){
    try{ localStorage.setItem(KEY, t); }catch(e){}
    apply(t); paint();
  }
  function build(){
    if(document.getElementById("saaza-mode")) return;
    box=document.createElement("div");
    box.id="saaza-mode";
    box.setAttribute("role","group");
    box.setAttribute("aria-label","Display mode");
    THEMES.forEach(function(t){
      var b=document.createElement("button");
      b.type="button";
      b.setAttribute("data-t", t);
      b.textContent=LABELS[t];
      b.title=TITLES[t];
      b.addEventListener("click", function(){ set(t); });
      box.appendChild(b);
    });
    document.documentElement.appendChild(box);
    paint();
  }

  apply(get());           /* apply saved theme as early as the script runs */
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded", build);
  else build();
})();
