// Posições em metros no GLB original. Os painéis acompanham o mesmo grupo do modelo.
export const eggSurfaces = [
  { position:[0,.044,.0558], width:.12, height:.017, rotation:[0,0,0] },
  { position:[.0786,.043,0], width:.078, height:.019, rotation:[0,Math.PI/2,0] },
  { position:[0,.0001,0], width:.132, height:.085, rotation:[Math.PI/2,0,0] },
  { position:[-.0786,.043,0], width:.078, height:.019, rotation:[0,-Math.PI/2,0] },
  { position:[.028,.0636,0], width:.061, height:.077, rotation:[-Math.PI/2,0,0] },
];
export const eggViews = [
  [.38,-.18,0], [.28,-Math.PI/2,0], [-Math.PI/2,0,0],
  [.28,Math.PI/2,0], [Math.PI/2,0,0],
];
export const eggFaces = [
  {name:'Frente',points:[['validade',.18,.45],['lote',.82,.65]]},
  {name:'Lateral direita',points:[['conservacao',.18,.45],['origem',.82,.65]]},
  {name:'Verso (base)',points:[['tabela',.86,.38],['fabricante',.15,.85],['inspecao',.86,.93]]},
  {name:'Lateral esquerda',points:[]},
  {name:'Superior',points:[['nome',.18,.42],['classificacao',.82,.76]]},
];

let flatViewsPromise;
export function loadEggViews() {
  if(!flatViewsPromise) {
    flatViewsPromise=(async()=>{
      const base=new URL('../assets/images/ovos-vistas/',import.meta.url);
      const response=await fetch(new URL('positions.json',base));
      if(!response.ok)throw new Error('Não foi possível carregar as vistas dos ovos.');
      const views=await response.json();
      return Promise.all(views.map(async view=>{
        const image=new Image();image.src=new URL(view.image,base).href;await image.decode();
        return {...view,image};
      }));
    })().catch(error=>{flatViewsPromise=null;throw error;});
  }
  return flatViewsPromise;
}

export function makeEggLabels(labels,product,logo) {
  const result=[labels[2],labels[1],labels[2],labels[3],labels[0]];
  // Etiquetas estreitas das laterais preservam as proporções dos caracteres.
  for(const [index,first,second] of [[0,'Validade','Lote'],[1,'Conservação','Procedência']]) {
    const canvas=document.createElement('canvas');
    canvas.width=768;canvas.height=Math.round(768*eggSurfaces[index].height/eggSurfaces[index].width);
    const c=canvas.getContext('2d');c.fillStyle='#fffdf6';c.fillRect(0,0,canvas.width,canvas.height);
    c.fillStyle='#17265a';c.font='bold 23px Arial';c.fillText(first+' • em revisão',14,36);c.fillText(second+' • em revisão',400,canvas.height-18);
    c.font='17px Arial';c.fillText('EXEMPLO EDUCATIVO',14,canvas.height-14);
    result[index]=canvas;
  }
  const top=document.createElement('canvas');top.width=488;top.height=616;
  const c=top.getContext('2d');c.fillStyle='#fffdf6';c.fillRect(0,0,488,616);
  c.fillStyle='#17265a';c.font='bold 60px Georgia';c.fillText('OVOS',32,255);
  c.font='bold 27px Arial';c.fillText('EXEMPLO EDUCATIVO',32,310);
  c.font='25px Arial';c.fillText('Classificação',32,430);c.fillText('Aguardando referência',32,470);
  c.font='21px Arial';c.fillText('Conteúdo em revisão',32,565);
  result[4]=top;
  return result;
}
