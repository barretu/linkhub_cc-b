/* ================================================================
   LINKHUB CC-B · CESAR School — Service Worker
   Arquivo: sw.js

   O que é um Service Worker?
   Um Service Worker é um script JavaScript que roda em segundo
   plano no navegador, separado da página principal. Ele funciona
   como um "intermediário" entre o site e a internet, podendo
   interceptar requisições de rede e responder com dados em cache.

   Para que serve aqui?
   Ele permite que o site funcione OFFLINE. Após a primeira visita
   com internet, o Service Worker salva os arquivos principais do
   site. Na próxima vez, mesmo sem internet, o site carrega.

   Por que ele fica num arquivo separado?
   O navegador registra o Service Worker em um contexto especial
   (fora da página), por isso precisa ser um arquivo .js separado.
   No script.js, este arquivo é registrado com:
     navigator.serviceWorker.register("sw.js")

   Limitação importante:
   Service Workers só funcionam em HTTPS (ou localhost).
   Em produção na Vercel isso funciona automaticamente.

   Como funciona o ciclo de vida?
   1. install  → primeira vez que o SW é registrado: baixa e guarda os arquivos
   2. activate → quando o SW assume o controle: limpa caches antigos
   3. fetch    → toda vez que a página faz uma requisição de rede
================================================================ */


/* ── Nome e versão do cache ──────────────────────────────────
   O cache tem um nome com versão. Quando você mudar o conteúdo
   do site, mude o número da versão (ex: "linkhub-v2") para que
   o SW baixe os arquivos atualizados e descarte o cache antigo.
────────────────────────────────────────────────────────────── */
const CACHE = "linkhub-v1";

/* ── Lista de arquivos para cache ────────────────────────────
   Estes são os arquivos que serão salvos localmente na instalação.
   Se um desses arquivos não existir no servidor, a instalação falha.
   
   Dica: não inclua arquivos que mudam frequentemente aqui,
   pois serão atualizados apenas quando a versão do cache mudar.
────────────────────────────────────────────────────────────── */
const ASSETS = [
  "./index.html",
  "./config.js",
  "./style.css",
  "./script.js",
  "./assets/images/school_laranja.png",
  "./assets/images/logo-cesar-school-branca.png",
  "./assets/pdfs/Manual-do-Estudante-2026.1-CESAR-School.pdf",
];


/* ================================================================
   EVENTO: install
   Disparado quando o Service Worker é instalado pela primeira vez
   (ou quando uma nova versão é detectada).
   
   e.waitUntil() diz ao navegador: "espere esta Promise terminar
   antes de considerar a instalação completa".
   
   caches.open() abre (ou cria) um cache com o nome especificado.
   c.addAll() baixa e armazena todos os arquivos da lista ASSETS.
   self.skipWaiting() faz o SW ativar imediatamente, sem esperar
   a aba ser fechada e reaberta.
================================================================ */
self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(ASSETS))   // baixa e guarda todos os arquivos
      .then(() => self.skipWaiting()) // ativa imediatamente
  );
});


/* ================================================================
   EVENTO: activate
   Disparado quando o Service Worker assume o controle.
   Usado para limpar caches de versões antigas.
   
   caches.keys() retorna os nomes de todos os caches existentes.
   filter() mantém só os caches com nome diferente do atual.
   Promise.all() executa várias Promises em paralelo.
   caches.delete() remove um cache pelo nome.
   self.clients.claim() faz o SW assumir o controle das abas
   abertas imediatamente (sem precisar recarregar).
================================================================ */
self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys =>
        Promise.all(
          // Deleta todos os caches que não são o atual
          keys.filter(k => k !== CACHE).map(k => caches.delete(k))
        )
      )
      .then(() => self.clients.claim()) // assume controle imediatamente
  );
});


/* ================================================================
   EVENTO: fetch
   Intercepta TODAS as requisições de rede feitas pela página
   (HTML, CSS, JS, imagens, fontes etc).
   
   Estratégia utilizada: NETWORK FIRST com fallback para cache
   
   Como funciona:
   1. Tenta buscar o arquivo na internet (fetch)
   2. Se conseguir → salva uma cópia no cache E retorna o arquivo
   3. Se falhar (sem internet) → retorna a cópia salva no cache
   
   Por que Network First?
   Garante que o usuário sempre veja o conteúdo mais atualizado
   quando tiver internet, mas ainda funciona offline como fallback.
   
   Alternativa seria "Cache First" (cache primeiro, rede como fallback),
   que é mais rápido mas pode mostrar conteúdo desatualizado.
================================================================ */
self.addEventListener("fetch", e => {
  e.respondWith(
    fetch(e.request) // tenta buscar na rede
      .then(res => {
        // Sucesso na rede: salva uma cópia no cache
        // res.clone() é necessário porque uma Response só pode ser
        // lida uma vez — clonamos para poder retornar E salvar
        const clone = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
        return res; // retorna a resposta original para a página
      })
      .catch(() => caches.match(e.request)) // falhou: busca no cache
  );
});