const creatlements = (arr) =>{
    const create = arr.map ((el) => `<span class="btn"> ${el} <span>`)
    return create.join(" ")
}

const arrs= ['hello','hi']
creatlements(arrs)