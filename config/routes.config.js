const express = require("express");
const router = express.Router();
const users = require("../controllers/users.controller");
const posts = require("../controllers/post.controller");
const { checkAuth } = require("../middlewares/auth.middlewares");

// router.get("/", (req, res) => {
//   res.send("hola");
// });


// router.use(checkAuth); // tomaría para todo
// users CRUD
router.post("/users", users.create);
router.get("/users", checkAuth, users.list);
router.get("/users/:id", checkAuth, users.detail);
router.patch("/users/:id", checkAuth, users.update); // patch solo partes
// router.put("/users/:id", users.update); // put reemplazar todo
router.delete("/users/:id", checkAuth, users.delete);

router.post("/login", users.login);

router.use(checkAuth); // tomaría para todo hacia abajo
// posts CRUD
router.post("/posts", posts.create);
router.get("/posts", posts.list);
router.get("/posts/:id", posts.detail);
router.patch("/posts/:id", posts.update);
router.delete("/posts/:id", posts.delete);

module.exports = router;