const Database = require('./database/db.js')

const {
    subjects,
    weekdays,
    getSubject,
    convertHoursToMinutes
} = require('./utils/format.js')


function pageLanding(req, res) {
    return res.render("index.html")
}

async function pageStudy(req, res) {
    const filters = req.query

    if (!filters.subject || !filters.weekday || !filters.time) {

        return res.render("study.html", {
            filters,
            subjects,
            weekdays
        })

    }
    // Converter horas em minutos
    const timeToMinutes = convertHoursToMinutes(filters.time)

    const query = `
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE EXISTS (
            SELECT class_schedules.*
            FROM class_schedules
            WHERE class_schedules.class_id = classes.id
            AND class_schedules.weekday = ${filters.weekday}
            AND class_schedules.time_from <= ${timeToMinutes}
            AND class_schedules.time_to > ${timeToMinutes}
        )
        AND classes.subject="${filters.subject}"
    `
    // caso haja erro na hora da consulta de banco de dados
    try {
        const db = await Database
        const proffys = await db.all(query)

        proffys.map((proffy) => {
            proffy.subject = getSubject(proffy.subject)
        })

        return res.render("study.html", {
            proffys,
            filters,
            subjects,
            weekdays
        })
    } catch (err) {
        console.error(err)
    }
}

function pageGiveClasses(req, res) {
    return res.render("give-classes.html", {
        subjects,
        weekdays
    })
}

async function saveClasses(req, res) {
    const createProffy = require('./database/createProffy.js')
    const data = req.body

    const proffyValue = {
        name: data.name,
        avatar: data.avatar,
        whatsapp: data.whatsapp,
        bio: data.bio
    }

    const classValue = {
        subject: data.subject,
        cost: data.cost,
    }

    const classScheduleValues = data.weekday.map((weekday, index) => {
        return {
            weekday: weekday,
            time_from: convertHoursToMinutes(data.time_from[index]),
            time_to: convertHoursToMinutes(data.time_to[index])
        }
    })
    try {
        const db = await Database
        await createProffy(db, {
            proffyValue,
            classValue,
            classScheduleValues
        })
        let queryString = `?subject=${data.subject}&weekday=${data.weekday[0]}&time=${data.time_from[0]}`
        return res.redirect(`/study${queryString}`)
    } catch (err) {
        console.error(err)
    }

    // adicionar os dados a lista de proffys

}

function pageGiveClassesSuccess() {

}

module.exports = {
    pageLanding,
    pageStudy,
    pageGiveClasses,
    saveClasses,
    pageGiveClassesSuccess

}