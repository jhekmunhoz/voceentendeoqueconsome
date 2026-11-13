import { products, topics } from './data.js';

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
function showTopic(key, back) {
  const item = topics[key];
  const content = document.createDocumentFragment();
  if (back) content.append(action('← Voltar', back, 'back'));
  content.append(element('p', item.text), element('strong', 'Na prática'), element('p', item.tip));
  if (item.source) {
    const link = element('a', 'Consultar fonte oficial ↗', 'source');
    link.href = item.source;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    content.append(link);
  }
  showPanel(item.title, content);
}
function productImage(product) {
  const image = document.createElement('img');
  image.src = 'assets/images/' + product.id + '.webp';
  image.alt = '';
  return image;
}
function showProduct(product) {
  if (product.id === 'leite') {
    location.assign('pages/explorar.html?produto=leite');
    return;
  }
  const content = document.createDocumentFragment();
  const image = productImage(product);
  image.className = 'dialog-product';
  content.append(image, element('p', product.text + ' Escolha uma informação para explorar.'));
  for (const key of product.topics) {
    content.append(action(topics[key].title, () => showTopic(key, () => showProduct(product))));
  }
  showPanel(product.name, content);
}
for (const product of products) {
  const card = action('', () => showProduct(product), 'product');
  card.style.setProperty('--card', product.color);
  card.setAttribute('aria-label', 'Explorar ' + product.name);
  const pic = element('span', '', 'pic');
  pic.append(productImage(product));
  const foot = element('span', '', 'product-foot');
  const circle = element('span', '', 'round-arrow');
  circle.innerHTML = arrow;
  foot.append(element('strong', product.name), circle);
  card.append(pic, foot);
  $('#product-grid').append(card);
}
document.querySelectorAll('[data-topic]').forEach(button => {
  button.addEventListener('click', () => showTopic(button.dataset.topic));
});
for (const key of ['nome','validade','tabela']) {
  $('#topic-list').append(action(topics[key].title, () => showTopic(key)));
}
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
const links = [...navigation.querySelectorAll('a')];
function markSection() {
  const last = links.filter(link => $(link.hash).getBoundingClientRect().top <= window.innerHeight * .35).at(-1);
  const active = window.scrollY > 0 && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2 ? links.at(-1) : last || links[0];
  for (const link of links) {
    if (link === active) link.setAttribute('aria-current','location');
    else link.removeAttribute('aria-current');
  }
}
window.addEventListener('scroll',markSection,{passive:true});
markSection();
