// Mostra quanto da página já foi percorrido.
const progresso = document.getElementById('progresso');
const barraLeitura = document.querySelector('.barra-leitura');

function atualizarLeitura() {
  const alturaPagina = document.documentElement.scrollHeight - window.innerHeight;
  const parteLida = alturaPagina > 0 ? window.scrollY / alturaPagina : 1;
  const valor = Math.min(1, Math.max(0, parteLida));

  progresso.style.transform = 'scaleX(' + valor + ')';
  barraLeitura.setAttribute('aria-valuenow', Math.round(valor * 100));
}

// Atualiza junto com o desenho da tela, sem alterar o tamanho do cabeçalho.
window.addEventListener('scroll', function () {
  window.requestAnimationFrame(atualizarLeitura);
}, { passive: true });

window.addEventListener('resize', atualizarLeitura);
window.addEventListener('pageshow', atualizarLeitura);
atualizarLeitura();
