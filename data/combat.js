//données recupéré dans data1.js
import { joueur, updateUI, gagneXPdirect, typesMobs, Loup, Gobelin, Ours, RatGeant, } from './data1.js';

let mobType;
let monstreActuel;
export function CHASSER() {
    console.log("debut de CHASSER");
    let resultat = "";

    // Sélectionnez un type de monstre aléatoire et créez une instance de celui-ci
    // Sélectionnez un type de monstre aléatoire et créez une instance de celui-ci
    let indexTypeAleatoire = Math.floor(Math.random() * typesMobs.length);
    mobType = typesMobs[indexTypeAleatoire];



    switch (mobType.nom) {
        case "Loup":
            monstreActuel = new Loup();
            break;
        case "Ours":
            monstreActuel = new Ours();
            break;
        case "Gobelin":
            monstreActuel = new Gobelin();
            break;
        case "RatGeant":
            monstreActuel = new RatGeant();
            break;
        default:
            throw new Error("Type de monstre non reconnu");
    }

    resultat += `Un ${mobType.nom} apparaît ! <br>`;
    document.getElementById("console").innerHTML = resultat;
    activerBoutons();
}

function actionForce() {
    let resultat = document.getElementById("console").innerHTML;
    let attaqueJoueur = Math.floor(Math.random() * joueur.statsAction.force) + 1;
    let defenseMob = Math.floor(Math.random() * monstreActuel.statsAction.force) + 1;
    if (attaqueJoueur > defenseMob) {
        resultat += `Le joueur inflige ${attaqueJoueur - defenseMob} dégâts au ${mobType.nom}.<br>`;
        monstreActuel.statsPrimaire.PV -= (attaqueJoueur - defenseMob);
    } else {
        resultat += `Le joueur rate son attaque.<br>`;
    }
    finDuTourJoueur(resultat);
}

function actionAgilite() {
    let resultat = document.getElementById("console").innerHTML;
    let esquiveJoueur = Math.floor(Math.random() * joueur.statsAction.agilité) + 1;
    let attaqueMob = Math.floor(Math.random() * monstreActuel.statsAction.force) + 1;
    console.log(monstreActuel.statsAction.force)
    if (esquiveJoueur > attaqueMob) {
        resultat += `Le joueur esquive avec succès et inflige ${attaqueMob} dégâts de riposte au ${mobType.nom}.<br>`;
        monstreActuel.statsPrimaire.PV -= attaqueMob;
    } else if (esquiveJoueur <= attaqueMob)
        resultat += `Le joueur n'arrive pas à esquiver et subit ${attaqueMob} dégâts de la part du ${mobType.nom}.<br>`;
    joueur.statsPrimaire.PV -= attaqueMob;
    finDuTourJoueur(resultat);
}

function actionEndurance() {
    let resultat = document.getElementById("console").innerHTML;
    let enduranceJoueur = Math.floor(Math.random() * joueur.statsAction.endurance) + 3;
    let attaqueMob = Math.floor(Math.random() * monstreActuel.statsAction.force) + 1;
    resultat += `Le joueur encaisse sans broncher et perd ${Math.floor(attaqueMob/Math.floor(enduranceJoueur/3))}.<br>`;
        joueur.statsPrimaire.PV -= Math.floor(attaqueMob/Math.floor(enduranceJoueur/2));

    finDuTourJoueur(resultat);
}


function finDuTourJoueur(resultat) {
    document.getElementById("console").innerHTML = resultat;
    desactiverBoutons();
    setTimeout(() => {
        verifierFinDuCombat();
        if (monstreActuel.statsPrimaire.PV > 0) {  // Si le mob est toujours en vie après le tour du joueur, le monstre joue
            tourDuMonstre();
        }
    }, 1000);
}

function tourDuMonstre() {

    let resultat = document.getElementById("console").innerHTML;

    let attaqueMob = Math.floor(Math.random() * monstreActuel.statsAction.force) + 1;
    let defenseJoueur = Math.floor(Math.random() * joueur.statsAction.force) + 1;

    if (attaqueMob > defenseJoueur) {
        joueur.statsPrimaire.PV -= (attaqueMob - defenseJoueur);
        resultat += `${mobType.nom} inflige ${attaqueMob - defenseJoueur} dégâts à ${joueur.pseudo}.<br>`;

    } else {
        resultat += `${mobType.nom} rate son attaque.<br>`;

        activerBoutons()

    }
    document.getElementById("console").innerHTML = resultat;
    updateUI()
    verifierFinDuCombat();

    if (joueur.statsPrimaire.PV > 0) { // Si le joueur est toujours en vie après le tour du monstre, activez les boutons
        activerBoutons();
    }
}

