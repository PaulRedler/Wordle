# WORDAY – État d'avancement du projet

https://wordle-c4xzbsbpg-zzs6.vercel.app/

## Palier visé

**Palier 4**

## Difficultés majeures rencontrées

J'utilisais initialement un composant `Ligne.jsx`. Avec cette approche, je n'arrivais pas à modifier correctement ma grille lorsque je changeais la valeur d'un input.

En passant à un composant `Grille`, auquel je transmets l'état complet de la grille ainsi que les index de la ligne et de la colonne actuelles, j'ai réussi à avancer dans le développement.

## Comportement en cas de problème avec l'API

En cas d'indisponibilité de l'API, un Toast affiche un message d'erreur pendant quelques secondes, demandant au joueur de patienter avant de rejouer.

Si j'ai le temps, j'aimerais désactiver temporairement les appels à l'API pendant une dizaine de minutes afin de permettre de jouer en mode hors ligne.

## État d'avancement

### Ce qui était fait au jour de l'entretien

Tout était réalisé jusqu'au palier 3, à l'exception des éléments suivants :

- L'animation des lettres qui se retournent.
- L'animation de la ligne qui tremble lors de la validation d'une ligne.

J'avais également oublié de créer la page de partie normale : seul le mode **Mot du jour** était disponible, avec un mot commun à tous les joueurs.

### Ce qui a été fait depuis

- Ajout de l'animation des lettres qui se retournent.
- Ajout de l'animation de la ligne qui tremble lors de la validation d'une ligne.
- Création du mode **Partie normale**, avec un mot aléatoire.
- Déploiement de l'application sur Vercel.
- Ajout d'un compte à rebours.

Je me suis arrêté à la mise en place du cache dans le mode **Mot du jour**, que je n'ai pas réussi à réaliser.

## Fonctionnalités restantes pour le palier 4

- [ ] **Tableau des scores :** distinguer le classement du Mot du jour (tous les joueurs de l'ordinateur sur le mot du jour, classés par points puis par temps de résolution) du classement général.
- [ ] **Partage du résultat :** permettre de copier le résultat dans le presse-papiers sous forme de texte, en affichant les couleurs sans révéler les lettres.
- [ ] **Sauvegarde de la partie du jour :** reprendre une partie commencée là où elle en était après le rechargement de la page.
- [ ] **Fin de partie :** empêcher de rejouer une partie du jour une fois celle-ci terminée.

---

## Configuration initiale du projet React + Vite

Ce template fournit une configuration minimale pour utiliser React avec Vite, avec le HMR et quelques règles Oxlint.

Deux plugins officiels sont disponibles :

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) utilise [Oxc](https://oxc.rs).
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) utilise [SWC](https://swc.rs/).

## React Compiler

Le React Compiler n'est pas activé dans ce template, en raison de son impact sur les performances du développement et du build.

Pour l'ajouter, consulter la [documentation officielle](https://react.dev/learn/react-compiler/installation).

## Extension de la configuration Oxlint

Pour un projet destiné à la production, il est recommandé d'utiliser TypeScript avec des règles de lint adaptées aux types.

Consulter le [template React + TypeScript de Vite](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) pour découvrir comment intégrer TypeScript et Oxlint.
