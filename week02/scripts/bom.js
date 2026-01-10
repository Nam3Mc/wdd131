let input = document.querySelector('#favchap');
let button = document.querySelector("button");
let list = document.querySelector('#list');

button.addEventListener('click', () => {
    if (input.value.trim() == "") {
        input.focus()
    }
    else {

        let dltbtn = document.createElement('button')
        dltbtn.innerHTML = `❌`
        let li = document.createElement('li')
        li.innerHTML = `${input.value}`
        li.append(dltbtn)
        list.appendChild(li)
        dltbtn.addEventListener('click', () => {
            li.remove()
        })
        input.value = ""
        input.focus()
    }
})