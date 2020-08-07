const express = require("express")
const nunjucks = require("nunjucks")

let proffys = [{
        name: "Gian",
        avatar: "https://avatars1.githubusercontent.com/u/22121448?s=460&u=c96d4d427240e82209d1a39ed0e144dd784bd32b&v=4",
        whatsapp: "8199551122",
        bio: "biografia mesmo",
        subject: "Matemática",
        cost: "20",
        weekday: [0],
        time_from: [720],
        time_to: [1220],
    },
    {
        name: "Mateus",
        avatar: "https://ocomecodafelicidade.com/wp-content/uploads/2018/12/como-parecer-uma-pessoa-bem-sucedida.jpg",
        whatsapp: "8199134530",
        bio: "biografia mesmo+1",
        subject: "Química",
        cost: "100",
        weekday: [1],
        time_from: [920],
        time_to: [2220],
    },
]

const subjects = ["Artes",
    "Biologia",
    "Ciências",
    "Educação física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química",
]

const weekdays = ["Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
]

function getSubject(subjectNumber) {
    const index = +subjectNumber - 1
    return subjects[index]
}

function pageLanding(req, res) {
    return res.render("index.html")
}

function pageStudy(req, res) {
    const filters = req.query
    return res.render("study.html", {
        proffys,
        filters,
        subjects,
        weekdays
    })
}

function pageGiveClasses(req, res) {
    const data = req.query
    const isNotEmpty = Object.keys(data).length == 9
    // adicionar os dados a lista de proffys
    if (isNotEmpty) {

        data.subject = getSubject(data.subject)

        proffys.push(data)
        return res.redirect("/study")
    }
    return res.render("give-classes.html", {
        subjects,
        weekdays
    })
}

const app = express()

nunjucks.configure("src/views", {
    express: app,
    noCache: true,
})

app.use(express.static("public"))

app.get("/", pageLanding)

app.get("/study", pageStudy)

app.get("/give-classes", pageGiveClasses)

app.listen(5000)