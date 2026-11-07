(function () {
  "use strict";

  var KUNCI = "tema-profil";               
  var akar = document.documentElement;     

  
  function simpanTema(tema) {
    try { localStorage.setItem(KUNCI, tema); } catch (e) { /* abaikan */ }
  }

  function bacaTema() {
    try { return localStorage.getItem(KUNCI); } catch (e) { return null; }
  }


  function tentukanTemaAwal() {
    var tersimpan = bacaTema();
    if (tersimpan === "gelap" || tersimpan === "terang") {
      return tersimpan;
    }
    var sistemGelap = window.matchMedia &&
                      window.matchMedia("(prefers-color-scheme: dark)").matches;
    return sistemGelap ? "gelap" : "terang";
  }

  
  function perbaruiTombol(tema) {
    var tombol = document.getElementById("tombol-tema");
    if (!tombol) { return; }
    var gelap = (tema === "gelap");
    tombol.querySelector(".ikon-tema").textContent = gelap ? "☀️" : "🌙";
    tombol.querySelector(".teks-tema").textContent = gelap ? "Mode Terang" : "Mode Gelap";
  }

  function terapkanTema(tema) {
    akar.setAttribute("data-tema", tema);   
    perbaruiTombol(tema);
  }


  var temaSekarang = tentukanTemaAwal();
  akar.setAttribute("data-tema", temaSekarang);  

  document.addEventListener("DOMContentLoaded", function () {
    var tombol = document.getElementById("tombol-tema");
    if (!tombol) { return; }

    perbaruiTombol(temaSekarang);

    tombol.addEventListener("click", function () {
      temaSekarang = (temaSekarang === "gelap") ? "terang" : "gelap";
      terapkanTema(temaSekarang);
      simpanTema(temaSekarang);
    });
  });
})();