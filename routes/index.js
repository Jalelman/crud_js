const express = require('express');
const router = express.Router()

let toDoItems = [
    { id: 1, task: "buy milk" }
    , { id: 2, task: "buy bread" }
    , { id: 3, task: "buy eggs" }   
]

router.get("/", (_, res) => {
    res.render("index", { toDoItems })
})

router.get("/new", (req, res) => {
    res.render("new")
})

router.post("/new", (req, res) => {
    const body = req.body
    toDoItems.push({ id: toDoItems.length + 1, task: body.task })
    res.redirect("/")
})

router.get("/edit/:id", (req, res) => {
    const { id } = req.params
    // const {task} = req.body
    // toDoItems[id].task = task  
    // console.log({ task })
    const todo = toDoItems.filter(item => item.id == id)
    console.log(todo)
    res.render("editTodo", { todo: todo[0] })
})

router.post("/edit/:id", (req, res) => {
    const { id } = req.params
    const { task } = req.body
    const updateIndex = toDoItems.findIndex(item => item.id == id)
    if (updateIndex != -1) {
        toDoItems[updateIndex].task = task
        res.redirect("/")
    } else {
        res.status(404).send("todo not found")
    }
})

router.post("/delete/:id", (req, res) => {
    let { id } = req.params
    let newtodos = toDoItems.filter(item => item.id != id)
    console.log({ newtodos })
    toDoItems = newtodos
    res.redirect("/")
})

module.exports = router