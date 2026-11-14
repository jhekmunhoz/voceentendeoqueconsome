// Animações pontuais: a página continua utilizável sem suporte ou com movimento reduzido.
export function initMotion() {
  const preference=matchMedia('(prefers-reduced-motion:reduce)');
  if(preference.matches || !Element.prototype.animate)return;
  const running=new Set();
  function animate(node,frames,options) {
    if(!node || preference.matches)return;
    const animation=node.animate(frames,{fill:'backwards',...options});
    running.add(animation);
    animation.finished.catch(()=>{}).finally(()=>running.delete(animation));
    return animation;
  }
  const revealFrames=[{opacity:0,translate:'0 20px'},{opacity:1,translate:'0 0'}];
  if(document.querySelector('.carton')) {
    animate(document.querySelector('header .brand'),revealFrames,{duration:850,easing:'ease-out'});
    const headerItems=[...document.querySelectorAll('#navigation a,.tools>button')]
      .filter(node=>node.getClientRects().length>0);
    headerItems.forEach((item,index)=>{
      animate(item,[{opacity:0,translate:'0 -10px'},{opacity:1,translate:'0 0'}],{
        duration:700,delay:250+index*110,easing:'cubic-bezier(.2,.7,.25,1)',
      });
    });
    animate(document.querySelector('.lead'),revealFrames,{duration:1050,delay:180,easing:'ease-out'});
    const art=document.querySelector('.carton');
    animate(art,[
      {opacity:0,translate:'35px 14px',rotate:'6deg'},
      {opacity:1,translate:'0 0',rotate:'0deg'},
    ],{duration:1400,delay:220,easing:'cubic-bezier(.2,.7,.25,1)'});
    art.querySelectorAll('.pin').forEach((point,index)=>{
      animate(point,[
        {opacity:0,scale:'.8',offset:0},
        {opacity:1,scale:'1.12',offset:.6},
        {opacity:1,scale:'1',offset:1},
      ],{duration:650,delay:1100+index*180,easing:'ease-out'});
    });
    animate(document.querySelector('.exhibit>.annotation'),revealFrames,{
      duration:800,delay:1300,easing:'ease-out',
    });
    animate(document.querySelector('#hero-explore'),revealFrames,{
      duration:850,delay:1450,easing:'ease-out',
    });
    function endIntro() {
      art.getAnimations({subtree:true}).forEach(animation=>animation.cancel());
    }
    document.querySelector('#hero-previous').addEventListener('click',endIntro,{capture:true,once:true});
    document.querySelector('#hero-next').addEventListener('click',endIntro,{capture:true,once:true});
  }
  let observer;
  if('IntersectionObserver' in window) {
    const targets=document.querySelectorAll('#explorar .kicker,#explorar h2,#explorar .section-intro,#product-grid .product,.symbol-heading,.symbol-navigation,.symbol-card,.denominations-heading,.denominations-layout,.podcast-invite,.about>div');
    observer=new IntersectionObserver(entries=>{
      let order=0;
      for(const entry of entries) {
        if(!entry.isIntersecting)continue;
        observer.unobserve(entry.target);
        // Não esconder um elemento que já contém o foco do teclado.
        if(entry.target.contains(document.activeElement))continue;
        const symbol=entry.target.matches('.symbol-card');
        const index=symbol?[...entry.target.parentElement.children].indexOf(entry.target):order++;
        animate(entry.target,symbol?[
          {opacity:0,translate:'64px 0'},
          {opacity:1,translate:'0 0'},
        ]:revealFrames,{
          duration:symbol?900:440,
          delay:symbol?Math.min(index*150,600):Math.min(index*65,195),
          easing:'cubic-bezier(.2,.7,.25,1)',
        });
      }
    },{threshold:.08});
    targets.forEach(target=>observer.observe(target));
  }
  function focusVisible(event) {
    for(const animation of running) {
      const target=animation.effect?.target;
      if(target instanceof Element && target.contains(event.target))animation.cancel();
    }
  }
  document.addEventListener('focusin',focusVisible);
  function stop() {
    observer?.disconnect();
    running.forEach(animation=>animation.cancel());
    running.clear();
  }
  preference.addEventListener('change',event=>{if(event.matches)stop();});
  window.addEventListener('pagehide',()=>{
    stop();document.removeEventListener('focusin',focusVisible);
  },{once:true});
}
