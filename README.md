# 📚 Linkhub CC-B · CESAR School

Hub de informações centralizado para turmas universitárias. Criado originalmente para a turma de **Ciência da Computação — Turma B 2026.1** da CESAR School, mas feito para ser adaptado por qualquer turma ou curso.

> Feito por **[Thony Barreto](https://github.com/barretu)** — Representante de sala · CC Turma B 2026.1 · CESAR School
> [![GitHub](https://img.shields.io/badge/GitHub-barretu-181717?style=flat&logo=github)](https://github.com/barretu)
> [![LinkedIn](https://img.shields.io/badge/LinkedIn-thony--barreto-0A66C2?style=flat&logo=linkedin)](https://www.linkedin.com/in/thony-barreto/)
> Vamos juntos! 🚀

---

## ✨ Funcionalidades

- Grade semanal com destaque automático no dia atual
- Calendário de provas e monitorias agrupados por disciplina
- Links do Google Classroom por disciplina
- Contador regressivo para a próxima prova
- Modo escuro/claro com preferência salva no navegador
- QR Code do site com download em `.png`
- Botões de copiar link, WhatsApp e instalar como app
- Instalável como app (PWA) com suporte offline
- Totalmente responsivo: funciona em qualquer tela

---

## 🗂️ Estrutura de Arquivos

```
linkhub/
├── assets/
│   ├── images/
│   │   ├── school_laranja.png
│   │   └── logo-cesar-school-branca.png
│   └── pdfs/
│       ├── Manual-do-Estudante-2026.1-CESAR-School.pdf
│       └── Calendário Acadêmico 2026.1 (...).pdf
├── index.html        → Estrutura da página (HTML)
├── style.css         → Visual e layout (CSS)
├── script.js         → Comportamento e lógica (JavaScript)
├── config.js         → ⚙️ CONFIGURAÇÕES — edite aqui
├── manifest.json     → Configurações do app (PWA)
└── sw.js             → Cache offline (Service Worker)
```

**Regra de ouro:** para atualizar qualquer informação do site — provas, monitorias, links, grade — você só precisa editar o `config.js`. Os outros arquivos raramente precisam ser tocados.

---

## 🛠️ Como adaptar para sua turma

### Passo 1 — Faça um fork do repositório

No GitHub, clique em **Fork** no canto superior direito. Isso cria uma cópia do projeto na sua conta para você modificar livremente.

### Passo 2 — Clone o repositório na sua máquina

Abra o terminal e rode:

```bash
git clone https://github.com/SEU_USUARIO/NOME_DO_REPO.git
cd NOME_DO_REPO
```

### Passo 3 — Edite o config.js

Abra o arquivo `config.js` em qualquer editor de texto (VS Code, Notepad++, etc). Ele está dividido em seções bem comentadas. Substitua os dados de exemplo pelos da sua turma:

```js
const CONFIG = {

  // ── Identidade ──────────────────────────────────────
  turma: "NOME DA SUA TURMA",       // ex: "ADS Turma A"
  semestre: "2026.1",               // semestre atual
  whatsappLink: "https://chat.whatsapp.com/SEU_LINK",

  // ── Links Institucionais ─────────────────────────────
  links: [
    {
      label: "Portal do Aluno",
      url: "https://url-do-portal-da-sua-faculdade.com",
      icon: "🎓",
      type: "link",   // "link" para URLs, "pdf" para documentos
    },
    // adicione ou remova links conforme necessário
  ],

  // ── Grade Semanal ─────────────────────────────────────
  grade: [
    {
      dia: "Segunda",
      aulas: [
        { horario: "08:00 – 10:00", disciplina: "Nome da Disciplina", sala: "Sala 01" },
      ],
    },
    // repita para cada dia da semana
  ],

  // ── Provas ────────────────────────────────────────────
  provas: [
    { data: "2026-06-10", disciplina: "Nome", tipo: "P1", horario: "08:00", sala: "Sala 01" },
    // data no formato YYYY-MM-DD (ano-mês-dia)
  ],

  // ── Monitorias ────────────────────────────────────────
  monitorias: [
    { disciplina: "Nome", dia: "Terça", horario: "15:00", sala: "Sala 02", link: "" },
    // link: "" para monitorias sem link, ou coloque a URL do Meet/Teams
  ],

};
```

### Passo 4 — Substitua os arquivos de imagem e PDF

Coloque na pasta do projeto:
- Sua logo (PNG) em `assets/images/` — atualize o nome no `index.html` e `manifest.json`
- Seus PDFs em `assets/pdfs/` — atualize os nomes em `config.js` dentro do array `links`

### Passo 5 — Links do Classroom (opcional)

Se sua turma usa o Google Classroom, preencha os links na seção `disciplinas` do `config.js`:

```js
disciplinas: [
  { nome: "Nome da Disciplina", classroom: "https://classroom.google.com/c/ID_DA_TURMA" },
],
```

Para pegar o link do Classroom: abra a turma → clique nos três pontinhos → "Copiar link de convite" (ou use a URL da barra de endereços).

O nome em `disciplinas[].nome` precisa ser **idêntico** ao nome em `grade[].aulas[].disciplina`, `provas[].disciplina` e `monitorias[].disciplina` para o botão aparecer nos lugares certos.

---

## 🚀 Como subir no GitHub e publicar na Vercel

### Subindo no GitHub

Se você clonou um fork, o repositório já está conectado ao GitHub. Para enviar suas alterações:

```bash
# 1. Verifica quais arquivos foram modificados
git status

# 2. Adiciona todos os arquivos modificados
git add .

# 3. Cria um "commit" — um registro das suas mudanças
#    A mensagem descreve o que você fez
git commit -m "feat: adaptado para turma ADS 2026.1"

# 4. Envia para o GitHub
git push
```

**O que é um commit?**
Um commit é como uma "foto" do estado do seu projeto em um momento. Cada commit tem uma mensagem descritiva. Juntos, os commits formam o histórico do projeto — você pode voltar para qualquer ponto anterior.

**Dica de mensagens de commit:**
- `feat: adiciona provas de junho` — nova funcionalidade
- `fix: corrige link do portal` — correção de bug
- `update: atualiza horário de monitoria` — atualização de conteúdo

### Publicando na Vercel

A Vercel é uma plataforma gratuita que hospeda sites estáticos (HTML/CSS/JS) com domínio próprio e HTTPS automático.

1. Acesse [vercel.com](https://vercel.com) e crie uma conta (pode entrar com o GitHub)
2. Clique em **"Add New Project"**
3. Selecione o repositório do Linkhub
4. Não precisa configurar nada — a Vercel detecta automaticamente que é um site estático
5. Clique em **"Deploy"**
6. Em menos de 1 minuto, seu site estará no ar com uma URL do tipo `linkhub-ccb.vercel.app`

**Deploy automático:**
A partir daí, toda vez que você der `git push`, a Vercel detecta a mudança e publica a versão atualizada automaticamente em menos de 1 minuto. Você nunca precisa entrar na Vercel de novo para atualizar o site.

---

## 📦 Tecnologias utilizadas

| Tecnologia | Para que serve |
|---|---|
| HTML5 | Estrutura e conteúdo da página |
| CSS3 | Visual, layout e animações |
| JavaScript | Lógica, interações e renderização dinâmica |
| CSS Grid | Layout responsivo da grade semanal |
| CSS Custom Properties | Sistema de temas (claro/escuro) |
| Web App Manifest | Instalação como app (PWA) |
| Service Worker API | Cache offline |
| localStorage | Salvar preferência de tema do usuário |
| Clipboard API | Copiar link para área de transferência |
| QuickChart API | Geração do QR Code |
| Google Fonts | Tipografia (Bricolage Grotesque + Plus Jakarta Sans) |

**Nenhuma dependência externa de JavaScript.** Zero frameworks, zero `npm install`, zero build. Abre direto no navegador.

---

## 📱 Instalando como app no celular

**Android (Chrome)**
1. Abra o site no Chrome
2. Toque nos três pontinhos ⋮ no canto superior direito
3. Selecione **"Adicionar à tela inicial"** ou **"Instalar app"**
4. Confirme tocando em **"Adicionar"**

**iPhone (Safari)**
1. Abra o site no Safari (não funciona em outros navegadores)
2. Toque no ícone de compartilhar — quadrado com seta pra cima, na barra inferior
3. Role e toque em **"Adicionar à Tela de Início"**
4. Confirme tocando em **"Adicionar"**

O app funciona offline após a primeira visita com internet.

---

---

## 📄 Explicação do manifest.json

O `manifest.json` é um arquivo de configuração que transforma o site em um **PWA (Progressive Web App)** — ou seja, permite que ele seja instalado como um app no celular, sem precisar de loja.

Quando o navegador detecta o `<link rel="manifest">` no `index.html`, ele lê este arquivo para saber como exibir o app instalado.

```json
{
  "name": "Linkhub CC-B · CESAR School",
```
Nome completo do app. Aparece na tela de instalação e em alguns launchers de Android.

```json
  "short_name": "Linkhub CC-B",
```
Nome curto exibido embaixo do ícone na tela inicial do celular. Use no máximo 12 caracteres para não cortar.

```json
  "description": "Hub de informações da turma CC B 2026.1 — CESAR School",
```
Descrição do app. Usada por buscadores e lojas de apps progressivos.

```json
  "start_url": "./index.html",
```
Qual página abrir quando o usuário tocar no ícone do app. `./` significa "na mesma pasta".

```json
  "display": "standalone",
```
Como o app aparece ao ser aberto. As opções são:
- `standalone` → abre como app nativo, sem a barra de endereços do navegador ✅ (usado aqui)
- `browser` → abre como site normal, com barra de endereços
- `fullscreen` → ocupa a tela toda, sem nenhuma barra
- `minimal-ui` → como standalone, mas com botões de voltar/avançar

```json
  "background_color": "#e35a00",
```
Cor de fundo da **splash screen** — a tela que aparece por um instante enquanto o app carrega, antes do conteúdo aparecer. Use a cor principal do seu site.

```json
  "theme_color": "#e35a00",
```
Cor da barra de status do Android (a barra com hora e ícones do sistema) quando o app está aberto. Também é a cor da linha no topo do Chrome quando o site é aberto no celular.

```json
  "orientation": "portrait-primary",
```
Orientação preferida do app. `portrait-primary` = vertical (retrato). Outras opções: `landscape`, `any`.

```json
  "icons": [
    {
      "src": "assets/images/school_laranja.png",
```
Caminho para o arquivo de ícone do app.

```json
      "sizes": "any",
```
`"any"` indica que o arquivo serve para qualquer tamanho — funciona bem com PNG e SVG. O ideal seria ter versões em 192x192 e 512x512, mas `"any"` resolve na maioria dos casos.

```json
      "type": "image/png",
```
Formato do arquivo de ícone. Use `image/png` para PNG e `image/svg+xml` para SVG.

```json
      "purpose": "any maskable"
```
Define como o ícone pode ser usado:
- `any` → ícone normal
- `maskable` → o Android pode recortar o ícone em formas diferentes (círculo, quadrado arredondado etc). Para isso funcionar bem, o logo precisa ter margem/padding ao redor — a área segura é um círculo inscrito no ícone.
- `any maskable` → os dois ao mesmo tempo ✅ (usado aqui)

**Para adaptar para sua turma**, mude `name`, `short_name`, `description` e o caminho do `src` do ícone. As cores devem combinar com o visual do seu site.



Encontrou um bug ou tem uma ideia de melhoria? Abra uma [issue](../../issues) ou mande um pull request!

**Para contribuir:**

```bash
# 1. Faça um fork do projeto
# 2. Crie uma branch para sua alteração
git checkout -b minha-melhoria

# 3. Faça suas alterações e commit
git add .
git commit -m "feat: minha melhoria"

# 4. Envie para o seu fork
git push origin minha-melhoria

# 5. Abra um Pull Request no GitHub
```

---

## 📄 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

Em resumo: você pode usar, copiar, modificar e distribuir livremente — inclusive para fins comerciais — desde que mantenha o crédito do autor original.