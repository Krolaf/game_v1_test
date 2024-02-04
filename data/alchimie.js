//données importées depuis data1.js
import { joueur, ressources,updateUI ,gagneXPalchimie} from './data1.js';



// fonction pour creer une potion

function melange(ingredients) {
    let f = {
        soin: 0,
        mana: 0,
        potentiel: 0,
    };

    // Calcul des statistiques de la potion en parcourant les ingrédients
    ingredients.forEach(ingredient => {
        f.soin += ingredient.soin;
        f.mana += ingredient.mana;
        f.potentiel += ingredient.potentiel;
    });

    // Crée la potion avec les statistiques calculées et l'ajoute à l'inventaire du joueur
    let potion = { ...f };
    joueur.inventaire.push(potion);

    // Appelle la fonction pour gagner de l'expérience en Alchimie avec la quantité appropriée
    // Calcul du montant d'expérience gagné en alchimie en fonction du niveau
    const experienceGagneeParNiveau = [80]; // Le premier niveau
    const multiplicateurExperience = 1.5; // Multiplicateur d'expérience
    let experienceActuelle = 80;

    for (let i = 1; i <= joueur.alchimie.lvlAlchimie; i++) {
        experienceActuelle *= multiplicateurExperience;
        experienceGagneeParNiveau.push(Math.floor(experienceActuelle));
    }

    const experienceGagneeAlchimie = experienceGagneeParNiveau[joueur.alchimie.lvlAlchimie];

    gagneXPalchimie(experienceGagneeAlchimie);
    updateUI();
}

const melangeButton = document.getElementById("melangeButton");

let ressourcesSelectionnees = []; // Tableau pour stocker les ingrédients sélectionnés

// Parcourir chaque ressource et ajouter un écouteur d'événement pour la sélection d'ingrédients
ressources.forEach(ressource => {
    const ressourceUnit = document.getElementById(ressource.id);

    ressourceUnit.addEventListener("click", () => {
        // Rechercher la ressource dans l'inventaire du joueur
        const ressourceDansInventaire = joueur.inventaire.find(item => item.ressource === ressource.data);

        if (ressourceDansInventaire && ressourceDansInventaire.quantite > 0) {
            ressourceDansInventaire.quantite--;

            // Vérifier si le nombre d'ingrédients sélectionnés est inférieur à 5
            if (ressourcesSelectionnees.length < 5) {
                ressourcesSelectionnees.push(ressource.data);
                ressourceUnit.classList.add("selection"); // Ajouter une classe pour indiquer la sélection visuelle
                ressourceUnit.style.display = "none"; // Masquer l'élément HTML de la ressource sélectionnée
            } else {
                alert(" déjà sélectionné 5 ingrédients. Mélangez-les avant de faire une nouvelle potion :)");
            }
        } else {
            alert("Vous n'avez pas cette ressource dans votre inventaire.");
        }
    });
});


// Mise en place du compte à rebours
// Récupérer l'élément HTML qui affiche le compte à rebours
const countdownElement = document.getElementById("countdown");

// Initialiser la variable du compte à rebours à 10 secondes
let countdown;
let countdownInterval; // Variable pour stocker l'intervalle du compte à rebours
let isMerging = false; // Variable de contrôle pour vérifier si un mélange est en cours
let lvlAlchimie = joueur.alchimie.lvlAlchimie; // Niveau d'alchimie du joueur

// Fonction pour mettre à jour le compte à rebours en fonction du niveau d'alchimie
function updateCountdown() {
    const minutes = Math.floor(countdown / 60); // Calculer les minutes en divisant par 60
    const seconds = countdown % 60; // Calculer les secondes restantes

    countdownElement.textContent = `Temps restant : ${minutes} minutes ${seconds} secondes`; // Mettre à jour le texte affiché
    countdown--;

    console.log(countdown); // Afficher le compte à rebours en secondes dans la console
}

// Ajout d'un écouteur d'événement au bouton de mélange
melangeButton.addEventListener("click", () => {
    if (!isMerging && ressourcesSelectionnees.length >= 2) {
        isMerging = true;
        if (lvlAlchimie == 0) {
            countdown = 2;
        } else if (lvlAlchimie == 1) {
            countdown = 10;
        } else if (lvlAlchimie == 2) {
            countdown = 8;
        } else if (lvlAlchimie == 3) {
            countdown = 6;
        } else if (lvlAlchimie == 4) {
            countdown = 4;
        } else if (lvlAlchimie == 5) {
            countdown = 2;
        }

        // Réinitialiser le compte à rebours à 10 secondes
        countdownElement.style.display = "inline"; // Afficher l'élément HTML du compte à rebours
        updateCountdown(); // Mettre à jour le compte à rebours
        countdownInterval = setInterval(() => {
            if (countdown >= 0) {
                updateCountdown(); // Mettre à jour le compte à rebours à chaque intervalle

            } else {
                clearInterval(countdownInterval); // Arrêter l'intervalle du compte à rebours
                countdownElement.style.display = "none"; // Masquer l'élément HTML du compte à rebours
                isMerging = false; // Réinitialiser la variable de contrôle du mélange

                melange(ressourcesSelectionnees); // Appeler la fonction de mélange avec les ingrédients sélectionnés
                console.log(joueur); // Afficher l'objet "joueur" dans la console

                // Réinitialiser les sélections d'ingrédients
                ressourcesSelectionnees.forEach(ingredient => {
                    const ressourceUnit = document.getElementById(ressources.find(r => r.data === ingredient).id);
                    ressourceUnit.classList.remove("selection"); // Retirer la classe visuelle de sélection
                    ressourceUnit.style.display = "block"; // Afficher l'élément HTML de la ressource
                });

                const nouvellePotion = joueur.inventaire[joueur.inventaire.length - 1]; // Dernière potion ajoutée à l'inventaire
                alert(" gagné une potion : " + nouvellePotion.nom + " (" + nouvellePotion.soin + " soin, " + nouvellePotion.mana + " mana, " + nouvellePotion.potentiel + " potentiel)");
                ressourcesSelectionnees = []; // Réinitialiser le tableau des ingrédients sélectionnés
            }
        }, 1000); // Interval d'une seconde
    } else if (isMerging) {
        alert("Un mélange est déjà en cours.");
    } else {
        alert("Sélectionnez au moins 2 ingrédients pour mélanger.");
    }
});
updateUI();
