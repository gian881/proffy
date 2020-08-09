const express = require("express")
const nunjucks = require("nunjucks")
const {
    pageLanding,
    pageStudy,
    pageGiveClasses,
    saveClasses,
    pageGiveClassesSuccess
} = require("./pages.js")

const app = express()

const PORT = 5000

nunjucks.configure("src/views", {
    express: app,
    noCache: true,
})

app.use(express.static("public"))

//receber dados do req.body
app.use(
    express.urlencoded({
        extended: true,
    })
)

app.get("/", pageLanding)

app.get("/study", pageStudy)

app.get("/give-classes", pageGiveClasses)

app.get("/give-classes-success", pageGiveClassesSuccess)

app.post("/save-classes", saveClasses)

app.listen(PORT)

console.log(`Listening on http://localhost:${PORT}`)