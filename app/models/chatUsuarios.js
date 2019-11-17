function Chat(){
    
}

Chat.prototype.getUsuarios=(db,callback) =>
{
    db.query ('select * from chat',callback);
}

Chat.prototype.verificaUsuariosRepetidos=(db,nickname,callback) =>
{
    db.query ("select * from chat where upper(nickname)='"+nickname.toUpperCase()+"'",callback);
}

Chat.prototype.removeUsuario=(db,id,callback) =>
{
    db.query ('delete from chat where id='+id,callback);
}


Chat.prototype.salvarUsuario=(db,dados,callback) =>
{
    db.query ('insert into chat set ? ',dados,callback);
}

module.exports=() => Chat;