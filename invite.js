/* ---------- turn DETAILS + VARIANT into the page ---------- */
(function () {
  const D = window.DETAILS, V = window.VARIANT || { first: 'nishtha', days: 'both' };
  const a = D.people[V.first], b = D.people[V.first === 'nishtha' ? 'akshay' : 'nishtha'];
  const days = V.days === 'both' ? D.days : D.days.filter(d => d.wedding);
  const both = days.length > 1;
  const sideKey = V.first === 'nishtha' ? 'bride' : 'groom';
  const side = D.blessings[sideKey] || [];
  const L = Object.assign({ title: D.loveFrom.title }, D.loveFrom[sideKey] || {});
  L.photos = L.photos || [];

  window.INVITE = {
    first: a.name, second: b.name,
    firstParents: a.parents, secondParents: b.parents,
    groom: D.people.akshay.name, bride: D.people.nishtha.name,
    couple: `${a.name} & ${b.name}`, initials: D.monogram || `${a.name[0]}&${b.name[0]}`,
    invocation: D.invocation, inviteLine: D.inviteLine, message: D.message, galleryTitle: D.galleryTitle,
    heroLabel: both ? 'Wedding Celebrations' : 'Wedding Day',
    heroDate: D.dateShort, dateLine: D.dateLong,
    countTitle: D.countdown.title, countNote: D.countdown.note,
    dateTime: D.dateTime, endTime: D.end,
    venue: days.find(d => d.wedding).venue,
    music: D.music, musicStart: D.musicStart, musicVolume: D.musicVolume,
    ganesh: D.ganesh, coupleArt: D.coupleArt, invitePhoto: D.invitePhoto, photos: D.photos, familyPhotos: L.photos,
    faviconBg: '#8c6a52', burstColors: ['#e8c9b4', '#c9a35c', '#f6e3cf', '#e2a7a0', '#ffffff']
  };

  /* envelope paper and wax seal */
  document.querySelectorAll('[data-cover]').forEach(el => {
    const src = (D.cover || {})[el.dataset.cover];
    if (!src) return;
    if (el.tagName === 'IMG') el.src = src; else el.style.backgroundImage = `url("${src}")`;
  });

  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  /* the functions, day by day — events marked for the other side are left out */
  document.getElementById('days').innerHTML = days.map(d => {
    const evts = d.events.filter(e => !e.side || e.side === sideKey);
    return `
    <article class="day rv">
      <header><span class="dl">${esc(both ? d.label : 'The Wedding Day')}</span><span class="dd">${esc(d.date)}</span></header>
      ${evts.map(e => `
        <div class="evt">
          <span class="ic" aria-hidden="true">${e.icon}</span>
          <div><h4>${esc(e.title)}</h4><p class="tm">${esc(e.time)}</p>${e.text ? `<p class="tx">${esc(e.text)}</p>` : ''}</div>
        </div>`).join('')}
    </article>`;
  }).join('');

  /* venue card per day */
  const mapSrc = v => 'https://www.google.com/maps?q=' + encodeURIComponent(v.mapQuery || `${v.name}, ${v.city}`) + '&output=embed';
  const mapHref = v => v.mapLink || ('https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(v.mapQuery || `${v.name}, ${v.city}`));
  document.getElementById('venues').innerHTML = days.map(d => `
    <div class="vcard rv">
      ${both ? `<p class="vday">${esc(d.label)} &middot; ${esc(d.short)}</p>` : ''}
      <svg class="pin" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 22s7-6.4 7-12a7 7 0 1 0-14 0c0 5.6 7 12 7 12z"/><circle cx="12" cy="10" r="2.6"/></svg>
      <h3 class="vn">${esc(d.venue.name)}</h3>
      <p class="addr">${esc(d.venue.address)}, ${esc(d.venue.city)}</p>
      <div class="map"><iframe src="${mapSrc(d.venue)}" loading="lazy" title="Map to ${esc(d.venue.name)}" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
      <a class="btn" href="${mapHref(d.venue)}" target="_blank" rel="noopener">Get Directions</a>
    </div>`).join('');

  /* photo carousel */
  const gal = document.getElementById('gal'), dots = document.getElementById('dots');
  gal.innerHTML = D.photos.map((p, i) => `<figure data-label="Add photo${i + 1}.jpg"><img data-photo="photos.${i}" alt="Nishtha and Akshay"></figure>`).join('');
  dots.innerHTML = D.photos.map((_, i) => `<i${i ? '' : ' class="on"'}></i>`).join('');

  /* family lines, then this side's sign-off */
  const names = g => g.names.map(n => n === '&' ? '<p class="ga">&amp;</p>' : `<p class="gn">${esc(n)}</p>`).join('');
  document.getElementById('bless').innerHTML =
    side.map(g => `<div class="grp rv"><p class="gt">${esc(g.title)}</p>${names(g)}</div>`).join('') +
    (side.length ? '<svg class="orn"><use href="#orn"/></svg>' : '') +
    (L.photos.length ? `<div class="fam-photos rv">${L.photos.map((_, i) => `<figure data-label=" "><img data-photo="familyPhotos.${i}" alt=""></figure>`).join('')}</div>` : '') +
    `<div class="grp love rv"><p class="gt">${esc(L.title)}</p>${names(L)}</div>`;

  /* embossed floral relief for the ivory envelope, generated once */
  const motif = `
    <g id='rose'>
      <circle r='13'/>
      <path d='M-13 2a13 13 0 0 1 20-11' fill='none' stroke-width='1.6'/>
      <path d='M-8 5a8 8 0 0 1 12-7' fill='none' stroke-width='1.4'/>
      <path d='M-3.5 2a3.5 3.5 0 1 1 5-3' fill='none' stroke-width='1.2'/>
    </g>
    <g id='petal'><ellipse rx='9' ry='5'/></g>
    <g id='leaf'><path d='M0 0C7-11 20-13 30-7C21 4 8 7 0 0z'/></g>
    <g id='spray'>
      <path d='M6 156C28 126 32 90 58 62S112 28 132 4' fill='none' stroke-width='2.2'/>
      <use href='#rose' x='58' y='64'/>
      <g transform='translate(108 26) scale(.72)'><use href='#rose'/></g>
      <g transform='translate(24 120) scale(.6)'><use href='#rose'/></g>
      <use href='#leaf' transform='translate(26 116) rotate(-150)'/>
      <use href='#leaf' transform='translate(34 106) rotate(-18)'/>
      <use href='#leaf' transform='translate(76 76) rotate(28)'/>
      <use href='#leaf' transform='translate(44 44) rotate(-158) scale(.9)'/>
      <use href='#leaf' transform='translate(118 18) rotate(-68) scale(.82)'/>
      <use href='#leaf' transform='translate(14 142) rotate(-58) scale(.8)'/>
      <use href='#petal' transform='translate(88 94) rotate(35)'/>
      <use href='#petal' transform='translate(20 82) rotate(-40) scale(.8)'/>
      <use href='#petal' transform='translate(126 44) rotate(20) scale(.75)'/>
      <circle cx='96' cy='86' r='3.4'/><circle cx='40' cy='98' r='3'/><circle cx='136' cy='26' r='2.6'/>
    </g>`;
  const tile = body => `url("data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='170' height='170' viewBox='0 0 170 170'><defs>${motif}` +
    `<linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='#f7e2b8'/><stop offset='.5' stop-color='#d8b270'/><stop offset='1' stop-color='#f3dba8'/></linearGradient></defs>${body}</svg>`)}")`;

  // three sprays per tile, each drawn twice: a soft shadow then a white highlight = relief
  const layer = (fill, stroke, dx, dy) => `
    <g fill='${fill}' stroke='${stroke}' stroke-linecap='round' stroke-linejoin='round'>
      <use href='#spray' transform='translate(${10 + dx} ${10 + dy})'/>
      <use href='#spray' transform='translate(${170 - dx} ${-75 + dy}) scale(-1 1)'/>
      <use href='#spray' transform='translate(${170 - dx} ${95 + dy}) scale(-1 1)'/>
    </g>`;
  const root = document.documentElement.style;
  root.setProperty('--emboss', tile(
    layer('rgba(176,144,118,.22)', 'rgba(176,144,118,.22)', 1.3, 1.8) +
    layer('rgba(255,253,250,.95)', 'rgba(255,253,250,.95)', 0, 0)));
  root.setProperty('--emboss-soft', tile(layer('rgba(255,244,232,.12)', 'rgba(255,244,232,.12)', 0, 0)));
  root.setProperty('--foil', tile(
    layer('rgba(176,140,86,.22)', 'rgba(176,140,86,.22)', 1.4, 1.8) +
    `<g fill='url(#g)' stroke='url(#g)' stroke-linecap='round'>
       <use href='#spray' transform='translate(10 10)'/>
       <use href='#spray' transform='translate(170 -75) scale(-1 1)'/>
       <use href='#spray' transform='translate(170 95) scale(-1 1)'/></g>`));
})();

