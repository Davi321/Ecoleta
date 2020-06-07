function populateUFs() {
    const ufSelect = document.querySelector('select[name=uf]');

    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
        .then(res => res.json())
        .then(states => {

            for (state of states) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }


        })
}


populateUFs()

function getCities(event) {
    const citySelect = document.querySelector('select[name=city]');
    const stateInput = document.querySelector('input[name=state]');

    const ufValue = event.target.value
    const indexOfSelectedStates = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedStates].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
        .then(res => res.json())
        .then(cities => {

            for (const city of cities) {
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }

            citySelect.disabled = false

        })
}



document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)


//itens de coleta
const itensToColet = document.querySelectorAll(".items-grid li")
for (const iten of itensToColet) {
    iten.addEventListener("click", handleSelectedItens)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItens = []

function handleSelectedItens(event) {
    const itemLi = event.target
    itemLi.classList.toggle("selected")
    const itemId = itemLi.dataset.id

    const alreadySelected = selectedItens.findIndex(item => {

        const itemFound = item == itemId
        return itemFound

    })
    if (alreadySelected >= 0) {
        const filteredItems = selectedItens.filter(item => {
            const itemsIsDifferent = item != itemId
            return itemsIsDifferent
        })
        selectedItens = filteredItems
    } else {
        selectedItens.push(itemId)
    }


    collectedItems.value = selectedItens

}