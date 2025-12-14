(() => {
  const big = document.getElementById('big');

  // intercettiamo TUTTI i click sulle miniature
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.thumb');
    if (!btn) return;

    const src = btn.getAttribute('data-img');
    const label = btn.querySelector('span')?.textContent || 'Schema';

    if (src) {
      big.src = src;
      big.alt = `Schema: ${label}`;

      // su schermi piccoli porta il viewer in vista
      if (window.matchMedia('(max-width: 980px)').matches) {
        document.querySelector('.viewer')
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });

  // --- BLOCCO APPUNTI ---
  const notes = document.getElementById('notes');

  document.getElementById('copyBtn').addEventListener('click', async () => {
    notes.select();
    try {
      await navigator.clipboard.writeText(notes.value);
    } catch {
      document.execCommand('copy');
    }
  });

  document.getElementById('saveBtn').addEventListener('click', () => {
    const blob = new Blob([notes.value], { type: 'text/plain;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'pascoli-immagine-del-mondo.txt';
    a.click();
    URL.revokeObjectURL(a.href);
  });

  document.getElementById('clearBtn').addEventListener('click', () => {
    notes.value = '';
    notes.focus();
  });

  document.getElementById('fitBtn').addEventListener('click', () => {
    big.style.objectFit = 'contain';
    big.style.maxWidth = '100%';
    big.style.maxHeight = '70vh';
  });
})();

