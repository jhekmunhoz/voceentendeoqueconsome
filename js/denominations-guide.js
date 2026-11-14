// Seleção adaptada do guia de estudo fornecido pela equipe em 13/11/2026.
// Famílias, ingredientes e processos são identificados separadamente de denominações de produtos.
const base='https://www.gov.br/agricultura/pt-br/assuntos/inspecao/produtos-animal/legislacao';
const law=file=>base+'/'+file;
const general='https://www2.camara.leg.br/legin/fed/decret/2017/decreto-9013-29-marco-2017-784536-normaatualizada-pe.html';
const labels='https://www.gov.br/anvisa/pt-br/assuntos/alimentos/rotulagem';
const additives='https://www.gov.br/anvisa/pt-br/setorregulado/regularizacao/alimentos/aditivos-alimentares';
const fermented=law('IN462007RTleitefermentadoiogurteetc.pdf');
const fish=law('IN212017RTpeixecongelado.pdf');
const egg=law('Port11792024Beneficiamentodeovos.pdf');
const bee=law('IN032001RTprodutosdeabelhas.pdf');
const gelatin='https://wikisda.agricultura.gov.br/dipoa_baselegal/port_384-2021_gelatina_gelatina_hidrolisada_e_col%C3%A1geno.pdf';
function item(id,group,name,definition,tip,source=general,kind='produto',aliases='') {
  return {id,group,name,definition,tip,source,kind,aliases,fromGuide:true};
}
export const guideGroups=[
  {id:'ingredientes',name:'Ingredientes de origem animal'},
  {id:'variavel',name:'Pode ter origem animal?'},
  {id:'compostos',name:'Alimentos com receita variável'},
  {id:'processos',name:'Termos de processamento'},
];
export const guideDenominations=[
  item('leite-tipo-a','leite','Leite pasteurizado tipo A','Identifica leite produzido, beneficiado e envasado em granja leiteira, com requisitos específicos.','“Tipo A” e “integral” podem aparecer juntos: tratam de características diferentes.',law('IN762018RTIQLeite.pdf')),
  item('leite-aromatizado','leite','Leite aromatizado','Produto lácteo com componentes que dão aroma ou sabor, conforme seu padrão.','Em uma bebida de chocolate, confira se o nome é leite aromatizado ou bebida láctea.',base),
  item('leite-outra-especie','leite','Leite de cabra, búfala ou ovelha','O nome da espécie informa a procedência do leite. Cada produto tem requisitos próprios.','A espécie também importa para identificar derivados. Não presuma adequação para quem tem alergia ao leite.',base,'familia'),
  item('kefir','leite','Kefir','Leite fermentado por uma associação característica de microrganismos.','Uma bebida fermentada não se torna kefir apenas por ter sabor ácido.',fermented),
  item('coalhada','leite','Coalhada','Produto da família dos leites fermentados, com culturas e processo próprios.','Leia a denominação mesmo quando a apresentação lembrar iogurte.',fermented),
  item('sobremesa-lactea','leite','Sobremesa láctea','Categoria de sobremesas com base láctea e ingredientes previstos em seu padrão.','“Sabor chocolate” informa sabor; “sobremesa láctea” ajuda a identificar a categoria.',law('IN842020RTSobremesalctea.pdf')),
  item('minas-padrao','leite','Queijo minas padrão','Variedade com requisitos próprios de elaboração e maturação.','“Padrão” faz parte do nome. Não significa leite padronizado nem queijo minas frescal.',base),
  item('minas-meia-cura','leite','Queijo minas meia cura','Queijo com identidade e critérios de maturação próprios.','Não se define apenas por deixar um queijo fresco mais tempo na geladeira.',law('IN742020RTQueijominasmeiacura.pdf')),
  item('queijo-coalho','leite','Queijo de coalho','Variedade de queijo com processo e padrão específicos.','“Coalho” no nome da variedade não identifica, sozinho, a origem do coagulante utilizado.',law('IN302001RTManteigagarrafaQueijocoalhoQueijomanteiga.pdf')),
  item('provolone','leite','Queijo provolone','Queijo de massa filada que pode ser fresco ou maturado e pode receber defumação.','“Defumado” informa uma característica adicional. Confira o nome completo.',base),
  item('queijo-azul','leite','Queijo azul','Queijo em que fungos característicos participam da maturação e das marcas internas.','Esse processo controlado é diferente de deterioração inesperada de outro alimento.',base),
  item('queijo-processado','leite','Queijo processado ou fundido','Produto obtido pela fusão e emulsificação de queijos, com ingredientes permitidos.','A textura cremosa não basta para identificar requeijão ou cream cheese.'),
  item('cream-cheese','leite','Cream cheese','Queijo cremoso com identidade própria.','Não classifique o alimento só pelo pote ou pela textura.',law('Port712020creamcheese.pdf')),
  item('petit-suisse','leite','Queijo petit suisse','Queijo de identidade própria, que pode receber ingredientes para conferir sabor.','Um potinho de morango pode ser queijo, iogurte ou outra sobremesa. Leia o nome.',base),
  item('nata','leite','Nata','Produto lácteo rico em gordura, com regulamento próprio.','“Creme vegetal” e “creme culinário” pedem leitura da composição e da denominação.',base),
  item('manteiga-garrafa','leite','Manteiga de garrafa','Produto de origem láctea também conhecido como manteiga da terra, com identidade própria.','Manteiga de cacau, apesar da palavra em comum, tem origem vegetal.',law('IN302001RTManteigagarrafaQueijocoalhoQueijomanteiga.pdf'),'produto','manteiga da terra'),
  item('carne-maturada','carnes','Carne maturada de bovino','Carne submetida a condições controladas para desenvolver características como maciez.','O tempo na prateleira ou na geladeira não comprova maturação.',base),
  item('cms','carnes','Carne mecanicamente separada · CMS','Ingrediente obtido por recuperação mecânica de tecidos cárneos de estruturas admitidas.','O uso e os limites dependem do produto. Só a lista de ingredientes confirma se foi usado.','https://wikisda.agricultura.gov.br/dipoa_baselegal/in_04-2000_salsicha_mortadela_lingui%C3%A7a.pdf','ingrediente','cms carne mecanicamente separada'),
  item('calabresa','carnes','Linguiça calabresa','Variedade de linguiça com base de carne suína e sabor picante característico.','Leia a diferença entre “calabresa” e “tipo calabresa”; não conclua que ambas têm a mesma formulação.','https://wikisda.agricultura.gov.br/dipoa_baselegal/in_04-2000_salsicha_mortadela_lingui%C3%A7a.pdf'),
  item('tipo-calabresa','carnes','Linguiça tipo calabresa','Variante distinguida no regulamento. Na versão cozida, há previsão de uso de CMS sob condições específicas.','A previsão é uma possibilidade. Confira os ingredientes para saber se a embalagem comprada contém CMS.','https://wikisda.agricultura.gov.br/dipoa_baselegal/in_04-2000_salsicha_mortadela_lingui%C3%A7a.pdf'),
  item('charque','carnes','Charque','Produto cárneo elaborado com salga e dessecação.','Charque e carne bovina salgada curada dessecada são identidades distintas.',base),
  item('jerked-beef','carnes','Carne bovina salgada curada dessecada','Produto que envolve salga, agentes de cura e dessecação.','“Jerked beef” é uma denominação admitida para essa versão bovina. Confira o rótulo.',base,'produto','jerked beef'),
  item('peito-peru','carnes','Peito de peru','Pode identificar um corte ou aparecer na identificação de um produto elaborado.','Leia se há tempero, cozimento ou outros ingredientes. O nome do corte não descreve toda a receita.',base,'familia'),
  item('posta','pescado','Posta de peixe','Apresentação obtida por corte transversal do peixe.','“Posta” descreve o corte. A espécie e a condição de conservação são outras informações.',fish,'apresentacao'),
  item('glaciado','pescado','Peixe glaciado','Pescado congelado com camada protetora de gelo na superfície.','A água de glaciamento não integra o peso líquido declarado do pescado.',fish,'processo','glaciamento'),
  item('camarao','pescado','Camarão','Crustáceo comercializado em apresentações e condições de conservação específicas.','Camarão parcialmente cozido e camarão cozido são condições diferentes.',law('IN232019RTCamaro.pdf'),'familia'),
  item('cefalopodes','pescado','Lula e polvo','São moluscos cefalópodes, com formas de apresentação próprias.','“Tenderizado” informa um processo de amaciamento.',law('Port10222024RTmoluscoscefalpodes.pdf'),'familia','cefalópodes tenderizado'),
  item('surimi','pescado','Surimi e bastonetes à base de surimi','Surimi é preparado a partir de carne de pescado processada e pode entrar em produtos formulados.','Em “kani” ou “sabor caranguejo”, confira a denominação e os ingredientes: pode haver peixe, ovo ou crustáceos.',base,'familia','kani bastonetes caranguejo'),
  item('gema','ovos','Gema de ovo','Parte do ovo separada da clara, apresentada conforme o tratamento e a conservação.','O nome da fração não informa, sozinho, se o produto foi pasteurizado.',egg),
  item('ovo-peso','ovos','Ovo jumbo, extra, grande ou médio','Classes de peso unitário dos ovos de galinha.','“Extra” nesse contexto se refere à classe de peso. Não é uma alegação nutricional.',egg,'classificacao'),
  item('ovo-categoria','ovos','Ovos das categorias A e B','Classificação por características de qualidade. A categoria B é destinada à industrialização.','Categoria e classe de peso respondem a perguntas diferentes.',egg,'classificacao'),
  item('ovo-liquido','ovos','Ovo líquido para pasteurização','Produto sem casca que ainda será submetido ao tratamento indicado.','“Líquido” é estado físico. Não presume pasteurização nem produto pronto para consumo.',egg),
  item('ovos-conserva','ovos','Conserva e semiconserva de ovos','Produtos de ovos cozidos, descascados e acondicionados em salmoura ácida, com requisitos próprios.','A semiconserva exige refrigeração. O recipiente de vidro não prova estabilidade fora da geladeira.',egg,'familia'),
  item('mel-floral','abelhas','Mel floral, unifloral ou multifloral','O néctar floral predomina. A denominação pode se relacionar a uma origem floral predominante ou a várias.','A florada declarada precisa corresponder às características do produto.','https://wikisda.agricultura.gov.br/dipoa_baselegal/in_11-2000_rt_mel.pdf','familia'),
  item('melato','abelhas','Mel de melato','Mel produzido principalmente a partir de secreções vegetais ou de insetos sugadores presentes nas plantas.','É uma origem diferente do mel predominantemente floral.','https://wikisda.agricultura.gov.br/dipoa_baselegal/in_11-2000_rt_mel.pdf'),
  item('mel-cremoso','abelhas','Mel cremoso ou cristalizado','A consistência se relaciona à estrutura dos cristais do mel.','“Cremoso” aqui não indica adição de creme de leite.','https://wikisda.agricultura.gov.br/dipoa_baselegal/in_11-2000_rt_mel.pdf','apresentacao'),
  item('mel-sem-ferrao','abelhas','Mel de abelhas sem ferrão','Mel de espécies com características próprias de produção e conservação.','Confira a espécie, o processo e as orientações específicas. Evite aplicar automaticamente critérios do mel de Apis.',base),
  item('banha','ingredientes','Banha','Gordura obtida da fusão de tecidos adiposos de suínos.','Pode aparecer em massas e biscoitos. A receita é que confirma a presença.',general,'ingrediente'),
  item('soro-whey','ingredientes','Soro de leite, whey, WPC e WPI','Whey é soro de leite. WPC e WPI identificam concentrado e isolado de proteínas do soro.','Concentrar ou isolar não muda a origem láctea.',law('IN942020RTSorodeleite.pdf'),'ingrediente','whey protein wpc wpi'),
  item('caseina','ingredientes','Caseína e caseinatos','Caseína é proteína do leite; os caseinatos são seus sais.','O nome pode revelar um ingrediente lácteo mesmo quando “leite” não aparece em destaque.',law('IN182020RTCasenaalimentar.pdf'),'ingrediente','caseinato de sodio caseinato de calcio'),
  item('gelatina','ingredientes','Gelatina comestível','Produto derivado do colágeno de tecidos animais.','Pó para sobremesa pode conter também açúcar, aromas e outros ingredientes.',gelatin,'ingrediente'),
  item('colageno-hidrolisado','ingredientes','Colágeno hidrolisado','Nome admitido para a gelatina hidrolisada que perdeu o poder de gelificação.','Não presuma que terá a mesma função da gelatina usada para firmar uma sobremesa.',gelatin,'ingrediente','gelatina hidrolisada peptideos'),
  item('carmim','ingredientes','Carmim de cochonilha · INS 120','Corante proveniente da cochonilha, um inseto.','Cor vermelha pode vir de outras fontes. Confira a identificação do corante.',additives,'ingrediente','ins 120 e120'),
  item('cera-abelha','ingredientes','Cera de abelha · INS 901','Material produzido pelas abelhas, que pode exercer função de brilho nos usos autorizados.','“Glaceante” é uma função. Outros agentes de brilho podem ter origem vegetal.',bee,'ingrediente','ins 901 e901'),
  item('goma-laca','ingredientes','Goma-laca · INS 904','Material derivado de secreções de insetos, usado como agente de brilho em aplicações autorizadas.','O código identifica a substância. O uso permitido depende da categoria de alimento.','https://efsa.onlinelibrary.wiley.com/doi/10.2903/j.efsa.2024.8897','ingrediente','ins 904 e904 shellac'),
  item('oleo-peixe','ingredientes','Óleo de peixe','Óleo extraído de pescado, que pode aparecer em alimentos ou suplementos.','“Ômega 3” não identifica sozinho a fonte: também existem óleos de microalgas.',general,'ingrediente'),
  item('lecitina','variavel','Lecitina · INS 322','Pode ser obtida de soja, girassol ou gema de ovo, entre outras fontes.','Procure a fonte na lista ou pergunte ao fabricante qual é usada nessa formulação.','https://efsa.onlinelibrary.wiley.com/doi/10.2903/j.efsa.2017.4742','origem-variavel','ins 322 e322'),
  item('ins471','variavel','Mono e diglicerídeos · INS 471','Emulsificantes que podem ser produzidos com matérias-primas vegetais ou animais.','O código, sozinho, não comprova a origem. Solicite a especificação ao fabricante.',additives,'origem-variavel','e471 ins 471 emulsificante'),
  item('glicerina','variavel','Glicerol ou glicerina','Substância que pode ter origem vegetal, animal ou outra rota de produção.','A especificação da matéria-prima é necessária para concluir a origem.',additives,'origem-variavel'),
  item('coalho-enzimas','variavel','Coalho e enzimas coagulantes','Há coagulantes de origem animal, microbiana e produzidos por fermentação.','Pergunte qual coagulante foi usado. O leite do queijo continua sendo um ingrediente separado.',labels,'origem-variavel','quimosina'),
  item('vitamina-d3','variavel','Vitamina D3','Pode ser produzida a partir de lanolina ou de fontes não animais.','Confira a fonte e os componentes da preparação com o fabricante.','https://ods.od.nih.gov/factsheets/Vitamind-HealthProfessional/','origem-variavel','colecalciferol'),
  item('omega3','variavel','Ômega 3, DHA e EPA','Esses termos indicam ácidos graxos; óleos de peixe e de microalgas podem fornecê-los.','Confira separadamente a fonte do óleo e o material da cápsula.',labels,'origem-variavel','omega-3'),
  item('acido-lactico','variavel','Ácido lático e lactatos','Podem ser produzidos por fermentação de substratos vegetais. “Lático” é parte do nome da substância.','A palavra não comprova ingrediente de leite. Confira a composição específica.',additives,'origem-variavel','acido lactico lactato'),
  item('biscoitos','compostos','Pães, biscoitos e bolos','São famílias de alimentos cuja receita pode incluir leite, soro, manteiga, banha, ovos ou mel.','Examine massa, recheio e cobertura. A família, sozinha, não confirma os ingredientes.',labels,'receita-variavel'),
  item('confeitos','compostos','Balas, gomas e marshmallows','A receita pode usar gelatina ou outros gelificantes; alguns confeitos usam corantes e agentes de brilho.','A textura não comprova gelatina animal. Procure gelatina, pectina, carmim e outros ingredientes.',labels,'receita-variavel'),
  item('chocolates','compostos','Chocolates e bombons','A receita pode incluir leite, soro ou gordura láctea. Manteiga de cacau é vegetal.','“Amargo” não comprova ausência de leite. Confira a receita e a advertência de alergênicos.',labels,'receita-variavel'),
  item('molhos','compostos','Molhos e maionese','Conforme o produto, pode haver ovo, queijo ou pescado entre os ingredientes.','Peixe pode entrar como tempero sem pedaços visíveis. Leia a denominação e a receita.',labels,'receita-variavel','pesto molho ingles'),
  item('pratos-prontos','compostos','Pizzas, lasanhas e pratos prontos','Podem combinar ingredientes animais na massa, no recheio ou no molho.','Um prato de legumes pode conter molho com leite. Confira cada componente da receita.',labels,'receita-variavel'),
  item('homogeneizado','processos','Homogeneizado','No leite, reduz e dispersa os glóbulos de gordura. No ovo, pode descrever a mistura uniforme de clara e gema.','Não é sinônimo de pasteurizado. Leia o termo junto do alimento a que ele se refere.',law('Port7832025MAPARTLeiteUHT.pdf'),'processo'),
  item('padronizado','processos','Padronizado','Pode descrever o ajuste da composição, como a gordura do leite. Em registros, pode ter outro significado administrativo.','Queijo minas padrão, teor de gordura padronizado e produto padronizado de cadastro são contextos diferentes.',law('IN762018RTIQLeite.pdf'),'processo'),
  item('maturado','processos','Maturado','Tempo e condições controladas permitem mudanças de textura e sabor próprias do produto.','O processo ocorre em diferentes alimentos, como carnes e queijos. Não é apenas “estar velho”.',general,'processo'),
  item('fermentado-termo','processos','Fermentado','Microrganismos transformam componentes do alimento, conforme o processo específico.','Sabor ácido e embalagem não bastam para identificar qual produto fermentado está sendo vendido.',fermented,'processo'),
  item('curado-defumado','processos','Curado, salgado e defumado','Cura emprega agentes previstos; salga acrescenta sal; defumação confere características por técnica própria.','São processos diferentes. “Sabor defumado” exige conferir ingredientes e denominação.',general,'processo'),
  item('reconstituido','processos','Reconstituído e instantâneo','Reconstituir é repor água. Instantaneização facilita a dispersão do produto no preparo.','Um pó instantâneo pode ser reconstituído, mas conserva sua própria categoria de produto.',law('IN532018RTLeiteemp.pdf'),'processo'),
  item('descongelado','processos','Descongelado','Informa que o alimento esteve congelado e passou pelo descongelamento.','Não equivale a produto que nunca foi congelado. Confira as instruções de conservação.',fish,'processo'),
];

export const typeExamples=[
  ['Leite pasteurizado tipo A','“Tipo A” é uma categoria ligada à produção e ao beneficiamento na granja leiteira. Não é a classificação de gordura.'],
  ['Linguiça tipo calabresa','O regulamento distingue essa variante da calabresa. A composição e o processo devem ser conferidos para o produto específico.'],
  ['Referência a uma região','“Tipo” pode indicar a reprodução de características de uma variedade geográfica, conforme as regras e a proteção do nome.'],
];
