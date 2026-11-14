import { typeExamples } from './denominations-guide.js';
import { denominations, denominationGroups, typeExplanation, denominationSources } from './denominations-data.js';
import { readingSuggestions } from './readings.js';

export function initDenominations() {
  const root=document.querySelector('#denominacoes');
  if(!root)return;
  const search=root.querySelector('#denomination-search');
  const filters=root.querySelector('#denomination-filters');
  const results=root.querySelector('#denomination-results');
  const status=root.querySelector('#denomination-status');
  const more=root.querySelector('#denomination-more');
  const detail=root.querySelector('#denomination-detail');
  let group='all',limit=6,selected=denominations[0].id;
  const normalize=text=>text.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
  function node(tag,text,className) {
    const element=document.createElement(tag);element.textContent=text;
    if(className)element.className=className;
    return element;
  }
  function external(label,url) {
    const link=node('a',label+' ↗','source');link.href=url;link.target='_blank';link.rel='noopener noreferrer';return link;
  }
  const kinds={produto:'Produto',familia:'Família de produtos',ingrediente:'Ingrediente',apresentacao:'Apresentação',processo:'Processamento',classificacao:'Classificação','origem-variavel':'Pode ter origem animal?','receita-variavel':'Receita variável'};
  function renderDetail(item,focus=false) {
    selected=item.id;
    detail.replaceChildren();
    const category=denominationGroups.find(category=>category.id===item.group);
    const badge=node('p',category.name,'kicker');
    const title=node('h3',item.name);title.id='denomination-selected-title';
    const sample=node('div','','denomination-example');
    sample.append(node('small',kinds[item.kind||'produto']),node('small',item.kind&&item.kind!=='produto'?'Confira como este termo é usado no rótulo.':'O nome do alimento ajuda a identificar o que você está comprando.'));
    const meaning=node('div','','denomination-meaning');
    meaning.append(node('h4','O que esse nome significa?'),node('p',item.definition));
    const practical=node('div','','denomination-practical');
    practical.append(node('h4','Na hora de escolher'),node('p',item.tip));
    const sources=document.createElement('details');sources.className='denomination-sources';
    sources.append(node('summary','Fontes e leitura complementar'),external('Consultar referência oficial ou técnica',item.source),external('MAPA — regulamentos e atualizações',denominationSources.legislation),readingSuggestions(item.group==='leite'?'rotulagem':item.group==='carnes'?'inspecao':item.group==='variavel'||item.group==='ingredientes'||item.group==='compostos'?'rotulagem':'rastreabilidade'));
    if(item.source.includes('efsa.')||item.source.includes('nih.gov'))sources.append(node('p','Referência técnica internacional sobre a substância e sua origem. As regras de uso em alimentos no Brasil devem ser consultadas na Anvisa.','denomination-attribution'));
    if(item.fromGuide)sources.append(node('p','Seleção adaptada do guia de estudo fornecido pela equipe. Resumo educativo sujeito à revisão antes da publicação.','denomination-attribution'));
    const back=node('button','↑ Escolher outro alimento','denomination-back');back.type='button';
    const scrollBehavior=()=>matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth';
    back.addEventListener('click',()=>{search.focus({preventScroll:true});search.scrollIntoView({block:'center',behavior:scrollBehavior()});});
    const step=node('p','', 'denomination-step');step.append(node('span','3'),document.createTextNode(' Entenda e leve para a compra'));
    detail.append(step,badge,title,sample,meaning,practical,sources,back);
    for(const button of results.querySelectorAll('button')){button.setAttribute('aria-pressed',String(button.dataset.id===selected));button.querySelector('.denomination-option-arrow').textContent=button.dataset.id===selected?'✓':'→';}
    if(focus) {
      detail.focus({preventScroll:true});
      if(matchMedia('(max-width:800px)').matches)detail.scrollIntoView({block:'start',behavior:scrollBehavior()});
    }
  }
  function update() {
    const term=normalize(search.value);
    const category=denominationGroups.find(item=>item.id===group);
    root.querySelector('#denomination-category-label').textContent=category?.name||'Todos os temas';
    const help={variavel:'Estes ingredientes podem ter origem animal ou outra origem. Pode ser necessário consultar o fabricante.',compostos:'A presença de ingredientes de origem animal depende da receita. Confira a lista de ingredientes.',processos:'Estes termos explicam como o alimento foi produzido ou conservado.',ingredientes:'Reconheça ingredientes obtidos de animais e seus derivados.'};
    root.querySelector('#denomination-category-help').textContent=help[group]||(category?'Veja os nomes de '+category.name.toLowerCase()+'. Selecione um para entender.':'Busque um nome ou escolha uma categoria para começar.');
    const matches=denominations.filter(item=>(group==='all'||item.group===group)&&normalize(item.name+' '+item.aliases+' '+item.definition).includes(term));
    results.replaceChildren();
    for(const item of matches.slice(0,limit)) {
      const button=node('button','','denomination-option');button.type='button';button.dataset.id=item.id;
      button.setAttribute('aria-pressed',String(selected===item.id));button.setAttribute('aria-controls','denomination-detail');
      const label=node('span','','denomination-option-label');label.append(node('strong',item.name),node('small',kinds[item.kind||'produto']));
      button.append(label,node('span',selected===item.id?'✓':'→','denomination-option-arrow'));
      button.lastChild.setAttribute('aria-hidden','true');
      button.addEventListener('click',()=>renderDetail(item,true));results.append(button);
    }
    status.textContent=matches.length?'Mostrando '+Math.min(limit,matches.length)+' de '+matches.length+' nomes e termos.':'Ainda não encontramos esse nome neste catálogo. Tente outra palavra ou categoria.';
    more.hidden=matches.length<=limit;
    for(const button of filters.querySelectorAll('button'))button.setAttribute('aria-pressed',String(button.dataset.group===group));
  }
  for(const category of [{id:'all',name:'Todos'},...denominationGroups]) {
    const button=node('button',category.name);button.type='button';button.dataset.group=category.id;
    button.setAttribute('aria-controls','denomination-results');
    button.addEventListener('click',()=>{group=category.id;limit=6;search.value='';update();root.querySelector('.denomination-categories').open=false;});filters.append(button);
  }
  search.addEventListener('input',()=>{limit=6;update();});
  more.addEventListener('click',()=>{
    const previousCount=results.childElementCount;limit+=6;update();
    const next=results.children[previousCount];
    next?.focus({preventScroll:true});
    next?.scrollIntoView({block:'nearest',behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth'});
  });
  const type=root.querySelector('#type-explanation');
  type.append(node('p',typeExplanation.text),node('p',typeExplanation.tip),external(typeExplanation.sourceLabel,typeExplanation.source));
  const examples=node('div','','type-examples');
  for(const [title,text] of typeExamples){const example=node('div','','type-example');example.append(node('strong',title),node('p',text));examples.append(example);}
  type.append(examples);
  update();renderDetail(denominations[0]);
}