/* =====================================================================
   Invite engine — shared behaviour for every design.
   Reads window.INVITE (the config at the top of each page).
   You normally never need to edit this part.
   ===================================================================== */
(function () {
  const C = window.INVITE || {};
  C.couple = C.couple || `${C.groom} & ${C.bride}`;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const get = (o, path) => path.split('.').reduce((a, k) => (a == null ? a : a[k]), o);
  const put = (el, v) => (el.hasAttribute('data-html') ? (el.innerHTML = v) : (el.textContent = v));

  /* ---------- base styles every design relies on ---------- */
  const base = document.createElement('style');
  base.textContent = `
    body.locked{overflow:hidden;height:100vh;touch-action:none}
    .rv{opacity:0;transform:translateY(26px);transition:opacity 1s ease,transform 1s ease}
    .rv.in{opacity:1;transform:none}
    .w{display:inline-block;opacity:0;filter:blur(6px);transform:translateY(8px)}
    .in .w,.w.in{animation:inv-word .9s forwards;animation-delay:calc(var(--i)*.06s)}
    @keyframes inv-word{to{opacity:1;filter:none;transform:none}}
    .heart-card{position:relative;user-select:none;-webkit-user-select:none;width:min(270px,76vw);aspect-ratio:100/90;margin:0 auto;
      -webkit-mask:var(--heart) center/100% 100% no-repeat;mask:var(--heart) center/100% 100% no-repeat}
    .heart-card canvas{position:absolute;inset:0;width:100%;height:100%;touch-action:none;cursor:grab;transition:opacity .9s}
    .heart-face{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:8% 14% 22%}
    [data-photo-wrap]{position:relative;overflow:hidden}
    [data-photo-wrap].missing img{display:none}
    [data-photo-wrap].missing::after{content:attr(data-label);position:absolute;inset:0;display:grid;place-items:center;
      font:italic 15px Georgia,serif;letter-spacing:1px;color:var(--ph-ink,#8b7a6a);
      background:var(--ph-bg,linear-gradient(150deg,#efe6d8,#d9cbb6))}
    .inv-burst{position:fixed;inset:0;pointer-events:none;z-index:2000}
    .inv-petals{position:fixed;inset:0;pointer-events:none;z-index:40}
    .music-btn{position:fixed;right:16px;bottom:16px;z-index:1500;width:46px;height:46px;border-radius:50%;
      display:none;place-items:center;border:0;cursor:pointer}
    .music-btn.show{display:grid}
    .music-btn svg{width:20px;height:20px}
    .music-btn.on svg{animation:inv-spin 5s linear infinite}
    .music-btn:not(.on)::after{content:"";position:absolute;width:26px;height:2px;background:currentColor;transform:rotate(-45deg);border-radius:2px}
    @keyframes inv-spin{to{transform:rotate(360deg)}}
    @media (prefers-reduced-motion:reduce){.rv,.w{opacity:1!important;transform:none!important;filter:none!important;animation:none!important}}
  `;
  document.head.prepend(base);
  const HEART = 'M50 88C20 66 0 48 0 26 0 10 12 0 27 0c11 0 19 6 23 14C54 6 62 0 73 0c15 0 27 10 27 26 0 22-20 40-50 62z';
  document.documentElement.style.setProperty('--heart',
    `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 90' preserveAspectRatio='none'><path d='${HEART}'/></svg>`)}")`);

  /* ---------- fill text from the config ---------- */
  function fill(root = document, data = C) {
    $$('[data-k]', root).forEach(el => {
      const v = get(data, el.dataset.k);
      if (v == null || v === '') { if (el.hasAttribute('data-optional')) el.remove(); return; }
      put(el, v);
    });
  }

  /* ---------- repeatable lists: <div data-list="events"><template>…</template></div> ---------- */
  function lists() {
    $$('[data-list]').forEach(box => {
      const tpl = box.querySelector('template');
      const items = get(C, box.dataset.list) || [];
      if (!items.length && box.closest('[data-hide-empty]')) box.closest('[data-hide-empty]').remove();
      items.forEach((item, i) => {
        const node = tpl.content.cloneNode(true);
        $$('[data-f]', node).forEach(el => {
          const v = item[el.dataset.f];
          if (v == null || v === '' || (Array.isArray(v) && !v.length)) { el.remove(); return; }
          if (el.hasAttribute('data-swatches')) {
            v.forEach(c => { const s = document.createElement('span'); s.style.setProperty('--c', c); s.title = c; el.appendChild(s); });
          } else if (el.tagName === 'A') { el.href = v; }
          else put(el, v);
        });
        $$('[data-n]', node).forEach(el => (el.textContent = String(i + 1).padStart(2, '0')));
        node.firstElementChild && node.firstElementChild.style.setProperty('--i', i);
        box.appendChild(node);
      });
    });
  }

  /* ---------- photos with graceful placeholder ---------- */
  function photos() {
    $$('img[data-photo]').forEach(img => {
      const wrap = img.closest('[data-photo-wrap]') || img.parentElement;
      wrap.setAttribute('data-photo-wrap', '');
      if (!wrap.dataset.label) wrap.dataset.label = 'Your photo here';
      const src = get(C, img.dataset.photo);
      const miss = () => wrap.classList.add('missing');
      if (!src) return miss();
      img.onerror = miss; img.src = src; img.loading = 'lazy';
    });
  }

  /* ---------- map, calendar, share ---------- */
  function links() {
    const q = C.venue && (C.venue.mapQuery || `${C.venue.name}, ${C.venue.city}`);
    $$('iframe[data-map]').forEach(f => { if (!q) return f.remove(); f.loading = 'lazy'; f.src = 'https://www.google.com/maps?q=' + encodeURIComponent(q) + '&output=embed'; });
    $$('a[data-maplink]').forEach(a => {
      a.href = (C.venue && C.venue.mapLink) || ('https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(q || ''));
      a.target = '_blank'; a.rel = 'noopener';
    });
    $$('a[data-gcal]').forEach(a => {
      const s = new Date(C.dateTime), e = new Date(C.endTime || s.getTime() + 5 * 36e5);
      const f = d => d.toISOString().replace(/[-:]|\.\d{3}/g, '');
      a.href = 'https://calendar.google.com/calendar/render?action=TEMPLATE'
        + '&text=' + encodeURIComponent(`${C.couple}'s Wedding`)
        + '&dates=' + f(s) + '/' + f(e)
        + '&location=' + encodeURIComponent(q || '')
        + '&details=' + encodeURIComponent(location.href);
      a.target = '_blank'; a.rel = 'noopener';
    });
    $$('[data-share]').forEach(b => b.addEventListener('click', async () => {
      const data = { title: document.title, url: location.href.split('#')[0] };
      try { if (navigator.share) await navigator.share(data); else { await navigator.clipboard.writeText(data.url); b.dataset.done = '1'; b.textContent = 'Link copied ✓'; } } catch (_) {}
    }));
  }

  /* ---------- countdown ---------- */
  function countdown() {
    const t = new Date(C.dateTime).getTime(); if (isNaN(t)) return;
    const pad = n => String(n).padStart(2, '0');
    const parts = { d: x => Math.floor(x / 864e5), h: x => Math.floor(x / 36e5) % 24, m: x => Math.floor(x / 6e4) % 60, s: x => Math.floor(x / 1e3) % 60 };
    const tick = () => {
      const left = Math.max(0, t - Date.now());
      $$('[data-cd]').forEach(el => { const v = pad(parts[el.dataset.cd](left)); if (el.textContent !== v) { el.textContent = v; el.classList.remove('flip'); void el.offsetWidth; el.classList.add('flip'); } });
      $$('[data-cd-done]').forEach(el => (el.hidden = left > 0));
    };
    tick(); setInterval(tick, 1000);
  }

  /* ---------- scroll reveals & word-by-word text ---------- */
  function reveals() {
    $$('[data-words]').forEach(el => {
      let i = 0;
      const walk = n => [...n.childNodes].forEach(c => {
        if (c.nodeType === 3) {
          const frag = document.createDocumentFragment();
          c.textContent.split(/(\s+)/).forEach(w => {
            if (!w) return;
            if (/^\s+$/.test(w)) return frag.appendChild(document.createTextNode(w));
            const s = document.createElement('span'); s.className = 'w'; s.style.setProperty('--i', i++); s.textContent = w; frag.appendChild(s);
          });
          c.replaceWith(frag);
        } else if (c.nodeType === 1 && c.tagName !== 'BR') walk(c);
      });
      walk(el); el.classList.add('rv-words');
    });
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.18 });
    $$('.rv, [data-words]').forEach(el => io.observe(el));
  }

  /* ---------- music ---------- */
  const song = $('#song');
  const musicBtn = $('.music-btn');
  if (song) {
    if (C.music) song.src = C.music;               // file name set in the config
    song.addEventListener('error', () => { if (musicBtn) musicBtn.style.display = 'none'; });
    if (C.musicStart) song.addEventListener('loadedmetadata', () => { song.currentTime = C.musicStart; }, { once: true });
  }
  function playMusic() {
    if (!song) return;
    song.volume = C.musicVolume ?? 0.5;
    song.play().then(() => musicBtn && musicBtn.classList.add('on')).catch(() => {});
  }
  if (musicBtn) musicBtn.addEventListener('click', () => {
    if (!song) return;
    if (song.paused) playMusic(); else { song.pause(); musicBtn.classList.remove('on'); }
  });
  document.addEventListener('visibilitychange', () => {
    if (!song) return;
    if (document.hidden && !song.paused) { song.pause(); song._resume = 1; }
    else if (!document.hidden && song._resume) { song._resume = 0; playMusic(); }
  });

  /* ---------- opening: called by each design's intro ---------- */
  let started = false;
  function start(unlockAfter = 1500) {
    if (started) return false; started = true;
    playMusic();
    if (musicBtn) musicBtn.classList.add('show');
    setTimeout(() => { document.body.classList.remove('locked'); document.body.classList.add('opened'); window.scrollTo(0, 0); }, unlockAfter);
    return true;
  }

  /* ---------- scratch card (heart-shaped by default) ---------- */
  function scratch(canvas, opt = {}) {
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const colors = opt.colors || ['#f1d58f', '#c4993f', '#80612a', '#c4993f', '#f1d58f'];
    let down = false, last = null, done = false, initial = 0;
    const heart = new Path2D(HEART);
    function paint() {
      const r = canvas.getBoundingClientRect(), dpr = Math.min(window.devicePixelRatio || 1, 2);
      if (!r.width) return;
      canvas.width = r.width * dpr; canvas.height = r.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.globalCompositeOperation = 'source-over';
      const g = ctx.createLinearGradient(0, 0, r.width, r.height);
      colors.forEach((c, i) => g.addColorStop(i / (colors.length - 1), c));
      ctx.fillStyle = g; ctx.fillRect(0, 0, r.width, r.height);
      for (let i = 0; i < 70; i++) { ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.35})`; ctx.beginPath(); ctx.arc(Math.random() * r.width, Math.random() * r.height, Math.random() * 1.6 + 0.3, 0, 7); ctx.fill(); }
      ctx.fillStyle = opt.ink || 'rgba(60,30,20,.7)'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.font = `${opt.font || '600 15px Georgia, serif'}`; ctx.fillText(opt.text || 'Scratch here', r.width / 2, r.height * 0.4);
      if (opt.sub !== '') { ctx.font = `italic 12px Georgia, serif`; ctx.fillText(opt.sub || 'to reveal the date', r.width / 2, r.height * 0.4 + 20); }
      if (opt.shape !== 'rect') { // keep foil only inside the heart so progress is measured on the heart
        ctx.save(); ctx.globalCompositeOperation = 'destination-in'; ctx.fillStyle = '#000'; ctx.scale(r.width / 100, r.height / 90); ctx.fill(heart); ctx.restore();
      }
      initial = opaque();
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineCap = ctx.lineJoin = 'round'; ctx.lineWidth = opt.brush || 40;
    }
    function opaque() {
      const d = ctx.getImageData(0, 0, canvas.width, canvas.height).data; let n = 0;
      for (let i = 3; i < d.length; i += 64) if (d[i] > 40) n++;
      return n;
    }
    const pt = e => { const r = canvas.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };
    function draw(p) {
      ctx.beginPath();
      if (last) { ctx.moveTo(last.x, last.y); ctx.lineTo(p.x, p.y); ctx.stroke(); }
      else { ctx.arc(p.x, p.y, (opt.brush || 40) / 2, 0, 7); ctx.fill(); }
      last = p;
    }
    function check() {
      if (done || !initial) return;
      if (1 - opaque() / initial > (opt.threshold || 0.5)) {
        done = true; canvas.style.opacity = 0; setTimeout(() => canvas.remove(), 950);
        burst(opt.burst || colors, opt.burstShape || 'heart');
        opt.onDone && opt.onDone();
      }
    }
    canvas.addEventListener('pointerdown', e => { down = true; last = null; canvas.setPointerCapture(e.pointerId); draw(pt(e)); });
    canvas.addEventListener('pointermove', e => { if (!down) return; e.preventDefault(); draw(pt(e)); });
    ['pointerup', 'pointercancel'].forEach(t => canvas.addEventListener(t, () => { down = false; last = null; check(); }));
    const io = new IntersectionObserver(es => { if (es[0].isIntersecting && !initial) paint(); });
    io.observe(canvas);
    (document.fonts ? document.fonts.ready : Promise.resolve()).then(paint);
    let rt; addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => { if (!done) paint(); }, 200); });
  }

  /* ---------- confetti burst ---------- */
  function burst(colors = ['#c4993f', '#e8c7c8', '#fff'], shape = 'rect', origin) {
    const c = document.createElement('canvas'); c.className = 'inv-burst'; document.body.appendChild(c);
    const x = c.getContext('2d'); c.width = innerWidth; c.height = innerHeight;
    const ox = origin ? origin.x : innerWidth / 2, oy = origin ? origin.y : innerHeight * 0.55;
    const heartP = new Path2D(HEART);
    const bits = Array.from({ length: 130 }, () => ({
      x: ox, y: oy, vx: (Math.random() - 0.5) * 13, vy: -Math.random() * 15 - 3,
      s: Math.random() * 7 + 5, c: colors[(Math.random() * colors.length) | 0],
      a: Math.random() * 6, va: (Math.random() - 0.5) * 0.3, life: 1
    }));
    (function frame() {
      x.clearRect(0, 0, c.width, c.height); let alive = 0;
      for (const b of bits) {
        b.vy += 0.26; b.vx *= 0.99; b.x += b.vx; b.y += b.vy; b.a += b.va; b.life -= 0.0075;
        if (b.life <= 0) continue; alive++;
        x.save(); x.translate(b.x, b.y); x.rotate(b.a); x.globalAlpha = b.life; x.fillStyle = b.c;
        if (shape === 'heart') { x.scale(b.s / 100, b.s / 100); x.translate(-50, -45); x.fill(heartP); }
        else if (shape === 'petal') { x.beginPath(); x.ellipse(0, 0, b.s * 0.45, b.s, 0, 0, 7); x.fill(); }
        else x.fillRect(-b.s / 2, -b.s / 3, b.s, b.s * 0.66 * Math.abs(Math.cos(b.a * 2)) + 1);
        x.restore();
      }
      alive ? requestAnimationFrame(frame) : c.remove();
    })();
  }

  /* ---------- gentle falling petals / sparkles ---------- */
  function petals(opt = {}) {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const c = document.createElement('canvas'); c.className = 'inv-petals'; (opt.parent || document.body).appendChild(c);
    if (opt.parent) { c.style.position = 'absolute'; }
    const x = c.getContext('2d');
    const size = () => { const r = c.getBoundingClientRect(); c.width = r.width; c.height = r.height; };
    size(); addEventListener('resize', size);
    const cols = opt.colors || ['#f3c9cf', '#ead2b5', '#fff'];
    const kind = opt.kind || 'petal';
    const P = Array.from({ length: opt.count || 18 }, () => mk(true));
    function mk(any) {
      return { x: Math.random() * c.width, y: any ? Math.random() * c.height : -20, s: Math.random() * 5 + 4, vy: Math.random() * 0.5 + 0.35,
        sw: Math.random() * 2 * Math.PI, vs: Math.random() * 0.02 + 0.008, a: Math.random() * 6, va: (Math.random() - 0.5) * 0.03,
        c: cols[(Math.random() * cols.length) | 0], tw: Math.random() * 6 };
    }
    (function frame() {
      x.clearRect(0, 0, c.width, c.height);
      P.forEach((p, i) => {
        p.sw += p.vs; p.tw += 0.05;
        if (kind === 'sparkle') {
          x.globalAlpha = 0.25 + 0.75 * Math.abs(Math.sin(p.tw)); x.fillStyle = p.c;
          x.beginPath(); x.arc(p.x + Math.sin(p.sw) * 6, p.y, p.s * 0.28, 0, 7); x.fill();
          p.y -= p.vy * 0.25; if (p.y < -10) { P[i] = mk(false); P[i].y = c.height + 10; }
        } else {
          p.y += p.vy; p.a += p.va; x.globalAlpha = 0.85;
          x.save(); x.translate(p.x + Math.sin(p.sw) * 18, p.y); x.rotate(p.a); x.fillStyle = p.c;
          x.beginPath(); x.ellipse(0, 0, p.s * 0.55, p.s, 0, 0, 7); x.fill(); x.restore();
          if (p.y > c.height + 20) P[i] = mk(false);
        }
      });
      requestAnimationFrame(frame);
    })();
  }

  /* ---------- RSVP → WhatsApp (works on static hosting, no backend) ---------- */
  function rsvp() {
    $$('form[data-rsvp]').forEach(form => form.addEventListener('submit', e => {
      e.preventDefault();
      const fd = new FormData(form), R = C.rsvp || {};
      const lines = [`*RSVP — ${C.couple}'s Wedding*`];
      for (const [k, v] of fd.entries()) if (String(v).trim()) lines.push(`${k}: ${v}`);
      const text = encodeURIComponent(lines.join('\n'));
      let url;
      if (R.whatsapp) url = `https://wa.me/${R.whatsapp.replace(/\D/g, '')}?text=${text}`;
      else if (R.email) url = `mailto:${R.email}?subject=${encodeURIComponent('RSVP')}&body=${text}`;
      else if (R.formUrl) url = R.formUrl;
      if (url) window.open(url, '_blank');
      const ok = form.querySelector('[data-thanks]'); if (ok) ok.hidden = false;
      burst(C.burstColors || ['#c4993f', '#f2d7da', '#fff'], 'heart');
    }));
  }

  /* ---------- go ---------- */
  fill(); lists(); fill(); photos(); links(); countdown(); reveals(); rsvp();
  const fav = $('link[rel=icon]');
  if (fav && C.initials) fav.href = 'data:image/svg+xml,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><circle cx="32" cy="32" r="31" fill="${C.faviconBg || '#7a6a55'}"/><text x="32" y="41" font-family="Georgia" font-style="italic" font-size="${Math.max(9, Math.min(24, Math.round(104 / Math.max(3, C.initials.length))))}" fill="#fff" text-anchor="middle">${C.initials.replace(/&/g, '&amp;')}</text></svg>`);

  window.Invite = { start, scratch, burst, petals, playMusic, $, $$ };
})();

