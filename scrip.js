const levelGet = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then(res => res.json())
        .then(json => display(json.data))
}

const display = (item) => {
    const levelContainer = document.getElementById("level-container")
    levelContainer.innerHTML = ""

    item.forEach(element => {
        const btn = document.createElement("button")

        btn.innerHTML = `
        <button onclick="loadLevelWord(${element.level_no})" class=" btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i> Lesson- ${element.level_no}</button>
        `
        levelContainer.appendChild(btn)
    });

}


const loadLevelWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
        .then(res => res.json())
        .then(json => displayWords(json.data))
}


const displayWords = (id) => {
    const wordsContainer = document.getElementById('word-container')
    wordsContainer.innerHTML = ''

    id.forEach(element => {
        const div = document.createElement('div')
        div.innerHTML = `
        <div class=" bg-white space-y-3 px-6 py-12 rounded-sm text-center">
                <h1 class=" font-bold text-2xl">${element.word}</h1>
                <p>Meaning / Punctuation</p>
                <p>${element.meaning} / ${element.pronunciation}</p>
                <div class=" flex justify-between"><i class="fa-solid fa-exclamation"></i><i class="fa-solid fa-volume-high"></i></div>
            </div>
        `

        wordsContainer.appendChild(div)
    })


}

levelGet()