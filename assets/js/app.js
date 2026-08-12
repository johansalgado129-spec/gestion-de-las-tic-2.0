const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");
const toggleHelp = document.getElementById("toggleHelp");
const helpBox = document.getElementById("helpBox");
const navLinks = document.querySelectorAll(".nav-link");

menuBtn?.addEventListener("click", () => {
  sidebar.classList.toggle("open");
});

toggleHelp?.addEventListener("click", () => {
  helpBox.classList.toggle("show");
  toggleHelp.textContent = helpBox.classList.contains("show")
    ? "Ocultar explicación"
    : "¿Cómo se calcula?";
});

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    navLinks.forEach(item => item.classList.remove("active"));
    link.classList.add("active");
    sidebar.classList.remove("open");
  });
});

// Resalta automáticamente la sección visible en navegación.
const sections = document.querySelectorAll("section[id]");
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle(
          "active",
          link.getAttribute("href") === `#${entry.target.id}`
        );
      });
    }
  });
}, { threshold: 0.45 });

sections.forEach(section => observer.observe(section));


// =========================================================
// Juego de aprendizaje: toma de decisiones tecnológicas
// =========================================================

const gameQuestions = [
  {
    title: "Una empresa quiere comprar un nuevo software porque está de moda en su sector.",
    context: "El proveedor promete aumentar la productividad, pero la empresa todavía no ha medido sus tiempos actuales.",
    answers: [
      { label: "Comprar de inmediato", text: "Aprovechar la tendencia antes que la competencia.", correct: false },
      { label: "Medir primero", text: "Definir indicadores de productividad antes de implementar.", correct: true },
      { label: "Preguntar al proveedor", text: "Aceptar como principal evidencia las cifras comerciales.", correct: false },
      { label: "Cambiar todo el proceso", text: "Rediseñar la operación completa antes de probar la herramienta.", correct: false }
    ],
    feedback: "La decisión más sólida es medir la situación actual. Sin una línea base, no se puede demostrar si la tecnología realmente mejora la productividad."
  },
  {
    title: "La tecnología cuesta menos de lo presupuestado, pero requiere licencias anuales y capacitación.",
    context: "El gerente considera que el proyecto es barato porque solo está comparando el precio inicial de compra.",
    answers: [
      { label: "Aceptar el precio", text: "El costo inicial está dentro del presupuesto.", correct: false },
      { label: "Calcular costo total", text: "Incluir licencias, soporte, capacitación y actualizaciones.", correct: true },
      { label: "Eliminar capacitación", text: "Reducir costos dejando que el personal aprenda solo.", correct: false },
      { label: "Comprar más licencias", text: "Aprovechar el presupuesto disponible desde el inicio.", correct: false }
    ],
    feedback: "El gestor debe revisar el costo total de propiedad, no solamente el valor de compra."
  },
  {
    title: "El nuevo sistema funciona bien en una prueba con cinco personas.",
    context: "La empresa tiene 300 empleados y varios sistemas conectados entre sí.",
    answers: [
      { label: "Implementar en toda la empresa", text: "La prueba ya demostró que el sistema funciona.", correct: false },
      { label: "Ampliar el piloto", text: "Probar carga, integración y perfiles de usuario más realistas.", correct: true },
      { label: "Cancelar el proyecto", text: "Cinco usuarios no son suficientes para confiar en la tecnología.", correct: false },
      { label: "Ignorar integración", text: "La compatibilidad puede resolverse después.", correct: false }
    ],
    feedback: "Un piloto debe parecerse a las condiciones reales. Una prueba pequeña puede ocultar problemas de escala e integración."
  },
  {
    title: "El personal expresa resistencia porque la herramienta cambia su forma habitual de trabajar.",
    context: "Técnicamente el sistema es adecuado, pero varios usuarios sienten que no fueron tenidos en cuenta.",
    answers: [
      { label: "Imponer el cambio", text: "La productividad es más importante que la opinión del equipo.", correct: false },
      { label: "Gestionar la adopción", text: "Capacitar, escuchar usuarios y acompañar el cambio.", correct: true },
      { label: "Descartar la tecnología", text: "Toda resistencia significa que la herramienta es mala.", correct: false },
      { label: "Esperar sin intervenir", text: "La resistencia desaparecerá por sí sola.", correct: false }
    ],
    feedback: "La adopción humana es un factor tecnológico clave. Capacitación y gestión del cambio reducen el riesgo de fracaso."
  },
  {
    title: "La matriz de IA asigna una calificación final de 4.2 sobre 5.",
    context: "El resultado es favorable, pero la empresa maneja información sensible y todavía no ha realizado una revisión de seguridad.",
    answers: [
      { label: "Aceptar la IA", text: "Un puntaje superior a 4 es suficiente para implementar.", correct: false },
      { label: "Validar riesgos críticos", text: "Revisar seguridad y contexto antes de decidir.", correct: true },
      { label: "Cambiar los pesos", text: "Modificar la matriz hasta que el resultado sea 5.", correct: false },
      { label: "Ignorar la matriz", text: "La IA no puede aportar nada a una decisión tecnológica.", correct: false }
    ],
    feedback: "La IA orienta, pero no sustituye una revisión crítica. Un riesgo de seguridad puede ser decisivo aunque el promedio sea alto."
  }
];

