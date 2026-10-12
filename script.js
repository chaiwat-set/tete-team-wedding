(function(){
  /* =====================================================
     ✏️ ค่าที่แก้บ่อย อยู่ตรงนี้ทั้งหมด
     ===================================================== */

  // 1) ลิงก์ Web App จาก Google Apps Script (ดูวิธีใน README) — ถ้าเว้นว่าง ฟอร์มจะให้ส่งทาง LINE แทน
  var RSVP_URL = '';

  // 2) รูปแกลเลอรี เรียงตามลำดับที่อยากให้โชว์ (ไฟล์อยู่ในโฟลเดอร์ images)
  //    ชื่อไหนยังไม่มีไฟล์ ระบบจะข้ามให้เอง
  var GALLERY = [
    'hero-sq.jpg','gallery-2.jpg','gallery-3.jpg','gallery-4.jpg','gallery-5.jpg',
    'gallery-6.jpg','gallery-7.jpg','gallery-8.jpg','gallery-9.jpg','gallery-10.jpg'
  ];

  // 3) ร้านและที่เที่ยว — 1 ร้าน = 1 บรรทัด
  //    n=ชื่อ, m=ที่ตั้ง·เวลาเปิด, d=คำอธิบาย, lat/lng=พิกัด, id=Google place id (เว้นว่างได้)
  var VENUE = {n:'Beelive Convention Hall and Hotel (Hall3)', lat:14.8765737, lng:103.5084282, id:'ChIJ54ahJO7jGTER6nCVblJdptQ'};
  var COLORS = {'ร้านกาแฟ':'#F8A56D','ร้านมัจฉะ':'#8FC46B','ร้านอาหาร':'#F08A93','ที่เที่ยว':'#6FA3DE'};
  var G={
    'ร้านกาแฟ':[
      {n:'V/S COFFEE - SURIN',lat:14.878689,lng:103.505271,id:'ChIJLwHbRCfjGTERK34YdGSUuBU',m:'ถ.สระโบราณ · ตรงข้าม รพ.สุรินทร์ · ทุกวัน 06.00–18.00',d:'สาขาสุรินทร์ของร้านกาแฟพิเศษจากกรุงเทพฯ มีเบลนด์ประจำร้านกับซิงเกิลออริจินหมุนเวียน ชั้นสองนั่งทำงานได้ยาว ๆ'},
      {n:'Normal Surin',lat:14.885415,lng:103.493343,id:'ChIJg_zdZwDjGTERgEpWCCl7kFM',m:'ถ.กรุงศรีใน · ทุกวัน 08.00–20.00',d:'ร้านโปร่ง กระจกบานใหญ่มองเห็นสวน ขนมปังซาวร์โดว์อบเองในร้าน แสงสวย ถ่ายรูปง่าย'},
      {n:'GOODSTUFF home café',lat:14.895198,lng:103.502365,id:'ChIJJ9GONwDjGTER_XCMfSQTcwk',m:'ถ.ปัทมานนท์ · อังคาร–อาทิตย์ 08.00–16.30 · ปิดวันจันทร์',d:'คาเฟ่ในบ้านหลังสุดท้ายของหมู่บ้าน บรรยากาศเหมือนมาบ้านเพื่อน มีทั้งกาแฟและมัจฉะ เลือกระดับหวานได้'},
      {n:'Little Elephant Patisserie & Specialty Coffee Bar',lat:14.88708,lng:103.482504,id:'ChIJt-3bWGPjGTERtadVg2Oy_wM',m:'ถ.หลักเมือง · ทุกวัน 08.00–22.00',d:'ร้านขนมอบกับกาแฟพิเศษที่ตกแต่งจัดเต็ม มีอาหารทั้งไทยและตะวันตก เปิดถึงดึก เหมาะกับไปกันเป็นกลุ่ม'}
    ],
    'ร้านมัจฉะ':[
      {n:'Mushi Matcha มูชิมัทฉะ & Meditation House',lat:14.875677,lng:103.487824,id:'ChIJR_QraCHjGTER-uMMb7_cZzk',m:'ต.ในเมือง · ทุกวัน 07.00–17.30',d:'มัจฉะหลายเกรดให้เลือก เจ้าของร้านเล่าเรื่องชาได้ละเอียด มีเมนูอาหารจากวัตถุดิบท้องถิ่นด้วย'},
      {n:'H.O.M house of matcha',lat:14.873084,lng:103.50411,id:'ChIJeQaiSQDjGTERtkqAGOa9QSQ',m:'ถ.หลักเมือง · อังคาร–อาทิตย์ 11.00–21.00 · ปิดวันจันทร์',d:'นั่งดูการตีมัจฉะสด ๆ ตรงหน้า มีขนมทานคู่กัน เปิดถึงสามทุ่ม แวะหลังงานได้'},
      {n:'Sunwhite Story (Matcha)',lat:14.88504,lng:103.492541,id:'ChIJEbR1DgDjGTERs7WEEuDQXZk',m:'ซ.วัดบูรพาราม',d:'ร้านเล็กที่ขายมัจฉะอย่างเดียว ราคาเป็นมิตร อยู่ในซอยใจกลางเมือง'},
      {n:'Morning matcha',lat:14.858125,lng:103.493127,id:'ChIJOeoMUEfjGTERQGx7ZnhSAyM',m:'ต.นอกเมือง',d:'ร้านมัจฉะเล็ก ๆ ฝั่งนอกเมือง ราคาคุ้ม'}
    ],
    'ร้านอาหาร':[
      {n:'โกนขแมร์ แหนมเนืองสุรินทร์',lat:14.87788,lng:103.491644,id:'ChIJ16EkUrPjGTERgIckG5eTwTU',m:'ซ.ศรีผไทสมันต์ · อังคาร–อาทิตย์ 11.00–21.00 · ปิดวันจันทร์',d:'อาหารเวียดนามและเขมรในบ้านเก่ารีโนเวต มีเมนูพาสต้าสดในร้านเดียวกันด้วย'},
      {n:'ครัวพู่กัน',lat:14.881073,lng:103.508323,id:'ChIJAc-tv3_jGTER2bmqxu2duZU',m:'ซ.รุ่งกิจ · 10.00–20.00 · ปิดวันพุธ',d:'ร้านอาหารไทยของครอบครัว รสมือเหมือนพ่อแม่ทำให้กิน สะอาด ราคาสบาย อาหารทำสดอาจรอนิดนึง'},
      {n:'บิ๊กไบท์ Big Bite',lat:14.887283,lng:103.499272,id:'ChIJN7vKbjXiGTER3KKJEWk1NYs',m:'ถ.ศิริรัฐ · ทุกวัน 09.30–23.30',d:'ร้านอาหารไทยกลางเมือง ร้านกว้าง รับกลุ่มใหญ่ได้สบาย เปิดถึงดึก'},
      {n:'ร้านอาหารเคียงคลอง',lat:14.824196,lng:103.49734,id:'ChIJk7RQYZnjGTERSWl72U49LC4',m:'ต.นอกเมือง · ทุกวัน 10.30–20.00',d:'ร้านใหญ่หลายห้อง เด่นเรื่องปลาและอาหารทะเล ที่จอดรถเยอะ เหมาะกับมาทั้งครอบครัว'},
      {n:'ร้านอาหารไพลิน',lat:14.889496,lng:103.492922,id:'ChIJodMFjbbjGTERa5zETBn5Cbs',m:'ถ.ธนสาร · ทุกวัน 06.00–16.00',d:'ข้าวราดแกงสไตล์ไทย-จีนเจ้าดังในเมือง เปิดแต่เช้า เหมาะกับมื้อเช้าก่อนเข้างาน'}
    ],
    'ที่เที่ยว':[
      {n:'อนุสาวรีย์พระยาสุรินทร์ภักดีศรีณรงค์จางวาง (ปุม)',lat:14.87842,lng:103.489533,id:'ChIJUd5bCLHjGTERywBgliOnACU',m:'ใจกลางเมือง · เปิดตลอด',d:'วงเวียนประจำเมืองที่มีรูปปั้นช้างล้อมรอบ คนสุรินทร์มักแวะสักการะ มีร้านดอกไม้และเครื่องสักการะข้าง ๆ'},
      {n:'สวนสาธารณะสุรินทร์',lat:14.874061,lng:103.500646,id:'ChIJE6xTY1LiGTERdb_YYE8cnLA',m:'ใกล้โรงแรม · ทุกวัน 04.00–22.00',d:'สวนใหญ่ใกล้งาน มีลู่วิ่ง 2 กม. เหมาะเดินเล่นช่วงเช้าหรือเย็นก่อนกลับ'},
      {n:'พิพิธภัณฑสถานแห่งชาติ สุรินทร์',lat:14.848348,lng:103.473848,id:'ChIJf89NrmzjGTERIMfjgTCV4OQ',m:'ต.ชะเนียง · พุธ–อาทิตย์ 09.00–16.00',d:'เล่าประวัติศาสตร์และศิลปะของสุรินทร์ตั้งแต่ยุคก่อนประวัติศาสตร์ ใช้เวลาราวชั่วโมงเดียวก็ทั่ว'},
      {n:'หมู่บ้านทอผ้าไหมท่าสว่าง',lat:14.955725,lng:103.472077,id:'ChIJ0ZSos0PhGTERqJPErRuJ0xc',m:'ต.ท่าสว่าง · ราว 8 กม. จากตัวเมือง',d:'ชมการย้อมและทอผ้าไหมยกทองแบบดั้งเดิม เลือกซื้อผ้าไหมเป็นของฝากได้'},
      {n:'วนอุทยานพนมสวาย',lat:14.76287,lng:103.374322,id:'ChIJnYNPNXL6GTERoliC8BuBMN0',m:'ต.นาบัว · ราว 20 กม. · 08.30–16.30',d:'ภูเขาเตี้ย ๆ มีพระพุทธรูปใหญ่บนยอด ขึ้นไปจะเห็นวิวทุ่งกว้างรอบด้าน'},
      {n:'ปราสาทศีขรภูมิ',lat:14.944501,lng:103.79877,id:'ChIJSX13JDZCFzER9kZNzIys4Kw',m:'อ.ศีขรภูมิ · ราว 35 กม. · 07.30–18.00',d:'ปราสาทขอมอายุราวพันปีที่ยังสมบูรณ์มาก ทับหลังสลักหินงดงาม บรรยากาศเงียบสงบ'},
      {n:'หมู่บ้านช้างตากลาง',lat:15.265941,lng:103.496824,id:'ChIJYTuzj4fWGTERl-P9snitkLE',m:'อ.ท่าตูม · ราว 1 ชม. จากตัวเมือง · 08.00–17.00',d:'ชุมชนที่คนกับช้างอยู่ร่วมกันมาหลายรุ่น มีการแสดงช่วง 10.00 และ 14.00 น.'}
    ]
  };
  /* ===================================================== */

  // ทดลองดูหน้าตาแต่ละช่วงเวลา: ต่อท้ายลิงก์ด้วย ?now=2027-01-15T10:00
  var q=new URLSearchParams(location.search);
  function now(){ return q.get('now') ? new Date(q.get('now')+'+07:00').getTime() : Date.now(); }

  // ---------- Gate ----------
  var gate=document.getElementById('gate');
  var opened=false;
  try{ opened=sessionStorage.getItem('opened')==='1'; }catch(e){}
  function openGate(){
    gate.classList.add('open');
    try{ sessionStorage.setItem('opened','1'); }catch(e){}
    setTimeout(function(){ gate.classList.add('gone'); },1000);
  }
  if(opened){ gate.classList.add('gone'); }
  else { document.body.style.overflow='hidden'; }
  document.getElementById('openCard').addEventListener('click',function(){
    document.body.style.overflow=''; openGate();
  });

  // ---------- Countdown: ก่อนงาน / วันงาน / หลังงาน ----------
  var START=new Date('2027-01-15T06:00:00+07:00').getTime();
  var DAY_START=new Date('2027-01-15T00:00:00+07:00').getTime();
  var DAY_END=new Date('2027-01-16T00:00:00+07:00').getTime();
  var cells={}; document.querySelectorAll('#count b').forEach(function(b){cells[b.dataset.k]=b;});
  function show(st){ document.querySelectorAll('.cd-state').forEach(function(el){ el.hidden=el.dataset.state!==st; }); }
  var timer;
  function tick(){
    var t=now();
    if(t>=DAY_END){ show('after'); document.getElementById('since').textContent=Math.floor((t-DAY_START)/86400000); clearInterval(timer); return; }
    if(t>=DAY_START){ show('today'); return; }
    show('before');
    var s=Math.floor((START-t)/1000);
    cells.d.textContent=Math.floor(s/86400);
    cells.h.textContent=String(Math.floor(s%86400/3600)).padStart(2,'0');
    cells.m.textContent=String(Math.floor(s%3600/60)).padStart(2,'0');
    cells.s.textContent=String(s%60).padStart(2,'0');
  }
  tick(); timer=setInterval(tick,1000);

  // ---------- Gallery (ปัดข้าง) ----------
  var track=document.getElementById('gTrack'), dots=document.getElementById('gDots');
  var slides=[];
  function live(){ return slides.filter(function(s){ return s.classList.contains('ok'); }); }
  function refreshDots(){
    dots.innerHTML=''; live().forEach(function(){ dots.appendChild(document.createElement('i')); });
    syncDots();
  }
  function syncDots(){
    var mid=track.scrollLeft+track.clientWidth/2, best=0, bd=1e9;
    live().forEach(function(sl,i){ var c=sl.offsetLeft+sl.offsetWidth/2-track.offsetLeft; var d=Math.abs(c-mid); if(d<bd){bd=d;best=i;} });
    [].forEach.call(dots.children,function(d,i){ d.classList.toggle('on',i===best); });
  }
  GALLERY.forEach(function(f,i){
    var fig=document.createElement('figure'); fig.className='g-slide';
    var img=new Image(); img.alt='ภาพเตเต้และทีม '+(i+1); img.decoding='async';
    img.onload=function(){ fig.classList.add('ok'); refreshDots(); };
    img.onerror=function(){ fig.remove(); slides=slides.filter(function(s){return s!==fig;}); refreshDots(); };
    img.src='images/'+f; fig.appendChild(img); track.appendChild(fig); slides.push(fig);
  });
  track.addEventListener('scroll',function(){ requestAnimationFrame(syncDots); },{passive:true});
  function step(dir){ track.scrollBy({left:dir*track.clientWidth*0.8,behavior:'smooth'}); }
  document.querySelector('.g-nav.prev').addEventListener('click',function(){step(-1);});
  document.querySelector('.g-nav.next').addEventListener('click',function(){step(1);});
  track.addEventListener('keydown',function(e){ if(e.key==='ArrowRight'){e.preventDefault();step(1);} if(e.key==='ArrowLeft'){e.preventDefault();step(-1);} });

  // ---------- Surin guide + map ----------
  function gmaps(p){ return 'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(p.n+' Surin')+(p.id?'&query_place_id='+p.id:''); }
  var map=null, layers={}, markers={};
  if(window.L){
    map=L.map('guideMap',{scrollWheelZoom:false,tap:true}).setView([VENUE.lat,VENUE.lng],13);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',{
      maxZoom:19,subdomains:'abcd',
      attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
    }).addTo(map);
    L.marker([VENUE.lat,VENUE.lng],{zIndexOffset:1000,icon:L.divIcon({className:'',html:'<div class="pin venue"></div>',iconSize:[34,34],iconAnchor:[17,34],popupAnchor:[0,-30]})})
      .addTo(map).bindPopup('<b>งานแต่งเตเต้ &amp; ทีม</b><br>'+VENUE.n+'<br><a href="'+gmaps(VENUE)+'" target="_blank" rel="noopener">เปิดใน Google Maps</a>');
  } else {
    document.getElementById('guideMap').style.display='none';
  }
  var tabs=document.getElementById('tabs'), panels=document.getElementById('panels');
  function esc(t){ var d=document.createElement('div'); d.textContent=t; return d.innerHTML; }
  Object.keys(G).forEach(function(cat,i){
    var b=document.createElement('button'); b.type='button'; b.setAttribute('role','tab'); b.id='tab'+i;
    b.setAttribute('aria-controls','pan'+i); b.setAttribute('aria-selected',i===0?'true':'false'); b.tabIndex=i===0?0:-1;
    var sw=document.createElement('span'); sw.className='sw'; sw.style.background=COLORS[cat]||'#999';
    b.append(sw,document.createTextNode(cat)); tabs.appendChild(b);
    var ul=document.createElement('ul'); ul.className='places'; ul.id='pan'+i; ul.setAttribute('role','tabpanel'); ul.setAttribute('aria-labelledby','tab'+i); if(i)ul.hidden=true;
    if(map) layers[i]=L.layerGroup();
    G[cat].forEach(function(p,j){
      var li=document.createElement('li');
      var h=document.createElement('h3');
      if(map && p.lat){
        var mk=L.marker([p.lat,p.lng],{icon:L.divIcon({className:'',html:'<div class="pin" style="background:'+(COLORS[cat]||'#999')+'"></div>',iconSize:[26,26],iconAnchor:[13,26],popupAnchor:[0,-24]})})
          .bindPopup('<b>'+esc(p.n)+'</b><br>'+esc(p.m)+'<br><a href="'+gmaps(p)+'" target="_blank" rel="noopener">เปิดใน Google Maps</a>');
        layers[i].addLayer(mk); markers[i+'-'+j]=mk;
        var nb=document.createElement('button'); nb.type='button'; nb.textContent=p.n; nb.setAttribute('aria-label','ดู '+p.n+' บนแผนที่');
        nb.addEventListener('click',function(){
          document.getElementById('guideMap').scrollIntoView({behavior:'smooth',block:'center'});
          map.flyTo([p.lat,p.lng],15,{duration:.6}); setTimeout(function(){mk.openPopup();},650);
        });
        h.appendChild(nb);
      } else { h.textContent=p.n; }
      var a=document.createElement('a'); a.className='map'; a.target='_blank'; a.rel='noopener';
      a.href=gmaps(p); a.textContent='นำทาง'; a.setAttribute('aria-label','นำทางไป '+p.n+' ด้วย Google Maps');
      var m=document.createElement('div'); m.className='meta'; m.textContent=p.m;
      var d=document.createElement('p'); d.textContent=p.d;
      li.append(h,a,m,d); ul.appendChild(li);
    });
    panels.appendChild(ul);
  });
  function showLayer(i){
    if(!map)return;
    Object.keys(layers).forEach(function(k){ map.removeLayer(layers[k]); });
    layers[i].addTo(map);
    var pts=[[VENUE.lat,VENUE.lng]]; layers[i].eachLayer(function(l){ pts.push(l.getLatLng()); });
    map.fitBounds(pts,{padding:[30,30],maxZoom:15});
  }
  function sel(i){
    tabs.querySelectorAll('button').forEach(function(b,j){b.setAttribute('aria-selected',j===i?'true':'false');b.tabIndex=j===i?0:-1;});
    panels.querySelectorAll('ul').forEach(function(u,j){u.hidden=j!==i;});
    showLayer(i);
  }
  showLayer(0);
  tabs.addEventListener('click',function(e){var b=e.target.closest('button'); if(!b)return; sel([].indexOf.call(tabs.children,b));});
  tabs.addEventListener('keydown',function(e){
    var bs=[].slice.call(tabs.children), i=bs.indexOf(document.activeElement); if(i<0)return;
    if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault(); var n=(i+(e.key==='ArrowRight'?1:-1)+bs.length)%bs.length; sel(n); bs[n].focus();}
  });

  // ---------- RSVP → Google Sheet ----------
  var form=document.getElementById('rsvpForm'), btn=document.getElementById('rsvpBtn');
  function attending(){return form.querySelector('input[name=attend]:checked').value==='มาแน่นอน';}
  form.addEventListener('change',function(){
    var on=attending();
    document.getElementById('attendBits').style.display=on?'':'none';
    document.getElementById('foodBit').style.display=on?'':'none';
  });
  function collect(){
    var on=attending();
    return {
      name:document.getElementById('f-name').value.trim(),
      attend:form.querySelector('input[name=attend]:checked').value,
      count:on?(document.getElementById('f-count').value||'1'):'0',
      part:on?document.getElementById('f-part').value:'',
      food:on?document.getElementById('f-food').value.trim():'',
      wish:document.getElementById('f-wish').value.trim()
    };
  }
  function fallback(d){
    var lines=['ตอบรับงานแต่ง เตเต้ & ทีม 15.01.2570','ชื่อ: '+d.name,'สถานะ: '+d.attend];
    if(d.attend==='มาแน่นอน'){ lines.push('จำนวน: '+d.count+' คน','ช่วงที่ร่วม: '+d.part); if(d.food)lines.push('อาหารที่แพ้/ไม่ทาน: '+d.food); }
    if(d.wish)lines.push('ข้อความ: '+d.wish);
    lines.push('#TeteFormsHerTeam');
    var text=lines.join('\n');
    document.getElementById('msg').textContent=text;
    document.getElementById('lineBtn').href='https://line.me/R/share?text='+encodeURIComponent(text);
    var r=document.getElementById('result'); r.classList.add('show'); r.scrollIntoView({block:'nearest'});
    document.getElementById('copyBtn').onclick=function(){
      (navigator.clipboard?navigator.clipboard.writeText(text):Promise.reject()).then(function(){
        document.getElementById('copied').style.display='block';
      }).catch(function(){ var c=document.getElementById('copied'); c.textContent='คัดลอกไม่ได้ กดค้างที่ข้อความด้านบนเพื่อคัดลอกเอง'; c.style.display='block'; });
    };
  }
  form.addEventListener('submit',function(e){
    e.preventDefault();
    var d=collect(), en=document.getElementById('e-name');
    if(!d.name){en.style.display='block';document.getElementById('f-name').focus();return;}
    en.style.display='none';
    document.getElementById('result').classList.remove('show');
    if(!RSVP_URL){ fallback(d); return; }
    btn.disabled=true; btn.textContent='กำลังส่ง…';
    fetch(RSVP_URL,{method:'POST',mode:'no-cors',body:new URLSearchParams(d)})
      .then(function(){
        form.hidden=true; var s=document.getElementById('sent'); s.classList.add('show'); s.scrollIntoView({block:'nearest'});
        document.getElementById('sentTitle').textContent=d.attend==='มาแน่นอน'?'ได้รับคำตอบแล้ว แล้วเจอกันนะ!':'ได้รับคำตอบแล้ว ขอบคุณที่บอกเรานะ';
      })
      .catch(function(){ fallback(d); })
      .finally(function(){ btn.disabled=false; btn.textContent='ส่งคำตอบ'; });
  });
  document.getElementById('again').addEventListener('click',function(){
    document.getElementById('sent').classList.remove('show'); form.hidden=false; document.getElementById('f-name').focus();
  });

  // ---------- Nav highlight ----------
  var links=[].slice.call(document.querySelectorAll('.nav a'));
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){
      es.forEach(function(en){ if(en.isIntersecting){ links.forEach(function(l){ var on=l.getAttribute('href')==='#'+en.target.id; l.setAttribute('aria-current',on?'true':'false'); if(on&&window.innerWidth<820){ l.parentNode.parentNode.scrollTo({left:l.offsetLeft-20,behavior:'smooth'}); } }); } });
    },{rootMargin:'-45% 0px -50% 0px'});
    links.forEach(function(l){var s=document.querySelector(l.getAttribute('href')); if(s)io.observe(s);});
  }
})();