import { readingSuggestions } from './readings.js';
// Percentuais fornecidos pela equipe do projeto. Não converter em contagens:
// a base de respostas de cada pergunta ainda precisa ser conferida na pesquisa original.
export const researchResults = [
  {value:'90,3%',text:'Sentem falta de informações mais claras nos rótulos.'},
  {value:'90,3%',text:'Não compreendem ou não conhecem bem os selos de inspeção sanitária.'},
  {value:'61,3%',text:'Compreendem apenas parcialmente ou não compreendem a tabela nutricional.'},
  {value:'54,9%',text:'Consideram que o tamanho das letras dificulta a leitura dos rótulos.'},
  {value:'80,6%',text:'Responderam que consumiriam ou poderiam consumir, dependendo do produto, um alimento com a validade vencida há poucos dias, mesmo que sua aparência estivesse normal.',highlight:true},
];

export function researchContent() {
  const content=document.createElement('div');content.className='research-results';
  const intro=document.createElement('p');
  intro.textContent='Antes de definir as ações educativas, o projeto realizou uma pesquisa exploratória com 34 participantes para identificar dificuldades na leitura dos rótulos e dúvidas sobre os alimentos.';
  const scope=document.createElement('p');scope.className='research-scope';
  scope.textContent='Estes resultados descrevem a amostra consultada e não são estimativas para a população geral.';
  const list=document.createElement('ul');list.className='research-stats';
  for(const result of researchResults) {
    const item=document.createElement('li');
    if(result.highlight)item.className='research-highlight';
    const value=document.createElement('strong');value.textContent=result.value;
    const description=document.createElement('p');description.textContent=result.text;
    item.append(value,description);list.append(item);
  }
  const takeaway=document.createElement('p');
  takeaway.textContent='Essas respostas ajudam a orientar o projeto: tornar os rótulos mais compreensíveis e abordar validade, conservação e segurança dos alimentos. O último dado descreve uma intenção relatada, não uma prática observada nem uma recomendação de consumo.';
  const source=document.createElement('p');source.className='research-source';
  source.textContent='Fonte: síntese dos resultados fornecida pela equipe do projeto, com referência aos slides 11, 13, 18, 21 e 23. Percentuais reproduzidos conforme o material enviado; bases de resposta por pergunta e arredondamentos aguardam conferência no levantamento original antes da publicação.';
  content.append(intro,scope,list,takeaway,source);
  const independent=document.createElement('p');independent.className='research-source';independent.textContent='A leitura abaixo é uma pesquisa independente, relacionada ao tema. Não é a fonte dos percentuais do nosso projeto.';
  content.append(independent,readingSuggestions('rotulagem'));
  return content;
}
