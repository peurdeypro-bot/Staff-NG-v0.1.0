function showForm(formId) {
    document.querySelectorAll(".form-box").forEach(form => form.classList.remove("active"));
    document.getElementById(formId).classList.add("active");
}

// Crée automatiquement un compte admin (admin / admin) s'il n'existe pas encore
(function seedAdmin(){
  let accounts = [];
  try { accounts = JSON.parse(localStorage.getItem('ngo_accounts') || '[]'); } catch(e) {}
  if (!accounts.some(a => a.pseudo === 'admin')) {
    accounts.push({ pseudo: 'admin', password: 'admin', role: 'Administrateur' });
    localStorage.setItem('ngo_accounts', JSON.stringify(accounts));
  }
})();

// Connexion : vérifie pseudo + mot de passe, puis ouvre l'appli
document.querySelector('#login-form form').addEventListener('submit', e => {
  e.preventDefault();
  const pseudo = document.querySelector('#login-form input[name="text"]').value.trim();
  const password = document.querySelector('#login-form input[name="password"]').value;

  let accounts = [];
  try { accounts = JSON.parse(localStorage.getItem('ngo_accounts') || '[]'); } catch(e) {}
  const found = accounts.find(a => a.pseudo === pseudo && a.password === password);

  if (!found) {
    alert('Pseudo ou mot de passe incorrect.');
    return;
  }
  localStorage.setItem('ngo_logged_user', JSON.stringify(found));
  window.location.href = 'panel.html';
});