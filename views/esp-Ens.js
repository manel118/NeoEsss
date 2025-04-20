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




// dashboard teacher -------------------------

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

// Boutons "Voir les étudiants"
document.querySelectorAll('.btn-view-students').forEach(button => {
	button.addEventListener('click', function () {
		const studentsList = this.nextElementSibling;
		if (studentsList.style.display === 'none') {
			studentsList.style.display = 'block';
			this.textContent = 'Masquer les étudiants';
		} else {
			studentsList.style.display = 'none';
			this.textContent = 'Voir les étudiants';
		}
	});
});


// Upload Courses -------------------------

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
	  const nomEtudiant = ligne.cells[0].textContent.trim();
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
		localStorage.clear();
		sessionStorage.clear();
		window.location.href = '../index/index.html'; // ajuste le chemin si besoin
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