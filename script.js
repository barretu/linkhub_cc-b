/* ================================================================
   LINKHUB CC-B · CESAR School — JavaScript Principal
   Arquivo: script.js

   O que é JavaScript?
   JavaScript (JS) é a linguagem que dá COMPORTAMENTO ao site.
   Enquanto HTML define a estrutura e CSS define o visual,
   o JS controla o que acontece quando o usuário interage:
   cliques, scroll, animações dinâmicas, cálculos etc.

   Como o HTML carrega este arquivo?
   No final do index.html, antes de </body>:
     <script src="script.js"></script>
   Ele fica no final para garantir que o HTML já foi totalmente
   carregado antes de o JS tentar manipulá-lo.

   Dependência do config.js:
   Este arquivo usa a variável global CONFIG, que é definida
   pelo config.js carregado antes deste arquivo.
================================================================ */


/* ================================================================
   1. FUNÇÃO PRINCIPAL DE RENDERIZAÇÃO
   init() lê os dados do CONFIG e cria os elementos HTML
   dinamicamente. Em vez de escrever cada card no HTML, o JS
   os gera a partir dos dados do config.js.
   
   Por que fazer assim?
   Porque assim para atualizar o conteúdo do site, basta editar
   o config.js — sem precisar mexer no HTML.
================================================================ */

