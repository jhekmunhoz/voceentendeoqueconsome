export const symbolDetails = {
  lupa: {
    title:'Uma lupa, diferentes apresentações',
    intro:'A lupa informa alto teor de açúcares adicionados, gordura saturada ou sódio, conforme os critérios aplicáveis. Pode destacar um, dois ou os três nutrientes. A organização horizontal, vertical ou combinada muda para se ajustar ao rótulo; a mensagem é o nutriente escrito, não o formato do bloco.',
    items:[
      ['Um nutriente · horizontal','Neste exemplo, o aviso é para açúcar adicionado. Também pode haver aviso individual para sódio ou gordura saturada.','image','lupa.png'],
      ['Um nutriente · vertical','O mesmo alerta pode aparecer com o texto abaixo da lupa. Leia o nutriente indicado.','image','lupa-um-vertical.png'],
      ['Dois nutrientes · horizontal','Este exemplo reúne açúcar adicionado e gordura saturada. A combinação depende da composição do alimento.','image','lupa-dois-horizontal.png'],
      ['Dois nutrientes · vertical','Os dois alertas aparecem empilhados, mantendo a identificação de cada nutriente.','image','lupa-dois-vertical.png'],
      ['Três nutrientes · horizontal','Açúcar adicionado, gordura saturada e sódio aparecem lado a lado.','image','lupa-tres-horizontal.png'],
      ['Três nutrientes · vertical','Os três nutrientes são apresentados um abaixo do outro.','image','lupa-tres-vertical.png'],
      ['Apresentação combinada','O modelo combina linhas e colunas. Continua sendo um alerta para os mesmos três nutrientes.','image','lupa-tres-combinada.png'],
    ],
    sources:[['Anvisa — modelos oficiais da rotulagem frontal','assets/references/simbolos/lupa-anvisa.pdf'],['Anvisa — orientações sobre rotulagem nutricional','https://www.gov.br/anvisa/pt-br/assuntos/alimentos/rotulagem/rotulagem-nutricional']],
  },
  sif: {
    title:'Reconheça o serviço de inspeção',
    intro:'SIF, SIE e SIM identificam serviços em diferentes esferas de atuação. Os modelos estaduais e municipais variam. As imagens abaixo vieram de documentos oficiais e seus campos “000” são demonstrativos, sem certificar qualquer embalagem deste projeto.',
    items:[
      ['SIF · federal','Serviço de Inspeção Federal, do MAPA. A imagem mostra um modelo circular usado na identificação de produtos sob inspeção federal.','image','sif.png'],
      ['SIE · exemplo de Santa Catarina','Serviço de Inspeção Estadual. Aqui aparece o modelo divulgado pela Cidasc. No Paraná, o serviço estadual é o SIP/POA da Adapar; o desenho pode ser diferente.','image','sie.png'],
      ['SIM · exemplo de Londrina','Serviço de Inspeção Municipal. O modelo de Londrina tem formato hexagonal. Outros municípios podem adotar formatos diferentes.','image','sim.png'],
      ['E quando o produto é exportado?','O SIF também participa da identificação e certificação de produtos destinados à exportação. Esta imagem é um modelo de SIF, não um selo exclusivo de exportação. As exigências de rotulagem, habilitação e certificado sanitário dependem do país de destino e do produto.','image','sif.png'],
    ],
    sources:[['MAPA — modelos de carimbos SIF','assets/references/simbolos/sif-mapa.pdf'],['Cidasc — exemplo de SIE de Santa Catarina','assets/references/simbolos/sie-cidasc.pdf'],['Prefeitura de Londrina — modelos do SIM, páginas 11 a 14','assets/references/simbolos/sim-londrina.pdf'],['MAPA — habilitação e certificação para exportação','https://www.gov.br/pt-br/servicos/solicitar-habilitacao-para-exportacao-de-produtos-de-origem-animal-dos-estabelecimentos-registrados-no-DIPOA-sob-SIF']],
  },
  alergenicos: {
    title:'Reconheça os desenhos de alimentos',
    intro:'A referência reúne os 14 grupos da lista europeia. Aqui, os desenhos são educativos: não são selos oficiais nem uma reprodução da lista obrigatória brasileira. No Brasil, confira a declaração escrita de alergênicos e os ingredientes.',
    items:[
      ['Cereais com glúten','A espiga remete a cereais como trigo, centeio e cevada. Alergia ao trigo e doença celíaca são condições diferentes.','wheat'],
      ['Aipo ou salsão','O desenho dos talos identifica o aipo, também chamado de salsão.','celery'],
      ['Castanhas e nozes','Representa esse grupo de alimentos. Confira qual castanha ou noz está indicada no rótulo.','nut'],
      ['Peixes','O peixe representa esse grupo. Não é o mesmo grupo de crustáceos ou moluscos.','fish'],
      ['Soja','A vagem com grãos representa a soja e chama atenção para esse ingrediente.','soy'],
      ['Gergelim','As sementes representam o gergelim, também encontrado em pastas como o tahine.','seeds'],
      ['Amendoim','A vagem identifica o amendoim, que é um alimento diferente das castanhas e nozes.','peanut'],
      ['Crustáceos','Inclui, por exemplo, camarão, caranguejo e lagosta.','crab'],
      ['Ovos','A imagem do ovo indica esse alimento. Confira também ingredientes derivados.','egg'],
      ['Moluscos','A concha representa moluscos, como mexilhão, ostra, lula e polvo.','shell'],
      ['Leite','A garrafa representa leite. “Zero lactose” não significa ausência das proteínas do leite.','milk'],
      ['Mostarda','O frasco representa a mostarda, que pode ser usada em molhos e temperos.','mustard'],
      ['Dióxido de enxofre e sulfitos','SO₂ remete a essas substâncias, que podem ser usadas como conservantes e causar reações em pessoas sensíveis.','sulphites'],
      ['Tremoço','Os grãos representam o tremoço, uma leguminosa que também pode aparecer como farinha.','lupin'],
    ],
    sources:[['Anvisa — alergênicos no Brasil','https://www.gov.br/anvisa/pt-br/centraisdeconteudo/publicacoes/alimentos/perguntas-e-respostas-arquivos/rotulagem-de-alergenicos.pdf'],['Comissão Europeia — os 14 grupos da referência','https://food.ec.europa.eu/food-safety/campaign-2026/allergies_en']],
  },
  reciclagem: {
    title:'Qual material é este?',
    intro:'Os números de 1 a 7 identificam tipos de plástico. Eles não são uma nota de qualidade nem uma garantia de reciclagem. A aceitação de cada material depende da coleta e da estrutura local.',
    items:[
      ['1 · PET','Polietileno tereftalato, usado em algumas garrafas e embalagens.','plastic','1'],
      ['2 · PEAD','Polietileno de alta densidade, encontrado em frascos e embalagens rígidas.','plastic','2'],
      ['3 · PVC','Policloreto de vinila, que pode aparecer em filmes e outros produtos.','plastic','3'],
      ['4 · PEBD','Polietileno de baixa densidade, usado em sacos e filmes flexíveis.','plastic','4'],
      ['5 · PP','Polipropileno, encontrado em potes, tampas e outras embalagens.','plastic','5'],
      ['6 · PS','Poliestireno, usado em alguns descartáveis e em formas expandidas, como EPS.','plastic','6'],
      ['7 · Outros','Reúne outros plásticos e combinações. O número sozinho não informa um destino único de reciclagem.','plastic','7'],
      ['Papel','As três setas são um símbolo geral de reciclagem. Na referência, estão associadas ao papel, mas sozinhas não identificam esse material.','recycle'],
      ['Alumínio','As letras “al” com setas identificam o alumínio, presente em algumas latas e embalagens.','aluminium'],
      ['Aço','O ímã e a palavra “aço” remetem a esse metal, usado em algumas latas de alimentos.','steel'],
      ['Vidro','A garrafa com setas remete à reciclagem do vidro. Confira as orientações locais, especialmente para materiais quebrados.','glass'],
      ['Pessoa usando a lixeira','Pede que você descarte o resíduo de forma adequada. Não significa, sozinho, que o material seja rejeito ou não reciclável.','tidyman'],
      ['Embalagem longa vida','O aviso convida a encaminhar a embalagem à reciclagem. Ela combina camadas de materiais e depende de coleta e processamento adequados.','carton'],
    ],
    sources:[['ITAL — identificação dos materiais de embalagem','https://ital.agricultura.sp.gov.br/brasilpacktrends/br/files/assets/basic-html/page197.html'],['Ministério do Meio Ambiente — reciclagem','https://www.gov.br/mma/pt-br/assuntos/educacao-ambiental/glossario-ea/o-que-e-reciclagem']],
  },
};

