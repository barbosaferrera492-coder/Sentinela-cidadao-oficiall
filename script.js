// 🔧 FIREBASE
const firebaseConfig = {
    apiKey: "SUA_API_KEY_AQUI",
    authDomain: "sentinela-cidad.firebaseapp.com",
    projectId: "sentinela-cidad",
    storageBucket: "sentinela-cidad.appspot.com",
    messagingSenderId: "645213005112",
    appId: "1:645213005112:web:dae57f5ebd6c9cfa39cdcd"
};

firebase.initializeApp(firebaseConfig);
const bancoDeDados = firebase.database();

// 📋 TROCA DE ABAS
function mudarAba(nome) {
    document.getElementById('verificar').style.display = 'none';
    document.getElementById('denunciar').style.display = 'none';
    document.getElementById(nome).style.display = 'block';
}

// 🧹 LIMPAR TEXTO
function limparTexto(texto) {
    return texto.toLowerCase().replace(/[^a-z0-9]/g, '');
}

// 🚫 LISTA SIMPLES
const listaOficial = [
    { chave: "pixmilhao", motivo: "Golpe do Pix do Milhão" },
    { chave: "ganhedinheiro", motivo: "Golpe de Renda Fácil" },
    { chave: "voceganhou", motivo: "Golpe de Prêmio Falso" },
    { chave: "bitcoin", motivo: "Possível golpe de criptomoeda" }
];

// 🔍 VERIFICAÇÃO
function verificarSeguranca() {
    const entrada = document.getElementById('entradaUsuario').value;
    const resultado = document.getElementById('resultado');

    const texto = limparTexto(entrada);

    let risco = 0;
    let motivo = "";

    listaOficial.forEach(item => {
        if (texto.includes(item.chave)) {
            risco++;
            motivo = item.motivo;
        }
    });

    resultado.style.display = "block";

    if (risco >= 2) {
        resultado.innerHTML = "⛔ ALTO RISCO! NÃO CLIQUE!";
        resultado.className = "perigo";
    } else if (risco === 1) {
        resultado.innerHTML = "⚠️ POSSÍVEL GOLPE: " + motivo;
        resultado.className = "alerta";
    } else {
        resultado.innerHTML = "✅ Nenhum risco encontrado";
        resultado.className = "seguro";
    }
}

// 📢 DENÚNCIA
function cadastrarDenuncia() {
    const valor = document.getElementById('valorDenuncia').value;

    bancoDeDados.ref('denuncias').push({
        valor: valor,
        data: new Date().toLocaleString()
    });

    document.getElementById('resultadoDenuncia').innerHTML = "Denúncia enviada!";
    document.getElementById('resultadoDenuncia').style.display = "block";
}

// 📊 CONTADOR
function carregarContador() {
    bancoDeDados.ref('denuncias').once('value', snapshot => {
        const total = snapshot.numChildren();
        document.querySelector('.rodape').innerHTML += `<br>📊 Denúncias: ${total}`;
    });
}

carregarContador();