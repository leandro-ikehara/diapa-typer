$("#botao-frase").click(fraseAleatoria);

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