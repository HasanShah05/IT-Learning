window.onload = function() {
    renderSidebar()

    if(typeof data.javascript !== 'undefined' && data.javascript.length > 0){
        loadDay(0)
    }
}

let savedProgress = JSON.parse(localStorage.getItem('jsProgress')) || []

function renderSidebar(){
    const sidebar = document.querySelector('.day-list')
    sidebar.innerHTML = ''

    data.javascript.forEach((day, index) => {
        const btn = document.createElement('button')
        btn.className = 'day-btn'
        btn.innerText = `Day ${day.day}: ${day.title}`

        btn.onclick = () => {
            document.querySelectorAll('.day-btn').forEach(b => 
                b.classList.remove('active'))
                btn.classList.add('active')
                loadDay(index)
        }
        if(index === 0) btn.classList.add('active')
            sidebar.appendChild(btn)
    })
}

function loadDay(index){
    const day = data.javascript [index]
    const container = document.querySelector('.exercises-container')

    document.getElementById('day-title').innerText = `day ${day.day}: ${day.title}`
    document.getElementById('progress-text').innerText = `Completed: ${savedProgress.length}`

    container.innerHTML = ''

    day.levels.forEach(level => {
        let htmlContent = `<div class="level-section"><div class="level-title">${level.levelName}</div>`

        const exercises = level.exercises || []

        exercises.forEach(ex => {
            const isChecked = savedProgress.includes(ex.id) ? 'checked' : ''

            const statusClass = savedProgress.includes(ex.id) ? 'completed' : ''

            htmlContent += `
                <div class="exercises-item ${statusClass}" id="box-${ex.id}">
                <input type="checkbox" id="question-${ex.id}" ${isChecked} onchange="toggleSave('${ex.id}')">
                <label for="question-${ex.id}">${ex.text}</label> 
                </div>
            `
        })

        htmlContent += `</div>`
        container.innerHTML += htmlContent

    })
}

function toggleSave(id){
    const box = document.getElementById(`box-${id}`)

    if(savedProgress.includes(id)){
        savedProgress = savedProgress.filter(item => item !== id)
        if(box) box.classList.remove('completed')
    }else{
        savedProgress.push(id)
        if(box) box.classList.add('completed')
    }

    localStorage.setItem('jsProgress', JSON.stringify(savedProgress))
    document.getElementById('progress-text').innerText = `
        Completed: ${savedProgress.length}
    `
}