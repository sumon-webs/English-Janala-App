const levelGet = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then(res => res.json())
        .then(json => {
            display(json.data)
        })
}

const display = (item) => {
    const levelContainer = document.getElementById("level-container")
    levelContainer.innerHTML = ""

    item.forEach(element => {
        const btn = document.createElement("button")

        btn.innerHTML = `
        <button id="lesson-btn-${element.level_no}" onclick="loadLevelWord(${element.level_no})" class="lesson-btn btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i> Lesson- ${element.level_no}</button>
        `
        levelContainer.appendChild(btn)
    });

}


const loadLevelWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
        .then(res => res.json())
        .then(json => {
            const outline = document.querySelectorAll(".lesson-btn")
            outline.forEach(item=> item.classList.add("btn-outline"))

            const lessonBtn = document.getElementById(`lesson-btn-${id}`)
            lessonBtn.classList.remove("btn-outline")
            displayWords(json.data)
        })
}


const displayWords = (id) => {
    const wordsContainer = document.getElementById('word-container')
    wordsContainer.innerHTML = ''

    id.forEach(element => {
        const div = document.createElement('div')
        div.innerHTML = `
        <div class=" bg-white space-y-3 px-6 py-12 rounded-sm text-center">
                <h1 class=" font-bold text-2xl">${element.word ? element.word : "Word not found"}</h1>
                <p>Meaning / Punctuation</p>
                <p>${element.meaning ? element.meaning : "Meaning not found"} / ${element.pronunciation ? element.pronunciation : "Pronunciation not found"}</p>
                <div class=" flex justify-between"><i class="fa-solid fa-circle-info"></i><i class="fa-solid fa-volume-high"></i></div>
            </div>
        `
        
        wordsContainer.appendChild(div)
    })

    if (wordsContainer.children.length === 0) {
        wordsContainer.innerHTML = `
        <div id="select-next-msg" class=" bg-base-200 text-center py-16 space-y-3 col-span-full">
            <i class="fa-solid fa-triangle-exclamation"></i>
            <p class=" text-gray-500">এই লেসন এ এখনো কোনো vocabulary যুক্ত হইনি</p>
            <p class=" text-3xl">পরের লেসন select করুন</p>
        </div>
        `
    }

}

levelGet()