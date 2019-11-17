$(document).ready(function () {
    $("#participantes").hide();

    const msg = $(".alert-info")
        .css("margin-top", "5px")
        .hide();

    const dialogos = $("#dialogos");

    $("#exibe_chat").click(function () {
        $("#conversa").show();
        $("#participantes").hide();
    });

    $("#exibe_participantes").click(function () {
        $("#participantes").show();
        $("#conversa").hide();
    });

    $(".btn").click(() => {

        const msg=$(".form-control").val().trim();

        if(msg=="") return false;

        socket.emit("msgServidor",
            {
                nickName: $("#nickName").val(),
                mensagem: msg
            });
        $(".form-control").val("");
      
    });

    // Conecta o socket do cliente para o servidor
    // A conexão io vai automaticamente procurar o evento parão no lado servidor.
    const socket = io("http://localhost:5000");

    // Mensagem dos usuários e quando um novo entrou no chat
    socket.on("msgCliente", data => {

        if (data.log) {

            msg.show().text(data.nickName + " " + data.mensagem);
            setTimeout(() => {
                msg.hide();
            }, 4000);

        }
        else 
        {
            var html = "<div class='dialogo'>";
            html += "<h4>" + data.nickName + "</h4>";
            html += "<p>" + data.mensagem + "</p>";
            html += "</div>";
            dialogos.append(html);

            window.scrollTo(0,document.body.scrollHeight);

            // Teste de remoção até tal limite
            //if (dialogos[0].children.length>10) dialogos[0].removeChild(dialogos[0].children[0]);

        }


    });

     // Lista dos usuários que estão no chat
    socket.on("listaUsuariosChat", data => {

        const sair_chat=$("#sair_chat");
        $("#usuarios").html("");
        var html="";
 
        for(let i=0; i < data.listaUsuarios.length;i++)
        {
                html += "<div class='participante'>";
                html += "<img src='images/ico_usuario.png' />";
                html += "<h4>" + data.listaUsuarios[i].nickname + "</h4>";
                html += "</div>";
            
            if(data.listaUsuarios[i].nickname===$("#nickName").val())
            {
                sair_chat.attr("href","/chat/sair?id="+data.listaUsuarios[i].id+
                "&nickName="+data.listaUsuarios[i].nickname);
            }
        }

         $("#usuarios").html(html);
    
    });

});
