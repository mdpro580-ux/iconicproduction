(function(){
var K="iconic.v1";
var FONTS=["Carlito","Segoe UI","Arial Black","Trebuchet MS","Verdana","Georgia","Impact","Tahoma","Courier New","Bebas Neue","Oswald","Orbitron","Rajdhani"];
var TH={"Neon Blue":{a:"#0a3c8f",b:"#030b22",ac:"#ffb81c",bar:"#1b6fe0",h:210},"Pink Sakura":{a:"#8f1a5e",b:"#22030f",ac:"#ffd1e8",bar:"#e0449a",h:330},"Gold":{a:"#6b4a00",b:"#140d00",ac:"#ffd54a",bar:"#d49a10",h:40},"Green":{a:"#0b6b3a",b:"#02150b",ac:"#fff04d",bar:"#17b569",h:120},"Purple":{a:"#4b1a9a",b:"#0d0422",ac:"#ffc83d",bar:"#8a4af0",h:270},"Red":{a:"#8f1111",b:"#1a0303",ac:"#ffb81c",bar:"#e02b2b",h:0},"Mint Pro":{a:"#0b6b66",b:"#021514",ac:"#ffffff",bar:"#19c4b8",h:170}};
var SEC=[["ev","EVENT NAME",1],["sub","SUB TITLE",1],["org","ORG NAME",1],["ft","FOOTER TEXT",1],["hd","TABLE HEADINGS",0],["tm","TEAM NAMES",0],["nm","NUMBERS",0]];
var COL=["#ffffff","#000000","#ffd54a","#ff9800","#ef4444","#ec4899","#a855f7","#6366f1","#3b82f6","#22d3ee","#22c55e","#86efac"];
var DB={tables:[],prof:{name:"",org:"ICONIC ESPORTS ORGANISATION"}};
try{var r0=JSON.parse(localStorage.getItem(K));if(r0&&r0.tables)DB=r0;}catch(e){}
var cur=null,tab="M",files=[],sample=null,canScan=true,msg="",cache={};
function $(i){return document.getElementById(i);}
function esc(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c];});}
function uid(){return Math.random().toString(36).slice(2,9);}
function nm(){var a=[];for(var i=0;i<12;i++)a.push({t:"",k:0});return a;}
function mk(n){var tx={ev:{t:n},sub:{t:"POINT TABLE"},org:{t:DB.prof.org},ft:{t:"PRODUCED BY"},hd:{},tm:{},nm:{}};SEC.forEach(function(s){var o=tx[s[0]];o.f="";o.s=100;o.c="";});
  return {id:uid(),name:n,upd:Date.now(),teams:[],matches:[nm()],mi:0,pp:[12,9,8,7,6,5,4,3,2,1,0,0],kp:1,d:1,t1:"Neon Blue",t2:"Red",f:"",tx:tx,im:{},lp:"Left circle",ls:125,hide:0};}
function T(){for(var i=0;i<DB.tables.length;i++)if(DB.tables[i].id===cur)return DB.tables[i];return null;}
var st=null;function save(){var t=T();if(t)t.upd=Date.now();clearTimeout(st);st=setTimeout(function(){try{localStorage.setItem(K,JSON.stringify(DB));$("sv").className="ok";$("sv").textContent="Saved ✓";}catch(e){$("sv").className="er";$("sv").textContent="সেভ হয়নি";}},300);}
function arm(b,fn){if(b.dataset.arm){fn();return;}b.dataset.arm=1;var o=b.textContent;b.textContent="নিশ্চিত?";setTimeout(function(){delete b.dataset.arm;b.textContent=o;},3000);}
function disp(t){return t.n||t.g||"";}
function tname(t,id){for(var i=0;i<t.teams.length;i++)if(t.teams[i].id===id)return t.teams[i];return null;}

/* ---------- views ---------- */
function show(v){["D","T","P","E"].forEach(function(x){$("v"+x).hidden=x!==v;});$("nav").hidden=v==="E";$("dl").hidden=v!=="E";
  document.querySelectorAll("#nav button").forEach(function(b){b.className=b.dataset.v===v?"on":"";});
  if(v==="D")rDash();if(v==="T")rTabs();if(v==="P")rProf();if(v==="E"){rM();rD();rX();draw();}
  $("sv").textContent="";window.scrollTo(0,0);}
