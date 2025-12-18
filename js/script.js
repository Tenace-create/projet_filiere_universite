   
    function mettreAJourDate() {
        const maintenant = new Date();
        const optionsDate = {weekday: 'long',year: 'numeric',month: 'long',day: 'numeric',};

        // Utilisation de 'fr-FR' pour le format français
        const dateTimeFormatte = maintenant.toLocaleDateString('fr-FR', optionsDate);

        const element = document.getElementById('date');
        if (element) {
            element.textContent = dateTimeFormatte;
        }
    }
    mettreAJourDate();
    setInterval(mettreAJourDate, 1000);//mettre a jour la date chaque seconde



    function mettreAJourHeure() {
        const maintenant = new Date();
        //heure sous forme 24h 59min 59S
        const optionsHeure = {hour: '2-digit',minute: '2-digit',second: '2-digit', hour12: false };
        // On utilise ici toLocaleTimeString() qui est plus adapté pour l'heure seule.
        const heureFormattee = maintenant.toLocaleTimeString('fr-FR', optionsHeure);
        const elementHeure = document.getElementById('heur');
        if (elementHeure) {
            elementHeure.textContent = heureFormattee;
        }
    }
    mettreAJourHeure();
    setInterval(mettreAJourHeure, 1000);// Mettre à jour l'heure toutes les 1000 millisecondes (1 seconde)


//fonction de salutation en fonction du temps
    function afficherSalutation() {
        const maintenant = new Date();
        const heure = maintenant.getHours();//recuperation de l'heure

        let message = ""; // Variable pour stocker le message

        if (heure >= 5 && heure < 12) {
            message = "Bonjour ";
        } else if (heure >= 12 && heure < 18) {
            message = "Bon après-midi ";
        } else {
            message = "Bonsoir ";
        }

        const elementSalutation = document.getElementById('salutation');
        if (elementSalutation) {
            elementSalutation.textContent = message;
        }
    }
    afficherSalutation();


function ContenuVP() {
    const contenu = document.getElementById('contenu_cache');
    const bouton = document.getElementById('btn_voir_plus');

    contenu.classList.toggle('actif');//ajout ou retrait d'une class actif sur contenu

    //pour changer le texte du boutton en fonction de son etat
    if (contenu.classList.contains('actif')) {
        bouton.textContent = "Voir moins";//
    } else {
        bouton.textContent = "Voir plus";
    }
}



//images de a la une mise a jour tout les 10 secondes
const images=["images/photos/inscription.jpg","images/photos/enligne.png"];
let i=0;

function la_une_img(){
    const elema=document.getElementById("topho");
  //  elema.src=images[i];

    i=i+1;
    if(i>=images.length){
        i=0;
    }
    
}
la_une_img();
setInterval(la_une_img,10000);


//fontion de la recherche
document.addEventListener("DOMContentLoaded", function () {

    const champ = document.getElementById('rech');
    const liste = document.getElementById('champ');

    // Supprimer le surlignage
    function suppsur(cellule) {
        cellule.innerHTML = cellule.textContent;
    }

    // Ajouter le surlignage
    function addsur(cellule, mot) {
        const regex = new RegExp(`(${mot})`, 'gi');
        cellule.innerHTML = cellule.textContent.replace(
            regex,
            `<span class="surligner">$1</span>`
        );
    }

    function recherch() {
        const element = champ.value.toLowerCase();
        const lignes = liste.getElementsByTagName('tr');

        for (let i = 0; i < lignes.length; i++) {

            const ligne = lignes[i];

            // Ne pas cacher les en-têtes
            if (ligne.querySelector('th')) {
                ligne.style.display = '';
                continue;
            }

            const cellules = ligne.getElementsByTagName('td');
            let ligneVisible = false;

            for (let cellule of cellules) {

                // Nettoyer ancien surlignage
                suppsur(cellule);

                const texte = cellule.textContent.toLowerCase();

                if (element !== "" && texte.includes(element)) {
                    addsur(cellule, element);
                    ligneVisible = true;
                }
            }

            // Afficher / cacher la ligne
            if (element === "" || ligneVisible) {
                ligne.style.display = '';
            } else {
                ligne.style.display = 'none';
            }
        }
    }

    // Recherche à chaque frappe
    champ.addEventListener('keyup', recherch);
});


//filtrage de l'emploi du temp
document.addEventListener("DOMContentLoaded", function () {

    const selections = document.getElementById("trie");
    const matin = document.querySelectorAll(".matin, .matin_temp");
    const aprem = document.querySelectorAll(".midi, .midi_temp");

    selections.addEventListener("change", function () {
        const valeur = selections.value;
        if (valeur === "Tous") {
            matin.forEach(ligne => ligne.style.display = "");
            aprem.forEach(ligne => ligne.style.display = "");
        }

        else if (valeur === "matin") {
            matin.forEach(ligne => ligne.style.display = "");
            aprem.forEach(ligne => ligne.style.display = "none");
        }

        else if (valeur === "midi") {
            matin.forEach(ligne => ligne.style.display = "none");
            aprem.forEach(ligne => ligne.style.display = "");
        }
    });
});

//filtrage des enseignants
document.addEventListener("DOMContentLoaded", function () {

    const select = document.getElementById("trier");
    const profs = document.querySelectorAll(".prof");

    select.addEventListener("change", function () {

        const valeur = select.value.toLowerCase();

        profs.forEach(prof => {

            const grade = prof.dataset.grade.toLowerCase();
            const matiere = prof.dataset.matiere.toLowerCase();

            if (valeur === "") {
                prof.style.display = "";
            }
            else if (grade.includes(valeur) || matiere.includes(valeur)) {
                prof.style.display = "";
            }
            else {
                prof.style.display = "none";
            }
        });
    });
});