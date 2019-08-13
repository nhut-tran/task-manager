const express = require('express');
const User = require('../models/user')
const auth= require('../middleware/auth')
const multer= require('multer')
const router = new express.Router()
router.post('/user', async (req, res)=> {
    const user = new User(req.body);
     try {
        const token = await user.generateAuthToken()
         await user.save()
         res.status(201).send({
             user: user.publicUser(),
             token
         })
     } catch (e) {
         res.status(400).send(e)
     }
    
 })
 router.post('/user/logout', auth, async (req, res) => {

     req.user.tokens = req.user.tokens.filter((invtoken) => {
         invtoken.token !== req.token
     })
     await req.user.save()
     res.send('logout')
 })

 router.post('/user/logoutAll', auth, async (req, res) => {
     try {
         req.user.tokens = []
        await req.user.save()
        res.send('log all out')
     } catch (e) {
         res.status(500).send()
     }
 })
 router.get('/user/me', auth, async (req, res)=> {
     try {
         res.send(req.user.publicUser())
     }catch (e) {
         res.status(500).send(e)
     }
 
 })
 router.post('/user/login' ,async (req, res) => {
     try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken()
        res.send({
            user: user.publicUser(),
            token
        })
     } catch(e){
        res.status(400).send()
     }
 })
 router.patch('/user/me', auth, async (req, res) => {
     const updateProp = Object.keys(req.body);
     const modelProp = ['age', 'name', 'password', 'name'];

     const valid = updateProp.every((e) => modelProp.includes(e))
     if(!valid) {
         res.status(400).send({err: 'invalid prop'})
     }
   
     try {
         // const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
         updateProp.forEach((update) => {
             console.log(req.user[update])
             req.user[update] = req.body[update]
            })
         await req.user.save()
          res.send(req.user.publicUser())
     } catch (e) {
         res.status(500).send()
     }
    
 })
 router.delete('/user/me', auth, async (req, res) => {
     try {
        //  const user = await User.findByIdAndDelete(req.user._id);
        //  if(!user) {
        //   return res.status(400).send()
        //  }
       await req.user.remove()
        res.send()
     } catch (e) {
         res.status(500).send()
     }

 })
 const uploadAvatar = multer({
     limits: {
        fileSize: 1000000
     },
     fileFilter(req, file, cb) {

    //   if(file.originalname.endsWith('.jpg')||file.originalname.endsWith('.jpeg')||file.originalname.endsWith('.png')) {
         if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            cb(new Error('Images only'))
            
        }
         cb(undefined, true)
       
     }
 })
 router.post('/user/me/avatar',auth, uploadAvatar.single('nhut'), async (req, res)=> {
     req.user.avatar = req.file.buffer
     await req.user.save()
     res.send()
 }, (error, req, res, next)=> {
     res.status(400).send({err: error.message})
 })

 router.get('/user/me/avatar/send', auth, async (req, res)=> {
     if(!req.user.avatar) {
            throw new Error()
     }
     res.set('Content-type', 'image/jpg')
     res.send(req.user.avatar)
 })

 router.delete('/user/me/avatar', auth, async (req, res) => {
     console.log(req.user)
    req.user.avatar = undefined;
      await  req.user.save()
     res.send()
 }) 
 module.exports = router