function card(t){return '<div class="cd"><b>'+esc(t.name)+'</b><div class="mu">Updated '+new Date(t.upd).toLocaleString()+'</div><div class="bar"><button class="p" data-o="'+t.id+'">Open</button><button data-rn="'+t.id+'">Rename</button><button data-dl="'+t.id+'" style="color:var(--rd)">Delete</button></div></div>';}
function rDash(){var L=DB.tables.slice().sort(function(a,b){return b.upd-a.upd;}).slice(0,3);
  $("vD").innerHTML='<h1>Hi 👋</h1><div class="gold" style="font-size:17px;margin-bottom:12px">'+esc(DB.prof.org)+'</div><div class="cd"><h2>'+DB.tables.length+'</h2><span class="mu">Point tables</span></div><button class="p big" data-new="1">+ Make a new result</button><h2 style="margin-top:16px">Recent tables</h2>'+(L.map(card).join("")||'<p class="mu">এখনো কোনো টেবিল নেই</p>');}
function rTabs(){$("vT").innerHTML='<div class="bar"><h1 class="f" style="margin:0">My point tables</h1><button class="p" data-new="1">+ New table</button></div>'+(DB.tables.map(card).join("")||'<p class="mu">এখনো কোনো টেবিল নেই</p>');}
function rProf(){$("vP").innerHTML='<h1>Profile</h1><div class="cd"><span class="lab">আপনার নাম</span><input id="pn" value="'+esc(DB.prof.name)+'"><span class="lab">Organisation</span><input id="po" value="'+esc(DB.prof.org)+'"></div>';}
document.addEventListener("input",function(e){if(e.target.id==="pn"){DB.prof.name=e.target.value;save();}if(e.target.id==="po"){DB.prof.org=e.target.value;save();}});
function newT(){var t=mk("Table "+(DB.tables.length+1));DB.tables.push(t);cur=t.id;save();tab="M";files=[];msg="";show("E");tb();$("en").textContent=t.name;}
function openT(id){cur=id;tab="M";files=[];msg="";show("E");tb();$("en").textContent=T().name;}
function tb(){document.querySelectorAll(".tabs button").forEach(function(b){b.className=b.dataset.tab===tab?"on":"";});$("pM").hidden=tab!=="M";$("pD").hidden=tab!=="D";$("pX").hidden=tab!=="X";}
document.addEventListener("click",function(e){var b=e.target.closest("button");if(!b)return;var d=b.dataset;
  if(d.v)show(d.v);else if(d.new)newT();else if(d.o)openT(d.o);
  else if(d.rn){var t=DB.tables.filter(function(x){return x.id===d.rn;})[0];b.parentNode.parentNode.querySelector("b").outerHTML='<input id="rnI" value="'+esc(t.name)+'">';b.textContent="Save";b.dataset.rs=d.rn;delete b.dataset.rn;}
  else if(d.rs){var t2=DB.tables.filter(function(x){return x.id===d.rs;})[0];t2.name=$("rnI").value||t2.name;save();show($("vT").hidden?"D":"T");}
  else if(d.dl)arm(b,function(){DB.tables=DB.tables.filter(function(x){return x.id!==d.dl;});save();show($("vT").hidden?"D":"T");});
  else if(d.tab){tab=d.tab;tb();}
});
$("back").onclick=function(){show("T");};

/* ---------- matches pane ---------- */
function rows(){return T().matches[T().mi];}
function rM(){var t=T(),h='<div class="chips">';
  t.matches.forEach(function(m,i){h+='<button data-mi="'+i+'" class="'+(i===t.mi?"on":"")+'">🎮 Match '+(i+1)+'</button>';});
  h+='<button class="g" data-a="addm">+</button><button data-a="delm">🗑</button></div>';
  h+='<div class="cd"><h2>⚙ Submission Panel</h2><div class="bar"><label class="lb f">Choose Files 📁<input type="file" id="fi" accept="image/*" multiple></label><button class="g f" data-a="paste">Paste Image 📋</button></div>';
  h+='<div class="pb" id="pb" contenteditable="true" data-ph="এখানে ট্যাপ করে ছবি Paste করুন (চেপে ধরে → Paste)"></div><div class="mu" id="fm">'+(files.length?"✓ "+files.length+" ছবি বাছা হয়েছে":"১-৬ আর ৭-১২ এর ২টা স্ক্রিনশট দিন")+'</div><div class="bar"><button class="y f" data-a="scan" id="sb"'+(canScan?"":" disabled")+'>Ai Submit Auto ✨</button></div><div class="mu" id="sm">'+(canScan?msg:"AI স্ক্যান এখানে চালু নেই, নিজে লিখুন।")+'</div></div>';
  h+='<div class="cd"><h2>🎮 Match '+(t.mi+1)+' Entries</h2><div id="en2"></div><div class="bar"><button data-a="clr">Clear all</button></div></div>';
  h+='<div class="cd"><h2>Teams</h2><span class="lab">Match data (paste here)</span><textarea id="ta" placeholder="1. TEAM NAME: LEGEND&#10;   LEADER GAME NAME: LE NEMOX&#10;   PLAYER NAME 2: LE EAGLE EYE"></textarea><div class="bar"><button class="p" data-a="load">Load teams</button><button data-a="addt">+ Add Team</button></div><div class="mu" id="tc"></div><div id="tl"></div></div>';
  h+='<details><summary>⚙ Point system</summary><span class="lab">Placement pts (১ম থেকে)</span><input id="pp" value="'+t.pp.join(",")+'"><span class="lab">Per kill</span><input id="kp" type="number" step="0.5" value="'+t.kp+'"></details><p class="mu" id="sm2"></p>';
  $("pM").innerHTML=h;rE();rTm();}
