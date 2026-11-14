export const nutritionImage = new URL('../assets/references/tabela-nutricional-modelo.jpg',import.meta.url).href;
export const nutritionNote = 'Modelo visual fornecido pela equipe (Nutri Mix). “000” e as células vazias são campos de preenchimento. Os valores nutricionais específicos de cada produto aguardam revisão. A imagem usa gramas; líquidos podem apresentar as quantidades em mililitros.';
export const nutritionSteps = [
  ['Porções por embalagem','Indica quantas porções há no pacote. A porção é a quantidade de referência usada na tabela.'],
  ['100 g ou 100 ml','Essa coluna ajuda a comparar alimentos semelhantes usando a mesma quantidade.'],
  ['Coluna da porção','Mostra as quantidades de energia e nutrientes na porção indicada acima da tabela.'],
  ['%VD','É o percentual do valor diário de referência fornecido pela porção. A necessidade de cada pessoa pode variar.'],
  ['Nutrientes e unidades','Observe os açúcares totais e adicionados, gorduras, proteínas, fibras e sódio. kcal indica energia; g e mg indicam quantidades.'],
];
let imagePromise;
export function loadNutrition() {
  if(!imagePromise) imagePromise=(async()=>{
    const image=new Image();image.src=nutritionImage;await image.decode();return image;
  })();
  return imagePromise;
}
export function nutritionExplanation() {
  const content=document.createElement('section');
  const link=document.createElement('a');link.href=nutritionImage;link.target='_blank';link.rel='noopener';
  const image=document.createElement('img');image.src=nutritionImage;
  image.alt='Modelo de tabela nutricional com porções, colunas por 100 g, por porção e percentual de valores diários; quantidades ainda sem preenchimento.';
  image.className='nutrition-image';
  link.append(image,document.createTextNode('Abrir modelo para ampliar ↗'));
  const note=document.createElement('p');note.textContent=nutritionNote;
  content.append(link,note);
  for(const [title,text] of nutritionSteps) {
    const heading=document.createElement('h3');heading.textContent=title;
    const paragraph=document.createElement('p');paragraph.textContent=text;content.append(heading,paragraph);
  }
  return content;
}
