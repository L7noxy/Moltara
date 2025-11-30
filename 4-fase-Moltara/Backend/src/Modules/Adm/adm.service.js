import {findAdminById, updateAdmin} from './.adm.repository.js'

const getProfile= async (userId) =>{
 const user= await findAdminById(userId)

 if(!user){
 throw { status: 404, message: 'Perfil de Admnistrador não encontrado'}
 }

 return{
 _id: user._id,
 nome: user.nome,
 email: user.email,
 }
}

const updateProfile= async (userId, data) => {
 const emailRegex= /^[^\s@]+\.[^\s@]+$/
 if (data.email && !emailRegex.test(data.email)){
    throw{status: 404, message: 'Formato Email Invalido'}
 }

 const updateUser = await updateAdmin(userId, data)

 return{
 _id: updateUser._id,
 nome: updateUser.nome,
 email: updateUser.email,
 message: 'Perfil atualizado com sucesso!'
 }
}

export {getProfile, updateProfile}