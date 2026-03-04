function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

const creatlements = (arr) => {
    const create = arr.map((el) => `<span class="btn"> ${el} <span>`)
    return create.join("")
}

const levelGet = () => {
    loading(true)
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
        loading(false)
    });

}

const loading = (event) => {
    if (event == true) {
        document.getElementById("loading-container").classList.remove("hidden")
        document.getElementById("word-container").classList.add("hidden")

    } else {
        document.getElementById("loading-container").classList.add("hidden")
        document.getElementById("word-container").classList.remove("hidden")
    }
}

document.getElementById("search-btn").addEventListener("click", () => {
    const inputText = document.getElementById("input-text")
    const inputValue = inputText.value.trim().toLowerCase()
    
    fetch("https://openapi.programming-hero.com/api/words/all")
        .then(res => res.json())
        .then(data => {
            const dataValue = data.data
            const filterWords = dataValue.filter(word => word.word.toLowerCase().includes(inputValue))
            displayWords(filterWords)
        })
})

const wordDetailsLoad = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`
    const res = await fetch(url);
    const details = await res.json();
    displayDetailsWord(details.data)
}

const displayDetailsWord = (word) => {
    const wordDetails = document.getElementById("details")
    wordDetails.innerHTML = `
        <div class="text-2xl flex gap-2 font-bold">
            <h1 >${word.word}</h1>
            (<i class="fa-solid fa-microphone-lines"></i>
            <p>${word.pronunciation})</p>
        </div>

         <div>
             <p class=" font-bold">Meaning</p>
             <p>${word.meaning}</p>
         </di   
         <div>
             <p class="font-bold">Example</p>
             <p>${word.sentence}</p>
         </div>
         <div>
             <p class=" font-bold">সমার্থক শব্দ</p>
             <div class="">
                 ${creatlements(word.synonyms)}
             </div>
         </div> 
         <div class="modal-action">
             <form method="dialog">
                 <button class="btn btn-primary">Complete Learning</button>
             </form>
         </div>
    `

    document.getElementById("word_modal").showModal()
}

const loadLevelWord = (id) => {
    loading(true)
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
        .then(res => res.json())
        .then(json => {
            const outline = document.querySelectorAll(".lesson-btn")
            outline.forEach(item => item.classList.add("btn-outline"))

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
        <div class=" bg-white space-y-1 sm:space-y-3 px-2 sm:px-6 py-4 sm:py-12 rounded-sm text-center">
                <h1 class=" font-bold sm:text-2xl">${element.word ? element.word : "Word not found"}</h1>
                <p>Meaning / Punctuation</p>
                <p>${element.meaning ? element.meaning : "Meaning not found"} / ${element.pronunciation ? element.pronunciation : "Pronunciation not found"}</p>
                <div class=" flex justify-between"><i onclick="wordDetailsLoad(${element.id})" class="fa-solid fa-circle-info "></i><i onclick="pronounceWord('${element.word}')" class="fa-solid fa-volume-high"></i></div>
            </div>
        `

        wordsContainer.appendChild(div)
    })
    loading(false)
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