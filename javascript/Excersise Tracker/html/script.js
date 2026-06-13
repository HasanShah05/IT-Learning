const tableBody = document.getElementById('table-body')

function renderTable(data){
    tableBody.innerHTML = ''

    data.forEach(item => {
        const row = document.createElement('tr')

        const idCell = document.createElement('td')
        idCell.innerText = item.projectNo
        row.appendChild(idCell)

        const title = document.createElement('td')
        title.innerText = item.title
        row.appendChild(title)

        for (let i = 0; i < 3; i++) {
            const checkCell = document.createElement('td')
            
            const checkbox = document.createElement('input')
            checkbox.type = 'checkbox'

            const uniqueKey = `${item.projectNo}_${users[i]}`

            if (localStorage.getItem(uniqueKey)) {
                checkbox.checked = 'true'
            }

            checkbox.addEventListener('change', e => {
                if (e.target.checked) {
                    const currentTime = new Date().toLocaleString()
                    localStorage.setItem(uniqueKey, currentTime)
                }else{
                    localStorage.removeItem(uniqueKey)
                }
            }
            )

            checkCell.appendChild(checkbox)
            row.appendChild(checkCell)
        }

        tableBody.appendChild(row)
    });
}

renderTable(html)