export function initHeroBackground() {
  document.querySelectorAll('.hero,.research-card,.podcast-invite').forEach(initBackdrop);
}

function initBackdrop(hero) {
  const reduced=matchMedia('(prefers-reduced-motion:reduce)');
  const finePointer=matchMedia('(hover:hover) and (pointer:fine)');
  let visible=true,frame=0,position=null;
  function updatePlayback() {
    hero.dataset.backdropActive=String(visible && !document.hidden && !reduced.matches);
    if(reduced.matches)reset();
  }
  function reset() {
    cancelAnimationFrame(frame);frame=0;position=null;
    hero.style.removeProperty('--aura-x');hero.style.removeProperty('--aura-y');
  }
  function move(event) {
    if(reduced.matches || !finePointer.matches || event.pointerType!=='mouse')return;
    position={x:event.clientX,y:event.clientY};
    if(frame)return;
    frame=requestAnimationFrame(()=>{
      frame=0;
      const bounds=hero.getBoundingClientRect();
      hero.style.setProperty('--aura-x',((position.x-bounds.left)/bounds.width-.5)*32+'px');
      hero.style.setProperty('--aura-y',((position.y-bounds.top)/bounds.height-.5)*24+'px');
    });
  }
  hero.addEventListener('pointermove',move,{passive:true});
  hero.addEventListener('pointerleave',reset);
  document.addEventListener('visibilitychange',updatePlayback);
  reduced.addEventListener('change',updatePlayback);
  finePointer.addEventListener('change',reset);
  const observer='IntersectionObserver' in window?new IntersectionObserver(entries=>{
    visible=entries[0].isIntersecting;updatePlayback();
  }):null;
  observer?.observe(hero);
  updatePlayback();
  window.addEventListener('pageshow',event=>{
    if(!event.persisted)return;
    visible=true;observer?.observe(hero);
    document.addEventListener('visibilitychange',updatePlayback);
    updatePlayback();
  });
  window.addEventListener('pagehide',()=>{
    reset();observer?.disconnect();
    document.removeEventListener('visibilitychange',updatePlayback);
    hero.dataset.backdropActive='false';
  },{once:true});
}