function init() {

  /* ── Header ─────────────────────────────────────────────
     Preenche o título e subtítulo com os dados do CONFIG.
     getElementById() encontra um elemento pelo seu atributo id="".
     textContent define o texto visível do elemento.
  ────────────────────────────────────────────────────────── */
  document.getElementById("h-turma").textContent = CONFIG.turma;
  document.getElementById("header-sem").textContent =
    "Semestre " + CONFIG.semestre + " · CESAR School";

  /* ── Link do WhatsApp ────────────────────────────────────
     O botão de WhatsApp na share bar tem id="wa-btn".
     Aqui definimos o destino do link (href) com o valor do CONFIG.
  ────────────────────────────────────────────────────────── */
  document.getElementById("wa-btn").href = CONFIG.whatsappLink;


  /* ── Links Importantes ───────────────────────────────────
     Para cada link definido em CONFIG.links, criamos um elemento
     <a> (link HTML) e o adicionamos ao grid de links.
     
     forEach() percorre cada item de um array.
     l = cada objeto de link ({ label, url, icon, type })
  ────────────────────────────────────────────────────────── */
  const grid = document.getElementById("links-grid");

  CONFIG.links.forEach(l => {
    // Cria o elemento <a> (link HTML)
    const a = document.createElement("a");
    a.href = l.url;
    a.target = "_blank";  // abre em nova aba
    a.rel = "noopener";   // segurança: impede que a nova aba acesse a página original
    a.className = "link-card";

    // Define o elemento do lado direito do card:
    // PDFs mostram badge "PDF", links mostram seta →
    const isPdf = l.type === "pdf";
    const right = isPdf
      ? `<span class="link-badge">PDF</span>`
      : `<svg class="link-arrow" width="16" height="16" viewBox="0 0 24 24"
           fill="none" stroke="currentColor" stroke-width="2.2"
           stroke-linecap="round" stroke-linejoin="round">
           <path d="M5 12h14M12 5l7 7-7 7"/>
         </svg>`;

    // Detecta se o ícone é texto simples (ex: "EA") ou emoji
    // \p{Emoji} é uma expressão regular que detecta caracteres emoji
    // A flag /u habilita suporte a Unicode completo
    const isTextIcon = l.icon.length <= 3 && !/\p{Emoji}/u.test(l.icon);
    const iconHtml = isTextIcon
      ? `<span class="link-icon"><span class="link-icon-text">${l.icon}</span></span>`
      : `<span class="link-icon">${l.icon}</span>`;

    // Template literal (crase `) permite montar strings com variáveis
    // usando ${variavel} dentro do texto
    a.innerHTML = `
      ${iconHtml}
      <span class="link-label">${l.label}</span>
      ${right}
    `;

    // Adiciona o card criado ao grid no HTML
    grid.appendChild(a);
  });


  /* ── Grade Semanal ───────────────────────────────────────
     Para cada dia da semana no CONFIG.grade, criamos um card
     com as aulas do dia. O dia de hoje recebe destaque especial.
  ────────────────────────────────────────────────────────── */

  // getDay() retorna 0=Domingo, 1=Segunda... 6=Sábado
  // A fórmula (dia + 6) % 7 converte para 0=Segunda, 1=Terça... 6=Domingo
  // Isso facilita comparar com o nosso array que começa na Segunda
  const todayIdx = (new Date().getDay() + 6) % 7;
  const dias = ["Segunda","Terça","Quarta","Quinta","Sexta","Sábado","Domingo"];
  const sched = document.getElementById("schedule");

  CONFIG.grade.forEach(d => {
    const isToday  = dias[todayIdx] === d.dia; // é o dia de hoje?
    const isFriday = d.dia === "Sexta";        // é sexta (aulas online)?

    const card = document.createElement("div");
    // Adiciona classes condicionalmente: "day-card today friday"
    card.className = "day-card"
      + (isToday  ? " today"  : "")
      + (isFriday ? " friday" : "");

    // Gera o HTML de cada aula do dia
    // map() transforma cada item do array em uma string HTML
    // join("") une todas as strings sem separador
    const aulasHtml = d.aulas.map(a => `
      <div class="aula-item">
        <div class="aula-horario">${a.horario}</div>
        <div class="aula-disc">${a.disciplina}</div>
        <div class="aula-sala">${a.sala}</div>
        ${a.aviso ? `<div class="aula-aviso">⚠️ confira seu grupo</div>` : ""}
      </div>
    `).join("");

    // Badge "🛋️ em casa" só nas sextas
    const fridayBadge = isFriday
      ? '<span class="friday-badge">🛋️ em casa</span>'
      : '';

    // Botão do Zoom — só aparece na sexta e quando o link estiver preenchido no config.js
    const zoomBtn = (isFriday && d.zoomLink)
      ? `<a href="${d.zoomLink}" target="_blank" rel="noopener" class="zoom-btn">
           <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
             <path d="M17 10.5V7a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1v-3.5l4 4v-11l-4 4z"/>
           </svg>
           Entrar na aula
         </a>`
      : '';

    card.innerHTML = `
      <div class="day-name">
        ${d.dia}
        ${isToday ? '<span class="today-badge">hoje</span>' : ''}
        ${fridayBadge}
      </div>
      ${aulasHtml}
      ${zoomBtn}
    `;

    sched.appendChild(card);
  });


  /* ── Funções auxiliares para Provas e Monitorias ─────────
     Estas funções são definidas aqui dentro do init() porque
     são usadas apenas nas seções de Provas e Monitorias.
  ────────────────────────────────────────────────────────── */

  // Busca o link do Classroom de uma disciplina pelo nome
  // find() retorna o primeiro item do array que satisfaz a condição
  // O operador && retorna o segundo valor se o primeiro for verdadeiro
  const classroomUrl = (nome) => {
    const disc = (CONFIG.disciplinas || []).find(d => d.nome === nome);
    return disc && disc.classroom ? disc.classroom : "";
  };

  // Ícone SVG do Google Classroom (usado nos cabeçalhos de disciplina)
  const classroomIcon = `<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18V17l7 3.82L19 17v-3.82L12 17l-7-3.82z"/>
  </svg>`;


  /* ── Calendário de Provas ─────────────────────────────────
     As provas são agrupadas por disciplina.
     
     Passo 1: Ordenar as provas por data (mais próximas primeiro)
     Passo 2: Agrupar por disciplina em um objeto
     Passo 3: Para cada disciplina, criar um grupo com header + cards
  ────────────────────────────────────────────────────────── */
  const provasList = document.getElementById("provas-list");

  // new Date() sem horário pode ter problemas de fuso horário.
  // setHours(0,0,0,0) garante que "hoje" começa à meia-noite.
  const now = new Date(); now.setHours(0,0,0,0);

  const monthNames = ["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"];

  // Cria uma cópia do array (spread ...) e ordena por data
  // sort() com função comparadora: retorna negativo, zero ou positivo
  // new Date(a.data) - new Date(b.data) coloca as mais antigas primeiro
  const sorted = [...CONFIG.provas].sort((a, b) =>
    new Date(a.data) - new Date(b.data)
  );

  // Agrupa provas por disciplina num objeto chave:valor
  // Ex: { "Matemática": [prova1, prova2], "Sistemas Digitais": [prova3] }
  const provasByDisc = {};
  sorted.forEach(p => {
    if (!provasByDisc[p.disciplina]) provasByDisc[p.disciplina] = [];
    provasByDisc[p.disciplina].push(p);
  });

  // Object.entries() converte o objeto em array de pares [chave, valor]
  // Desestruturação [disc, provas] extrai chave e valor de cada par
  Object.entries(provasByDisc).forEach(([disc, provas]) => {
    // Container do grupo de disciplina
    const group = document.createElement("div");
    group.className = "materia-group";

    // Cabeçalho com nome da disciplina + botão do Classroom (se tiver link)
    const header = document.createElement("div");
    header.className = "materia-header";
    const cl = classroomUrl(disc);
    header.innerHTML = `
      <span>${disc}</span>
      ${cl ? `<a href="${cl}" target="_blank" rel="noopener" class="disc-classroom">
                ${classroomIcon} Classroom
              </a>` : ""}
    `;
    group.appendChild(header);

    // Card de cada prova da disciplina
    provas.forEach(p => {
      // "T12:00:00" adiciona horário do meio-dia para evitar problemas
      // de fuso horário que poderiam mudar a data
      const d = new Date(p.data + "T12:00:00");
      const upcoming = d >= now; // é uma prova futura?

      const card = document.createElement("div");
      card.className = "prova-card" + (upcoming ? " upcoming" : "");

      // padStart(2,"0") garante dois dígitos: "5" vira "05"
      card.innerHTML = `
        <div class="prova-date">
          <div class="day">${d.getDate().toString().padStart(2,"0")}</div>
          <div class="month">${monthNames[d.getMonth()]}</div>
        </div>
        <div class="prova-info">
          <div class="disc">${p.disciplina}</div>
          <div class="detail">${p.horario} · ${p.sala}</div>
        </div>
        <div class="prova-tipo">${p.tipo}</div>
      `;
      group.appendChild(card);
    });

    provasList.appendChild(group);
  });


  /* ── Monitorias ──────────────────────────────────────────
     Mesma lógica das provas: agrupadas por disciplina,
     com header mostrando o link do Classroom.
  ────────────────────────────────────────────────────────── */
  const monList = document.getElementById("monitorias-list");

  const monByDisc = {};
  CONFIG.monitorias.forEach(m => {
    if (!monByDisc[m.disciplina]) monByDisc[m.disciplina] = [];
    monByDisc[m.disciplina].push(m);
  });

  Object.entries(monByDisc).forEach(([disc, mons]) => {
    const group = document.createElement("div");
    group.className = "materia-group";

    const header = document.createElement("div");
    header.className = "materia-header";
    const cl = classroomUrl(disc);
    header.innerHTML = `
      <span>${disc}</span>
      ${cl ? `<a href="${cl}" target="_blank" rel="noopener" class="disc-classroom">
                ${classroomIcon} Classroom
              </a>` : ""}
    `;
    group.appendChild(header);

    mons.forEach(m => {
      const card = document.createElement("div");
      card.className = "monitoria-card";

      // Lógica para determinar o badge/botão do lado direito:
      // 1. Se tem link → botão "Entrar" clicável
      // 2. Se é online e já tem horário → badge "🌐 Online"
      // 3. Se é "a definir" → badge acinzentado
      // 4. Caso padrão → badge "Presencial"
      const isOnline   = m.sala.toLowerCase().includes("online");
      const isADefinir = m.horario === "A definir" || m.dia === "—";

      const linkHtml = m.link
        ? `<a href="${m.link}" target="_blank" rel="noopener" class="monitoria-link">Entrar</a>`
        : isOnline && !isADefinir
          ? `<span class="monitoria-link">🌐 Online</span>`
          : isADefinir
            ? `<span class="monitoria-link" style="opacity:.45;cursor:default;">A definir</span>`
            : `<span class="monitoria-link" style="opacity:.5;cursor:default;">Presencial</span>`;

      card.innerHTML = `
        <div class="monitoria-dot"></div>
        <div class="monitoria-info">
          <div class="monitoria-disc">
            ${m.dia !== "—" ? m.dia + " · " + m.horario : "Horário a definir"}
          </div>
          <div class="monitoria-detail">${m.sala}</div>
        </div>
        ${linkHtml}
      `;
      group.appendChild(card);
    });

    monList.appendChild(group);
  });
}


