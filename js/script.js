   
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

//  menu burger
const b=document.getElementById("burg");
const m=document.getElementById("menu");
b.addEventListener("click",()=>{
    m.classList.toggle("active");
});

// theme sombre et claire
const btn=document.getElementById("btn_mode");
if(localStorage.getItem("theme")==="dark"){
    document.body.classList.add("dark");
    btn.textContent="Mode clair";
}
btn.addEventListener("click",()=>{
    document.body.classList.toggle("dark");
    if(document.body.classList.contains("dark")){
        localStorage.setItem("theme","dark");
        btn.textContent="Mode clair";
    }
    else{
        localStorage.setItem("theme","light");
        btn.textContent="Mode sombre";
    }
})

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
    if (elema){/*pour bien verifier d'abord si topho se trouve dans la page parce que j'ai utiliser un seul js pour toute les fichiers html*/
        elema.src=images[i];

        i=i+1;
        if(i>=images.length){
            i=0;
        }
    }
}

la_une_img();
setInterval(la_une_img,10000);


//fontion de la recherche
document.addEventListener("DOMContentLoaded", function () {
    
    const champ = document.getElementById("rech");
    const liste = document.getElementById('champ');

        if (champ){
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
            champ.value="";
            function recherch() {
                const element = champ.value.toLowerCase();
                const lignes = liste.getElementsByTagName('tr');

                for (let i = 0; i < lignes.length; i++) {

                    const ligne = lignes[i];

                    // pour ne pas cacher les en-têtes
                    if (ligne.querySelector('th')) {
                        ligne.style.display = '';
                        continue;
                    }
                    const cellules = ligne.getElementsByTagName('td');
                    let ligneVisible = false;

                    // Nettoyage de l'ancien surlignage
                    suppsur(cellules[1]);

                    const texte = cellules[1].textContent.toLowerCase();
                    if (element !== "" && texte.includes(element)) {
                        addsur(cellules[1], element);
                        ligneVisible = true;
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
    }
});

    //filtrage de l'emploi du temp

document.addEventListener("DOMContentLoaded", function () {
    const selections = document.getElementById("trie");
    const matin = document.querySelectorAll(".matin, .matin_temp");
    const aprem = document.querySelectorAll(".midi, .midi_temp");
    if(selections){
        selections.value="Tous";
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
    }
});

//                                     filtrage des enseignants

document.addEventListener("DOMContentLoaded", () => {

    const Matiere = document.getElementById("trierm");
    const Grade = document.getElementById("trierg");
    const profs = document.querySelectorAll(".prof");

    // Si on n’est pas sur la page filière → on sort
    if (!Matiere || !Grade) return;
    Grade.value="tous";
    Matiere.value="tous";
    function filtrer() {
        const matiere = Matiere.value;
        const grade = Grade.value;
        
        profs.forEach(prof => {
            const profMatiere = prof.dataset.matiere;
            const profGrade = prof.dataset.grade;

            const okMatiere =
                matiere === "tous" || profMatiere.includes(matiere);

            const okGrade =
                grade === "tous" || profGrade === grade;

            prof.style.display =
                okMatiere && okGrade ? "block" : "none";
        });
    }

    Matiere.addEventListener("change", filtrer);
    Grade.addEventListener("change", filtrer);

});
  
//                   partie contacte

document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("fcontact");
    const nom = document.getElementById("nom");
    const mail = document.getElementById("mail");
    const sujet = document.getElementById("sujet");
    const message = document.getElementById("mess");

    const erreur_n = document.getElementById("erreur_nom");
    const erreur_s = document.getElementById("erreur_sujet");
    const erreur_m = document.getElementById("erreur_msg");
    const erreur = document.getElementById("erreur");
    const succes = document.getElementById("succes");
    if(!form)return;
    form.addEventListener("submit", function (e) {

        e.preventDefault(); // empêche l'envoi réel

        erreur.textContent = "";
        succes.textContent = "";
        if(nom.value==="" || !nom.value.includes(" ")){
            erreur_n.textContent="Le nom et le prenom sont obligatoire";
            return;
        }
        else{
            erreur_n.textContent="";
        }
        if(mail.value==="" || !mail.value.includes("@")){
            erreur.textContent="Addresse email invalide";
            return;
        }
        else{
            erreur.textContent="";
        }
        if(sujet.value===""){
            erreur_s.textContent="Le sujet est obligatoire";
            return;
        }
        else{
            erreur_s.textContent="";
        }
        if(message.value===""){
            erreur_m.textContent="Veuiller saisir votre message";
            return;
        }
        else{
            erreur_m.textContent="";
        }
        
        succes.textContent="Message envoyé avec succes";
        nom.value="";
        mail.value="";
        sujet.value="";
        message.value="";
    });
});