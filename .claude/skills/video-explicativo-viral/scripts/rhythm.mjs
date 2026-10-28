import {readFileSync,readdirSync,writeFileSync} from 'node:fs';
const f2=JSON.parse(readFileSync('frames2.json'));
const out=[];
const hue=h=>{const r=parseInt(h.slice(1,3),16),g=parseInt(h.slice(3,5),16),b=parseInt(h.slice(5,7),16);const mx=Math.max(r,g,b),mn=Math.min(r,g,b);if(mx===mn)return -1;let H=mx===r?((g-b)/(mx-mn))%6:mx===g?(b-r)/(mx-mn)+2:(r-g)/(mx-mn)+4;H*=60;return H<0?H+360:H};
const fam=h=>{const x=hue(h);if(x<0)return'gris';if(x<20||x>=340)return x>=320?'magenta/rojo':'rojo/naranja';if(x<50)return'ámbar/naranja';if(x<70)return'amarillo';if(x<170)return'verde';if(x<200)return'cian';if(x<260)return'azul';if(x<340)return'magenta/rojo'};
for(const r of f2){
 const t=JSON.parse(readFileSync('trans/'+r.id+'.json'));const w=t.words;
 const y=r.ydif8;const dur=y.length/8;
 // picos: máximo local > 10 y separación >= 0.5 s
 const peaks=[];for(let i=1;i<y.length-1;i++){if(y[i]>10&&y[i]>=y[i-1]&&y[i]>=y[i+1]&&(!peaks.length||(i-peaks.at(-1))>=4))peaks.push(i)}
 const pt=peaks.map(i=>i/8);
 // inicios de frase (primera palabra tras pausa>0.35 o tras . ! ?)
 const starts=[w[0]?.start??0];for(let i=1;i<w.length;i++){if(/[.!?]$/.test(w[i-1].word)||w[i].start-w[i-1].end>0.35)starts.push(w[i].start)}
 const near=(a,b,tol)=>a.filter(x=>b.some(z=>Math.abs(x-z)<=tol)).length;
 const sync=pt.length?near(pt,starts,0.4)/pt.length:0;
 // azar: fracción de tiempo cubierta por ventanas ±0.4 s alrededor de inicios
 const cover=Math.min(1,starts.length*0.8/dur);
 const gaps=[];for(let i=1;i<pt.length;i++)gaps.push(pt[i]-pt[i-1]);
 const med=gaps.length?gaps.sort((a,b)=>a-b)[Math.floor(gaps.length/2)]:null;
 const first3=pt.filter(x=>x<3).length;
 out.push({id:r.id,dur:+dur.toFixed(0),eventosVisuales:pt.length,porMin:+(pt.length/dur*60).toFixed(1),medianaEntreEventos:med?+med.toFixed(1):null,eventosEn3s:first3,iniciosDeFrase:starts.length,syncConFrases:+sync.toFixed(2),syncAzar:+cover.toFixed(2),bg:r.bg,acentos:r.accents.map(a=>a.hex),famAcentos:[...new Set(r.accents.map(a=>fam(a.hex)))],bgClaro:parseInt(r.bg.slice(1,3),16)>150});
}
writeFileSync('rhythm.json',JSON.stringify(out,null,1));
const by={};for(const o of out){const a=o.id.includes('__')?o.id.split('__')[0]:'(5 iniciales)';(by[a]??=[]).push(o)}
const m=a=>a.reduce((s,v)=>s+v,0)/a.length;
for(const [a,xs] of Object.entries(by))console.log(a.padEnd(17),'ev/min',m(xs.map(x=>x.porMin)).toFixed(1),'mediana',m(xs.filter(x=>x.medianaEntreEventos).map(x=>x.medianaEntreEventos)).toFixed(1)+'s','ev<3s',m(xs.map(x=>x.eventosEn3s)).toFixed(1),'sync',m(xs.map(x=>x.syncConFrases)).toFixed(2),'azar',m(xs.map(x=>x.syncAzar)).toFixed(2),'| acentos',[...new Set(xs.flatMap(x=>x.famAcentos))].join(','));
const all=out;console.log('TOTAL ev/min',m(all.map(x=>x.porMin)).toFixed(1),'sync',m(all.map(x=>x.syncConFrases)).toFixed(2),'azar',m(all.map(x=>x.syncAzar)).toFixed(2),'bg oscuro',all.filter(x=>!x.bgClaro).length+'/'+all.length);
const fc={};for(const o of all)for(const f of o.famAcentos)fc[f]=(fc[f]||0)+1;console.log(fc);
