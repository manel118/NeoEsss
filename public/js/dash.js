const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');

// a function to manage section after a reload 
function getsectionReload() {
  // Get the saved section from localStorage
  const activeSection = localStorage.getItem('activeSection');
  const activeMenu = localStorage.getItem('activeSideMenu')

  if (activeSection) {
    // Hide all sections
    contentSections.forEach(section => {
      section.classList.remove('show');
    });

    // Show the saved section
    const targetSection = document.getElementById(activeSection);
    if (targetSection) {
      targetSection.classList.add('show');
    }

  }

  if (activeMenu) {
    const savedItem = document.querySelector(`[data-target="${activeMenu}"]`);
    if (savedItem) {
      allSideMenu.forEach(i => {
        i.parentElement.classList.remove('active');
      });
      savedItem.parentElement.classList.add('active');
      savedItem.click(); // triggers fetch and shows the section
    }
  }

}


document.addEventListener('DOMContentLoaded', getsectionReload)

// document.addEventListener('click', (event) => {
//   const target = event.target;
//   // Delete Teacher // student // everything
//   if (target.classList.contains('delete-btn')) {
//     const teacherId = target.getAttribute('data-id');
//     console.log(`Delete teacher with ID: ${teacherId}`);

//     // Send DELETE request to remove teacher
//     fetch(`/admin/delete-teacher/${teacherId}`, {
//       method: 'DELETE'
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data.message)
//         // Refresh the table after deletion
//         fetchTeachers();

//       }).catch((err) => console.error('Error deleting teacher:', err));
//   }
// });




allSideMenu.forEach(item => {
  const li = item.parentElement;

  item.addEventListener('click', function (event) {
    allSideMenu.forEach(i => {
      i.parentElement.classList.remove('active');
    })

    li.classList.add('active');

    const target = item.getAttribute('data-target');
    localStorage.setItem("activeSideMenu", target);
  })
});




// TOGGLE SIDEBAR
const menuBar = document.querySelector('#content nav .bx.bx-menu');
const sidebar = document.getElementById('sidebar');

menuBar.addEventListener('click', function () {
  sidebar.classList.toggle('hide');
})







const searchButton = document.querySelector('#content nav form .form-input button');
const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
const searchForm = document.querySelector('#content nav form');

searchButton.addEventListener('click', function (e) {
  if (window.innerWidth < 576) {
    e.preventDefault();
    searchForm.classList.toggle('show');
    if (searchForm.classList.contains('show')) {
      searchButtonIcon.classList.replace('bx-search', 'bx-x');
    } else {
      searchButtonIcon.classList.replace('bx-x', 'bx-search');
    }
  }
})





if (window.innerWidth < 768) {
  sidebar.classList.add('hide');
} else if (window.innerWidth > 576) {
  searchButtonIcon.classList.replace('bx-x', 'bx-search');
  searchForm.classList.remove('show');
}


window.addEventListener('resize', function () {
  if (this.innerWidth > 576) {
    searchButtonIcon.classList.replace('bx-x', 'bx-search');
    searchForm.classList.remove('show');
  }
})



const switchMode = document.getElementById('switch-mode');

switchMode.addEventListener('change', function () {
  if (this.checked) {
    document.body.classList.add('dark');
  } else {
    document.body.classList.remove('dark');
  }
})



// Navigation entre les différentes sections
const contentSections = document.querySelectorAll('.content-section');

allSideMenu.forEach(item => {
  item.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('data-target'); // ex: "dashboard", "modules", etc.

    // Store the selected section in localStorage
    localStorage.setItem('activeSection', targetId);

    // Cacher toutes les sections
    contentSections.forEach(section => {
      section.classList.remove('show');
    });

    // Afficher la section ciblée
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.classList.add('show');
    }

    // Only fetch teachers if "teacher-section" is clicked
    if (targetId === 'enseignant') {
      fetchTeachers();
    }
    if (targetId === 'etudiant') {
      fetchStudents()
    }
    if (targetId === 'modules') {
      fetchModules()
    }
  });
});

// todoList======================

  document.addEventListener('DOMContentLoaded', () => {
    const todoList = document.querySelector('.todo-list');
    const addBtn = document.querySelector('.head .bx-plus');

    // Charger les tâches depuis localStorage
    function loadTodos() {
      const todos = JSON.parse(localStorage.getItem('todos')) || [];
      todoList.innerHTML = '';
      todos.forEach(todo => {
        addTodoToDOM(todo.text, todo.completed);
      });
    }

    // Ajouter un nouvel élément dans le DOM
    function addTodoToDOM(text, completed = false) {
      const li = document.createElement('li');
      li.className = completed ? 'completed' : 'not-completed';

      const p = document.createElement('p');
      p.textContent = text;

      const actions = document.createElement('div');

      const toggleBtn = document.createElement('i');
      toggleBtn.className = 'bx bx-check';
      toggleBtn.style.cursor = 'pointer';
      toggleBtn.title = 'Marquer comme terminé';

      const deleteBtn = document.createElement('i');
      deleteBtn.className = 'bx bx-trash';
      deleteBtn.style.cursor = 'pointer';
      deleteBtn.title = 'Supprimer';

      actions.appendChild(toggleBtn);
      actions.appendChild(deleteBtn);

      li.appendChild(p);
      li.appendChild(actions);

      // Toggle completed
      toggleBtn.addEventListener('click', () => {
        li.classList.toggle('completed');
        li.classList.toggle('not-completed');
        saveTodos();
      });

      // Delete
      deleteBtn.addEventListener('click', () => {
        li.remove();
        saveTodos();
      });

      todoList.appendChild(li);
    }

    // Sauvegarder les tâches dans localStorage
    function saveTodos() {
      const todos = [];
      document.querySelectorAll('.todo-list li').forEach(li => {
        todos.push({
          text: li.querySelector('p').textContent,
          completed: li.classList.contains('completed'),
        });
      });
      localStorage.setItem('todos', JSON.stringify(todos));
    }

    // Ajouter nouvelle tâche
    addBtn.addEventListener('click', () => {
      const text = prompt('Entrez une nouvelle tâche :');
      if (text && text.trim() !== '') {
        addTodoToDOM(text.trim(), false);
        saveTodos();
      }
    });

    // Initialisation
    loadTodos();
  });




// Enseignats ============================

