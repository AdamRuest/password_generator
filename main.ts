/// <reference path="./biblio.ts" />
// Voir la documentation Biblio sur https://www.binarez.com/biblio/modules/_biblio_.programme.html

module Programme
{
    export function main() : void
    {
        let ini1: string = ObtenirTexte("Entrer votre prénom: ").toLowerCase()[0];
        let ini2: string = ObtenirTexte("Entrer votre nom: ").toLowerCase()[0];
        let voyelle: string[] = ["a", "e", "i", "o", "u", "y"];
        let consonne: string[] = ["b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "v", "w", "x", "z"];
        let motDePasse: string = SyllableUnDeux(ini1, voyelle, ini2, consonne) + RandomConsonne(consonne) + RandomVoyelle(voyelle) + GetRandomNumber();
        EcrireLigne("Mot de passe: " + motDePasse)
    }
    function SyllableUnDeux(ini1: string, voyelle: string[], ini2: string, consonne: string[]): string
    {
        if (voyelle.indexOf(ini1) == -1 && voyelle.indexOf(ini2) == -1)
        {
            return ini1 + RandomVoyelle(voyelle) + ini2 + RandomVoyelle(voyelle);
        }
        else if (voyelle.indexOf(ini1) != -1 && consonne.indexOf(ini2) != -1)
        {
            return ini2 + ini1 + RandomConsonne(consonne) + RandomVoyelle(voyelle);
        }
        else if (consonne.indexOf(ini1) != -1 && voyelle.indexOf(ini2) != -1)
        {
            return ini1 + ini2 + RandomConsonne(consonne) + RandomVoyelle(voyelle);
        }
        else
        {
            return RandomConsonne(consonne) + ini1 + RandomConsonne(consonne) + ini2;
        }
    }
    function RandomVoyelle(voyelle: string[]): string
    {
        let randChar: string = "";
        while (voyelle.indexOf(randChar) == -1)
        {
            randChar = String.fromCharCode(EntierAuHasard(1, 26) + 97);
        }
        return randChar;
    }
    function RandomConsonne(consonne: string[]): string
    {
        let randChar: string = "";
        while (consonne.indexOf(randChar) == -1)
        {
            randChar = String.fromCharCode(EntierAuHasard(1, 26) + 97);
        }
        return randChar
    }
    function GetRandomNumber(): string
    {
        let randomNumber: number = EntierAuHasard(1, 99) + 100;
        let randomNumberString: string = randomNumber.toString();
        return randomNumberString[1] + randomNumberString[2];
    }
}