const drawings={
  wheat:'<path d="M32 53V12m0 14C18 28 17 16 19 13c10 0 13 7 13 13zm0 13C17 41 16 29 18 27c10 0 14 6 14 12zm0-7c15 2 16-10 14-13-10 0-14 7-14 13zm0 14c15 2 16-10 14-13-10 0-14 7-14 13z"/>',
  celery:'<path d="M24 13l3 36q5 9 10 0l4-36M32 15v37M24 25l-8-6m24 9 8-7M32 15l-6-6m6 6 6-6"/>',
  nut:'<path d="M15 32q3-21 21-18 21 5 10 28-8 20-24 6zM32 18q-9 14-3 30M15 32l30-6"/>',
  fish:'<path d="M9 32q20-27 36 0-16 27-36 0zM45 32l12-13v26z"/><circle cx="20" cy="28" r="2"/>',
  soy:'<path d="M12 15q40-8 41 17-4 25-40 16z"/><circle cx="24" cy="32" r="5"/><circle cx="40" cy="32" r="5"/>',
  seeds:'<path d="M18 12q-15 20 2 24 15-4-2-24zm25 0q-15 20 2 24 15-4-2-24zM32 35q-15 20 2 24 15-4-2-24z"/>',
  peanut:'<path d="M24 8q-16 4-9 21 3 5-1 12-5 19 15 16 22-1 17-21-4-7 1-14 2-19-23-14zM24 16l9 5-8 7 11 7-11 8 9 7"/>',
  crab:'<ellipse cx="32" cy="36" rx="16" ry="12"/><path d="M18 30L9 20l2-11m-2 11-6-5M46 30l9-10-2-11m2 11 6-5M16 36H5m12 7L7 51m41-15h11m-12 7 10 8"/>',
  egg:'<path d="M32 9C19 9 10 32 11 43c3 20 39 20 42 0C54 32 45 9 32 9zM13 35l9-5 8 9 9-8 12 6"/>',
  shell:'<path d="M32 55L9 34C-2 2 66 2 55 34zM32 55V15m0 40L20 19m12 36 12-36m-12 36L12 29m20 26 20-26"/>',
  milk:'<path d="M24 8h16v14l8 12v23H16V34l8-12zM24 15h16M16 37h32"/>',
  mustard:'<path d="M29 6h6v12l12 8v30H17V26l12-8zM21 32h22v13H21zM25 51h14"/>',
  sulphites:'<path d="M25 8h14M28 8v20L12 53q-2 4 4 4h32q6 0 4-4L36 28V8"/><text x="32" y="48" text-anchor="middle" font-size="14" fill="currentColor" stroke="none">SO₂</text>',
  lupin:'<ellipse cx="21" cy="23" rx="12" ry="8" transform="rotate(-25 21 23)"/><ellipse cx="44" cy="33" rx="12" ry="8" transform="rotate(25 44 33)"/><ellipse cx="23" cy="46" rx="12" ry="8"/>',
  aluminium:'<path d="M15 18a23 23 0 1 0 34 0M15 18H5m10 0V8M49 18h10m-10 0V8"/><text x="32" y="40" text-anchor="middle" font-size="23" fill="currentColor" stroke="none">al</text>',
  steel:'<path d="M14 16v24a18 18 0 0 0 36 0V16H38v24a6 6 0 0 1-12 0V16zM14 25h12m12 0h12"/>',
  glass:'<path d="M27 10h10v15l6 7v24H21V32l6-7zM21 38h22"/><path d="M12 13L6 24m0 0 11-2M52 51l6-12m0 0-10 3"/>',
  tidyman:'<circle cx="40" cy="12" r="5"/><path d="M40 22v20m0-18-13 9-10-6m23 15-7 16m7-16 8 16M7 36h19l-3 23H10zM16 42v11"/>',
  carton:'<path d="M18 22l7-13h20l5 13v34H18zM18 22h32M25 9v13M29 22v34"/><path d="M35 36l7-4 5 8m-7-7-5 10 10 2"/>',
};