/* ---------- opening sequence + page behaviour ---------- */
(function () {
  const env = document.getElementById('env');

  /* glittering ring that ignites around the seal and spreads outward, as in the reel */
  function sparkleRing() {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const seal = document.getElementById('openBtn');
    const c = document.createElement('canvas'); c.className = 'spark-canvas'; env.appendChild(c);
    const dpr = Math.min(window.devicePixelRatio || 1, 2), W = innerWidth, H = innerHeight;
    c.width = W * dpr; c.height = H * dpr; c.style.width = W + 'px'; c.style.height = H + 'px';
    const x = c.getContext('2d'); x.scale(dpr, dpr);

    // one glowing speck, drawn once and stamped many times
    const sprite = (stops) => {
      const s = document.createElement('canvas'); s.width = s.height = 48;
      const g = s.getContext('2d'), gr = g.createRadialGradient(24, 24, 0, 24, 24, 24);
      stops.forEach(([o, col]) => gr.addColorStop(o, col)); g.fillStyle = gr; g.fillRect(0, 0, 48, 48);
      return s;
    };
    const SP = [
      sprite([[0, 'rgba(255,255,246,1)'], [.18, 'rgba(255,240,200,.95)'], [.45, 'rgba(255,196,110,.35)'], [1, 'rgba(255,170,70,0)']]),
      sprite([[0, 'rgba(255,236,190,1)'], [.2, 'rgba(255,200,110,.9)'], [.5, 'rgba(255,160,60,.3)'], [1, 'rgba(255,140,40,0)']]),
      sprite([[0, 'rgba(255,214,150,1)'], [.25, 'rgba(255,164,72,.85)'], [.55, 'rgba(240,120,40,.25)'], [1, 'rgba(220,100,30,0)']])
    ];

    const box = seal.getBoundingClientRect();
    const cx = box.left + box.width / 2, cy = box.top + box.height / 2, r0 = box.width * .56;
    const gauss = () => (Math.random() + Math.random() + Math.random() - 1.5);
    const P = Array.from({ length: 900 }, () => ({
      a: Math.random() * Math.PI * 2, j: gauss() * 22, s: Math.random() * 2.3 + 1.0,
      tw: Math.random() * 6.3, v: Math.random() * .7 + .6, k: Math.random() < .45 ? 0 : Math.random() < .75 ? 1 : 2,
      drift: Math.random() * 26
    }));
    const T = 2300, t0 = performance.now();
    (function frame(now) {
      const t = Math.min(1, (now - t0) / T), e = 1 - Math.pow(1 - t, 3);
      const R = r0 * (1 + 1.35 * e);
      const fade = t < .1 ? t / .1 : t > .74 ? Math.max(0, (1 - t) / .26) : 1;
      x.clearRect(0, 0, W, H);
      x.globalCompositeOperation = 'lighter';
      // soft halo under the glitter
      x.globalAlpha = .55 * fade;
      const halo = x.createRadialGradient(cx, cy, R - 30, cx, cy, R + 30);
      halo.addColorStop(0, 'rgba(255,190,100,0)'); halo.addColorStop(.5, 'rgba(255,184,96,.45)'); halo.addColorStop(1, 'rgba(255,190,100,0)');
      x.fillStyle = halo; x.beginPath(); x.arc(cx, cy, R + 30, 0, Math.PI * 2); x.arc(cx, cy, Math.max(0, R - 30), 0, Math.PI * 2, true); x.fill();
      for (const p of P) {
        const rr = R + p.j * (1 + e * .7) + p.drift * e;
        const a = fade * (.4 + .6 * Math.abs(Math.sin(p.tw + now * .012 * p.v)));
        const sz = p.s * 2.2;
        x.globalAlpha = a;
        x.drawImage(SP[p.k], cx + Math.cos(p.a) * rr - sz, cy + Math.sin(p.a) * rr - sz, sz * 2, sz * 2);
      }
      x.globalAlpha = 1; x.globalCompositeOperation = 'source-over';
      if (t < 1) requestAnimationFrame(frame); else c.remove();
    })(t0);
  }

  function openInvite() {
    if (!Invite.start(3100)) return;
    env.classList.add('lit');                                   // glitter ring ignites, fold lines glow
    sparkleRing();
    setTimeout(() => env.classList.add('open'), 1150);          // top flap lifts, light spills out
    setTimeout(() => env.classList.add('flash'), 2300);         // light fills the screen
    setTimeout(() => env.classList.add('out'), 3050);
    setTimeout(() => env.remove(), 4200);
    setTimeout(() => Invite.petals({ parent: document.getElementById('hero'), colors: ['#f3c6c2', '#fff6ea', '#e59a9a', '#f1d9a8'], count: 16 }), 3400);
  }
  document.getElementById('openBtn').addEventListener('click', openInvite);

  const gal = document.getElementById('gal'), dots = [...document.querySelectorAll('#dots i')];
  gal.addEventListener('scroll', () => {
    const i = Math.round(gal.scrollLeft / Math.max(1, gal.scrollWidth - gal.clientWidth) * (dots.length - 1)) || 0;
    dots.forEach((d, j) => d.classList.toggle('on', j === i));
  }, { passive: true });
})();
