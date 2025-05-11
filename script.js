
//Gráficos
window.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.grafico').forEach(el => {
      const percent = el.getAttribute('data-percent');
      el.style.setProperty('--percent', percent + '%');
    });
  });

//Calendário
  window.addEventListener('scroll', () => {
    const calendario = document.getElementById('area-calendario');
    const posicao = calendario.getBoundingClientRect().top;
    const alturaTela = window.innerHeight;
    
    if (posicao < alturaTela - 100) {
      calendario.classList.add('show');
    }
  });



//Carrossel de dicas
let indiceAtual = 0;
let intervaloRotacao = null;
let timeoutReinicar = null;
let rotacaoParada = false;

function mostrarDica(index) {
  const carrosselInner = document.querySelector('.carrossel-dicas-inner');
  const item = document.querySelector('.carrossel-dica');
  
  if (!carrosselInner || !item) return;

  const larguraItem = item.offsetWidth;
  carrosselInner.style.transform = `translateX(-${index * larguraItem}px)`;
}

function mudarDica(direcao) {
  const totalDicas = document.querySelectorAll('.carrossel-dica').length;

  indiceAtual += direcao;

  if (indiceAtual >= totalDicas) indiceAtual = 0;
  if (indiceAtual < 0) indiceAtual = totalDicas - 1;

  mostrarDica(indiceAtual);
}

function iniciarRotacaoAutomatica() {
  if (intervaloRotacao) clearInterval(intervaloRotacao);

  intervaloRotacao = setInterval(() => {
    if (!rotacaoParada) {
      mudarDica(1);
    }
  }, 4500);
}

function pararRotacaoTemporariamente() {
  rotacaoParada = true;
  clearInterval(intervaloRotacao);
  intervaloRotacao = null;

if (timeoutReinicar) clearTimeout(timeoutReiniciar);

//Reinica a rotação após 10 segundos
timeoutReiniciar = setTimeout(() => {
  rotacaoParada = false;
  iniciarRotacaoAutomatica();
 }, 8000);
}

window.addEventListener('load', () => {
  setTimeout(() => {
    mostrarDica(indiceAtual);
  }, 100); //pequeno delay para o layout estabilizar, pois quando recarregava a página a imagem principal ficava dividida 


  iniciarRotacaoAutomatica();

  document.querySelector('.btn-anterior')?.addEventListener('click', () => {
    mudarDica(-1);
    pararRotacaoTemporariamente();
  });

  document.querySelector('.btn-proximo')?.addEventListener('click', () => {
    mudarDica(1);
    pararRotacaoTemporariamente();
  });
});


 //Seção de "VOCÊ SABIA?"
const dicas = [
  "Ajustar incorretamente o encosto de cabeça pode causar lesões graves na coluna em colisões traseiras.",
  "Pneus mal calibrados aumentam o risco de aquaplanagem e reduzem a estabilidade do veículo.",
  "Óculos escuros de lente azul ou vermelha podem distorcer cores de semáforos e sinais.",
  "30% dos acidentes noturnos envolvem motoristas com visão comprometida por falta de revisão oftalmológica.",
  "A maioria dos motoristas não utiliza o espelho retrovisor interno corretamente para eliminar o ponto cego.",
];

let indice = 0;
const dicaTexto = document.getElementById("dicaTexto");

function atualizarDica() {
  dicaTexto.style.opacity = 0;
  setTimeout(() => {
    dicaTexto.textContent = dicas[indice];
    dicaTexto.style.opacity = 1;
  }, 300);
}

function proximaDica() {
  indice = (indice + 1) % dicas.length;
  atualizarDica();
}

function dicaAnterior() {
  indice = (indice - 1 + dicas.length) % dicas.length;
  atualizarDica();
}

// Troca automática a cada 7 segundos
setInterval(proximaDica, 7000);