function rE(){var t=T(),R=rows(),h="";var opts='<option value="">— team —</option>'+t.teams.map(function(x){return '<option value="'+x.id+'">'+esc(disp(x)||"(no name)")+'</option>';}).join("");
  R.forEach(function(r,i){var pl=t.pp[i]||0,tot=pl+(Number(r.k)||0)*t.kp;
    h+='<div class="row'+((r.u||(!r.t&&r.k>0))?" bad":"")+'"><span class="bg'+(i<3?" g"+(i+1):"")+'">'+(i+1)+'</span><select data-e="'+i+'" data-f="t">'+opts.replace('value="'+r.t+'"','value="'+r.t+'" selected')+'</select><input class="k" type="number" min="0" data-e="'+i+'" data-f="k" value="'+(r.k||0)+'"><span class="t">'+tot+'</span></div>';});
  $("en2").innerHTML='<div class="mu" style="margin-bottom:6px">Position · Team · Kills · Total</div>'+h;
  var ms=t.matches.length,tn=t.teams.length;$("sm2").textContent=ms+" match - "+tn+" team";}
function rTm(){var t=T(),h="",pl=0;t.teams.forEach(function(x,i){pl+=(x.l?1:0)+(x.p?1:0);
  h+='<div class="tm"><input data-t="'+i+'" data-f="n" placeholder="Team name" value="'+esc(x.n)+'"><input data-t="'+i+'" data-f="g" placeholder="TAG (short name)" value="'+esc(x.g)+'"><input data-t="'+i+'" data-f="l" placeholder="Leader game name" value="'+esc(x.l)+'"><input data-t="'+i+'" data-f="p" placeholder="Player name 2" value="'+esc(x.p)+'"><button data-a="delt" data-i="'+i+'" style="color:var(--rd)">Delete</button></div>';});
  $("tl").innerHTML=h;$("tc").textContent=t.teams.length+" team, "+pl+" player registered";}
function parse(txt){var T0=[],c=null,last="";
  txt.split(/\r?\n/).forEach(function(ln){var m;
    if(m=ln.match(/TEAM\s*NAME\s*[:：]\s*(.*)/i)){c={id:uid(),n:m[1].trim(),g:"",l:"",p:""};T0.push(c);last="n";}
    else if(c&&(m=ln.match(/LEADER[^:：]*[:：]\s*(.*)/i))){c.l=m[1].trim();last="l";}
    else if(c&&(m=ln.match(/PLAYER\s*NAME\s*2?\s*[:：]\s*(.*)/i))){c.p=m[1].trim();last="p";}
    else if(c&&ln.trim()&&!/^\s*\d+\s*[.)]/.test(ln)&&last==="p"){c.p+=" "+ln.trim();}});
  return T0.slice(0,12);}
