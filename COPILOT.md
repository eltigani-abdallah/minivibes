# COPILOT.md - Instructions pour l'Agent MiniVibes

## 🎯 Mission
Tu es un agent IA de codage aidant à compléter les projets MiniVibes. Ce sont des défis de vibe coding d'une journée où nous recréons des applications existantes avec **un usage limité de modèles premium** (une requête premium par jour).

## 🚨 Contraintes Critiques

### Limites de Ressources
- **UNE SEULE requête de modèle premium par projet/jour maximum** - utilise-la judicieusement !
- Toutes les autres requêtes doivent utiliser des modèles "mini" (multiplicateur de 0.33x)
- Limite de temps : Une journée par projet
- Tu travailles dans un environnement avec tokens contraints

### Règles du Dépôt
- **MODIFIE UNIQUEMENT les fichiers dans le dossier du dépôt du projet**
- **NE TOUCHE JAMAIS aux fichiers en dehors du répertoire du dépôt**
- **AUCUNE modification des fichiers système, du répertoire home, ou des répertoires parents**
- Tout le travail doit rester contenu dans la structure du projet

### Contrôle de Version Git
- **Tu dois gérer le versionnage Git de manière autonome**
- Fais des commits atomiques et significatifs au fur et à mesure
- Utilise des messages de commit clairs et descriptifs en anglais
- Commite après chaque fonctionnalité/correction/jalon significatif
- Crée des branches quand approprié pour des fonctionnalités expérimentales
- Garde la branche main stable et fonctionnelle
- Workflow typique :
  - `git add <fichiers>`
  - `git commit -m "Description claire de ce qui a changé et pourquoi"`
  - Tag les jalons majeurs si approprié

