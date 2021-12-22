const BASE_URL = "https://api.hatchways.io/assessment/students"
let studsCont = document.getElementById("students-container")
let searchBar = document.getElementById("searchBar")

document.addEventListener('DOMContentLoaded', () => {
    fetchData();
})

searchBar.addEventListener("keyup", () => {
    let input = searchBar.value.toLowerCase()
    let eachContainer = document.getElementsByClassName("student-container")

    for (container of eachContainer) {
        if (!container.innerHTML.toLowerCase().includes(input)) {
            container.classList.add('hidden')
        } else {
            container.classList.remove('hidden')
        }
    }
})

const fetchData = () => {
    fetch(BASE_URL)
    .then(resp => resp.json())
    .then(studArr => {
        for (const student of studArr.students) {

            let newGrades = []
            let i, percentage, sum = 0;

            student.grades.forEach(grade => {
                newGrades.push(parseInt(grade))
            })
            
            for (i=0;i<newGrades.length;i++) {
                sum += newGrades[i];
            }

            percentage = (sum / newGrades.length) ;

            studsCont.innerHTML += `
            <div class="student-container">
            <h1>${student.firstName} ${student.lastName}</h1>
            <p>Email: ${student.email}</p>
            <p>Company: ${student.company}</p>
            <p>Skill: ${student.skill}</p>
            <p>Average: ${percentage}%</p>
            </div>
            <hr>
            `
        }
    })
};