# Spécification - Enclose.Horse

**Date:** 16 Février 2026  
**Utilisateur:** Eltigani  
**Requête Premium Utilisée:** OUI - Spécification complète et stratégie d'implémentation

---

## 🎯 Vue d'ensemble du Projet

**Nom:** Enclose.Horse  
**Type:** Puzzle/Stratégie interactif basé sur une grille  
**Plateforme:** Web (navigateur moderne)

**Objectif du Jeu:** Placer des portes stratégiquement sur une grille pour enfermer un cheval dans une enclosure. Une fois le cheval enfermé, l'herbe à l'intérieur devient du blé et le joueur peut soumettre sa solution pour marquer des points.

---

## 📋 Mécanique du Jeu

### Types de Tuiles

1. **Herbe (Grass)** 
   - Le cheval peut marcher dessus
   - A l'intérieur d'une enclosure: devient du blé (wheat)
   - Vaut 1 point par tuile enfermée

2. **Eau (Water)**
   - Le cheval ne peut pas marcher dessus
   - Agit comme un obstacle naturel
   - Compte comme barrière pour l'enclosure

3. **Cerise (Cherry)**
   - Le cheval peut marcher dessus
   - Si enfermée dans l'enclosure: +10 points bonus
   - Reste visible comme icône

4. **Portail (Portal)**
   - Le cheval peut marcher dessus
   - Le cheval qui entre en contact se téléporte au portail de la même couleur
   - Peut créer des situations complexes si un portail est à l'intérieur et l'autre à l'extérieur
   - Les portails sont de couleurs appairées (ex: rouge-rouge, bleu-bleu)

5. **Porte (Gate)** - Placée par le joueur
   - Le cheval ne peut pas la traverser
   - Quantité limitée par niveau (ex: 5 portes max)
   - Compte comme barrière pour l'enclosure

### Mouvement du Cheval

- Le cheval se déplace sur une grille 4-adjacente (haut, bas, gauche, droite)
- **PAS de mouvement diagonal**
- Le cheval commence à une position spécifiée sur la grille
- Le cheval explore automatiquement tous les chemins accessibles (BFS/DFS)

### Détection d'Enclosure

- Une enclosure est valide si:
  - Le cheval ne peut pas atteindre les bords de la grille en partant de sa position
  - Tous les chemins possibles sont bloqués par: eau, portes, ou bords de la grille
  - Les portails ne permettent pas d'échapper (si un portail est dans l'enclosure et son pair à l'extérieur = pas valide)

### Système de Points

```
Points de base = nombre de tuiles d'herbe enfermées
Bonus cerise = 10 points par cerise enfermée
Score final = Points de base + Bonus cerise
```

---

## 🏗️ Architecture Technique

### Tech Stack

**Frontend:**
- **React 18+** - Framework UI réactif pour une expérience interactive
- **TypeScript** - Typage statique pour la robustesse
- **Tailwind CSS** - Styling modulaire et responsive
- **Vite** - Build tool ultra-rapide

**Pas de Backend/Base de Données:**
- Le jeu fonctionne entièrement en client-side
- Stockage local optionnel (localStorage) pour les high scores
- Aucun serveur nécessaire

**Outils:**
- **Prettier** - Formatage de code cohérent
- **ESLint** - Linting et qualité du code
- **Vitest** - Framework de test unitaire léger

---

## 📂 Structure du Projet

```
enclose-horse/
├── COPILOT.md                    # Instructions pour l'agent
├── SPECIFICATION.md              # Ce fichier
├── README.md                     # Guide utilisateur
├── package.json
├── vite.config.ts
├── tsconfig.json
├── .eslintrc.json
├── .prettierrc.json
├── .gitignore
├── sessions/
│   └── eltigani/
│       └── SESSION.md
├── src/
│   ├── main.tsx                  # Point d'entrée
│   ├── App.tsx                   # Composant racine
│   ├── components/
│   │   ├── GameBoard.tsx         # Grille de jeu
│   │   ├── Tile.tsx              # Tuile individuelle
│   │   ├── HorsePathOverlay.tsx  # Affichage du chemin d'échappement
│   │   ├── UIPanel.tsx           # Panneau de contrôle (portes restantes, score)
│   │   └── SubmitButton.tsx      # Bouton de soumission
│   ├── hooks/
│   │   ├── useGameState.ts       # Logique d'état du jeu
│   │   ├── useHorseEscape.ts     # Calcul du chemin d'échappement
│   │   └── useEnclosureDetection.ts # Détection d'enclosure
│   ├── types/
│   │   ├── game.ts               # Types globaux (Tile, Position, etc.)
│   │   └── state.ts              # Types d'état
│   ├── utils/
│   │   ├── pathfinding.ts        # BFS pour chemin d'échappement
│   │   ├── validation.ts         # Validation d'enclosure
│   │   ├── scoring.ts            # Calcul de points
│   │   ├── levelGenerator.ts     # Génération de niveaux
│   │   └── constants.ts          # Constantes du jeu
│   └── styles/
│       └── globals.css           # Styles globaux
├── tests/
│   ├── pathfinding.test.ts       # Tests pathfinding
│   ├── validation.test.ts        # Tests validation
│   └── scoring.test.ts           # Tests scoring
├── public/
│   └── index.html
└── docs/
    └── RULES.md                  # Règles du jeu pour le joueur
```

