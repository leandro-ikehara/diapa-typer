$("#botao-placar").on("click", mostraPlacar);
$("#botao-salvar").on("click", salvaPlacar);

function inserePlacar() {
    var corpoTabela = $(".placar").find("tbody");
    var usuario = "Leandro";
    var numPalavras = $("#contador-palavras").text();

    var linha = novaLinha(usuario, numPalavras);
    linha.find(".botao-remover").on("click", removeLinha);

    corpoTabela.prepend(linha); // 'prepend' adiciona a linha no início da tabela --> 'append' adiciona no final
    $(".placar").slideDown();
    rolarPlacar();
}

function rolarPlacar(){
    var posicaoPlacar = $(".placar").offset().top;
    $("body").animate({
        scrollTop: posicaoPlacar + "px"
    }, 1000);
}

function novaLinha(usuario, palavras) {
    var linha = $("<tr>");
    var colunaUsuario = $("<td>").text(usuario);
    var colunaPalavras = $("<td>").text(palavras);
    var colunaRemover = $("<td>");

    var link = $("<a>").addClass("botao-remover").attr("href", "#");
    var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

    link.append(icone); // tag <i> dentro da tag <a>
    
    colunaRemover.append(link); // tag <a> dentro da tag <td>

    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);

    return linha;
}

function removeLinha() {
    window.event.preventDefault(); // função 'event' descontinuada, mas acessível através de 'window.event'
    var linha = $(this).parent().parent();

    linha.fadeOut(1000);
    setTimeout(function(){
        linha.remove();
    }, 1000);
}

function mostraPlacar() {
//  $(".placar").toggle(); --> essa função do jQuery mostra e esconde o Placar
    $(".placar").stop().slideToggle(1000); // essa função provoca um deslocamento suave na página
}

function salvaPlacar() {
    var placar = []; // salva o placar no array do json
    var linhas = $("tbody>tr");
    linhas.each(function(){
        var usuario = $(this).find("td:nth-child(1)").text(); // recursos do jQuery e CSS
        var palavras = $(this).find("td:nth-child(2)").text();

        var score = { // cria um objeto para ser salvo no array
            usuario: usuario,
            pontos: palavras
        };

        placar.push(score);
    });

    var dados = {
        placar: placar
    };

    $.post("http://localhost:3000/placar", dados, function(){
        alert("Placar sincronizado com sucesso");
    });
}

function atualizaPlacar() {

    $.get("http://localhost:3000/placar", function(data){

        $(data).each(function(){
            var linha = novaLinha(this.usuario, this.pontos);
            linha.find(".botao-remover").on("click", removeLinha);
            $("tbody").append(linha);
        });
    });
}