let currentQuestion = 0;
let gameScore = 0;
let answered = false;

const gameTitle = document.getElementById("gameTitle");
const scoreValue = document.getElementById("scoreValue");
const gameProgressBar = document.getElementById("gameProgressBar");
const questionText = document.getElementById("questionText");
const questionContext = document.getElementById("questionContext");
const answerGrid = document.getElementById("answerGrid");
const feedbackBox = document.getElementById("feedbackBox");
const nextQuestionBtn = document.getElementById("nextQuestionBtn");
const gameCard = document.getElementById("gameCard");
const gameResult = document.getElementById("gameResult");
const finalScoreTitle = document.getElementById("finalScoreTitle");
const finalScoreText = document.getElementById("finalScoreText");
const restartGameBtn = document.getElementById("restartGameBtn");

function renderQuestion() {
  if (!questionText) return;

  const q = gameQuestions[currentQuestion];
  answered = false;

  gameTitle.textContent = `Escenario ${currentQuestion + 1} de ${gameQuestions.length}`;
  scoreValue.textContent = gameScore;
  gameProgressBar.style.width = `${((currentQuestion + 1) / gameQuestions.length) * 100}%`;

  questionText.textContent = q.title;
  questionContext.textContent = q.context;
  answerGrid.innerHTML = "";
  feedbackBox.className = "feedback-box";
  feedbackBox.textContent = "";
  nextQuestionBtn.disabled = true;
  nextQuestionBtn.textContent = currentQuestion === gameQuestions.length - 1
    ? "Ver resultado"
    : "Siguiente escenario";

  q.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.className = "answer-btn";
    button.innerHTML = `<strong>Opción ${String.fromCharCode(65 + index)}</strong>${answer.label}: ${answer.text}`;
    button.addEventListener("click", () => chooseAnswer(button, answer));
    answerGrid.appendChild(button);
  });
}

function chooseAnswer(button, answer) {
  if (answered) return;
  answered = true;

  const buttons = [...answerGrid.querySelectorAll(".answer-btn")];
  buttons.forEach(btn => btn.disabled = true);

  if (answer.correct) {
    gameScore += 20;
    button.classList.add("correct");
    feedbackBox.className = "feedback-box show good";
    feedbackBox.textContent = `Correcto. ${gameQuestions[currentQuestion].feedback}`;
  } else {
    button.classList.add("incorrect");
    const correctIndex = gameQuestions[currentQuestion].answers.findIndex(a => a.correct);
    buttons[correctIndex].classList.add("correct");
    feedbackBox.className = "feedback-box show bad";
    feedbackBox.textContent = `No es la mejor decisión. ${gameQuestions[currentQuestion].feedback}`;
  }

  scoreValue.textContent = gameScore;
  nextQuestionBtn.disabled = false;
}

function showFinalResult() {
  gameCard.style.display = "none";
  gameResult.classList.add("show");
  gameTitle.textContent = "Juego completado";
  gameProgressBar.style.width = "100%";

  if (gameScore === 100) {
    finalScoreTitle.textContent = `100/100 · Gestor estratégico`;
    finalScoreText.textContent = "Identificaste correctamente los factores técnicos, financieros y humanos. Además, aplicaste una mirada crítica frente a las recomendaciones de la inteligencia artificial.";
  } else if (gameScore >= 60) {
    finalScoreTitle.textContent = `${gameScore}/100 · Buen criterio`;
    finalScoreText.textContent = "Tienes una buena base para evaluar decisiones tecnológicas. Conviene reforzar la relación entre costos, adopción, seguridad y validación de los resultados generados por IA.";
  } else {
    finalScoreTitle.textContent = `${gameScore}/100 · Debes reforzar`;
    finalScoreText.textContent = "Revisa nuevamente los seis factores y la sección de mirada crítica. La clave es no tomar decisiones tecnológicas con un solo criterio.";
  }
}

nextQuestionBtn?.addEventListener("click", () => {
  if (!answered) return;

  if (currentQuestion < gameQuestions.length - 1) {
    currentQuestion++;
    renderQuestion();
  } else {
    showFinalResult();
  }
});

restartGameBtn?.addEventListener("click", () => {
  currentQuestion = 0;
  gameScore = 0;
  gameResult.classList.remove("show");
  gameCard.style.display = "";
  renderQuestion();
});

renderQuestion();
