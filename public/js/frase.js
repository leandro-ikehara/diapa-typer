$("#botao-frase").on("click", fraseAleatoria);
$("#botao-frase-id").on("click", buscaFrase);

function fraseAleatoria(){

    $("#spinner").toggle(); //novo, mostrando o spinner

    $.get("http://localhost:3000/frases", trocaFrase)
    .fail(function(){
        $("#erro").toggle();
        setTimeout(function(){
            $("#erro").toggle();
        },1500);
    })
    .always(function(){ // novo, escondendo o spinner
        $("#spinner").toggle();
    });
}

function trocaFrase(data) {
    var frase = $(".frase");
    var idAleatorio = Math.floor(Math.random() * data.length);
    frase.text(data[idAleatorio].texto);
    atualizaTamanhoFrase();
    atualizaTempoInicial(data[idAleatorio].tempo);
}

function buscaFrase() {
    $("#spinner").toggle();
    var fraseID = $("#frase-id").val();
    var dados = {id: fraseID};
    $.get("http://localhost:3000/frases", dados, trocaFrase)
    .fail(function(){
        $("#erro").toggle();
        setTimeout(function(){
            $("#erro").toggle();
        },1500);
    })
    .always(function(){
        $("#spinner").toggle();
    });
}

function trocaFrase(data) {
    var frase = $(".frase");
    frase.text(data.texto);
    atualizaTamanhoFrase();
    atualizaTempoInicial(data.tempo);
}