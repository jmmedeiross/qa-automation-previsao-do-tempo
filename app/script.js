const API_KEY = "SUA_API_KEY_AQUI";
const URL_BASE = "https://api.openweathermap.org/data/2.5/weather";

function cliqueiNoBotao() {
  const cidade = document.querySelector(".input-cidade").value.trim();

  if (!cidade) {
    mostrarErro("Digite o nome de uma cidade.");
    return;
  }

  buscarPrevisao(cidade);
}

async function buscarPrevisao(cidade) {
  const url = `${URL_BASE}?q=${encodeURIComponent(cidade)}&appid=${API_KEY}&units=metric&lang=pt_br`;

  try {
    const resposta = await fetch(url);

    if (!resposta.ok) {
      mostrarErro("Cidade não encontrada. Verifique o nome e tente novamente.");
      return;
    }

    const dados = await resposta.json();
    atualizarTela(dados);
  } catch (erro) {
    mostrarErro("Não foi possível buscar a previsão agora. Tente novamente.");
  }
}

function atualizarTela(dados) {
  esconderErro();

  document.querySelector(".temp-cidade").textContent = `Tempo em ${dados.name}`;
  document.querySelector(".temp").textContent = `${Math.round(dados.main.temp)}°C`;
  document.querySelector(".texto-previsao").textContent = capitalizar(dados.weather[0].description);
  document.querySelector(".img-previsao").src = `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`;
  document.querySelector(".umidade").textContent = `Umidade: ${dados.main.humidity}%`;
}

function mostrarErro(mensagem) {
  const elErro = document.querySelector(".mensagem-erro");
  elErro.textContent = mensagem;
  elErro.style.display = "block";
}

function esconderErro() {
  const elErro = document.querySelector(".mensagem-erro");
  elErro.style.display = "none";
  elErro.textContent = "";
}

function capitalizar(texto) {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}