document.addEventListener("click",function(e){var b=e.target.closest("button");if(!b||$("vE").hidden)return;var t=T(),d=b.dataset;
  if(d.mi!==undefined){t.mi=+d.mi;rM();}
  else if(d.a==="addm"){t.matches.push(nm());t.mi=t.matches.length-1;save();rM();}
  else if(d.a==="delm")arm(b,function(){if(t.matches.length>1)t.matches.splice(t.mi,1);else t.matches[0]=nm();t.mi=0;save();rM();draw();});
  else if(d.a==="clr")arm(b,function(){t.matches[t.mi]=nm();save();rE();draw();});
  else if(d.a==="choose"){$("fi").click();}
  else if(d.a==="paste"){navigator.clipboard.read().then(function(it){var p=null;it.forEach(function(x){x.types.forEach(function(ty){if(ty.indexOf("image/")===0&&!p)p=[x,ty];});});if(!p){$("fm").textContent="ক্লিপবোর্ডে ছবি নেই।";return;}p[0].getType(p[1]).then(function(bl){files.push(bl);if(files.length>2)files.shift();$("fm").textContent="✓ "+files.length+" ছবি বাছা হয়েছে";});}).catch(function(){$("fm").textContent="Paste হয়নি। নিচের বক্সে ট্যাপ করে চেপে ধরে Paste করুন।";});}
  else if(d.a==="scan")scan();
  else if(d.a==="load"){var L=parse($("ta").value);if(L.length){L.forEach(function(x){var o=t.teams.filter(function(y){return y.n&&y.n.toLowerCase()===x.n.toLowerCase();})[0];if(o){x.id=o.id;x.g=o.g;}});t.teams=L;save();rTm();rE();}else $("tc").textContent="কোনো টিম পাওয়া যায়নি, ফরম্যাট দেখুন।";}
  else if(d.a==="addt"){if(t.teams.length<12){t.teams.push({id:uid(),n:"",g:"",l:"",p:""});save();rTm();rE();}}
  else if(d.a==="delt"){var x=t.teams.splice(+d.i,1)[0];t.matches.forEach(function(m){m.forEach(function(r){if(r.t===x.id)r.t="";});});save();rTm();rE();draw();}
});
document.addEventListener("change",function(e){var el=e.target,t=T();if(!t||$("vE").hidden)return;
  if(el.id==="fi"){files=Array.prototype.slice.call(el.files).slice(0,2);el.value="";$("fm").textContent="✓ "+files.length+" ছবি বাছা হয়েছে";return;}
  if(el.dataset.e!==undefined){var r=rows()[+el.dataset.e];if(el.dataset.f==="t"){r.t=el.value;r.u=0;}else r.k=Number(el.value)||0;save();rE();draw();}
  else if(el.dataset.t!==undefined){t.teams[+el.dataset.t][el.dataset.f]=el.value;save();rTm();rE();draw();}
  else if(el.id==="pp"){var a=el.value.split(",").map(function(v){return Number(v.trim());}).filter(function(v){return !isNaN(v);});if(a.length){t.pp=a;save();rE();draw();}}
  else if(el.id==="kp"){t.kp=Number(el.value)||0;save();rE();draw();}
});
/* ---------- scan ---------- */
function nz(s){return String(s||"").normalize("NFKD").toLowerCase().replace(/[^a-z0-9]/g,"");}
function lev(a,b){var m=[],i,j;for(i=0;i<=a.length;i++)m[i]=[i];for(j=1;j<=b.length;j++)m[0][j]=j;for(i=1;i<=a.length;i++)for(j=1;j<=b.length;j++)m[i][j]=Math.min(m[i-1][j]+1,m[i][j-1]+1,m[i-1][j-1]+(a[i-1]===b[j-1]?0:1));return m[a.length][b.length];}
function same(a,b){a=nz(a);b=nz(b);if(a.length<3||b.length<3)return false;if(a===b||b.indexOf(a)>=0||a.indexOf(b)>=0)return true;return 1-lev(a,b)/Math.max(a.length,b.length)>=0.75;}
function scan(){var t=T();if(!files.length){$("sm").textContent="আগে ছবি বাছুন।";return;}
  var sb=$("sb");sb.disabled=true;$("sm").className="mu";$("sm").textContent="স্ক্যান হচ্ছে… কয়েক সেকেন্ড লাগবে।";
  sample.json('These are screenshots of a Free Fire squad match result screen. Each placement (rank 1 to 12) shows 4 players with their Eliminations. Return ONLY a JSON array: [{"rank":1,"players":[{"name":"exact player name","kills":8}]}]. Include only ranks fully visible. Copy player names exactly as shown.',{images:files,modelTier:"default"}).then(function(res){
    var arr=Array.isArray(res)?res:(res&&res.rows)||[];var R=nm(),got=0,bad=0;
    arr.forEach(function(x){var i=(Number(x.rank)||0)-1;if(i<0||i>11||!x.players)return;var kills=0,id="";
      x.players.forEach(function(p){kills+=Number(p.kills)||0;});
      t.teams.forEach(function(tm){if(id)return;x.players.forEach(function(p){if(!id&&((tm.l&&same(tm.l,p.name))||(tm.p&&same(tm.p,p.name))))id=tm.id;});});
      R[i]={t:id,k:kills,u:id?0:1};got++;if(!id)bad++;});
    if(!got)throw {code:"empty"};
    t.matches[t.mi]=R;save();rE();draw();$("sm").className=bad?"er":"ok";$("sm").textContent=got+" পজিশন পাওয়া গেছে"+(bad?", "+bad+"টা টিম মেলেনি (লাল দাগ), নিজে বেছে নিন।":"।");msg=$("sm").textContent;sb.disabled=false;
  }).catch(function(e){$("sm").className="er";$("sm").textContent=e&&e.code==="not_granted"?"অনুমতি দেওয়া হয়নি।":e&&e.code==="rate_limited"?"একটু পরে চেষ্টা করুন।":"স্ক্যান হয়নি। পরিষ্কার স্ক্রিনশট দিন।";sb.disabled=false;});}

