module.exports=application=>{

    const ValidationCheckChat=application.Functions.ValidationCheckChat;

    application.post("/chat",ValidationCheckChat(),(req,res)=>{
        application.app.controllers.chat.inicioChat(application,req,res);
    });

    application.get("/chat/sair",(req,res)=>{
        application.app.controllers.chat.sairChat(application,req,res);
    });

}