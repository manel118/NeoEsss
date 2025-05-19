const express = require("express");
const router = express.Router();

/*
const genererMockDataDepuisMongo = require("../utils/genererMockData");

router.get("/:classeId/:yearId", async (req, res) => {
  const data = await genererMockDataDepuisMongo(req.params.classeId, req.params.yearId);
  res.json(data);
 });
*/

// Exemple de données fictives (supprimer cette partie pour tester la partie commente)
router.get("/:classeId/:yearId", (req, res) => {
  const mockData = {
    semestres: {
      S1: {
        ue: {
          UEF: {
            nom: "UEF",
            coeff: 6,
            credit: 12,
            matieres: [
              { id: "m1", nom: "Maths", coeff: 3, credit: 6 },
              { id: "m2", nom: "Algo", coeff: 3, credit: 6 }
            ]
          }
        },
        etudiants: [
          {
            id: "e1",
            nom: "Benali Sarah",
            evaluations: {
              m1: { cc: 14, examen: 16, moyenne: 15 },
              m2: { cc: 10, examen: 12, moyenne: 11 }
            }
          },
          {
            id: "e2",
            nom: "Kaci Mourad",
            evaluations: {
              m1: { cc: 8, examen: 10, moyenne: 9 },
              m2: { cc: 12, examen: 14, moyenne: 13 }
            }
          }
        ]
      },
      S2: {
        ue: {
          UEM: {
            nom: "UEM",
            coeff: 4,
            credit: 8,
            matieres: [
              { id: "m3", nom: "Reseaux", coeff: 2, credit: 4 },
              { id: "m4", nom: "Web", coeff: 2, credit: 4 }
            ]
          }
        },
        etudiants: [
          {
            id: "e1",
            nom: "Benali Sarah",
            evaluations: {
              m3: { cc: 15, examen: 15, moyenne: 15 },
              m4: { cc: 14, examen: 16, moyenne: 15 }
            }
          },
          {
            id: "e2",
            nom: "Kaci Mourad",
            evaluations: {
              m3: { cc: 11, examen: 10, moyenne: 10.5 },
              m4: { cc: 9, examen: 12, moyenne: 10.5 }
            }
          }
        ]
      }
    }
  };

  res.json(mockData);
});

module.exports = router;