/* ---------- design & text panes ---------- */
function opt(list,v,first){return (first?'<option value="">'+first+'</option>':"")+list.map(function(x){return '<option'+(x===v?" selected":"")+'>'+x+'</option>';}).join("");}
function rD(){var t=T(),k=t.d===1?"t1":"t2",h='<div class="cd"><h2>Design</h2><div class="bar"><button class="f '+(t.d===1?"on":"")+'" data-d="1">Design 1</button><button class="f '+(t.d===2?"on":"")+'" data-d="2">Design 2</button></div><div class="mu">'+(t.d===1?"Design 1 - Free Fire Blue/Gold":"Design 2 - Black & Red")+'</div><span class="lab">Color theme</span><div class="bar">';
  Object.keys(TH).forEach(function(n){h+='<button data-th="'+n+'" class="'+(t[k]===n?"on":"")+'">'+n+'</button>';});
  h+='</div><span class="lab">Main font</span><select id="mf">'+opt(FONTS,t.f,"Design default")+'</select>';
  [["org","Org logo"],["game","Game logo"],["bg","Background"],["char","Character"]].forEach(function(s){h+='<span class="lab">'+s[1]+(t.im[s[0]]?" ✓":"")+'</span><div class="bar"><input type="file" accept="image/*" data-im="'+s[0]+'" class="f"><div class="pb f" contenteditable="true" data-pi="'+s[0]+'" data-ph="অথবা এখানে Paste করুন"></div>'+(t.im[s[0]]?'<button data-rm="'+s[0]+'" style="color:var(--rd)">Remove</button>':"")+'</div>';});
  h+='<span class="lab">Logo position</span><select id="lp">'+opt(["Left circle","Left","Center"],t.lp)+'</select><span class="lab">Logo size: <b id="lsv">'+t.ls+'</b></span><input type="range" id="ls" min="60" max="260" value="'+t.ls+'"></div>';
  $("pD").innerHTML=h;}
function rX(){var t=T(),h='<div class="cd"><h2>Edit text</h2><div class="mu">প্রতিটা অংশের লেখা, ফন্ট, সাইজ ও রঙ বদলান।</div></div>';
  SEC.forEach(function(s){var o=t.tx[s[0]];h+='<details><summary>'+s[1]+'</summary>'+(s[2]?'<span class="lab">Text</span><input data-x="'+s[0]+'" data-p="t" value="'+esc(o.t)+'">':"")+'<span class="lab">Font</span><select data-x="'+s[0]+'" data-p="f">'+opt(FONTS,o.f,"Design default")+'</select><span class="lab">Size: '+o.s+'%</span><input type="range" min="50" max="200" value="'+o.s+'" data-x="'+s[0]+'" data-p="s"><span class="lab">Color (blank = auto)</span><input data-x="'+s[0]+'" data-p="c" value="'+esc(o.c)+'" placeholder="#ffffff"><div>';
    COL.forEach(function(c){h+='<button class="sw" style="background:'+c+'" data-x="'+s[0]+'" data-c="'+c+'"></button>';});h+='<button data-x="'+s[0]+'" data-c="">auto</button></div></details>';});
  $("pX").innerHTML=h;}
document.addEventListener("click",function(e){var b=e.target.closest("button");if(!b||$("vE").hidden)return;var t=T(),d=b.dataset;
  if(d.d){t.d=+d.d;save();rD();draw();}else if(d.th){t[t.d===1?"t1":"t2"]=d.th;save();rD();draw();}
  else if(d.rm){delete t.im[d.rm];save();rD();draw();}
  else if(d.x&&d.c!==undefined){t.tx[d.x].c=d.c;save();var inp=b.parentNode.parentNode.querySelector('input[data-p="c"]');inp.value=d.c;draw();}});