export function detailIcon(kind,code) {
  const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
  svg.setAttribute('viewBox','0 0 64 64');svg.setAttribute('aria-hidden','true');
  svg.setAttribute('class','symbol-detail-icon');
  if(kind==='plastic')svg.innerHTML='<g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 23l9-16q3-5 6 0l9 16m-7-3 7 3 1-8M49 31l10 17q3 6-4 6H38m6-6-6 6 6 6M27 54H9q-7 0-4-6l10-17m-8 3 8-3 2 8"/></g><text x="32" y="40" text-anchor="middle" font-family="Arial,sans-serif" font-size="20" fill="currentColor">'+code+'</text>';
  else if(kind==='recycle')svg.innerHTML='<text x="32" y="52" text-anchor="middle" font-family="Segoe UI Symbol,Arial,sans-serif" font-size="62" fill="currentColor">♻</text>';
  else svg.innerHTML='<g fill="none" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round" font-family="Arial,sans-serif">'+drawings[kind]+'</g>';
  return svg;
}

export function renderSymbolDetails(id) {
  const guide=symbolDetails[id];
  if(!guide)return null;
  const section=document.createElement('section');section.className='symbol-detail-guide';section.dataset.guide=id;
  const title=document.createElement('h3');title.textContent=guide.title;
  const caption=document.createElement('p');caption.className='symbol-note';caption.textContent=['lupa','sif'].includes(id)?'Imagens de documentos oficiais para reconhecimento educativo.':'Ilustrações educativas para reconhecer os símbolos.';
  const intro=document.createElement('p');intro.textContent=guide.intro;
  const list=document.createElement('ul');list.className='symbol-detail-list';
  for(const [name,text,kind,code] of guide.items) {
    const row=document.createElement('li');
    const copy=document.createElement('div');
    const heading=document.createElement('h4');heading.textContent=name;
    const description=document.createElement('p');description.textContent=text;
    let icon;
    if(kind==='image') {
      icon=document.createElement('img');icon.src='assets/references/simbolos/'+code;icon.alt=name+' — modelo oficial demonstrativo';icon.className='symbol-detail-image';icon.loading='lazy';
    } else icon=detailIcon(kind,code);
    copy.append(heading,description);row.append(icon,copy);list.append(row);
  }
  section.append(title,caption,list,intro);
  for(const [name,url] of guide.sources) {
    const link=document.createElement('a');link.className='source';link.href=url;link.target='_blank';link.rel='noopener noreferrer';link.textContent=name+' ↗';section.append(link);
  }
  return section;
}