// Sélectionner les éléments
const addTeacherBtn = document.getElementById('addTeacherBtn');
const teacherModal = document.getElementById('teacherModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const teacherForm = document.getElementById('teacherForm');
const searchInput = document.getElementById('searchInput');
const teacherTable = document.getElementById('teacherTable').getElementsByTagName('tbody')[0];

// Ouverture du modal
addTeacherBtn.addEventListener('click', function () {
  teacherModal.classList.add('show');
});

// Fermeture du modal
closeModalBtn.addEventListener('click', function () {
  teacherModal.classList.remove('show');
});

// Gestion du formulaire d'ajout
teacherForm.addEventListener('submit', async function (e) {
  e.preventDefault();

  // Récupérer les valeurs du formulaire
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const phone = document.getElementById('phone').value;
  //const subjects = Array.from(document.getElementById('subjects').selectedOptions).map(option => option.value).join(', ');
  const grade = document.getElementById('grade').value;
  const status = document.getElementById('status').value;

  const teacher = { nom: firstName, prenom: lastName, email, password, telephone: phone, grade, status }
  try {
    const res = await fetch("/admin/add_new_user", {
      method: "POST",
      body: JSON.stringify({ user: teacher, role: "teacher" }),
      headers: { 'Content-Type': 'application/json' }
    })
    const data = await res.json()

    if (data.users) {
      console.log("new teacher added", data.users)
    }
    if (data.errors) {
      console.log(data.errors);
      alert(data.errors)
    }

    await fetchTeachers()
  } catch (err) {
    console.error('Error adding a teacher:', err);
  }

  // Réinitialiser le formulaire
  teacherForm.reset();
  teacherModal.classList.remove('show');
});

// Recherche des enseignants
searchInput.addEventListener('input', function () {
  const query = searchInput.value.toLowerCase();
  const rows = teacherTable.getElementsByTagName('tr');

  Array.from(rows).forEach(row => {
    const name = row.cells[0].textContent.toLowerCase();
    const subject = row.cells[2].textContent.toLowerCase();

    if (name.includes(query) || subject.includes(query)) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
});

//fetching teachers 
async function fetchTeachers() {

  try {
    const res = await fetch('/admin/get_users', {
      method: 'POST',
      body: JSON.stringify({ role: "teacher" }),
      headers: { 'Content-Type': 'application/json' }
    })

    const result = await res.json();
    if (result.users) {
      const tableBody = document.querySelector('#teacherTable tbody');
      tableBody.innerHTML = ''; // Clear any existing rows

      result.users.forEach(teacher => {
        const row = document.createElement('tr');

        // Create table data for each teacher
        row.innerHTML = `
        <td>${teacher.nom} ${teacher.prenom}</td>
        <td>${teacher.email}</td>
        <td>${teacher.telephone}</td>
        <td>${teacher.status}</td>
        
        <td>${teacher.grade}</td>
        <td>
          <button class="edit-btn" data-id="${teacher._id}">✏️modifier</button>
          <button class="delete-btn" data-id="${teacher._id}">detaille</button>
        </td>
      `;

        tableBody.appendChild(row);
        attacherEventsAuxBoutons()

      });
    }
    else if (result.err) {
      console.error(err.message, err);

    }
  } catch (err) {
    console.error('Error fetching teachers:', err);
  }
}





// fonction pour attacher les événements :
function attacherEventsAuxBoutons() {

  // btn modificatio
  document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      console.log("modification")
      const row = this.closest('tr');
      const fullName = row.cells[0].textContent.split(' ');
      const email = row.cells[1].textContent;
      const password = row.cells[2].textContent;
      //const subjects = row.cells[2].textContent.split(', ');
      const status = row.cells[3].textContent === 'Actif' ? 'active' : 'inactive';
      const grade = row.cells[4].textContent;

      // Remplir le formulaire
      document.getElementById('firstName').value = fullName[0] || '';
      document.getElementById('lastName').value = fullName[1] || '';
      document.getElementById('email').value = email;
      document.getElementById('password').value = password;
      document.getElementById('phone').value = ''; // à adapter si tu veux stocker le téléphone
      document.getElementById('grade').value = grade;
      document.getElementById('status').value = status;
      // selon le tableau 




      // Sélection des matières
      //const options = document.getElementById('subjects').options;
      //for (let i = 0; i < options.length; i++) {
      //   options[i].selected = subjects.includes(options[i].value);
      //}

      // Affiche le modal pour édition
      teacherModal.classList.add('show');

      // Supprime l’ancienne ligne après modification
      row.remove();
    });
  });

  // Boutons supprimer
  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const row = this.closest('tr');
      if (confirm("Voulez-vous vraiment supprimer cet enseignant ?")) {
        row.remove();
      }
    });
  });
}



// Etudiants section =================================

const addStudentBtn = document.getElementById('addStudentBtn');
const studentModal = document.getElementById('studentModal');
const closeStudentModal = document.getElementById('closeStudentModal');
const studentForm = document.getElementById('studentForm');
const studentSearchInput = document.getElementById('studentSearchInput');
const studentTable = document.getElementById('studentTable');

// Ouvrir le modal
addStudentBtn.addEventListener('click', () => {
  studentModal.classList.add('show');
});

// Fermer le modal
closeStudentModal.addEventListener('click', () => {
  studentModal.classList.remove('show');
});

// Ajouter un étudiant
studentForm.addEventListener('submit', async function (e) {
  e.preventDefault();

  const firstName = document.getElementById('studentFirstName').value;
  const lastName = document.getElementById('studentLastName').value;
  const email = document.getElementById('studentEmail').value;
  const password = document.getElementById('studentPassword').value;
  const phone = document.getElementById('studentPhone').value;
  const matricule = document.getElementById('studentMatricule').value;
  const classe = document.getElementById('studentClasse').value;



  const student = { nom: firstName, prenom: lastName, email, password, telephone: phone, matricule, classe }
  try {

    const res = await fetch("/admin/add_new_user", {
      method: "POST",
      body: JSON.stringify({ user: student, role: "student" }),
      headers: { 'Content-Type': 'application/json' }
    })
    const data = await res.json()

    if (data.users) {
      console.log("new student added secssefully", data.users)
    }
    if (data.errors) {
      console.log(data.errors);
      alert(data.errors)
    }

    await fetchStudents()

  } catch (err) {
    console.error('Error adding a student:', err);
  }

  studentForm.reset();
  studentModal.classList.remove('show');
});

