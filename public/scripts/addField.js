// Procurar o botão
const buttonAddTimeElement = document.querySelector('#add-time')

// Quando Clicar no botão
buttonAddTimeElement.addEventListener('click', cloneField)

// Executar uma ação
function cloneField() {

    // Duplicar os campos. Quais campos?
    const scheduleItemElement = document.querySelector('.schedule-item')
    const newFieldContainer = scheduleItemElement.cloneNode(true)

    // Pegar os campos. Quais campos?
    const fields = newFieldContainer.querySelectorAll('input')

    // para cada campo
    fields.forEach((field) => {

        // limpa o campo
        field.value = ""
    });

    // Colocar na página. Onde??
    const scheduleItemsElement = document.querySelector('#schedule-items')
    scheduleItemsElement.appendChild(newFieldContainer)
}