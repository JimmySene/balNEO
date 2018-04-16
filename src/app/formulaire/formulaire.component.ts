import { Component, OnInit } from '@angular/core';
import { Appel } from '../appel';
import { Interpel } from '../interpel';
import { Policier } from '../policier';
import { Surplace } from '../surplace';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';

import * as writtenNumber from 'written-number';



@Injectable()
@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.css']
})
export class FormulaireComponent implements OnInit {

constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    window.scrollTo(0, 0);
  }

  date = new Date();
  annee = writtenNumber(this.date.getFullYear(), { lang: 'fr'});
  mois = this.translate_mois(this.date.getMonth());
  jour = writtenNumber(this.date.getDay(), { lang: 'fr'});
  heure = writtenNumber(this.date.getHours(), { lang: 'fr'});
  minutes = writtenNumber(this.date.getMinutes(), { lang: 'fr'});

  translate_mois(mois) {
    switch(mois){
      case 0:
        return "Janvier";

      case 1:
        return "Février";

      case 2:
        return "Mars";

      case 3:
        return "Avril";

      case 4:
        return "Mai";

      case 5:
        return "Juin";

      case 6:
        return "Juillet";

      case 7:
        return "Août";

      case 8:
        return "Septembre";

      case 9:
        return "Octobre";

      case 10:
        return "Novembre";

      case 11:
        return "Décembre";

    }
  }

  erreur_envoi : string;

  policiers :Policier[] = [

  ];

  nom_policier :string = "";
  prenom_policier :string = "";
  grade_policier :string = "GPX";

  id_pv:any;



envoi(apercu_pvblanc) {



console.log(this.prenom_policier);

if(this.prenom_policier != '' || this.nom_policier != '' )
{
  this.erreur_envoi = " Envoi annulé: Un champs dans la rubrique [Equipage] n'as pas était enregistré. Veuillez vider le champs ou appuyez sur le bouton [Ajouter Policier]";

}
if(this.prenom_interpel != '' || this.nom_interpel != '' || this.tel_interpel != '' || this.adresse_interpel != '')
{
  this.erreur_envoi = " Envoi annulé: Un champs dans la rubrique [Individu controlé] n'as pas était enregistré. Veuillez vider le champs ou appuyez sur le bouton [Ajouter l'individu]";
}


if(this.prenom_policier == '' && this.nom_policier == '' && this.prenom_interpel == '' && this.nom_interpel == '' && this.tel_interpel == '' && this.adresse_interpel == '')
{
 let plainte_id: string;
  let full_appercu = '<html><head><meat charset="UTF-8" /></head><body><table border="1" cellpadding="10">' + apercu_pvblanc.innerHTML + '</table></body></html>';
 this.httpClient
 .put('http://plf.poc.plf-sso.ppol.minint.fr/plaintes',full_appercu, {responseType: 'text'})
 .subscribe(
         (plainte_id) => {
           console.log('L\'id de la plainte est : ', plainte_id);
           var pvs = '{"titre":"Pv blanc","fichierPlainte":"'+plainte_id+'"}';

           console.log(pvs);
           this.httpClient
           .post('http://plf.poc.plf-sso.ppol.minint.fr/mails',JSON.parse(pvs))
           .subscribe(
             () =>{
                 window.location.reload();
             }

           );

         },
         (error) => {

           console.log('erreur');
           console.log(error);

           this.erreur_envoi = "Le PV n'a pas pu être envoyé, vérifiez votre connection internet ou réesayez plus tard";

         },
         () => {
           console.log('fin');
         }
       );
}
}

  ajouter_policier(el)
  {
    el.scrollIntoView();
    this.policiers.push({
      nom: this.nom_policier,
      prenom: this.prenom_policier,
      grade: this.grade_policier
    });

    this.reset_policier();
    //this.tri_policiers();

    console.log(writtenNumber(1234785645, { lang: 'fr' })); // => 'mille deux cent trente-quatre'

  }


  supprimer_policier(id_policier)
  {
    this.policiers.splice(id_policier, 1);
  }

  modifier_policier(id_policier)
  {
    this.nom_policier = this.policiers[id_policier].nom;
    this.prenom_policier = this.policiers[id_policier].prenom;
    this.grade_policier = this.policiers[id_policier].grade;

    this.supprimer_policier(id_policier);
  }

  reset_policier()
  {
    this.nom_policier = "";
    this.prenom_policier = "";
    this.grade_policier = "GPX";
  }

  appel :Appel = {
    appelant : "TNF",
    heure : '',
    lieu : '',
    nb_baigneurs : null,
    nom_vedette : ''
  };

  surplace :Surplace = {
    heure : '',
    lieu : '',
    nb_baigneurs : null,
    infos_complementaires : ''
  };

  interpels :Interpel[] = [

  ];

  type_doc_interpel :string = "Carte d'identité";
  num_doc_interpel : string;
  nom_interpel :string = "";
  prenom_interpel :string = "";
  date_naissance_interpel :string;
  lieu_naissance_interpel : string;
  tel_interpel :string = "";
  adresse_interpel :string = "";
  ville_interpel :string;
  code_interpel :string;
  recherche_interpel :string;
  infos_recherche :string;

  ajouter_interpel(el) {
    el.scrollIntoView();
      this.interpels.push({
      type_doc : this.type_doc_interpel,
      num_doc : this.num_doc_interpel,
      nom : this.nom_interpel,
      prenom : this.prenom_interpel,
      date_naissance : this.date_naissance_interpel,
      lieu_naissance : this.lieu_naissance_interpel,
      tel : this.tel_interpel,
      adresse : this.adresse_interpel,
      ville : this.ville_interpel,
      code_postal : this.code_interpel,
      recherche : this.recherche_interpel,
      infos_recherche : this.infos_recherche,


  });
  this.reset_interpel();
}
  supprimer_interpel(id_interpel)
  {
    this.interpels.splice(id_interpel, 1);
  }

  modifier_interpel(id_interpel)
  {
      this.type_doc_interpel = this.interpels[id_interpel].type_doc;
      this.num_doc_interpel = this.interpels[id_interpel].num_doc;
      this.nom_interpel = this.interpels[id_interpel].nom;
      this.prenom_interpel = this.interpels[id_interpel].prenom;
      this.date_naissance_interpel = this.interpels[id_interpel].date_naissance;
      this.lieu_naissance_interpel = this.interpels[id_interpel].lieu_naissance;
      this.tel_interpel = this.interpels[id_interpel].tel;
      this.adresse_interpel = this.interpels[id_interpel].adresse;
      this.ville_interpel = this.interpels[id_interpel].ville;
      this.code_interpel = this.interpels[id_interpel].code_postal;
      this.recherche_interpel = this.interpels[id_interpel].recherche;
      this.infos_recherche = this.interpels[id_interpel].infos_recherche;

      this.supprimer_interpel(id_interpel);
  }

  reset_interpel()
  {
    this.type_doc_interpel = "Carte d'identité";
    this.num_doc_interpel = '';
    this.nom_interpel = '';
    this.prenom_interpel = '';
    this.date_naissance_interpel = '';
    this.lieu_naissance_interpel = '';
    this.tel_interpel = '';
    this.adresse_interpel = '';
    this.ville_interpel = '';
    this.code_interpel = '';
    this.recherche_interpel = 'false';
    this.infos_recherche = '';
  }
/*
  recherche = false;
  test_recherche(rech) {
    this.recherche = rech;
  }
*/
}
