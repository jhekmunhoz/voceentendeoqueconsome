import { themeColor } from './brand.js';
// u e v medem a posição no painel a partir do canto superior esquerdo.
export const faces = [
  { name: 'Frente', points: [['nome', .78, .31], ['volume', .77, .85]] },
  { name: 'Lateral direita', points: [['tabela', .88, .35], ['ingredientes', .88, .74], ['alergenicos', .88, .88]] },
  { name: 'Verso', points: [['validade', .8, .35], ['lote', .8, .74]] },
  { name: 'Lateral esquerda', points: [['conservacao', .8, .35], ['inspecao', .8, .74]] },
];
const labels = {
  tabela: ['Informação', 'nutricional'], ingredientes: ['Ingredientes'], alergenicos: ['Alergênicos'],
  validade: ['Validade'], lote: ['Lote'], conservacao: ['Conservação'], inspecao: ['Inspeção'],
};
export function makeLabel(index, logo) {
  const canvas = document.createElement('canvas');
  canvas.width = 360;
  canvas.height = 650;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = themeColor('--cream');
  ctx.fillRect(0, 0, 360, 650);
  ctx.fillStyle = themeColor('--brand-dark');
  ctx.fillRect(0, 0, 360, 59);
  ctx.font = 'bold 21px Arial';
  ctx.fillStyle = '#ffffff';
  ctx.fillText('EXEMPLO EDUCATIVO', 18, 37);
  ctx.fillStyle = themeColor('--ink');
  if (index === 0) {
    if (logo) ctx.drawImage(logo,77,65,206,206);
    ctx.font = 'bold 67px Georgia';
    ctx.fillText('LEITE', 22, 325);
    ctx.font = 'bold 34px Georgia';
    ctx.fillText('INTEGRAL', 22, 374);
    ctx.font = '24px Arial';
    ctx.fillText('UHT', 24, 415);
    for (const [height, color] of [[477,themeColor('--brand-light')],[532,themeColor('--brand')],[582,themeColor('--brand-dark')]]) {
      ctx.fillStyle = color;
      ctx.beginPath(); ctx.moveTo(0,height);
      ctx.bezierCurveTo(115,height-75,235,height+50,360,height-35);
      ctx.lineTo(360,650); ctx.lineTo(0,650); ctx.fill();
    }
    ctx.fillStyle = '#ffffff'; ctx.font = 'bold 40px Georgia'; ctx.fillText('1 L',24,620);
  } else {
    for (const [row, [key]] of faces[index].points.entries()) {
      const top = 108 + row * 255;
      ctx.fillStyle = themeColor('--ink'); ctx.font = 'bold 36px Georgia';
      labels[key].forEach((line, i) => ctx.fillText(line, 20, top + i * 40 + 38));
      ctx.fillStyle = themeColor('--line');
      ctx.fillRect(20, top+124, 235, 2);
      ctx.font = '20px Arial'; ctx.fillStyle = themeColor('--muted');
      ctx.fillText(key === 'inspecao' ? 'Espaço reservado' : 'Campo ilustrativo', 20, top+160);
    }
  }
  return canvas;
}