/* ================================================================
   2. FUNÇÕES DE COMPARTILHAMENTO
================================================================ */

/* ── Copiar link ─────────────────────────────────────────────
   window.location.href retorna a URL atual completa da página.
   navigator.clipboard.writeText() copia texto para a área de
   transferência (API moderna).
   .catch() trata o caso em que a API moderna não está disponível
   (navegadores mais antigos) com um método alternativo.
────────────────────────────────────────────────────────────── */
function copyLink() {
  const url = window.location.href;
  navigator.clipboard.writeText(url)
    .then(() => toast("Link copiado! 🔗"))
    .catch(() => {
      // Fallback para navegadores sem suporte à Clipboard API
      // Cria um textarea invisível, seleciona o texto e copia
      const ta = document.createElement("textarea");
      ta.value = url;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy"); // método legado, ainda funciona
      document.body.removeChild(ta);
      toast("Link copiado! 🔗");
    });
}


/* ── Modal de instalação PWA ────────────────────────────────
   classList.add/remove/toggle manipulam as classes CSS de um elemento.
   Adicionar "open" no overlay faz o modal aparecer (via CSS).
────────────────────────────────────────────────────────────── */
function openPWA()  { document.getElementById("pwa-modal").classList.add("open"); }
function closePWA(e) {
  // Só fecha se clicou no fundo escuro (não no modal em si)
  // e.target é o elemento que foi clicado
  if (!e || e.target === document.getElementById("pwa-modal"))
    document.getElementById("pwa-modal").classList.remove("open");
}