---

## 🎮 Mécanique d'Interface

### Écran Principal

**En haut:**
- Titre "Enclose.Horse"
- Affichage du niveau actuel
- Score courant

**Au centre:**
- Grille de jeu (variable size, ex: 10x10 par défaut)
- Horse visible au centre ou position spécifiée
- Tuiles cliquables pour placer des portes

**Panneau latéral droit:**
- Nombre de portes restantes à placer
- Bouton "Reset Level" (recommencer)
- Bouton "Submit Solution" (grisé si cheval non enfermé)

### Interactions

1. **Hover sur le cheval:**
   - Affiche le chemin accessible en vert (tuiles que le cheval peut atteindre)
   - Affiche la position actuelle du cheval en rouge/highlight

2. **Clic sur une tuile d'herbe vide:**
   - Place une porte si des portes sont disponibles
   - La tuile devient une porte (icône barrière)
   - Met à jour la visualisation du chemin d'échappement en temps réel

3. **Clic sur une porte placée:**
   - Retire la porte (augmente compteur de portes disponibles)

4. **Hover sur une tuile fermée (pas accessible par le cheval):**
   - Indication visuelle que cette zone est hors de portée

5. **Click "Submit Solution":**
   - Valide que le cheval est enfermé
   - Calcule et affiche le score
   - Transition vers écran de victoire ou propose niveau suivant

---

## 🧮 Algorithmes Clés

### 1. Détection du Chemin d'Échappement (BFS)

```
Algorithme: Horse Escape Path
Entrée: Position du cheval, Grille avec obstacles
Sortie: Set de tuiles accessibles

1. Initialiser queue avec position du cheval
2. Marquer position comme visitée
3. Tant que queue non vide:
   a. Déplacer à position actuelle
   b. Pour chaque direction (haut, bas, gauche, droite):
      - Vérifier si tuile valide et non visitée
      - Si valide: ajouter à queue et marquer visitée
4. Retourner toutes tuiles visitées
```

### 2. Validation d'Enclosure

```
Algorithme: Is Enclosed
Entrée: Grille, position du cheval, positions des portes
Sortie: Boolean

1. Calculer ensemble des tuiles accessibles par BFS
2. Si ensemble incluent une position au bord de la grille:
   Retourner FALSE (pas enfermé)
3. Vérifier les portails:
   - Si portail dans ensemble accessible ET son pair n'est pas:
     Retourner FALSE (échappatoire via portail)
4. Retourner TRUE
```

### 3. Calcul du Score

```
Algorithme: Calculate Score
Entrée: Ensemble de tuiles enfermées
Sortie: Score entier

1. Compter tuiles d'herbe = base_points
2. Compter cerises = cherry_count * 10
3. Score = base_points + (cherry_count * 10)
4. Retourner Score
```

---

## 🎨 Design Visual & Palette

