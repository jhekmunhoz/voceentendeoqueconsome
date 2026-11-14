const files={
  leite:'leite-uht-integral.glb',ovos:'ovos-caipiras.glb',queijo:'queijo-mussarela.glb',
  carne:'carne-bovina.glb',linguica:'linguica-toscana.glb',peixe:'file-de-salmao.glb',
};
// Coordenadas proporcionais nas imagens 2D fornecidas pela equipe.
const photoPoints={
  leite:{
    nome:[.32,.42],volume:[.39,.93],tabela:[.64,.28],ingredientes:[.58,.51],
    alergenicos:[.72,.51],conservacao:[.66,.62],validade:[.75,.94],lote:[.6,.87],
    inspecao:[.73,.77],origem:[.57,.75],fabricante:[.66,.96],
  },
  ovos:{
    nome:[.39,.24],classificacao:[.2,.54],tabela:[.56,.48],ingredientes:[.72,.4],
    alergenicos:[.91,.53],conservacao:[.62,.15],validade:[.66,.28],lote:[.41,.66],
    inspecao:[.8,.26],origem:[.8,.57],fabricante:[.7,.7],
  },
};
const trayPoints={
  nome:[.4,.22],peso:[.77,.8],especie:[.4,.28],tabela:[.62,.52],
  ingredientes:[.74,.42],alergenicos:[.93,.59],aditivos:[.87,.49],
  conservacao:[.65,.15],temperatura:[.65,.23],validade:[.48,.82],lote:[.41,.77],
  inspecao:[.83,.25],origem:[.84,.65],fabricante:[.7,.88],
};
function groups(id) {
  const identification=id==='leite'?['nome','volume']:id==='ovos'?['nome','classificacao']:id==='peixe'?['nome','especie']:['nome','peso'];
  return [
    {name:'Identificação',keys:identification},
    {name:'Nutrição e ingredientes',keys:['tabela','ingredientes','alergenicos']},
    {name:'Conservação e validade',keys:['conservacao','validade','lote']},
    {name:'Origem e inspeção',keys:['origem','inspecao','fabricante']},
  ];
}
export async function prepareImportedPackage(product) {
  const image=new Image();
  image.src=new URL('../assets/images/embalagens/'+product.id+'.webp',import.meta.url).href;
  await image.decode();
  const points=photoPoints[product.id]||trayPoints;
  const sections=groups(product.id);
  const labels=sections.map(()=>{
    const canvas=document.createElement('canvas');canvas.width=image.width;canvas.height=image.height;
    canvas.getContext('2d').drawImage(image,0,0);return canvas;
  });
  const faces=sections.map(section=>({
    name:section.name,points:section.keys.map(key=>[key,...points[key]]),
  }));
  const flatViews=faces.map(face=>({
    image,points:face.points.map(([key,u,v])=>({key,u,v})),
  }));
  const anchorFaces=faces.map((face,index)=>({
    ...face,points:face.points.map(([key,u,v])=>{
      if(product.id==='leite')return [key,(u-(index===0?.16:.51))/(index===0?.29:.25),(v-.11)/.87];
      return [key,(u-.03)/.94,(v-.03)/.9];
    }),
  }));
  return {
    id:product.id,title:product.name,imported:true,modelFile:files[product.id],
    labels,faces,anchorFaces,flatViews,
    views:sections.map((_,index)=>product.id==='leite'?[0,index===0?-.18:Math.PI-.18,0]:[1.15,-.12,0]),
  };
}
