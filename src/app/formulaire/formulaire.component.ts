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

  translate_heure(heure) {
    return writtenNumber(heure, {lang: 'fr'});
  }

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



  policiers :Policier[] = [];
  interpels :Interpel[] = [];

  appel :Appel = {
    appelant : "TNF",
    heure : '',
    lieu : '',
    cpt_lieu: '',
    nb_baigneurs : null,
    nom_vedette : ''
  };

  surplace :Surplace = {
    heure : '',
    lieu : '',
    cpt_lieu: '',
    nb_baigneurs : null,
    infos_complementaires : ''
  };

  nom_policier : string;
  prenom_policier : string;
  grade_policier : string;
  fonction_policier : string;
  redacteur_policier : boolean = false;

  type_doc_interpel :string;
  num_doc_interpel : string;
  nom_interpel :string;
  prenom_interpel :string;
  date_naissance_interpel :string;
  lieu_naissance_interpel :string;
  tel_interpel :string;
  adresse_interpel :string;
  ville_interpel :string;
  code_interpel :string;
  profession_interpel :string;
  recherche_interpel :string;
  infos_recherche :string;
  

  autre_nom_vedette :string = '';
  id_pv : any;
  erreurs_envoi : string[] = [];

  villes = [
    {ville:'PARIS', cp:'75001'},
    {ville:'PARIS', cp:'75002'},
    {ville:'PARIS', cp:'75003'},
    {ville:'PARIS', cp:'75004'},
    {ville:'PARIS', cp:'75005'},
    {ville:'PARIS', cp:'75006'},
    {ville:'PARIS', cp:'75007'},
    {ville:'PARIS', cp:'75008'},
    {ville:'PARIS', cp:'75009'},
    {ville:'PARIS', cp:'75010'},
    {ville:'PARIS', cp:'75011'},
    {ville:'PARIS', cp:'75012'},
    {ville:'PARIS', cp:'75013'},
    {ville:'PARIS', cp:'75014'},
    {ville:'PARIS', cp:'75015'},
    {ville:'PARIS', cp:'75016'},
    {ville:'PARIS', cp:'75017'},
    {ville:'PARIS', cp:'75018'},
    {ville:'PARIS', cp:'75019'},
    {ville:'PARIS', cp:'75020'},
    {ville:'CLICHY', cp:'92110'},
    {ville:'COLOMBES', cp:'92700'},
    {ville:'COURBEVOIE', cp:'92400'},
    {ville:'EPINAY-SUR-SEINE', cp:'93800'},
    {ville:'GENNEVILLIERS', cp:'92230'},
    {ville:'ISSY-LES-MOULINEAUX', cp:'92130'},
    {ville:'LEVALLOIS-PERRET', cp:'92300'},
    {ville:'L\'ILE-SAINT-DENIS', cp:'93450'},
    {ville:'NANTERRE', cp:'92014'},
    {ville:'NEUILLY-SUR-SEINE', cp:'92200'},
    {ville:'PUTEAUX', cp:'92800'},
    {ville:'SAINT-DENIS', cp:'93200'},
    {ville:'SAINT-OUEN', cp:'93400'},
    {ville:'SURNESNES', cp:'92150'},
    {ville:'VILLENEUVE-LA-GARENNE', cp:'92390'}
]


  envoi(apercu_pvblanc) {
    // On vide le tableau des erreurs avant de les injecter si il y en a
    this.erreurs_envoi = [];
    if(!this.redacteur)
    {
      this.erreurs_envoi.push(" Envoi annulé : Aucun rédacteur du PV n'a été renseigné. Veuillez en renseigner un dans les membres de l'équipage.");
    }
    if(this.policiers.length == 0)
    {
      this.erreurs_envoi.push(" Envoi annulé : Aucun membre d'équipage n'a été ajouté. Veuillez en ajouter au moins un.");
    }
    if(this.interpels.length == 0)
    {
      this.erreurs_envoi.push(" Envoi annulé : Aucun interpellé n'a été ajouté. Veuillez en ajouter au moins un.");
    }
    if(this.appel.heure == '' || this.appel.lieu == '' || this.appel.nb_baigneurs == null || this.appel.nom_vedette == '' )
    {
      this.erreurs_envoi.push(" Envoi annulé : Un champ de la catégorie APPEL n'a pas été rempli. Veuillez le remplir.");
    }
    if(this.surplace.heure == '' || this.surplace.lieu== '' || this.surplace.nb_baigneurs== null )
    {
      this.erreurs_envoi.push(" Envoi annulé : Un champ de la catégorie SUR PLACE n'a pas été rempli. Veuillez le remplir.");
    }
    if(this.appel.nom_vedette == 'Autre' && this.autre_nom_vedette == '')
    {
      this.erreurs_envoi.push("Envoi annulé : Le nom de la vedette n'a pas été renseigné.");
    }
    if(this.erreurs_envoi.length == 0)
    {
      let plainte_id : string;
      let full_appercu = '<html><head><meta charset="UTF-8" /><title>PV BLANC</title></head><body><table border="1" cellpadding="10">' + apercu_pvblanc.innerHTML + '</table></body></html>';
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

          this.erreurs_envoi.push("Le PV n'a pas pu être envoyé, vérifiez votre connexion internet ou réesayez plus tard.");

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
      grade: this.grade_policier,
      fonction: this.fonction_policier,
      redacteur: this.redacteur_policier
    });

    this.reset_policier();
    this.check_redacteur();
    this.check_fonction_redacteur();
    //this.tri_policiers();

    console.log(writtenNumber(1234785645, { lang: 'fr' })); // => 'mille deux cent trente-quatre'

  }


  supprimer_policier(id_policier)
  {
    if(confirm("Voulez-vous vraiment supprimer ce policier ?")){
      this.policiers.splice(id_policier, 1);
      this.check_redacteur();
      this.check_fonction_redacteur();
    }
  }

  modifier_policier(id_policier)
  {
    this.nom_policier = this.policiers[id_policier].nom;
    this.prenom_policier = this.policiers[id_policier].prenom;
    this.grade_policier = this.policiers[id_policier].grade;
    this.fonction_policier = this.policiers[id_policier].fonction;
    this.redacteur_policier = this.policiers[id_policier].redacteur;

    this.policiers.splice(id_policier, 1);
    this.check_redacteur();
    this.check_fonction_redacteur();
  }

  reset_policier()
  {
    this.nom_policier = "";
    this.prenom_policier = "";
    this.grade_policier = "";
    this.fonction_policier = "";
    this.redacteur_policier = false;
  }

  // Y-a-t-il un redacteur de PV inscrit dans l'équipage
  redacteur:boolean = false;

  fonction_redacteur:string = "";

  // Vérifie si un rédacteur de PV est présent dans les membres de l'équipage
  check_redacteur()
  {
    var redacteur;
    this.policiers.forEach(function(element){
      if(element.redacteur)
      redacteur = true;
    })
    this.redacteur = redacteur;
  }

  check_fonction_redacteur()
  {
    var fonction;
    this.policiers.forEach(function(element){
      if(element.redacteur){
        fonction = element.fonction;
      }
    });
    this.fonction_redacteur = fonction;
  }

  // retourne le niveau du grade envoyé en paramètre
  lvl_grade(grade:string)
  {
    switch(grade)
    {
      case "GPX":
      return 1;
      case "Brigadier de Police":
      return 2;
      case "Brigadier Chef de Police":
      return 3;
      case "Major":
      return 4;
      case "Lieutenant":
      return 5;
      case "Capitaine":
      return 6;
      case "Commandant":
      return 7;
    }
  }

  // Compare le grade du rédacteur à celui envoyé en paramètre
  check_assistance(grade_policier:string)
  {
    var grade_redacteur;
    this.policiers.forEach(function(element){
      if(element.redacteur)
        grade_redacteur = element.grade;
    })
    var lvl_grade_redacteur = this.lvl_grade(grade_redacteur);
    var lvl_grade_policier = this.lvl_grade(grade_policier);

    if(lvl_grade_redacteur >= lvl_grade_policier)
      return "Assisté du";
    else
      return "Sous les ordres de";
  }

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
      profession : this.profession_interpel,
      recherche : this.recherche_interpel,
      infos_recherche : this.infos_recherche,


    });
    this.reset_interpel();
  }
  supprimer_interpel(id_interpel)
  {
    if(confirm("Voulez-vous vraiment supprimer cet interpelé ?"))
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
    this.profession_interpel = this.interpels[id_interpel].profession;
    this.recherche_interpel = this.interpels[id_interpel].recherche;
    this.infos_recherche = this.interpels[id_interpel].infos_recherche;

    this.interpels.splice(id_interpel, 1);
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
    this.profession_interpel = '';
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