**Couleurs:**
- **Herbe:** Vert clair (#90EE90)
- **Blé (herbe enfermée):** Doré (#FFD700)
- **Eau:** Bleu (#4A90E2)
- **Cerise:** Rouge (#E63946)
- **Portail:** Dégradé de couleur (selon la paire)
- **Porte:** Marron foncé (#654321)
- **Cheval:** Sprite/emoji 🐴
- **Chemin accessible:** Vert pâle semi-transparent overlay

**Style:**
- Grille visuelle avec bordures
- Tuiles carrées de taille responsive
- Icônes claires et minimalistes
- Animations fluides au placement/suppression de portes

---

## 📊 Système de Niveaux

### Difficulté Progressive

**Niveau 1 (Tutoriel):**
- Grille 6x6
- 3 portes disponibles
- 1 seule cerise
- Configuration simple (eau aux bords, chemin d'échappement évident)

**Niveau 2-3:**
- Grille 8x8
- 4-5 portes
- 2-3 cerises
- Obstacles plus complexes

**Niveau 4+:**
- Grille 10x10+
- 5-6 portes
- 4+ cerises, portails introduits
- Configurations avancées

### Générateur de Niveaux

- Placer aléatoirement l'eau, cherises, portails
- Assurer que le cheval a une position valide (pas sur obstacle)
- Assurer qu'une solution existe (sinon régénérer)

---

## ✅ Critères de Succès & Tests

### Fonctionnalités Critiques

1. ✅ **Rendu de grille:** Affichage correct des 5 types de tuiles
2. ✅ **Placement de portes:** Clics corrects, compteur décrémente
3. ✅ **Calcul de chemin:** BFS calcule correctement tuiles accessibles
4. ✅ **Visualisation du chemin:** Overlay affiche correctement au hover
5. ✅ **Validation d'enclosure:** Détecte correctement les enclosures valides
6. ✅ **Détection de portail:** Gère les portails correctement pour l'échappement
7. ✅ **Calcul de score:** Points corrects avec bonus cerises
8. ✅ **Soumission:** Empêche soumission si non enfermé, affiche score si valide
9. ✅ **UI responsive:** Fonctionne sur desktop et mobile
10. ✅ **Pas de bugs évidents:** Code robuste, gestion d'erreurs

### Tests Unitaires

- `pathfinding.test.ts`: Validez BFS sur différentes grilles
- `validation.test.ts`: Validez logique d'enclosure (cas limites)
- `scoring.test.ts`: Validez calcul de points exact

---

## 🚀 Stratégie d'Implémentation (Modèles Mini)

### Phase 1: Infrastructure & Types (Jour 1, Session 1)
- Initialiser projet Vite + React + TypeScript
- Définir tous les types (game.ts, state.ts)
- Créer structure des dossiers
- Setup Prettier + ESLint

### Phase 2: Noyau du Jeu (Jour 1, Session 2)
- Implémenter BFS pathfinding
- Implémenter logique de validation d'enclosure
- Implémenter calcul de score
- Créer composant GameBoard (rendu grille basique)

### Phase 3: UI & Interaction (Jour 1, Session 3)
- Composant Tile avec placement de portes
- Hook useGameState pour état du jeu
- Hook useHorseEscape pour visualisation
- Panneau de contrôle

### Phase 4: Visualisation & Polish (Jour 1, Session 4)
- Overlay du chemin d'échappement
- Styling Tailwind complet
- Animations fluides
- Écran de victoire/score

### Phase 5: Niveaux & Final Polish (Jour 1, Session 5)
- Générateur de niveaux
- Progression de difficulté
- Tests et bug fixes
- README et documentation

---

## 📝 Directives de Codage

### Conventions TypeScript

```typescript
// Types - PascalCase
type GameState = { ... }
interface Tile { ... }

// Variables/Fonctions - camelCase
const horsePosition: Position = { x: 5, y: 5 }
const calculateEscape = (grid: Tile[][]): Position[] => { ... }

// Constants - UPPER_SNAKE_CASE
const DEFAULT_GRID_SIZE = 10
const CHERRY_BONUS_POINTS = 10
```

### Commentaires

- Commenter les algorithmes complexes (BFS, validation)
- Commenter les cas limites dans le code
- Pas de commentaires sur du code évident

### Imports

- Utiliser imports absolus depuis `src/`
- Grouper: React, external libs, internal
- Trier alphabétiquement dans chaque groupe

---

## 🐛 Gestion des Cas Limites

1. **Portails qui créent des échappatoires:**
   - Vérifier que si un portail pair est hors enclosure, pas valide

2. **Placement de porte sur tuile spéciale:**
   - PAS possible de placer sur eau, cerise, portail
   - Seulement sur herbe ou blé

3. **Horse sur bord de grille:**
   - Considérer comme automatiquement non-enfermé

4. **Zéro porte disponible:**
   - Griser bouton placement, permettre au joueur d'enlever des portes existantes

5. **Score très élevé:**
   - Stocker dans localStorage si souhaité (bonus)

---

## 🎯 Definition of Done

Le projet est terminé quand:
1. Toutes les fonctionnalités listées en "Critères de Succès" sont ✅
2. Le code passe les linters (ESLint, Prettier)
3. Tests unitaires pour pathfinding, validation, scoring ✅
4. README complet avec instructions de lancement
5. SESSION.md mis à jour avec tous les prompts et résultats
6. Au moins 3 niveaux jouables avec progression
7. Pas de console errors ou warnings
8. UI responsive et agréable
9. Tous les commits sont significatifs et bien nommés

---

## 📚 Ressources & Références

**Pour la visualisation:** https://enclose.horse  
**Icons/Emojis:** 🐴 (horse), 🌲 (water), 🍒 (cherry), 🟫 (gate)

---

**Statut:** ✅ Prêt pour implémentation  
**Approuvé:** [À confirmer par l'utilisateur avant de procéder]
