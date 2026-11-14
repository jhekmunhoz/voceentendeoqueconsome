// Caminhos compartilhados. Cada embalagem exibe somente os pontos disponíveis.
export const learningPaths = [
  { title:'Posso consumir com segurança?', hint:'Validade, conservação e inspeção', keys:['validade','conservacao','temperatura','inspecao'] },
  { title:'O que tem neste alimento?', hint:'Ingredientes, alergênicos e nutrientes', keys:['alergenicos','tabela','ingredientes','aditivos'] },
  { title:'Que produto é este e de onde vem?', hint:'Nome, origem e identificação', keys:['nome','volume','peso','classificacao','especie','origem','fabricante','lote'] },
];

export const guidedTopics = {
  validade: {
    question:'Até quando posso consumir?',
    find:'Procure a data de validade e as instruções para depois da abertura.',
    text:'A validade impressa considera a embalagem fechada e íntegra, conservada como o fabricante orienta. Depois de abrir, o prazo de consumo pode ser menor.',
    tip:'Anote quando abriu. Siga o tempo e a temperatura indicados no rótulo e respeite o prazo que terminar primeiro. Aparência e cheiro normais não garantem que um alimento vencido esteja seguro.',
  },
  alergenicos: {
    question:'Tenho alergia. O que preciso conferir?',
    find:'Procure o aviso que começa com “ALÉRGICOS” e leia também os ingredientes.',
    text:'“CONTÉM LEITE” informa a presença de leite. “PODE CONTER LEITE” avisa sobre o risco de contato acidental durante a produção, mesmo sem leite na receita.',
    tip:'Confira o aviso a cada compra. Leite zero lactose pode continuar contendo as proteínas do leite e não é, por isso, adequado para quem tem alergia ao leite.',
  },
  tabela: {
    question:'Como comparar dois leites?',
    find:'Encontre a tabela e localize a coluna de 100 ml.',
    text:'A tabela informa a energia e os nutrientes de uma quantidade de alimento. Para comparar dois leites, use a coluna de 100 ml dos dois. Assim, a quantidade comparada é a mesma.',
    tip:'Depois, veja a porção indicada e quanto você pretende consumir. Os campos “000” do modelo de referência são espaços reservados, não valores nutricionais reais.',
  },
};

const questions = {
  conservacao:['Como devo guardar este alimento?','Procure as orientações de conservação, inclusive depois de abrir.'],
  temperatura:['Em que temperatura devo guardar?','Procure a temperatura de conservação indicada no rótulo.'],
  inspecao:['Quem fiscaliza a produção?','Procure a identificação do serviço de inspeção.'],
  ingredientes:['O que foi usado para fazer este produto?','Procure a lista de ingredientes, quando presente.'],
  aditivos:['Como encontrar os aditivos?','Procure os aditivos declarados na lista de ingredientes.'],
  nome:['Que alimento estou comprando?','Procure o nome do alimento, além da marca.'],
  volume:['Quanto vem na embalagem?','Procure a quantidade e a unidade, como litros ou mililitros.'],
  peso:['Qual é a quantidade de produto?','Procure o conteúdo líquido e a unidade de medida.'],
  classificacao:['Como identificar a classificação dos ovos?','Procure a classificação escrita no rótulo dos ovos.'],
  especie:['Qual é a espécie do pescado?','Procure o nome da espécie informado na embalagem.'],
  origem:['De onde vem este alimento?','Procure as informações de origem e o endereço informado.'],
  fabricante:['Quem é responsável pelo produto?','Procure a identificação e os contatos do fabricante.'],
  lote:['Para que serve esse código?','Procure o código identificado como lote.'],
};

export function getLesson(key, product) {
  if(product.id==='leite' && guidedTopics[key])return guidedTopics[key];
  if(key==='validade')return guidedTopics.validade;
  if(key==='alergenicos')return {
    question:'Tenho alergia. O que preciso conferir?',
    find:'Procure o aviso que começa com “ALÉRGICOS” e confira os ingredientes.',
    text:'“CONTÉM” indica a presença do alimento citado. “PODE CONTER” avisa sobre o risco de contato acidental durante a produção, mesmo que esse alimento não faça parte da receita.',
    tip:'Leia o aviso a cada compra e siga a orientação do profissional de saúde. As declarações específicas desta arte ilustrativa ainda aguardam revisão.',
  };
  if(key==='tabela')return {
    question:'Como comparar produtos semelhantes?',
    find:'Encontre a tabela e procure a coluna de 100 g.',
    text:'Compare alimentos da mesma categoria usando a coluna de 100 g dos dois rótulos. Assim, a quantidade comparada é igual, mesmo que as porções sejam diferentes.',
    tip:'Compare dois queijos entre si, por exemplo. Depois confira a porção e quanto pretende consumir. Os números impressos nas nossas artes são demonstrativos e aguardam revisão.',
  };
  const [question,find]=questions[key]||[];
  const lesson={question,find};
  if(key==='nome')lesson.text='O nome identifica o alimento. Nesta embalagem educativa, a categoria apresentada é '+product.name.toLowerCase()+'.';
  return lesson;
}
