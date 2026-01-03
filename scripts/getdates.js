const updated = document.querySelector('#updated');

function updated_at() {
    let updated_at = document.lastModified;
    updated.textContent = `Last Updated: ${updated_at}`;
}

updated_at();