const products = [{
        id: "fc-1888",
        name: "flux capacitor",
        averagerating: 4.5
    },
    {
        id: "fc-2050",
        name: "power laces",
        averagerating: 4.7
    },
    {
        id: "fs-1987",
        name: "time circuits",
        averagerating: 3.5
    },
    {
        id: "ac-2000",
        name: "low voltage reactor",
        averagerating: 3.9
    },
    {
        id: "jj-1969",
        name: "warp equalizer",
        averagerating: 5.0
    }
];
 
const select = document.querySelector('#selected')
const reviewCounter = document.querySelector('#counter')
const form = document.querySelector('form');

// let reviews = Number(localStorage.getItem("reviews")) || 0;
// reviewCounter.textContent = reviews;

function fetchOptions(optionsArray) {
  if (optionsArray.length !== 0) {
      optionsArray.forEach(item => {
        const option = document.createElement('option')
        let id = item.id
        let name = item.name
        option.value = id
        option.textContent = name;
        select.appendChild(option)
      })
  }
}

fetchOptions(products)

// form.addEventListener("submit", function (e) {
  // e.preventDefault();
  // reviews++;
  // localStorage.setItem("reviews", reviews);
  // reviewCounter.textContent = reviews;
// });
// 