document.addEventListener("input",function(e){var el=e.target,t=T();if(!t||$("vE").hidden)return;
  if(el.dataset.x&&el.dataset.p){var v=el.value;t.tx[el.dataset.x][el.dataset.p]=el.dataset.p==="s"?+v:v;if(el.dataset.p==="s")el.previousElementSibling.textContent="Size: "+v+"%";save();draw();}
  else if(el.id==="ls"){t.ls=+el.value;$("lsv").textContent=el.value;save();draw();}});
document.addEventListener("change",function(e){var el=e.target,t=T();if(!t||$("vE").hidden)return;
  if(el.id==="mf"){t.f=el.value;save();draw();}else if(el.id==="lp"){t.lp=el.value;save();draw();}
  else if(el.dataset.x&&el.dataset.p==="f"){t.tx[el.dataset.x].f=el.value;save();draw();}
  else if(el.dataset.im&&el.files[0]){var k=el.dataset.im,mx={org:320,game:480,bg:1100,char:800}[k],f=el.files[0],im=new Image(),u=URL.createObjectURL(f);
    im.onload=function(){var s=Math.min(1,mx/Math.max(im.width,im.height)),c=document.createElement("canvas");c.width=im.width*s;c.height=im.height*s;c.getContext("2d").drawImage(im,0,0,c.width,c.height);t.im[k]=c.toDataURL(k==="bg"?"image/jpeg":"image/png",.85);URL.revokeObjectURL(u);save();rD();draw();};im.src=u;}});
document.querySelectorAll(".tabs button").forEach(function(b){b.onclick=function(){tab=b.dataset.tab;tb();};});
$("hide").onclick=function(){var t=T();t.hide=t.hide?0:1;$("pw").hidden=!!t.hide;$("hide").textContent=t.hide?"Show":"Hide";};

/* ---------- drawing ---------- */
function img(src){if(!src)return null;var c=cache[src];if(!c){c=cache[src]=new Image();c.onload=function(){draw();};c.src=src;}return c.complete&&c.naturalWidth?c:null;}
function overall(t){var m={};t.matches.forEach(function(R){R.forEach(function(r,i){if(!r.t)return;var x=m[r.t]||(m[r.t]={id:r.t,g:0,w:0,p:0,k:0});x.g++;if(i===0)x.w++;x.p+=t.pp[i]||0;x.k+=Number(r.k)||0;});});
  var L=Object.keys(m).map(function(k){var x=m[k];x.t=x.p+x.k*t.kp;x.kp=x.k*t.kp;var tm=tname(t,x.id);x.n=tm?disp(tm):"?";return x;});
  L.sort(function(a,b){return b.t-a.t||b.w-a.w||b.k-a.k;});return L;}
function fnt(t,key,w,px,def){var o=t.tx[key],f=o.f||t.f||def;return w+" "+Math.round(px*(o.s||100)/100)+'px "'+f+'",Arial,sans-serif';}
function col(t,key,def){return t.tx[key].c||def;}
function fit(c,s,x,y,w,al){c.textAlign=al||"left";c.fillText(s,x,y,w);}
function logos(c,t,W,sc,topY,gx){var ls=t.ls*sc,o=img(t.im.org),g=img(t.im.game),lx=t.lp==="Center"?(W-ls)/2:20*sc;
  if(o){c.save();if(t.lp==="Left circle"){c.beginPath();c.arc(lx+ls/2,topY+ls/2,ls/2,0,7);c.clip();}c.drawImage(o,lx,topY,ls,ls*o.naturalHeight/o.naturalWidth);c.restore();}
  if(g){var gw=Math.min(220*sc,g.naturalWidth),gh=gw*g.naturalHeight/g.naturalWidth;c.drawImage(g,gx-gw,topY,gw,gh);}
  var L=img(LOGO);if(L){c.save();c.beginPath();c.arc(20*sc+36*sc,0,0,0,0);c.restore();}}
