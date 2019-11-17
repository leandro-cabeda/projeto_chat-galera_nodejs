const { check, validationResult } = require('express-validator');

const ValidationCheckChat = () => {
  return [
    check('nickname',"Nome ou NickName é obrigatório").not().isEmpty(),
    check('nickname',"Nome ou NickName tem que constar no minimo 5 e maximo 20 caracteres.")
    .isLength({ min: 5,max:20 }),
  ]
}

const ValidationReq=req=>validationResult(req);

const Functions=()=>{
  return {
    ValidationCheckChat,
    ValidationReq
  }
}

module.exports=Functions;