const tableBody = document.getElementById('table-body');

function renderTable(data){
    tableBody.innerHTML = ''

    data.forEach( item => {

        const row = document.createElement('tr')

        const idCell = document.createElement('td')
        idCell.innerText = item.exerciseId
        row.appendChild(idCell)

        const dayCell = document.createElement('td')
        dayCell.innerText = item.day
        row.appendChild(dayCell)

        const levelCell = document.createElement('td')
        levelCell.innerText = item.level
        row.appendChild(levelCell)

        const questionCell = document.createElement('td')
        questionCell.innerText = item.question
        row.appendChild(questionCell)

        for (let i = 0; i < 3; i++) {
            const checkCell = document.createElement('td')

            const checkbox = document.createElement('input')
            checkbox.type = 'checkbox'

            const uniqueKey = `${item.exerciseId}_${users[i]}`

            if (localStorage.getItem(uniqueKey)) {
                checkbox.checked = true
            }

            checkbox.addEventListener('change', e => {
                if (e.target.checked) {

                    const currentTime = new Date().toLocaleString()
                    localStorage.setItem(uniqueKey, currentTime)
                } else {
                    localStorage.removeItem(uniqueKey)
                }
            })

            checkCell.appendChild(checkbox)
            row.appendChild(checkCell)
        }
        tableBody.appendChild(row)
    })
}

renderTable(javascript)