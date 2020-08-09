module.exports = async function (db, {
    proffyValue,
    classValue,
    classScheduleValues
}) {
    // Inserir dados na tabela de proffys
    const insertedProffy = await db.run(`
        INSERT INTO proffys (
            name,
            avatar,
            whatsapp,
            bio
        ) VALUES (
            "${proffyValue.name}",
            "${proffyValue.avatar}",
            "${proffyValue.whatsapp}",
            "${proffyValue.bio}"
        );
    `)

    const proffy_id = insertedProffy.lastID

    // Inserir dados na tabela de classes
    const insertedClass = await db.run(`
        INSERT INTO classes (
            subject,
            cost,
            proffy_id
        ) VALUES (
            ${classValue.subject},
            "${classValue.cost}",
            ${proffy_id}
        );
    `)

    const class_id = insertedClass.lastID

    // Inserir dados na tabela de classesSchedule
    const insertedAllClassesScheduleValues = classScheduleValues.map((classScheduleValue) => {
        return db.run(`
            INSERT INTO class_schedules (
                class_id,
                weekday,
                time_from,
                time_to
            ) VALUES (
                ${class_id},
                ${classScheduleValue.weekday},
                ${classScheduleValue.time_from},
                ${classScheduleValue.time_to}
            );
        `)
    })

    // aqui vou executar todos os db.run's() das class_scheduless
    await Promise.all(insertedAllClassesScheduleValues)
}