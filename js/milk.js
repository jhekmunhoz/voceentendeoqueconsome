// u e v medem a posição no painel a partir do canto superior esquerdo.
export const faces = [
  { name: 'Frente', points: [['nome', .78, .31], ['volume', .77, .85]] },
  { name: 'Lateral direita', points: [['tabela', .8, .35], ['ingredientes', .8, .74]] },
  { name: 'Verso', points: [['validade', .8, .35], ['lote', .8, .74]] },
  { name: 'Lateral esquerda', points: [['conservacao', .8, .35], ['inspecao', .8, .74]] },
];
const labels = {
  tabela: ['Informação', 'nutricional'], ingredientes: ['Ingredientes'],
  validade: ['Validade'], lote: ['Lote'], conservacao: ['Conservação'], inspecao: ['Inspeção'],
};
export function makeLabel(index) {
  const canvas = document.createElement('canvas');
  canvas.width = 360;
  canvas.height = 650;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#fff4d8';
  ctx.fillRect(0, 0, 360, 650);
  ctx.fillStyle = '#30563e';
  ctx.fillRect(0, 0, 360, 59);
  ctx.font = 'bold 21px Arial';
  ctx.fillStyle = '#fff4d8';
  ctx.fillText('EXEMPLO EDUCATIVO', 18, 37);
  ctx.fillStyle = '#284e36';
  if (index === 0) {
    ctx.font = 'bold 78px Georgia';
    ctx.fillText('LEITE', 22, 174);
    ctx.font = 'bold 39px Georgia';
    ctx.fillText('INTEGRAL', 22, 229);
    ctx.font = '27px Arial';
    ctx.fillText('UHT', 24, 277);
    ctx.fillStyle = '#ebbf63';
    ctx.beginPath(); ctx.arc(240, 332, 35, 0, Math.PI * 2); ctx.fill();
    for (const [height, color] of [[400,'#b3c58e'],[463,'#81a371'],[530,'#49734f']]) {
      ctx.fillStyle = color;
      ctx.beginPath(); ctx.moveTo(0,height);
      ctx.bezierCurveTo(115,height-75,235,height+50,360,height-35);
      ctx.lineTo(360,650); ctx.lineTo(0,650); ctx.fill();
    }
    ctx.fillStyle = '#fff4d8'; ctx.font = 'bold 40px Georgia'; ctx.fillText('1 L',24,600);
  } else {
    for (const [row, [key]] of faces[index].points.entries()) {
      const top = 108 + row * 255;
      ctx.fillStyle = '#284e36'; ctx.font = 'bold 36px Georgia';
      labels[key].forEach((line, i) => ctx.fillText(line, 20, top + i * 40 + 38));
      ctx.fillStyle = '#acb996';
      ctx.fillRect(20, top+124, 235, 2);
      ctx.font = '20px Arial'; ctx.fillStyle = '#435743';
      ctx.fillText(key === 'inspecao' ? 'Espaço reservado' : 'Campo ilustrativo', 20, top+160);
    }
  }
  return canvas;
}