// Vous n'avez pas besoin de vérifier dernierJoueur dans verifierFinDuCombat :
function verifierFinDuCombat() {
    let resultat = document.getElementById("console").innerHTML;
    if (joueur.statsPrimaire.PV <= 0) {
        resultat += `${joueur.pseudo} a été vaincu.`;
        desactiverBoutons();
    } else if (monstreActuel.statsPrimaire.PV <= 0) {
        resultat += `${mobType.nom} a été vaincu.<br>`;
        document.getElementById("console").innerHTML = resultat;
        finDeLaChasse();
    }
}

function finDeLaChasse() {
    let resultat = document.getElementById("console").innerHTML;

    // Trouvez le type de mob actuel dans typesMobs
    const mobActuelType = typesMobs.find(type => type.nom === mobType.nom);

    // Calcul de l'expérience gagnée
    const experienceGagnee = mobActuelType.experience;
    gagneXPdirect(experienceGagnee);
    resultat += `Le joueur gagne ${experienceGagnee} points d'expérience.<br>`;

    // Gagner une ressource aléatoire
    const indexLootAleatoire = Math.floor(Math.random() * mobActuelType.loot.length);
    const ressourceAleatoire = mobActuelType.loot[indexLootAleatoire];

    if (ressourceAleatoire) {
        const ressourceExistante = joueur.inventaire.find(item => item.ressource === ressourceAleatoire);
        if (ressourceExistante) {
            ressourceExistante.quantite += 1;
            resultat += `Le joueur a gagné 1 ${ressourceExistante.nom} en récompense !<br>`;
        } else {
            joueur.inventaire.push({ ressource: ressourceAleatoire, nom: ressourceAleatoire.nom, quantite: 1 });
            resultat += `Le joueur a gagné 1 ${ressourceAleatoire.nom} en récompense !<br>`;
        }
    } else {
        resultat += "Le joueur n'a rien gagné en récompense.<br>";
    }

    document.getElementById("console").innerHTML = resultat;
    updateUI();
    monstreActuel.statsPrimaire.PV = monstreActuel.statsPrimaire.PVmax;
    console.log("Fin de CHASSER");
    updateUI()
}

function activerBoutons() {
    const boutons = document.querySelectorAll("#actions button");
    boutons.forEach(btn => btn.disabled = false);
}

function desactiverBoutons() {
    const boutons = document.querySelectorAll("#actions button");
    boutons.forEach(btn => btn.disabled = true);
}

document.getElementById("forceBtn").addEventListener("click", actionForce);
document.getElementById("agiliteBtn").addEventListener("click", actionAgilite);
document.getElementById("enduranceBtn").addEventListener("click", actionEndurance);
document.getElementById("intelligenceBtn").addEventListener("click", actionIntelligence);
document.getElementById("charismeBtn").addEventListener("click", actionCharisme);

document.getElementById("btnChasser").addEventListener("click", CHASSER);

updateUI()










function actionIntelligence() {
    let resultat = document.getElementById("console").innerHTML;
    let attaqueJoueur = Math.floor(Math.random() * joueur.statsAction.intelligence) + 1;
    let defenseMob = Math.floor(Math.random() * monstreActuel.statsAction.intelligence) + 1;

    if (attaqueJoueur > defenseMob) {
        resultat += `Le joueur, avec son intelligence, inflige ${attaqueJoueur - defenseMob} dégâts au ${mobType.nom}.<br>`;
        monstreActuel.statsPrimaire.PV -= (attaqueJoueur - defenseMob);
    } else {
        resultat += `Le joueur rate son attaque intelligente.<br>`;
    }

    finDuTourJoueur(resultat);
}

function actionCharisme() {
    let resultat = document.getElementById("console").innerHTML;
    let attaqueJoueur = Math.floor(Math.random() * joueur.statsAction.charisme) + 1;
    let defenseMob = Math.floor(Math.random() * monstreActuel.statsAction.charisme) + 1;

    if (attaqueJoueur > defenseMob) {
        resultat += `Le joueur, avec son charisme, inflige ${attaqueJoueur - defenseMob} dégâts au ${mobType.nom}.<br>`;
        monstreActuel.statsPrimaire.PV -= (attaqueJoueur - defenseMob);
    } else {
        resultat += `Le joueur rate son attaque charismatique.<br>`;
    }

    finDuTourJoueur(resultat);
}

