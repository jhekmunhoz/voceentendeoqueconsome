import { readingSuggestions } from './readings.js';

export function veterinaryRoleContent() {
  const content=document.createElement('div');content.className='veterinary-role';
  function text(tag,value,className) {
    const element=document.createElement(tag);element.textContent=value;
    if(className)element.className=className;
    return element;
  }
  content.append(text('p','Da produção até o consumo, o médico-veterinário pode atuar na proteção da saúde dos animais e das pessoas, ajudando a prevenir riscos nos alimentos.','vet-intro'));
  const areas=[
    ['Na produção de alimentos','Acompanha a saúde e o bem-estar dos animais e orienta boas práticas de produção. O cuidado com a sanidade e o uso responsável de medicamentos integra a proteção da cadeia de alimentos.'],
    ['Nas indústrias e nos estabelecimentos','Pode atuar na responsabilidade técnica, orientando higiene, conservação, processos e controles de qualidade. O objetivo é prevenir contaminações e apoiar o cumprimento das exigências aplicáveis.'],
    ['Na inspeção e fiscalização','Nos serviços oficiais, participa da inspeção de produtos de origem animal e dos estabelecimentos. No abate, a avaliação dos animais antes e depois do procedimento ajuda a identificar alterações e definir a destinação adequada dos produtos.'],
    ['Na saúde pública','Integra equipes que trabalham na vigilância sanitária, na prevenção de doenças transmitidas por alimentos e no controle de zoonoses — doenças que podem ser transmitidas entre animais e pessoas. A educação de trabalhadores e consumidores também faz parte desse cuidado.'],
    ['Na abordagem de Uma Só Saúde','A saúde humana, animal, vegetal e ambiental está conectada. Médicos-veterinários colaboram com outros profissionais e instituições para enfrentar riscos de forma integrada.'],
  ];
  const list=document.createElement('div');list.className='vet-areas';
  areas.forEach(([title,description],index)=>{
    const section=document.createElement('section');
    section.append(text('span',String(index+1).padStart(2,'0'),'vet-area-number'),text('h3',title),text('p',description));
    list.append(section);
  });
  content.append(list,text('h3','Por que isso importa para você?'),text('p','Esse trabalho ajuda a reduzir riscos de contaminação e a levar alimentos próprios para consumo à população. Na compra e em casa, você também participa dessa proteção ao conferir a inspeção, a validade e as orientações de preparo e conservação.'));
  const sources=document.createElement('section');sources.className='vet-sources';sources.append(text('h3','Referências oficiais'));
  for(const [title,url] of [
    ['Ministério da Saúde — Medicina Veterinária','https://bvsms.saude.gov.br/medicina-veterinaria/'],
    ['CFMV — atuação na higiene e segurança dos alimentos','https://www.cfmv.gov.br/em-tempo-de-pandemia-medico-veterinario-atua-pela-higiene-e-saude-alimentar-da-populacao/comunicacao/noticias/2020/04/03/'],
    ['MAPA — serviços de inspeção e atividades oficiais','https://www.gov.br/agricultura/pt-br/assuntos/defesa-agropecuaria/suasa/perguntas-e-respostas-decreto-12-408-2025-e-o-sisbi/perguntas-e-respostas-sisbi'],
    ['Ministério da Saúde — Uma Só Saúde','https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/u/uma-so-saude'],
  ]) {
    const link=text('a',title+' ↗','source');link.href=url;link.target='_blank';link.rel='noopener noreferrer';sources.append(link);
  }
  content.append(sources,readingSuggestions('veterinaria'),text('p','Resumo educativo com referências consultadas em 13/11/2026. Conteúdo em revisão antes da publicação.','vet-review'));
  return content;
}
