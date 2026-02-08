let input = document.querySelector('#favchap');
let button = document.querySelector("button");
let list = document.querySelector('#list');

const STORAGE_KEY = 'myFavBOMList';
let chaptersArray = getChapterList();

function displayList(item) {
    let li = document.createElement('li');
    let dltbtn = document.createElement('button');

    li.textContent = item;
    dltbtn.textContent = '❌';

    li.appendChild(dltbtn);
    list.appendChild(li);

    dltbtn.addEventListener('click', () => {
        list.removeChild(li);
        deleteChapter(item);
        input.focus();
    });
}

function setChapterList() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(chaptersArray));
}

function getChapterList() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function deleteChapter(chapter) {
    chaptersArray = chaptersArray.filter(item => item !== chapter);
    setChapterList();
}

button.addEventListener('click', () => {
    if (input.value.trim() === "") {
        input.focus();
        return;
    }

    displayList(input.value);
    chaptersArray.push(input.value);
    setChapterList();
    input.value = "";
    input.focus();
});

chaptersArray.forEach(displayList);