(() => {
  const big = document.getElementById('big');

  // Se manca l'immagine grande, non ha senso continuare
  if (!big) return;

  // Converte qualsiasi percorso relativo (es: assets/x.png) in URL assoluto corretto
  const toAbs = (rel) => new URL(rel, document.baseURI).href;

  // Click (e tap iPad) sulle miniature: prende sempre il bottone giusto
  const onPick = (e) => {
    const btn = e.target.closest('.thumb');
    if (!btn) return;

    // Evita comportamenti strani su mobile
    e.preventDefault();

    const rel = btn.getAttribute('data-img');
    const label = btn.querySelector('span')?.textContent?.trim() || 'Schema';

    if (!rel) return;

    // Qui sta la differenza: URL assoluto
    big.src = toAbs(rel);
    big.alt = `Schema: ${label}`;

    // Se vuoi un feedback visivo minimo
    big.style.outline = '2px solid rgba(255,183,3,.55)';
    setTimeout(() => (big.style.outline = 'none'), 180);

    // su schermi piccoli porta il viewer in vista
    if (window.matchMedia('(max-width: 980px)').matches) {
      document.querySelector('.viewer')
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // desktop + mobile
  document.addEventListener('click', onPick, { passive: false });
  document.addEventListener('touchstart', onPick, { passive: false });

  // --- BLOCCO APPUNTI ---
  const notes = document.getElementById('notes');
  const copyBtn = document.getElementById('copyBtn');
  const saveBtn = document.getElementById('saveBtn');
  const clearBtn = document.getElementById('clearBtn');
  const fitBtn = document.getElementById('fitBtn');

  if (copyBtn && notes) {
    copyBtn.addEventListener('click', async () => {
      notes.focus();
      notes.select();
      notes.setSelectionRange(0, notes.value.length);
      try {
        await navigator.clipboard.writeText(notes.value);
      } catch {
        document.execCommand('copy');
      }
    });
  }

  if (saveBtn && notes) {
    saveBtn.addEventListener('click', () => {
      const blob = new Blob([notes.value], { type: 'text/plain;charset=utf-8' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'pascoli-immagine-del-mondo.txt';
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(a.href);
      a.remove();
    });
  }

  if (clearBtn && notes) {
    clearBtn.addEventListener('click', () => {
      notes.value = '';
      notes.focus();
    });
  }

  if (fitBtn) {
    fitBtn.addEventListener('click', () => {
      big.style.objectFit = 'contain';
      big.style.maxWidth = '100%';
      big.style.maxHeight = '70vh';
    });
  }
})();
