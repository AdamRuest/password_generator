/// <reference path="./biblio.ts" />
// Voir la documentation Biblio sur https://www.binarez.com/biblio/modules/_biblio_.programme.html
var Programme;
(function (Programme) {
    function main() {
        let ini1 = Programme.ObtenirTexte("Entrer votre prénom: ").toLowerCase()[0];
        let ini2 = Programme.ObtenirTexte("Entrer votre nom: ").toLowerCase()[0];
        let voyelle = ["a", "e", "i", "o", "u", "y"];
        let consonne = ["b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "v", "w", "x", "z"];
        let motDePasse = SyllableUnDeux(ini1, voyelle, ini2, consonne) + RandomConsonne(consonne) + RandomVoyelle(voyelle) + GetRandomNumber();
        Programme.EcrireLigne("Mot de passe: " + motDePasse);
    }
    Programme.main = main;
    function SyllableUnDeux(ini1, voyelle, ini2, consonne) {
        if (voyelle.indexOf(ini1) == -1 && voyelle.indexOf(ini2) == -1) {
            return ini1 + RandomVoyelle(voyelle) + ini2 + RandomVoyelle(voyelle);
        }
        else if (voyelle.indexOf(ini1) != -1 && consonne.indexOf(ini2) != -1) {
            return ini2 + ini1 + RandomConsonne(consonne) + RandomVoyelle(voyelle);
        }
        else if (consonne.indexOf(ini1) != -1 && voyelle.indexOf(ini2) != -1) {
            return ini1 + ini2 + RandomConsonne(consonne) + RandomVoyelle(voyelle);
        }
        else {
            return RandomConsonne(consonne) + ini1 + RandomConsonne(consonne) + ini2;
        }
    }
    function RandomVoyelle(voyelle) {
        let randChar = "";
        while (voyelle.indexOf(randChar) == -1) {
            randChar = String.fromCharCode(Programme.EntierAuHasard(1, 26) + 97);
        }
        return randChar;
    }
    function RandomConsonne(consonne) {
        let randChar = "";
        while (consonne.indexOf(randChar) == -1) {
            randChar = String.fromCharCode(Programme.EntierAuHasard(1, 26) + 97);
        }
        return randChar;
    }
    function GetRandomNumber() {
        let randomNumber = Programme.EntierAuHasard(1, 99) + 100;
        let randomNumberString = randomNumber.toString();
        return randomNumberString[1] + randomNumberString[2];
    }
})(Programme || (Programme = {}));
//# sourceMappingURL=main.js.map