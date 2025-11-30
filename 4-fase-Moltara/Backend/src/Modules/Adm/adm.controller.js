import asyncHandler from 'express-async-handler'
import {getProfile, updateProfile} from './adm.service'

const getAdminProfile= asyncHandler(async (req, res) => {
 try {
 const profileData= await getProfile(req.user._id)
 res.json(profileData)

 }catch (error){
  res.status(error.status || 500)
  throw new error (error.message || 'Falha ao buscar perfil')
 }
})

const updateAdminProfile= asyncHandler(async (req, res) => {
 try{
  const {nome, email, senha}= req.body

  const result= await updateProfile(req.user._id, {nome, email, senha})

  res.json(result)

 }catch (error) {
  res.status(error.status || 500)
  throw new error(error.message || 'Falha ao atualizar perfil')
 }
})

export {getAdminProfile, updateAdminProfile}