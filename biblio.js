// © Copyright Stéphane Duguay, 2018
var Programme;
(function (Programme) {
    let BiblioImpl;
    (function (BiblioImpl) {
        class FichierOuvert {
            constructor(unNom, lesLignes) {
                this.ligne = 0;
                this.colonne = 0;
                this.nom = unNom;
                this.lignes = lesLignes;
            }
        }
        BiblioImpl.FichierOuvert = FichierOuvert;
        class RegistreFichiers extends Map {
        }
        class RegistreImages extends Map {
        }
        BiblioImpl.gFichiers = new RegistreFichiers();
        BiblioImpl.gImages = new RegistreImages();
        function On() {
        }
        BiblioImpl.On = On;
        function Off() {
            if (BiblioImpl.gFichiers !== null) {
                BiblioImpl.gFichiers.forEach(function (fichierOuvert, fichier, fichiers) {
                    EcrireErreur("! Avertissement ! Fichier laissé ouvert : " + fichierOuvert.nom);
                });
                BiblioImpl.gFichiers.clear();
                BiblioImpl.gFichiers = null;
            }
            BiblioImpl.gImages = null;
        }
        BiblioImpl.Off = Off;
    })(BiblioImpl = Programme.BiblioImpl || (Programme.BiblioImpl = {}));
    //---------- DEBOGAGE -------------------------------------------------------------------------------
    /**
     * Cette procédure ne fait rien si le paramètre condition est Vrai, mais déclenche une erreur s'il est Faux.
     * Utiliser pour la vérification du code. Équivalent en C/C++ : assert.
     * @param condition Le paramètre conditionnel, habituellement le résultat d'un opérateur relationnel.
     * @param message Ce paramètre est le message à afficher si l'erreur se déclenche.
     *
     * Utilisation:
     * ~~~
     * Verifier( 2 == 2 );  // Pas de problème
     * Verifier( 3 == 2 );  // Erreur
     * Verifier( 3 == 2, "Trois n'est pas égal à deux!" );  // Erreur
     * ~~~
     *
     */
    function Verifier(condition, message = "") {
        if (!(condition)) {
            const messageErreur = "Erreur de vérification" + (message.length > 0 ? (" : " + message) : "");
            let err = new Error(messageErreur);
            const msg = err.stack;
            Programme.EcrireLigne("");
            Programme.EcrireErreur(msg);
            console.log(msg);
            alert(msg);
            debugger;
            throw err;
        }
    }
    Programme.Verifier = Verifier;
    //---------- UTILITAIRES ---------------------------------------------------------------------------
    /**
     * Cette fonction retourne le nombre d'éléments contenus dans un tableau.
     * @param tab Le tableau.
     *
     * Utilisation:
     * ~~~
     * let taille = Taille( [1, 2, 6] );   // taille vaut 3
     * ~~~
     *
     */
    function Taille(tab) {
        return tab.length;
    }
    Programme.Taille = Taille;
    /**
     * Cette fonction retourne le nombre de caractères dans la chaine en paramètre.
     * @param chaine La chaine.
     *
     * Utilisation:
     * ~~~
     * let longueur0 = Longueur( "" );              // Retourne 0
     * let longueur1 = Longueur( "1" );             // Retourne 1
     * let longueur4 = Longueur( "abcd" );          // Retourne 4
     * let longueur3 = Longueur( "x y" );           // Retourne 3
     * let longueur10 = Longueur( "0123456789" );   // Retourne 10
     * ~~~
     *
     */
    function Longueur(chaine) {
        return chaine.length;
    }
    Programme.Longueur = Longueur;
    //---------- MATH -------------------------------------------------------------------------------
    /**
     * Cette fonction retourne Vrai si les deux réels peuvent être considérés comme égaux.
     * @param a Le premier nombre réel à comparer.
     * @param b Le deuxième nombre réel à comparer.
     *
     * Utilisation:
     * ~~~
     * if( ReelsEgaux( Pi(), 3.14159265 ) )
     * {
     *      // ...
     * }
     * ~~~
     *
     */
    function ReelsEgaux(a, b) {
        return (Math.abs(a - b) < (100 * Number.EPSILON)); // 100 est arbitraire
    }
    Programme.ReelsEgaux = ReelsEgaux;
    /**
     * Cette fonction retourne la valeur plancher du nombre en paramètre.
     * Le plancher est la valeur entière immédiatement inférieure ou égale à un nombre réel.
     * En anglais : floor
     * @param nombre Un nombre réel
     *
     * Utilisation:
     * ~~~
     * Plancher( 1 )        // retourne 1
     * Plancher( 1.01 )     // retourne 1
     * Plancher( 1.99999 )  // retourne 1
     * Plancher( 2 )        // retourne 2
     * ~~~
     *
     */
    function Plancher(nombre) {
        return Math.floor(nombre);
    }
    Programme.Plancher = Plancher;
    /**
     * Cette fonction retourne la valeur plafond du nombre en paramètre.
     * Le plafond est la valeur entière immédiatement supérieure ou égale à un nombre réel.
     * En anglais : ceiling ou ceil
     * @param nombre Un nombre réel
     *
     * Utilisation:
     * ~~~
     * Plafond( 1 )        // retourne 1
     * Plafond( 1.01 )     // retourne 2
     * Plafond( 1.99999 )  // retourne 2
     * Plafond( 2 )        // retourne 2
     * ~~~
     *
     */
    function Plafond(nombre) {
        return Math.ceil(nombre);
    }
    Programme.Plafond = Plafond;
    /**
     * Cette fonction retourne la valeur arrondie du nombre en paramètre.
     * L'arrondissement se fait à l'entier le plus près. Pour les valeurs décimales .5, c'est l'entier immédiatement supérieur.
     * En anglais : round
     * @param nombre Un nombre réel
     *
     * Utilisation:
     * ~~~
     * Arrondir( -1.9 )     // Retourne -2
     * Arrondir( -1.1 )     // Retourne -1
     * Arrondir( -1.0 )     // Retourne -1
     * Arrondir( -1 )       // Retourne -1
     * Arrondir( -0.99 )    // Retourne -1
     * Arrondir( 0 )        // Retourne 0
     * Arrondir( 0.01 )     // Retourne 0
     * Arrondir( 0.99 )     // Retourne 1
     * Arrondir( 1 )        // Retourne 1
     * Arrondir( 1.0 )      // Retourne 1
     * Arrondir( 1.01 )     // Retourne 1
     * Arrondir( 1.499999999999999 ) // Retourne 1
     * Arrondir( 1.5 )      // Retourne 2
     * ~~~
     *
     */
    function Arrondir(nombre) {
        return Math.round(nombre);
    }
    Programme.Arrondir = Arrondir;
    /**
     * Cette fonction retourne la valeur en entrée en la limitant dans l'intervalle [min, max].
     * En anglais : clamp
     * @param valeur La valeur à serrée
     * @param min La borne inférieure de l'intervalle (inclusivement)
     * @param max La borne supérieure de l'intervalle (inclusivement)
     *
     * Utilisation:
     * ~~~
     * Serrer( 5, 1, 10 )   // retourne 5
     * Serrer( 0, 1, 10 )   // retourne 1
     * Serrer( -4, 1, 10 )  // retourne 1
     * Serrer( 21, 1, 10 )  // retourne 10
     * ~~~
     *
     */
    function Serrer(valeur, min, max) {
        return Minimum(Maximum(valeur, min), max);
    }
    Programme.Serrer = Serrer;
    /**
     * Cette fonction retourne le plus petit des nombres en paramètres.
     * @param args Les nombres, soit séparemment ou dans un tableau.
     *
     * Utilisation:
     * ~~~
     * Minimum( 6, 4, 1, 3 )        // Retourne 1
     * Minimum( -1, -2, -4, -3 )    // Retourne -4
     * Minimum( ...[6, 2, 4, 3] )   // Retourne 2
     * ~~~
     *
     */
    function Minimum(...args) {
        return Math.min.apply(null, args);
    }
    Programme.Minimum = Minimum;
    /**
     * Cette fonction retourne le plus grand des nombres en paramètres.
     * @param args Les nombres, soit séparemment ou dans un tableau.
     *
     * Utilisation:
     * ~~~
     * Maximum( 6, 4, 1, 3 )        // Retourne 6
     * Maximum( -1, -2, -4, -3 )    // Retourne -1
     * Maximum( ...[6, 7, 4, 3] )   // Retourne 7
     * ~~~
     *
     */
    function Maximum(...args) {
        return Math.max.apply(null, args);
    }
    Programme.Maximum = Maximum;
    /**
     * Cette fonction retourne un nombre entier au hasard pigé dans l'intervalle [min, max].
     * En anglais : rand ou random
     * @param min La borne inférieure de l'intervalle (inclusivement).
     * @param max La borne supérieure de l'intervalle (inclusivement).
     *
     * Utilisation:
     * ~~~
     * ~~~
     *
     */
    function EntierAuHasard(min, max) {
        Verifier(min <= max, "(EntierAuHasard) min est plus grand que max");
        return Plancher(min + (Math.random() * (max - min + 1)));
    }
    Programme.EntierAuHasard = EntierAuHasard;
    /**
     * Cette fonction retourne un nombre réel au hasard pigé dans l'intervalle [min, max].
     * En anglais : frand
     * @param min La borne inférieure de l'intervalle (inclusivement).
     * @param max La borne supérieure de l'intervalle (inclusivement).
     *
     * Utilisation:
     * ~~~
     * ~~~
     *
     */
    function AuHasard(min, max) {
        Verifier(min <= max, "(AuHasard) min est plus grand que max");
        return min + (Math.random() * (max - min));
    }
    Programme.AuHasard = AuHasard;
    /**
     * Cette fonction retourne un GUID généré pseudo-aléatoirement sous forme de string.
     * GUID : Globally Unique Identifier.
     *
     * Utilisation:
     * ~~~
     * ~~~
     *
     */
    function GUID() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }
    Programme.GUID = GUID;
    /**
     * Cette fonction retourne le nombre pi (3.141592653589793).
     *
     * Utilisation:
     * ~~~
     * let aireCercle = Pi() * rayon * rayon;
     * ~~~
     *
     */
    function Pi() {
        return Math.PI;
    }
    Programme.Pi = Pi;
    /**
     * Cette fonction retourne la valeur absolue du nombre en paramètre.
     * @param nombre  Ce paramètre est un nombre, positif ou négatif.
     *
     * Utilisation:
     * ~~~
     * let valeurAbsolue = Absolue( -5 );   // valeurAbsolue vaut 5
     * ~~~
     *
     */
    function Absolue(nombre) {
        return Math.abs(nombre);
    }
    Programme.Absolue = Absolue;
    /**
     * Cette fonction retourne la racine carrée du nombre en paramètre.
     * @param nombre Le nombre.
     *
     * Utilisation:
     * ~~~
     * RacineCarree( 0 )        // Retourne 0
     * RacineCarree( 1 )        // Retourne 1
     * RacineCarree( 16 )       // Retourne 4
     * RacineCarree( 25 )       // Retourne 5
     * RacineCarree( 37.21 )    // Retourne 6.1
     * ~~~
     *
     */
    function RacineCarree(nombre) {
        return Math.sqrt(nombre);
    }
    Programme.RacineCarree = RacineCarree;
    /**
     * Cette fonction retourne la puissance de la base à un exposant donné.
     * @param base La base.
     * @param exposant L'exposant.
     *
     * Utilisation:
     * ~~~
     * Puissance( 0, 2 )        // Retourne 0
     * Puissance( 1, 0 )        // Retourne 1
     * Puissance( 1, 2 )        // Retourne 1
     * Puissance( 2, 0 )        // Retourne 1
     * Puissance( 2, 2 )        // Retourne 4
     * Puissance( 6.1, 2 )      // Retourne 37.21
     * ~~~
     *
     */
    function Puissance(base, exposant) {
        return Math.pow(base, exposant);
    }
    Programme.Puissance = Puissance;
    function Sinus(radians) {
        return Math.sin(radians);
    }
    Programme.Sinus = Sinus;
    function Cosinus(radians) {
        return Math.cos(radians);
    }
    Programme.Cosinus = Cosinus;
    function Tangente(radians) {
        return Math.tan(radians);
    }
    Programme.Tangente = Tangente;
    function ArcSinus(valeur) {
        return Math.asin(valeur);
    }
    Programme.ArcSinus = ArcSinus;
    function ArcCosinus(valeur) {
        return Math.acos(valeur);
    }
    Programme.ArcCosinus = ArcCosinus;
    function ArcTangente(valeur) {
        return Math.atan(valeur);
    }
    Programme.ArcTangente = ArcTangente;
    //---------- CONSOLE -------------------------------------------------------------------------------
    /**
     * Cette fonction retourne Vrai si le nombre en paramètre est un entier; sinon Faux.
     * @param nombre Le nombre.
     *
     * Utilisation:
     * ~~~
     * EstEntier( 2 )           // Retourne Vrai
     * EstEntier( 2.0 )         // Retourne Vrai
     * EstEntier( 2.01 )        // Retourne Faux
     * ~~~
     *
     */
    function EstEntier(nombre) {
        return NombreEstValide(nombre) && Number.isInteger(nombre) && Number.isSafeInteger(nombre);
    }
    Programme.EstEntier = EstEntier;
    /**
     * Cette fonction retourne la représentation en string du nombre en paramètre, selon la précision spécifiée.
     * @param nombre Le nombre.
     * @param precision La précision (nombre de chiffres décimaux).
     *
     * Utilisation:
     * ~~~
     * NombreEnTexte( 5 )           // Retourne la string "5"
     * NombreEnTexte( 5, 0 )        // Retourne la string "5"
     * NombreEnTexte( 5, 1 )        // Retourne la string "5.0"
     * NombreEnTexte( 5, 2 )        // Retourne la string "5.00"
     *
     * NombreEnTexte( 5.1 )         // Retourne la string "5"
     * NombreEnTexte( 5.1, 0 )      // Retourne la string "5"
     * NombreEnTexte( 5.12, 1 )     // Retourne la string "5.1"
     * NombreEnTexte( 5.12, 2 )     // Retourne la string "5.12"
     * NombreEnTexte( 5.12, 3 )     // Retourne la string "5.120"
     * ~~~
     *
     */
    function NombreEnTexte(nombre, precision = 0) {
        if (NombreEstValide(nombre)) {
            return Number(nombre).toFixed(precision);
        }
        return "";
    }
    Programme.NombreEnTexte = NombreEnTexte;
    /**
     * Cette fonction retourne Vrai si la string contient des caractères représentant un nombre valide; sinon Faux.
     * @param stringNombre La string à examiner.
     *
     * Utilisation:
     * ~~~
     * ValiderTexteEnNombre( "-1" )     // Retourne Vrai
     * ValiderTexteEnNombre( "-0,99" )  // Retourne Vrai
     * ValiderTexteEnNombre( "-0.99" )  // Retourne Vrai
     * ValiderTexteEnNombre( "0" )      // Retourne Vrai
     * ValiderTexteEnNombre( "0,99" )   // Retourne Vrai
     * ValiderTexteEnNombre( "0.99" )   // Retourne Vrai
     * ValiderTexteEnNombre( "1" )      // Retourne Vrai
     *
     * ValiderTexteEnNombre( "1a" )     // Retourne Faux
     * ValiderTexteEnNombre( "1,1a" )   // Retourne Faux
     * ValiderTexteEnNombre( "1.1a" )   // Retourne Faux
     * ValiderTexteEnNombre( "a" )      // Retourne Faux
     * ValiderTexteEnNombre( "a1" )     // Retourne Faux
     * ~~~
     *
     */
    function ValiderTexteEnNombre(stringNombre) {
        stringNombre = stringNombre.replace(/,/g, '.');
        return NombreEstValide(Number(stringNombre));
    }
    Programme.ValiderTexteEnNombre = ValiderTexteEnNombre;
    /**
     * Cette fonction retourne le nombre représenté par les caractères de la string en paramètre.
     * Il est recommandé de vérifier que la conversion pourra se faire avec ValiderTexteEnNombre.
     * @param stringNombre La string à convertir.
     *
     * Utilisation:
     * ~~~
     * ~~~
     *
     */
    function TexteEnNombre(stringNombre) {
        return Number(stringNombre);
    }
    Programme.TexteEnNombre = TexteEnNombre;
    /**
     * Cette fonction retourne Vrai si le nombre en paramètre est un nombre valide; sinon Faux.
     * @param nombre Le nombre.
     *
     * Utilisation:
     * ~~~
     * NombreEstValide( 42 )                    // Retourne Vrai
     * NombreEstValide( RacineCarree( -16 ) )   // Retourne Faux
     * ~~~
     *
     */
    function NombreEstValide(nombre) {
        return Number.isFinite(nombre) && !Number.isNaN(nombre);
    }
    Programme.NombreEstValide = NombreEstValide;
    /**
     * Cette fonction retourne une string obtenue auprès de l'utilisateur.
     * @param invite Le message d'invitation à entrer une valeur.
     *
     * Utilisation:
     * ~~~
     * ~~~
     *
     */
    function ObtenirTexte(invite) {
        EcrireTexte("> " + invite);
        let texte = window.prompt(invite, "");
        if (texte === null) {
            texte = "";
        }
        EcrireTexte(": ");
        EcrireLigne(texte);
        return texte;
    }
    Programme.ObtenirTexte = ObtenirTexte;
    /**
     * Cette fonction retourne un nombre entier obtenu auprès de l'utilisateur.
     * @param invite Le message d'invitation à entrer une valeur.
     *
     * Utilisation:
     * ~~~
     * ~~~
     *
     */
    function ObtenirEntier(invite) {
        EcrireTexte("> " + invite);
        let texte = window.prompt(invite, "");
        EcrireTexte(": ");
        if (texte !== null) {
            texte = texte.replace(/,/g, '.');
        }
        let valeur = parseInt(texte);
        EcrireLigne(valeur.toString());
        return valeur;
    }
    Programme.ObtenirEntier = ObtenirEntier;
    /**
     * Cette fonction retourne un nombre réel obtenu auprès de l'utilisateur.
     * @param invite Le message d'invitation à entrer une valeur.
     *
     * Utilisation:
     * ~~~
     * ~~~
     *
     */
    function ObtenirReel(invite) {
        EcrireTexte("> " + invite);
        let texte = window.prompt(invite, "");
        EcrireTexte(": ");
        if (texte !== null) {
            texte = texte.replace(/,/g, '.');
        }
        let valeur = parseFloat(texte);
        EcrireLigne(valeur.toString());
        return valeur;
    }
    Programme.ObtenirReel = ObtenirReel;
    /**
     * Cette fonction retourne un booléen obtenu auprès de l'utilisateur.
     * @param invite Le message d'invitation à entrer une valeur.
     *
     * Utilisation:
     * ~~~
     * ~~~
     *
     */
    function ObtenirBooleen(invite) {
        EcrireTexte("> " + invite);
        let ok = window.confirm(invite);
        EcrireTexte(": ");
        EcrireLigne(ok ? "Vrai" : "Faux");
        return ok;
    }
    Programme.ObtenirBooleen = ObtenirBooleen;
    /**
     * Cette fonction retourne une string compatible HTML représentant la couleur RGB en paramètre.
     * @param rouge La quantité de rouge, comprise dans [0, 255].
     * @param vert La quantité de vert, comprise dans [0, 255].
     * @param bleu La quantité de bleu, comprise dans [0, 255].
     *
     * Utilisation:
     * ~~~
     * ~~~
     *
     */
    function RVB(rouge, vert, bleu) {
        return "rgb(" + Serrer(Arrondir(rouge), 0, 255).toString() +
            ", " + Serrer(Arrondir(vert), 0, 255).toString() +
            ", " + Serrer(Arrondir(bleu), 0, 255).toString() + ")";
    }
    Programme.RVB = RVB;
    let gCouleurTexte = RVB(0, 0, 0);
    /**
     * Cette procédure configure la couleur du texte qui sera écrit dans la console de sortie.
     * @param rouge La quantité de rouge, comprise dans [0, 255].
     * @param vert La quantité de vert, comprise dans [0, 255].
     * @param bleu La quantité de bleu, comprise dans [0, 255].
     *
     * Utilisation:
     * ~~~
     * ChoisirCouleurTexte(0, 0, 0);        // Le texte sera noir
     * ChoisirCouleurTexte(255, 0, 0);      // Le texte sera rouge
     * ChoisirCouleurTexte(0, 255, 255);    // Le texte sera turquoise
     * ~~~
     *
     */
    function ChoisirCouleurTexte(rouge, vert, bleu) {
        gCouleurTexte = RVB(rouge, vert, bleu);
    }
    Programme.ChoisirCouleurTexte = ChoisirCouleurTexte;
    /**
     * Cette procédure écrit du texte dans la console de sortie, sans fermer la ligne.
     * @param texte La string à afficher.
     *
     * Utilisation:
     * ~~~
     * ~~~
     *
     */
    function EcrireTexte(texte) {
        let cout = document.getElementById("cout");
        if (cout) {
            cout.innerHTML += "<span style=\"color: " + gCouleurTexte + "\">" + texte + "</span>";
        }
    }
    Programme.EcrireTexte = EcrireTexte;
    /**
     * Cette procédure écrit une erreur dans la console de sortie.
     * @param texte La string à afficher.
     *
     * Utilisation:
     * ~~~
     * ~~~
     *
     */
    function EcrireErreur(texte) {
        let couleurPrecedente = gCouleurTexte;
        ChoisirCouleurTexte(220, 0, 0);
        EcrireLigne("\n" + texte);
        gCouleurTexte = couleurPrecedente;
    }
    Programme.EcrireErreur = EcrireErreur;
    const cDefaultColsConfig = [30]; // 30 console chars width
    let gColsConfig = cDefaultColsConfig.slice();
    /**
     * Cette procédure configure les largeurs de colonnes de la console de sortie.
     * @param largeurs Les largeurs.
     *
     * Utilisation:
     * ~~~
     * ~~~
     *
     */
    function ConfigurerColonnes(...largeurs) {
        if (largeurs.length > 0) {
            gColsConfig.length = 0;
            for (let largeur of largeurs) {
                gColsConfig.push(largeur);
            }
        }
        else {
            gColsConfig = cDefaultColsConfig.slice();
        }
    }
    Programme.ConfigurerColonnes = ConfigurerColonnes;
    let Alignement;
    (function (Alignement) {
        Alignement[Alignement["Gauche"] = 1] = "Gauche";
        Alignement[Alignement["Droite"] = 2] = "Droite";
        Alignement[Alignement["Centre"] = 3] = "Centre";
    })(Alignement = Programme.Alignement || (Programme.Alignement = {}));
    /**
     * Cette fonction ajout des espaces vides selon l'alignement spécifié pour obtenir une string de la largeur spécifiée.
     * En anglais: padding
     * @param source La string à rembourer.
     * @param largeur La largeur de la string résultante.
     * @param alignement L'alignement désiré.
     * @param remplissage Le caractère de remplissage.
     *
     * Utilisation:
     * ~~~
     * Remplir( "test", 4 )                     // Retourne "test", à droite par défaut
     * Remplir( "test", 4, Alignement.Droite )  // Retourne "test"
     * Remplir( "test", 4, Alignement.Gauche )  // Retourne "test"
     * Remplir( "test", 4, Alignement.Centre )  // Retourne "test"
     * Remplir( "test", 8 )                     // Retourne "    test", à droite par défaut
     * Remplir( "test", 8, Alignement.Droite )  // Retourne "    test"
     * Remplir( "test", 8, Alignement.Gauche )  // Retourne "test    "
     * Remplir( "test", 8, Alignement.Centre )  // Retourne "  test  "
     * Remplir( "abcde", 8 )                    // Retourne "   abcde", à droite par défaut
     * Remplir( "abcde", 8, Alignement.Droite ) // Retourne "   abcde"
     * Remplir( "abcde", 8, Alignement.Gauche ) // Retourne "abcde   "
     * Remplir( "abcde", 8, Alignement.Centre ) // Retourne " abcde  "
     * Remplir( "abcde", 3 )                    // Retourne "cde", à droite par défaut
     * Remplir( "abcde", 3, Alignement.Droite ) // Retourne "cde"
     * Remplir( "abcde", 3, Alignement.Gauche ) // Retourne "abc"
     * Remplir( "abcde", 3, Alignement.Centre ) // Retourne "bcd"
     * Remplir( "", 3 )                         // Retourne "   ", à droite par défaut
     * Remplir( "", 3, Alignement.Droite )      // Retourne "   "
     * Remplir( "", 3, Alignement.Gauche )      // Retourne "   "
     * Remplir( "", 3, Alignement.Centre )      // Retourne "   "
     * ~~~
     *
     */
    function Remplir(source, largeur, alignement = Alignement.Droite, remplissage = ' ') {
        if (source.length >= largeur) {
            switch (alignement) {
                case Alignement.Droite:
                    return source.slice(-largeur);
                case Alignement.Gauche:
                    return source.substring(0, largeur);
                case Alignement.Centre:
                    {
                        const debut = Plancher(source.length / 2) - Plancher(largeur / 2);
                        return source.substring(debut, debut + largeur);
                    }
            }
        }
        else {
            const padding = Array(largeur + 1).join(remplissage);
            switch (alignement) {
                case Alignement.Droite:
                    return (padding + source).slice(-largeur);
                case Alignement.Gauche:
                    return (source + padding).substring(0, largeur);
                case Alignement.Centre:
                    return padding.substring(0, Plancher((largeur - source.length) / 2)) + source + padding.substring(0, Plafond((largeur - source.length) / 2));
            }
        }
        return source;
    }
    Programme.Remplir = Remplir;
    /**
     * Cette procédure écrit une ligne de texte dans la console de sortie et la ferme. Plusieurs colonnes peuvent être spécifiées.
     * @param textes Les strings à afficher, par colonne.
     *
     * Utilisation:
     * ~~~
     * EcrireLigne( "Bonjour" );            // 1 colonne
     * EcrireLigne( "Bonjour", "toi" );     // 2 colonnes
     * ~~~
     *
     */
    function EcrireLigne(...textes) {
        let cout = document.getElementById("cout");
        if (!cout) {
            return;
        }
        if (textes.length === 1) {
            cout.innerHTML += "<span style=\"color: " + gCouleurTexte + "\">" + (textes[0]) + "</span><br />";
        }
        else if (textes.length > 1) {
            for (let t = 0; t < textes.length; ++t) {
                cout.innerHTML += "<span style=\"color: " + gCouleurTexte + "\">" + Remplir(textes[t], gColsConfig[Math.min(t, gColsConfig.length - 1)]) + "</span>";
            }
            cout.innerHTML += "<br />";
        }
    }
    Programme.EcrireLigne = EcrireLigne;
    /**
     * Cette procédure efface le contenu de la console de sortie.
     *
     * Utilisation:
     * ~~~
     * EffacerSortie();
     * ~~~
     *
     */
    function EffacerSortie() {
        let cout = document.getElementById("cout");
        if (cout) {
            // Remove all children
            while (cout.hasChildNodes()) {
                cout.removeChild(cout.firstChild);
            }
        }
        let outputDiv = document.getElementById("output");
        if (outputDiv && outputDiv.hasChildNodes()) {
            let child = outputDiv.firstChild;
            while (child) {
                if (child !== cout) {
                    let nextChild = child.nextSibling;
                    outputDiv.removeChild(child);
                    child = nextChild;
                }
                else {
                    child = child.nextSibling;
                }
            }
        }
    }
    Programme.EffacerSortie = EffacerSortie;
    //---------- FICHIER -------------------------------------------------------------------------------
    class Fichier {
    }
    Programme.Fichier = Fichier;
    /**
     * Cette fonction ouvre un fichier en lecture. La fonction retourne le fichier ouvert.
     * @param nomFichier Le nom du fichier.
     *
     * Utilisation:
     * ~~~
     * let fichier: Fichier = OuvrirFichier("test.txt");
     * ~~~
     *
     */
    function OuvrirFichier(nomFichier) {
        // Forcer le rafraichissement du cache du navigateur
        nomFichier = nomFichier + "?ver=" + GUID();
        let client = new XMLHttpRequest();
        client.open('GET', nomFichier, false);
        let response = "";
        client.onreadystatechange = function () {
            // TODO gerer client.status = 404 et autres readyState
            if (client.readyState == 4 && client.status == 200) {
                response = client.responseText;
            }
        };
        client.send();
        if (response.length > 0) {
            let fichier = new Fichier();
            BiblioImpl.gFichiers.set(fichier, new BiblioImpl.FichierOuvert(nomFichier, response.split(/\r\n|\n/)));
            return fichier;
        }
        throw "(OuvrirFichier) Fichier invalide.";
    }
    Programme.OuvrirFichier = OuvrirFichier;
    /**
     * Cette fonction lit une ligne de texte d'un fichier ouvert à l'aide de OuvrirFichier.
     * La fonction retourne la string lue.
     * @param fichier Le fichier.
     *
     * Utilisation:
     * ~~~
     * let leFichier: Fichier = OuvrirFichier("test.txt");
     * let ligneTexte: string = LireLigne(leFichier);
     * ~~~
     *
     */
    function LireLigne(fichier) {
        let leFichier = BiblioImpl.gFichiers.get(fichier);
        if (!leFichier) {
            throw "(LireLigne) Fichier invalide.";
        }
        else if (leFichier.ligne >= leFichier.lignes.length) {
            throw "(LireLigne) Fin du fichier.";
        }
        // TODO Déménager toute cette logique de lecture dans la classe Fichier
        let texte = leFichier.lignes[leFichier.ligne].substr(leFichier.colonne);
        leFichier.ligne++;
        leFichier.colonne = 0;
        return texte;
    }
    Programme.LireLigne = LireLigne;
    /**
     * Cette fonction lit du texte jusqu'au prochain espace blanc (espace, tab, newline, etc.).
     * La fonction retourne la string lue.
     * @param fichier Le fichier.
     *
     * Utilisation:
     * ~~~
     * let leFichier: Fichier = OuvrirFichier("test.txt");
     * let leTexte: string = LireTexte(leFichier);
     * ~~~
     *
     */
    function LireTexte(fichier) {
        let leFichier = BiblioImpl.gFichiers.get(fichier);
        if (!leFichier) {
            throw "(LireTexte) Fichier invalide.";
        }
        else if (leFichier.ligne >= leFichier.lignes.length) {
            throw "(LireTexte) Fin du fichier.";
        }
        // TODO Déménager toute cette logique de lecture dans la classe Fichier
        let ligne = leFichier.lignes[leFichier.ligne].substr(leFichier.colonne);
        let texte = ligne.trim();
        texte = texte.split(' ')[0];
        texte = texte.trim();
        leFichier.colonne += ligne.indexOf(texte) + texte.length;
        if (leFichier.colonne >= leFichier.lignes[leFichier.ligne].length) {
            leFichier.colonne = 0;
            leFichier.ligne++;
        }
        return texte;
    }
    Programme.LireTexte = LireTexte;
    /**
     * Cette fonction lit un nombre d'un fichier, jusqu'au prochain espace blanc (espace, tab, newline, etc.).
     * La fonction retourne le nombre lu.
     * @param fichier Le fichier.
     *
     * Utilisation:
     * ~~~
     * let leFichier: Fichier = OuvrirFichier("test.txt");
     * let unNombre: number = LireNombre(leFichier);
     * ~~~
     *
     */
    function LireNombre(fichier) {
        return TexteEnNombre(LireTexte(fichier));
    }
    Programme.LireNombre = LireNombre;
    /**
     * Cette fonction lit un booléen d'un fichier, jusqu'au prochain espace blanc (espace, tab, newline, etc.).
     * La fonction retourne le booléen lu. Dans le fichier, V représente Vrai et F représente Faux.
     * @param fichier Le fichier.
     *
     * Utilisation:
     * ~~~
     * let leFichier: Fichier = OuvrirFichier("test.txt");
     * let unBooleen: boolean = LireBooleen(leFichier);
     * ~~~
     *
     */
    function LireBooleen(fichier) {
        return (LireTexte(fichier) == "V");
    }
    Programme.LireBooleen = LireBooleen;
    /**
     * Cette fonction lit un nombre fixe de caractères du fichier.
     * La fonction retourne la string lue.
     * @param fichier Le fichier.
     * @param nombreCaracteres Le nombre de caractères à lire.
     *
     * Utilisation:
     * ~~~
     * let leFichier: Fichier = OuvrirFichier("test.txt");
     * let texteLongueurDix: string = LireCaracteres(leFichier, 10);
     * ~~~
     *
     */
    function LireCaracteres(fichier, nombreCaracteres) {
        let leFichier = BiblioImpl.gFichiers.get(fichier);
        if (!leFichier) {
            throw "(LireCaracteres) Fichier invalide.";
        }
        else if (leFichier.ligne >= leFichier.lignes.length) {
            throw "(LireCaracteres) Fin du fichier.";
        }
        let texte = leFichier.lignes[leFichier.ligne].substr(leFichier.colonne, nombreCaracteres);
        leFichier.colonne += nombreCaracteres;
        if (leFichier.colonne >= leFichier.lignes[leFichier.ligne].length) {
            leFichier.colonne = 0;
            leFichier.ligne++;
        }
        return texte;
    }
    Programme.LireCaracteres = LireCaracteres;
    /**
     * Cette fonction retourne un booléen indiquant si le fichier en paramètre peut être lu.
     * Si le fichier ouvert est valide et présent, et qu'on n'est pas déjà à sa fin, Vrai sera retourné.
     * Dans tous les autres cas, Faux sera retourné.
     * @param fichier Le fichier.
     *
     * Utilisation:
     * ~~~
     * let leFichier: Fichier = OuvrirFichier("test.txt");
     * while(FichierPeutLire(leFichier))            // Tant qu'il reste des lignes à lire
     * {
     *      let ligne = LireLigne(leFichier);       // Lire un ligne du fichier
     *      EcrireLigne( ligne );                   // Ecrire dans la console la ligne
     * }
     * FermerFichier(leFichier);                    // Fermer le fichier
     * ~~~
     *
     */
    function FichierPeutLire(fichier) {
        let leFichier = BiblioImpl.gFichiers.get(fichier);
        if (!leFichier) {
            throw "(FichierPeutLire) Fichier invalide.";
        }
        return (leFichier.ligne >= 0) && (leFichier.ligne < leFichier.lignes.length);
    }
    Programme.FichierPeutLire = FichierPeutLire;
    /**
     * Cette procédure ferme le fichier en paramètre. Ce fichier a été ouvert préalablement avec OuvrirFichier.
     * @param fichier Le fichier.
     *
     * Utilisation:
     * ~~~
     * let leFichier: Fichier = OuvrirFichier("test.txt");
     * // ...
     * FermerFichier(leFichier);
     * ~~~
     *
     */
    function FermerFichier(fichier) {
        if (BiblioImpl.gFichiers.has(fichier)) {
            BiblioImpl.gFichiers.delete(fichier);
        }
        else {
            throw "(FermerFichier) Fichier invalide.";
        }
    }
    Programme.FermerFichier = FermerFichier;
    //---------- GRAPHIQUE -------------------------------------------------------------------------------
    class Image {
    }
    Programme.Image = Image;
    /**
     * Cette fonction retourne une nouvelle image créée dans l'environnement de programmation.
     * @param nom Le nom de l'image.
     * @param largeur La largeur en pixels.
     * @param hauteur La hauteur en pixels.
     * @param rouge La quantité de rouge, comprise dans [0, 255].
     * @param vert La quantité de vert, comprise dans [0, 255].
     * @param bleu La quantité de bleu, comprise dans [0, 255].
     *
     * Utilisation:
     * ~~~
     * let image1 = CreerImage( "test1", 800, 600 );               // Une image de 800x600, toute blanche.
     * let image2 = CreerImage( "test2", 1024, 768, 0, 0, 0 );     // Une image de 1024x768, toute noire.
     * ~~~
     *
     */
    function CreerImage(nom, largeur, hauteur, rouge = 255, vert = 255, bleu = 255) {
        EcrireLigne("Création de l'image \"" + nom + "\"");
        let output = document.getElementById("output");
        output.appendChild(document.createElement("hr"));
        // Titre
        let titre = document.createElement("h2");
        titre.textContent = "Image \"" + nom + "\"";
        titre.className = "titre";
        output.appendChild(titre);
        // Enregistrer
        let boutonEnregistrer = document.createElement("a");
        boutonEnregistrer.href = "#";
        boutonEnregistrer.id = "enregistrer-" + nom;
        boutonEnregistrer.className = "bouton";
        boutonEnregistrer.textContent = "Enregistrer image";
        boutonEnregistrer.setAttribute("download", nom + ".png");
        boutonEnregistrer.addEventListener('click', function () {
            boutonEnregistrer.href = canvas.toDataURL('image/png');
        });
        output.appendChild(boutonEnregistrer);
        // Canvas
        let canvas = document.createElement('canvas');
        if (!canvas) {
            return null;
        }
        canvas.id = nom;
        canvas.className = 'canvas_image';
        canvas.width = largeur;
        canvas.height = hauteur;
        output.appendChild(canvas);
        // Ajoute l'image au registre des images
        let hImage = new Image();
        BiblioImpl.gImages.set(hImage, canvas);
        let contexte = canvas.getContext("2d");
        contexte.fillStyle = RVB(rouge, vert, bleu);
        contexte.fillRect(0, 0, largeur, hauteur);
        contexte.fillStyle = RVB(0, 0, 0);
        return hImage;
    }
    Programme.CreerImage = CreerImage;
    /**
     * Cette procédure charge un fichier image dans une image de l'environnement de programmation.
     * @param image L'image dans laquelle chargée le contenu du fichier : une image créée avec CreerImage.
     * @param nomFichier Le nom du fichier image à charger.
     *
     * Utilisation:
     * ~~~
     * let image : Image = CreerImage( "test", 800, 600 );
     * ChargerFichierImage(image, "mon_image.png");
     * ~~~
     *
     */
    function ChargerFichierImage(image, nomFichier) {
        // Forcer le rafraichissement du cache du navigateur
        nomFichier = nomFichier + "?ver=" + GUID();
        let canvas = BiblioImpl.gImages.get(image);
        // Info dans la console
        EcrireLigne("Demande de chargement du fichier \"" + nomFichier + "\" dans la zone image \"" + canvas.id + "\"");
        // Image
        let img = document.createElement("img");
        img.src = nomFichier;
        img.onload = function () {
            // Charger image dans le canvas
            //canvas.width = img.width;
            //canvas.height = img.height;
            let contexte = canvas.getContext('2d');
            contexte.drawImage(img, 0, 0);
        };
        img.onerror = function () {
            let contexte = canvas.getContext('2d');
            contexte.fillStyle = "red";
            contexte.font = "20px Arial";
            contexte.fillText("Fichier image introuvable : " + nomFichier, 25, 40);
        };
    }
    Programme.ChargerFichierImage = ChargerFichierImage;
    let gCouleurDessin = RVB(0, 0, 0);
    /**
     * Cette procédure configure la couleur pour dessiner dans une image de l'environnement de programmation.
     * @param rouge La quantité de rouge, comprise dans [0, 255].
     * @param vert La quantité de vert, comprise dans [0, 255].
     * @param bleu La quantité de bleu, comprise dans [0, 255].
     *
     * Utilisation:
     * ~~~
     * ChoisirCouleurDessin(0, 0, 0);        // Les dessins seront noir
     * ChoisirCouleurDessin(255, 0, 0);      // Les dessins seront rouge
     * ChoisirCouleurDessin(0, 255, 255);    // Les dessins seront turquoise
     * ~~~
     *
     */
    function ChoisirCouleurDessin(rouge, vert, bleu) {
        gCouleurDessin = RVB(rouge, vert, bleu);
    }
    Programme.ChoisirCouleurDessin = ChoisirCouleurDessin;
    let gLargeurLigne = 2;
    /**
     * Cette procédure configure la largeur du trait utilisé pour dessiner dans une image de l'environnement de programmation.
     * @param largeur La largeur du trait.
     *
     * Utilisation:
     * ~~~
     * ChoisirLargeurLigne(1);
     * ~~~
     *
     */
    function ChoisirLargeurLigne(largeur) {
        gLargeurLigne = largeur;
    }
    Programme.ChoisirLargeurLigne = ChoisirLargeurLigne;
    /**
     * Cette procédure dessine un rectangle vide dans une image de l'environnement de programmation.
     * @param image L'image dans laquelle dessiner.
     * @param x La coordonnée en X du coin supérieur gauche du rectangle, en pixels.
     * @param y La coordonnée en Y du coin supérieur gauche du rectangle, en pixels.
     * @param largeur La largeur du rectangle, en pixels.
     * @param hauteur La hauteur du rectangle, en pixels.
     *
     * Utilisation:
     * ~~~
     * ~~~
     *
     */
    function DessinerRectangle(image, x, y, largeur, hauteur) {
        let canvas = BiblioImpl.gImages.get(image);
        Verifier(!!canvas, "Zone image invalide.");
        let contexte = canvas.getContext("2d");
        contexte.strokeStyle = gCouleurDessin;
        contexte.lineWidth = gLargeurLigne;
        contexte.strokeRect(x, y, largeur, hauteur);
    }
    Programme.DessinerRectangle = DessinerRectangle;
    /**
     * Cette procédure dessine un rectangle plein dans une image de l'environnement de programmation.
     * @param image L'image dans laquelle dessiner.
     * @param x La coordonnée en X du coin supérieur gauche du rectangle, en pixels.
     * @param y La coordonnée en Y du coin supérieur gauche du rectangle, en pixels.
     * @param largeur La largeur du rectangle, en pixels.
     * @param hauteur La hauteur du rectangle, en pixels.
     *
     * Utilisation:
     * ~~~
     * ~~~
     *
     */
    function DessinerRectanglePlein(image, x, y, largeur, hauteur) {
        let canvas = BiblioImpl.gImages.get(image);
        Verifier(!!canvas, "Zone image invalide.");
        let contexte = canvas.getContext("2d");
        contexte.fillStyle = gCouleurDessin;
        contexte.fillRect(x, y, largeur, hauteur);
    }
    Programme.DessinerRectanglePlein = DessinerRectanglePlein;
    /**
     * Cette procédure dessine un cercle vide dans une image de l'environnement de programmation.
     * @param image L'image dans laquelle dessiner.
     * @param centreX La coordonnée en X du centre du cercle, en pixels.
     * @param centreY La coordonnée en Y du centre du cercle, en pixels.
     * @param rayon Le rayon du cercle, en pixels.
     *
     * Utilisation:
     * ~~~
     * ~~~
     *
     */
    function DessinerCercle(image, centreX, centreY, rayon) {
        let canvas = BiblioImpl.gImages.get(image);
        Verifier(!!canvas, "Zone image invalide.");
        let contexte = canvas.getContext("2d");
        contexte.beginPath();
        contexte.arc(centreX, centreY, rayon, 0, 2 * Pi(), false);
        contexte.lineWidth = gLargeurLigne;
        contexte.strokeStyle = gCouleurDessin;
        contexte.stroke();
    }
    Programme.DessinerCercle = DessinerCercle;
    /**
     * Cette procédure dessine un cercle plein dans une image de l'environnement de programmation.
     * @param image L'image dans laquelle dessiner.
     * @param centreX La coordonnée en X du centre du cercle, en pixels.
     * @param centreY La coordonnée en Y du centre du cercle, en pixels.
     * @param rayon Le rayon du cercle, en pixels.
     *
     * Utilisation:
     * ~~~
     * ~~~
     *
     */
    function DessinerCerclePlein(image, centreX, centreY, rayon) {
        let canvas = BiblioImpl.gImages.get(image);
        Verifier(!!canvas, "Zone image invalide.");
        let contexte = canvas.getContext("2d");
        contexte.beginPath();
        contexte.arc(centreX, centreY, rayon, 0, 2 * Pi(), false);
        contexte.fillStyle = gCouleurDessin;
        contexte.fill();
    }
    Programme.DessinerCerclePlein = DessinerCerclePlein;
    /**
     * Cette procédure dessine un triangle vide dans une image de l'environnement de programmation.
     * @param image L'image dans laquelle dessiner.
     * @param x1 La coordonnée en X du premier point du triangle, en pixels.
     * @param y1 La coordonnée en Y du premier point du triangle, en pixels.
     * @param x2 La coordonnée en X du deuxième point du triangle, en pixels.
     * @param y2 La coordonnée en Y du deuxième point du triangle, en pixels.
     * @param x3 La coordonnée en X du troisième point du triangle, en pixels.
     * @param y3 La coordonnée en Y du troisième point du triangle, en pixels.
     *
     * Utilisation:
     * ~~~
     * ~~~
     *
     */
    function DessinerTriangle(image, x1, y1, x2, y2, x3, y3) {
        let canvas = BiblioImpl.gImages.get(image);
        Verifier(!!canvas, "Zone image invalide.");
        let contexte = canvas.getContext("2d");
        contexte.strokeStyle = gCouleurDessin;
        contexte.lineWidth = gLargeurLigne;
        contexte.beginPath();
        contexte.moveTo(x1, y1);
        contexte.lineTo(x2, y2);
        contexte.lineTo(x3, y3);
        contexte.closePath();
        contexte.stroke();
    }
    Programme.DessinerTriangle = DessinerTriangle;
    /**
     * Cette procédure dessine un triangle plein dans une image de l'environnement de programmation.
     * @param image L'image dans laquelle dessiner.
     * @param x1 La coordonnée en X du premier point du triangle, en pixels.
     * @param y1 La coordonnée en Y du premier point du triangle, en pixels.
     * @param x2 La coordonnée en X du deuxième point du triangle, en pixels.
     * @param y2 La coordonnée en Y du deuxième point du triangle, en pixels.
     * @param x3 La coordonnée en X du troisième point du triangle, en pixels.
     * @param y3 La coordonnée en Y du troisième point du triangle, en pixels.
     *
     * Utilisation:
     * ~~~
     * ~~~
     *
     */
    function DessinerTrianglePlein(image, x1, y1, x2, y2, x3, y3) {
        let canvas = BiblioImpl.gImages.get(image);
        Verifier(!!canvas, "Zone image invalide.");
        let contexte = canvas.getContext("2d");
        contexte.fillStyle = gCouleurDessin;
        contexte.beginPath();
        contexte.moveTo(x1, y1);
        contexte.lineTo(x2, y2);
        contexte.lineTo(x3, y3);
        contexte.closePath();
        contexte.fill();
    }
    Programme.DessinerTrianglePlein = DessinerTrianglePlein;
    /**
     * Cette procédure dessine une ligne dans une image de l'environnement de programmation.
     * @param image L'image dans laquelle dessiner.
     * @param x1 La coordonnée en X de la première extrémité de la ligne, en pixels.
     * @param y1 La coordonnée en Y de la première extrémité de la ligne, en pixels.
     * @param x2 La coordonnée en X de la deuxième extrémité de la ligne, en pixels.
     * @param y2 La coordonnée en Y de la deuxième extrémité de la ligne, en pixels.
     *
     * Utilisation:
     * ~~~
     * ~~~
     *
     */
    function DessinerLigne(image, x1, y1, x2, y2) {
        let canvas = BiblioImpl.gImages.get(image);
        Verifier(!!canvas, "Zone image invalide.");
        let contexte = canvas.getContext("2d");
        contexte.strokeStyle = gCouleurDessin;
        contexte.lineWidth = gLargeurLigne;
        contexte.beginPath();
        contexte.moveTo(x1, y1);
        contexte.lineTo(x2, y2);
        contexte.closePath();
        contexte.stroke();
    }
    Programme.DessinerLigne = DessinerLigne;
    /**
     * Cette procédure dessine du texte dans une image de l'environnement de programmation.
     * @param image L'image dans laquelle dessiner.
     * @param texte La string à dessiner.
     * @param police La police de caractères à utiliser pour dessiner le texte.
     * @param x La coordonnée en X du premier caractère, en pixels.
     * @param y La coordonnée en Y du premier caractère, en pixels.
     *
     * Utilisation:
     * ~~~
     * ~~~
     *
     */
    function DessinerTexte(image, texte, police, x, y) {
        let canvas = BiblioImpl.gImages.get(image);
        Verifier(!!canvas, "Zone image invalide.");
        let contexte = canvas.getContext("2d");
        contexte.fillStyle = gCouleurDessin;
        contexte.font = police;
        contexte.fillText(texte, x, y);
    }
    Programme.DessinerTexte = DessinerTexte;
    //---------- GRILLE -------------------------------------------------------------------------------
    class Grille {
        constructor(largeurCell, hauteurCell, coinX, coinY) {
            this.largeurCell = largeurCell;
            this.hauteurCell = hauteurCell;
            this.coinX = coinX;
            this.coinY = coinY;
        }
        x(colonne) {
            colonne++;
            return this.coinX + (colonne * this.largeurCell) - (this.largeurCell / 2);
        }
        y(ligne) {
            ligne++;
            return this.coinY + (ligne * this.hauteurCell) - (this.hauteurCell / 2);
        }
    }
    let grille = null;
    /**
     * Cette procédure dessine une grille dans une image de l'environnement de programmation.
     * @param image L'image dans laquelle dessiner.
     * @param nbrLignes Le nombre de lignes dans la grille.
     * @param nbrColonnes Le nombre de colonnes dans la grille.
     *
     * Utilisation:
     * ~~~
     * let imageGrille : Image = CreerImage( "Ma grille", 800, 800 );
     * InitialiserGrille( imageGrille, 8, 8 );
     * ~~~
     *
     */
    function InitialiserGrille(image, nbrLignes, nbrColonnes) {
        let canvas = BiblioImpl.gImages.get(image);
        Verifier(!!canvas, "Canvas invalide.");
        ChoisirLargeurLigne(1);
        ChoisirCouleurDessin(0, 0, 0);
        let largeurImg = canvas.width;
        let hauteurImg = canvas.height;
        let bordurePourcent = 0.05;
        let bordureX = largeurImg * bordurePourcent;
        let bordureY = hauteurImg * bordurePourcent;
        let pasX = (largeurImg - (2 * bordureX)) / nbrColonnes;
        pasX = Maximum(pasX, 1);
        let pasY = (hauteurImg - (2 * bordureY)) / nbrLignes;
        pasY = Maximum(pasY, 1);
        let txtPixels = 12;
        let largeurCarac = txtPixels * 0.5; // Caractères deux fois plus haut que large
        for (let dy = 0; dy <= nbrLignes; ++dy) {
            let y = bordureY + (dy * pasY);
            DessinerLigne(image, bordureX, y, largeurImg - bordureX, y);
            if (dy < nbrLignes) {
                let ligneTxt = NombreEnTexte(dy + 1, 0);
                DessinerTexte(image, ligneTxt, NombreEnTexte(txtPixels, 0) + "px monospace", bordureX * 0.5 - (ligneTxt.length * largeurCarac) / 2, y + (pasY / 2) + txtPixels / 2);
            }
        }
        for (let dx = 0; dx <= nbrColonnes; ++dx) {
            let x = bordureX + (dx * pasX);
            DessinerLigne(image, x, bordureY, x, hauteurImg - bordureY);
            if (dx < nbrColonnes) {
                let colTxt = NombreEnTexte(dx + 1, 0);
                DessinerTexte(image, colTxt, NombreEnTexte(txtPixels, 0) + "px monospace", x + (pasX / 2) - (colTxt.length * largeurCarac) / 2, bordureY * 0.5 + largeurCarac / 2);
            }
        }
        grille = new Grille(pasX, pasY, bordureX, bordureY);
    }
    Programme.InitialiserGrille = InitialiserGrille;
    /**
     * Cette procédure dessine un cercle dans une des cellules de la grille.
     * @param image L'image dans laquelle dessiner.
     * @param ligneCell La ligne de la cellule.
     * @param colonneCell La colonne de la cellule.
     *
     * Utilisation:
     * ~~~
     * ~~~
     *
     */
    function DessinerCercleSurGrille(image, ligneCell, colonneCell) {
        Verifier(!!grille, "Grille non-initialisée.");
        DessinerCerclePlein(image, grille.x(colonneCell), grille.y(ligneCell), Minimum(grille.largeurCell / 2, grille.hauteurCell / 2));
    }
    Programme.DessinerCercleSurGrille = DessinerCercleSurGrille;
    /**
     * Cette procédure dessine un carré dans une des cellules de la grille.
     * @param image L'image dans laquelle dessiner.
     * @param ligneCell La ligne de la cellule.
     * @param colonneCell La colonne de la cellule.
     *
     * Utilisation:
     * ~~~
     * ~~~
     *
     */
    function DessinerCarreSurGrille(image, ligneCell, colonneCell) {
        Verifier(!!grille, "Grille non-initialisée.");
        let minX = grille.x(colonneCell) - grille.largeurCell / 2;
        let minY = grille.y(ligneCell) - grille.hauteurCell / 2;
        DessinerRectanglePlein(image, minX, minY, grille.largeurCell, grille.hauteurCell);
    }
    Programme.DessinerCarreSurGrille = DessinerCarreSurGrille;
    /**
     * Cette procédure dessine un triangle dans une des cellules de la grille.
     * @param image L'image dans laquelle dessiner.
     * @param ligneCell La ligne de la cellule.
     * @param colonneCell La colonne de la cellule.
     *
     * Utilisation:
     * ~~~
     * ~~~
     *
     */
    function DessinerTriangleSurGrille(image, ligneCell, colonneCell) {
        Verifier(!!grille, "Grille non-initialisée.");
        let x = grille.x(colonneCell);
        let y = grille.y(ligneCell);
        let demiH = grille.hauteurCell / 2;
        let demiL = grille.largeurCell / 2;
        DessinerTrianglePlein(image, x - demiL, y + demiH, x, y - demiH, x + demiL, y + demiH);
    }
    Programme.DessinerTriangleSurGrille = DessinerTriangleSurGrille;
    /**
     * Cette procédure dessine un losange dans une des cellules de la grille.
     * @param image L'image dans laquelle dessiner.
     * @param ligneCell La ligne de la cellule.
     * @param colonneCell La colonne de la cellule.
     *
     * Utilisation:
     * ~~~
     * ~~~
     *
     */
    function DessinerLosangeSurGrille(image, ligneCell, colonneCell) {
        Verifier(!!grille, "Grille non-initialisée.");
        let x = grille.x(colonneCell);
        let y = grille.y(ligneCell);
        let demiH = grille.hauteurCell / 2;
        let demiL = grille.largeurCell / 2;
        DessinerTrianglePlein(image, x - demiL, y, x, y - demiH, x + demiL, y);
        DessinerTrianglePlein(image, x - demiL, y, x, y + demiH, x + demiL, y);
    }
    Programme.DessinerLosangeSurGrille = DessinerLosangeSurGrille;
    //---------- AUDIO -------------------------------------------------------------------------------
    let audio;
    class Son {
        constructor(frequenceHZ, dureeMS) {
            this.frequenceHZ = frequenceHZ;
            this.dureeMS = dureeMS;
            this.oscillator_ = audio.createOscillator();
            this.oscillator_.connect(audio.destination);
            this.oscillator_.frequency.value = frequenceHZ;
        }
        start() {
            this.oscillator_.start(0);
            setTimeout(JouerProchainSon, this.dureeMS);
        }
        stop() {
            this.oscillator_.stop(0);
        }
    }
    let sons = [];
    function JouerProchainSon() {
        if (sons.length > 0) {
            sons[0].stop();
            sons.shift();
            if (sons.length > 0) {
                sons[0].start();
            }
        }
    }
    function EstIE() {
        return (navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > 0);
    }
    /**
     * Cette procédure produit un son par la vibration du haut-parleur interne à une fréquence spécifiée pour une durée spécifiée.
     * @param frequenceHZ La fréquence de vibration en hertz.
     * @param dureeMS La durée du son en millisecondes.
     *
     * Utilisation:
     * ~~~
     * const gamme = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25];
     * for ( let g = 0; g < Taille( gamme ); ++g )
     * {
     *     JouerFrequence( gamme[g], 500 );
     * }
     * ~~~
     *
     */
    function JouerFrequence(frequenceHZ, dureeMS) {
        if (!EstIE()) // Pas supporté sur Internet Explorer
         {
            if (!audio) {
                audio = new AudioContext();
            }
            let nouveauSon = new Son(frequenceHZ, dureeMS);
            sons.push(nouveauSon);
            if (sons.length == 1) {
                nouveauSon.start();
            }
        }
    }
    Programme.JouerFrequence = JouerFrequence;
    /**
     * Cette procédure joue un son WAV.
     * @param nomFichier Le nom du fichier WAV à jouer.
     *
     * Utilisation:
     * ~~~
     * ~~~
     *
     */
    function JouerFichierSon(nomFichier) {
        // Forcer le rafraichissement du cache du navigateur
        nomFichier = nomFichier + "?ver=" + GUID();
        Verifier(!!Audio, "Audio non-supporté sur ce navigateur");
        if (Audio) {
            let audioDuFichier = document.createElement("Audio");
            audioDuFichier.src = nomFichier;
            audioDuFichier.autoplay = true;
        }
    }
    Programme.JouerFichierSon = JouerFichierSon;
    /**
     * Cette procédure suspend l'exécution du programme pour le durée spécifiée en paramètre.
     * @param millisecondes Le nombre de millisecondes pour lequel l'exécution est suspendue.
     *
     * Utilisation:
     * ~~~
     * Dormir( 1000 );  // Dormir 1 seconde
     * ~~~
     *
     */
    function Dormir(millisecondes) {
        let debut = Date.now();
        while (Date.now() - debut < millisecondes) { }
    }
    Programme.Dormir = Dormir;
})(Programme || (Programme = {}));
//# sourceMappingURL=biblio.js.map