const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const div_images = document.getElementById('images');
const template = document.getElementById('template');
const a_download = document.getElementById('download');
const select_illustration = document.getElementById('illustration');
const p_description = document.getElementById('description');

const font_name = 'Cabin'

const input_title = document.getElementById('title');
const input_author = document.getElementById('author');

async function draw_template() {
    ctx.save();
    ctx.drawImage(template,0,0);

    ctx.fillStyle = '#0a2f5b';
    ctx.font = `bold 10px ${font_name}`;

    const author = input_author.value;
    const aw = ctx.measureText(author).width;
    const [ax1,ax2] = [10,410];
    const aTextSize = Math.min(36,(ax2-ax1)/aw*10);
    ctx.font = `bold ${aTextSize}px ${font_name}`;
    ctx.fillText(author, ax2-ctx.measureText(author).width, 330);

    const title = input_title.value;
    const lines = title.split('\n');
    const [x1,y1,x2,y2] = [40,340,460,450];
    ctx.font = `bold 10px ${font_name}`;
    const width = Math.max(...lines.map(l=>ctx.measureText(l).width));
    const textSize = Math.min((x2-x1)/width*10, (y2-y1)/lines.length);
    ctx.font = `bold ${textSize}px ${font_name}`
    const theight = ctx.measureText(lines[0]).actualBoundingBoxAscent;
    const lineGap = 1.2;
    const height = (lines.length*lineGap)*theight;
    const rwidth = Math.max(...lines.map(l=>ctx.measureText(l).width));
    lines.forEach((line,i) => {
        ctx.fillText(line,x2-rwidth,(y1+y2)/2-height/2+(i*lineGap+1)*theight);
    })

    const illustration = select_illustration.value;
    if(illustration) {
        const illustration_image = await illustrations[illustration].img;
        const ih = 230;
        const iscale = ih/illustration_image.height;
        ctx.save()
        ctx.drawImage(illustration_image,473-illustration_image.width*iscale,490,illustration_image.width*iscale, illustration_image.height*iscale);
        ctx.restore();
    }

    const u = canvas.toDataURL();
    a_download.setAttribute('href',u);
    a_download.setAttribute('download',title.replace(/\W/g,'-')+'.png');

    ctx.font = `bold 14px ${font_name}`;
    ctx.fillStyle = 'white';
    ctx.fillText('somethingorotherwhatever.com',64,790);

    ctx.restore();

    p_description.innerText = `Book cover: Didn't Graduate Texts in Mathematics. ${author}. ${title.replace('\n',' ').replace(/\s+/,' ')}. Second Edition.`+(illustration ? ` An illustration of a ${illustrations[illustration].label}.` : '');
}

document.fonts.ready.then(() => {
if(template.complete) {
    draw_template();
} else {
    template.addEventListener('load', () => draw_template());
}
});

function load_image(filename) {
    const img = document.createElement('img');
    img.setAttribute('src','images/'+filename);
    div_images.appendChild(img);
    return new Promise((resolve,reject) => {
        img.addEventListener('load', () => resolve(img));
    });
}

const illustrations = {};
[
    ['arrows.png', 'Box of arrows'],
    ['asymptotics.png', 'Bunch of curves'],
    ['combinatorics.png', 'Weird jigsaw'],
    ['paths.png', 'Hard bouldering problem'],
    ['torus.png', 'Fancy doughnut'],
].map(([filename,label]) => { 
    const option = document.createElement('option');
    option.setAttribute('value',filename);
    option.textContent = label;
    select_illustration.appendChild(option);
    illustrations[filename] = {img: load_image(filename), label};
});

input_title.addEventListener('input',draw_template);
input_author.addEventListener('input',draw_template);
select_illustration.addEventListener('input',draw_template);

function download() {
}

canvas.addEventListener('click', download)
