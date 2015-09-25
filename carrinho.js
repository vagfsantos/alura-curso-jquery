var umaPropaganda = function(){
    var propagandas = ["O que acha de comprar uma motocicleta?",
               "O que acha de comprar uma lancha?",
               "O que acha de comprar uma bicicleta?",
               "O que acha de comprar uma carro?"
               ];

    var posicao = Math.floor(propagandas.length *Math.random());
    var texto = propagandas[posicao];
    var tr =$("<tr>").addClass("propaganda").append($("<td>"));
    tr.find("td").attr("colspan", 6).text(texto);
    return tr;
}

function atualizaDados(){
	var carrinho = $('.carrinho');

	carrinho.each(function(){
		var total = 0;
		var carrinho = $(this);
		var itens = carrinho.find(".item-total:visible");

		for(var i = 0; i < itens.length; i++){
			var item = parseFloat($(itens[i]).text());
			total = total+item;
		}

		carrinho.find(".valor-total").text(total);
		carrinho.find(".quantidade-de-itens").text(itens.length);
	});
}

function removeItem(event){
	event.preventDefault();
	var atual = parseInt($(".quantidade-de-itens").text());
	var novo = atual -1;
	$(".quantidade-de-itens").text(novo);

	$(this).closest("tr").hide();
			
	atualizaDados();			
}

function desfazer(){
	var carrinho = $(this).closest('.carrinho');
	carrinho.find("tr:visible").removeClass("recuperado");
	var trs = carrinho.find("tr:hidden");
	trs.addClass("recuperado");
	trs.show();
	atualizaDados();
}

function daDestaque(){
	$(this).find(".remove-item").fadeIn();
	$(this).addClass("hovering");
}
function tiraDestaque(){
	$(this).find(".remove-item").fadeOut();
	$(this).removeClass("hovering");
}

function alteraPropagandas(e){
	e.preventDefault();
	$(".alterna-propaganda").toggle();
	$(".propaganda").fadeToggle();
}


function inicializacao(){
	atualizaDados();
	 $(".carrinho").each(function(){    
            $(this).find("tr:nth-child(3n), tr:last").each(function(){
                umaPropaganda().insertAfter($(this));
            });
        });

	 $("tbody tr").hover(daDestaque, tiraDestaque);

	 $(".alterna-propaganda").click(alteraPropagandas);
}
		
$(inicializacao);
$(".remove-item").click(removeItem);
$(".undo").click(desfazer);