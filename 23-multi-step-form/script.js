let currentStep = 0;
const formSteps = document.querySelectorAll(".form-step");
const form = document.querySelector("form");

// next step click
/** */
form.addEventListener("click", (e) => {
  // block all actions that dont have [data-action] (i'snt btn)
  if (!e.target.matches("[data-action]")) {
    return;
  }
  const actions = {
    next() {
      if (!isValidInputs()) {
        return;
      }
      currentStep++;
    },
    prev() {
      currentStep--;
    },
  };

  const action = e.target.dataset.action;
  // next or prev
  actions[action]();
  console.log(currentStep);
  updateActiveStep();
  updateProgressStep();
});

// form submit
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // get all input data that have the attribute "name"
  const data = new FormData(form);
  let completedFields = [];

  for (let [key, value] of data) {
    if (value.trim() != "") {
      const fieldLabel = document.querySelector(`[for=${key}]`).textContent;
      completedFields.push(`${fieldLabel}: ${value}`);
    }
  }

  console.log(completedFields);

  let alertMessage = [
    `Obrigado ${data.get("name")}! Os seguintes campos foram preenchidos:`,
    ...completedFields,
  ].join("\n");

  alert(alertMessage);
});

// update steps
function updateActiveStep() {
  formSteps.forEach((step) => step.classList.remove("active"));
  formSteps[currentStep].classList.add("active");
}

const progressSteps = document.querySelectorAll(".step-progress [data-step]");
function updateProgressStep() {
  progressSteps.forEach((step, idx) => {
    step.classList.remove("active");
    step.classList.remove("done");

    if (idx < currentStep + 1) {
      step.classList.add("active");
    }

    if (idx < currentStep) {
      step.classList.add("done");
    }
  });
}

// validation
function isValidInputs() {
  const currentFormStep = formSteps[currentStep];
  const formFields = [
    ...currentFormStep.querySelectorAll("input"),
    ...currentFormStep.querySelectorAll("textarea"),
  ];

  // verify every input field need to report validity (is not valid)

  return formFields.every((input) => input.reportValidity());
}

// animation
formSteps.forEach((formStep) => {
  function addHide() {
    formStep.classList.add("hide");
  }

  formStep.addEventListener("animationend", () => {
    addHide();
    formSteps[currentStep].classList.remove("hide");
  });
});
