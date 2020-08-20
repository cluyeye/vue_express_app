
const express = require('express');
const mongodb = require('mongodb');
const { Router } = require('express');

const router = express.Router();



// Get Posts
router.get('/', async (req, res) => {
    const posts = await loadPostsCollection();

    res.send(await posts.find({}).toArray());
});


// Add Post
router.post('/', async (req, res) => {
    const posts = await loadPostsCollection();

    await posts.insertOne({
        text: req.body.text,
        created: new Date()
    });

    res.status(201).send();
});

// Delete Post
router.delete('/:id', async (req, res) => {
    const posts = await loadPostsCollection();

    await posts.deleteOne({
        _id: new mongodb.ObjectID(req.params.id)
    });

    res.status(200).send();
});


async function loadPostsCollection() {

    const MongoClient = await mongodb.MongoClient.connect('mongodb+srv://root:HZFdE8Vao7YgWuxD@vue-express.huml0.mongodb.net/vue_express_db?retryWrites=true&w=majority', 
    { useNewUrlParser: true });
    
    return MongoClient.db('vue_express_db').collection('posts');

}


module.exports = router;