import { guideGroups, guideDenominations } from './denominations-guide.js';
// Resumos educativos. Conferir as normas e suas alterações antes da publicação.
// Novos itens usam o mesmo formato e entram automaticamente na busca e nos filtros.
export const denominationGroups = [
  {id:'leite',name:'Leite e derivados',icon:'milk'},
  {id:'carnes',name:'Carnes e derivados',icon:'tag'},
  {id:'pescado',name:'Pescados',icon:'info'},
  {id:'ovos',name:'Ovos e derivados',icon:'grid'},
  {id:'abelhas',name:'Produtos de abelhas',icon:'leaf'},
  ...guideGroups,
];
const legislation='https://www.gov.br/agricultura/pt-br/assuntos/inspecao/produtos-animal/legislacao';
const riispoa='https://www2.camara.leg.br/legin/fed/decret/2017/decreto-9013-29-marco-2017-784536-normaatualizada-pe.html';
const milk='https://www.gov.br/agricultura/pt-br/assuntos/inspecao/produtos-animal/legislacao/IN762018RTIQLeite.pdf';
const dairy='https://www.gov.br/agricultura/pt-br/assuntos/inspecao/produtos-animal/legislacao/Port1461996RTqueijomanteigacremedeleitegorduralctealeitefluido.pdf';
const sausages='https://www.gov.br/agricultura/pt-br/assuntos/inspecao/produtos-animal/legislacao/copy_of_IN042000RTcmssalsichamortadelalinguia.pdf';
const eggs='https://www.gov.br/agricultura/pt-br/assuntos/inspecao/produtos-animal/legislacao/Port11792024Beneficiamentodeovos.pdf';
const bees=legislation+'/IN032001RTprodutosdeabelhas.pdf';
function entry(id,group,name,definition,tip,source=riispoa,aliases='') {
  return {id,group,name,definition,tip,source,aliases};
}
export const denominations = [
  entry('mussarela','leite','Queijo mussarela','Queijo de massa filada: a massa acidificada é trabalhada para formar sua estrutura característica. É obtido a partir da coagulação do leite.','Procure a denominação completa. A palavra “tipo”, sozinha, não transforma outro alimento em mussarela.','https://www.gov.br/agricultura/pt-br/assuntos/inspecao/produtos-animal/legislacao/Port3641997RTqueijomussarela.pdf','muçarela mozzarella muzzarella mussarella tipo mussarela'),
  entry('pasteurizado','leite','Leite pasteurizado','Leite submetido à pasteurização, um tratamento térmico previsto na legislação. A conservação exige refrigeração.','“Pasteurizado” fala do tratamento; “integral” ou “desnatado” fala da gordura.',milk),
  entry('uht','leite','Leite UHT','UHT identifica o tratamento em temperatura muito alta. O envase adequado permite conservação da embalagem fechada nas condições indicadas.','Depois de abrir, siga o prazo e a refrigeração informados no rótulo.',legislation+'/Port7832025MAPARTLeiteUHT.pdf','uat longa vida'),
  entry('integral','leite','Leite integral','A palavra “integral” identifica uma classificação do leite quanto ao teor de gordura.','Compare a classificação de gordura separadamente do tratamento UHT ou pasteurização.',milk),
  entry('semidesnatado','leite','Leite semidesnatado','Classificação do leite com teor de gordura entre o integral e o desnatado, dentro dos limites próprios.','Semidesnatado não significa sem lactose.',milk,'parcialmente desnatado'),
  entry('desnatado','leite','Leite desnatado','Leite com teor de gordura reduzido ao limite previsto para essa classificação.','Desnatado não significa ausência de leite, de lactose ou de proteínas.',milk),
  entry('po','leite','Leite em pó','Produto obtido pela retirada de água do leite, por processo adequado.','Leia “leite em pó” ou “composto lácteo”: são denominações diferentes.',legislation+'/IN532018RTLeiteemp.pdf','leite em po instantaneo'),
  entry('iogurte','leite','Iogurte','Leite fermentado por culturas específicas de bactérias, que conferem características próprias ao produto.','Uma embalagem parecida pode trazer “bebida láctea”. Confira o nome completo.',legislation+'/IN462007RTleitefermentadoiogurteetc.pdf','yogurt yoghurt'),
  entry('fermentado','leite','Leite fermentado','Família de produtos obtidos pela fermentação do leite com microrganismos específicos.','O nome do produto ajuda a distinguir as diferentes fermentações.',legislation+'/IN462007RTleitefermentadoiogurteetc.pdf','fermentacao'),
  entry('bebida','leite','Bebida láctea','Produto com base de leite ou derivados, que pode ter ingredientes não lácteos.','Bebida láctea e iogurte têm identidades próprias. Compare ingredientes e tabela.'),
  entry('composto','leite','Composto lácteo','Produto em pó à base de leite ou derivados, com ou sem ingredientes não lácteos.','O aspecto em pó não basta para identificar leite em pó. Leia a denominação.'),
  entry('creme','leite','Creme de leite','Produto lácteo relativamente rico em gordura, separada do leite por processos adequados.','Confira o tratamento e as orientações do fabricante para conservar após abrir.',dairy),
  entry('manteiga','leite','Manteiga','Produto gorduroso obtido do creme de leite por bateção e trabalho da massa; sua gordura é láctea.','Manteiga e margarina têm identidades diferentes. Procure o nome e os ingredientes.',dairy),
  entry('requeijao','leite','Requeijão','Produto obtido pela fusão de massa coalhada de leite, com ingredientes lácteos previstos em seu padrão.','Leia a denominação completa de produtos que se parecem com requeijão.','https://www.gov.br/agricultura/pt-br/assuntos/inspecao/produtos-animal/legislacao/Port3591997RTRequeijo.pdf','requeijão cremoso'),
  entry('ricota','leite','Ricota','Queijo obtido pela precipitação a quente das proteínas do soro de leite, com adição de leite permitida no padrão.','Ricota continua sendo um derivado do leite. Confira alergênicos e conservação.','https://wikisda.agricultura.gov.br/dipoa_baselegal/in_65-2020_rt_ricota.pdf'),
  entry('minas-frescal','leite','Queijo minas frescal','Queijo fresco de leite pasteurizado, com massa dessorada e não maturada.','“Frescal” não significa que pode ficar fora da geladeira. Siga o rótulo.','https://www.gov.br/agricultura/pt-br/assuntos/inspecao/produtos-animal/legislacao/Port3521997RTqueijominasfrescal.pdf'),
  entry('prato','leite','Queijo prato','Queijo maturado obtido pela coagulação do leite, com identidade própria. Pode apresentar variedades de formato, como lanche, cobocó e bola.','O formato ajuda a reconhecer a apresentação, mas confira a denominação completa.','https://wikisda.agricultura.gov.br/dipoa_baselegal/port_358-1997_rt_queijo_prato.pdf'),
  entry('parmesao','leite','Queijo parmesão','Queijo maturado, obtido da coagulação do leite e de processos próprios dessa variedade.','“Ralado” indica a apresentação. Procure qual queijo ou mistura de queijos está declarada.','https://www.gov.br/agricultura/pt-br/assuntos/inspecao/produtos-animal/legislacao/Port3531997RTQueijoparmesoparmesanoreggianosbrinz.pdf','parmesano reggiano reggianito sbrinz'),
  entry('condensado','leite','Leite condensado','Produto obtido por desidratação parcial do leite, com adição de açúcar.','Compare a denominação com misturas que tenham embalagem semelhante.',legislation+'/IN472018RTLeitecondensado.pdf'),
  entry('doce','leite','Doce de leite','Produto obtido pela concentração do leite sob aquecimento, com adição de açúcar.','A apresentação em pasta ou tablete também ajuda a identificar o produto.',legislation+'/Port3541997RTdocedeleite.pdf'),
  entry('carne-resfriada','carnes','Carne resfriada','A expressão informa que a carne foi conservada por resfriamento.','Confira também a espécie, o corte e a temperatura indicada para armazenamento.'),
  entry('carne-congelada','carnes','Carne congelada','A expressão informa o uso do congelamento para conservar a carne.','“Congelada” não informa, por si só, a espécie ou o corte.'),
  entry('moida','carnes','Carne moída','Carne submetida à moagem, com identidade e requisitos próprios.','Confira a espécie informada e as instruções de conservação.',legislation+'/Port6642022RTIQcarnemoda1.pdf','carne moida bovina'),
  entry('hamburguer','carnes','Hambúrguer','Produto cárneo feito de carne moída e moldado, com ou sem outros ingredientes permitidos.','Procure a espécie animal e confira se o produto está cru ou cozido.','https://www.gov.br/agricultura/pt-br/assuntos/inspecao/produtos-animal/legislacao/Port7242022RThamburguer.pdf','burger'),
  entry('linguica','carnes','Linguiça','Produto cárneo condimentado e embutido em envoltório. Há variedades com diferentes ingredientes e processos.','Não presuma que toda linguiça está pronta para comer. Leia preparo e conservação.',sausages,'toscana calabresa'),
  entry('salsicha','carnes','Salsicha','Produto cárneo obtido de uma emulsão de carne com ingredientes, embutido e submetido a tratamento térmico.','Confira a variedade, a composição e as instruções do fabricante.',sausages),
  entry('mortadela','carnes','Mortadela','Produto cárneo de emulsão de carnes, embutido e tratado termicamente, com ingredientes conforme a variedade.','“Bologna”, “tipo Bologna” e outras variedades têm padrões próprios. Leia o nome inteiro.',sausages),
  entry('apresuntado','carnes','Apresuntado','Produto de recortes ou cortes de pernil ou paleta suína transformados em massa, condimentados e tratados termicamente.','Apresuntado e presunto são denominações diferentes. Confira o nome junto à marca.','https://wikisda.agricultura.gov.br/dipoa_baselegal/port_701-2022_rtiq_apresuntado.pdf'),
  entry('presunto','carnes','Presunto cozido','Produto cárneo de cortes íntegros de pernil suíno, curado e cozido, com ingredientes previstos em seu padrão.','Confira a variedade e a espécie: presunto cozido de aves tem identificação própria.','https://pesquisa.in.gov.br/imprensa/servlet/INPDFViewer?captchafield=firstAccess&data=18%2F04%2F2023&jornal=515&pagina=15'),
  entry('bacon','carnes','Bacon','Produto suíno curado e defumado, cozido ou não, obtido dos cortes previstos no padrão.','Leia se aparece a indicação de outro corte, como “bacon de lombo”, e se é cozido.','https://www.gov.br/agricultura/pt-br/assuntos/inspecao/produtos-animal/legislacao/copy_of_Port7482023RTbacon.pdf','barriga defumada'),
  entry('salame','carnes','Salame','Produto cárneo curado, fermentado, maturado e dessecado, com composição própria de cada variedade.','A variedade faz parte da identificação. Ela não informa, sozinha, a conservação após abrir.','https://www.cidasc.sc.gov.br/inspecao/files/2025/07/Instrucao-Normativa-MAPA-no-22-de-31-de-julho-de-2000.pdf'),
  entry('peixe-fresco','pescado','Peixe fresco','A condição “fresco” se relaciona à conservação pelo resfriamento, sem congelamento.','Fresco também exige conservação adequada. Procure o nome da espécie.'),
  entry('peixe-congelado','pescado','Peixe congelado','Identifica pescado conservado por congelamento.','A espécie deve ser conferida separadamente. “Filé” indica a apresentação do corte.'),
  entry('file','pescado','Filé de peixe','“Filé” descreve uma forma de apresentação do peixe, não uma espécie.','Procure o nome do peixe e as condições de conservação; não presuma ausência absoluta de espinhas.','https://legis.senado.gov.br/norma/17667538/publicacao/17672555','salmão tilápia pescada'),
  entry('conserva','pescado','Peixe em conserva','Pescado acondicionado em recipiente fechado e submetido a processo térmico para conservação.','Confira a espécie, a apresentação e o meio de cobertura, como óleo ou água.','https://legis.senado.gov.br/norma/17667538/publicacao/17672555','atum sardinha lata'),
  entry('salgado','pescado','Pescado salgado ou seco','A denominação informa processos como salga e secagem aplicados ao pescado.','Confira a espécie e as instruções de dessalga e preparo. O nome comercial não substitui essa leitura.','https://legis.senado.gov.br/norma/17667538/publicacao/17672555','bacalhau'),
  entry('ovo','ovos','Ovo em natureza','Ovo apresentado com a casca, sem transformação em produto líquido ou desidratado.','Procure a espécie, a classificação e as instruções de conservação.',eggs,'ovos galinha codorna'),
  entry('ovo-pasteurizado','ovos','Ovo integral pasteurizado','Ovo sem casca, com clara e gema nas proporções originais, submetido à pasteurização.','“Integral” aqui trata da presença de clara e gema, não de teor de gordura.',legislation+'/Port7282022RTovointegralovodesidratado.pdf','ovo liquido'),
  entry('clara','ovos','Clara de ovo','Parte do ovo separada da gema. A apresentação e o tratamento devem ser conferidos no rótulo.','Clara também é derivada de ovo: confira as advertências para quem tem alergia.',eggs,'clara'),
  entry('ovo-po','ovos','Ovo desidratado','Produto obtido pela desidratação do ovo integral pasteurizado.','Confira a denominação completa: clara e gema desidratadas são produtos diferentes. Siga as instruções de reconstituição.',legislation+'/Port7282022RTovointegralovodesidratado.pdf','ovo em po'),
  entry('mel','abelhas','Mel','Alimento produzido pelas abelhas a partir de néctar ou outras fontes vegetais próprias, transformado e armazenado nos favos.','Produtos com mel e outros ingredientes podem ter outra denominação. Confira a lista.',legislation+'/IN112000RTmel.pdf'),
  entry('geleia-real','abelhas','Geleia real','Produto das secreções glandulares de abelhas operárias. É diferente de mel.','“Geleia real” não é geleia de frutas. Confira a apresentação e a conservação.',bees),
  entry('polen','abelhas','Pólen apícola','Pólen aglutinado e coletado pelas abelhas, recolhido na entrada da colmeia.','A apresentação desidratada deve ser identificada. Não presuma benefícios terapêuticos pelo nome.',bees),
  entry('propolis','abelhas','Própolis e extrato de própolis','Própolis vem de materiais resinosos coletados pelas abelhas. O extrato resulta da extração de componentes solúveis.','Confira composição e modo de uso. A denominação não comprova ação terapêutica.',bees),
  ...guideDenominations,
];

export const typeExplanation = {
  text:'Quando faz referência a uma variedade de origem geográfica, “tipo” indica a reprodução de características de um alimento típico de uma região. A aplicação depende das regras do produto e da proteção de nomes geográficos. A palavra também pode ter outros usos específicos, por isso leia a denominação inteira.',
  tip:'“Tipo” não é uma nota de qualidade nem dispensa o padrão do alimento. Não conclua apenas por essa palavra que o produto seja uma imitação ou tenha composição inferior.',
  source:'https://www.gov.br/agricultura/pt-br/assuntos/inspecao/produtos-animal/legislacao/IN222005Regulamentortuloregistroproduto.pdf',
  sourceLabel:'MAPA — regras de rotulagem, incluindo o uso de “tipo”',
};
export const denominationSources = {legislation,riispoa};
