/* --------------------- CODIGO JAVASCRIPT - SIN JQUERY --------------------- */
//dentro de esta funcion agregamos todo el codigo js,
//para que solo se comience a ejecutar una vez que todas
//las etiquetas han sido cargadas
(function () {
  "use strict";

  // let regalo = document.querySelector('#regalo');
  document.addEventListener("DOMContentLoaded", function () {
    /* ---------------------------------- Mapa ---------------------------------- */
    if (document.querySelector("#mapa")) {
      var map = L.map("mapa").setView([13.310672, -87.191159], 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      L.marker([13.310672, -87.191159])
        .addTo(map)
        .bindPopup("GDLWebcamp 2020<br>Boletos disponibles")
        .openPopup()
        .bindTooltip("Un Tooltip")
        .openTooltip();
    }

    /* ---------------------------- reservacion.html ---------------------------- */
    if (document.querySelector("#calcular")) {
      /* -------------------------------- variables ------------------------------- */
      //campos datos de usuario
      let nombre = document.querySelector("#nombre");
      let apellido = document.querySelector("#apellido");
      let email = document.querySelector("#email");

      //campos pases
      let pase_dia = document.querySelector("#pase_dia");
      let pase_dosdias = document.querySelector("#pase_dosdias");
      let pase_completo = document.querySelector("#pase_completo");

      //botones/divs
      let calcular = document.querySelector("#calcular");
      let errorDiv = document.querySelector("#error");
      let btnReservar = document.querySelector("#btnReservar");
      let total_pedido = document.querySelector("#total_pedido");
      let listaProductos = document.querySelector("#lista-productos");
      let suma = document.querySelector("#suma-total");

      //valores
      let regalo = document.querySelector("#regalo");

      //extras
      let camisas = document.querySelector("#camisa_evento");
      let etiquetas = document.querySelector("#etiquetas");

      /* ---------------------------------- init ---------------------------------- */
      btnReservar.disabled = true;

      /* --------------------------------- eventos -------------------------------- */
      calcular.addEventListener("click", calcularMonto);
      pase_dia.addEventListener("blur", mostrarDias);
      pase_dosdias.addEventListener("blur", mostrarDias);
      pase_completo.addEventListener("blur", mostrarDias);
      nombre.addEventListener("blur", validarCampo);
      apellido.addEventListener("blur", validarCampo);
      email.addEventListener("blur", validarCampo);
      email.addEventListener("blur", validarEmail);

      /* -------------------------------- funciones ------------------------------- */
      function calcularMonto(e) {
        e.preventDefault();
        if (regalo.value === "") {
          alert("Debes elegir un regalo!");
          regalo.focus();
        } else {
          let vBoletosDia = parseInt(pase_dia.value, 10) || 0,
            vBoletos2Dias = parseInt(pase_dosdias.value, 10) || 0,
            vBoletosCompleto = parseInt(pase_completo.value, 10) || 0,
            vCantCamisas = parseInt(camisas.value, 10) || 0,
            vCantEtiquetas = parseInt(etiquetas.value, 10) || 0;

          let vTotalPagar =
            vBoletosDia * 30 +
            vBoletos2Dias * 45 +
            vBoletosCompleto * 50 +
            vCantCamisas * 10 * 0.93 +
            vCantEtiquetas * 2;

          let vListadoProductos = [];
          if (vBoletosDia >= 1) {
            vListadoProductos.push(`${vBoletosDia} Pases por dia`);
          }
          if (vBoletos2Dias >= 1) {
            vListadoProductos.push(`${vBoletos2Dias} Pases por 2 dias`);
          }
          if (vBoletosCompleto >= 1) {
            vListadoProductos.push(`${vBoletosCompleto} Pases completo`);
          }
          if (vCantCamisas >= 1) {
            vListadoProductos.push(`${vCantCamisas} Camisas`);
          }
          if (vCantEtiquetas >= 1) {
            vListadoProductos.push(`${vCantEtiquetas} Etiquetas`);
          }

          listaProductos.innerHTML = "";
          listaProductos.style.display = "block";
          vListadoProductos.forEach((producto) => {
            listaProductos.innerHTML += producto + "<br>";
          });

          // suma.innerHTML = "$ " + vTotalPagar.toFixed(2);
          suma.innerHTML = `$ ${vTotalPagar.toFixed(2)}`;

          btnReservar.disabled = false;
          total_pedido.value = vTotalPagar;
        }
      }

      function mostrarDias() {
        let vBoletosDia = parseInt(pase_dia.value, 10) || 0,
          vBoletos2Dias = parseInt(pase_dosdias.value, 10) || 0,
          vBoletosCompleto = parseInt(pase_completo.value, 10) || 0;

        let diasElegidos = [];
        document.querySelector(".contenido-dia").style.display = "none";

        if (vBoletosDia > 0) {
          diasElegidos.push("viernes");
        }
        if (vBoletos2Dias > 0) {
          diasElegidos.push("viernes", "sabado");
        }
        if (vBoletosCompleto > 0) {
          diasElegidos.push("viernes", "sabado", "domingo");
        }

        diasElegidos.forEach((dia) => {
          document.getElementById(dia).style.display = "block";
        });
      }

      function validarCampo() {
        // errorDiv.innerHTML = "";
        errorDiv.style.display = "none";
        this.style.border = "";
        if (this.value === "") {
          errorDiv.style.display = "block";
          errorDiv.innerHTML = `El campo '${this.id}' es obligatorio`;
          this.style.border = "2px solid red";
          // } else {
          //   errorDiv.style.display = "none";
          //   this.style.border = "";
        }
      }

      function validarEmail() {
        errorDiv.style.display = "none";
        this.style.border = "";
        if (this.value.indexOf("@") < 0) {
          errorDiv.style.display = "block";
          errorDiv.innerHTML = `El '${this.id}' no posee el formato correcto`;
          this.style.border = "2px solid red";
          // } else {
          //   errorDiv.style.display = "none";
          //   this.style.border = "";
        }
      }
    }
  });
})();

/* --------------------- CODIGO JAVASCRIPT - CON JQUERY --------------------- */
//dentro de esta funcion agregamos todo el codigo js,
//para que solo se comience a ejecutar una vez que todas
//las etiquetas han sido cargadas
// $(function () {
$(document).ready(function () {
  /* --------------------------------- General -------------------------------- */
  //scroll menu bar - fixed
  let windowHeight = $(window).height();
  let barraHeight = $(".barra").innerHeight();
  $(window).scroll(function () {
    let scroll = $(window).scrollTop();

    if (scroll > windowHeight) {
      $(".barra").addClass("fixed");
      $("body").css({ "margin-top": barraHeight + "px" });
    } else {
      $(".barra").removeClass("fixed");
      $("body").css({ "margin-top": "0px" });
    }
  });

  // Critical message
  let messageHeight = $(".critical_message").innerHeight;
  messageHeight = -1 * (windowHeight - messageHeight);
  $(".critical_message").css({ top: messageHeight });

  // Menu Responsive
  $(".menu-movil").on("click", function () {
    $(".navegacion-principal").slideToggle();
  });

  // titulo - lettering
  $(".nombre-sitio").lettering();

  //navegacion
  let seleccion = $("body").attr("id");
  $(seleccion).addClass("activo");

  /* ------------------------------- index.html ------------------------------- */
  if (document.querySelector(".menu-programa")) {
    // mostramos el primer programa del evento por default
    $(".menu-programa a:first").addClass("activo");
    $(".programa-evento .info-curso:first").show();

    // verificamos el evento seleccionado al dar click
    $(".menu-programa a").on("click", function () {
      let programaEvento = $(this).attr("href");

      $(".menu-programa a").removeClass("activo");
      $(this).addClass("activo");

      $(".ocultar").hide();
      $(programaEvento).fadeIn(1000);
      return false;
    });

    // resumen evento - animateNumber
    $(".resumen-evento li:nth-child(1) p").animateNumber({ number: 6 }, 1200);
    $(".resumen-evento li:nth-child(2) p").animateNumber({ number: 15 }, 1200);
    $(".resumen-evento li:nth-child(3) p").animateNumber({ number: 3 }, 1500);
    $(".resumen-evento li:nth-child(4) p").animateNumber({ number: 9 }, 1500);

    // cuenta regresiva - countdown
    $(".cuenta-regresiva").countdown("2020/12/30 12:00:00", function (e) {
      $("#dias").html(e.strftime("%D"));
      $("#horas").html(e.strftime("%H"));
      $("#minutos").html(e.strftime("%M"));
      $("#segundos").html(e.strftime("%S"));
    });
  }

  // colorbox
  $(".invitado-info").colorbox({ inline: true, width: "50%" });
});
