const express = require('express');
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router()
router.post('/task', auth, async (req, res)=> {
    try {
        const task = new Task({
            ...req.body,
            owner: req.user._id
        });
        await task.save()
        res.send(task)
    } catch(e) {
        res.status(500).send()
    }
 })
router.get('/task', auth, async (req, res)=> {
    // if(req.query.completed){
    //     match = req.query.completed === 'true'
    // }
    if(req.query.sortBy) {
        var sort = {}
        const part = req.query.sortBy.split(':')
        sort[part[0]] = part[1] === 'desc' ? -1:1;
    }
    const task = await Task.find({owner: req.user._id}, null, {
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.skip),
        sort
    })
    res.send(task);

    // try {
    //     const task = await Task.find({owner: req.user._id}, null, {
    //                 limit: parseInt(req.query.limit),
    //                 skip: parseInt(req.query.skip),
    //                 sort: sort
    //             })

    //     res.send(task)
    //     // await req.user.populate({
    //     //     path: 'task',
    //     //     match,
    //     //     options: {
    //     //         limit: parseInt(req.query.limit),
    //     //         skip: parseInt(req.query.skip)
    //     //     }
    //     // }).execPopulate()
    //     if(!req.user.task){
    //         res.status(404).send()
    //     }
    //     res.send(req.user.task)
        
    // } catch (e) {
    //     res.status(500).send(e)
    // }
})
router.get('/task/:id', auth, async (req, res)=> {
    const _id =req.params.id
    try {
        const task = await Task.findOne({_id, owner: req.user._id})
        if(!task) {
            res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})
router.patch('/task/:id', auth, async (req, res) => {
    const updateProp = Object.keys(req.body);
    const modelProp = ['description', 'completed']
    const isvalid = updateProp.every((e)=> modelProp.includes(e))
    if(!isvalid) {
        return res.status(400).send()
    }
    try {
        const task = await Task.findOne({_id: req.params.id, owner: req.user._id});
       // const task = await Task.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, runValidators: true})
        if(!task){
            return res.status(400).send({err: 'task not found'})
        }
        updateProp.forEach((update)=> task[update] = req.body[update])
       await task.save()
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})
router.delete('/task/:id', auth, async (req, res)=> {
    try {
        const task = await Task.findOneAndDelete({_id:req.params.id, owner: req.user._id})

        if(!task){
            return res.status(400).send()
        }
        res.send(task)
    } catch(e) {
        res.status(500).send()
    }
})

module.exports = router