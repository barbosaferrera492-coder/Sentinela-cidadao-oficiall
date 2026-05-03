# 🛡️ Sentinela Cidadão

Sistema de verificação e denúncia de golpes digitais, criado para ajudar a proteger os cidadãos de **São Fidélis** contra fraudes online, sites falsos e golpes via Pix.

---

## 💡 Sobre o projeto

O **Sentinela Cidadão** é uma aplicação web simples que permite:

* 🔍 Verificar links e chaves Pix suspeitas
* 📢 Denunciar possíveis golpes
* 🤖 Receber uma análise baseada em palavras-chave suspeitas
* 🔒 Garantir que denúncias só sejam aprovadas manualmente

---

## 🚀 Funcionalidades

### 🔍 Verificação de Segurança

* Analisa textos, links e chaves Pix
* Compara com uma lista negra (blacklist)
* Retorna:

  * ✅ Seguro (não encontrado)
  * ⚠️ Alerta
  * ⛔ Perigo (golpe identificado)

---

### 📢 Sistema de Denúncia

* Usuário pode denunciar:

  * Sites falsos
  * Golpes com Pix
* As denúncias são:

  * 📥 Salvas no Firebase
  * ⏳ Marcadas como **PENDENTE**
  * ❌ NÃO entram automaticamente na lista de bloqueio

---

## 🧠 Como funciona

O sistema utiliza:

* Limpeza de texto (remoção de símbolos e URLs)
* Comparação com palavras-chave suspeitas
* Uma **lista oficial de golpes** mantida manualmente

---

## 🔥 Tecnologias usadas

* HTML5
* CSS3
* JavaScript
* Firebase (Realtime Database)

---

## 🗂️ Estrutura do Projeto

```bash
index.html   # Interface + lógica do sistema
```

---

## ⚙️ Configuração

1. Crie um projeto no Firebase
2. Ative o **Realtime Database**
3. Substitua no código:

```javascript
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "...",
  projectId: "...",
  ...
};
```

---

## ⚠️ Segurança

* Denúncias NÃO são aprovadas automaticamente
* Apenas o administrador pode adicionar itens na blacklist
* Evita bloqueios indevidos

---

## 📍 Objetivo

Criar uma ferramenta simples e acessível para:

> 🛡️ **Proteger cidadãos contra golpes digitais no dia a dia**

---

## 👨‍💻 Autor

Desenvolvido por **Joel**
📚 Estudante de Análise e Desenvolvimento de Sistemas

---

## 📌 Status do Projeto

🚧 Em desenvolvimento — melhorias futuras incluem:

* Integração com IA real
* Painel administrativo
* Sistema de autenticação
* API de verificação

---

## 💙 Mensagem

> “A tecnologia deve proteger as pessoas, não confundi-las.”

---

