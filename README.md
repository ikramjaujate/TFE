# TFE

![Deploiement](https://github.com/ikramjaujate/TFE/workflows/Deploiment/badge.svg?branch=develop)
[![Availability](https://img.shields.io/uptimerobot/ratio/7/m790827699-ff82f96e57e5f1f1f8ef2461)](https://stats.uptimerobot.com/rNpLgcrN2N) 


Le client est une entreprise dans secteur du bâtiment et travaux publics et est située à Sint-Pieters-Leeuw. Dans le cadre de ses activités, le client doit constamment gérer le flux de matériaux, ses clients, ses employés, ses fournisseurs ainsi que toutes les facturations qui en découlent.

Le client ne possède actuellement aucun moyen informatisé de gérer l'ensemble de ses entités et m'a demandé de concevoir une solution pour répondre à l'ensemble de ses besoins. Le client étant souvent sur chantier est primordial que l'application puisse être facilement portable d'un système / ordinateur à un autre. Il a donc été décidé en commun accord avec le client que la solution sera déployée sous forme d'une application web. Le volume d'information a gérer étant conséquent, la visualisation doit principalement être adaptée aux écrans d'ordinateur.

> Plus d'information sur le projet [ici](https://github.com/ikramjaujate/TFE/wiki/Description-du-projet)

## Procédure d'installation de l'application en local

⚠️ Pour pouvoir exécuter l'application en local, il est important d'installer docker sur votre machine.

1. Ouverture du terminal à la racine du projet.
2. Dirigez vous vers le dossier `dev`.
3. Exécutez le script `start-dev.sh`.

Si le script ne s'exécute pas, suivez les étapes ci-dessous :
```
    chmod +x start-dev.sh
    ./start-dev.sh
```

⏳ Attendez que tous les services démarrent. Cela prend ± 5 minutes.

Si vous voyez les éléments ci-dessous apparaître dans votre terminal, l'application est disponible. 

```
    ...
    masterservices-app      | Swagger-autogen:  Success ✔ 
    masterservices-app      | App running on port 3001.
    masterservices-app      | ✅ 💃 App ready on http://localhost:3001 !
    ...
```

🚀 Maintenant vous pouvez naviguer sur votre navigateur à l'adresse : http://localhost:3001

Pour vous connecter à l'aide des deux adresses de test créées :

```
    dev-test@masterservices.com
    secretaire-test@masterservices.com

    pwd: **Mast3rServ!ce**
```


