const kanbanBoards = {
  todo: document.getElementById("kanban-todo"),
  doing: document.getElementById("kanban-doing"),
  done: document.getElementById("kanban-done"),
};

/**
 * @typedef {{
 *  id: number,
 *  title: string,
 *  body: string,
 *  tags: Array<string>,
 *  status: 'todo' | 'doing' | 'done'
 * }} taskType
 */

/**
 * @type {taskType[]}
 */
const KANBAN_TASKS = [
  {
    id: 1,
    title: "#boraCodar um Kanban 🧑‍💻",
    body: "Novo desafio do #boraCodar da Rocketseat, onde é proposto construir um quadro de Kanban.",
    tags: ["rocketseat", "desafio"],
    status: "todo",
  },
  {
    id: 2,
    title: "Manter a ofensiva 🔥",
    body: "Manter minha atividade na plataforma da Rocketseat para não perder a ofensiva",
    tags: ["rocketseat"],
    status: "todo",
  },
  {
    id: 3,
    title: "Almoçar 🥗",
    body: "Me alimentar, aproveitando um momento de descanso para recarregar minhas energias durante o almoço",
    tags: ["autocuidado"],
    status: "todo",
  },
  {
    id: 4,
    title: "Conferir o novo desafio 🚀 ",
    body: "Conferir o novo projeto do #boraCodar para fazê-lo da melhor maneira possível",
    tags: ["rocketseat", "desafio"],
    status: "doing",
  },
  {
    id: 5,
    title: "Ser incrível 😎",
    body: "sempre me lembrar de manter minha autenticidade e espalhar amor",
    tags: ["autocuidado"],
    status: "doing",
  },
  {
    id: 6,
    title: "#boraCodar uma página de login 🧑‍💻",
    body: "Novo desafio do #boraCodar da Rocketseat, onde é proposto construir um quadro de Kanban.",
    tags: ["rocketseat", "desafio"],
    status: "done",
  },
  {
    id: 7,
    title: "#boraCodar uma página de clima 🧑‍💻",
    body: "Novo desafio do #boraCodar da Rocketseat, onde é proposto construir um quadro de Kanban.",
    tags: ["rocketseat", "desafio"],
    status: "done",
  },
  {
    id: 8,
    title: "#boraCodar um conversor 🧑‍💻",
    body: "Novo desafio do #boraCodar da Rocketseat, onde é proposto construir um quadro de Kanban.",
    tags: ["rocketseat", "desafio"],
    status: "done",
  },
];

/**
 *
 * @param {taskType} task
 * @returns {string}
 */
function buildTask(task) {
  return `
  <div
    class="flex flex-col gap-2 text-sm p-5 shadow-lg border border-slate-200 rounded-md draggable-item bg-white"
    draggable="true"
  >
    <p class="font-bold text-slate-800">${task.title}</p>
    <p class="text-slate-700 line-clamp-2">${task.body}</p>
    <div class="flex gap-1">
      ${task.tags.map(
        (tag) => `
        <span class="text-violet-600 bg-violet-200 py-0.5 px-2 rounded-md">
          ${tag}
        </span>
      `
      )}
    </div>
  </div>
  `;
}

function buildAllTasks(tasks = KANBAN_TASKS) {
  Object.values(kanbanBoards).forEach((board) => (board.innerHTML = ""));

  tasks.forEach((task) => {
    kanbanBoards[task.status].innerHTML += buildTask(task);
  });
}

buildAllTasks();
