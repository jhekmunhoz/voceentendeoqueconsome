const rotulagem = 'https://www.gov.br/anvisa/pt-br/assuntos/alimentos/rotulagem';
export const topics = {
  lote: { title: 'Lote de fabricação', text: 'O lote identifica um grupo de unidades produzidas em condições semelhantes. Ele ajuda a localizar quais embalagens fazem parte da mesma produção.', tip: 'Se precisar falar com o fabricante, tenha em mãos o lote e a validade. O lote identifica o grupo e a validade orienta até quando consumir nas condições indicadas.', source: null },
  nome: { title: 'Denominação do produto', text: 'É o nome que identifica o alimento. Na caixa ilustrada, a expressão “leite integral UHT” ajuda a reconhecer o tipo de leite.', tip: 'Ao escolher um produto, procure o nome do alimento junto à marca.', source: rotulagem },
  tabela: { title: 'Informação nutricional', text: 'A tabela reúne o valor energético e as quantidades de nutrientes do alimento. Observe a porção indicada para entender a que quantidade os números se referem.', tip: 'Para comparar dois produtos semelhantes, procure valores expressos na mesma quantidade de alimento.', source: rotulagem },
  volume: { title: 'Quantidade de produto', text: 'A indicação “1 L” na frente desta caixa significa que ela contém um litro de leite.', tip: 'Observe a unidade junto ao número. Líquidos costumam ter o conteúdo indicado em litros ou mililitros.', source: null },
  validade: { title: 'Prazo de validade', text: 'É o período em que o alimento se mantém seguro e adequado para consumo nas condições de conservação indicadas pelo fabricante.', tip: 'Depois de abrir a embalagem, confira também as instruções de conservação e consumo após a abertura.', source: 'https://www.gov.br/anvisa/pt-br/assuntos/noticias-anvisa/2018/guia-orienta-sobre-prazos-de-validade-de-alimentos' },
  conservacao: { title: 'Como conservar', text: 'A embalagem informa as condições em que o produto deve ser guardado. Elas podem mudar depois que você abre o pacote.', tip: 'Procure as instruções de armazenamento antes de guardar as compras.', source: 'https://www.gov.br/anvisa/pt-br/assuntos/alimentos/controle-sanitario' },
  ingredientes: { title: 'Lista de ingredientes', text: 'A lista identifica os ingredientes usados para produzir aquele alimento. A composição pode variar entre embalagens da mesma categoria.', tip: 'Leia a lista da embalagem que você tem em mãos e confira também as advertências sobre alergênicos.', source: rotulagem },
  inspecao: { title: 'Inspeção sanitária', text: 'Os serviços de inspeção fiscalizam a produção de alimentos de origem animal. A identificação da inspeção ajuda a reconhecer o serviço responsável.', tip: 'Procure a identificação na embalagem real. As nossas ilustrações são exemplos educativos.', source: 'https://www.gov.br/empresas-e-negocios/pt-br/redesim/meu-cnpj/poa' },
};

export const products = [
  { id: 'leite', name: 'Leite', color: '#dfeadb', text: 'Uma caixa de leite integral UHT.', topics: ['nome','tabela','volume'] },
  { id: 'ovos', name: 'Ovos', color: '#f3e6c9', text: 'Um estojo de ovos com tampa de polpa moldada.', topics: ['validade','inspecao'] },
  { id: 'queijo', name: 'Queijo', color: '#f7e6b7', text: 'Uma peça de queijo em embalagem individual.', topics: ['ingredientes','conservacao'] },
  { id: 'carne', name: 'Carne bovina', color: '#f3dcd0', text: 'Uma bandeja de carne bovina embalada.', topics: ['conservacao','inspecao'] },
  { id: 'linguica', name: 'Linguiça', color: '#eddccf', text: 'Um pacote de linguiça industrializada.', topics: ['ingredientes','tabela'] },
  { id: 'peixe', name: 'Peixe congelado', color: '#dae9e8', text: 'Uma embalagem de filé de peixe congelado.', topics: ['conservacao','validade'] },
];
