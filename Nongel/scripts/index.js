const sidebar = document.getElementById('sidebar');
const toggleBtn = document.getElementById('toggleSidebar');
const modal = document.getElementById('modal');
const openModal = document.getElementById('openModal');
const closeModal = document.getElementById('closeModal');

toggleBtn.addEventListener('click', () => {
  if (window.innerWidth <= 767) {
    sidebar.classList.toggle('active');
  } else {
    sidebar.classList.toggle('collapsed');
  }
});


openModal.addEventListener('click', () => {
  modal.style.display = 'flex';
});

closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
});

