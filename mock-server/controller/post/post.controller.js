const express = require('express');
const router = express.Router();
const findUserIdByUsername = require('../../shared/find-user-id-by-username');
const jwtParseOnly = require('../../shared/jwt-parse-only');
const userHasPermissionOnPost = require('../../shared/user-has-permission-on-post');

const ensurePostIdExists = require('../../shared/ensure-post-id-exists');
const ensureUserIdInJwtValid = require('../../shared/ensure-user-id-in-jwt-valid');
let posts = require('../../mock-data/posts');
const MockUsers = require('../../mock-data/users');

const getTimeStamp = () => Math.floor(Date.now() / 1000);

router.get('/posts', jwtParseOnly, (req, res) => {
    const payload = req.user?.roles.includes('admin')
        ? posts
        : posts.filter(post => !post.isDraft);

    return res.json(payload);
});

router.get('/posts/:id', jwtParseOnly, (req, res) => {
    const post = posts.find((p) => +p.id === +req.params.id);

    if (!post) {
        res.status(404).json({message: "Post not found with id: " + req.params.id});
    } else {
        post.author = MockUsers.find((u) => +u.id === +post.authorId);
        if (!post.isDraft || (!post.isDraft && req?.user.sub === post.author?.username)) {
            res.json(post);
        } else {
            res.sendStatus(401);
        }
    }
});

router.post('/posts', jwtParseOnly, ensureUserIdInJwtValid, (req, res) => {
    const userId = findUserIdByUsername(req.user);

    req.body.createdAt = getTimeStamp();

    const ids = posts.map(p => p.id);

    const maxId = ids.length > 0 ? Math.max(...ids) : 0;
    const nextId = maxId + 1;

    // add single-post-home to single-post-home-list array
    const newPost = {
        id: nextId,
        createdAt: getTimeStamp(),
        authorId: userId,
        author: null,
        title: '',
        body: '',
        category: null,
        tags: [],
        mainImage: null,
        imageIdList: [],
        isDraft: true,
        updatedAt: null,
    };

    posts.push(newPost);

    res.status(201).json(newPost);
});

router.patch('/posts/:id', ensurePostIdExists, jwtParseOnly, ensureUserIdInJwtValid, (req, res) => {
    const targetIndex = posts.findIndex((p) => +p.id === +req.params.id)
    const targetPost = posts[targetIndex];

    req.body.id = +req.params.id;
    if (userHasPermissionOnPost(req.user, targetPost)) {
        req.body.updatedAt = getTimeStamp();

        posts[targetIndex] = {...targetPost, ...req.body};
        res.status(201).json(posts[targetIndex]);
    } else {
        res.sendStatus(401);
    }
});

router.put('/posts/:id', ensurePostIdExists, jwtParseOnly, ensureUserIdInJwtValid, (req, res) => {
    const targetIndex = posts.findIndex((p) => +p.id === +req.params.id)

    req.body.id = +req.params.id;
    req.body.updatedAt = getTimeStamp();

    if (userHasPermissionOnPost(req.user, posts[targetIndex])) {
        posts[targetIndex] = req.body;
        res.status(200).json(posts[targetIndex]);
    } else {
        res.sendStatus(401);
    }
});

router.delete('/posts/:id', ensurePostIdExists, jwtParseOnly, ensureUserIdInJwtValid, (req, res) => {
    const id = +req.params.id;
    console.log('deleting a post by id: ', id);
    const targetPost = posts.find((p) => p.id === id);
    if (userHasPermissionOnPost(req.user, targetPost)) {
        posts = posts.filter((post) => post.id !== id);
        res.status(204).json();
    } else {
        res.sendStatus(401);
    }
});

module.exports = router;
