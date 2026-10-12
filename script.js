(function(){
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

  // ---------- Countdown ----------
  var target=new Date('2027-01-15T06:00:00+07:00').getTime();
  var cells={}; document.querySelectorAll('#count b').forEach(function(b){cells[b.dataset.k]=b;});
  function tick(){
    var d=target-Date.now();
    if(d<=0){document.getElementById('count').style.display='none';document.getElementById('countdone').style.display='block';return;}
    var s=Math.floor(d/1000);
    cells.d.textContent=Math.floor(s/86400);
    cells.h.textContent=String(Math.floor(s%86400/3600)).padStart(2,'0');
    cells.m.textContent=String(Math.floor(s%3600/60)).padStart(2,'0');
    cells.s.textContent=String(s%60).padStart(2,'0');
  }
  tick(); setInterval(tick,1000);

  // ---------- Surin guide ----------
  // ✏️ แก้/เพิ่มร้านตรงนี้ — 1 ร้าน = 1 บรรทัด {n:'ชื่อ', id:'', m:'ที่ตั้ง · เวลาเปิด', d:'คำอธิบายสั้น ๆ'} (id เว้นว่างได้)
  var G={
    'ร้านกาแฟ':[
      {n:'V/S COFFEE - SURIN',id:'ChIJLwHbRCfjGTERK34YdGSUuBU',m:'ถ.สระโบราณ · ตรงข้าม รพ.สุรินทร์ · ทุกวัน 06.00–18.00',d:'สาขาสุรินทร์ของร้านกาแฟพิเศษจากกรุงเทพฯ มีเบลนด์ประจำร้านกับซิงเกิลออริจินหมุนเวียน ชั้นสองนั่งทำงานได้ยาว ๆ'},
      {n:'Normal Surin',id:'ChIJg_zdZwDjGTERgEpWCCl7kFM',m:'ถ.กรุงศรีใน · ทุกวัน 08.00–20.00',d:'ร้านโปร่ง กระจกบานใหญ่มองเห็นสวน ขนมปังซาวร์โดว์อบเองในร้าน แสงสวย ถ่ายรูปง่าย'},
      {n:'GOODSTUFF home café',id:'ChIJJ9GONwDjGTER_XCMfSQTcwk',m:'ถ.ปัทมานนท์ · อังคาร–อาทิตย์ 08.00–16.30 · ปิดวันจันทร์',d:'คาเฟ่ในบ้านหลังสุดท้ายของหมู่บ้าน บรรยากาศเหมือนมาบ้านเพื่อน มีทั้งกาแฟและมัจฉะ เลือกระดับหวานได้'},
      {n:'Little Elephant Patisserie & Specialty Coffee Bar',id:'ChIJt-3bWGPjGTERtadVg2Oy_wM',m:'ถ.หลักเมือง · ทุกวัน 08.00–22.00',d:'ร้านขนมอบกับกาแฟพิเศษที่ตกแต่งจัดเต็ม มีอาหารทั้งไทยและตะวันตก เปิดถึงดึก เหมาะกับไปกันเป็นกลุ่ม'}
    ],
    'ร้านมัจฉะ':[
      {n:'Mushi Matcha มูชิมัทฉะ & Meditation House',id:'ChIJR_QraCHjGTER-uMMb7_cZzk',m:'ต.ในเมือง · ทุกวัน 07.00–17.30',d:'มัจฉะหลายเกรดให้เลือก เจ้าของร้านเล่าเรื่องชาได้ละเอียด มีเมนูอาหารจากวัตถุดิบท้องถิ่นด้วย'},
      {n:'H.O.M house of matcha',id:'ChIJeQaiSQDjGTERtkqAGOa9QSQ',m:'ถ.หลักเมือง · อังคาร–อาทิตย์ 11.00–21.00 · ปิดวันจันทร์',d:'นั่งดูการตีมัจฉะสด ๆ ตรงหน้า มีขนมทานคู่กัน เปิดถึงสามทุ่ม แวะหลังงานได้'},
      {n:'Sunwhite Story (Matcha)',id:'ChIJEbR1DgDjGTERs7WEEuDQXZk',m:'ซ.วัดบูรพาราม',d:'ร้านเล็กที่ขายมัจฉะอย่างเดียว ราคาเป็นมิตร อยู่ในซอยใจกลางเมือง'},
      {n:'Morning matcha',id:'ChIJOeoMUEfjGTERQGx7ZnhSAyM',m:'ต.นอกเมือง',d:'ร้านมัจฉะเล็ก ๆ ฝั่งนอกเมือง ราคาคุ้ม'}
    ],
    'ร้านอาหาร':[
      {n:'โกนขแมร์ แหนมเนืองสุรินทร์',id:'ChIJ16EkUrPjGTERgIckG5eTwTU',m:'ซ.ศรีผไทสมันต์ · อังคาร–อาทิตย์ 11.00–21.00 · ปิดวันจันทร์',d:'อาหารเวียดนามและเขมรในบ้านเก่ารีโนเวต มีเมนูพาสต้าสดในร้านเดียวกันด้วย'},
      {n:'ครัวพู่กัน',id:'ChIJAc-tv3_jGTER2bmqxu2duZU',m:'ซ.รุ่งกิจ · 10.00–20.00 · ปิดวันพุธ',d:'ร้านอาหารไทยของครอบครัว รสมือเหมือนพ่อแม่ทำให้กิน สะอาด ราคาสบาย อาหารทำสดอาจรอนิดนึง'},
      {n:'บิ๊กไบท์ Big Bite',id:'ChIJN7vKbjXiGTER3KKJEWk1NYs',m:'ถ.ศิริรัฐ · ทุกวัน 09.30–23.30',d:'ร้านอาหารไทยกลางเมือง ร้านกว้าง รับกลุ่มใหญ่ได้สบาย เปิดถึงดึก'},
      {n:'ร้านอาหารเคียงคลอง',id:'ChIJk7RQYZnjGTERSWl72U49LC4',m:'ต.นอกเมือง · ทุกวัน 10.30–20.00',d:'ร้านใหญ่หลายห้อง เด่นเรื่องปลาและอาหารทะเล ที่จอดรถเยอะ เหมาะกับมาทั้งครอบครัว'},
      {n:'ร้านอาหารไพลิน',id:'ChIJodMFjbbjGTERa5zETBn5Cbs',m:'ถ.ธนสาร · ทุกวัน 06.00–16.00',d:'ข้าวราดแกงสไตล์ไทย-จีนเจ้าดังในเมือง เปิดแต่เช้า เหมาะกับมื้อเช้าก่อนเข้างาน'}
    ],
    'ที่เที่ยว':[
      {n:'อนุสาวรีย์พระยาสุรินทร์ภักดีศรีณรงค์จางวาง (ปุม)',id:'ChIJUd5bCLHjGTERywBgliOnACU',m:'ใจกลางเมือง · เปิดตลอด',d:'วงเวียนประจำเมืองที่มีรูปปั้นช้างล้อมรอบ คนสุรินทร์มักแวะสักการะ มีร้านดอกไม้และเครื่องสักการะข้าง ๆ'},
      {n:'สวนสาธารณะสุรินทร์',id:'ChIJE6xTY1LiGTERdb_YYE8cnLA',m:'ใกล้โรงแรม · ทุกวัน 04.00–22.00',d:'สวนใหญ่ใกล้งาน มีลู่วิ่ง 2 กม. เหมาะเดินเล่นช่วงเช้าหรือเย็นก่อนกลับ'},
      {n:'พิพิธภัณฑสถานแห่งชาติ สุรินทร์',id:'ChIJf89NrmzjGTERIMfjgTCV4OQ',m:'ต.ชะเนียง · พุธ–อาทิตย์ 09.00–16.00',d:'เล่าประวัติศาสตร์และศิลปะของสุรินทร์ตั้งแต่ยุคก่อนประวัติศาสตร์ ใช้เวลาราวชั่วโมงเดียวก็ทั่ว'},
      {n:'หมู่บ้านทอผ้าไหมท่าสว่าง',id:'ChIJ0ZSos0PhGTERqJPErRuJ0xc',m:'ต.ท่าสว่าง · ราว 8 กม. จากตัวเมือง',d:'ชมการย้อมและทอผ้าไหมยกทองแบบดั้งเดิม เลือกซื้อผ้าไหมเป็นของฝากได้'},
      {n:'วนอุทยานพนมสวาย',id:'ChIJnYNPNXL6GTERoliC8BuBMN0',m:'ต.นาบัว · ราว 20 กม. · 08.30–16.30',d:'ภูเขาเตี้ย ๆ มีพระพุทธรูปใหญ่บนยอด ขึ้นไปจะเห็นวิวทุ่งกว้างรอบด้าน'},
      {n:'ปราสาทศีขรภูมิ',id:'ChIJSX13JDZCFzER9kZNzIys4Kw',m:'อ.ศีขรภูมิ · ราว 35 กม. · 07.30–18.00',d:'ปราสาทขอมอายุราวพันปีที่ยังสมบูรณ์มาก ทับหลังสลักหินงดงาม บรรยากาศเงียบสงบ'},
      {n:'หมู่บ้านช้างตากลาง',id:'ChIJYTuzj4fWGTERl-P9snitkLE',m:'อ.ท่าตูม · ราว 1 ชม. จากตัวเมือง · 08.00–17.00',d:'ชุมชนที่คนกับช้างอยู่ร่วมกันมาหลายรุ่น มีการแสดงช่วง 10.00 และ 14.00 น.'}
    ]
  };
  var tabs=document.getElementById('tabs'), panels=document.getElementById('panels');
  Object.keys(G).forEach(function(cat,i){
    var b=document.createElement('button'); b.type='button'; b.setAttribute('role','tab'); b.id='tab'+i;
    b.setAttribute('aria-controls','pan'+i); b.setAttribute('aria-selected',i===0?'true':'false'); b.tabIndex=i===0?0:-1;
    b.textContent=cat; tabs.appendChild(b);
    var ul=document.createElement('ul'); ul.className='places'; ul.id='pan'+i; ul.setAttribute('role','tabpanel'); ul.setAttribute('aria-labelledby','tab'+i); if(i)ul.hidden=true;
    G[cat].forEach(function(p){
      var li=document.createElement('li');
      var h=document.createElement('h3'); h.textContent=p.n;
      var a=document.createElement('a'); a.className='map'; a.target='_blank'; a.rel='noopener';
      a.href='https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(p.n+' Surin')+(p.id?'&query_place_id='+p.id:'');
      a.textContent='แผนที่'; a.setAttribute('aria-label','เปิดแผนที่ '+p.n);
      var m=document.createElement('div'); m.className='meta'; m.textContent=p.m;
      var d=document.createElement('p'); d.textContent=p.d;
      li.append(h,a,m,d); ul.appendChild(li);
    });
    panels.appendChild(ul);
  });
  function sel(i){
    tabs.querySelectorAll('button').forEach(function(b,j){b.setAttribute('aria-selected',j===i?'true':'false');b.tabIndex=j===i?0:-1;});
    panels.querySelectorAll('ul').forEach(function(u,j){u.hidden=j!==i;});
  }
  tabs.addEventListener('click',function(e){var b=e.target.closest('button'); if(!b)return; sel([].indexOf.call(tabs.children,b));});
  tabs.addEventListener('keydown',function(e){
    var bs=[].slice.call(tabs.children), i=bs.indexOf(document.activeElement); if(i<0)return;
    if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault(); var n=(i+(e.key==='ArrowRight'?1:-1)+bs.length)%bs.length; sel(n); bs[n].focus();}
  });

  // ---------- RSVP ----------
  var form=document.getElementById('rsvpForm');
  function attending(){return form.querySelector('input[name=attend]:checked').value==='มาแน่นอน';}
  form.addEventListener('change',function(){
    var on=attending();
    document.getElementById('attendBits').style.display=on?'':'none';
    document.getElementById('foodBit').style.display=on?'':'none';
  });
  form.addEventListener('submit',function(e){
    e.preventDefault();
    var name=document.getElementById('f-name').value.trim();
    var en=document.getElementById('e-name');
    if(!name){en.style.display='block';document.getElementById('f-name').focus();return;}
    en.style.display='none';
    var lines=['ตอบรับงานแต่ง เตเต้ & ทีม 15.01.2570','ชื่อ: '+name,'สถานะ: '+form.querySelector('input[name=attend]:checked').value];
    if(attending()){
      lines.push('จำนวน: '+(document.getElementById('f-count').value||1)+' คน');
      lines.push('ช่วงที่ร่วม: '+document.getElementById('f-part').value);
      var food=document.getElementById('f-food').value.trim(); if(food)lines.push('อาหารที่แพ้/ไม่ทาน: '+food);
    }
    var wish=document.getElementById('f-wish').value.trim(); if(wish)lines.push('ข้อความ: '+wish);
    lines.push('#TeteFormsHerTeam');
    var text=lines.join('\n');
    document.getElementById('msg').textContent=text;
    document.getElementById('lineBtn').href='https://line.me/R/share?text='+encodeURIComponent(text);
    var r=document.getElementById('result'); r.classList.add('show'); r.scrollIntoView({block:'nearest'});
    document.getElementById('copyBtn').onclick=function(){
      (navigator.clipboard?navigator.clipboard.writeText(text):Promise.reject()).then(function(){
        var c=document.getElementById('copied'); c.style.display='block';
      }).catch(function(){ var c=document.getElementById('copied'); c.textContent='คัดลอกไม่ได้ กดค้างที่ข้อความด้านบนเพื่อคัดลอกเอง'; c.style.display='block'; });
    };
  });

  // ---------- Nav highlight ----------
  var links=[].slice.call(document.querySelectorAll('.nav a'));
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){
      es.forEach(function(en){ if(en.isIntersecting){ links.forEach(function(l){ var on=l.getAttribute('href')==='#'+en.target.id; l.setAttribute('aria-current',on?'true':'false'); if(on&&l.scrollIntoView&&window.innerWidth<820){ l.parentNode.parentNode.scrollTo({left:l.offsetLeft-20,behavior:'smooth'}); } }); } });
    },{rootMargin:'-45% 0px -50% 0px'});
    links.forEach(function(l){var s=document.querySelector(l.getAttribute('href')); if(s)io.observe(s);});
  }
})();
