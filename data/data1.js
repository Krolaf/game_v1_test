// Dans un fichier "donnees.js"
export class Ressource {
    constructor(soin, mana, potentiel) {
        this.soin = soin;
        this.mana = mana;
        this.potentiel = potentiel;
    }
}

export const lavande = new Ressource(1, 2, 0);
export const poivre = new Ressource(2, -1, -1);
export const curcuma = new Ressource(0, 0, 4);

export let ressources = [
    { id: "lavande",nom:lavande, data: lavande },
    { id: "poivre", nom:poivre,data: poivre },
    { id: "curcuma", nom:curcuma,data: curcuma },
];

export const joueur = {
    pseudo: "krolaf",
    niveau: 1,
    experienceGlobale: 0,
    alchimie: {
        lvlAlchimie: 0,
        expAlchimie: 0,
    },
    statsPrimaire: {
        PV: 200,
        MANA: 100,
        fatigue:100,
        potentiel: 100,
        etat:"en forme",
    },
    statsAction: {
        force: 20,
        agilité: 20,
        endurance: 20,
        intelligence: 20,
        charisme: 20,
    },
    inventaire: [
        { ressource: lavande, nom: 'lavande', quantite: 400 },
        { ressource: poivre, nom: 'poivre', quantite: 450 },
        { ressource: curcuma, nom: 'curcuma', quantite: 300 },
    ],
};

//declarations des mob

