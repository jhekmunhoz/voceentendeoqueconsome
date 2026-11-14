import { products, topics } from './data.js';
import { nutritionExplanation } from './nutrition.js';
import { initHero } from './hero.js';
import { faq } from './faq.js';
import { packagingSymbols } from './symbols.js';
import { renderSymbolDetails } from './symbol-details.js';
import { siteConfig } from './config.js';
import { researchContent } from './research.js';
import { readingSuggestions, readingForTopic } from './readings.js';
import { initMotion } from './motion.js';
import { initHeroBackground } from './hero-background.js';
import { initDenominations } from './denominations.js';
import { veterinaryRoleContent } from './veterinary-role.js';
const $ = selector => document.querySelector(selector);
const arrow = '<svg class="icon" aria-hidden="true"><use href="assets/icons.svg#arrow"/></svg>';
const panel = $('#panel');
const body = $('#panel-body');
const navigation = $('#navigation');
const menu = $('#menu');

function showPanel(title, content) {
  $('#panel-title').textContent = title;
  body.replaceChildren(content);
  if (!panel.open) panel.showModal();
  $('#panel-close').focus();
}
function element(tag, text, className) {
  const node = document.createElement(tag);
  node.textContent = text;
  if (className) node.className = className;
  return node;
}
function action(label, onClick, className = 'topic-link') {
  const button = element('button', label, className);
  if (className === 'topic-link') button.insertAdjacentHTML('beforeend', arrow);
  button.addEventListener('click', onClick);
  return button;
}
function showTopic(key, back, product) {
  const item = {...topics[key]};
  if(product && product.id!=='leite' && key==='nome')item.text='É o nome que identifica o alimento. Nesta prévia, a categoria é '+product.name.toLowerCase()+'.';
  const content = document.createDocumentFragment();
  if (back) content.append(action('← Voltar', back, 'back'));
  content.append(element('p', item.text), element('strong', 'Na prática'), element('p', item.tip));
  if(key==='tabela') content.append(nutritionExplanation());
  if (item.source) {
    const link = element('a', 'Consultar fonte oficial ↗', 'source');
    link.href = item.source;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    content.append(link);
  }
  content.append(readingSuggestions(readingForTopic(key)));
  showPanel(item.title, content);
}
function productImage(product) {
  const image = document.createElement('img');
  image.src = 'assets/images/embalagens/' + product.id + '.webp';
  image.alt = '';
  return image;
}
function showProduct(product) {
  location.assign('pages/explorar.html?produto='+product.id);
}
function showFaq(openIndex=-1) {
  const content=element('div','','faq-list');
  faq.forEach((item,index)=>{
    const details=document.createElement('details');
    const summary=element('summary',item.question);
    details.append(summary,element('p',item.answer));
    const sources=[...(item.source?[{agency:item.agency,source:item.source}]:[]),...(item.additionalSources||[])];
    sources.forEach(reference=>{
      const link=element('a','Fonte — '+reference.agency+' ↗','source');
      link.href=reference.source;link.target='_blank';link.rel='noopener noreferrer';details.append(link);
    });
    if(item.reading)details.append(readingSuggestions(item.reading));
    details.open=index===openIndex;
    content.append(details);
  });
  showPanel('Perguntas frequentes',content);
  if(openIndex>=0)content.children[openIndex].querySelector('summary').focus();
}
$('#faq-open').addEventListener('click',()=>showFaq());
$('#veterinary-open').addEventListener('click',()=>{
  showPanel('O médico-veterinário e os alimentos',veterinaryRoleContent());
  body.scrollTop=0;panel.scrollTop=0;
});
$('#research-open').addEventListener('click',()=>{
  showPanel('O que a nossa pesquisa revelou?',researchContent());
  body.scrollTop=0;panel.scrollTop=0;
});
for(const podcastLink of document.querySelectorAll('#podcast-open,[data-podcast-link]')) {
if(siteConfig.podcastUrl) {
  podcastLink.href=siteConfig.podcastUrl;
  podcastLink.target='_blank';podcastLink.rel='noopener noreferrer';
  podcastLink.setAttribute('aria-label','Podcast — abrir em nova aba');
  podcastLink.removeAttribute('aria-describedby');
} else {
  podcastLink.setAttribute('aria-haspopup','dialog');
  podcastLink.addEventListener('click',event=>{
    event.preventDefault();
    showPanel('Podcast · em breve',element('p','Nosso podcast sobre os rótulos dos alimentos está em preparação. O acesso aos episódios ficará disponível aqui assim que o link for informado.'));
  });
}
}
$('#podcast-availability').hidden=Boolean(siteConfig.podcastUrl);
for (const product of products) {
  const card = action('', () => showProduct(product), 'product');
  card.setAttribute('aria-label', 'Explorar ' + product.name);
  const pic = element('span', '', 'pic product-art art-' + product.id);
  pic.append(productImage(product));
  const foot = element('span', '', 'product-foot');
  const circle = element('span', '', 'round-arrow');
  circle.innerHTML = arrow;
  foot.append(element('strong', product.name), circle);
  card.append(pic, foot);
  $('#product-grid').append(card);
}
initHero(showTopic);
function showSymbol(item) {
  const content=document.createDocumentFragment();
  const img=document.createElement('img');
  img.src=item.image||'assets/references/simbolos/'+item.id+'.png';img.alt=item.alt;img.className='symbol-enlarged';
  const source=element('a','Consultar orientações — '+item.agency+' ↗','source');
  source.href=item.source;source.target='_blank';source.rel='noopener noreferrer';
  const details=renderSymbolDetails(item.id);
  if(details)content.append(details);
  else content.append(img);
  content.append(element('p',item.text),element('strong',item.id==='reciclagem'?'Na hora de descartar':'Na hora da compra'),element('p',item.tip),element('p',item.note,'symbol-note'),source);
  if(item.document) {
    const documentLink=element('a','Ver documento original da imagem ↗','source');
    documentLink.href=item.document;documentLink.target='_blank';documentLink.rel='noopener noreferrer';
    content.append(documentLink);
  }
  content.append(readingSuggestions(readingForTopic(item.id)));
  showPanel(item.title,content);
  body.scrollTop=0;panel.scrollTop=0;
}
for(const item of packagingSymbols) {
  const card=element('article','','symbol-card');
  const imageButton=action('',()=>showSymbol(item),'symbol-image');
  imageButton.setAttribute('aria-label','Ampliar e entender '+item.title);
  const img=document.createElement('img');img.src=item.image||'assets/references/simbolos/'+item.id+'.png';img.alt=item.alt;img.loading='lazy';img.width=item.width||(item.id==='sif'?212:item.id==='lupa'?270:580);img.height=item.height||(item.id==='sif'?235:item.id==='lupa'?70:195);
  imageButton.append(img,element('span','Ampliar imagem ↗'));
  card.append(imageButton,element('p',item.badge,'kicker'),element('h3',item.title),element('p',item.text),action('Entender este símbolo →',()=>showSymbol(item),'symbol-more'));
  $('#symbol-grid').append(card);
}
const symbolTrack=$('#symbol-grid');
const previousSymbol=$('#symbol-previous');
const nextSymbol=$('#symbol-next');
function updateSymbolNavigation() {
  previousSymbol.disabled=symbolTrack.scrollLeft<=2;
  nextSymbol.disabled=symbolTrack.scrollLeft+symbolTrack.clientWidth>=symbolTrack.scrollWidth-2;
}
function stepSymbol(direction) {
  const card=symbolTrack.firstElementChild;
  const gap=parseFloat(getComputedStyle(symbolTrack).columnGap)||0;
  symbolTrack.scrollBy({left:direction*(card.getBoundingClientRect().width+gap),behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth'});
}
previousSymbol.addEventListener('click',()=>stepSymbol(-1));
nextSymbol.addEventListener('click',()=>stepSymbol(1));
symbolTrack.addEventListener('scroll',updateSymbolNavigation,{passive:true});
symbolTrack.addEventListener('keydown',event=>{
  if(event.target!==symbolTrack || !['ArrowLeft','ArrowRight'].includes(event.key))return;
  event.preventDefault();stepSymbol(event.key==='ArrowRight'?1:-1);
});
new ResizeObserver(updateSymbolNavigation).observe(symbolTrack);
updateSymbolNavigation();
function showSearch(query = '') {
  const content = element('div', '');
  const label = element('label', 'Produto ou assunto');
  label.htmlFor = 'query';
  const input = document.createElement('input');
  input.type = 'search';
  input.id = 'query';
  input.placeholder = 'Ex.: validade, leite, ingredientes';
  input.value = query;
  const results = element('div', '');
  const status = element('p', '');
  status.setAttribute('role','status');
  const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
  function update() {
    const term = normalize(input.value);
    results.replaceChildren();
    for (const [key, topic] of Object.entries(topics)) {
      if (normalize(topic.title + ' ' + topic.text).includes(term)) {
        results.append(action(topic.title, () => showTopic(key, () => showSearch(input.value))));
      }
    }
    for (const p of products) {
      if (normalize(p.name).includes(term)) results.append(action(p.name, () => showProduct(p)));
    }
    faq.forEach((item,index)=>{
      if(normalize(item.question+' '+item.answer).includes(term))results.append(action(item.question,()=>showFaq(index)));
    });
    packagingSymbols.forEach(item=>{
      if(normalize(item.title+' '+item.text+' '+item.tip).includes(term))results.append(action(item.title,()=>showSymbol(item)));
    });
    status.textContent = results.children.length ? results.children.length + ' resultados' : 'Nenhum resultado. Tente outro assunto.';
  }
  content.append(label, input, status, results);
  input.addEventListener('input', update);
  update();
  showPanel('Buscar assuntos', content);
  input.focus();
}
$('#search-open').addEventListener('click', () => showSearch());

let scale = 0, contrast = false;
try {
  scale = Math.min(2, Math.max(0, Number(localStorage.getItem('leitura-tamanho')) || 0));
  contrast = localStorage.getItem('leitura-contraste') === 'true';
} catch { /* Preferências também funcionam quando o armazenamento está bloqueado. */ }
function applyPreferences() {
  const root = document.documentElement.classList;
  root.toggle('text-large', scale === 1);
  root.toggle('text-largest', scale === 2);
  root.toggle('contrast', contrast);
}
applyPreferences();
$('#access-open').addEventListener('click', () => {
  const content = element('div', '');
  const row = element('div', '', 'control-row');
  const size = element('span', '');
  size.setAttribute('role','status');
  function save() {
    applyPreferences();
    minus.disabled = scale === 0;
    plus.disabled = scale === 2;
    size.textContent = ['Padrão', 'Ampliada', 'Maior'][scale];
    toggle.setAttribute('aria-pressed', String(contrast));
    toggle.textContent = 'Alto contraste ' + (contrast ? 'ativado' : 'desativado');
    try {
      localStorage.setItem('leitura-tamanho', String(scale));
      localStorage.setItem('leitura-contraste', String(contrast));
    } catch { /* As escolhas permanecem ativas nesta página. */ }
  }
  const minus = action('A−', () => { scale--; save(); }, 'btn secondary');
  const plus = action('A+', () => { scale++; save(); }, 'btn secondary');
  minus.setAttribute('aria-label','Diminuir fonte');
  plus.setAttribute('aria-label','Aumentar fonte');
  const toggle = action('', () => { contrast = !contrast; save(); }, 'btn secondary');
  row.append(minus, size, plus);
  content.append(element('strong', 'Tamanho da fonte'), row, toggle);
  save();
  showPanel('Acessibilidade', content);
});
$('#panel-close').addEventListener('click', () => panel.close());
panel.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    event.preventDefault();
    event.stopPropagation();
    panel.close();
  }
});
panel.addEventListener('click', event => {
  const rect = panel.getBoundingClientRect();
  if (event.target === panel && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) panel.close();
});
function closeMenu() {
  navigation.classList.remove('open');
  menu.setAttribute('aria-expanded','false');
}
menu.addEventListener('click', () => menu.setAttribute('aria-expanded', String(navigation.classList.toggle('open'))));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navigation.classList.contains('open')) { closeMenu(); menu.focus(); }
});
navigation.addEventListener('click',closeMenu);
document.addEventListener('click',event=>{if(!navigation.contains(event.target)&&!menu.contains(event.target))closeMenu();});
matchMedia('(max-width:700px)').addEventListener('change',closeMenu);
const links = [...navigation.querySelectorAll('a')].filter(link=>link.hash && document.getElementById(link.hash.slice(1)));
function markSection() {
  const orderedLinks = [...links].sort((a,b)=>$(a.hash).offsetTop-$(b.hash).offsetTop);
  const last = orderedLinks.filter(link => $(link.hash).getBoundingClientRect().top <= window.innerHeight * .35).at(-1);
  const active = window.scrollY > 0 && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2 ? orderedLinks.at(-1) : last || orderedLinks[0];
  for (const link of links) {
    if (link === active) link.setAttribute('aria-current','location');
    else link.removeAttribute('aria-current');
  }
}
window.addEventListener('scroll',markSection,{passive:true});
markSection();
initDenominations();
initMotion();
initHeroBackground();