function comp(c,sc,H){var L=img(LOGO);if(!L)return;var s=72*sc;c.save();c.beginPath();c.arc(20*sc+s/2,H-s/2-16*sc,s/2,0,7);c.clip();c.drawImage(L,20*sc,H-s-16*sc,s,s);c.restore();}
function d1(c,t,W,H){var P=TH[t.t1],L=overall(t),dF="Arial Black";
  var g=c.createLinearGradient(0,0,0,H);g.addColorStop(0,P.a);g.addColorStop(1,P.b);c.fillStyle=g;c.fillRect(0,0,W,H);
  var bg=img(t.im.bg);if(bg){var s=Math.max(W/bg.naturalWidth,H/bg.naturalHeight);c.globalAlpha=.55;c.drawImage(bg,(W-bg.naturalWidth*s)/2,(H-bg.naturalHeight*s)/2,bg.naturalWidth*s,bg.naturalHeight*s);c.globalAlpha=1;}
  var ch=img(t.im.char);if(ch){var h=700,w=h*ch.naturalWidth/ch.naturalHeight;c.drawImage(ch,W-w+40,500-h*0.55,w,h);}
  c.fillStyle=P.ac;c.beginPath();c.moveTo(W*.45,H);c.lineTo(W,H-70);c.lineTo(W,H);c.fill();
  logos(c,t,W,1,40,W-40);
  c.fillStyle=col(t,"ev","#fff");c.font=fnt(t,"ev","900",74,dF);fit(c,t.tx.ev.t.toUpperCase(),80,350,760);
  c.fillStyle=col(t,"sub",P.ac);c.font=fnt(t,"sub","900",38,dF);fit(c,t.tx.sub.t.toUpperCase(),80,410,760);
  var hy=475,cx=[560,645,730,820,950],hd=["BOOYAH!","GAMES","PLACEMENT","ELIMS","TOTAL"];
  c.fillStyle="#fff";c.fillRect(500,hy-30,500,44);
  c.fillStyle=col(t,"hd","#fff");c.font=fnt(t,"hd","800",20,dF);fit(c,"RANK",85,hy,100);c.fillStyle=col(t,"hd",P.ac);fit(c,"TEAMS",175,hy,200);
  c.fillStyle=col(t,"hd","#0a2a66");c.font=fnt(t,"hd","800",14,dF);hd.forEach(function(x,i){fit(c,x,cx[i],hy-2,90,"center");});
  for(var i=0;i<12;i++){var y=500+i*64,r=L[i];
    c.fillStyle=P.ac;c.fillRect(80,y,70,58);c.fillStyle="#10204a";c.font=fnt(t,"nm","800",28,dF);fit(c,(i<9?"0":"")+(i+1),115,y+40,66,"center");
    var gg=c.createLinearGradient(150,0,500,0);gg.addColorStop(0,"#0b1d52");gg.addColorStop(1,P.bar);c.fillStyle=gg;c.fillRect(150,y,350,58);
    c.fillStyle="#fff";c.fillRect(510,y,380,58);c.fillStyle=P.bar;c.fillRect(900,y,100,58);
    if(r){c.fillStyle=col(t,"tm","#fff");c.font=fnt(t,"tm","800",28,dF);fit(c,r.n.toUpperCase(),170,y+40,320);
      c.fillStyle=col(t,"nm","#0a2a66");c.font=fnt(t,"nm","800",28,"Arial");[ "x"+r.w,r.g,r.p,r.k].forEach(function(v,j){fit(c,String(v),[550,645,730,820][j]+ (j===0?0:0),y+40,80,"center");});
      c.fillStyle="#fff";c.font=fnt(t,"nm","900",32,"Arial");fit(c,String(Math.round(r.t*10)/10),950,y+41,90,"center");}}
  c.fillStyle="#fff";c.font=fnt(t,"ft","600",20,"Arial");fit(c,t.tx.ft.t.toUpperCase()+" ",120,H-58,300);var w2=c.measureText(t.tx.ft.t.toUpperCase()+" ").width;
  c.fillStyle=col(t,"org","#fff");c.font=fnt(t,"org","800",30,dF);fit(c,t.tx.org.t.toUpperCase(),120+w2+6,H-56,700);comp(c,1,H);}
