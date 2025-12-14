/* Gelsomino notturno – modal immagini + taccuino (localStorage) */
(function(){
  const modal = document.getElementById("imgModal");
  const modalImg = document.getElementById("imgModalImg");
  const modalTitle = document.getElementById("imgModalTitle");
  const closeBtn = document.getElementById("imgModalClose");

  function openModal(src, title){
    modalImg.src = src;
    modalTitle.textContent = title || "Immagine";
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function closeModal(){
    modal.classList.remove("open");
    modalImg.src = "";
    document.body.style.overflow = "";
  }

  document.querySelectorAll("[data-zoom]").forEach(el=>{
    el.addEventListener("click", ()=>{
      const src = el.getAttribute("data-zoom");
      const title = el.getAttribute("data-title") || el.alt || "";
      openModal(src, title);
    });
  });

  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e)=>{ if(e.target === modal) closeModal(); });
  window.addEventListener("keydown", (e)=>{ if(e.key === "Escape") closeModal(); });

  // Taccuino
  const ta = document.getElementById("taccuinoText");
  const saveBtn = document.getElementById("saveNote");
  const clearBtn = document.getElementById("clearNote");
  const key = "pascoli_gelsomino_taccuino_v1";

  try{
    const saved = localStorage.getItem(key);
    if(saved) ta.value = saved;
  }catch(_){}

  function save(){
    try{ localStorage.setItem(key, ta.value); }catch(_){}
  }
  ta.addEventListener("input", ()=>{
    // autosave leggero
    save();
  });
  saveBtn.addEventListener("click", ()=>{
    save();
    saveBtn.textContent = "Salvato ✓";
    setTimeout(()=> saveBtn.textContent = "Salva", 900);
  });
  clearBtn.addEventListener("click", ()=>{
    ta.value = "";
    try{ localStorage.removeItem(key); }catch(_){}
  });

  // Smooth scroll per i chip
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener("click", (e)=>{
      const id = a.getAttribute("href");
      const target = document.querySelector(id);
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:"smooth", block:"start"});
      }
    });
  });
})();