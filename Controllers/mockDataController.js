
//Fonction de génération genererMockDataDepuisMongo
const Student = require("./Models/StudantModel");
const Evaluation = require("./Models/EvaluationModel"); // attention : c’est bien le modèle d’évaluation
const Matiere = require("./Models/MatiéreModel");

async function genererMockDataDepuisMongo(classeId, academicYearId) {
  const students = await Student.find({ classe: classeId, academicYear: academicYearId });

  const semestres = { S1: { ue: {}, etudiants: [] }, S2: { ue: {}, etudiants: [] } };

  for (const semestre of ["S1", "S2"]) {
    // Étape 1 : Charger toutes les matières de ce semestre
    const matieres = await Matiere.find({ classe: classeId, semestre });
    const matieresMap = {};
    matieres.forEach((m) => {
      matieresMap[m._id] = m;

      // Organiser les matières par UE
      const ueNom = m.unité;
      if (!semestres[semestre].ue[ueNom]) {
        semestres[semestre].ue[ueNom] = {
          nom: ueNom,
          coeff: 0,
          credit: 0,
          matieres: [],
        };
      }
      semestres[semestre].ue[ueNom].matieres.push({
        id: m._id,
        nom: m.nom,
        coeff: m.coeff,
        credit: m.crédit,
      });
      semestres[semestre].ue[ueNom].coeff += m.coeff;
      semestres[semestre].ue[ueNom].credit += m.crédit;
    });

    // Étape 2 : Construire les données des étudiants
    for (const student of students) {
      const evaluations = await Evaluation.find({
        etudiant: student._id,
        academicYear: academicYearId,
        matiere: { $in: matieres.map((m) => m._id) },
      }).populate("matiere");

      const evalsParMatiere = {};
      evaluations.forEach((e) => {
        evalsParMatiere[e.matiere._id] = {
          cc: e.cc,
          examen: e.examen,
          moyenne: e.moyenne,
        };
      });

      semestres[semestre].etudiants.push({
        id: student._id,
        nom: `${student.nom} ${student.prenom}`,
        evaluations: evalsParMatiere,
      });
    }
  }

  return { semestres };
}