const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');

allSideMenu.forEach(item=> {
	const li = item.parentElement;

	item.addEventListener('click', function () {
		allSideMenu.forEach(i=> {
			i.parentElement.classList.remove('active');
		})
		li.classList.add('active');
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
	if(window.innerWidth < 576) {
		e.preventDefault();
		searchForm.classList.toggle('show');
		if(searchForm.classList.contains('show')) {
			searchButtonIcon.classList.replace('bx-search', 'bx-x');
		} else {
			searchButtonIcon.classList.replace('bx-x', 'bx-search');
		}
	}
})





if(window.innerWidth < 768) {
	sidebar.classList.add('hide');
} else if(window.innerWidth > 576) {
	searchButtonIcon.classList.replace('bx-x', 'bx-search');
	searchForm.classList.remove('show');
}


window.addEventListener('resize', function () {
	if(this.innerWidth > 576) {
		searchButtonIcon.classList.replace('bx-x', 'bx-search');
		searchForm.classList.remove('show');
	}
})



const switchMode = document.getElementById('switch-mode');

switchMode.addEventListener('change', function () {
	if(this.checked) {
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

		// Cacher toutes les sections
		contentSections.forEach(section => {
			section.classList.remove('show');
		});

		// Afficher la section ciblée
		const targetSection = document.getElementById(targetId);
		if (targetSection) {
			targetSection.classList.add('show');
		}
	});
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
addTeacherBtn.addEventListener('click', function() {
    teacherModal.classList.add('show');
});

// Fermeture du modal
closeModalBtn.addEventListener('click', function() {
    teacherModal.classList.remove('show');
});

// Gestion du formulaire d'ajout
teacherForm.addEventListener('submit', function(e) {
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

    // Ajouter une nouvelle ligne dans le tableau
    const newRow = teacherTable.insertRow();
    newRow.innerHTML = `
        <td>${firstName} ${lastName}</td>
        <td>${email}</td>
        <td>${password}</td>
       
        <td>${status === 'active' ? 'Actif' : 'Inactif'}</td>
        <td>${grade}</td>
        <td>
            <button class="edit-btn">✏️ Modifier</button>
            <button class="delete-btn">🗑️ Supprimer</button>
        </td>
    `;
	// 🔁 Attacher les événements tout de suite après l'ajout
		attacherEventsAuxBoutons();

    // Réinitialiser le formulaire
    teacherForm.reset();
    teacherModal.classList.remove('show');
});

// Recherche des enseignants
searchInput.addEventListener('input', function() {
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




// fonction pour attacher les événements :
function attacherEventsAuxBoutons() {
    // Boutons modifier
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', function() {
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
        btn.addEventListener('click', function() {
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
studentForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const firstName = document.getElementById('studentFirstName').value;
    const lastName = document.getElementById('studentLastName').value;
    const email = document.getElementById('studentEmail').value;
    const StuPassword = document.getElementById('studentPassword').value;
    const phone = document.getElementById('studentPhone').value;
    const matricule = document.getElementById('studentMatricule').value;
    const classe = document.getElementById('studentClasse').value;

    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${firstName} ${lastName}</td>
        <td>${email}</td>
        <td>${StuPassword}</td>
        <td>${phone}</td>
        <td>${matricule}</td>
        <td>${classe}</td>
        <td>
            <button class="edit-btn">✏️ Modifier</button>
            <button class="delete-btn">🗑️ Supprimer</button>
        </td>
    `;

    // Ajouter les événements de suppression
    row.querySelector('.delete-btn').addEventListener('click', () => {
        row.remove();
    });

    studentTable.appendChild(row);
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
    const selectedClass = this.value.toLowerCase();
    const rows = studentTable.getElementsByTagName('tr');

    Array.from(rows).forEach(row => {
        const rowClass = row.cells[5].textContent.toLowerCase();

        if (selectedClass === '' || rowClass === selectedClass) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
});



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

// Soumission du formulaire
moduleForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('moduleName').value;
    const coef = document.getElementById('coefficient').value;
    const semester = document.getElementById('semester').value;
    const modEnseignant = document.getElementById('modEnseignant').value;
    const classe = document.getElementById('classList').value;

    //const selectedClasses = Array.from(document.querySelectorAll('#classList input[type="checkbox"]:checked'))
        //.map(cb => cb.value).join(', ');


	// ✅ Vérification des doublons
    const existingRows = moduleTable.getElementsByTagName('tr');
    let duplicateFound = false;

    Array.from(existingRows).forEach(row => {
        const existingName = row.cells[0].textContent.trim().toLowerCase();
        if (existingName === moduleName.trim().toLowerCase()) {
            duplicateFound = true;
        }
    });

    if (duplicateFound) {
        alert("Ce module existe déjà !");
        return;
    }
		
    // Ajouter une nouvelle ligne au tableau
    const newRow = moduleTable.insertRow();
    newRow.innerHTML = `
        <td>${name}</td>
        <td>${coef}</td>
         <td>${classe}</td>
        <td>${modEnseignant}</td>
        <td>${semester}</td>
        <td>
            <button class="edit-btn">✏️</button>
            <button class="delete-btn">🗑️</button>
        </td>
    `;

    moduleForm.reset();
    moduleModal.classList.remove('show');
});

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


// Fonction pour gérer les clics sur les boutons Modifier et Supprimer
moduleTable.addEventListener('click', function (e) {
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
        const classes = row.cells[2].textContent;
        const modEnseignant = row.cells[4].textContent;
        //const classes = row.cells[2].textContent.split(', ');
        const semester = row.cells[3].textContent;

        document.getElementById('moduleName').value = name;
        document.getElementById('coefficient').value = coef;
        document.getElementById('semester').value = semester;
        document.getElementById('modEnseignant').value = modEnseignant;
        document.getElementById('classList').value = classes;
        

        // Cocher les cases correspondantes
        //const checkboxes = document.querySelectorAll('#classList input[type="checkbox"]');
        //checkboxes.forEach(cb => {
        //    cb.checked = classes.includes(cb.value);
       // });

        // Supprimer la ligne actuelle (sera remplacée après enregistrement)
        row.remove();

        // Réouvrir le modal
        moduleModal.classList.add('show');
    }
});

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
  //const specialite = document.getElementById("specialite").value;
  //const salle = document.getElementById("salle").value;
  const semestre = document.getElementById("semestre").value;

  if (Classe  && semestre) {
    generateTable();
    planningContainer.style.display = "block";
  } else {
    alert("Veuillez remplir tous les champs.");
  }
});

function generateTable() {
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
  //const classe = document.getElementById("classe").value;
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
      ${classe}
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
    //const classe = lines[1].nextSibling.textContent.trim();

    document.getElementById("module").value = module;
    document.getElementById("professeur").value = enseignant;
    //document.getElementById("classe").value = classe;
    openModal(cell.dataset.jour, cell.dataset.heure, cell);
  });
}

addCreneauBtn.addEventListener("click", () => {
	if (!currentCell) {
	  alert("Veuillez d'abord cliquer sur une cellule du tableau pour sélectionner un créneau.");
	  return;
	}
	modal.classList.add("show");
  });



  
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
document.querySelector(".logout").addEventListener("click", (e) => {
  e.preventDefault(); // empêcher le comportement par défaut du lien
  
  if (confirm("Voulez-vous vraiment vous déconnecter ?")) {
    // Supprimer les données de session (ou utilisateur connecté)
    localStorage.removeItem("currentUser"); // ou adapte selon ta logique
    sessionStorage.clear(); // si tu utilises sessionStorage

    // Message de confirmation
    alert("Vous avez été déconnecté.");

    // Rediriger vers une page de connexion (si elle existe)
    window.location.href = "../Login-admin/login.html";

    // Ou recharger la page pour revenir à l'état initial
    //location.reload();

  }
});





  