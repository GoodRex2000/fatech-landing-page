(() => {
  'use strict';

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const progress = document.getElementById('progresso');
  const header = document.querySelector('.site-header');
  const hero = document.querySelector('.hero');
  const parallax = document.querySelector('[data-parallax]');
  const phone = document.querySelector('[data-tilt]');
  let scrollFrame = 0;
  let tiltFrame = 0;

  // Install the observer before hiding anything. A missing API leaves content visible.
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
    document.documentElement.classList.add('motion-ready');
  }

  function updateScroll() {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0;
    progress.style.transform = `scaleX(${ratio})`;
    header.classList.toggle('is-scrolled', window.scrollY > 20);
    if (!reducedMotion.matches && finePointer.matches && hero.getBoundingClientRect().bottom > 0) {
      parallax.style.transform = `translateY(${Math.min(window.scrollY * 0.09, 38)}px)`;
    } else {
      parallax.style.transform = '';
    }
    scrollFrame = 0;
  }

  function scheduleScroll() {
    if (!scrollFrame) scrollFrame = window.requestAnimationFrame(updateScroll);
  }

  window.addEventListener('scroll', scheduleScroll, { passive: true });
  window.addEventListener('resize', scheduleScroll);
  window.addEventListener('pageshow', scheduleScroll);
  updateScroll();

  const product = document.querySelector('.hero-product');
  product.addEventListener('pointermove', event => {
    if (reducedMotion.matches || !finePointer.matches) return;
    if (tiltFrame) window.cancelAnimationFrame(tiltFrame);
    tiltFrame = window.requestAnimationFrame(() => {
      const rect = product.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      phone.style.transform = `rotate(7deg) rotateY(${x * 10}deg) rotateX(${-y * 8}deg)`;
      tiltFrame = 0;
    });
  });
  function resetTilt() {
    if (tiltFrame) window.cancelAnimationFrame(tiltFrame);
    tiltFrame = 0;
    phone.style.transform = '';
  }
  product.addEventListener('pointerleave', resetTilt);
  reducedMotion.addEventListener('change', () => { resetTilt(); scheduleScroll(); });
  finePointer.addEventListener('change', () => { resetTilt(); scheduleScroll(); });

  document.querySelectorAll('.large-wave i').forEach((bar, index) => bar.style.setProperty('--i', index));

  const tabs = [...document.querySelectorAll('.demo-tab')];
  const panels = [...document.querySelectorAll('.demo-panel')];
  function activateStep(step, focusTab = false) {
    const selectedTab = tabs.find(tab => tab.dataset.step === step);
    if (!selectedTab) return;
    tabs.forEach(tab => {
      const selected = tab === selectedTab;
      tab.classList.toggle('is-active', selected);
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });
    panels.forEach(panel => { panel.hidden = panel.id !== selectedTab.getAttribute('aria-controls'); });
    if (focusTab) selectedTab.focus({ preventScroll: true });
    scheduleScroll();
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activateStep(tab.dataset.step));
    tab.addEventListener('keydown', event => {
      let nextIndex;
      if (event.key === 'ArrowDown' || event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
      if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') nextIndex = 0;
      if (event.key === 'End') nextIndex = tabs.length - 1;
      if (nextIndex !== undefined) {
        event.preventDefault();
        activateStep(tabs[nextIndex].dataset.step, true);
      }
    });
  });

  document.querySelectorAll('[data-go-step]').forEach(button => {
    button.addEventListener('click', () => {
      activateStep(button.dataset.goStep);
      document.getElementById(`panel-${button.dataset.goStep}`).focus({ preventScroll: true });
    });
  });

  document.querySelectorAll('.media-button').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.media-button').forEach(control => {
        const active = control === button;
        control.classList.toggle('is-active', active);
        control.setAttribute('aria-pressed', String(active));
      });
      document.querySelectorAll('.media-preview').forEach(preview => {
        preview.hidden = preview.id !== `media-${button.dataset.media}`;
      });
    });
  });

  let saveTimer;
  const saveButton = document.getElementById('save-record');
  const saveStatus = document.getElementById('save-status');
  saveButton.addEventListener('click', () => {
    window.clearTimeout(saveTimer);
    saveStatus.textContent = 'Registro ilustrativo concluído. Nenhum dado foi salvo.';
    saveButton.firstChild.textContent = 'Registro simulado ';
    saveButton.querySelector('use').setAttribute('href', '#i-check');
    saveTimer = window.setTimeout(() => {
      saveButton.firstChild.textContent = 'Simular novamente ';
      saveButton.querySelector('use').setAttribute('href', '#i-arrow');
    }, 2000);
  });

  const points = [
    { title: 'Vegetação ciliar', description: 'Foto e relato sobre a vegetação da margem.' },
    { title: 'Margem do rio', description: 'Foto e áudio ilustrativos da área observada.' },
    { title: 'Trilha de acesso', description: 'Relato ilustrativo sobre o acesso à vistoria.' }
  ];
  const pointButtons = [...document.querySelectorAll('.map-point')];
  pointButtons.forEach(button => button.addEventListener('click', () => {
    const index = Number(button.dataset.point);
    pointButtons.forEach(point => {
      const selected = point === button;
      point.classList.toggle('is-selected', selected);
      point.setAttribute('aria-pressed', String(selected));
    });
    document.getElementById('point-label').textContent = `PONTO ${String(index + 1).padStart(2, '0')}`;
    document.getElementById('point-title').textContent = points[index].title;
    document.getElementById('point-description').textContent = points[index].description;
    const detail = document.querySelector('.point-detail');
    detail.classList.remove('is-changing');
    window.requestAnimationFrame(() => detail.classList.add('is-changing'));
  }));

  const checkboxes = [...document.querySelectorAll('input[name="export-record"]')];
  const selectAll = document.getElementById('select-all');
  const exportButton = document.getElementById('export-records');
  const exportStatus = document.getElementById('export-status');
  const exportSuccess = document.getElementById('export-success');
  function updateExport() {
    const count = checkboxes.filter(input => input.checked).length;
    document.getElementById('export-count').textContent = `${count} ${count === 1 ? 'registro selecionado' : 'registros selecionados'}`;
    exportButton.disabled = count === 0;
    selectAll.textContent = count === checkboxes.length ? 'Desmarcar todos' : 'Selecionar todos';
    exportStatus.textContent = count === 0 ? 'Selecione pelo menos um registro para simular.' : '';
    exportSuccess.hidden = true;
    exportButton.firstChild.textContent = 'Simular exportação ';
    exportButton.querySelector('use').setAttribute('href', '#i-arrow');
  }
  checkboxes.forEach(input => input.addEventListener('change', updateExport));
  selectAll.addEventListener('click', () => {
    const checked = !checkboxes.every(input => input.checked);
    checkboxes.forEach(input => { input.checked = checked; });
    updateExport();
  });
  exportButton.addEventListener('click', () => {
    const count = checkboxes.filter(input => input.checked).length;
    if (!count) return;
    document.getElementById('export-success-detail').textContent = `${count} ${count === 1 ? 'registro preparado' : 'registros preparados'} nesta demonstração de KML para o QGIS.`;
    exportSuccess.hidden = false;
    exportStatus.textContent = 'Simulação concluída. Nenhum arquivo foi gerado.';
    exportButton.firstChild.textContent = 'Simular novamente ';
    exportButton.querySelector('use').setAttribute('href', '#i-check');
    scheduleScroll();
  });
  updateExport();

  // Failed external imagery reveals the local terrain illustration underneath.
  document.querySelectorAll('img[src^="https://images.unsplash.com"]').forEach(image => {
    function showFallback() {
      image.style.opacity = '0';
      image.parentElement.classList.add('image-fallback');
    }
    image.addEventListener('error', showFallback, { once: true });
    if (image.complete && image.naturalWidth === 0) showFallback();
  });
})();
