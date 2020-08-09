const subjects = [
    "Artes",
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

const weekdays = [
    "Domingo",
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

function convertHoursToMinutes(time) {
    let [hour, minutes] = time.split(':')
    hour = Number(hour)
    minutes = Number(minutes)
    return (hour * 60) + minutes
}

module.exports = {
    subjects,
    weekdays,
    getSubject,
    convertHoursToMinutes
}