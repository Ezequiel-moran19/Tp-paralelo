const btnModo = document.getElementById("modo-oscuro");
  const icono = document.getElementById("icono-modo");
  const body = document.body;

  // Estado inicial desde localStorage
  if(localStorage.getItem("modo") === "oscuro") {
    body.classList.add("modo-oscuro");
    icono.className = "bi bi-sun-fill";
  }

  btnModo.addEventListener("click", () => {
    body.classList.toggle("modo-oscuro");
    if(body.classList.contains("modo-oscuro")) {
      icono.className = "bi bi-sun-fill";
      localStorage.setItem("modo", "oscuro");
    } else {
      icono.className = "bi bi-moon-fill";
      localStorage.setItem("modo", "claro");
    }
  });