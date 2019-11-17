module.exports.inicioChat=(application,req,res)=>{

  const ValidationReq=application.Functions.ValidationReq;

    const erros=ValidationReq(req);
 
    if(!erros.isEmpty())
    {
      return res.render ('index',{validacao:erros.errors});
    }

    const dados=req.body;
    const db = application.banco.db();
    const io=application.get("io");

    new application.app.models.chatUsuarios().verificaUsuariosRepetidos(db,dados.nickname,(err, result)=>{

      if(result.length>0)
      {
        const usuarioDuplicado=[{
          msg: "Nome ou NickName já existente! Por favor entra com outro."
        }];
        return res.render ('index',{validacao:usuarioDuplicado});
      }

      new application.app.models.chatUsuarios().salvarUsuario(db,dados,(err, result)=>{

          io.emit("msgCliente",
          {
            nickName:dados.nickname,
            mensagem:"Acabou de entrar no chat!",
            log:true
          }
        );
    
        res.render("chat",{ nickName:dados.nickname });

      });

    });

}

module.exports.sairChat=(application,req,res)=>{

  const id= req.query.id;
  const nickname=req.query.nickName;
  const db = application.banco.db();
  const io=application.get("io");

    new application.app.models.chatUsuarios().removeUsuario(db,id,(err, result)=>{

      io.emit("msgCliente",
      {
        nickName:nickname,
        mensagem:"Acabou de sair do chat!",
        log:true
      }
    );

    res.redirect("/");

  });

}