// Alterna entre as abas Android e iPhone no modal de instalação
function switchTab(os) {
  document.getElementById("steps-android").classList.toggle("active", os === "android");
  document.getElementById("steps-ios").classList.toggle("active", os === "ios");
  document.getElementById("tab-android").classList.toggle("active", os === "android");
  document.getElementById("tab-ios").classList.toggle("active", os === "ios");
}


/* ── Modal do QR Code ────────────────────────────────────────
   Usa a API do QuickChart para gerar um QR Code da URL atual.
   encodeURIComponent() converte caracteres especiais da URL para
   formato seguro de usar em outra URL (ex: & vira %26).
────────────────────────────────────────────────────────────── */
function openQR() {
  const url = encodeURIComponent(window.location.href);
  // Monta a URL da API do QuickChart com parâmetros:
  // text = conteúdo do QR | size = tamanho em px | ecLevel = nível de correção de erro
  const qrSrc = `https://quickchart.io/qr?text=${url}&size=200&margin=2&ecLevel=M`;
  document.getElementById("qr-img").src = qrSrc;
  document.getElementById("qr-url-text").textContent = decodeURIComponent(url);
  document.getElementById("qr-modal").classList.add("open");
}

function closeQR(e) {
  if (!e || e.target === document.getElementById("qr-modal"))
    document.getElementById("qr-modal").classList.remove("open");
}

/* ── Download do QR Code ─────────────────────────────────────
   async/await é a forma moderna de lidar com operações assíncronas
   (que levam tempo, como buscar dados da internet).
   
   fetch() faz uma requisição HTTP para buscar a imagem do QR Code.
   blob() converte a resposta em um objeto de arquivo binário.
   URL.createObjectURL() cria uma URL temporária para o arquivo.
────────────────────────────────────────────────────────────── */
async function downloadQR() {
  const url = encodeURIComponent(window.location.href);
  const qrSrc = `https://quickchart.io/qr?text=${url}&size=400&margin=2&ecLevel=M`;
  try {
    const res  = await fetch(qrSrc);
    const blob = await res.blob();
    // Cria um link invisível, define o arquivo para download e clica nele
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "qrcode-linkhub-cesar.png";
    a.click();
    toast("QR Code baixado! 📥");
  } catch {
    // Se o download falhar, abre a imagem em nova aba
    toast("Abra a imagem e salve manualmente.");
    window.open(qrSrc, "_blank");
  }
}


/* ================================================================
   3. TOAST (NOTIFICAÇÃO TEMPORÁRIA)
   Exibe uma mensagem brevemente na parte inferior da tela.
   O setTimeout agenda a remoção após 2.4 segundos.
   clearTimeout cancela um agendamento anterior (evita acúmulo).
================================================================ */
let toastTimer; // variável global para guardar o ID do timer

function toast(msg) {
  const el = document.getElementById("toast");
  el.textContent = msg;
  el.classList.add("show");      // torna visível via CSS
  clearTimeout(toastTimer);       // cancela timer anterior se existir
  toastTimer = setTimeout(() => el.classList.remove("show"), 2400);
}


/* ================================================================
   4. INICIALIZAÇÃO E BOOT
   document.fonts.ready é uma Promise que resolve quando todas as
   fontes do Google Fonts terminaram de carregar.
   Só então iniciamos o site para evitar o FOUT (Flash Of Unstyled Text).
================================================================ */
document.fonts.ready.then(() => {
  init();           // renderiza todo o conteúdo
  initCountdown();  // inicializa o contador de provas

  // Esconde a tela de loading após 700ms (tempo para o conteúdo renderizar)
  setTimeout(() => {
    document.getElementById("loading").classList.add("hidden");
    document.getElementById("app").classList.add("visible");
  }, 700);
});

// Fechar modais com a tecla Escape
document.addEventListener("keydown", e => {
  if (e.key === "Escape") { closeQR(); closePWA(); }
});

