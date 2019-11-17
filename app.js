const app=require("./config/server");
const port = process.env.port || 5000;
const socket=require("socket.io");

/* Dois protocolos diferentes:
    Aplicação HTTP
    e Socket
*/
const server=app.listen(port,()=>{
    console.log("Servidor online na porta: "+port);
});

const io=socket.listen(server);

// Definido variável global que irá existir dentro servidor
// Cuidado importante não definir variaveis pre-definidas como exemplo "views"
app.set("io",io);

/* Conexão por WebSocket
   Escutar eventos de conexão
   Responsável de pesquisar uma tentativa feita de conexão do lado cliente
   On vai tar escutando pedidos de execução tanto lado cliente/servidor ou vice-versa.
   Emit irá fazer um pedido para executar alguma ação.
*/
io.on("connection",socket=>{
    console.log("Usuário conectou.");
    //console.log("Id socket usuario servidor connection: "+socket.id);

    // Recupera todos usuários que estão conectados no chat
    const getUsuarios=()=>{
        const db = app.banco.db();
        new app.app.models.chatUsuarios().getUsuarios(db,(err, result)=>{

        socket.emit("listaUsuariosChat",
            {
                listaUsuarios: result
            }
        );

        socket.broadcast.emit("listaUsuariosChat",
            { 
                listaUsuarios: result
            }
        );
      });
    }
    
        getUsuarios();

    // Essa método ocorre quando usuário deixa uma conexão que estava sendo usado WebSocket.
    socket.on("disconnect",()=>{
        getUsuarios();

        //console.log("Id socket usuario servidor disconnect: "+socket.id);
        console.log("Usuário desconectou.");
    });

    socket.on("msgServidor",data=>{

        // Mensagens dos participantes do chat
        // Aqui aparece para o usuario em si que enviou
        socket.emit("msgCliente",
            { 
              nickName:data.nickName,
              mensagem:data.mensagem,
              log:false
            }
        );

        /* 
            Broadcast faz aparecer para todos outros usuarios
            que estão conectados e não para quem enviou.
        */
        socket.broadcast.emit("msgCliente",
            { 
               nickName:data.nickName,
               mensagem:data.mensagem,
               log:false
            }
        );

    });
});
