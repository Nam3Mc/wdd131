const btnmenu = document.querySelector('#menu-button')
const ul = document.querySelector('ul')

window.addEventListener('resize', () => {
    if (window.innerWidth > 500) {
        btnmenu.classList.add('hidden')
        ul.classList.remove('hidden')
        }
    else {
        btnmenu.classList.remove('hidden')
        ul.classList.add('hidden')
    }    
})

btnmenu.addEventListener('click', () => {
    ul.classList.toggle('hidden')
})