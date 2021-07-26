const express = require('express')
const posts = require('../model/posts')
const router = express.Router()

router.get('/all', (req, res) => {
    res.json(JSON.stringify(posts.getAll()))
})

router.post('/new', express.json(), (req, res) => {
    let title = req.body.title
    let description = req.body.description

    posts.newPost(title, description)

    res.send("Post Adicionado")
})

router.delete('/delete', express.json(), (req, res) => {
    posts.deletePost(req.body.id)

    res.send("Post Apagado")
})

module.exports = router