// Mostrar/esconder botão "voltar ao topo" baseado no scroll
// { passive: true } melhora a performance — indica que não vamos
// chamar preventDefault() dentro deste listener
const btt = document.getElementById("back-to-top");
window.addEventListener("scroll", () => {
  // toggle com segundo argumento: adiciona se verdadeiro, remove se falso
  btt.classList.toggle("visible", window.scrollY > 300);
}, { passive: true });

// Clicar na logo recarrega a página
document.querySelector(".logo-wrap").addEventListener("click", () => location.reload());


/* ================================================================
   5. MODO ESCURO / CLARO
   O tema é salvo no localStorage — um armazenamento persistente
   no navegador do usuário que mantém os dados entre sessões.
   
   Lógica de prioridade:
   1. Se o usuário já escolheu um tema (salvo no localStorage) → usa ele
   2. Se não → respeita a preferência do sistema operacional
================================================================ */
const toggle = document.getElementById("theme-toggle");

// localStorage.getItem() retorna null se a chave não existe
const saved = localStorage.getItem("theme");

// window.matchMedia verifica uma media query CSS via JavaScript
// prefers-color-scheme: dark detecta se o SO está em modo escuro
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

// Operador ternário: condição ? valor_se_verdadeiro : valor_se_falso
let isDark = saved ? saved === "dark" : prefersDark;

function applyTheme(dark) {
  // setAttribute define um atributo HTML no elemento
  // O CSS usa [data-theme="dark"] para aplicar as variáveis escuras
  document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  toggle.textContent = dark ? "☀️" : "🌙"; // atualiza o emoji do botão
  localStorage.setItem("theme", dark ? "dark" : "light"); // salva preferência
}

// Aplica o tema salvo/detectado ao carregar a página
applyTheme(isDark);

// Alterna o tema ao clicar no botão
toggle.addEventListener("click", () => {
  isDark = !isDark; // inverte o valor booleano
  applyTheme(isDark);
  // Animação de rotação ao clicar
  toggle.style.transform = "scale(1.2) rotate(360deg)";
  setTimeout(() => toggle.style.transform = "", 350);
});


/* ================================================================
   6. CONTADOR REGRESSIVO — PRÓXIMA PROVA
   Calcula quantos dias faltam para a próxima prova futura
   e exibe um banner com emoji de urgência progressivo.
================================================================ */
function initCountdown() {
  const banner = document.getElementById("countdown-banner");
  const now = new Date(); now.setHours(0,0,0,0);

  // Transforma cada prova em objeto com campo "date" já calculado
  // filter() mantém só os itens que satisfazem a condição
  // sort() ordena por data crescente
  const upcoming = CONFIG.provas
    .map(p => ({ ...p, date: new Date(p.data + "T12:00:00") }))
    .filter(p => p.date >= now)
    .sort((a, b) => a.date - b.date);

  // Se não há provas futuras, esconde o banner
  if (!upcoming.length) {
    banner.style.display = "none";
    return;
  }

  const next = upcoming[0]; // próxima prova (primeira do array ordenado)

  // Calcula diferença em dias: converte milissegundos para dias
  // Math.round arredonda para o inteiro mais próximo
  const diff = Math.round((next.date - now) / (1000 * 60 * 60 * 24));

  // Emoji muda conforme a urgência
  const emoji = diff === 0 ? "🚨"        // é hoje!
              : diff <= 3 ? "😳"         // até 3 dias
              : diff <= 7 ? "🤨"         // até 1 semana
              : "👀";                     // mais de 1 semana

  const label = diff === 0 ? "É hoje!"
              : diff === 1 ? "É amanhã!"
              : `faltam ${diff} dias`;

  // innerHTML define o HTML interno do elemento
  // Diferente de textContent, permite inserir tags HTML
  banner.innerHTML = `
    <div class="countdown-icon">${emoji}</div>
    <div class="countdown-text">
      <strong>${next.disciplina} · ${next.tipo}</strong>
      <span>${label} · ${next.horario} · ${next.sala}</span>
    </div>
    <div class="countdown-days">
      ${diff === 0 ? "!" : diff}
      <small>${diff === 0 ? "hoje" : "dias"}</small>
    </div>
  `;
}


/* ================================================================
   7. PWA — REGISTRO DO SERVICE WORKER
   Verifica se o navegador suporta Service Workers e registra o sw.js.
   O "in" verifica se uma propriedade existe em um objeto.
   O .catch(() => {}) silencia erros (ex: em localhost sem HTTPS).
   
   Por que verificar suporte?
   Navegadores mais antigos não têm essa API. A verificação evita
   que o código quebre nesses casos.
================================================================ */
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js").catch(() => {});
}