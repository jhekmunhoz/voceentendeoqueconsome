import { topics } from './data.js';
import { faces, makeLabel } from './milk.js';

const $ = selector => document.querySelector(selector);
const labels = faces.map((_, index) => makeLabel(index));
const stage = $('#stage');
const flat = $('#flat');
const pins = new Map();
const faceButtons = [];
let face = 0, zoom = 1, engine = null, attempt = 0, opener = null;

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
  const topic = topics[key];
  $('#detail-face').textContent = faces[index].name;
  $('#detail-title').textContent = topic.title;
  $('#definition').textContent = topic.text;
  $('#tip').textContent = topic.tip;
  $('#source').hidden = !topic.source;
  if (topic.source) $('#source').href = topic.source;
  $('#detail').hidden = false;
  $('#detail').focus();
}
function project(visible, index) {
  face = index;
  faceButtons.forEach((b,i) => b.setAttribute('aria-pressed', String(i===index)));
  const active = new Set(visible.map(point => point.key));
  for (const [key,b] of pins) b.hidden = !active.has(key);
  for (const {key,x,y} of visible) {
    const b = pins.get(key);
    b.style.left = x+'px';
    b.style.top = y+'px';
  }
}
function drawFlat() {
  if (engine) return;
  const label = flat.querySelector('canvas');
  label.getContext('2d').drawImage(labels[face],0,0);
  const w = flat.offsetWidth, h = flat.offsetHeight;
  project(faces[face].points.map(([key,u,v]) => ({
    key,x:stage.clientWidth*.5+(u-.5)*w,y:stage.clientHeight*.56+(v-.5)*h,
  })),face);
}
function orient(index) {
  face = index;
  if (engine) engine.face(index);
  else drawFlat();
}
faces.forEach((side,index) => {
  faceButtons.push(button(side.name, () => orient(index), $('#faces')));
  for (const [key] of side.points) {
    const marker = button('', b => read(key,index,b), $('#markers'));
    marker.className='point';
    marker.setAttribute('aria-label',topics[key].title+' — '+side.name);
    pins.set(key,marker);
    const item = button(topics[key].title, b => {orient(index); read(key,index,b);}, $('#topic-buttons'));
    item.className='topic-link';
  }
});
function closeDetail() {
  $('#detail').hidden=true;
  if (opener && !opener.hidden) opener.focus();
  else faceButtons[face].focus();
}
$('#dismiss').addEventListener('click',closeDetail);
$('#detail').addEventListener('keydown', e => { if (e.key==='Escape') closeDetail(); });
function setZoom(value) {
  zoom=Math.max(.85,Math.min(1.15,Math.round(value*100)/100));
  $('#scale').textContent=Math.round(zoom*100)+'%';
  $('#near').disabled=zoom>=1.15; $('#away').disabled=zoom<=.85;
  engine?.zoom(zoom);
}
$('#away').addEventListener('click',() => setZoom(zoom-.15));
$('#near').addEventListener('click',() => setZoom(zoom+.15));
function useFlat(message='Vista 2D. Use os botões para virar a caixa.') {
  attempt++;
  engine?.dispose(); engine=null;
  flat.hidden=false; $('#zoom').hidden=true;
  $('#mode3').disabled=false;
  $('#mode2').setAttribute('aria-pressed','true');
  $('#mode3').setAttribute('aria-pressed','false');
  $('#status').textContent=message;
  drawFlat();
}
$('#mode2').addEventListener('click',() => useFlat());
$('#mode3').addEventListener('click',async () => {
  if (engine) return;
  const request = ++attempt;
  $('#mode3').disabled=true;
  $('#status').textContent='Carregando a caixa em 3D…';
  try {
    const {createViewer} = await import('./viewer3d.js');
    if (request!==attempt) return;
    engine=createViewer($('#space'),labels,project,() => useFlat('A visualização 3D foi interrompida. Continue explorando em 2D.'));
    engine.face(face); setZoom(1);
    flat.hidden=true; $('#zoom').hidden=false;
    $('#mode2').setAttribute('aria-pressed','false');
    $('#mode3').setAttribute('aria-pressed','true');
    $('#mode3').disabled=false;
    $('#status').textContent='Vista 3D. Arraste para os lados ou escolha uma face.';
  } catch {
    if (request===attempt) useFlat('O 3D está indisponível neste dispositivo. Todas as informações estão na vista 2D.');
  }
});
new ResizeObserver(drawFlat).observe(stage);
window.addEventListener('pagehide', () => useFlat());
drawFlat();