export class mob {
    constructor() {
        this.statsPrimaire = {
            PV: 0,
            etat: 'en forme',
        };
        this.statsAction = {
            force: 0,
            agilité: 0,
            endurance: 0,
            intelligence: 0,
            charisme: 0
        };
    }
    genererStat(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

export class Loup extends mob {
    constructor() {
        super();
        this.statsPrimaire.PV = this.genererStat(10, 30);
        this.statsAction.force = this.genererStat(5, 15);
        this.statsAction.agilité = this.genererStat(5, 20);
        this.statsAction.endurance = this.genererStat(5, 15);
        this.statsAction.intelligence = this.genererStat(5, 6);
        this.statsAction.charisme = this.genererStat(5, 6);
    }
}
export class Ours extends mob {
    constructor() {
        super();
        this.statsPrimaire.PV = this.genererStat(20, 60);
        this.statsAction.force = this.genererStat(1, 20);
        this.statsAction.agilité = this.genererStat(1, 5);
        this.statsAction.endurance = this.genererStat(1, 20);
        this.statsAction.intelligence = this.genererStat(1, 10);
        this.statsAction.charisme = this.genererStat(1, 2);
    }
}
export class Gobelin extends mob {
    constructor() {
        super();
        this.statsPrimaire.PV = this.genererStat(10, 30);
        this.statsAction.force = this.genererStat(1, 5);
        this.statsAction.agilité = this.genererStat(1, 10);
        this.statsAction.endurance = this.genererStat(1, 5);
        this.statsAction.intelligence = this.genererStat(1, 20);
        this.statsAction.charisme = this.genererStat(1, 10);
    }
}
export class RatGeant extends mob {
    constructor() {
        super();
        this.statsPrimaire.PV = this.genererStat(10, 20);
        this.statsAction.force = this.genererStat(1, 10);
        this.statsAction.agilité = this.genererStat(1, 20);
        this.statsAction.endurance = this.genererStat(1, 5);
        this.statsAction.intelligence = this.genererStat(1, 2);
        this.statsAction.charisme = this.genererStat(1, 2);
    }
}

export const typesMobs = [
    {
        nom: "Loup",
        experience: 100,
        loot: [
            lavande, poivre, curcuma, null,
            lavande, poivre, curcuma, null,
            lavande, poivre, curcuma, null,
            lavande, poivre, curcuma, null,
            lavande, poivre, curcuma, null,
            lavande, poivre, curcuma, null,
            lavande, poivre, curcuma, null,
            lavande, poivre, curcuma, null,
            lavande, poivre, curcuma, null,
            lavande, poivre, curcuma, null,
        ],
        // ...
    },
    {
        nom: "Ours",
        experience: 150,
        loot: [
            lavande, poivre, curcuma, null,
            lavande, poivre, curcuma, null,
            lavande, poivre, curcuma, null,
            lavande, poivre, curcuma, null,
            lavande, poivre, curcuma, null,
            lavande, poivre, curcuma, null,
            lavande, poivre, curcuma, null,
            lavande, poivre, curcuma, null,
            lavande, poivre, curcuma, null,
            lavande, poivre, curcuma, null,
        ],
        // ...
    },
    {
        nom: "Gobelin",
        experience: 200,
        loot: [
            lavande, poivre, curcuma, null,
            lavande, poivre, curcuma, null,
            lavande, poivre, curcuma, null,
            lavande, poivre, curcuma, null,
            lavande, poivre, curcuma, null,
            lavande, poivre, curcuma, null,
            lavande, poivre, curcuma, null,
            lavande, poivre, curcuma, null,
            lavande, poivre, curcuma, null,
            lavande, poivre, curcuma, null,
        ],
        // ...
    },
    {
        nom: "RatGeant",
        experience: 100,
        loot: [
            lavande, poivre, curcuma, null,
            lavande, poivre, curcuma, null,
            lavande, poivre, curcuma, null,
            lavande, poivre, curcuma, null,
            lavande, poivre, curcuma, null,
            lavande, poivre, curcuma, null,
            lavande, poivre, curcuma, null,
            lavande, poivre, curcuma, null,
            lavande, poivre, curcuma, null,
            lavande, poivre, curcuma, null,
        ],
        // ...
    },
    // ...
];



// Fonction pour mettre à jour les éléments du DOM
export function updateUI() {

    // Mettre à jour les statistiques du joueur
if (document.getElementById('pseudo')) {
    document.getElementById('pseudo').textContent = ` Pseudo :${joueur.pseudo} `;
}
if (document.getElementById('niveau')) {
    document.getElementById('niveau').textContent = ` Niveau :${joueur.niveau} `;
}
if (document.getElementById('exp')) {
    document.getElementById('exp').textContent = ` EXP :${joueur.experienceGlobale} `;
}
if (document.getElementById('lvlAlchimie')) {
    document.getElementById('lvlAlchimie').textContent = ` LVL Alchimie :${joueur.alchimie.lvlAlchimie} `;
}
if (document.getElementById('xpAlchimie')) {
    document.getElementById('xpAlchimie').textContent = ` Xp Alchimie :${joueur.alchimie.expAlchimie} `;
}
if (document.getElementById('mana')) {
    document.getElementById('mana').textContent = ` Mana :${joueur.statsPrimaire.MANA} `;
}
if (document.getElementById('pv')) {
    document.getElementById('pv').textContent = `PV :${joueur.statsPrimaire.PV} `;
}
if (document.getElementById('potentiel')) {
    document.getElementById('potentiel').textContent = ` Potentiel :${joueur.statsPrimaire.potentiel} `;
}
if (document.getElementById('fatigue')) {
    document.getElementById('fatigue').textContent = ` fatigue :${joueur.statsPrimaire.fatigue} `;
}
if (document.getElementById('etat')) {
    document.getElementById('etat').textContent = ` etat :${joueur.statsPrimaire.etat} `;
}
// Mettre à jour les quantités sous les images
if (document.getElementById('curcumaQuantity')) {
    document.getElementById('curcumaQuantity').textContent = `${joueur.inventaire[2].nom} Quantité: ${joueur.inventaire[2].quantite}`;
}
if (document.getElementById('lavandeQuantity')) {
    document.getElementById('lavandeQuantity').textContent = `${joueur.inventaire[0].nom} Quantité: ${joueur.inventaire[0].quantite}`;
}
if (document.getElementById('poivreQuantity')) {
    document.getElementById('poivreQuantity').textContent = `${joueur.inventaire[1].nom} Quantité: ${joueur.inventaire[1].quantite}`;
}


    /// Mettre à jour l'inventaire
    var inventoryList = document.getElementById('inventory-list');
    if (inventoryList) {
        inventoryList.innerHTML = ''; // Nettoyer l'inventaire actuel
        
        joueur.inventaire.forEach(function (item) {
            var listItem = document.createElement('li');
            listItem.textContent = `vous avez ${item.quantite}: ${item.nom}`;
            inventoryList.appendChild(listItem);
        });
    }
};

//gestion de l'exp GLOBALE

export function gagneXPdirect(quantite) {
const seuilsExperience = [1000, 2000, 4000, 8000, 16000, 32000, 64000, 120000, 240000]; // Tableau des seuils d'expérience nécessaires pour chaque niveau, ajustables
// Définition d'une fonction qui permet au joueur de gagner de l'expérience directement
    joueur.experienceGlobale += quantite; // Augmente l'expérience globale du joueur avec la quantité donnée
    let droitDeLvlUp = true; // Un indicateur pour vérifier si le joueur peut monter de niveau

    // Boucle parcourant les seuils d'expérience pour vérifier si le joueur monte de niveau
    for (let i = joueur.niveau - 1; i < seuilsExperience.length; i++) {
        if (joueur.experienceGlobale >= seuilsExperience[i]) { // Vérifie si l'expérience atteint le seuil requis
            joueur.niveau++; // Augmente le niveau du joueur
            alert(`Vous êtes désormais niveau ${joueur.niveau} ! Félicitations!`);
            joueur.experienceGlobale -= seuilsExperience[i]; // Réduit l'expérience en conséquence
        } else {
            droitDeLvlUp = false; // Le joueur n'a pas le droit de monter de niveau
            break; // Sort de la boucle dès que le seuil n'est plus atteint
        }
    }
 
    return droitDeLvlUp; // Renvoie l'indicateur de droit de monter de niveau
}

// Gestion de l'expérience en ALCHIMIE

export function gagneXPalchimie(quantite) {
     const seuilsExperienceAlchimie = [200, 400, 800, 1600, 3200]; // Tableau des seuils d'expérience nécessaires pour chaque niveau en alchimie
// Fonction pour permettre au joueur de gagner de l'expérience en Alchimie
    joueur.alchimie.expAlchimie += quantite; // Augmente l'expérience en alchimie du joueur
    let droitDeLvlUpAlchimie = true; // Indicateur pour vérifier si le joueur peut monter de niveau en alchimie

    // Boucle parcourant les seuils d'expérience en alchimie pour vérifier si le joueur monte de niveau
    for (let i = joueur.alchimie.lvlAlchimie; i < seuilsExperienceAlchimie.length; i++) {
        if (joueur.alchimie.expAlchimie >= seuilsExperienceAlchimie[i]) { // Vérifie si l'expérience atteint le seuil requis
            joueur.alchimie.lvlAlchimie++; // Augmente le niveau en alchimie du joueur
            lvlAlchimie = joueur.alchimie.lvlAlchimie; // Met à jour le niveau d'alchimie du joueur
            alert(`Votre niveau d'alchimie est maintenant ${joueur.alchimie.lvlAlchimie} ! Félicitations!`);
            joueur.alchimie.expAlchimie -= seuilsExperienceAlchimie[i]; // Réduit l'expérience en alchimie en conséquence

            // Calculer 1/4 de l'expérience nécessaire pour le niveau actuel en alchimie
            let quartExperienceAlchimie = Math.floor(seuilsExperienceAlchimie[i] / 4);
            // Ajouter le quart d'expérience directement
            gagneXPdirect(quartExperienceAlchimie);

            // Met à jour le compte à rebours en fonction du nouveau niveau d'alchimie
            updateCountdown();
        } else {
            droitDeLvlUpAlchimie = false; // Le joueur n'a pas le droit de monter de niveau en alchimie
            break; // Sort de la boucle dès que le seuil n'est plus atteint
        }
    }
    
    return droitDeLvlUpAlchimie; // Renvoie l'indicateur de droit de monter de niveau en alchimie
}
