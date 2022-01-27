
## Titre du TFE

Développement d'un système d'information pour l'entreprise Master Services

## Contexte general 

Le client est une entreprise dans secteur du bâtiment et travaux publics et est située à Sint-Pieters-Leeuw. Dans le cadre de ses activités, le client doit constamment gérer le flux de matériaux, ses clients, ses employés, ses fournisseurs ainsi que toutes les facturations qui en découlent.

Le client ne possède actuellement aucun moyen informatisé de gérer l'ensemble de ses entités et m'a demandé de concevoir une solution pour répondre à l'ensemble de ses besoins : 

* Gestion Clients
* Gestion des Projets
* Gestion Matériel 
* Gestion Stock
* Gestion Main d'Oeuvre
* Gestion du personnel 
* Gestion Devis
* Gestion Factures
* Gestion utilisateurs 

Cette solution doit être conçue de telle sorte qu'elle puisse être adaptée au fil des années en fonction de l'évolution des besoins du client.
De plus, le client étant souvent sur chantier, il est primordial que l'application puisse être facilement portable d'un système / ordinateur à un autre. Il a donc été décidé en commun accord avec le client que la solution sera déployée sous forme d'une application web ce qui apportera un grande flexibilité aux niveau de l'utilisation de la solution. 

> Le volume d'information a gérer étant conséquent, la visualisation doit principalement être adaptée aux écrans d'ordinateur.

## Choix de la méthodologie de travail

Vu la quantité de travail et de tâches techniques à accomplir, la méthodologie que j’ai choisie pour la réalisation de ce projet est méthodologie Agile. 

> Spécifiquement j'ai décidé de travailler avec la méthode Scrum avec son organisation en sprints

Tout d'abord, j'ai pu définir avec le client les `principales fonctionnalités` à intégrer dans le projet. Ces fonctionnalités sont classées par **ordre de priorité** et ainsi que d'un **délai approximatif** qui correspond à une estimation du temps que je pense consacrer pour chacune des fonctionnalités. 

En outre, les principales fonctionnalités contenues dans le projet sont détaillées. S'agissant d'un projet de grande envergure, chacune des principales fonctionnalités a été divisée en petites user stories qui me permettront d'avoir un produit livrable au client à la fin de chaque sprint.

> Les sprints auront une durée d’environ 2 semaines.

À la fin de chaque sprint, un livrable correspondant aux tâches / user stories effectuées lors du sprint devra être présenté au client, et ce dernier devra donc vérifier et valider ces différentes tâches.

> Pour chaque sprint, avec le client nous avons décidé de détailler et de mettre en oeuvre de 4 à 5 user stories 

L'avantage de cette méthode est que, en cas d'erreurs et non validation des tâches de la part du client, ces dernières pourront être revues et corrigées pour le prochain sprint.

![Scrum](https://miro.medium.com/max/2000/1*oHRJUR1OMrlsbjrddff0MA.png)

Pour l’organisation des tâches à effectuer pour chaque sprint, j’utiliserai l’outil Trello. Cet outil me permettra de diviser les tâches à effectuer pour chaque sprint, ce qui facilitera la visualisation de l’avancement du projet. 

Cette méthodologie de travail permet donc de ne pas définir certaines user stories qui ne seront peut-être jamais mises en place.


### Gitflow

J'ai décidé de travailler avec le gitflow par branche qui me permettra d'avoir une division au niveau des fonctionnalités qui seront crées lors du projet.

- une branche 'develop' qui correspond à la branche 'master' du 'github-flow'
- les releases sont préparées sur une branche spécifique (fusion depuis la branche 'develop' jusqu'à ce que la release soit validée)
- lorsqu'une release est prête, elle est fusionnée sur la branche 'master'


![Schéma GitFlow](https://wac-cdn.atlassian.com/dam/jcr:34c86360-8dea-4be4-92f7-6597d4d5bfae/02%20Feature%20branches.svg?cdnVersion=182)



## Planification

Étant donné que la réalisation du TFE devra se faire en même temps que le stage, j'ai décidé de planifier la répartition du travail sur les prochaines semaines comme suit : 

![Planning pour les semaines qui viennent](https://github.com/ikramjaujate/TFE/blob/main/docs/images/PlanificationTFE.png)

Nous pouvons voir sur ce planning que les samedis et dimanches n'apparaissent pas et ce pour le simple fait mon but est de consacrer 8 heures au total chaque weekend.

> L'horaire de travail pendant le weekend pourrait varier, j'ai décidé de ne pas les inclure dans le planning.

## État d'avancement

Dans le but de visualiser l'avancement du projet, ici vous pouvez retrouver les différents étapes réalisées : 

 - [X] Description du client
 - [X] Contact avec le client
   > Au niveau des réunions avec le client, [ici](https://github.com/ikramjaujate/TFE/wiki/Reunions) vous trouverez le détails de ces dernières.
 - [X] Description du projet
 - [X] Choix technologique
   > Au niveau des technologies choisies, [ici](https://github.com/ikramjaujate/TFE/wiki/Technologies-choisies) vous trouverez le détails de ces dernières.
 
 - [X] Description des US stories
   - [X] [Gestion des clients](https://github.com/ikramjaujate/TFE/wiki/Gestion-Clients)
   - [X] [Gestion des Projets](https://github.com/ikramjaujate/TFE/wiki/Gestion-des-projets)
   - [X] [Gestion du Matériel](https://github.com/ikramjaujate/TFE/wiki/Gestion-Matériel)
   - [X] [Gestion du personnel](https://github.com/ikramjaujate/TFE/wiki/Gestion-du-personnel)
   - [ ] [Gestion Devis](https://github.com/ikramjaujate/TFE/wiki/Gestion-factures)
   - [ ] [Gestion Stock](https://github.com/ikramjaujate/TFE/wiki/Gestion-factures)

 - [X] Espaces de travail pour faciliter la gestion du projet
   - [X] [Github](https://github.com/ikramjaujate/TFE)
   - [X] [Clockify](https://clockify.me/tracker)
   - [X] [Trello](https://trello.com/b/RX6ikrFe/tfe)

- [ ] Développement 
   - [X] Configuration VPS et sécurisation
   - [ ] Schéma DB
   - [X] Mise en place du backend 
   - [X] Mise en place du frontend 
   - [X] Mise en place du déploiement continu

      > Au niveau du déploiement automatique, [ici](https://github.com/ikramjaujate/TFE/wiki/Intégration-et-déploiement-continu) vous trouverez le détails à propos de celui-ci. 

   - [ ] Mise en place de la DB
   - [ ] Implémentation des US
   - [ ] Sécurité et GDPR  