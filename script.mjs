const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const template = document.getElementById('template');

const input_title = document.getElementById('title');

function draw_template() {
  ctx.drawImage(template,0,0);

  const title = input_title.value;
  const lines = title.split('\n');
  const [x1,y1,x2,y2] = [40,340,460,450];
  ctx.font = `bold 10px sans-serif`;
  const width = Math.max(...lines.map(l=>ctx.measureText(l).width));
  const textSize = Math.min((x2-x1)/width*10, (y2-y1)/lines.length);
  ctx.font = `bold ${textSize}px sans-serif`
  const theight = ctx.measureText(lines[0]).actualBoundingBoxAscent;
  const lineGap = 1.2;
  const height = (lines.length*lineGap)*theight;
  ctx.fillStyle = '#0a2f5b';
  const rwidth = Math.max(...lines.map(l=>ctx.measureText(l).width));
  lines.forEach((line,i) => {
    ctx.fillText(line,x2-rwidth,(y1+y2)/2-height/2+(i*lineGap+1)*theight);
  })
  canvas.toBlob(blob => {
    const u = URL.createObjectUrl('blob');
    
  })
}

draw_template();

input_title.addEventListener('input',draw_template);

function download() {
}

canvas.addEventListener('click', download)