function d2(c,t,W,H){var P=TH[t.t2],L=overall(t),tp=img(T2);
  if(tp){c.save();c.filter="hue-rotate("+P.h+"deg)";c.drawImage(tp,0,0,790,992);c.restore();}else{c.fillStyle="#111";c.fillRect(0,0,790,992);}
  var bg=img(t.im.bg);if(bg){var s=Math.max(790/bg.naturalWidth,992/bg.naturalHeight);c.globalAlpha=.25;c.drawImage(bg,0,0,bg.naturalWidth*s,bg.naturalHeight*s);c.globalAlpha=1;}
  var ch=img(t.im.char);if(ch){var h=420,w=h*ch.naturalWidth/ch.naturalHeight;c.drawImage(ch,790-w,992-h-60,w,h);}
  logos(c,t,790,0.7,28,760);
  c.fillStyle=col(t,"ev","#fff");c.font=fnt(t,"ev","700",40,"Orbitron");fit(c,t.tx.ev.t.toUpperCase(),395,110,700,"center");
  c.fillStyle=col(t,"sub","#ff2a44");c.font=fnt(t,"sub","700",20,"Orbitron");fit(c,t.tx.sub.t.toUpperCase(),395,145,700,"center");
  var Y=[320,365,410,455,499,544,588,631,675,718,760,802,843];
  for(var i=0;i<12;i++){var r=L[i],y=Y[i]+7;c.fillStyle="#fff";c.font=fnt(t,"nm","700",18,"Orbitron");fit(c,String(i+1),168,y,50,"center");
    if(r){c.fillStyle=col(t,"tm","#fff");c.font=fnt(t,"tm","700",17,"Orbitron");fit(c,r.n.toUpperCase(),215,y,215);
      c.fillStyle=col(t,"nm","#fff");c.font=fnt(t,"nm","700",17,"Orbitron");[r.w,r.p,r.k,Math.round(r.t*10)/10].forEach(function(v,j){fit(c,String(v),[446,505,563,621][j],y,50,"center");});}}
  c.fillStyle=col(t,"ft","#cfd3e6");c.font=fnt(t,"ft","600",14,"Rajdhani");fit(c,t.tx.ft.t.toUpperCase()+" "+t.tx.org.t.toUpperCase(),395,935,700,"center");comp(c,.7,992);}
var cv=document.createElement("canvas"),dt=null;
function render(){var t=T();if(!t)return;var d1m=t.d===1,sc=d1m?1:1.5,W=d1m?1080:790,H=d1m?1380:992;cv.width=W*sc;cv.height=H*sc;var c=cv.getContext("2d");c.scale(sc,sc);(d1m?d1:d2)(c,t,W,H);$("pv").src=cv.toDataURL("image/jpeg",.9);}
function draw(){clearTimeout(dt);dt=setTimeout(function(){try{render();}catch(e){}},120);}
$("dlb").onclick=function(){render();cv.toBlob(function(b){var m=$("sv");m.className="mu";claude.use("downloads").then(function(d){if(!d)throw 0;return d.save({filename:(T().name||"table")+".png",data:b});}).then(function(){m.className="ok";m.textContent="ডাউনলোড শুরু ✓";}).catch(function(){m.textContent="ডাউনলোড না হলে প্রিভিউ ছবি চেপে ধরে Save দিন।";});},"image/png");};
function imUp(k,f){var t=T(),mx={org:320,game:480,bg:1100,char:800}[k],im=new Image(),u=URL.createObjectURL(f);im.onload=function(){var s=Math.min(1,mx/Math.max(im.width,im.height)),c=document.createElement("canvas");c.width=im.width*s;c.height=im.height*s;c.getContext("2d").drawImage(im,0,0,c.width,c.height);t.im[k]=c.toDataURL(k==="bg"?"image/jpeg":"image/png",.85);URL.revokeObjectURL(u);save();rD();draw();};im.src=u;}
document.addEventListener("paste",function(e){var el=e.target,cd=e.clipboardData,f=null;if(!cd)return;Array.prototype.forEach.call(cd.files||[],function(x){if(!f&&x.type.indexOf("image/")===0)f=x;});if(!f)Array.prototype.forEach.call(cd.items||[],function(it){if(!f&&it.type.indexOf("image/")===0)f=it.getAsFile();});if(!f||!(el.classList&&el.classList.contains("pb")))return;e.preventDefault();if(el.id==="pb"){files.push(f);if(files.length>2)files.shift();$("fm").textContent="✓ "+files.length+" ছবি বাছা হয়েছে";}else if(el.dataset.pi)imUp(el.dataset.pi,f);});
$("hl").src=LOGO;
(async function(){try{sample=await claude.use("sample");if(sample){var l=await sample.limits();canScan=!!(l&&l.images);}}catch(e){}if(!$("vE").hidden)rM();})();
try{FONTS.slice(9).forEach(function(f){document.fonts.load('700 20px "'+f+'"').then(draw);});}catch(e){}
img(LOGO);img(T2);
show("D");
})();
