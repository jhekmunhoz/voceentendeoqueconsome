import { topics, products } from './data.js';
import { preparePackage } from './packages.js';
import { nutritionExplanation } from './nutrition.js';
import { learningPaths, getLesson } from './learning-guide.js';
import { readingSuggestions, readingForTopic } from './readings.js';

const $ = selector => document.querySelector(selector);
const readingScrollBehavior=()=>matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth';
let product, pack, faces, labels, illustration;
const previousProduct=$('#product-previous');
const nextProduct=$('#product-next');
let requestedProduct=0;
const stage = $('#stage');
const flat = $('#flat');
const pins = new Map();
const faceButtons = [];
let face = 0, zoom = 1, engine = null, attempt = 0, opener = null;
let pan={x:0,y:0},flatDrag=null;
let pinch=null;

try {
  const scale = Number(localStorage.getItem('leitura-tamanho'));
  document.documentElement.classList.toggle('text-large',scale===1);
  document.documentElement.classList.toggle('text-largest',scale===2);
  document.documentElement.classList.toggle('contrast',localStorage.getItem('leitura-contraste')==='true');
} catch { /* O leitor também funciona sem armazenamento. */ }

function button(text, run, host) {
  const b = document.createElement('button');
  b.textContent = text;
  b.addEventListener('click', () => run(b));
  host.append(b);
  return b;
}
function read(key, index, trigger) {
  opener = trigger;
  for(const [pointKey,marker] of pins)marker.classList.toggle('selected-point',pointKey===key);
  const topic = {...topics[key]};
  const lesson=getLesson(key,product);
  if(lesson.text)topic.text=lesson.text;
  if(lesson.tip)topic.tip=lesson.tip;
  $('#find-label').hidden=false;
  $('#find-instruction').textContent=lesson?.find||'Veja a área destacada da embalagem e procure '+topic.title.toLowerCase()+'.';
  $('#definition-label').textContent='2. Entenda';
  $('#practice-label').textContent='3. Use na compra';
  const enlargement=$('#label-enlargement');
  enlargement.width=labels[index].width; enlargement.height=labels[index].height;
  enlargement.getContext('2d').drawImage(labels[index],0,0);
  $('#detail-face').textContent = faces[index].name;
  $('#detail-title').textContent = lesson?.question||topic.title;
  $('#definition').textContent = topic.text;
  $('#tip').textContent = topic.tip;
  $('#nutrition-explanation').replaceChildren();
  if(key==='tabela') $('#nutrition-explanation').append(nutritionExplanation());
  $('#source').hidden = !topic.source;
  if (topic.source) $('#source').href = topic.source;
  $('#topic-reading').replaceChildren(readingSuggestions(readingForTopic(key)));
  const mobile=matchMedia('(max-width:700px)').matches;
  // No celular, a resposta vem depois das perguntas: abrir não desloca a opção tocada.
  if(mobile)$('#topic-buttons').after($('#detail'));
  else $('#learning-title').before($('#detail'));
  $('#detail').hidden = false;
  $('#detail').focus({preventScroll:true});
  if(mobile)requestAnimationFrame(()=>$('#detail').scrollIntoView({block:'start',behavior:readingScrollBehavior()}));
}
function project(visible, index) {
  if(index!==null)face = index;
  faceButtons.forEach((b,i) => b.setAttribute('aria-pressed', String(i===index)));
  const spaced=[];
  for(const point of visible) {
    if(point.x<22 || point.x>stage.clientWidth-22 || point.y<22 || point.y>stage.clientHeight-22)continue;
    if(point.x>stage.clientWidth-82 && Math.abs(point.y-stage.clientHeight/2)<145)continue;
    const overlaps=spaced.some(other=>Math.abs(point.x-other.x)<46 && Math.abs(point.y-other.y)<46);
    if(!overlaps)spaced.push(point);
  }
  const active = new Set(spaced.map(point => point.key));
  for (const [key,b] of pins) b.hidden = !active.has(key);
  for (const {key,x,y} of spaced) {
    const b = pins.get(key);
    b.style.left = x+'px';
    b.style.top = y+'px';
  }
}
function drawFlat() {
  if (engine) return;
  const label = flat.querySelector('canvas');
  const context=label.getContext('2d');
  if(pack.flatViews) {
    const view=pack.flatViews[face];
    const ratio=view.image.width/view.image.height;
    const width=Math.min(stage.clientWidth*.96,stage.clientHeight*ratio)*zoom;
    const height=width/ratio;
    pan.x=Math.max(-Math.max(0,(width-stage.clientWidth)/2),Math.min(Math.max(0,(width-stage.clientWidth)/2),pan.x));
    pan.y=Math.max(-Math.max(0,(height-stage.clientHeight)/2),Math.min(Math.max(0,(height-stage.clientHeight)/2),pan.y));
    flat.style.width=width+'px';flat.style.height=height+'px';
    flat.style.left=(stage.clientWidth/2+pan.x)+'px';flat.style.top=(stage.clientHeight/2+pan.y)+'px';
    label.style.touchAction=zoom>1?'none':'pan-y pinch-zoom';
    label.style.cursor=zoom>1?'grab':'default';
    flat.style.maxWidth='none';
    const moveX=width>stage.clientWidth+1,moveY=height>stage.clientHeight+1;
    const instruction=zoom<=1
      ? 'Vista 2D. Arraste a barra vertical no canto da imagem para ampliar ou use dois dedos sobre a embalagem.'
      : moveX && moveY
      ? 'Vista 2D ampliada. Arraste a imagem para explorar os detalhes. Use a barra vertical para ajustar o zoom ou ↺ para restaurar.'
      : moveX
      ? 'Vista 2D ampliada. Arraste para os lados. Para mover também na vertical, amplie mais usando a barra ou dois dedos.'
      : moveY
      ? 'Vista 2D ampliada. Arraste para cima e para baixo. Para mover também para os lados, amplie mais.'
      : 'Vista 2D. A imagem ainda cabe na área. Amplie mais com a barra vertical ou dois dedos para poder arrastá-la.';
    const status=$('#status');
    status.textContent=(status.dataset.fallback?status.dataset.fallback+' ':'')+instruction;
    label.width=view.image.width;label.height=view.image.height;
    context.drawImage(view.image,0,0);
    project(view.points.map(({key,u,v})=>({
      key,x:(stage.clientWidth-width)/2+pan.x+u*width,y:(stage.clientHeight-height)/2+pan.y+v*height,
    })),face);
    return;
  }
  label.width=labels[face].width;label.height=labels[face].height;
  context.drawImage(labels[face],0,0);
  if(product.id!=='leite' && face===0) {
    context.fillStyle=getComputedStyle(document.documentElement).getPropertyValue('--cream');
    label.width=512;label.height=512;
    context.fillStyle=getComputedStyle(document.documentElement).getPropertyValue('--cream');
    context.fillRect(0,0,512,512);
    const factor=Math.min(460/illustration.width,275/illustration.height);
    const w=illustration.width*factor,h=illustration.height*factor;
    context.drawImage(illustration,(512-w)/2,(300-h)/2,w,h);
    const stripHeight=512*pack.size[1]*.4/pack.size[0];
    context.drawImage(labels[face],0,512-stripHeight,512,stripHeight);
  }
  const w = flat.offsetWidth, h = flat.offsetHeight;
  const frontRatio=product.id==='leite'?1:pack.size[1]*.4/pack.size[0];
  project(faces[face].points.map(([key,u,v]) => ({
    key,x:stage.clientWidth*.5+(u-.5)*w,y:stage.clientHeight*.56+((product.id!=='leite' && face===0 ? 1-frontRatio+v*frontRatio : v)-.5)*h,
  })),face);
}
function orient(index) {
  face = index;
  if (engine) engine.face(index);
  else drawFlat();
}
function buildControls() {
$('#learning-title').textContent='O que você quer descobrir?';
$('#learning-intro').hidden=false;
$('#topic-buttons').classList.add('learning-paths');
const destinations=new Map();
faces.forEach((side,index) => {
  faceButtons.push(button(side.name, () => orient(index), $('#faces')));
  for (const [key] of side.points) {
    const marker = button('', b => read(key,index,b), $('#markers'));
    marker.className='point';
    marker.setAttribute('aria-label',topics[key].title+' — '+side.name);
    pins.set(key,marker);
    if(!destinations.has(key))destinations.set(key,index);
  }
});
learningPaths.forEach(path=>{
  const available=path.keys.filter(key=>destinations.has(key));
  if(!available.length)return;
  const group=document.createElement('details');
  const summary=document.createElement('summary');
  const title=document.createElement('span');title.textContent=path.title;
  const hint=document.createElement('small');hint.textContent=path.hint;
  summary.append(title,hint);group.append(summary);
  available.forEach(key=>{
    const index=destinations.get(key);
    const item=button(getLesson(key,product).question||topics[key].title,b=>{orient(index);read(key,index,b);},group);
    item.className='lesson-link';
  });
  $('#topic-buttons').append(group);
});
}
function closeDetail() {
  $('#detail').hidden=true;
  for(const marker of pins.values())marker.classList.remove('selected-point');
  const target=opener && opener.isConnected && !opener.hidden ? opener : faceButtons[face];
  target.focus({preventScroll:true});
  if(matchMedia('(max-width:700px)').matches)target.scrollIntoView({block:'center',behavior:readingScrollBehavior()});
}
$('#dismiss').addEventListener('click',closeDetail);
$('#detail').addEventListener('keydown', e => { if (e.key==='Escape') closeDetail(); });
function setZoom(value) {
  const min = engine ? .85 : .75;
  const max = 3;
  zoom=Math.max(min,Math.min(max,Math.round(value*100)/100));
  $('#scale').textContent=Math.round(zoom*100)+'%';
  const slider=$('#zoom-range');
  slider.min=Math.round(min*100);slider.max=Math.round(max*100);
  slider.value=Math.round(zoom*100);
  slider.setAttribute('aria-valuetext',Math.round(zoom*100)+'%');
  if(engine)engine.zoom(zoom);
  else drawFlat();
}
$('#zoom-range').addEventListener('input',event=>setZoom(Number(event.target.value)/100));
$('#reset-zoom').addEventListener('click',()=>{pan={x:0,y:0};setZoom(1);});
const flatCanvas=flat.querySelector('canvas');
flatCanvas.addEventListener('pointerdown',event=>{
  if(engine || pinch || zoom<=1 || !event.isPrimary || event.button!==0)return;
  flatDrag={id:event.pointerId,x:event.clientX,y:event.clientY};
  flatCanvas.setPointerCapture(event.pointerId);
});
flatCanvas.addEventListener('pointermove',event=>{
  if(pinch || flatDrag?.id!==event.pointerId)return;
  pan.x+=event.clientX-flatDrag.x;pan.y+=event.clientY-flatDrag.y;
  flatDrag.x=event.clientX;flatDrag.y=event.clientY;
  drawFlat();
});
function stopFlatDrag(){flatDrag=null;}
flatCanvas.addEventListener('pointerup',stopFlatDrag);
flatCanvas.addEventListener('pointercancel',stopFlatDrag);
flatCanvas.addEventListener('lostpointercapture',stopFlatDrag);
function touchDistance(touches) {
  return Math.hypot(touches[0].clientX-touches[1].clientX,touches[0].clientY-touches[1].clientY);
}
flatCanvas.addEventListener('touchstart',event=>{
  if(engine || event.touches.length!==2)return;
  event.preventDefault();flatDrag=null;
  pinch={distance:touchDistance(event.touches),zoom};
},{passive:false});
flatCanvas.addEventListener('touchmove',event=>{
  if(engine || !pinch || event.touches.length!==2)return;
  event.preventDefault();
  if(pinch.distance>0)setZoom(pinch.zoom*touchDistance(event.touches)/pinch.distance);
},{passive:false});
flatCanvas.addEventListener('touchend',event=>{if(event.touches.length<2)pinch=null;});
flatCanvas.addEventListener('touchcancel',()=>{pinch=null;flatDrag=null;});
function useFlat(message='') {
  attempt++;
  engine?.dispose(); engine=null;
  flat.hidden=false; $('#zoom').hidden=false;
  pan={x:0,y:0};flatDrag=null;pinch=null;
  $('#mode3').disabled=false;
  $('#mode2').disabled=false;
  $('#mode2').setAttribute('aria-pressed','true');
  $('#mode3').setAttribute('aria-pressed','false');
  $('#status').textContent=message;
  $('#status').dataset.fallback=message;
  setZoom(1);
}
$('#mode2').addEventListener('click',() => useFlat());
$('#mode3').addEventListener('click',async () => {
  if (engine) return;
  const request = ++attempt;
  $('#mode3').disabled=true;
  $('#mode2').disabled=true;
  $('#status').textContent='Carregando a embalagem em 3D…';
  try {
    const {createViewer} = await import('./viewer3d.js');
    if (request!==attempt) return;
    const nextEngine=await createViewer($('#space'),pack,project,() => useFlat('A visualização 3D foi interrompida. Continue explorando em 2D.'));
    if(request!==attempt){nextEngine.dispose();return;}
    engine=nextEngine;
    engine.face(face); setZoom(1);
    flat.hidden=true; $('#zoom').hidden=false;
    $('#mode2').setAttribute('aria-pressed','false');
    $('#mode3').setAttribute('aria-pressed','true');
    $('#mode3').disabled=false;
    $('#mode2').disabled=false;
    $('#status').textContent='Arraste em qualquer direção para girar. Os pontos aparecem nas superfícies visíveis. Para rolar a página, deslize fora da embalagem.';
  } catch {
    if (request===attempt) useFlat('O 3D está indisponível neste dispositivo. Todas as informações estão na vista 2D.');
  }
});
new ResizeObserver(() => {if(pack) drawFlat();}).observe(stage);
window.addEventListener('pagehide', () => {
  attempt++;
  engine?.dispose();
  engine=null;
});
window.addEventListener('pageshow',event=>{
  if(!event.persisted)return;
  if(pack)useFlat('Você voltou à embalagem. Continue em 2D ou abra o 3D novamente.');
  else selectProduct(new URLSearchParams(location.search).get('produto')||'leite');
});
async function selectProduct(id) {
  $('#retry-package')?.remove();
  const current=++attempt;
  engine?.dispose();engine=null;
  $('#detail').hidden=true;
  $('#status').textContent='Carregando embalagem…';
  $('#mode3').disabled=true;
  $('#mode2').disabled=true;
  const next=products.find(p=>p.id===id)||products[0];
  let nextPack,image;
  try {
    nextPack=await preparePackage(next);
    image=new Image();image.src=new URL('../assets/images/'+next.id+'.webp',import.meta.url).href;
    await image.decode();
  } catch {
    if(current!==attempt)return;
    const message='Não foi possível carregar esta embalagem. Confira sua conexão e tente novamente.';
    if(pack)useFlat(message+' A embalagem anterior continua disponível.');
    else $('#status').textContent=message;
    const retry=document.createElement('button');retry.id='retry-package';retry.className='btn secondary';retry.textContent='Tentar novamente';
    retry.addEventListener('click',()=>selectProduct(next.id));$('#status').after(retry);
    previousProduct.disabled=false;nextProduct.disabled=false;
    return;
  }
  if(current!==attempt)return;
  product=next;pack=nextPack;faces=pack.faces;labels=pack.labels;illustration=image;
  requestedProduct=products.findIndex(item=>item.id===product.id);
  $('#current-product').textContent=product.name;
  previousProduct.disabled=false;nextProduct.disabled=false;
  face=0;
  pins.clear();faceButtons.length=0;
  $('#markers').replaceChildren();$('#faces').replaceChildren();$('#topic-buttons').replaceChildren();
  flat.style.aspectRatio=product.id==='leite'?'360/650':'1';
  flat.style.width='';flat.style.height='';flat.style.top='';
  flat.querySelector('.fold').hidden=product.id!=='leite';
  document.title=pack.title+' | Você entende o que consome?';
  $('#milk-reference').hidden=product.id!=='leite';
  buildControls();useFlat();
  const url=new URL(location.href);url.searchParams.set('produto',product.id);history.replaceState(null,'',url);
}
function stepProduct(direction) {
  requestedProduct=(requestedProduct+direction+products.length)%products.length;
  selectProduct(products[requestedProduct].id);
}
previousProduct.addEventListener('click',()=>stepProduct(-1));
nextProduct.addEventListener('click',()=>stepProduct(1));
await selectProduct(new URLSearchParams(location.search).get('produto')||'leite');
$('#reference-readings').append(readingSuggestions(['rotulagem','lupa','inspecao','validade','alergenicos']));
