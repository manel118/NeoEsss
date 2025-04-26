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





// Graphique de progression de l'étudiant
const ctx = document.getElementById('progressChart').getContext('2d');
const progressChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Mathematics', 'Science', 'History'], // Cours
        datasets: [{
            label: 'Progress (%)',
            data: [15, 13, 19], // Progrès dans chaque matière
            backgroundColor: 'rgba(75, 192, 192, 0.6)', // Couleur des barres
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                max: 20
            }
        }
    }
});


// Utilitaire pour afficher une seule section et cacher les autres
function showSection(sectionIdToShow) {
	const allSections = ["dashboard-section", "my-courses", "my-grades", "schedule", "requests", "notification"];
	allSections.forEach(id => {
		const section = document.getElementById(id);
		if (section) {
			section.style.display = (id === sectionIdToShow) ? "block" : "none";
		}
	});
}

// Associer chaque bouton à sa section
document.getElementById("btn-dashboard").addEventListener("click", function(e) {
	e.preventDefault();
	showSection("dashboard-section");
});

document.getElementById("btn-my-courses").addEventListener("click", function(e) {
	e.preventDefault();
	showSection("my-courses");
});

document.getElementById("btn-my-grades").addEventListener("click", function(e) {
	e.preventDefault();
	showSection("my-grades");
});

document.getElementById("btn-schedule").addEventListener("click", function(e) {
	e.preventDefault();
	showSection("schedule");
});

document.getElementById("btn-requests").addEventListener("click", function(e) {
	e.preventDefault();
	showSection("requests");
});

document.getElementById("btn-notification").addEventListener("click", function(e) {
	e.preventDefault();
	showSection("notification");
});




// My Courses


//fetch("/api/etudiant/cours")
	//.then(res => res.json())
	//.then(data => {
	//	const tbody = document.getElementById("course-list");
	//	tbody.innerHTML = "";
	//	data.forEach(cours => {
	//		tbody.innerHTML += `
	//			<tr>
	//				<td>${cours.nom}</td>
	//				<td>${cours.enseignant}</td>
	//				<td>${cours.dateDepot}</td>
	//				<td><a href="${cours.fichier}" class="btn-download" target="_blank">📥 Télécharger</a></td>
	//			</tr>`;
	//	});
	//})

    //.catch(error => {
	//	console.error("Erreur lors de la récupération des cours :", error);
	//});




	// Exemple dynamique de données (tu pourras les récupérer via fetch + backend plus tard)
const courses = [
	{
		title: "Mathématiques",
		chapters: [
			{ title: "Chapitre 1 : Algèbre", date: "2025-03-01", pdf: "pdfs/algebre.pdf" },
			{ title: "Chapitre 2 : Analyse", date: "2025-03-15", pdf: "pdfs/analyse.pdf" }
		]
	},
	{
		title: "Informatique",
		chapters: [
			{ title: "Chapitre 1 : HTML & CSS", date: "2025-02-20", pdf: "pdfs/html_css.pdf" },
			{ title: "Chapitre 2 : JavaScript", date: "2025-03-05",pdf: "pdfs/javascript.pdf" },
			{ title: "Chapitre 3 : Node.js", date: "2025-03-25" , pdf: "pdfs/nodejs.pdf" }
		]
	}
];

// Fonction d'affichage dynamique
function renderCourses(courses) {
	const container = document.getElementById("courses-container");
	container.innerHTML = "";

	courses.forEach(course => {
		const card = document.createElement("div");
		card.className = "course-card";

		let html = `<h3>${course.title}</h3>`;
		html += `<table class="chapter-table">
	<thead>
		<tr>
			<th>Chapitre</th>
			<th>Date</th>
			<th>Téléchargement</th>
		</tr>
	</thead>
	<tbody>`;

	course.chapters.forEach(chap => {
		html += `<tr>
			<td>${chap.title}</td>
			<td>${chap.date}</td>
			<td>
				<a href="${chap.pdf}" download class="download-btn">Télécharger</a>
			</td>
		</tr>`;
	});

		html += `</tbody></table>`;
		card.innerHTML = html;
		container.appendChild(card);
	});
}



document.getElementById("btn-my-courses").addEventListener("click", (e) => {
	e.preventDefault();

	// Masquer toutes les sections
	document.querySelectorAll(".content-section").forEach(sec => {
		sec.style.display = "none";
	});

	// Afficher la section My Courses
	document.getElementById("my-courses").style.display = "block";

	// Afficher les cours dynamiquement
	renderCourses(courses);
});






// Schedule ============================

// Exemple de données d'emploi du temps
const scheduleData = [
    { day: "Dimanche", time: "08:00 - 09:30", module: "Mathématiques", teacher: "M. Dupont", class: "Salle A1" },
    { day: "Lundi", time: "08:00 - 09:30", module: "Informatique", teacher: "Mme Lefevre", class: "Salle B2" },
    { day: "Mardi", time: "09:30 - 11:00", module: "Physique", teacher: "M. Martin", class: "Salle C3" },
    { day: "Mercredi", time: "11:00 - 12:30", module: "Chimie", teacher: "Mme Curie", class: "Salle D4" },
    { day: "Jeudi", time: "12:30 - 14:00", module: "Biologie", teacher: "M. Dubois", class: "Salle E5" },
    // Ajouter plus de créneaux ici...
];

// Fonction pour insérer les créneaux dans le tableau
function renderSchedule(schedule) {
    // Parcours des données et ajout dans les bonnes cellules du tableau
    schedule.forEach(entry => {
        const cellId = `${entry.day.toLowerCase().slice(0, 3)}-${entry.time.split(":")[0]}`;
        const cell = document.getElementById(cellId);
        if (cell) {
            cell.innerHTML = `${entry.module}<br>${entry.teacher}<br>${entry.class}`;
        }
    });
}

// Appel de la fonction pour afficher l'emploi du temps
renderSchedule(scheduleData);



// log out ============================




