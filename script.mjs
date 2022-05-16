const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const template = document.getElementById('template');

const input_title = document.getElementById('title');

function draw_template() {
  ctx.drawImage(template,0,0);

  const title = input_title.value;
  const lines = title.split('\n');
  const [x1,y1,x2,y2] = [40,370,460,440];
  ctx.font = `bold ${textSize}px sans-serif`;
  const {width} = ctx.measureText()
  const width = Math.max(...lines.map(l=>l.length));
  const textSize = Math.min((x2-x1)/width*2, (y2-y1)/lines.length);
  ctx.fillStyle = '#0a2f5b';
  ctx.font = `bold ${textSize}px sans-serif`
  lines.forEach((line,i) => {
    ctx.fillText(line,40,371+i*36);
  })
}

draw_template();

input_title.addEventListener('input',draw_template);