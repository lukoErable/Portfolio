/* What the agent cursors say while they work, wander and wrap up */

type Copy = {
  travel: string[];
  work: Record<string, string[]>;
  done: string[];
  idle: string[];
  finale: string[];
  bye: string;
};

export const cursorCopy: Record<'fr' | 'en', Copy> = {
  fr: {
    travel: ['J’arrive', 'En route', 'Je m’en charge', 'C’est pour moi'],
    work: {
      Heading: ['Compose le titre', 'Ajuste le crénage', 'Pose la typo'],
      Text: ['Rédige le texte', 'Tape la copie', 'Corrige une coquille'],
      Image: ['Recadre la photo', 'Place l’image', 'Règle le cadrage'],
      Card: ['Monte la carte', 'Aligne la carte', 'Range les tags'],
      Row: ['Aligne la ligne', 'Pose la rangée', 'Cale les colonnes'],
      Stat: ['Compte les chiffres', 'Vérifie les stats'],
      Badge: ['Ajoute le badge', 'Allume le statut'],
      List: ['Liste les rôles', 'Numérote la liste'],
      Group: ['Câble les boutons', 'Branche le CV'],
      Form: ['Branche le formulaire', 'Teste les champs'],
      Table: ['Remplit le tableau', 'Aligne les infos'],
      Marquee: ['Lance le défilement', 'Règle la vitesse'],
      default: ['Construit', 'Assemble'],
    },
    done: ['Fait ✓', 'Calé ✓', 'Nickel ✓', 'Au pixel près ✓'],
    idle: [
      'Relit la page',
      'Vérifie les marges',
      'Mesure l’espacement',
      'Réfléchit…',
      'Admire le rouge',
      'Peaufine',
      'Vérifie le contraste',
      'Compte les pixels',
      'Cherche un bug',
      'Pause café ☕',
    ],
    finale: ['Prêt à envoyer ?', 'Clique ici !', 'Écris-moi 👋'],
    bye: 'À bientôt !',
  },
  en: {
    travel: ['On my way', 'Heading over', 'I got this', 'Mine!'],
    work: {
      Heading: ['Setting the headline', 'Kerning letters', 'Placing type'],
      Text: ['Writing copy', 'Typing it out', 'Fixing a typo'],
      Image: ['Cropping the photo', 'Placing the image', 'Framing the shot'],
      Card: ['Building the card', 'Aligning the card', 'Sorting tags'],
      Row: ['Aligning the row', 'Laying out the row', 'Snapping columns'],
      Stat: ['Counting numbers', 'Checking stats'],
      Badge: ['Adding the badge', 'Lighting the status'],
      List: ['Listing roles', 'Numbering the list'],
      Group: ['Wiring the buttons', 'Hooking up the CV'],
      Form: ['Wiring the form', 'Testing the fields'],
      Table: ['Filling the table', 'Aligning details'],
      Marquee: ['Starting the scroll', 'Tuning the speed'],
      default: ['Building', 'Assembling'],
    },
    done: ['Done ✓', 'Locked in ✓', 'Looks good ✓', 'Pixel-perfect ✓'],
    idle: [
      'Re-reading the page',
      'Checking margins',
      'Measuring spacing',
      'Thinking…',
      'Admiring the red',
      'Polishing',
      'Checking contrast',
      'Counting pixels',
      'Hunting bugs',
      'Coffee break ☕',
    ],
    finale: ['Ready to send?', 'Click here!', 'Say hi 👋'],
    bye: 'See you!',
  },
};

export const pick = <T,>(list: readonly T[]) => list[Math.floor(Math.random() * list.length)];
