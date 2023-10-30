const express = require('express');
const app = express();

const morgan = require('morgan');
morgan('tiny');

const corsOptions = require('./cors-options');
const cors = require('cors');
app.use(cors(corsOptions));
app.use(express.json());

const postRouter = require('./controller/post/post.controller');
const userRouter = require('./controller/user/user.controller');
const categoryRouter = require('./controller/category/category.controller');

const port = 3000;

const router = express.Router();
app.use('/api/v1', router);
app.use((req, res, next) => {
  req.setEncoding('utf-8');
  next();
})

router.use(postRouter);
router.use(userRouter);
router.use(categoryRouter);

app.listen(port, () => {
  console.log(`Mock server listening at http://localhost:${port}`);
});
