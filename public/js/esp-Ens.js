const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');

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




allSideMenu.forEach(item=> {
	const li = item.parentElement;

	item.addEventListener('click', function () {
		allSideMenu.forEach(i=> {
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




// dashboard teacher -------------------------
/*
const ctx = document.getElementById('teacherChart').getContext('2d');

new Chart(ctx, {
	type: 'bar',
	data: {
		labels: ['Groupe A', 'Groupe B', 'Groupe C', 'Groupe D'],
		datasets: [{
			label: 'Cours déposés',
			data: [3, 2, 4, 3],
			backgroundColor: '#3c91e6',
			borderRadius: 8
		}]
	},
	options: {
		responsive: true,
		plugins: {
			legend: {
				display: false
			},
			title: {
				display: true,
				text: 'Cours déposés par groupe'
			}
		},
		scales: {
			y: {
				beginAtZero: true
			}
		}
	}
});
*/
// Tbleau
 // Données statiques exemple
    const chargeHoraire = {
      S1: [
        { module: "Algorithmique", cm: 20, td: 15, tp: 10 },
        { module: "Bases de données", cm: 18, td: 12, tp: 20 },
        { module: "Systèmes", cm: 22, td: 10, tp: 8 }
      ],
      S2: [
        { module: "Réseaux", cm: 16, td: 14, tp: 10 },
        { module: "Web", cm: 15, td: 10, tp: 15 },
        { module: "Intelligence Artificielle", cm: 20, td: 10, tp: 5 }
      ]
    };

    function remplirTableauStat(semestre, tableId) {
      const tbody = document.getElementById(tableId);
      tbody.innerHTML = ""; // Vider avant
      chargeHoraire[semestre].forEach(item => {
        const total = item.cm + item.td + item.tp;
        const row = `<tr>
          <td>${item.module}</td>
          <td>${item.cm}</td>
          <td>${item.td}</td>
          <td>${item.tp}</td>
          <td><strong>${total}</strong></td>
        </tr>`;
        tbody.innerHTML += row;
      });
    }

    function showSemester(id) {
      document.getElementById('s1').classList.add('hidden');
      document.getElementById('s2').classList.add('hidden');
      document.getElementById(id).classList.remove('hidden');
    }

    // Initialisation
    remplirTableauStat('S1', 'tableS1');
    remplirTableauStat('S2', 'tableS2');
 // === 1. Graphique en barres (moyennes par module) ===
    const barCtx = document.getElementById('barChart').getContext('2d');
    const barChart = new Chart(barCtx, {
      type: 'bar',
      data: {
        labels: ['Mathématiques', 'Informatique', 'Économie', 'Statistiques'],
        datasets: [{
          label: 'Moyenne des étudiants',
          data: [12.5, 14.2, 11.3, 13.7],
          backgroundColor: '#4e73df'
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            max: 20
          }
        }
      }
    });

    // === 2. Camembert (répartition des performances) ===
    const pieCtx = document.getElementById('pieChart').getContext('2d');
    const pieChart = new Chart(pieCtx, {
      type: 'doughnut',
      data: {
        labels: ['Excellent (>=16)', 'Bien (14-15.9)', 'Moyen (10-13.9)', 'Insuffisant (<10)'],
        datasets: [{
          label: 'Performance',
          data: [10, 15, 30, 8],
          backgroundColor: ['#28a745', '#ffc107', '#17a2b8', '#dc3545']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    });


// ------------------ Gestion automatique des sections ------------------

function hideAllSections() {
	document.querySelectorAll("main > div").forEach(div => {
		div.style.display = "none";
	});
}

document.querySelectorAll("#sidebar .side-menu.top li a").forEach(link => {
	link.addEventListener("click", function (e) {
		e.preventDefault();

		// Rendre les liens actifs visuellement
		document.querySelectorAll("#sidebar .side-menu.top li").forEach(li => li.classList.remove("active"));
		this.parentElement.classList.add("active");

		// Cacher toutes les sections
		hideAllSections();

		// Extraire le texte de la section
		const sectionName = this.innerText.trim().toLowerCase().replace(/\s+/g, '-');
		const targetSection = document.getElementById(sectionName);

		if (targetSection) {
			targetSection.style.display = "block";
		}
	});
});

// Group List -------------

// Données des groupes (tu peux remplacer ça par des données dynamiques plus tard)
const groupes = {
  "Groupe A": [
    { matricule: "A001" , nom: "Ali", prenom: "B."  },
    { matricule: "A002", nom: "Sami", prenom: "K." },
    { matricule: "A003" ,nom: "Yasmine", prenom: "D." }
  ],
  "Groupe B": [
    {  matricule: "B001" ,nom: "Amira", prenom: "T."},
    {  matricule: "B002"  , nom: "Rachid", prenom: "M."},
    {  matricule: "B003" , nom: "Nadia", prenom: "F."}
  ]
};

let currentGroup = null;
let seanceCount = 0;

// Bouton "Voir les étudiants"
document.querySelectorAll('.btn-view-students').forEach(button => {
  button.addEventListener('click', function () {
    const groupCard = this.closest('.group-card');
    const groupName = groupCard.querySelector('h3').textContent.trim();
    showAttendanceTable(groupName);
  });
});

function showAttendanceTable(groupName) {
  const container = document.getElementById('students-attendance-container');
  const table = document.getElementById('attendance-table');
  const tbody = table.querySelector('tbody');
  const thead = table.querySelector('thead tr');

  // Réinitialiser
  tbody.innerHTML = "";
  thead.innerHTML = "<th>Matricule</th><th>Nom</th><th>Prénom</th>";
  document.getElementById('selected-group-name').textContent = groupName;

  currentGroup = groupName;
  seanceCount = 0;

  groupes[groupName].forEach(etudiant => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
	  <td>${etudiant.matricule}</td>
      <td>${etudiant.nom}</td>
      <td>${etudiant.prenom}</td>
    `;
    tbody.appendChild(tr);
  });

  container.style.display = "block";
}
// foncton d'alert
function mettreAJourCouleurLigne() {
  const table = document.getElementById('attendance-table');
  const tbodyRows = table.querySelectorAll('tbody tr');

  tbodyRows.forEach(row => {
    let totalAbsences = 0;
    const checkboxes = row.querySelectorAll('input[type="checkbox"][value="A"]');

    checkboxes.forEach(cb => {
      if (cb.checked) totalAbsences++;
    });

    if (totalAbsences >= 5) {
      row.style.backgroundColor = '#f53535'; // Rouge
    } else if (totalAbsences >= 3) {
      row.style.backgroundColor = '#ffe6e6'; // Rose clair
    } else {
      row.style.backgroundColor = ''; // Réinitialiser
    }
  });
}


// Ajouter une séance avec date
document.getElementById('add-seance-button').addEventListener('click', () => {
  if (!currentGroup) return;

  const table = document.getElementById('attendance-table');
  const thead = table.querySelector('thead tr');
  const tbodyRows = table.querySelectorAll('tbody tr');

  seanceCount++;

  // Crée une cellule d’en-tête avec date
  const th = document.createElement('th');
  const dateInput = document.createElement('input');
  dateInput.type = 'date';
  dateInput.name = `seance-date-${seanceCount}`;
  dateInput.required = true;
  th.appendChild(dateInput);
  thead.appendChild(th);

  // Ajoute une cellule pour chaque étudiant avec 2 cases à cocher
  tbodyRows.forEach((row, index) => {
    const td = document.createElement('td');

    const checkboxP = document.createElement('input');
    checkboxP.type = 'checkbox';
    checkboxP.name = `presence-${seanceCount}-${index}`;
    checkboxP.value = 'P';

    const labelP = document.createElement('label');
    labelP.textContent = 'P';

    const checkboxA = document.createElement('input');
    checkboxA.type = 'checkbox';
    checkboxA.name = `absence-${seanceCount}-${index}`;
    checkboxA.value = 'A';

    const labelA = document.createElement('label');
    labelA.textContent = 'A';

    // Rendre les deux cases mutuellement exclusives
    checkboxP.addEventListener('change', () => {
      if (checkboxP.checked) checkboxA.checked = false;
	  mettreAJourCouleurLigne();
    });
    checkboxA.addEventListener('change', () => {
      if (checkboxA.checked) checkboxP.checked = false;
	  mettreAJourCouleurLigne();
    });

    td.appendChild(labelP);
    td.appendChild(checkboxP);
    td.appendChild(document.createTextNode(" "));
    td.appendChild(labelA);
    td.appendChild(checkboxA);
    row.appendChild(td);
  });
});





// Upload Courses -------------------------

// historique cour depose
let coursHistoriques = [];
//===Modifier le formulaire pour capturer le dépôt
const form = document.querySelector('.upload-form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const nomCours = document.getElementById('course-name').value.trim();
  const description = document.getElementById('course-description').value.trim();
  const classe = document.getElementById('course-group').value;
  const module = document.getElementById('module').value;
  const fichierInput = document.getElementById('course-file');
  const fichier = fichierInput.files[0] ? fichierInput.files[0].name : '';

  if (!nomCours || !classe || !module || !fichier) {
    alert("Merci de remplir tous les champs et choisir un fichier PDF.");
    return;
  }

  // Ajouter dans l'historique
  coursHistoriques.push({
    nom: nomCours,
    description: description,
    classe: classe,
    module: module,
    fichier: fichier,
    dateDepot: new Date().toLocaleDateString()
  });

  // Mettre à jour l'affichage
  afficherHistorique();

  // Reset formulaire
  form.reset();
  module.innerHTML = '<option value="">-- Module --</option>';
});

// ====Fonction pour afficher l’historique
function afficherHistorique() {
  const container = document.getElementById('history-courses');
  container.innerHTML = '<h2>Historique des cours déposés</h2>'; // Reset contenu

  // Regrouper par classe
  const groupes = {};

  coursHistoriques.forEach(cours => {
    if (!groupes[cours.classe]) groupes[cours.classe] = {};
    if (!groupes[cours.classe][cours.module]) groupes[cours.classe][cours.module] = [];
    groupes[cours.classe][cours.module].push(cours);
  });

  // Générer HTML
  for (const classe in groupes) {
    const classCard = document.createElement('div');
    classCard.className = 'class-card';

    const titreClasse = document.createElement('h3');
    titreClasse.textContent = classe;
    classCard.appendChild(titreClasse);

    const moduleList = document.createElement('div');
    moduleList.className = 'module-list';

    for (const module in groupes[classe]) {
      const moduleItem = document.createElement('div');
      moduleItem.className = 'module-item';

      const moduleTitle = document.createElement('h4');
      moduleTitle.className = 'module-title';
      moduleTitle.textContent = `${module} (${groupes[classe][module].length} cours)`;
      moduleItem.appendChild(moduleTitle);

      const courseList = document.createElement('ul');
      courseList.className = 'course-list';
      courseList.style.display = 'none';

      groupes[classe][module].forEach(cours => {
        const li = document.createElement('li');
        li.innerHTML = `
          <strong>Nom :</strong> ${cours.nom} <br>
          <strong>Description :</strong> ${cours.description || '-'} <br>
          <strong>Date de dépôt :</strong> ${cours.dateDepot} <br>
          <strong>Fichier :</strong> ${cours.fichier}
        `;
        courseList.appendChild(li);
      });

      moduleItem.appendChild(courseList);
      moduleList.appendChild(moduleItem);
    }

    classCard.appendChild(moduleList);
    container.appendChild(classCard);
  }

  // Activer le toggle sur les titres de module
  document.querySelectorAll('.module-title').forEach(title => {
    title.onclick = () => {
      const list = title.nextElementSibling;
      list.style.display = (list.style.display === 'none') ? 'block' : 'none';
    };
  });
}


document.addEventListener("DOMContentLoaded", () => {
	const classeSelect = document.getElementById("course-group");
	const moduleSelect = document.getElementById("module");
  
	const modulesParClasse = {
	  "M1 SI": [
		"LES fondements de l'analyse empirique",
		"Introduction à Excel et à VBA",
		"LE financement de la protection sociale",
		"La gestion des risques",
		"Economie publique",
		"Socio-économie de la protection sociale",
		"Anglais générale",
		"Arabe générale",
		"L'analyse comparative de la protection sociale",
		"L'analyse qualitative de la protection sociale",
		"Modélisation et budgétisation sociale",
		"Application d'un projet de protection sociale",
		"Méthodologie de recherche (1)",
		"Administration de la protection sociale et mise en œuvre des politiques de protection sociale",
		"communication",
		"Anglais technique",
		"Arabe technique"
	  ],
	  "M1 Mng": [ // même que M1 SI
		"LES fondements de l'analyse empirique",
		"Introduction à Excel et à VBA",
		"LE financement de la protection sociale",
		"La gestion des risques",
		"Economie publique",
		"Socio-économie de la protection sociale",
		"Anglais générale",
		"Arabe générale",
		"L'analyse comparative de la protection sociale",
		"L'analyse qualitative de la protection sociale",
		"Modélisation et budgétisation sociale",
		"Application d'un projet de protection sociale",
		"Méthodologie de recherche (1)",
		"Administration de la protection sociale et mise en œuvre des politiques de protection sociale",
		"communication",
		"Anglais technique",
		"Arabe technique"
	  ],
	  "M1 Act": [ // même que M1 SI
		"LES fondements de l'analyse empirique",
		"Introduction à Excel et à VBA",
		"LE financement de la protection sociale",
		"La gestion des risques",
		"Economie publique",
		"Socio-économie de la protection sociale",
		"Anglais générale",
		"Arabe générale",
		"L'analyse comparative de la protection sociale",
		"L'analyse qualitative de la protection sociale",
		"Modélisation et budgétisation sociale",
		"Application d'un projet de protection sociale",
		"Méthodologie de recherche (1)",
		"Administration de la protection sociale et mise en œuvre des politiques de protection sociale",
		"communication",
		"Anglais technique",
		"Arabe technique"
	  ],
	  "M2 Mng": [
		"Les organisations de la protection sociale.",
		"Théories du management stratégique Appliquées à la protection sociale.",
		"Le management stratégique des ressources financières De la protection sociale.",
		"Management opérationnel des risques Court et long terme de la protection sociale.",
		"Méthodologie de recherche (2).",
		"Gestion de projet.",
		"La politique de communication pour la Promotion de la culture de la protection sociale."
	  ],
	  "M2 SI": [
		"Architecture des systèmes d'information (S.I) des différentes branches de la protection sociale.",
		"Les systèmes d'information complémentaires",
		"Gestion opérationnelles des S.I des branches de la protection sociale.",
		"Informatique Décisionnelle.",
		"Les systèmes d'information comme Outils de la gouvernance de la protection sociale."
	  ],
	  "M2 Act": [
		"Mathématique actuarielles",
		"Théorie des risques",
		"Méthodes statistiques appliquées en actuariat",
		"Outils informatiques de calcul pour les actuaires",
		"Evaluation actuarielle en assurance santé, assurance vie Et risques professionnels",
		"Modélisation actuarielle en matière de prestation sociales.",
		"Comptabilité financière -SCF"
	  ],
	  "M1 Droit": [
		"Histoire et fondement de la protection sociale",
		"Sources du droit de la protection sociale",
		"La gouvernance de la protection sociale",
		"Environnement de la protection sociale",
		"Analyse comparative de la protection sociale",
		"Notion de gestion comptable et d'actuariat de la protection sociale",
		"Système de financement de protection sociale",
		"Economie publique",
		"informatique",
		"Anglais générale"
	  ],
	  "M2 Droit": [
		"Droit de la sécurité sociale",
		"Droit social international",
		"Notion de droit du travail",
		"Droit de la protection sociale complémentaire",
		"Droit comparé de la protection sociale internationale et africaine",
		"Notion de droit sanitaire",
		"Dialogue sociale",
		"Notion d'informatique",
		"Anglais technique"
	  ]
	};
  
	classeSelect.addEventListener("change", () => {
	  const selectedClasse = classeSelect.value;
	  const modules = modulesParClasse[selectedClasse] || [];
  
	  moduleSelect.innerHTML = '<option value="">-- Module --</option>';
	  modules.forEach(module => {
		const option = document.createElement("option");
		option.value = module;
		option.textContent = module;
		moduleSelect.appendChild(option);
	  });
	});
  });

  // save dans localStorage
  // Sauvegarde après ajout
localStorage.setItem('coursHistoriques', JSON.stringify(coursHistoriques));

// Au chargement de la page, récupérer
window.addEventListener('load', () => {
  const data = localStorage.getItem('coursHistoriques');
  if (data) {
    coursHistoriques = JSON.parse(data);
    afficherHistorique();
  }
});





// Enter Grades -----------------------

//const niveauSelect = document.getElementById("niveau-select");
const classeSelect = document.getElementById("classe-select");
const moduleSelect = document.getElementById("module-select");
const gradesBody = document.getElementById("grades-body");




document.addEventListener("DOMContentLoaded", () => {
	const classeSelect = document.getElementById("classe-select");
	const moduleSelect = document.getElementById("module-select");
  
	const modulesParClasse = {
	  "M1 SI": [
		"LES fondements de l'analyse empirique",
		"Introduction à Excel et à VBA",
		"LE financement de la protection sociale",
		"La gestion des risques",
		"Economie publique",
		"Socio-économie de la protection sociale",
		"Anglais générale",
		"Arabe générale",
		"L'analyse comparative de la protection sociale",
		"L'analyse qualitative de la protection sociale",
		"Modélisation et budgétisation sociale",
		"Application d'un projet de protection sociale",
		"Méthodologie de recherche (1)",
		"Administration de la protection sociale et mise en œuvre des politiques de protection sociale",
		"communication",
		"Anglais technique",
		"Arabe technique"
	  ],
	  "M1 Mng": [ // même que M1 SI
		"LES fondements de l'analyse empirique",
		"Introduction à Excel et à VBA",
		"LE financement de la protection sociale",
		"La gestion des risques",
		"Economie publique",
		"Socio-économie de la protection sociale",
		"Anglais générale",
		"Arabe générale",
		"L'analyse comparative de la protection sociale",
		"L'analyse qualitative de la protection sociale",
		"Modélisation et budgétisation sociale",
		"Application d'un projet de protection sociale",
		"Méthodologie de recherche (1)",
		"Administration de la protection sociale et mise en œuvre des politiques de protection sociale",
		"communication",
		"Anglais technique",
		"Arabe technique"
	  ],
	  "M1 Act": [ // même que M1 SI
		"LES fondements de l'analyse empirique",
		"Introduction à Excel et à VBA",
		"LE financement de la protection sociale",
		"La gestion des risques",
		"Economie publique",
		"Socio-économie de la protection sociale",
		"Anglais générale",
		"Arabe générale",
		"L'analyse comparative de la protection sociale",
		"L'analyse qualitative de la protection sociale",
		"Modélisation et budgétisation sociale",
		"Application d'un projet de protection sociale",
		"Méthodologie de recherche (1)",
		"Administration de la protection sociale et mise en œuvre des politiques de protection sociale",
		"communication",
		"Anglais technique",
		"Arabe technique"
	  ],
	  "M2 Mng": [
		"Les organisations de la protection sociale.",
		"Théories du management stratégique Appliquées à la protection sociale.",
		"Le management stratégique des ressources financières De la protection sociale.",
		"Management opérationnel des risques Court et long terme de la protection sociale.",
		"Méthodologie de recherche (2).",
		"Gestion de projet.",
		"La politique de communication pour la Promotion de la culture de la protection sociale."
	  ],
	  "M2 SI": [
		"Architecture des systèmes d'information (S.I) des différentes branches de la protection sociale.",
		"Les systèmes d'information complémentaires",
		"Gestion opérationnelles des S.I des branches de la protection sociale.",
		"Informatique Décisionnelle.",
		"Les systèmes d'information comme Outils de la gouvernance de la protection sociale."
	  ],
	  "M2 Act": [
		"Mathématique actuarielles",
		"Théorie des risques",
		"Méthodes statistiques appliquées en actuariat",
		"Outils informatiques de calcul pour les actuaires",
		"Evaluation actuarielle en assurance santé, assurance vie Et risques professionnels",
		"Modélisation actuarielle en matière de prestation sociales.",
		"Comptabilité financière -SCF"
	  ],
	  "M1 Droit": [
		"Histoire et fondement de la protection sociale",
		"Sources du droit de la protection sociale",
		"La gouvernance de la protection sociale",
		"Environnement de la protection sociale",
		"Analyse comparative de la protection sociale",
		"Notion de gestion comptable et d'actuariat de la protection sociale",
		"Système de financement de protection sociale",
		"Economie publique",
		"informatique",
		"Anglais générale"
	  ],
	  "M2 Droit": [
		"Droit de la sécurité sociale",
		"Droit social international",
		"Notion de droit du travail",
		"Droit de la protection sociale complémentaire",
		"Droit comparé de la protection sociale internationale et africaine",
		"Notion de droit sanitaire",
		"Dialogue sociale",
		"Notion d'informatique",
		"Anglais technique"
	  ]
	};
  
	classeSelect.addEventListener("change", () => {
	  const selectedClasse = classeSelect.value;
	  const modules = modulesParClasse[selectedClasse] || [];
  
	  moduleSelect.innerHTML = '<option value="">-- Module --</option>';
	  modules.forEach(module => {
		const option = document.createElement("option");
		option.value = module;
		option.textContent = module;
		moduleSelect.appendChild(option);
	  });
	});
  });
  
//////////////////////////////

const etudiants = ["Amel Bensalem", "Karim Haddad", "Lina Bouzid", "Sofiane Messaoudi", "Nour El Houda"];

[ classeSelect, moduleSelect].forEach(select => {
  select.addEventListener("change", afficherEtudiantsAvecNotes);
});

function afficherEtudiantsAvecNotes() {
  if ( !classeSelect.value || !moduleSelect.value) {
    gradesBody.innerHTML = "";
    return;
  }

  gradesBody.innerHTML = "";
  etudiants.forEach(nom => {
    const tr = document.createElement("tr");

    const tdNom = document.createElement("td");
    tdNom.textContent = nom;

    const tdCC = document.createElement("td");
    const inputCC = document.createElement("input");
    inputCC.type = "number";
    inputCC.min = 0;
    inputCC.max = 20;
    inputCC.className = "w-20 p-1 text-center border rounded";
    inputCC.addEventListener("input", calculerMoyenne);
    tdCC.appendChild(inputCC);

    const tdExamen = document.createElement("td");
    const inputExamen = document.createElement("input");
    inputExamen.type = "number";
    inputExamen.min = 0;
    inputExamen.max = 20;
    inputExamen.className = "w-20 p-1 text-center border rounded";
    inputExamen.addEventListener("input", calculerMoyenne);
    tdExamen.appendChild(inputExamen);

    const tdMoyenne = document.createElement("td");
    tdMoyenne.className = "moyenne";

    tr.appendChild(tdNom);
    tr.appendChild(tdCC);
    tr.appendChild(tdExamen);
    tr.appendChild(tdMoyenne);

    gradesBody.appendChild(tr);
  });
}

function calculerMoyenne(e) {
  const row = e.target.closest("tr");
  const cc = parseFloat(row.cells[1].querySelector("input").value) || 0;
  const examen = parseFloat(row.cells[2].querySelector("input").value) || 0;
  const moyenne = ((cc + examen * 2) / 3).toFixed(2);
  row.querySelector(".moyenne").textContent = isNaN(moyenne) ? "" : moyenne;
}

//Récupère les données de toutes les lignes du tableau.
function enregistrerNotes() {
	const lignes = gradesBody.querySelectorAll("tr");
	const notes = [];
  
	lignes.forEach(ligne => {
	  const nomEtudiant = ligne.cells[0].textContent.trim(); // daya-id attribute
	  const cc = parseFloat(ligne.cells[1].querySelector("input").value) || 0;
	  const examen = parseFloat(ligne.cells[2].querySelector("input").value) || 0;
	  const moyenne = parseFloat(ligne.cells[3].textContent) || 0;
  
	  notes.push({
		nom: nomEtudiant,
		noteCC: cc,
		noteExamen: examen,
		moyenne: moyenne
	  });
	});
  
	// Affichage pour test
	console.log("Notes enregistrées :", notes);
  
	// Ici tu peux ensuite envoyer `notes` vers ton backend si besoin
  }
  


// notification ---------------------

//function envoyerNotification() {
    //const specialite = document.getElementById("notif-specialite").value;
   // const annee = document.getElementById("notif-annee").value;
   // const message = document.getElementById("notif-message").value.trim();

    //if (!specialite || !annee || !message) {
     // alert("Veuillez remplir tous les champs !");
      //return;
    //}

    //const notification = {
     // specialite,
     // annee,
     // message,
     // date: new Date().toLocaleString()
   // };

    // Sauvegarde dans localStorage

   // const oldData = JSON.parse(localStorage.getItem("notifications") || "[]");
    //oldData.push(notification);
    //localStorage.setItem("notifications", JSON.stringify(oldData));

    //document.getElementById("notif-specialite").value = "";
    //document.getElementById("notif-annee").value = "";
   // document.getElementById("notif-message").value = "";

    //afficherNotifications();
  //}

  //function afficherNotifications() {
   // const container = document.getElementById("notifications-container");
   // container.innerHTML = "";
    //const notifications = JSON.parse(localStorage.getItem("notifications") || "[]");

    //notifications.reverse().forEach(notif => {
     // const card = document.createElement("div");
      //card.style.background = "#f1f5f9";
      //card.style.padding = "15px";
      //card.style.borderRadius = "10px";
      //card.style.boxShadow = "0 2px 6px rgba(0,0,0,0.1)";

     // card.innerHTML = `
      //  <h4 style="color: #1d4ed8;">${notif.specialite} - ${notif.annee}</h4>
       // <p style="margin: 10px 0;">${notif.message}</p>
       // <small style="color: #6b7280;">📅 ${notif.date}</small>
     // `;
      //container.appendChild(card);
   // });
 // }

  // Affichage auto au chargement
 // afficherNotifications();


// Logout handler ============================

// Logout handler avec délégation
document.addEventListener('click', function (e) {
	const logoutBtn = e.target.closest('.logout');
	if (logoutBtn) {
	  e.preventDefault();
		
	  // Optionnel : confirmation
	  if (confirm("Voulez-vous vraiment vous déconnecter ?")) {
		
		window.location.href = '/logout'; // ajuste le chemin si besoin
	  }
	}
  });
  


  //Schedule section========================

  const jours = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi"];
  const heures = ["08:00 - 09:30", "09:30 - 11:00", "11:00 - 12:30", "12:30 - 14:00", "14:00 - 15:30", "15:30 - 17:00"];

  const planningTable = document.getElementById("planningTable");
  const planningContainer = document.getElementById("planningTableContainer");

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
generateTable();
planningContainer.style.display = "block";




// Communication Section ==========================
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




// Fiche de voeux==========================================

 // Ajouter un champ module supplémentaire
  function addModule() {
  const container = document.getElementById('modules-container');
  const div = document.createElement('div');
  div.classList.add('module-choice');

  div.innerHTML = `
    <label>Classe:
      <select class="classe-select" onchange="loadModules(this)">
        <option value="">--Choisir une classe--</option>
        <option value="M1 Droit">M1 Droit</option>
        <option value="M2 SI">M2 SI</option>
        <option value="M2 Actuariat">M2 Actuariat</option>
      </select>
    </label>
    <label>Module:
      <select class="module-select" onchange="loadModuleDetails(this)">
        <option value="">--Choisir un module--</option>
      </select>
    </label>
    <label>Préférence:
      <input type="number" min="1" max="7" name="preference[]">
    </label>
    <div class="module-details" style="display:none;"></div>
  `;

  container.appendChild(div);
}


  // Gérer la soumission
  document.getElementById('voeuxForm').addEventListener('submit', function(e) {
    e.preventDefault();

	 const prefErrors = hasInvalidPreferences();
	 if (prefErrors) {
		alert("Erreur dans les préférences :\n" + prefErrors.join("\n"));
		return;
      }
    alert("Fiche de vœux soumise avec succès !");

    // Ici, ajouter le stockage local ou envoi à la base de données via API
  });



//suppression des doublons de modules

 function updateAvailableModules() {
  const allSelects = document.querySelectorAll('.module-select');
  const selectedValues = [];

  // Étape 1 : récupérer toutes les valeurs sélectionnées (sauf les vides)
  allSelects.forEach(select => {
    const val = select.value;
    if (val) selectedValues.push(val);
  });

  // Étape 2 : pour chaque liste, désactiver les options déjà prises dans les autres
  allSelects.forEach(currentSelect => {
    const currentValue = currentSelect.value;

    Array.from(currentSelect.options).forEach(option => {
      if (option.value === "") return; // ignorer l'option vide
      option.disabled = selectedValues.includes(option.value) && option.value !== currentValue;
    });
  });
}


  // les fonctions JS de remplissage dynamique

   const modulesParClasse = {
    "M1 Droit": [
      { id: 1, nom: "Droit de la PS" },
      { id: 2, nom: "Droit du travail" }
    ],
    "M2 SI": [
      { id: 3, nom: "Informatique décisionnelle" },
      { id: 4, nom: "Architecture des SI" }
    ]
  };

  const moduleDetails = {
    1: { semestre: "S1", cours: 3, td: 1.5, tp: 0 },
    2: { semestre: "S2", cours: 1.5, td: 1.5, tp: 0 },
    3: { semestre: "S3", cours: 3, td: 1.5, tp: 1.5 },
    4: { semestre: "S3", cours: 3, td: 1.5, tp: 0 }
  };

  function addModule() {
    const container = document.getElementById('modules-container');
    const div = document.createElement('div');
    div.classList.add('module-choice');

    div.innerHTML = `
      <label>Classe :
        <select class="classe-select">
          <option value="">-- Choisir une classe --</option>
          ${Object.keys(modulesParClasse).map(c =>
            `<option value="${c}">${c}</option>`).join('')}
        </select>
      </label>

      <label>Module :
        <select class="module-select">
          <option value="">-- Choisir un module --</option>
        </select>
      </label>

      <label>Préférence :
        <input type="number" name="preference[]" min="1" max="7">
      </label>

      <div class="module-details"></div>
    `;

    container.appendChild(div);

    const classeSelect = div.querySelector('.classe-select');
    const moduleSelect = div.querySelector('.module-select');
    const detailsDiv = div.querySelector('.module-details');

    classeSelect.addEventListener('change', () => {
      const selectedClasse = classeSelect.value;
      moduleSelect.innerHTML = '<option value="">-- Choisir un module --</option>';

      if (modulesParClasse[selectedClasse]) {
        modulesParClasse[selectedClasse].forEach(mod => {
          const opt = document.createElement('option');
          opt.value = mod.id;
          opt.textContent = mod.nom;
          moduleSelect.appendChild(opt);
        });
      }

      // reset details
      detailsDiv.style.display = "none";
      detailsDiv.innerHTML = '';

	  updateAvailableModules();
    });

    moduleSelect.addEventListener('change', () => {
      const modId = parseInt(moduleSelect.value);
      const data = moduleDetails[modId];
      if (data) {
        const total = data.cours + data.td + data.tp;
        detailsDiv.innerHTML = `
          📅 <strong>Semestre :</strong> ${data.semestre}<br>
          ⏱️ <strong>Cours : </strong> ${data.cours}H, <strong> TD : </strong> ${data.td}H, <strong> TP : </strong> ${data.tp}H<br>
          🧮 <strong>Total :</strong> ${total} H / sem
        `;
        detailsDiv.style.display = "block";
      } else {
        detailsDiv.style.display = "none";
        detailsDiv.innerHTML = '';
      }

	    loadModuleDetails(moduleSelect);
		updateAvailableModules();
    });


  }

  // auto ajouter 1 bloc au démarrage
  window.onload = () => {
	loadVoeuxFromLocalStorage();
	if (document.querySelectorAll('.module-choice').length === 0) {
		addModule(); // si rien n'est sauvegardé, on en ajoute un
	}
};


  //fonction de vérification de préférences 
  function hasInvalidPreferences() {
  const inputs = document.querySelectorAll('input[name="preference[]"]');
  const values = [];
  let errors = [];

  inputs.forEach(input => {
    const val = parseInt(input.value);
    if (isNaN(val) || val < 1 || val > 7) {
      errors.push("Les préférences doivent être entre 1 et 7.");
    } else {
      if (values.includes(val)) {
        errors.push(`La préférence ${val} est utilisée plusieurs fois.`);
      }
      values.push(val);
    }
  });
  return errors.length > 0 ? errors : null;
  }

  // Fonction de sauvegarde
  function saveVoeuxToLocalStorage() {
  const blocks = document.querySelectorAll('.module-choice');
  const voeuxData = [];

  blocks.forEach(block => {
    const classe = block.querySelector('.classe-select')?.value || '';
    const module = block.querySelector('.module-select')?.value || '';
    const preference = block.querySelector('input[name="preference[]"]')?.value || '';
    voeuxData.push({ classe, module, preference });
  });

  const prefs = {
    jours: document.querySelector('input[name="jours"]')?.value || '',
    jours_eviter: document.querySelector('input[name="jours_eviter"]')?.value || '',
    horaire: document.querySelector('select[name="horaire"]')?.value || '',
    hs: document.querySelector('select[name="hs"]')?.value || '',
    raison: document.querySelector('input[name="raison"]')?.value || ''
  };

  localStorage.setItem('fiche_voeux_data', JSON.stringify({ voeuxData, prefs }));
}
// fonction de rechargement au démarrage
function loadVoeuxFromLocalStorage() {
  const data = localStorage.getItem('fiche_voeux_data');
  if (!data) return;

  const { voeuxData, prefs } = JSON.parse(data);

  voeuxData.forEach(entry => {
    addModule(); // crée le bloc vide
    const last = document.querySelectorAll('.module-choice');
    const block = last[last.length - 1];

    const classeSelect = block.querySelector('.classe-select');
    classeSelect.value = entry.classe;
    loadModules(classeSelect); // met à jour les modules

    const moduleSelect = block.querySelector('.module-select');
    setTimeout(() => {
      moduleSelect.value = entry.module;
      loadModuleDetails(moduleSelect);
      updateAvailableModules(); // mise à jour des doublons
    }, 100); // petit délai pour laisser les <option> charger
    block.querySelector('input[name="preference[]"]').value = entry.preference;
  });

  document.querySelector('input[name="jours"]').value = prefs.jours || '';
  document.querySelector('input[name="jours_eviter"]').value = prefs.jours_eviter || '';
  document.querySelector('select[name="horaire"]').value = prefs.horaire || '';
  document.querySelector('select[name="hs"]').value = prefs.hs || '';
  document.querySelector('input[name="raison"]').value = prefs.raison || '';
}

document.addEventListener('input', saveVoeuxToLocalStorage);
document.addEventListener('change', saveVoeuxToLocalStorage);

// bouton pour réinitialiser
function resetVoeux() {
  if (confirm("Voulez-vous vraiment effacer la fiche enregistrée ?")) {
    localStorage.removeItem('fiche_voeux_data');
    location.reload();
  }
}
/*
// Télécharger la fiche en PDF
function downloadPDF() {
  const element = document.getElementById('voeux-pdf-content');
  const opt = {
    margin:       0.5,
    filename:     'fiche_voeux_enseignant.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2 },
    jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
  };

  html2pdf().set(opt).from(element).save();
}
*/

// générer un PDF propre

function generatePDF() {
  // Duplique dynamiquement les données saisies
  const displayContainer = document.getElementById('voeuxFormPrintable');
  displayContainer.innerHTML = '';

  const blocks = document.querySelectorAll('.module-choice');
  blocks.forEach((block, i) => {
    const classe = block.querySelector('.classe-select')?.value || '-';
    const moduleText = block.querySelector('.module-select')?.selectedOptions[0]?.text || '-';
    const pref = block.querySelector('input[name="preference[]"]')?.value || '-';

    const details = block.querySelector('.module-details')?.innerHTML || '';

    const blocHTML = `
      <div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 10px;">
        <strong>Choix ${i + 1}</strong><br>
        📘 Classe : ${classe}<br>
        📚 Module : ${moduleText}<br>
        ⭐ Préférence : ${pref}<br>
        ${details}
      </div>
    `;

    displayContainer.innerHTML += blocHTML;
  });

  // Infos de préférence
  const jours = document.querySelector('input[name="jours"]').value;
  const jours_eviter = document.querySelector('input[name="jours_eviter"]').value;
  const horaire = document.querySelector('select[name="horaire"]').value;
  const hs = document.querySelector('select[name="hs"]').value;
  const raison = document.querySelector('input[name="raison"]').value;

  displayContainer.innerHTML += `
    <h3>Préférences générales</h3>
    <p>Jours préférés : ${jours || '-'}</p>
    <p>Jours à éviter : ${jours_eviter || '-'}</p>
    <p>Préférence horaire : ${horaire || '-'}</p>
    <p>Heures supplémentaires : ${hs === 'oui' ? 'Accepte' : 'N’accepte pas'}</p>
    <p>Raison : ${raison || '-'}</p>
  `;

  document.getElementById('pdf-signature-date').textContent = new Date().toLocaleDateString();
  
  // Génération PDF
  const element = document.getElementById('voeux-pdf-content');

  const opt = {
    margin: 0.5,
    filename: 'fiche_voeux_enseignant.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
  };

  	//Intégrer la signature dans le PDF 
    const signatureImage = canvas.toDataURL(); // image PNG de la signature
	const signatureHTML = `
	<div style="margin-top: 30px;">
		<p><strong>Signature :</strong></p>
		<img src="${signatureImage}" alt="Signature" style="width: 200px; border: 1px solid #ccc;">
	</div>
	`;

	document.getElementById('voeuxFormPrintable').innerHTML += signatureHTML;

  html2pdf().set(opt).from(element).save();
}

// signature electronique 
const canvas = document.getElementById('signature-pad');
const cntx = canvas.getContext('2d');
let isDrawing = false;

canvas.addEventListener('mousedown', () => { isDrawing = true; cntx.beginPath(); });
canvas.addEventListener('mouseup', () => { isDrawing = false; });
canvas.addEventListener('mouseleave', () => { isDrawing = false; });
canvas.addEventListener('mousemove', draw);

function draw(e) {
  if (!isDrawing) return;
  const rect = canvas.getBoundingClientRect();
  cntx.lineWidth = 2;
  cntx.lineCap = 'round';
  cntx.strokeStyle = '#000';
  cntx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
  cntx.stroke();
  cntx.beginPath();
  cntx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
}

function clearSignature() {
  cntx.clearRect(0, 0, canvas.width, canvas.height);
}