// Recherche
studentSearchInput.addEventListener('input', function () {
  const query = this.value.toLowerCase();
  const rows = studentTable.getElementsByTagName('tr');

  Array.from(rows).forEach(row => {
    const fullName = row.cells[0].textContent.toLowerCase();
    const classe = row.cells[5].textContent.toLowerCase();

    if (fullName.includes(query) || classe.includes(query)) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
});

// filtre par classe
const classFilter = document.getElementById('classFilter');

classFilter.addEventListener('change', function () {
  const selectedValue = this.value.trim()
  const rows = studentTable.getElementsByTagName('tr');

  Array.from(rows).forEach(row => {
    const niveauCell = row.querySelector("td:nth-child(6)");
    const specialiteCell = row.querySelector("td:nth-child(7)");

    if (!niveauCell || !specialiteCell) return;

    const niveau = niveauCell.textContent.trim();
    const specialite = specialiteCell.textContent.trim();
    const combined = `${niveau} ${specialite}`; // Match format: "Master2 SI"

    if (selectedValue === "" || combined === selectedValue) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
});





//fetching students 
async function fetchStudents() {

  try {
    const res = await fetch('/admin/get_users', {
      method: 'POST',
      body: JSON.stringify({ role: "student" }),
      headers: { 'Content-Type': 'application/json' }
    }

    ); // API endpoint to get all teachers

    const result = await res.json();
    if (result.err) {
      console.error(result.message, result.err);
    }
    else if (result.users) {

      const tableBody = document.querySelector('#studentTable tbody');
      tableBody.innerHTML = ''; // Clear any existing rows
      console.log(result)

      result.users.forEach(student => {
        const row = document.createElement('tr');

        // Create table data for each teacher
        row.innerHTML = `
        <td>${student.matricule}</td>
        <td>${student.nom} ${student.prenom}</td>
        <td>${student.email}</td>
        <td>${student.telephone}</td>
        <td>${student.sexe}</td>  
        <td>${student.classe?.niveau || ' '}</td>
        <td>${student.classe?.spécialité || ' '}</td>
        <td>${new Date(student.dateNaissance).toLocaleDateString()}</td>
        <td>${student.lieuNaissance}</td>
        <td>${student.wilayaNaissance}</td>
        <td>${student.situation}</td>
        <td>${student.wilayaResidence}</td>
        <td>${student.adresse}</td>
     
        <td>
          <button class="edit-btn" data-id="${student._id}">modifier</button>
          <button class="delete-btn" data-id="${student._id}">detaille</button>
        </td>
      `;

        tableBody.appendChild(row);
      });
      attacherEventsAuxBoutons()
    }
  } catch (err) {
    console.error('front part Error fetching students:', err);
  }

}


// Modules Section ==================
const addModuleBtn = document.getElementById('addModuleBtn');
const moduleModal = document.getElementById('moduleModal');
const closeModuleModalBtn = document.getElementById('closeModuleModalBtn');
const moduleForm = document.getElementById('moduleForm');
const moduleTable = document.getElementById('moduleTable').getElementsByTagName('tbody')[0];
const searchModuleInput = document.getElementById('searchModuleInput');

// Ouvrir/fermer modal
addModuleBtn.addEventListener('click', () => moduleModal.classList.add('show'));
closeModuleModalBtn.addEventListener('click', () => moduleModal.classList.remove('show'));

// ajouter du module
moduleForm.addEventListener('submit', async function (e) {
  e.preventDefault();

  const matiere = document.getElementById('moduleName').value; // matière id
  const semestre = document.getElementById('semester').value;
  const teacher = document.getElementById('modEnseignant').value;  // id teacher
  const classe = document.getElementById('classList').value; // specialite +niveau
  const module = { semestre, matiere, teacher, classe }
  console.log(module)
  //const selectedClasses = Array.from(document.querySelectorAll('#classList input[type="checkbox"]:checked'))
  //.map(cb => cb.value).join(', ');

  try {
    const result = await fetch("/admin/add_module", {
      method: "POST",
      body: JSON.stringify({ module }),
      headers: { 'Content-Type': 'application/json' }
    })

    const data = await result.json()

    if (data.module) {
      console.log("new module added secssefully", data.module)
      await fetchModules()

    }
    if (data.err) {
      console.log(data.err);
      alert(data.err)
    }

  } catch (err) {
    alert(err)

  }
  moduleForm.reset();
  moduleModal.classList.remove('show');
});

//  get matiere of a specific class
document.getElementById('classList').addEventListener('change', function () {
  const classeId = this.value;
  const moduleSelect = document.getElementById('moduleName');

  moduleSelect.innerHTML = '<option value="">Chargement...</option>';

  fetch(`/admin/getMatiereByClass/${classeId}`)
    .then(response => response.json())
    .then(matieres => {
      moduleSelect.innerHTML = '<option value="">🎯 Sélectionner une matière</option>';
      matieres.forEach(mat => {
        const option = document.createElement('option');
        option.value = mat._id;
        option.textContent = mat.nom;
        moduleSelect.appendChild(option);
      });
    })
    .catch(err => {
      moduleSelect.innerHTML = '<option value="">Erreur lors du chargement</option>';
      console.log(err)
    });
});


// fetching modules 
async function fetchModules() {

  try {
    const res = await fetch('/admin/get_modules')

    // API endpoint to get all teachers

    const result = await res.json();
    if (result.err) {
      console.error(result.message, result.err);
    }
    else if (result.data) {

      const tableBody = document.querySelector('#moduleTable tbody');
      tableBody.innerHTML = ''; // Clear any existing rows
      console.log(result.data)

      result.data.forEach(module => {
        const row = document.createElement('tr');

        // Create table data for each teacher
        row.innerHTML = `
        <td>${module.matiere.nom} </td>
        <td>${module.classe.niveau} ${module.classe.spécialité}</td>
        <td>${module.semestre}</td>
        <td>${module.teacher?.nom || "supprime"}  ${module.teacher?.prenom || "supprime"}</td>
        <td>
          <button class="edit-btn" data-id="${module._id}">modifier</button>
          <button class="delete-btn" data-id="${module._id}">supprimer</button>
        </td>
      `;

        tableBody.appendChild(row);
      });
    }
  } catch (err) {
    console.error('front part Error fetching modules:', err);
  }

}

// Recherche
searchModuleInput.addEventListener('input', function () {
  const query = this.value.toLowerCase();
  const rows = moduleTable.getElementsByTagName('tr');
  Array.from(rows).forEach(row => {
    const name = row.cells[0].textContent.toLowerCase();
    const classes = row.cells[2].textContent.toLowerCase();
    row.style.display = (name.includes(query) || classes.includes(query)) ? '' : 'none';
  });
});


// Fonction pour gérer les clics sur les boutons Modifier et Supprimer // for module
// moduleTable.addEventListener('click', function (e) {
//   const target = e.target;
//   const row = target.closest('tr');

//   if (target.classList.contains('delete-btn')) {
//     if (confirm('Voulez-vous vraiment supprimer ce module ?')) {
//       row.remove();
//     }
//   }

//   if (target.classList.contains('edit-btn')) {
//     // Remplir le formulaire avec les données existantes
//     const name = row.cells[0].textContent;
//     const coef = row.cells[1].textContent;
//     const classes = row.cells[2].textContent;
//     const modEnseignant = row.cells[4].textContent;
//     //const classes = row.cells[2].textContent.split(', ');
//     const semester = row.cells[3].textContent;

//     document.getElementById('moduleName').value = name;
//     document.getElementById('coefficient').value = coef;
//     document.getElementById('semester').value = semester;
//     document.getElementById('modEnseignant').value = modEnseignant;
//     document.getElementById('classList').value = classes;


//     // Cocher les cases correspondantes
//     //const checkboxes = document.querySelectorAll('#classList input[type="checkbox"]');
//     //checkboxes.forEach(cb => {
//     //    cb.checked = classes.includes(cb.value);
//     // });

//     // Supprimer la ligne actuelle (sera remplacée après enregistrement)
//     row.remove();

//     // Réouvrir le modal
//     moduleModal.classList.add('show');
//   }
// });

// Schedule Management ================


const jours = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi"];
const heures = ["08:00 - 09:30", "09:30 - 11:00", "11:00 - 12:30", "12:30 - 14:00", "14:00 - 15:30", "15:30 - 17:00"];

const planningTable = document.getElementById("planningTable");
const planningContainer = document.getElementById("planningTableContainer");
const modal = document.getElementById("creneauModal");
const closeModal = document.getElementById("closeModalCreneau");
const addCreneauBtn = document.getElementById("addCreneauBtn");
const form = document.getElementById("creneauForm");

let currentCell = null;

document.getElementById("loadScheduleBtn").addEventListener("click", () => {
  const Classe = document.getElementById("classe").value;

  const semestre = document.getElementById("semestre").value;

  if (Classe && semestre) {
    generateTableSch();
    planningContainer.style.display = "block";
  } else {
    alert("Veuillez remplir tous les champs.");
  }
});

function generateTableSch() {
  planningTable.innerHTML = "";

  const header = `<tr><th>Jour / Heure</th>${heures.map(h => `<th>${h}</th>`).join("")}</tr>`;
  planningTable.insertAdjacentHTML("beforeend", header);

  jours.forEach(jour => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${jour}</td>`;

    heures.forEach(heure => {
      const td = document.createElement("td");
      td.className = "creneau-cell";
      td.dataset.jour = jour;
      td.dataset.heure = heure;
      td.addEventListener("click", () => openModal(jour, heure, td));
      row.appendChild(td);
    });

    planningTable.appendChild(row);
  });
}

function openModal(jour, heure, cell) {
  modal.classList.add("show");
  currentCell = cell;

  document.getElementById("selectedDayVisible").value = jour;
  document.getElementById("selectedTimeVisible").value = heure;
}


closeModal.addEventListener("click", () => modal.classList.remove("show"));

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const module = document.getElementById("module").value;
  const professeur = document.getElementById("professeur").value.trim();
  const salle = document.getElementById("salle").value;
  const seance = document.getElementById("seance").value;
  const jour = document.getElementById("selectedDayVisible").value;
  const heure = document.getElementById("selectedTimeVisible").value;





  //if (!module || !enseignant || !classe || !jour || !heure) {
  // alert("Veuillez remplir tous les champs.");
  // return;
  //}

  // Si on est en train d’ajouter sur une cellule cliquée
  if (!currentCell) {
    // Trouver la cellule correspondante
    const allCells = document.querySelectorAll('.creneau-cell');
    currentCell = Array.from(allCells).find(cell =>
      cell.dataset.jour === jour && cell.dataset.heure === heure
    );
  }

  if (!currentCell) {
    alert("Impossible de trouver la cellule à remplir.");
    return;
  }

  // Insérer le contenu dans la cellule
  currentCell.innerHTML = `
    <div class="creneau-box">
     <strong>${module}</strong><br>
      ${professeur}<br>
       ${seance} [${salle}]
      <div class="actions">
        <button class="edit-btn">✏️</button>
        <button class="delete-btn">🗑️</button>
      </div>
    </div>
  `;

  addActions(currentCell);

  // Reset
  modal.classList.remove("show");
  form.reset();
  currentCell = null;

});

function addActions(cell) {
  cell.querySelector(".delete-btn").addEventListener("click", (e) => {
    e.stopPropagation();
    cell.innerHTML = "";
  });

  cell.querySelector(".edit-btn").addEventListener("click", (e) => {
    e.stopPropagation();
    const module = cell.querySelector("strong").innerText;
    const lines = cell.querySelectorAll("br");
    const enseignant = lines[0].nextSibling.textContent.trim();
    const salle = lines[1].nextSibling.textContent.trim();
    const seance = lines[1].nextSibling.textContent.trim();

    document.getElementById("module").value = module;
    document.getElementById("professeur").value = enseignant;
    document.getElementById("salle").value = salle;
    document.getElementById("seance").value = seance;
    openModal(cell.dataset.jour, cell.dataset.heure, cell);
  });
}

//addCreneauBtn.addEventListener("click", () => {
//  if (!currentCell) {
//    alert("Veuillez d'abord cliquer sur une cellule du tableau pour sélectionner un créneau.");
//  return;
//  }
//  modal.classList.add("show");
// });




// Accounts Management ========================

// -------------------- Gestion des comptes --------------------

//const usersKey = "usersData";
//let editingUserIndex = null;

// Initialisation lors du chargement de la section
//function initAccountManagement() {
//  renderUserTable();
//}

//function renderUserTable() {
// const users = JSON.parse(localStorage.getItem(usersKey)) || [];
// const tableBody = users.map((user, index) => `
//   <tr>
//    <td>${user.prenom}</td>
//    <td>${user.nom}</td>
//    <td>${user.email}</td>
//    <td>${user.role}</td>
//    <td>
//      <button onclick="editUser(${index})">✏️</button>
//      <button onclick="deleteUser(${index})">🗑️</button>
//    </td>
//  </tr>
//`).join("");

// document.getElementById("userTableBody").innerHTML = tableBody;
//}

//function openUserModal(editIndex = null) {
//document.getElementById("userModal").classList.add("show");
//if (editIndex !== null) {
//  const users = JSON.parse(localStorage.getItem(usersKey)) || [];
//  const user = users[editIndex];
//  document.getElementById("prenom").value = user.prenom;
//  document.getElementById("nom").value = user.nom;
//  document.getElementById("email").value = user.email;
//  document.getElementById("password").value = user.password;
//  document.getElementById("role").value = user.role;
//  editingUserIndex = editIndex;
//} else {
//  document.getElementById("userForm").reset();
//  editingUserIndex = null;
//}
//}

//function closeUserModal() {
//  document.getElementById("userModal").classList.remove("show");
//}

//function saveUser(e) {
//  e.preventDefault();
//  const prenom = document.getElementById("prenom").value;
//  const nom = document.getElementById("nom").value;
//  const email = document.getElementById("email").value;
//  const password = document.getElementById("password").value;
//  const role = document.getElementById("role").value;

////if (!prenom || !nom || !email || !password || !role) {
////alert("Veuillez remplir tous les champs.");
//// return;
////}

//  const users = JSON.parse(localStorage.getItem(usersKey)) || [];

//  const user = { prenom, nom, email, password, role };

//  if (editingUserIndex !== null) {
//    users[editingUserIndex] = user;
//  } else {
//    users.push(user);
//  }

//  localStorage.setItem(usersKey, JSON.stringify(users));
//  closeUserModal();
//  renderUserTable();
//}

//function deleteUser(index) {
//  if (confirm("Supprimer ce compte ?")) {
//    const users = JSON.parse(localStorage.getItem(usersKey)) || [];
//    users.splice(index, 1);
//    localStorage.setItem(usersKey, JSON.stringify(users));
//    renderUserTable();
//  }
//}

//function editUser(index) {
//  openUserModal(index);
//}

//// Appel de la fonction d'init quand on affiche la section
//document.getElementById("accounts").addEventListener("click", () => {
//  initAccountManagement();
//});



// Notification Section ==========================
//================================================


// Stockage temporaire des annonces (tu peux le remplacer par localStorage plus tard)
let annonces = [];

// Gérer l’affichage du champ "Classe"
document.getElementById("noticeTarget").addEventListener("change", function () {
  const selected = this.value;
  const classSelection = document.getElementById("classSelection");
  classSelection.style.display = selected === "classe" ? "block" : "none";
});

// Soumission du formulaire
document.getElementById("noticeForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const titre = document.getElementById("noticeTitle").value.trim();
  const message = document.getElementById("noticeMessage").value.trim();
  const destinataire = document.getElementById("noticeTarget").value;
  const classe = document.getElementById("targetClass").value.trim();

  if (!titre || !message || !destinataire || (destinataire === "classe" && !classe)) {
    alert("Veuillez remplir tous les champs.");
    return;
  }

  const nouvelleAnnonce = {
    id: Date.now(),
    titre,
    message,
    destinataire: destinataire === "classe" ? `Classe: ${classe}` : destinataire,
    date: new Date().toLocaleString()
  };

  annonces.push(nouvelleAnnonce);
  afficherAnnonces();
  this.reset();
  document.getElementById("classSelection").style.display = "none";
});

// Affichage des annonces
function afficherAnnonces() {
  const container = document.getElementById("noticeList");
  container.innerHTML = "";

  if (annonces.length === 0) {
    container.innerHTML = "<p>Aucune annonce pour le moment.</p>";
    return;
  }

  annonces.forEach(annonce => {
    const card = document.createElement("div");
    card.className = "notice-card";
    card.innerHTML = `
      <h3>${annonce.titre}</h3>
      <p>${annonce.message}</p>
      <small><strong>Destinataires :</strong> ${annonce.destinataire}</small><br>
      <small><strong>Date :</strong> ${annonce.date}</small>
      <div style="margin-top: 10px;">
        <button onclick="supprimerAnnonce(${annonce.id})">🗑️ Supprimer</button>
      </div>
    `;
    container.appendChild(card);
  });
}

// Supprimer une annonce
function supprimerAnnonce(id) {
  annonces = annonces.filter(a => a.id !== id);
  afficherAnnonces();
}


// Logout ====================================

// Sélectionner le bouton de logout dans le sidebar
document.querySelector(".logout").addEventListener("click", async (e) => {
  e.preventDefault(); // empêcher le comportement par défaut du lien

  if (confirm("Voulez-vous vraiment vous déconnecter ?")) {
    // Supprimer les données de session (ou utilisateur connecté)
    await fetch("/admin/logout")

    window.location.href = "../admin/login";
    alert("Vous avez été déconnecté.");
    localStorage.clear()
    // Ou recharger la page pour revenir à l'état initial
    //location.reload();

  }
});


// Matieres Section ==================
const addMatiereBtn = document.getElementById('addMatiereBtn');
const matiereModal = document.getElementById('matiereModal');
const closeMatiereModalBtn = document.getElementById('closeMatiereModalBtn');
const matiereForm = document.getElementById('matiereForm');
const matiereTable = document.getElementById('matiereTable').getElementsByTagName('tbody')[0];
const searchMatiereInput = document.getElementById('searchMatiereInput');

// Ouvrir/fermer modal
addMatiereBtn.addEventListener('click', () => matiereModal.classList.add('show'));
closeMatiereModalBtn.addEventListener('click', () => matiereModal.classList.remove('show'));

// Soumission du formulaire
matiereForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('matiereName').value;
    const coef = document.getElementById('coefficient').value;
    const classe = document.getElementById('classeMat').value;
    const crédit = document.getElementById('crédit').value;
    const unité = document.getElementById('unité').value;
    const cour = document.getElementById('cour').value;
    const TD = document.getElementById('TD').value;
    const TP = document.getElementById('TP').value;
   

    //const selectedClasses = Array.from(document.querySelectorAll('#classList input[type="checkbox"]:checked'))
        //.map(cb => cb.value).join(', ');


	// ✅ Vérification des doublons
    const existingRows = matiereTable.getElementsByTagName('tr');
    let duplicateFound = false;

    Array.from(existingRows).forEach(row => {
        const existingName = row.cells[0].textContent.trim().toLowerCase();
        if (existingName === matiereName.trim().toLowerCase()) {
            duplicateFound = true;
        }
    });

    if (duplicateFound) {
        alert("Ce module existe déjà !");
        return;
    }
		
    // Ajouter une nouvelle ligne au tableau
    const newRow = matiereTable.insertRow();
    newRow.innerHTML = `
        <td>${name}</td>
        <td>${coef}</td>
        <td>${classe}</td>
        <td>${crédit}</td>
        <td>${unité}</td>
        <td>${cour}</td>
        <td>${TD}</td>
        <td>${TP}</td>
        <td>
            <button class="edit-btn">✏️</button>
            <button class="delete-btn">🗑️</button>
        </td>
    `;

    matiereForm.reset();
    matiereModal.classList.remove('show');
});

// Recherche
searchMatiereInput.addEventListener('input', function () {
    const query = this.value.toLowerCase();
    const rows = matiereTable.getElementsByTagName('tr');
    Array.from(rows).forEach(row => {
        const name = row.cells[0].textContent.toLowerCase();
        const classes = row.cells[2].textContent.toLowerCase();
        row.style.display = (name.includes(query) || classes.includes(query)) ? '' : 'none';
    });
});


// Fonction pour gérer les clics sur les boutons Modifier et Supprimer
matiereTable.addEventListener('click', function (e) {
    const target = e.target;
    const row = target.closest('tr');

    if (target.classList.contains('delete-btn')) {
        if (confirm('Voulez-vous vraiment supprimer ce module ?')) {
            row.remove();
        }
    }

    if (target.classList.contains('edit-btn')) {
        // Remplir le formulaire avec les données existantes
        const name = row.cells[0].textContent;
        const coef = row.cells[1].textContent;
        const classe = row.cells[2].textContent;
        const crédit = row.cells[3].textContent;
        const unité = row.cells[4].textContent;
        //const classes = row.cells[2].textContent.split(', ');
        
        const cour = row.cells[5].textContent;
        const TD = row.cells[6].textContent;
        const TP = row.cells[7].textContent;


        document.getElementById('moduleName').value = name;
        document.getElementById('coefficient').value = coef;
        document.getElementById('classeMat').value = classe;
        document.getElementById('crédit').value = crédit;
        document.getElementById('cour').value = cour;
        document.getElementById('TD').value = TD;
        document.getElementById('TP').value = TP;
        document.getElementById('unité').value = unité;
       
        

        // Cocher les cases correspondantes
        //const checkboxes = document.querySelectorAll('#classList input[type="checkbox"]');
        //checkboxes.forEach(cb => {
        //    cb.checked = classes.includes(cb.value);
       // });

        // Supprimer la ligne actuelle (sera remplacée après enregistrement)
        row.remove();

        // Réouvrir le modal
        matiereModal.classList.add('show');
    }
});


// Exams section=================================

// Exams section=================================

const classCards = document.querySelectorAll('.card');
const examTablesContainer = document.getElementById('examTablesContainer');
const examModal = document.getElementById('examModal');
const closeExamModal = document.getElementById('closeExamModal');
const examForm = document.getElementById('examForm');

let currentClasse = "";

// Récupérer les données existantes du localStorage
let examsData = JSON.parse(localStorage.getItem('examsData')) || {};

// Affiche les examens enregistrés au démarrage
classCards.forEach(card => {
  card.addEventListener('click', () => {
    currentClasse = card.dataset.classe;
    showExamTable(currentClasse);
  });
});

function saveExamsToStorage() {
  localStorage.setItem('examsData', JSON.stringify(examsData));
}

function showExamTable(classe) {
  // Cacher tous les tableaux
  document.querySelectorAll('.exam-table').forEach(table => table.classList.remove('active'));

  // Supprimer anciens boutons
  document.querySelectorAll('.exam-table-add-btn').forEach(btn => btn.remove());

  let table = document.getElementById(`table-${classe}`);
  if (!table) {
    table = document.createElement('table');
    table.className = 'exam-table active';
    table.id = `table-${classe}`;
    table.innerHTML = `
      <caption>Planning des examens - ${classe}</caption>
      <thead>
        <tr><th>Module</th><th>Date</th><th>Heure</th><th>Salle</th><th>Actions</th></tr>
      </thead>
      <tbody></tbody>
    `;
    examTablesContainer.appendChild(table);
  } else {
    table.classList.add('active');
    table.querySelector('tbody').innerHTML = ''; // Vider le tbody pour recharger proprement
  }

  const addBtn = document.createElement('button');
  addBtn.textContent = "➕ Ajouter un examen";
  addBtn.className = "exam-table-add-btn";
  addBtn.addEventListener('click', () => openExamModal(classe));
  examTablesContainer.insertBefore(addBtn, table);

  // Afficher les examens existants depuis examsData
  const tbody = table.querySelector('tbody');
  if (examsData[classe]) {
    examsData[classe].forEach(exam => {
      const row = createExamRow(classe, exam.module, exam.date, exam.heure, exam.salle);
      tbody.appendChild(row);
    });
  }
}

function openExamModal(classe) {
  document.getElementById('examClasse').value = classe;
  examModal.style.display = 'flex';
}

closeExamModal.addEventListener('click', () => {
  examModal.style.display = 'none';
  examForm.reset();
});

function createExamRow(classe, module, date, heure, salle) {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${module}</td>
    <td>${date}</td>
    <td>${heure}</td>
    <td>${salle}</td>
    <td>
      <button class="edit-btn">✏️</button>
      <button class="delete-btn">🗑️</button>
    </td>
  `;

  row.querySelector('.edit-btn').addEventListener('click', () => {
    document.getElementById('examClasse').value = classe;
    document.getElementById('examModule').value = module;
    document.getElementById('examDate').value = date;
    document.getElementById('examHeure').value = heure;
    document.getElementById('examSalle').value = salle;

    row.remove();
    examsData[classe] = examsData[classe].filter(e => !(e.module === module && e.date === date && e.heure === heure));
    saveExamsToStorage();
    examModal.style.display = 'flex';
  });

  row.querySelector('.delete-btn').addEventListener('click', () => {
    row.remove();
    examsData[classe] = examsData[classe].filter(e => !(e.module === module && e.date === date && e.heure === heure));
    saveExamsToStorage();
  });

  return row;
}

examForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const classe = document.getElementById('examClasse').value;
  const module = document.getElementById('examModule').value;
  const date = document.getElementById('examDate').value;
  const heure = document.getElementById('examHeure').value;
  const salle = document.getElementById('examSalle').value;

  const table = document.getElementById(`table-${classe}`);
  const tbody = table.querySelector('tbody');

  // Vérification des doublons
  const conflict = (examsData[classe] || []).some(exam => exam.date === date && exam.heure === heure);
  if (conflict) {
    alert("❌ Un examen est déjà prévu à cette date et cette heure pour cette classe.");
    return;
  }

  const newExam = { module, date, heure, salle };
  if (!examsData[classe]) examsData[classe] = [];
  examsData[classe].push(newExam);
  saveExamsToStorage();

  const newRow = createExamRow(classe, module, date, heure, salle);
  tbody.appendChild(newRow);

  examModal.style.display = 'none';
  examForm.reset();
});








// deliberation section=======================================

/*
//==cote frontend - voir app.js et mockData.js dans routers
async function chargerMockData() {
  const res = await fetch("http://localhost:3000/api/mockdata/m1si/2024");
  const data = await res.json();
  console.log(data); // vérifie dans la console

  // Appelle ici ta fonction qui remplit les tableaux avec `data.semestres`
  remplirTableauxDeliberation(data.semestres);
}
document.addEventListener("DOMContentLoaded", () => {
  chargerMockData();
});
//Étapes principales de la fonction
function remplirTableauxDeliberation(data) {
  const semestre1 = data.S1;
  const semestre2 = data.S2;

  remplirTableauSemestre("tableauS1", semestre1);
  remplirTableauSemestre("tableauS2", semestre2);

  remplirTableauAnnuel("tableauAnnuel", semestre1.etudiants, semestre2.etudiants);
}

/*
//Fonction pour remplir un tableau de semestre

function remplirTableauSemestre(idTable, semestre) {
  const table = document.getElementById(idTable); 
 table.innerHTML = ""; // vider l'ancien contenu

  // En-tête
 const thead = document.createElement("thead");
 const trHead = document.createElement("tr");

 trHead.innerHTML = `<th>Étudiant</th>`;
  const toutesMatieres = Object.values(semestre.ue).flatMap(ue => ue.matieres);
  toutesMatieres.forEach(m => {
    trHead.innerHTML += `<th>${m.nom}</th>`;
  });
  trHead.innerHTML += `<th>Moyenne S.</th><th>Résultat</th>`;
  thead.appendChild(trHead);
  table.appendChild(thead);

  // Corps
  const tbody = document.createElement("tbody");

  semestre.etudiants.forEach(etud => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${etud.nom}</td>`;

    let total = 0;
    let coeffTotal = 0;

    toutesMatieres.forEach(m => {
      const note = etud.evaluations[m.id]?.moyenne || 0;
      tr.innerHTML += `<td>${note.toFixed(1)}</td>`;
      total += note * m.coeff;
      coeffTotal += m.coeff;
    });

    const moyenne = (total / coeffTotal).toFixed(2);
    tr.innerHTML += `<td>${moyenne}</td>`;

    tr.innerHTML += `
      <td>
        <select>
          <option value="admis">Admis</option>
          <option value="rattrapage">Rattrapage</option>
          <option value="ajourné">Ajourné</option>
        </select>
      </td>
   `;

    tbody.appendChild(tr);
  });

  table.appendChild(tbody);
}
*/


/*
//Fonction pour le tableau Annuel
function remplirTableauAnnuel(idTable, etudiantsS1, etudiantsS2) {
  const table = document.getElementById(idTable);
  table.innerHTML = "";

  const thead = document.createElement("thead");
  thead.innerHTML = `
    <tr>
      <th>Étudiant</th>
      <th>Moy S1</th>
      <th>Moy S2</th>
      <th>Moyenne Générale</th>
      <th>Décision</th>
    </tr>
  `;
  table.appendChild(thead);

  const tbody = document.createElement("tbody");

  etudiantsS1.forEach((etudS1, i) => {
    const etudS2 = etudiantsS2[i];
    const moy1 = calculerMoyenne(etudS1);
    const moy2 = calculerMoyenne(etudS2);
    const moyenneGen = ((moy1 + moy2) / 2).toFixed(2);

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${etudS1.nom}</td>
      <td>${moy1.toFixed(2)}</td>
      <td>${moy2.toFixed(2)}</td>
      <td>${moyenneGen}</td>
      <td>
        <select>
          <option value="admis">Admis</option>
          <option value="rattrapage">Rattrapage</option>
          <option value="ajourné">Ajourné</option>
          <option value="passage par rachat">Rachat</option>
        </select>
      </td>
    `;

    tbody.appendChild(tr);
  });

  table.appendChild(tbody);
}

function calculerMoyenne(etud) {
  const notes = Object.values(etud.evaluations).map(ev => ev.moyenne);
  if (notes.length === 0) return 0;
  const sum = notes.reduce((acc, n) => acc + n, 0);
  return sum / notes.length;
}
*/

// Données simulées
const mockData = {
  classe: "M1 SI",
  semestres: {
    S1: {
      ue: [
        {
          nom: "UEF",
          matieres: [
            { nom: "ACPS", coeff: 2, credit: 4 },
            { nom: "AQPS", coeff: 2, credit: 4 },
            { nom: "MBS", coeff: 1, credit: 2 }
          ]
        },
        {
          nom: "UEM",
          matieres: [
            { nom: "MR", coeff: 2, credit: 3 },
            { nom: "APPS", coeff: 1, credit: 2 }
          ]
        }
      ],
      etudiants: [
        {
          nom: "Ali Benali",
          notes: {
            ACPS: 14.5,
            AQPS: 12,
            MBS: 11,
            MR: 13,
            APPS: 15
          },
          decision: "admis"
        },
        {
          nom: "Sara Kaci",
          notes: {
            ACPS: 9,
            AQPS: 8.5,
            MBS: 10,
            MR: 12,
            APPS: 10
          },
          decision: "rattrapage"
        },
        {
          nom: "Yacine Bouzid",
          notes: {
            ACPS: 16,
            AQPS: 14,
            MBS: 15,
            MR: 14,
            APPS: 16
          },
          decision: "admis"
        }
      ]
    },
    S2: {
      ue: [
        {
          nom: "UED",
          matieres: [
            { nom: "Analyse", coeff: 3, credit: 5 },
            { nom: "Statistiques", coeff: 2, credit: 3 }
          ]
        },
        {
          nom: "UET",
          matieres: [
            { nom: "Projet", coeff: 1, credit: 2 }
          ]
        }
      ],
      etudiants: [
        {
          nom: "Ali Benali",
          notes: {
            Analyse: 13,
            Statistiques: 14,
            Projet: 15
          },
          decision: "admis"
        },
        {
          nom: "Sara Kaci",
          notes: {
            Analyse: 10,
            Statistiques: 4,
            Projet: 11
          },
          decision: "ajourné"
        },
        {
          nom: "Yacine Bouzid",
          notes: {
            Analyse: 17,
            Statistiques: 16,
            Projet: 18
          },
          decision: "admis"
        }
      ]
    }
  }
};

//code JavaScript complet pour générer dynamiquement le tableau du S1 / S2
function calculerMoyenneUE(matieres, notesEtudiant) {
  let totalNote = 0, totalCoeff = 0;
  matieres.forEach(m => {
    if (notesEtudiant[m.nom] !== undefined) {
      totalNote += notesEtudiant[m.nom] * m.coeff;
      totalCoeff += m.coeff;
    }
  });
  return totalCoeff > 0 ? (totalNote / totalCoeff).toFixed(2) : "-";
}

function calculerMoyenneGlobale(etudiant, ueList) {
  let totalNote = 0, totalCoeff = 0;
  ueList.forEach(ue => {
    ue.matieres.forEach(m => {
      const note = etudiant.notes[m.nom];
      if (note !== undefined) {
        totalNote += note * m.coeff;
        totalCoeff += m.coeff;
      }
    });
  });
  return totalCoeff > 0 ? (totalNote / totalCoeff).toFixed(2) : "-";
}

function calculerCreditTotal(etudiant, ueList) {
  let total = 0;
  ueList.forEach(ue => {
    ue.matieres.forEach(m => {
      const note = etudiant.notes[m.nom];
      if (note !== undefined && note >= 10) {
        total += m.credit;
      }
    });
  });
  return total;
}

function getTotauxUE(ue) {
  let totalCoeff = 0, totalCredit = 0;
  ue.matieres.forEach(m => {
    totalCoeff += m.coeff;
    totalCredit += m.credit;
  });
  return { totalCoeff, totalCredit };
}

function generateTable(data, semestreKey, theadId, tbodyId) {
  const ueList = data.semestres[semestreKey].ue;
  const etudiants = data.semestres[semestreKey].etudiants;

  
  const thead = document.getElementById(theadId);
  if (!thead) {
  console.error(`Élément introuvable : #${theadId}`);
  return;
  }
  const tr1 = document.createElement("tr");
  tr1.innerHTML = `<th rowspan="2">Étudiant</th>`;


  // Ligne 1 : noms des UE
  ueList.forEach(ue => {
    const colspan = ue.matieres.length;
    tr1.innerHTML += `<th colspan="${colspan}" class="ue-head">${ue.nom}</th>`;
  });

  // Ajout des colonnes moyennes avec totaux dynamiques
  ueList.forEach(ue => {
    const { totalCoeff, totalCredit } = getTotauxUE(ue);
    tr1.innerHTML += `<th rowspan="2">Moyenne ${ue.nom}<br><span class="subtext">Coef:${totalCoeff}, Cr:${totalCredit}</span></th>`;
  });

  tr1.innerHTML += `<th rowspan="2">Moyenne générale</th>`;
  tr1.innerHTML += `<th rowspan="2">Crédits total</th>`;
  tr1.innerHTML += `<th rowspan="2">Résultat</th>`;

  // Ligne 2 : matières avec leurs infos
  const tr2 = document.createElement("tr");
  ueList.forEach(ue => {
    ue.matieres.forEach(m => {
      tr2.innerHTML += `<th>${m.nom}<br><span class="subtext">Coef:${m.coeff}, Cr:${m.credit}</span></th>`;
    });
  });

  thead.appendChild(tr1);
  thead.appendChild(tr2);

  // Corps du tableau
  const tbody = document.getElementById(tbodyId);
  etudiants.forEach(etudiant => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${etudiant.nom}</td>`;

    // Notes par matière
    ueList.forEach(ue => {
      ue.matieres.forEach(m => {
        const note = etudiant.notes[m.nom];
        const dangerClass = (note !== undefined && note <= 5) ? "note-faible" : "";
        tr.innerHTML += `<td class="${dangerClass}">${note !== undefined ? note : "-"}</td>`;
      });
    });

    // Moyennes par UE
    ueList.forEach(ue => {
      const moy = calculerMoyenneUE(ue.matieres, etudiant.notes);
      tr.innerHTML += `<td>${moy}</td>`;
    });

    // Moyenne générale, crédits totaux, résultat
    const moyenneG = calculerMoyenneGlobale(etudiant, ueList);
    const creditsTotal = calculerCreditTotal(etudiant, ueList);
    tr.innerHTML += `<td>${moyenneG}</td>`;
    tr.innerHTML += `<td>${creditsTotal}</td>`;
    tr.innerHTML += `
      <td>
        <select>
          <option value="admis" ${etudiant.decision === "admis" ? "selected" : ""}>Admis</option>
          <option value="ajourné" ${etudiant.decision === "ajourné" ? "selected" : ""}>Ajourné</option>
          <option value="rattrapage" ${etudiant.decision === "rattrapage" ? "selected" : ""}>Rattrapage</option>
          <option value="passage par rachat" ${etudiant.decision === "passage par rachat" ? "selected" : ""}>Rachat</option>
        </select>
      </td>
    `;

    tbody.appendChild(tr);
  });
}

// Appel pour S1 et S2
generateTable(mockData, "S1", "thead-s1", "tbody-s1");
generateTable(mockData, "S2", "thead-s2", "tbody-s2");


// tableau annuel
function generateAnnualTable(data) {
  const tbody = document.getElementById("tbody-annuelle");

  const etudiantsS1 = data.semestres.S1.etudiants;
  const etudiantsS2 = data.semestres.S2.etudiants;

  etudiantsS1.forEach((etudiantS1, index) => {
    const etudiantS2 = etudiantsS2[index]; // suppose que même ordre

    const moyenneS1 = parseFloat(calculerMoyenneGlobale(etudiantS1, data.semestres.S1.ue));
    const moyenneS2 = parseFloat(calculerMoyenneGlobale(etudiantS2, data.semestres.S2.ue));
    const moyenneGenerale = (!isNaN(moyenneS1) && !isNaN(moyenneS2)) 
      ? ((moyenneS1 + moyenneS2) / 2).toFixed(2) 
      : "-";


    const creditS1 = calculerCreditTotal(etudiantS1, data.semestres.S1.ue);
    const creditS2 = calculerCreditTotal(etudiantS2, data.semestres.S2.ue);
    const creditsTotal = creditS1 + creditS2;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${etudiantS1.nom}</td>
      <td>${moyenneS1}</td>
      <td>${moyenneS2}</td>
      <td>${moyenneGenerale}</td>
      <td>${creditsTotal}</td>
      <td>
        <select>
          <option value="admis">Admis</option>
          <option value="ajourné">Ajourné</option>
          <option value="rattrapage">Rattrapage</option>
          <option value="passage par rachat">Rachat</option>
        </select>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

generateAnnualTable(mockData);
