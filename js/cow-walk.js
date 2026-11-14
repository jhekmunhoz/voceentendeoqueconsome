export function initCowWalk() {
  const actions=document.querySelector('.hero .actions');
  const button=actions.querySelector('.btn');
  const duration=20000;
  const cow=document.createElement('span');
  cow.className='walking-cow';cow.setAttribute('aria-hidden','true');
  const leg=(name,x,y,far)=>'<g transform="translate('+x+' '+y+')" opacity="'+(far?'.75':'1')+'"><g class="cow-leg '+name+'"><path d="M-4-3H4L3 12H-3Z"/><g transform="translate(0 11)"><g class="cow-shin"><path d="M-3 0H3L2 9 6 11Q7 14 3 14H-5L-6 11-3 8Z"/></g></g></g></g>';
  cow.innerHTML='<svg class="cow-art" viewBox="0 0 128 88" aria-hidden="true" focusable="false">'+
    leg('rear-far',31,45,true)+leg('front-far',73,45,true)+
    '<path d="M22 24C33 18 53 22 66 23Q77 23 84 29L88 38 81 49Q70 57 50 54L32 52Q20 46 19 34Z"/>'+
    '<path d="M43 51Q51 63 62 53L59 62H56V58H51V63H48V58Z"/>'+
    '<path d="M21 27C11 31 18 46 10 57" fill="none" stroke="currentColor" stroke-width="2.5"/>'+
    '<path d="M10 54 14 64Q4 64 8 55Z"/>'+
    leg('rear-near',27,47,false)+leg('front-near',77,47,false)+
    '<path d="M73 27Q84 20 92 23L97 33 87 47 76 46Z"/>'+
    '<g transform="translate(96 27)"><g class="cow-head">'+
    '<path d="M-10-8 0-12 8-5 12 3 18 7Q21 10 18 13L12 15 6 11 0 8-6 14-12 4Z"/>'+
    '<path d="M0-10Q-7-18-2-23Q-2-16 6-11ZM6-7Q18-16 19-10L13-3Z"/>'+
    '</g></g></svg>';
  actions.append(cow);
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let motionEnabled=!reduced.matches;
  const control=document.createElement('button');
  control.type='button';control.className='cow-toggle';
  control.setAttribute('aria-label','Animação da vaquinha');
  actions.after(control);
  let animation=null,visible=true,articulation=[];
  function activity() {
    if(!animation)return;
    if(visible && !document.hidden)animation.play();else animation.pause();
    for(const part of articulation){if(visible && !document.hidden)part.play();else part.pause();}
    actions.classList.toggle('cow-paused',!visible || document.hidden);
  }
  function layout() {
    const elapsed=animation?.currentTime||0;
    animation?.cancel();animation=null;
    articulation.forEach(part=>part.cancel());articulation=[];
    const box=actions.getBoundingClientRect();
    const rect=button.getBoundingClientRect();
    const a={start:rect.left-box.left+7,end:Math.max(rect.left-box.left+7,rect.right-box.left-76),y:rect.top-box.top-38};
    cow.style.transform='translate('+a.start+'px,'+a.y+'px)';
    actions.classList.toggle('cow-still',!motionEnabled);
    control.textContent=motionEnabled?'Pausar vaquinha':'Animar vaquinha';
    control.setAttribute('aria-pressed',String(motionEnabled));
    if(!motionEnabled)return;
    const frame=(offset,x,facing)=>({offset,transform:'translate('+x+'px,'+a.y+'px) scaleX('+facing+')'});
    animation=cow.animate([
      frame(0,a.start,1),frame(.45,a.end,1),frame(.5,a.end,-1),
      frame(.95,a.start,-1),frame(1,a.start,1),
    ],{duration,iterations:Infinity,easing:'linear'});
    animation.currentTime=elapsed;
    const poses=Array.from({length:201},(_,i)=>{
      const t=i/200;
      const walking=t<.45 || (t>=.5 && t<.95);
      return {t,walking};
    });
    function animatePart(element,frames) {
      const part=element.animate(frames,{duration,iterations:Infinity,easing:'linear'});
      part.currentTime=elapsed;articulation.push(part);
    }
    cow.querySelectorAll('.cow-leg').forEach((element,index)=>{
      const phase=[.25,.75,0,.5][index];
      const angle=p=>p.walking?Math.sin((p.t/.065+phase)*Math.PI*2)*16:0;
      animatePart(element,poses.map(p=>({offset:p.t,transform:'rotate('+angle(p)+'deg)'})));
      animatePart(element.querySelector('.cow-shin'),poses.map(p=>({
        offset:p.t,transform:'rotate('+(p.walking?Math.max(0,Math.sin((p.t/.065+phase)*Math.PI*2))*22:0)+'deg)',
      })));
    });
    activity();
  }
  new ResizeObserver(layout).observe(actions);
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;activity();}).observe(actions);
  reduced.addEventListener('change',()=>{motionEnabled=!reduced.matches;layout();});
  control.addEventListener('click',()=>{motionEnabled=!motionEnabled;layout();});
  document.addEventListener('visibilitychange',activity);
  layout();
}
