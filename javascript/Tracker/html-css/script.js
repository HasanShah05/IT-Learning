window.onload = function(){
    mainPage()
}

let savedProgress = JSON.parse(localStorage.getItem('htmlCssProgress')) || []

function mainPage(){
    updateProgress()
    projects()
}

function updateProgress(){
    const total = data.html.length
    const completed = savedProgress.length
    const percentage = total === 0 ? 0 : Math.round((completed / total) * 100)

    document.getElementById('progress-text').innerText = `
        Completed: ${completed} / ${total} (${percentage}%) 
    `
}

function projects(){
    const content = document.getElementById('content')

    let grid = document.querySelector('.projects-grid')
    if(!grid){
        grid = document.createElement('div')
        grid.className = 'projects-grid'
        content.appendChild(grid)
    }

    grid.innerHTML = ''

    data.html.forEach(project => {
        const isChecked = savedProgress.includes(project.projectNo)
        const statusClass = isChecked ? 'completed' : ''

        const safeId = project.projectNo.replace(/\s/g,'')

        const cardHTML = `
            <div class="project-card ${statusClass} " id="card-${safeId}">
            <div class="card-header">
            <span class="project-tag">${project.projectNo}</span>
            <input type="checkbox" id="question-${safeId}" ${isChecked ? 'checked' : ''} onchange="toggleProject('${project.projectNo}')">
            </div>
            <div class="card-body">
            <label for="question-${safeId}">${project.title}</label>
            </div></div>
        `

        grid.innerHTML += cardHTML
    })
}

function toggleProject(id){
    if(savedProgress.includes(id)){
        savedProgress = savedProgress.filter(item => item !== id)
    }else{
        savedProgress.push(id)
    }

    localStorage.setItem('htmlCssProgress', JSON.stringify(savedProgress))

    updateProgress()

    const safeId = id.replace(/\s/g, '')
    const card = document.getElementById(`card-${safeId}`)
    if(savedProgress.includes(id)){
        card.classList.add('completed')
    }else{
        card.classList.remove('completed')
    }
}