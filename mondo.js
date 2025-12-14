
(() => {
  const $$ = (q, r=document) => Array.from(r.querySelectorAll(q));
  const $ = (q, r=document) => r.querySelector(q);

  const big = $('#big');
  const thumbs = $$('.thumb');

  function setBig(src, alt='Schema ingrandito'){
    big.src = src;
    big.alt = alt;
  }

  thumbs.forEach(btn => {
    btn.addEventListener('click', () => {
      const src = btn.getAttribute('data-img');
      const label = btn.querySelector('span')?.textContent?.trim() || 'Schema';
      setBig(src, `Schema: ${label}`);

      if (window.matchMedia('(max-width: 980px)').matches) {
        document.querySelector('.viewer')?.scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });

  const notes = $('#notes');
  $('#copyBtn').addEventListener('click', async () => {
    notes.select();
    notes.setSelectionRange(0, notes.value.length);
    try{
      await navigator.clipboard.writeText(notes.value);
    }catch(e){
      document.execCommand('copy');
    }
  });

  $('#saveBtn').addEventListener('click', () => {
    const blob = new Blob([notes.value], { type: 'text/plain;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'pascoli-immagine-del-mondo.txt';
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(a.href);
    a.remove();
  });

  $('#clearBtn').addEventListener('click', () => {
    notes.value = '';
    notes.focus();
  });

  $('#fitBtn').addEventListener('click', () => {
    big.style.objectFit = 'contain';
    big.style.maxHeight = '70vh';
    big.style.maxWidth = '100%';
  });
})();
