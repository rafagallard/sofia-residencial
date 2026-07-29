const views = document.querySelectorAll('.view');
const navItems = document.querySelectorAll('.nav-item');
const pageTitle = document.getElementById('pageTitle');
const sidebar = document.getElementById('sidebar');
const topicModal = document.getElementById('topicModal');
const toast = document.getElementById('toast');

const titles = {
  dashboard: 'Panel de administración',
  topics: 'Puntos a tratar',
  agenda: 'Agenda de reunión',
  attendance: 'Asistencia y quorum',
  minutes: 'Minuta digital',
  agreements: 'Acuerdos',
  actions: 'Planes de acción',
  documents: 'Documentos'
};

function showView(viewId) {
  views.forEach((view) => view.classList.toggle('active', view.id === viewId));
  navItems.forEach((item) => item.classList.toggle('active', item.dataset.view === viewId));
  pageTitle.textContent = titles[viewId] || 'Sofía Residencial';
  sidebar.classList.remove('open');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  window.setTimeout(() => toast.classList.remove('show'), 2600);
}

function openTopicModal() {
  topicModal.classList.add('open');
  topicModal.setAttribute('aria-hidden', 'false');
}

function closeTopicModal() {
  topicModal.classList.remove('open');
  topicModal.setAttribute('aria-hidden', 'true');
}

navItems.forEach((item) => item.addEventListener('click', () => showView(item.dataset.view)));
document.querySelectorAll('[data-go]').forEach((button) => button.addEventListener('click', () => showView(button.dataset.go)));
document.querySelectorAll('.open-topic-modal').forEach((button) => button.addEventListener('click', openTopicModal));
document.getElementById('newTopicBtn').addEventListener('click', openTopicModal);
document.getElementById('quickNewTopic').addEventListener('click', openTopicModal);
document.querySelectorAll('.close-modal').forEach((button) => button.addEventListener('click', closeTopicModal));
document.getElementById('menuToggle').addEventListener('click', () => sidebar.classList.toggle('open'));

topicModal.addEventListener('click', (event) => {
  if (event.target === topicModal) closeTopicModal();
});

document.getElementById('topicForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const title = data.get('title');
  const category = data.get('category');
  const requester = data.get('requester') || 'Administración';
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>PT-027</td>
    <td><strong>${title}</strong></td>
    <td>${category}</td>
    <td>${requester}</td>
    <td>29 jul 2026</td>
    <td><span class="tag high">Alta</span></td>
    <td><span class="tag neutral">Propuesto</span></td>`;
  document.getElementById('topicsTable').prepend(row);
  event.currentTarget.reset();
  closeTopicModal();
  showView('topics');
  showToast('Punto registrado en Google Sheets');
});

document.querySelectorAll('.small-add').forEach((button) => {
  button.addEventListener('click', () => {
    button.textContent = 'Agregado';
    button.disabled = true;
    showToast('Punto agregado a la agenda');
  });
});

document.getElementById('publishAgenda').addEventListener('click', () => {
  showToast('Agenda publicada y lista para compartir');
});

document.getElementById('registerAttendance').addEventListener('click', () => {
  const table = document.getElementById('attendanceTable');
  const row = document.createElement('tr');
  row.innerHTML = '<td>Propietario lote 018</td><td>018</td><td>Presencial</td><td>19:01</td><td>Sí</td><td><span class="tag success">Registrado</span></td>';
  table.appendChild(row);
  document.getElementById('presentCount').textContent = '29';
  document.getElementById('quorumValue').textContent = '68.9%';
  showToast('Asistencia registrada; quorum actualizado');
});

document.getElementById('generateDoc').addEventListener('click', () => {
  showToast('Minuta preparada para generar en Google Docs');
});

document.getElementById('globalSearch').addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && event.currentTarget.value.trim()) {
    showToast(`Búsqueda: ${event.currentTarget.value.trim()}`);
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeTopicModal();
});