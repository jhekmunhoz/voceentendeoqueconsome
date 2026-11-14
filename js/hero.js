import { products, topics } from './data.js';

export async function initHero(showTopic) {
  const scene=document.querySelector('.scene');
  const art=scene.querySelector('.carton');
  const image=art.querySelector('img');
  const link=document.querySelector('#hero-explore');
  const status=document.querySelector('#hero-status');
  const previous=document.querySelector('#hero-previous');
  const next=document.querySelector('#hero-next');
  let selected=0,displayed=0,request=0;
  let transition=null;
  const reducedMotion=matchMedia('(prefers-reduced-motion:reduce)');
  async function animateArt(frames,options) {
    if(reducedMotion.matches || !art.animate)return;
    transition=art.animate(frames,options);
    try {await transition.finished;} catch { /* Um novo clique assume a transição. */ }
  }
  const milk={
    image:image.getAttribute('src'),
    points:[{key:'nome',u:.75,v:.39},{key:'inspecao',u:.41,v:.76},{key:'volume',u:.7,v:.89}],
  };
  let previews;
  art.addEventListener('click',event=>{
    const point=event.target.closest('[data-topic]');
    if(point)showTopic(point.dataset.topic,undefined,products[displayed]);
  });
  async function move(delta) {
    transition?.cancel();
    selected=(selected+delta+products.length)%products.length;
    const index=selected,version=++request,product=products[index];
    const preview=index===0?milk:previews[product.id];
    scene.setAttribute('aria-busy','true');
    art.inert=true;
    try {
      const candidate=new Image();candidate.src=preview.image;await candidate.decode();
      if(version!==request)return;
      await animateArt([
        {opacity:1,translate:'0px 0px'},
        {opacity:0,translate:(-delta*32)+'px 0px'},
      ],{duration:130,easing:'ease-in',fill:'forwards'});
      if(version!==request)return;
      displayed=index;
      image.src=candidate.src;
      image.alt='Prévia ilustrativa de '+product.name.toLowerCase()+'.';
      image.width=index===0?733:800;image.height=index===0?1100:600;
      scene.classList.toggle('wide-preview',index!==0);
      scene.setAttribute('aria-label','Prévia de '+product.name.toLowerCase()+' com pontos educativos');
      art.querySelectorAll('.pin').forEach(point=>point.remove());
      for(const {key,u,v} of preview.points) {
        const button=document.createElement('button');button.className='pin';button.textContent='+';
        button.dataset.topic=key;button.setAttribute('aria-label','Explorar '+topics[key].title.toLowerCase());
        button.style.left=u*100+'%';button.style.top=v*100+'%';art.append(button);
      }
      link.href='pages/explorar.html?produto='+product.id;
      link.querySelector('span').textContent='Explorar '+product.name.toLowerCase();
      status.textContent=product.name+', produto '+(index+1)+' de '+products.length;
      transition?.cancel();
      await animateArt([
        {opacity:0,translate:(delta*40)+'px 0px'},
        {opacity:1,translate:'0px 0px'},
      ],{duration:240,easing:'cubic-bezier(.2,.7,.25,1)'});
    } catch {
      if(version===request){selected=displayed;status.textContent='Não foi possível carregar a prévia. Tente novamente.';}
    } finally {
      if(version===request){
        transition?.cancel();transition=null;
        art.inert=false;
        scene.setAttribute('aria-busy','false');
      }
    }
  }
  try {
    const response=await fetch(new URL('../assets/images/previas/positions.json',import.meta.url));
    if(!response.ok)throw new Error('Prévia indisponível');
    previews=await response.json();
    previous.disabled=false;next.disabled=false;
    previous.addEventListener('click',()=>move(-1));
    next.addEventListener('click',()=>move(1));
    scene.addEventListener('keydown',event=>{
      if(event.key==='ArrowLeft'||event.key==='ArrowRight'){
        event.preventDefault();move(event.key==='ArrowLeft'?-1:1);
      }
    });
  } catch {
    status.textContent='Use o catálogo abaixo para explorar as outras embalagens.';
  }
}
