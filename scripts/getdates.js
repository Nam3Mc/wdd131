let last_modification = document.querySelector("#date_update");

function update_modification() {
    let updated_at = document.lastModified;
    last_modification.textContent = `Last Modification: ${updated_at}`
}

update_modification();