(function () {
  /* =====================================================
     ✏️ ค่าที่แก้บ่อย อยู่ตรงนี้ทั้งหมด
     ===================================================== */

  // 1) ลิงก์ Web App จาก Google Apps Script (ดูวิธีใน README) — ถ้าเว้นว่าง ฟอร์มจะให้ส่งทาง LINE แทน
  var RSVP_URL = 'https://script.google.com/macros/s/AKfycby6RrVhumHX-oaA9fVsXjwDpwLRelVyft2PpeEncWkbWjOUXeowjjAnZUuUk9h7wbE/exec';

  // 2) รูปแกลเลอรี เรียงตามลำดับที่โชว์ (ไฟล์อยู่ใน images/gallery)
  //    รูป: {src:'01', w:กว้าง, h:สูง} → ใช้ไฟล์ 01.jpg (ภาพใหญ่) และ 01-sm.jpg (ภาพเล็ก)
  //    วิดีโอ: {video:'00', ...} → ใช้ 00.mp4, 00.webm และ 00-poster.jpg
  //    w/h ใส่แค่สัดส่วนก็ได้ เช่น แนวตั้ง 2,3 แนวนอน 3,2
  var GALLERY = [
    { video: '00', w: 720, h: 1080 },
    { src: '01', w: 1333, h: 2000 },
    { src: '02', w: 2000, h: 1333 },
    { src: '03', w: 1334, h: 2000 },
    { src: '04', w: 1334, h: 2000 },
    { src: '05', w: 1334, h: 2000 },
    { src: '06', w: 1333, h: 2000 },
    { src: '07', w: 2000, h: 1334 },
    { src: '08', w: 1333, h: 2000 },
    { src: '09', w: 2000, h: 1333 },
    { src: '10', w: 2000, h: 1333 },
    { src: '11', w: 1333, h: 2000 },
    { src: '12', w: 1333, h: 2000 },
    { src: '13', w: 2000, h: 1333 },
    { src: '14', w: 2000, h: 1333 },
    { src: '15', w: 1333, h: 2000 },
    { src: '16', w: 2000, h: 1333 },
    { src: '17', w: 1333, h: 2000 },
    { src: '18', w: 2000, h: 1333 },
    { src: '19', w: 1333, h: 2000 },
    { src: '20', w: 2000, h: 1333 },
    { src: '21', w: 1333, h: 2000 },
    { src: '22', w: 1333, h: 2000 },
    { src: '23', w: 1333, h: 2000 },
    { src: '24', w: 1333, h: 2000 },
    { src: '25', w: 1333, h: 2000 },
    { src: '26', w: 2000, h: 1334 }
  ];

  // 3) ร้านและที่เที่ยว — 1 ร้าน = 1 บรรทัด
  //    รายการอยู่ใน surin-places.csv
  var VENUE = { n: 'Beelive Convention Hall and Hotel (Hall3)', lat: 14.8765737, lng: 103.5084282, id: 'ChIJ54ahJO7jGTER6nCVblJdptQ' };
  var COLORS = { 'ร้านกาแฟ': '#F8A56D', 'ร้านมัจฉะ': '#8FC46B', 'ร้านอาหาร': '#F08A93', 'ที่เที่ยว': '#6FA3DE' };
  /* ===================================================== */

  // ทดลองดูหน้าตาแต่ละช่วงเวลา: ต่อท้ายลิงก์ด้วย ?now=2027-01-15T10:00
  var q = new URLSearchParams(location.search);
  function now() { return q.get('now') ? new Date(q.get('now') + '+07:00').getTime() : Date.now(); }

  // ---------- Gate ----------
  var gate = document.getElementById('gate');
  var opened = false;
  try { opened = sessionStorage.getItem('opened') === '1'; } catch (e) { }
  function openGate() {
    gate.classList.add('open');
    try { sessionStorage.setItem('opened', '1'); } catch (e) { }
    setTimeout(function () { gate.classList.add('gone'); }, 1000);
  }
  if (opened) { gate.classList.add('gone'); }
  else { document.body.style.overflow = 'hidden'; }
  document.getElementById('openCard').addEventListener('click', function () {
    document.body.style.overflow = ''; openGate();
  });

  // ---------- Countdown: ก่อนงาน / วันงาน / หลังงาน ----------
  var START = new Date('2027-01-15T06:00:00+07:00').getTime();
  var DAY_START = new Date('2027-01-15T00:00:00+07:00').getTime();
  var DAY_END = new Date('2027-01-16T00:00:00+07:00').getTime();
  var cells = {}; document.querySelectorAll('#count b').forEach(function (b) { cells[b.dataset.k] = b; });
  var upCells = {}; document.querySelectorAll('#countUp b').forEach(function (b) { upCells[b.dataset.k] = b; });
  function fill(c, ms) {
    var s = Math.max(0, Math.floor(ms / 1000));
    c.d.textContent = Math.floor(s / 86400);
    c.h.textContent = String(Math.floor(s % 86400 / 3600)).padStart(2, '0');
    c.m.textContent = String(Math.floor(s % 3600 / 60)).padStart(2, '0');
    c.s.textContent = String(s % 60).padStart(2, '0');
  }
  function show(st) { document.querySelectorAll('.cd-state').forEach(function (el) { el.hidden = el.dataset.state !== st; }); }
  var timer;
  function tick() {
    var t = now();
    // หลังวันงาน: นับเวลาเดินหน้าต่อ นับจากเวลาเริ่มพิธี 06.00 น. วันที่ 15 ม.ค.
    if (t >= DAY_END) { show('after'); fill(upCells, t - START); return; }
    if (t >= DAY_START) { show('today'); return; }
    show('before');
    fill(cells, START - t);
  }
  tick(); timer = setInterval(tick, 1000);

  // ---------- Gallery: วนได้ไม่สิ้นสุด + ดูภาพใหญ่ ----------
  (function () {
    var N = GALLERY.length; if (!N) return;
    var stage = document.getElementById('galStage'), track = document.getElementById('galTrack');
    var countEl = document.getElementById('galCount');
    var REDUCE = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    var DIR = 'images/gallery/';
    function media(it, big) {
      if (it.video) {
        var v = document.createElement('video');
        v.muted = true; v.loop = true; v.playsInline = true; v.setAttribute('playsinline', ''); v.setAttribute('muted', '');
        v.preload = 'none'; v.poster = DIR + it.video + '-poster.jpg';
        ['webm', 'mp4'].forEach(function (t) { var so = document.createElement('source'); so.src = DIR + it.video + '.' + t; so.type = 'video/' + t; v.appendChild(so); });
        v.setAttribute('aria-label', 'วิดีโอเตเต้และทีม');
        return v;
      }
      var im = new Image(); im.decoding = 'async'; im.alt = 'ภาพเตเต้และทีม';
      im.src = DIR + it.src + (big ? '.jpg' : '-sm.jpg'); im.width = it.w; im.height = it.h;
      if (!big) im.loading = 'lazy';
      return im;
    }
    // สร้าง 3 ชุดต่อกัน เพื่อให้วนได้เนียน (ชุดกลางคือของจริง)
    var slides = [];
    for (var c = 0; c < 3; c++) {
      GALLERY.forEach(function (it, i) {
        var f = document.createElement('figure'); f.className = 'gal-slide'; f.dataset.i = i;
        if (c !== 1) f.setAttribute('aria-hidden', 'true');
        f.appendChild(media(it, false)); track.appendChild(f); slides.push(f);
      });
    }
    var cur = N, offset = 0;
    // ทุกภาพสูงเท่ากัน: คำนวณความสูงจากภาพที่กว้างที่สุด เพื่อให้ภาพแนวนอนยังไม่ล้นจอ
    var maxR = Math.max.apply(null, GALLERY.map(function (it) { return it.w / it.h; }));
    function sizes() {
      var W = stage.clientWidth, mobile = W < 640;
      var capH = Math.min(innerHeight * (mobile ? .5 : .62), mobile ? 420 : 540);
      var maxW = W * (mobile ? .9 : .7);
      var H = Math.round(Math.min(capH, maxW / maxR));
      stage.style.height = H + 'px';
      slides.forEach(function (f) {
        var it = GALLERY[f.dataset.i];
        f.style.height = H + 'px'; f.style.width = Math.round(H * it.w / it.h) + 'px';
      });
    }
    function place(anim) {
      var s = slides[cur];
      offset = stage.clientWidth / 2 - (s.offsetLeft + s.offsetWidth / 2);
      track.classList.toggle('anim', !!anim && !REDUCE);
      track.style.transform = 'translate3d(' + offset + 'px,0,0)';
      slides.forEach(function (f, k) { f.classList.toggle('on', k === cur); });
      countEl.textContent = ((cur % N) + 1) + ' / ' + N;
      playVisible();
    }
    function normalize() {
      if (cur < N || cur >= 2 * N) { cur = N + ((cur % N) + N) % N; place(false); void track.offsetWidth; }
    }
    function go(n) { normalize(); cur = Math.max(0, Math.min(3 * N - 1, cur + n)); place(true); }
    function goTo(k) { cur = k; place(true); }
    track.addEventListener('transitionend', function (e) { if (e.target === track) normalize(); });
    function playVisible() {
      slides.forEach(function (f, k) {
        var v = f.querySelector('video'); if (!v) return;
        var near = Math.abs(k - cur) <= 2;
        if (near && !lbOpen) { if (v.preload !== 'auto') { v.preload = 'auto'; } var p = v.play(); if (p && p.catch) p.catch(function () { }); }
        else v.pause();
      });
    }
    document.getElementById('galPrev').addEventListener('click', function () { go(-1); });
    document.getElementById('galNext').addEventListener('click', function () { go(1); });
    stage.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
      else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLb(cur % N); }
    });
    // ลาก/ปัด
    var drag = null;
    stage.addEventListener('pointerdown', function (e) {
      if (e.button > 0) return;
      normalize();
      drag = { x: e.clientX, y: e.clientY, t: Date.now(), dx: 0, id: e.pointerId, moved: false, target: e.target.closest('.gal-slide') };
      track.classList.remove('anim');
    });
    stage.addEventListener('pointermove', function (e) {
      if (!drag || e.pointerId !== drag.id) return;
      drag.dx = e.clientX - drag.x;
      if (!drag.moved && Math.abs(drag.dx) > 6 && Math.abs(drag.dx) > Math.abs(e.clientY - drag.y)) {
        drag.moved = true; stage.classList.add('dragging'); try { stage.setPointerCapture(drag.id); } catch (_) { }
      }
      if (drag.moved) track.style.transform = 'translate3d(' + (offset + drag.dx) + 'px,0,0)';
    });
    function endDrag(e, cancel) {
      if (!drag || (e && e.pointerId !== drag.id)) return;
      var d = drag; drag = null; stage.classList.remove('dragging');
      if (cancel) { place(true); return; }
      if (!d.moved) {
        if (d.target) { var k = slides.indexOf(d.target); if (k === cur) openLb(cur % N); else goTo(k); }
        return;
      }
      var v = d.dx / Math.max(1, Date.now() - d.t), w = slides[cur].offsetWidth + 12;
      var steps = Math.round(-d.dx / w);
      if (steps === 0 && (Math.abs(d.dx) > 40 || Math.abs(v) > .45)) steps = d.dx < 0 ? 1 : -1;
      steps = Math.max(-4, Math.min(4, steps));
      cur = Math.max(0, Math.min(3 * N - 1, cur + steps)); place(true);
    }
    stage.addEventListener('pointerup', function (e) { endDrag(e, false); });
    stage.addEventListener('pointercancel', function (e) { endDrag(e, true); });
    stage.addEventListener('dragstart', function (e) { e.preventDefault(); });

    function relayout() { sizes(); place(false); }
    relayout();
    if ('ResizeObserver' in window) new ResizeObserver(function () { relayout(); }).observe(stage);
    else window.addEventListener('resize', relayout);
    // เล่นวิดีโอเฉพาะตอนแกลเลอรีอยู่บนจอ
    var galVisible = true;
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) { galVisible = es[0].isIntersecting; if (galVisible) playVisible(); else slides.forEach(function (f) { var v = f.querySelector('video'); if (v) v.pause(); }); }, { threshold: .15 }).observe(stage);
    }

    // ---------- Lightbox ----------
    var lb = document.getElementById('lb'), lbStage = document.getElementById('lbStage'), lbCount = document.getElementById('lbCount');
    var lbOpen = false, lbI = 0, lbEl = null, lastFocus = null, busy = false;
    function preload(i) { var it = GALLERY[(i + N) % N]; if (it.src) { var im = new Image(); im.src = DIR + it.src + '.jpg'; } }
    function show(i, dir) {
      lbI = (i + N) % N;
      var el = media(GALLERY[lbI], true); el.className = 'lb-media';
      if (el.tagName === 'VIDEO') { el.preload = 'auto'; el.autoplay = true; }
      var old = lbEl; lbEl = el;
      if (dir && !REDUCE) { el.classList.add(dir > 0 ? 'from-r' : 'from-l'); }
      lbStage.appendChild(el);
      if (el.tagName === 'VIDEO') { var p = el.play(); if (p && p.catch) p.catch(function () { }); }
      if (dir && !REDUCE) { void el.offsetWidth; el.classList.remove('from-r', 'from-l'); }
      if (old) {
        if (dir && !REDUCE) { old.style.transform = ''; old.classList.add(dir > 0 ? 'to-l' : 'to-r'); setTimeout(function () { old.remove(); }, 430); }
        else old.remove();
      }
      lbCount.textContent = (lbI + 1) + ' / ' + N;
      preload(lbI + 1); preload(lbI - 1);
    }
    function lbGo(n) { if (busy) return; busy = true; setTimeout(function () { busy = false; }, REDUCE ? 0 : 280); show(lbI + n, n); }
    function openLb(i) {
      lastFocus = document.activeElement; lbOpen = true; playVisible();
      lb.hidden = false; document.body.style.overflow = 'hidden';
      lbStage.innerHTML = ''; lbEl = null; show(i, 0);
      requestAnimationFrame(function () { lb.classList.add('show'); });
      document.getElementById('lbClose').focus();
    }
    function closeLb() {
      if (!lbOpen) return; lbOpen = false;
      lb.classList.remove('show'); document.body.style.overflow = '';
      setTimeout(function () { lb.hidden = true; lbStage.innerHTML = ''; lbEl = null; }, REDUCE ? 0 : 250);
      cur = N + lbI; place(false); playVisible();
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }
    document.getElementById('lbClose').addEventListener('click', closeLb);
    document.getElementById('lbPrev').addEventListener('click', function () { lbGo(-1); });
    document.getElementById('lbNext').addEventListener('click', function () { lbGo(1); });
    lb.addEventListener('click', function (e) { if (e.target === lb || e.target === lbStage) closeLb(); });
    document.addEventListener('keydown', function (e) {
      if (!lbOpen) return;
      if (e.key === 'Escape') closeLb();
      else if (e.key === 'ArrowRight') lbGo(1);
      else if (e.key === 'ArrowLeft') lbGo(-1);
      else if (e.key === 'Tab') { // วนโฟกัสอยู่ในหน้าต่างภาพ
        var f = [].slice.call(lb.querySelectorAll('button')), a = f.indexOf(document.activeElement);
        e.preventDefault(); f[(a + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
      }
    });
    // ปัดซ้าย/ขวาเปลี่ยนภาพ ปัดลงเพื่อปิด
    var t = null;
    lbStage.addEventListener('pointerdown', function (e) { if (!lbEl) return; t = { x: e.clientX, y: e.clientY, id: e.pointerId }; lbEl.style.transition = 'none'; try { lbStage.setPointerCapture(e.pointerId); } catch (_) { } });
    lbStage.addEventListener('pointermove', function (e) {
      if (!t || e.pointerId !== t.id || !lbEl) return;
      var dx = e.clientX - t.x, dy = e.clientY - t.y;
      if (Math.abs(dy) > Math.abs(dx) && dy > 0) { lbEl.style.transform = 'translate3d(0,' + dy + 'px,0) scale(' + Math.max(.85, 1 - dy / 1200) + ')'; lb.style.background = 'rgba(9,21,40,' + Math.max(.5, .95 - dy / 600) + ')'; }
      else lbEl.style.transform = 'translate3d(' + dx + 'px,0,0)';
    });
    function lbEnd(e) {
      if (!t || e.pointerId !== t.id) return;
      var dx = e.clientX - t.x, dy = e.clientY - t.y; t = null;
      if (lbEl) { lbEl.style.transition = ''; }
      lb.style.background = '';
      if (dy > 110 && Math.abs(dy) > Math.abs(dx)) { closeLb(); return; }
      if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) { if (lbEl) lbEl.style.transform = ''; lbGo(dx < 0 ? 1 : -1); return; }
      if (lbEl) lbEl.style.transform = '';
      if (Math.abs(dx) < 6 && Math.abs(dy) < 6 && e.target === lbStage) closeLb();
    }
    lbStage.addEventListener('pointerup', lbEnd);
    lbStage.addEventListener('pointercancel', lbEnd);
  })();

  // ---------- Surin guide + map ----------
  function gmaps(p) { return 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(p.n + ' Surin') + (p.id ? '&query_place_id=' + p.id : ''); }
  function parseCSV(text) {
    var rows = [], row = [], field = '', quoted = false;
    for (var i = 0; i < text.length; i++) {
      var ch = text[i];
      if (quoted) {
        if (ch === '"' && text[i + 1] === '"') { field += '"'; i++; }
        else if (ch === '"') quoted = false;
        else field += ch;
      } else if (ch === '"' && field === '') quoted = true;
      else if (ch === ',') { row.push(field); field = ''; }
      else if (ch === '\n' || ch === '\r') {
        if (ch === '\r' && text[i + 1] === '\n') i++;
        row.push(field); rows.push(row); row = []; field = '';
      } else field += ch;
    }
    if (quoted) throw new Error('Unclosed quoted field in CSV');
    if (field !== '' || row.length) { row.push(field); rows.push(row); }
    return rows;
  }
  function placesFromCSV(text) {
    var rows = parseCSV(text), headers = rows.shift();
    if (!headers) throw new Error('CSV has no header row');
    headers = headers.map(function (value) { return value.trim(); });
    var columns = ['category', 'name', 'lat', 'lng', 'place_id', 'meta', 'description'];
    var indexes = columns.map(function (column) { return headers.indexOf(column); });
    if (indexes.some(function (index) { return index < 0; })) throw new Error('CSV is missing a required column');
    var places = {};
    rows.forEach(function (row, index) {
      if (row.length === 1 && row[0] === '') return;
      if (row.length !== headers.length) throw new Error('Invalid CSV row ' + (index + 2));
      var category = row[indexes[0]].trim(), name = row[indexes[1]].trim();
      var lat = Number(row[indexes[2]]), lng = Number(row[indexes[3]]);
      if (!category || !name || !isFinite(lat) || !isFinite(lng)) throw new Error('Invalid place data on CSV row ' + (index + 2));
      if (!places[category]) places[category] = [];
      places[category].push({
        n: name, lat: lat, lng: lng, id: row[indexes[4]].trim(),
        m: row[indexes[5]].trim(), d: row[indexes[6]].trim()
      });
    });
    if (!Object.keys(places).length) throw new Error('CSV contains no places');
    return places;
  }
  fetch('surin-places.csv')
    .then(function (response) {
      if (!response.ok) throw new Error('Could not load surin-places.csv (' + response.status + ')');
      return response.text();
    })
    .then(placesFromCSV)
    .then(function (G) {
      var map = null, layers = {}, markers = {};
      if (window.L) {
        map = L.map('guideMap', { scrollWheelZoom: false, tap: true }).setView([VENUE.lat, VENUE.lng], 13);
        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png?key=cb1_4ia9_1_4b58e88be9595ecc6f355fbe', {
          maxZoom: 19, subdomains: 'abcd',
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        }).addTo(map);
        L.marker([VENUE.lat, VENUE.lng], { zIndexOffset: 1000, icon: L.divIcon({ className: '', html: '<div class="pin venue"></div>', iconSize: [34, 34], iconAnchor: [17, 34], popupAnchor: [0, -30] }) })
          .addTo(map).bindPopup('<b>งานแต่งเตเต้ &amp; ทีม</b><br>' + VENUE.n + '<br><a href="' + gmaps(VENUE) + '" target="_blank" rel="noopener">เปิดใน Google Maps</a>');
      } else {
        document.getElementById('guideMap').style.display = 'none';
      }
      var tabs = document.getElementById('tabs'), panels = document.getElementById('panels');
      function esc(t) { var d = document.createElement('div'); d.textContent = t; return d.innerHTML; }
      Object.keys(G).forEach(function (cat, i) {
        var b = document.createElement('button'); b.type = 'button'; b.setAttribute('role', 'tab'); b.id = 'tab' + i;
        b.setAttribute('aria-controls', 'pan' + i); b.setAttribute('aria-selected', i === 0 ? 'true' : 'false'); b.tabIndex = i === 0 ? 0 : -1;
        var sw = document.createElement('span'); sw.className = 'sw'; sw.style.background = COLORS[cat] || '#999';
        b.append(sw, document.createTextNode(cat)); tabs.appendChild(b);
        var ul = document.createElement('ul'); ul.className = 'places'; ul.id = 'pan' + i; ul.setAttribute('role', 'tabpanel'); ul.setAttribute('aria-labelledby', 'tab' + i); if (i) ul.hidden = true;
        if (map) layers[i] = L.layerGroup();
        G[cat].forEach(function (p, j) {
          var li = document.createElement('li');
          var h = document.createElement('h3');
          if (map && p.lat) {
            var mk = L.marker([p.lat, p.lng], { icon: L.divIcon({ className: '', html: '<div class="pin" style="background:' + (COLORS[cat] || '#999') + '"></div>', iconSize: [26, 26], iconAnchor: [13, 26], popupAnchor: [0, -24] }) })
              .bindPopup('<b>' + esc(p.n) + '</b><br>' + esc(p.m) + '<br><a href="' + gmaps(p) + '" target="_blank" rel="noopener">เปิดใน Google Maps</a>');
            layers[i].addLayer(mk); markers[i + '-' + j] = mk;
            var nb = document.createElement('button'); nb.type = 'button'; nb.textContent = p.n; nb.setAttribute('aria-label', 'ดู ' + p.n + ' บนแผนที่');
            nb.addEventListener('click', function () {
              document.getElementById('guideMap').scrollIntoView({ behavior: 'smooth', block: 'center' });
              map.flyTo([p.lat, p.lng], 15, { duration: .6 }); setTimeout(function () { mk.openPopup(); }, 650);
            });
            h.appendChild(nb);
          } else { h.textContent = p.n; }
          var a = document.createElement('a'); a.className = 'map'; a.target = '_blank'; a.rel = 'noopener';
          a.href = gmaps(p); a.textContent = 'นำทาง'; a.setAttribute('aria-label', 'นำทางไป ' + p.n + ' ด้วย Google Maps');
          var m = document.createElement('div'); m.className = 'meta'; m.textContent = p.m;
          var d = document.createElement('p'); d.textContent = p.d;
          li.append(h, a, m, d); ul.appendChild(li);
        });
        panels.appendChild(ul);
      });
      if (map) { window.addEventListener('load', function () { map.invalidateSize(); }); if ('ResizeObserver' in window) { new ResizeObserver(function () { map.invalidateSize(); }).observe(document.getElementById('guideMap')); } }
      function showLayer(i) {
        if (!map) return;
        Object.keys(layers).forEach(function (k) { map.removeLayer(layers[k]); });
        layers[i].addTo(map);
        var pts = [[VENUE.lat, VENUE.lng]]; layers[i].eachLayer(function (l) { pts.push(l.getLatLng()); });
        map.fitBounds(pts, { padding: [30, 30], maxZoom: 15 });
      }
      function sel(i) {
        tabs.querySelectorAll('button').forEach(function (b, j) { b.setAttribute('aria-selected', j === i ? 'true' : 'false'); b.tabIndex = j === i ? 0 : -1; });
        panels.querySelectorAll('ul').forEach(function (u, j) { u.hidden = j !== i; });
        showLayer(i);
      }
      showLayer(0);
      tabs.addEventListener('click', function (e) { var b = e.target.closest('button'); if (!b) return; sel([].indexOf.call(tabs.children, b)); });
      tabs.addEventListener('keydown', function (e) {
        var bs = [].slice.call(tabs.children), i = bs.indexOf(document.activeElement); if (i < 0) return;
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); var n = (i + (e.key === 'ArrowRight' ? 1 : -1) + bs.length) % bs.length; sel(n); bs[n].focus(); }
      });
    })
    .catch(function (error) {
      console.error('Unable to load the Surin places CSV:', error);
      document.getElementById('guideMap').style.display = 'none';
      document.getElementById('panels').textContent = 'โหลดรายชื่อร้านและที่เที่ยวไม่ได้ กรุณาลองใหม่อีกครั้ง';
    });

  // ---------- RSVP → Google Sheet ----------
  var form = document.getElementById('rsvpForm'), btn = document.getElementById('rsvpBtn');
  function attending() { return form.querySelector('input[name=attend]:checked').value === 'มาแน่นอน'; }
  form.addEventListener('change', function () {
    var on = attending();
    document.getElementById('attendBits').style.display = on ? '' : 'none';
  });
  function collect() {
    var on = attending();
    return {
      name: document.getElementById('f-name').value.trim(),
      attend: form.querySelector('input[name=attend]:checked').value,
      count: on ? (document.getElementById('f-count').value || '1') : '0',
      part: on ? document.getElementById('f-part').value : '',
      wish: document.getElementById('f-wish').value.trim()
    };
  }
  function fallback(d) {
    var lines = ['ตอบรับงานแต่ง เตเต้ & ทีม 15.01.2570', 'ชื่อ: ' + d.name, 'สถานะ: ' + d.attend];
    if (d.attend === 'มาแน่นอน') { lines.push('จำนวน: ' + d.count + ' คน', 'ช่วงที่ร่วม: ' + d.part); }
    if (d.wish) lines.push('ข้อความ: ' + d.wish);
    lines.push('#TeteFormsHerTeam');
    var text = lines.join('\n');
    document.getElementById('msg').textContent = text;
    document.getElementById('lineBtn').href = 'https://line.me/R/share?text=' + encodeURIComponent(text);
    var r = document.getElementById('result'); r.classList.add('show'); r.scrollIntoView({ block: 'nearest' });
    document.getElementById('copyBtn').onclick = function () {
      (navigator.clipboard ? navigator.clipboard.writeText(text) : Promise.reject()).then(function () {
        document.getElementById('copied').style.display = 'block';
      }).catch(function () { var c = document.getElementById('copied'); c.textContent = 'คัดลอกไม่ได้ กดค้างที่ข้อความด้านบนเพื่อคัดลอกเอง'; c.style.display = 'block'; });
    };
  }
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var d = collect(), en = document.getElementById('e-name');
    if (!d.name) { en.style.display = 'block'; document.getElementById('f-name').focus(); return; }
    en.style.display = 'none';
    document.getElementById('result').classList.remove('show');
    if (!RSVP_URL) { fallback(d); return; }
    btn.disabled = true; btn.textContent = 'กำลังส่ง…';
    fetch(RSVP_URL, { method: 'POST', mode: 'no-cors', body: new URLSearchParams(d) })
      .then(function () {
        form.hidden = true; var s = document.getElementById('sent'); s.classList.add('show'); s.scrollIntoView({ block: 'nearest' });
        document.getElementById('sentTitle').textContent = d.attend === 'มาแน่นอน' ? 'ได้รับคำตอบแล้ว แล้วเจอกันนะ!' : 'ได้รับคำตอบแล้ว ขอบคุณที่บอกเรานะ';
      })
      .catch(function () { fallback(d); })
      .finally(function () { btn.disabled = false; btn.textContent = 'ส่งคำตอบ'; });
  });
  document.getElementById('again').addEventListener('click', function () {
    document.getElementById('sent').classList.remove('show'); form.hidden = false; document.getElementById('f-name').focus();
  });

  // ---------- Nav highlight ----------
  var links = [].slice.call(document.querySelectorAll('.nav a'));
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) { if (en.isIntersecting) { links.forEach(function (l) { var on = l.getAttribute('href') === '#' + en.target.id; l.setAttribute('aria-current', on ? 'true' : 'false'); if (on && window.innerWidth < 820) { l.parentNode.parentNode.scrollTo({ left: l.offsetLeft - 20, behavior: 'smooth' }); } }); } });
    }, { rootMargin: '-45% 0px -50% 0px' });
    links.forEach(function (l) { var s = document.querySelector(l.getAttribute('href')); if (s) io.observe(s); });
  }
})();