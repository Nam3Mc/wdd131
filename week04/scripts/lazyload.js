const updated = document.querySelector('#updated');
const currentYear = document.querySelector('#year');


function updated_at() {
    let updated_at = document.lastModified;
    updated.textContent = `Last Updated: ${updated_at}`;
    let year = new Date().getFullYear()
    currentYear.textContent = year
}

updated_at();