### Provenance du Code
- **100% du code doit provenir de toi (l'agent IA)**
- Pas de copier-coller de sources externes
- Pas d'import de code pré-écrit de l'extérieur du projet
- Génère tout depuis zéro basé sur les spécifications

### Fichiers Requis
- Doit maintenir `COPILOT.md` (ce fichier) à la racine du projet
- Doit créer/mettre à jour `sessions/[prenom]/SESSION.md` pour l'utilisateur actuel
- Doit créer la structure de dossiers `sessions/rimma/`, `sessions/aminata/`, `sessions/eltigani/`
- Suivre toutes les conventions de structure de projet définies dans les specs

## 📝 Gestion du Fichier SESSION.md

### Objectif
`SESSION.md` est ton **journal de bord** et permet la **continuité entre sessions**. Il contient l'historique complet de tous les prompts et leurs résultats.

### AVANT TOUTE CHOSE - Identification de l'utilisateur
**À CHAQUE début de session, tu DOIS :**
1. **Demander le prénom de l'utilisateur** parmi : Rimma, Aminata, ou Eltigani
2. Créer/utiliser le dossier de session correspondant : `sessions/[prenom]/SESSION.md`
3. Ne JAMAIS mélanger les sessions de différents utilisateurs

**Structure des dossiers :**
```
projet/
├── COPILOT.md
├── sessions/
│   ├── rimma/
│   │   └── SESSION.md
│   ├── aminata/
│   │   └── SESSION.md
│   └── eltigani/
│       └── SESSION.md
├── src/
└── ...
```

### Au DÉBUT de chaque session (après identification)
- **LIS TOUJOURS le SESSION.md de l'utilisateur** pour comprendre où il/elle en est
- Identifie ce qui a déjà été fait par cette personne
- Repère les problèmes en cours
- Continue où l'utilisateur s'était arrêté

### PENDANT la session
- **Documente CHAQUE prompt utilisé** et son résultat
- Note les décisions importantes prises
- Enregistre les problèmes rencontrés et leurs solutions
- Garde une trace de l'état d'avancement

### Structure de SESSION.md
```markdown
# Session MiniVibes - [Nom du Projet]

## Informations Générales
- **Utilisateur** : [Rimma / Aminata / Eltigani]
- Date de début : [date]
- Dernière mise à jour : [date et heure]
- Requête premium utilisée : [Oui/Non - pour quoi]
- État : [En cours / Terminé / Bloqué]

## Historique des Prompts

### [Timestamp] - Prompt #1
**Contexte** : [Pourquoi ce prompt]
**Prompt utilisé** :
```
[Le prompt exact]
```
**Résultat** : [Ce qui s'est passé, fichiers créés/modifiés, problèmes rencontrés]
**Commits Git** : [hash des commits si applicable]

### [Timestamp] - Prompt #2
...

## État Actuel
- Fonctionnalités complétées : [liste]
- Fonctionnalités en cours : [liste]
- Problèmes non résolus : [liste]
- Prochaines étapes : [liste]

## Notes Importantes
[Toute information cruciale pour la prochaine session]
```

### Format et Langue
- **TOUT dans SESSION.md doit être en FRANÇAIS**
- Même les prompts en anglais doivent être traduits ou accompagnés d'une traduction
- Les résultats techniques peuvent contenir du code/erreurs en anglais, mais les explications doivent être en français

## 📋 Développement Piloté par Spécification

### Phase 1 : Spécification (Utilise ta requête premium ici !)
Avant tout codage, crée un document de spécification complet couvrant :

1. **Découpage Fonctionnel et Technique**
   - Séparation Frontend/Backend
   - Modules/composants principaux : UI, moteur de jeu, API, stockage, etc.
   
2. **Stack Technique**
   - Langages, frameworks, bibliothèques
   - Type de base de données et schéma simplifié
   - Gestionnaire de packages
   - Outils de build, formateurs, frameworks de test

3. **Contraintes et Ressources**
   - Suivi des requêtes premium vs mini
   - Contraintes de performance si applicable
   
4. **Règles de Rendu et de Fidélité**
   - Objectifs visuels/comportementaux
   - Critères de succès minimum pour chaque module
   - Méthodes de tests/vérification automatisées

5. **Organisation du Projet**
   - Structure de fichiers
   - Conventions de nommage

6. **Stratégie de Développement**
   - Étapes à générer en premier
   - Points de validation
   - Approche de gestion du contexte

### Phase 2 : Validation
- Révise la spécification pour cohérence
- Vérifie la faisabilité étant donné les contraintes
- Obtiens l'approbation humaine avant de procéder

### Phase 3 : Implémentation
- Utilise la spécification comme contexte principal tout au long du développement
- Réfère-toi à elle dans chaque décision
- Mets-la à jour si les exigences changent

## 🌍 Langue et Documentation

### Règle Absolue
- **TOUS les fichiers de documentation (SESSION.md, COPILOT.md, README.md, etc.) doivent être en FRANÇAIS**
- Les commentaires dans le code doivent être en français
- Les messages de commit peuvent être en anglais (convention standard) mais peuvent aussi être en français

### Exceptions
- Le code lui-même (noms de variables, fonctions, classes) peut suivre les conventions anglaises standard
- Les messages d'erreur techniques peuvent rester en anglais
- Les dépendances et configurations externes restent dans leur langue d'origine

## 🏗️ Bonnes Pratiques

### Qualité du Code
- **Formate le code de manière cohérente** sur tout le projet
- Mets en place et utilise des outils de formatage automatique (Prettier, Black, etc.)
- Écris du code propre, lisible et bien documenté
- Utilise des noms de variables/fonctions significatifs

### Sécurité et Robustesse
- Valide toutes les entrées
- Préviens l'injection SQL, XSS et autres vulnérabilités courantes
- Gère les erreurs avec élégance
- Pas de failles de sécurité triviales

### Tests (Bonus)
- Les tests unitaires sont hautement valorisés
- Vérification automatisée quand possible
- Teste les cas limites

### Utilisation de Base de Données
- Utilise des bases de données quand approprié (SQL ou NoSQL)
- Conçois des schémas appropriés
- Ne sur-ingénierie pas, mais ne sous-ingénierie pas non plus

### Docker (Idéal mais pas obligatoire)
- Dockerise le projet s'il est basé sur le web
- Fournis des instructions de setup claires
- Rends le déploiement reproductible

## 💡 Conseils Stratégiques pour le Vibe Coding avec Ressources Contraintes

### Optimisation de la Requête Premium
Ta UNE requête premium est précieuse. Meilleures utilisations :
- Générer la spécification complète
- Résoudre un problème architectural critique
- Déboguer un problème complexe que les modèles mini ne peuvent pas gérer

### Patterns de Succès avec Modèles Mini
- Donne des instructions TRÈS claires et spécifiques
- Divise les tâches en petits morceaux
- Fournis des exemples quand possible
- Réfère-toi constamment au document de spécification
- Itère progressivement plutôt que de grands changements

### Gestion du Contexte
- Garde le document de spécification concis mais complet
- Réfère-toi à lui dans les prompts : "Selon la section X de la spec..."
- Ne laisse pas la fenêtre de contexte se remplir d'informations redondantes
- Résume les progrès périodiquement
- **Utilise SESSION.md pour maintenir la continuité**

### Git Worktrees (Bonus Avancé)
- Utilise `git worktree` pour exécuter plusieurs agents en parallèle
- Chaque worktree peut travailler sur des fonctionnalités différentes
- Fusionne soigneusement pour éviter les conflits

## 📁 Structure Standard du Projet

```
nom-du-projet/
├── COPILOT.md          # Ce fichier - instructions pour l'agent
├── sessions/           # Dossier des sessions par utilisateur
│   ├── rimma/
│   │   └── SESSION.md  # Historique de session de Rimma
│   ├── aminata/
│   │   └── SESSION.md  # Historique de session d'Aminata
│   └── eltigani/
│       └── SESSION.md  # Historique de session d'Eltigani
├── README.md           # Description du projet lisible par humains
├── .gitignore          # Règles d'ignore Git
├── docker-compose.yml  # Si dockerisé
├── src/                # Code source
│   ├── frontend/       # Si applicable
│   ├── backend/        # Si applicable
│   └── ...
├── tests/              # Tests unitaires (bonus)
└── docs/               # Documentation supplémentaire
```

## 🎯 Critères de Succès

Un projet MiniVibes réussi :
- ✅ Reproduit fidèlement l'application cible
- ✅ Fonctionne dans un navigateur web (pour les projets web)
- ✅ A du code propre, formaté et cohérent
- ✅ Est correctement versionné avec des commits significatifs
- ✅ Contient les fichiers requis (COPILOT.md, sessions/[utilisateur]/SESSION.md)
- ✅ Identifie l'utilisateur au début de chaque session
- ✅ Garde les sessions séparées par utilisateur
- ✅ Utilise seulement une requête premium (par utilisateur par jour)
- ✅ N'a pas de code provenant de sources externes
- ✅ Est sécurisé contre les attaques triviales
- ✅ Toute la documentation est en français
- ✅ (Bonus) Inclut des tests, setup Docker, base de données si approprié

## 🚀 Workflow Quotidien

1. **Identification** : Demander le prénom de l'utilisateur (Rimma/Aminata/Eltigani)
2. **Lecture** : Lire le fichier sessions/[prenom]/SESSION.md de l'utilisateur
3. **Matin** : Recevoir la spécification du projet du jour
4. **Phase de Spécification** (Requête Premium) : Analyser la cible, créer spec détaillée
5. **Validation** : Réviser la spec avec l'humain
6. **Phase de Développement** (Modèles Mini) : Implémenter en suivant la spec
7. **Tests et Raffinement** : Vérifier que toutes les fonctionnalités marchent
8. **Git** : S'assurer que les commits sont propres et significatifs
9. **Documentation** : Mettre à jour sessions/[prenom]/SESSION.md tout au long de la journée
10. **Présentation** : Préparer pour la présentation de fin de journée

## 📝 Directives pour Messages de Commit

Bons messages de commit (en anglais ou français) :
- `feat: implement basic game board rendering`
- `fix: correct horse movement collision detection`
- `refactor: extract game logic into separate module`
- `docs: add setup instructions to README`
- `test: add unit tests for scoring system`

Ou en français :
- `feat: implémente le rendu de base du plateau de jeu`
- `fix: corrige la détection de collision du mouvement des chevaux`
- `refactor: extrait la logique de jeu dans un module séparé`

Mauvais messages de commit :
- `update`
- `fix bug`
- `changes`
- `wip`

## 🎨 Préparation pour la Présentation

Ton projet sera présenté ! Assure-toi que :
- **Il tourne sans problème** - pas de crashes ou bugs évidents
- **Polish visuel** - l'UI doit être belle
- **README clair** - explique ce que ça fait et comment le lancer
- **Toutes les fonctionnalités marchent** - surtout les subtiles mentionnées dans les specs
- **Le code est lisible** - d'autres vont le réviser
- **La documentation est en français** - SESSION.md, README.md, COPILOT.md

## 🧠 Rappelle-toi

> "Premium Is Scarce. Skill Is Not."

Tu démontres que même avec un accès limité aux modèles puissants, un prompting réfléchi, des spécifications claires et une utilisation stratégique des modèles mini peuvent produire d'excellents résultats.

Concentre-toi sur :
- **La planification** plutôt que la puissance brute
- **La clarté** plutôt que la complexité
- **L'itération** plutôt que la perfection du premier coup
- **L'adhésion aux spécifications** plutôt que l'improvisation
- **La documentation continue** dans SESSION.md

Bonne chance, et que ta seule requête premium soit parfaitement placée ! 🎯
