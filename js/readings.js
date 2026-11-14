// Registros e resumos conferidos no PubMed em 13/11/2026.
// Leituras complementares: não substituem normas ou orientações oficiais brasileiras.
export const readings = {
  veterinaria:{pmid:'39503393',title:'One Health as a Core Component of Veterinary Medicine: Defining Day-1 Public Health Competencies for the Veterinary Workforce',description:'Estudo com entrevistas de médicos-veterinários de diferentes setores sobre competências em saúde pública e Uma Só Saúde. É uma leitura internacional complementar sobre a profissão.'},
  rotulagem:{pmid:'21709938',title:'Consumer use of nutrition labels in the city of Natal, Brazil',description:'Pesquisa com consumidores em Natal sobre leitura, compreensão e sugestões para melhorar a informação nos rótulos.'},
  lupa:{pmid:'33978115',title:'Performance and perception on front-of-package nutritional labeling models in Brazil',description:'Compara a compreensão de cinco modelos de rotulagem frontal por consumidores brasileiros. O estudo antecede a aplicação das regras atuais.'},
  tabela:{pmid:'35782932',title:"Consumers’ Response to Sugar Label Formats in Packaged Foods: A Multi-Methods Study in Brazil",description:'Investiga como consumidores brasileiros entendem informações sobre açúcares na tabela e na frente da embalagem.'},
  alergenicos:{pmid:'38270804',title:'Precautionary Allergen Labeling: Avoidance for All?',description:'Revisão sobre avisos de possível presença de alergênicos e suas dificuldades de interpretação. Discute o cenário internacional; as regras variam entre países.'},
  lactose:{pmid:'37444291',title:'Advances in Low-Lactose/Lactose-Free Dairy Products and Their Production',description:'Revisão das tecnologias de produção de lácteos com pouca ou nenhuma lactose, incluindo o uso de lactase.'},
  validade:{pmid:'33966763',title:'Impact of Messaging Strategy on Consumer Understanding of Food Date Labels',description:'Estudo nos Estados Unidos sobre mensagens educativas e compreensão das datas dos alimentos. As expressões e regras analisadas não são as mesmas do Brasil.'},
  conservacao:{pmid:'18236665',title:'Consumer assessment of safety and date labeling statements on ready-to-eat meat and poultry products designed to minimize risk of listeriosis',description:'Investiga, nos Estados Unidos, como consumidoras interpretam orientações de conservação e prazos após abrir produtos cárneos prontos para consumo.'},
  inspecao:{pmid:'30347169',title:'Food Chain Information: Data Quality and Usefulness in Meat Inspection in Portugal',description:'Pesquisa sobre informações da cadeia produtiva e sua utilidade na inspeção de carnes em Portugal. Complementa o tema da fiscalização, sem descrever os selos brasileiros.'},
  rastreabilidade:{pmid:'33030032',title:'Smart traceability for food safety',description:'Revisão sobre rastreabilidade e tecnologias que ajudam a acompanhar alimentos ao longo da cadeia produtiva. Leitura mais técnica, relacionada a origem, identificação e lotes.'},
  aditivos:{pmid:'36820681',title:'Information on food additives on food labels in Brazil: a critical analysis',description:'Analisa criticamente como os aditivos são informados nos rótulos de alimentos no Brasil.'},
  reciclagem:{pmid:'35093857',title:"Drivers of and barriers to consumers’ plastic packaging waste avoidance and recycling - A systematic literature review",description:'Revisão sobre fatores que facilitam ou dificultam a redução e a reciclagem de embalagens plásticas pelos consumidores. A infraestrutura e as regras dependem do local.'},
};

const topicReadings={
  classificacao:'rotulagem',origem:'rastreabilidade',fabricante:'rastreabilidade',
  peso:'rotulagem',temperatura:'conservacao',aditivos:'aditivos',especie:'rastreabilidade',
  alergenicos:'alergenicos',lote:'rastreabilidade',nome:'rotulagem',tabela:'tabela',
  volume:'rotulagem',validade:'validade',conservacao:'conservacao',ingredientes:'aditivos',
  inspecao:'inspecao',sif:'inspecao',sisbi:'inspecao',lupa:'lupa',
};

export function readingForTopic(key) {return topicReadings[key]||key;}

export function readingSuggestions(keys) {
  const articles=[...new Set(Array.isArray(keys)?keys:[keys])].map(key=>readings[key]).filter(Boolean);
  if(!articles.length)return document.createDocumentFragment();
  const section=document.createElement('aside');section.className='suggested-reading';
  section.setAttribute('aria-label','Sugestão de leitura científica');
  const heading=document.createElement('h3');heading.textContent=articles.length===1?'Para ler mais · PubMed':'Leituras complementares · PubMed';
  section.append(heading);
  for(const article of articles) {
    const link=document.createElement('a');link.href='https://pubmed.ncbi.nlm.nih.gov/'+article.pmid+'/';
    link.target='_blank';link.rel='noopener noreferrer';link.textContent=article.title+' ↗';
    const paragraph=document.createElement('p');paragraph.textContent=article.description;
    section.append(link,paragraph);
  }
  const note=document.createElement('small');note.textContent='Abre o registro do artigo no PubMed em nova aba. O texto completo pode depender do acesso da revista. Leitura complementar às referências oficiais.';
  section.append(note);
  return section;
}
