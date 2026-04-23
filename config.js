// ============================================================
//  CESAR School · Linkhub da Turma — Configuração Central
//  Lugar para editar todas as informações de forma estruturada
// ============================================================

const CONFIG = {

  // ── Identidade ──────────────────────────────────────────
  turma: "CC Turma B",
  semestre: "2026.1",
  whatsappLink: "https://chat.whatsapp.com/DsINbN4jMXgL8Jmdc8P2Un?mode=gi_t",

  // ── Links Institucionais ─────────────────────────────────
  links: [
    {
      label: "Portal do Aluno (Lyceum)",
      url: "https://cesar.lyceum.com.br/AOnline3/#/home/avisos",
      icon: "🎓",
      type: "link",
    },
    {
      label: "Eden AI",
      url: "https://www.edenai.com.br/home-student",
      icon: "🤖",
      type: "link",
    },
    {
      label: "Comunidade CESAR School",
      url: "https://a.cesar.school/ConviteCC",
      icon: "👥",
      type: "link",
    },
    {
      label: "Portal de Carreiras - Workalove",
      url: "https://workability.worka.love/#/",
      icon: "💼",
      type: "link",
    },
    {
      label: "Manual do Estudante",
      url: "assets/pdfs/Manual-do-Estudante-2026.1-CESAR-School.pdf",
      icon: "📖",
      type: "pdf",
    },
    {
      label: "Calendário Acadêmico",
      url: "assets/pdfs/Calendário Acadêmico 2026.1 Design e CC 231225_v2 (1).pdf",
      icon: "📅",
      type: "pdf",
    }
  ],

  // ── Disciplinas (com link do Classroom) ──────────────────
  disciplinas: [
    { nome: "Matemática para Computação",  classroom: "https://classroom.google.com/u/2/c/ODQ1OTAxNDE1NjA5" },
    { nome: "Sistemas Digitais",           classroom: "https://classroom.google.com/u/2/c/ODQzNDg3NDQ1MDky" },
    { nome: "Introdução à Computação",     classroom: "https://classroom.google.com/u/2/c/ODQ0MDc3NzE3MTg5" },
    { nome: "Fundamentos de Programação",  classroom: "https://classroom.google.com/u/2/c/ODQzNzczMDYyODc5" },
    { nome: "FP1: Gestão de Pessoas",      classroom: "https://classroom.google.com/u/2/c/ODQzNzcwODAxODMz" },
    { nome: "Projeto 01",                  classroom: "https://classroom.google.com/u/2/c/ODQzODcyOTE2OTAw" },
  ],


  // nota: aulas online têm online: true
  // nota: aulas de Projeto variam por grupo (ter/qua/qui) — indicado com aviso
  grade: [
    {
      dia: "Segunda-feira",
      aulas: [
        { horario: "08:15 – 10:15", disciplina: "Matemática para Computação", sala: "Sala A DEFINIR · Tiradentes" },
        { horario: "10:30 – 12:30", disciplina: "Sistemas Digitais", sala: "Sala Garagem 01 · Tiradentes" },
      ],
    },
    {
      dia: "Terça-feira",
      aulas: [
        { horario: "08:15 – 10:15", disciplina: "Introdução à Computação", sala: "Sala 05 · Apolo" },
        { horario: "10:30 – 12:30", disciplina: "Fundamentos de Programação", sala: "Sala 05 · Apolo" },
        { horario: "13:30 – 14:30", disciplina: "Projeto 01 ⚠️ ver grupo", sala: "A sala varia com o grupo · Apolo", aviso: true },
      ],
    },
    {
      dia: "Quarta-feira",
      aulas: [
        { horario: "08:15 – 10:15", disciplina: "Matemática para Computação", sala: "Sala A DEFINIR · Tiradentes" },
        { horario: "10:30 – 12:30", disciplina: "Sistemas Digitais", sala: "Sala Garagem 01 · Tiradentes" },
        { horario: "13:30 – 14:30", disciplina: "Projeto 01 ⚠️ ver grupo", sala: "A sala varia com o grupo · Apolo", aviso: true },
      ],
    },
    {
      dia: "Quinta-feira",
      aulas: [
        { horario: "08:15 – 10:15", disciplina: "Introdução à Computação", sala: "Sala 05 · Apolo" },
        { horario: "10:30 – 12:30", disciplina: "Fundamentos de Programação", sala: "Sala 05 · Apolo" },
        { horario: "13:30 – 14:30", disciplina: "Projeto 01 ⚠️ ver grupo", sala: "A sala varia com o grupo · Apolo", aviso: true },
      ],
    },
    {
      dia: "Sexta-feira",
      emoji: "🛋️",
      zoomLink: "https://cesar.zoom.us/j/82551008097",
      aulas: [
        { horario: "08:15 – 10:15", disciplina: "FP1: Gestão de Pessoas", sala: "Online 😴", online: true },
        { horario: "10:30 – 11:30", disciplina: "FP1: Gestão de Pessoas", sala: "Online 😴", online: true },
      ],
    },
  ],

  // ── Provas ───────────────────────────────────────────────
  // Datas extraídas da grade semanal (semana de 13–17/mar/2026)
  provas: [
    { data: "2026-04-13", disciplina: "Sistemas Digitais", tipo: "AV1 · 1ª Unidade", horario: "08:15", sala: "Sala 05 · Apolo" },
    { data: "2026-04-16", disciplina: "Introdução à Computação", tipo: "AV1 · 1ª Unidade", horario: "08:15", sala: "Sala 05 · Apolo" },
    { data: "2026-04-14", disciplina: "Fundamentos de Programação", tipo: "Módulo 1 · 1ª Unidade", horario: "10:30", sala: "Sala 05 · Apolo" },
    { data: "2026-04-15", disciplina: "Matemática para Computação", tipo: "AV1 · 1ª Unidade", horario: "08:15", sala: "Sala 05 · Apolo" },
    { data: "2026-04-17", disciplina: "FP1: Gestão de Pessoas", tipo: "AV1 · 1ª Unidade", horario: "08:15", sala: "Presencial" },
    { data: "2026-04-24", disciplina: "Projeto 01", tipo: "Status Report 1", horario: "A confirmar", sala: "Presencial" },
  ],

  // ── Monitorias ───────────────────────────────────────────
  // Para múltiplos horários da mesma disciplina, use entradas separadas
  monitorias: [
    { disciplina: "Matemática para Computação", dia: "Segunda-feira", horario: "14:30", sala: "Sala 05 · Apolo", link: "" },
    { disciplina: "Matemática para Computação", dia: "Sexta-feira", horario: "18:30", sala: "Online - Zoom", link: "" },
    { disciplina: "Sistemas Digitais", dia: "Segunda-feira", horario: "14:00", sala: "Online — Zoom", link: "" },
    { disciplina: "Projeto 01", dia: "—", horario: "A definir", sala: "—", link: "" },
    { disciplina: "Introdução à Computação", dia: "—", horario: "A definir", sala: "—", link: "" },
    { disciplina: "Fundamentos de Programação", dia: "Segunda-feira", horario: "13:30", sala: "Sala 04/05 · Apolo", link: "" },
    { disciplina: "Fundamentos de Programação", dia: "Terça-feira", horario: "14:30", sala: "Sala 04/05 · Apolo", link: "" },
  ],

};