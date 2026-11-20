import React, { useState, useEffect, useRef } from 'react';
import { 
  Clock, Users, MessageSquare, Send, Volume2, VolumeX, Moon, AlertTriangle, Vote, Siren, EyeOff, UserCheck, ShieldAlert
} from 'lucide-react';

// --- DUTCH BETRAIL CHARACTER DATA & SVG AVATARS ---
const PLAYERS = [
  {
    id: '1',
    playerName: 'Daan',
    roleTitle: 'Willempie',
    role: 'Burgemeester',
    roleIcon: '👑',
    avatarBg: 'from-amber-900/80 to-slate-950',
    topBadge: '👑',
    svgAvatar: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="45" fill="#fde047" opacity="0.15" />
        <path d="M30 85 C30 65 35 55 50 55 C65 55 70 65 70 85 Z" fill="#1e293b" />
        <path d="M40 60 L60 60 L58 85 L42 85 Z" fill="#e2e8f0" />
        <path d="M46 60 L50 78 L54 60 Z" fill="#991b1b" />
        <path d="M32 62 L68 78 L65 82 L29 66 Z" fill="#d97706" />
        <circle cx="50" cy="42" r="20" fill="#fca5a5" opacity="0.9" />
        <path d="M30 38 Q50 20 70 38 Q65 25 50 25 Q35 25 30 38 Z" fill="#475569" />
        <circle cx="43" cy="40" r="2.5" fill="#0f172a" />
        <circle cx="57" cy="40" r="2.5" fill="#0f172a" />
        <path d="M43 49 Q50 55 57 49" fill="none" stroke="#991b1b" strokeWidth="2" strokeLinecap="round" />
        <path d="M38 23 L42 29 L50 21 L58 29 L62 23 L60 31 L40 31 Z" fill="#b45309" stroke="#78350f" strokeWidth="1" />
      </svg>
    )
  },
  {
    id: '2',
    playerName: 'Sophie',
    roleTitle: 'Annie Frankie',
    role: 'Spiekende meisje',
    roleIcon: '👁️',
    avatarBg: 'from-sky-950 to-slate-950',
    topBadge: '👁️',
    svgAvatar: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="45" fill="#38bdf8" opacity="0.15" />
        <path d="M30 85 C30 65 38 60 50 60 C62 60 70 65 70 85 Z" fill="#be123c" />
        <circle cx="50" cy="44" r="18" fill="#fca5a5" />
        <path d="M26 40 Q18 50 22 60" fill="none" stroke="#451a03" strokeWidth="6" strokeLinecap="round" />
        <path d="M74 40 Q82 50 78 60" fill="none" stroke="#451a03" strokeWidth="6" strokeLinecap="round" />
        <path d="M32 40 Q50 25 68 40 Q50 32 32 40 Z" fill="#451a03" />
        <ellipse cx="43" cy="42" rx="4" ry="5" fill="#ffffff" />
        <ellipse cx="57" cy="42" rx="4" ry="5" fill="#ffffff" />
        <circle cx="44" cy="42" r="2.5" fill="#0284c7" />
        <circle cx="58" cy="42" r="2.5" fill="#0284c7" />
        <path d="M45 52 Q50 56 55 52" fill="none" stroke="#be123c" strokeWidth="1.5" />
      </svg>
    )
  },
  {
    id: '3',
    playerName: 'Lotte',
    roleTitle: 'Nicolle Instructie',
    role: 'De heks',
    roleIcon: '🧪',
    avatarBg: 'from-purple-950 to-slate-950',
    topBadge: '🧙‍♀️',
    svgAvatar: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="45" fill="#a855f7" opacity="0.15" />
        <path d="M30 85 C30 65 35 60 50 60 C65 60 70 65 70 85 Z" fill="#3b0764" />
        <path d="M28 42 C20 60 32 70 32 70 M72 42 C80 60 68 70 68 70" fill="none" stroke="#1e1b4b" strokeWidth="7" />
        <circle cx="50" cy="45" r="16" fill="#fca5a5" />
        <circle cx="44" cy="44" r="2" fill="#3b0764" />
        <circle cx="56" cy="44" r="2" fill="#3b0764" />
        <path d="M46 52 Q50 48 54 52" fill="none" stroke="#701a75" strokeWidth="2" />
        <path d="M22 36 L78 36 L62 32 L54 10 L46 10 L38 32 Z" fill="#2e1065" />
        <path d="M34 33 L66 33" stroke="#9333ea" strokeWidth="3" />
        <path d="M68 65 L76 65 L78 78 L66 78 Z" fill="#16a34a" opacity="0.9" />
      </svg>
    )
  },
  {
    id: '4',
    playerName: 'Emma',
    roleTitle: 'Elsa de Tall',
    role: 'Cupido',
    roleIcon: '💘',
    avatarBg: 'from-pink-950 to-slate-950',
    topBadge: '❤️',
    svgAvatar: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <path d="M15 35 Q10 15 35 30 Q15 45 32 60" fill="#e2e8f0" opacity="0.8" />
        <path d="M85 35 Q90 15 65 30 Q85 45 68 60" fill="#e2e8f0" opacity="0.8" />
        <path d="M30 85 C30 65 38 60 50 60 C62 60 70 65 70 85 Z" fill="#9f1239" />
        <circle cx="50" cy="42" r="17" fill="#fca5a5" />
        <path d="M32 38 Q50 18 68 38 C65 20 35 20 32 38 Z" fill="#ca8a04" />
        <ellipse cx="50" cy="22" rx="16" ry="5" fill="none" stroke="#eab308" strokeWidth="3" />
        <circle cx="44" cy="41" r="2" fill="#881337" />
        <circle cx="56" cy="41" r="2" fill="#881337" />
        <path d="M45 49 Q50 54 55 49" fill="none" stroke="#be123c" strokeWidth="2" />
        <path d="M66 50 Q75 60 66 75" fill="none" stroke="#d97706" strokeWidth="2.5" />
      </svg>
    )
  },
  {
    id: '5',
    playerName: 'Bram',
    roleTitle: 'De zwarte tulp',
    role: 'Weerwolven',
    roleIcon: '🐺',
    avatarBg: 'from-red-950 via-slate-950 to-black',
    topBadge: '🐺',
    svgAvatar: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="45" fill="#dc2626" opacity="0.3" />
        <path d="M25 85 L35 55 L50 62 L65 55 L75 85 Z" fill="#0f172a" />
        <path d="M28 25 L40 40 L26 42 Z" fill="#334155" />
        <path d="M72 25 L60 40 L74 42 Z" fill="#334155" />
        <path d="M34 38 L50 30 L66 38 L58 60 L42 60 Z" fill="#1e293b" />
        <path d="M42 50 L50 46 L58 50 L50 64 Z" fill="#020617" />
        <ellipse cx="43" cy="44" rx="4" ry="3" fill="#ef4444" />
        <ellipse cx="57" cy="44" rx="4" ry="3" fill="#ef4444" />
        <circle cx="43" cy="44" r="1.5" fill="#fef08a" />
        <circle cx="57" cy="44" r="1.5" fill="#fef08a" />
        <polygon points="45,58 47,65 48,58" fill="#ffffff" />
        <polygon points="52,58 53,65 55,58" fill="#ffffff" />
        <path d="M70 65 Q75 75 72 85" fill="none" stroke="#166534" strokeWidth="3" />
        <path d="M68 62 C65 55 75 50 75 62 C75 55 82 60 75 67 Z" fill="#020617" stroke="#b91c1c" strokeWidth="1.5" />
      </svg>
    )
  },
  {
    id: '6',
    playerName: 'Sem',
    roleTitle: 'De belastingdienst',
    role: 'Dief',
    roleIcon: '💰',
    avatarBg: 'from-emerald-950 to-slate-950',
    topBadge: '💰',
    svgAvatar: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <path d="M30 85 C30 65 35 58 50 58 C65 58 70 65 70 85 Z" fill="#090d16" />
        <circle cx="50" cy="44" r="17" fill="#fca5a5" />
        <path d="M33 40 Q50 36 67 40 L67 48 Q50 44 33 48 Z" fill="#000000" />
        <circle cx="42" cy="43" r="2.5" fill="#ffffff" />
        <circle cx="58" cy="43" r="2.5" fill="#ffffff" />
        <path d="M40 50 Q50 46 60 50 Q50 54 40 50 Z" fill="#1e293b" />
        <path d="M68 65 Q78 62 82 72 Q86 85 70 85 Q64 80 68 65 Z" fill="#b45309" />
        <text x="71" y="78" fontSize="10" fontWeight="bold" fill="#fef08a">€</text>
      </svg>
    )
  },
  {
    id: '7',
    playerName: 'Julia',
    roleTitle: 'Dun',
    role: 'Ziener',
    roleIcon: '🔮',
    avatarBg: 'from-indigo-950 to-slate-950',
    topBadge: '👁️',
    svgAvatar: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="45" fill="#6366f1" opacity="0.15" />
        <path d="M30 85 C30 65 35 60 50 60 C65 60 70 65 70 85 Z" fill="#1e1b4b" />
        <circle cx="50" cy="45" r="17" fill="#fca5a5" />
        <circle cx="43" cy="44" r="5" fill="none" stroke="#334155" strokeWidth="2" />
        <circle cx="57" cy="44" r="5" fill="none" stroke="#334155" strokeWidth="2" />
        <path d="M32 40 Q50 24 68 40 Z" fill="#94a3b8" />
        <circle cx="50" cy="74" r="14" fill="#a5f3fc" opacity="0.75" stroke="#0284c7" strokeWidth="2" />
      </svg>
    )
  },
  {
    id: '8',
    playerName: 'Lucas',
    roleTitle: 'Virgil van Dam',
    role: 'Jager',
    roleIcon: '🎯',
    avatarBg: 'from-stone-900 to-slate-950',
    topBadge: '🎯',
    svgAvatar: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <path d="M30 85 C30 65 35 60 50 60 C65 60 70 65 70 85 Z" fill="#14532d" />
        <circle cx="50" cy="45" r="16" fill="#fca5a5" />
        <path d="M36 50 Q50 44 64 50 Q58 58 50 53 Q42 58 36 50 Z" fill="#451a03" />
        <path d="M24 38 Q50 32 76 38 L68 22 Q50 20 32 22 Z" fill="#064e3b" />
        <line x1="22" y1="80" x2="40" y2="40" stroke="#451a03" strokeWidth="5" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: '9',
    playerName: 'Milan',
    roleTitle: 'Max Verlopen',
    role: 'Beschermengel',
    roleIcon: '🛡️',
    avatarBg: 'from-blue-950 to-slate-950',
    topBadge: '🛡️',
    svgAvatar: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <path d="M10 40 Q20 10 40 30 Q10 60 30 75" fill="#bae6fd" opacity="0.7" />
        <path d="M90 40 Q80 10 60 30 Q90 60 70 75" fill="#bae6fd" opacity="0.7" />
        <path d="M30 85 C30 65 35 60 50 60 C65 60 70 65 70 85 Z" fill="#0369a1" />
        <circle cx="50" cy="42" r="17" fill="#fca5a5" />
        <path d="M33 38 Q50 20 67 38 Z" fill="#451a03" />
        <path d="M56 60 L74 60 L74 74 Q74 84 65 88 Q56 84 56 74 Z" fill="#d97706" stroke="#ffffff" strokeWidth="1.5" />
      </svg>
    )
  },
  {
    id: '10',
    playerName: 'Noah',
    roleTitle: 'André Real',
    role: 'Fluitspeler',
    roleIcon: '🪈',
    avatarBg: 'from-yellow-950 to-slate-950',
    topBadge: '🎵',
    svgAvatar: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <path d="M30 85 C30 65 35 60 50 60 C65 60 70 65 70 85 Z" fill="#047857" />
        <circle cx="50" cy="44" r="16" fill="#fca5a5" />
        <path d="M32 40 Q50 22 68 40 Z" fill="#78350f" />
        <line x1="30" y1="58" x2="72" y2="48" stroke="#d97706" strokeWidth="4" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: '11',
    playerName: 'Jesse',
    roleTitle: 'Joost Groot',
    role: 'Dorpsgek',
    roleIcon: '🤪',
    avatarBg: 'from-orange-950 to-slate-950',
    topBadge: '🎭',
    svgAvatar: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <path d="M30 85 C30 65 35 60 50 60 C65 60 70 65 70 85 Z" fill="#c2410c" />
        <circle cx="50" cy="46" r="17" fill="#fca5a5" />
        <path d="M25 38 Q18 20 30 18 Q36 28 42 36 Z" fill="#b91c1c" />
        <path d="M75 38 Q82 20 70 18 Q64 28 58 36 Z" fill="#15803d" />
      </svg>
    )
  },
  {
    id: '12',
    playerName: 'Tess',
    roleTitle: 'Judith van Leer',
    role: 'Vos',
    roleIcon: '🦊',
    avatarBg: 'from-amber-950 to-slate-950',
    topBadge: '🦊',
    svgAvatar: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <path d="M30 85 C30 65 35 60 50 60 C65 60 70 65 70 85 Z" fill="#9a3412" />
        <circle cx="50" cy="45" r="16" fill="#fca5a5" />
        <path d="M30 38 L50 48 L70 38 L62 56 L50 62 L38 56 Z" fill="#c2410c" />
        <path d="M35 40 L50 47 L65 40 L58 52 L50 56 L42 52 Z" fill="#f8fafc" />
      </svg>
    )
  },
  {
    id: '13',
    playerName: 'Thijs',
    roleTitle: 'Mart Ruiter',
    role: 'Rechter',
    roleIcon: '⚖️',
    avatarBg: 'from-slate-900 to-black',
    topBadge: '⚖️',
    svgAvatar: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <path d="M30 85 C30 65 35 60 50 60 C65 60 70 65 70 85 Z" fill="#020617" />
        <path d="M42 60 L50 72 L58 60 Z" fill="#ffffff" />
        <circle cx="50" cy="45" r="16" fill="#fca5a5" />
        <path d="M30 38 Q50 22 70 38 Z" fill="#e2e8f0" />
      </svg>
    )
  },
  {
    id: '14',
    playerName: 'Finn',
    roleTitle: 'Hamburger',
    role: 'Burger',
    roleIcon: '🍔',
    avatarBg: 'from-amber-900 to-slate-950',
    topBadge: '🍔',
    svgAvatar: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <path d="M30 85 C30 65 35 60 50 60 C65 60 70 65 70 85 Z" fill="#0284c7" />
        <circle cx="50" cy="50" r="16" fill="#fca5a5" />
        <path d="M30 36 Q50 20 70 36 Z" fill="#b45309" />
        <rect x="32" y="36" width="36" height="4" fill="#15803d" />
        <rect x="30" y="40" width="40" height="5" fill="#451a03" />
      </svg>
    )
  }
];

export default function App() {
  const [playerName, setPlayerName] = useState('');
  const [hasJoined, setHasJoined] = useState(false);
  const [selectedRoleChoice, setSelectedRoleChoice] = useState('RANDOM');
  const [myPlayerId, setMyPlayerId] = useState('14');
  const [playersList, setPlayersList] = useState(PLAYERS);

  const [flippedCards, setFlippedCards] = useState({});
  const [votes, setVotes] = useState({});
  const [myVoteTarget, setMyVoteTarget] = useState(null);
  const [deadPlayers, setDeadPlayers] = useState([]);
  const [gamePhase, setGamePhase] = useState('DAG'); // 'DAG', 'NACHT', of 'GAMEOVER'
  const [winnerTeam, setWinnerTeam] = useState(null); // 'BURGERS' of 'WEERWOLVEN'

  // Echte Weerwolven Rol-states
  const [nightActionDone, setNightActionDone] = useState(false);
  const [wolfTargetId, setWolfTargetId] = useState(null);
  const [protectedPlayerId, setProtectedPlayerId] = useState(null);
  const [revealedRoles, setRevealedRoles] = useState({}); // Voor de Ziener (Dun) & Spiekende meisje
  const [witchSaveUsed, setWitchSaveUsed] = useState(false);
  const [witchPoisonUsed, setWitchPoisonUsed] = useState(false);
  const [witchAction, setWitchAction] = useState(null); // { type: 'SAVE' | 'POISON', targetId }
  const [lovers, setLovers] = useState([]); // Cupido koppel
  const [hunterMustShoot, setHunterMustShoot] = useState(false);

  const [eventLog, setEventLog] = useState([
    { id: 1, icon: '🌅', text: 'Wachtend op spelers om Wakkerdam te betreden...', type: 'info' }
  ]);
  const [emergencyActive, setEmergencyActive] = useState(false);
  const [dayNumber, setDayNumber] = useState(1);
  const [phaseBanner, setPhaseBanner] = useState(null);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Martijn Geritsen', text: 'Welkom in Wakkerdam! Kies je naam om te beginnen...', isMayor: true }
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [timer, setTimer] = useState(45);
  const chatBottomRef = useRef(null);

  const myPlayer = playersList.find((p) => p.id === myPlayerId);

  const addEvent = (icon, text, type = 'info') => {
    setEventLog((prev) => [{ id: Date.now() + Math.random(), icon, text, type }, ...prev.slice(0, 7)]);
  };

  const showAnnouncement = (title, subtitle, variant = 'day') => {
    setPhaseBanner({ title, subtitle, variant });
    setTimeout(() => {
      setPhaseBanner(null);
    }, 5500);
  };

  // Controleer of Burgers of Weerwolven hebben gewonnen
  const checkWinCondition = (currentDeadIds) => {
    const alive = playersList.filter((p) => !currentDeadIds.includes(p.id));
    const aliveWolves = alive.filter((p) => p.role === 'Weerwolven');
    const aliveVillagers = alive.filter((p) => p.role !== 'Weerwolven');

    if (aliveWolves.length === 0) {
      setGamePhase('GAMEOVER');
      setWinnerTeam('BURGERS');
      showAnnouncement('🏆 DE BURGERS HEBBEN GEWONNEN!', 'Alle Weerwolven zijn uitgeschakeld! Wakkerdam is weer veilig.', 'day');
      addEvent('🏆', 'OVERWINNING! Alle Weerwolven zijn verslagen door de Burgers!', 'day');
      return true;
    }

    if (aliveWolves.length >= aliveVillagers.length) {
      setGamePhase('GAMEOVER');
      setWinnerTeam('WEERWOLVEN');
      showAnnouncement('🐺 DE WEERWOLVEN HEBBEN GEWONNEN!', 'De Weerwolven zijn in de meerderheid en nemen Wakkerdam over!', 'wolf');
      addEvent('🐺', 'NEDERLAAG! De Weerwolven hebben het dorp overgenomen!', 'danger');
      return true;
    }
    return false;
  };

  // Helper om een speler te doden (inclusief geliefden & jager-effect)
  const eliminatePlayer = (targetId, reasonText, currentDead) => {
    let updatedDead = [...currentDead];
    if (!updatedDead.includes(targetId)) {
      updatedDead.push(targetId);
    }

    // Controleer Cupido geliefden
    if (lovers.includes(targetId)) {
      const otherLoverId = lovers.find((id) => id !== targetId);
      if (otherLoverId && !updatedDead.includes(otherLoverId)) {
        const otherLover = playersList.find((p) => p.id === otherLoverId);
        updatedDead.push(otherLoverId);
        addEvent('💔', `Liefdesverdriet! ${otherLover.playerName} (${otherLover.roleTitle}) sterft mee met hun geliefde!`, 'danger');
        setMessages((m) => [
          ...m,
          { id: Date.now() + 2, sender: '💘 Cupido', text: `💔 ${otherLover.playerName} kon niet leven zonder hun geliefde en sterft ook (${otherLover.roleTitle})!`, isEmergency: true }
        ]);
      }
    }

    // Controleer of de Jager (Virgil van Dam) sterft
    const killedObj = playersList.find((p) => p.id === targetId);
    if (killedObj && killedObj.role === 'Jager') {
      if (targetId === myPlayerId) {
        setHunterMustShoot(true);
        addEvent('🎯', 'Jij bent de Jager! Kies direct iemand om mee te nemen in je graf!', 'danger');
      } else {
        const candidates = playersList.filter((p) => !updatedDead.includes(p.id));
        if (candidates.length > 0) {
          const shotTarget = candidates[Math.floor(Math.random() * candidates.length)];
          updatedDead.push(shotTarget.id);
          addEvent('🎯', `De Jager (${killedObj.playerName}) schiet vlak voor zijn dood ${shotTarget.playerName} (${shotTarget.roleTitle}) neer!`, 'danger');
          setMessages((m) => [
            ...m,
            { id: Date.now() + 3, sender: '🎯 Jager Schot', text: `💥 ${killedObj.playerName} was de Jager en schiet met zijn laatste adem ${shotTarget.playerName} (${shotTarget.roleTitle}) neer!`, isEmergency: true }
          ]);
        }
      }
    }

    return updatedDead;
  };

  const handleJoinGame = (e) => {
    e.preventDefault();
    if (!playerName.trim()) return;

    let chosenPlayer;
    if (selectedRoleChoice === 'RANDOM') {
      chosenPlayer = PLAYERS[Math.floor(Math.random() * PLAYERS.length)];
    } else {
      chosenPlayer = PLAYERS.find((p) => p.role === selectedRoleChoice) || PLAYERS[0];
    }

    setMyPlayerId(chosenPlayer.id);
    const updatedPlayers = PLAYERS.map((p) =>
      p.id === chosenPlayer.id ? { ...p, playerName: playerName.trim() } : p
    );
    setPlayersList(updatedPlayers);
    setDayNumber(1);
    setGamePhase('DAG');
    setWinnerTeam(null);
    setDeadPlayers([]);
    setVotes({});
    setMyVoteTarget(null);
    setRevealedRoles({ [chosenPlayer.id]: true });
    setWitchSaveUsed(false);
    setWitchPoisonUsed(false);
    setWitchAction(null);
    setLovers([]);
    setHunterMustShoot(false);
    setNightActionDone(false);
    setTimer(45);
    setHasJoined(true);

    showAnnouncement('DAG 1 IS BEGONNEN', `Jouw geheime rol: ${chosenPlayer.roleTitle} (${chosenPlayer.role})`, 'day');
    addEvent('🌅', `Dag 1 is begonnen! Jij speelt als ${chosenPlayer.roleTitle} (${chosenPlayer.role}).`, 'day');

    setMessages([
      { id: 1, sender: 'Systeem', text: `🌅 DAG 1 - Het spel is begonnen! Bespreek wie verdacht is en breng je stem uit.`, isSystem: true },
      { id: 2, sender: 'Martijn Geritsen', text: `Welkom ${playerName.trim()}! Overdag stemt het dorp een verdachte weg. 's Nachts voeren alle rollen hun geheime actie uit!`, isMayor: true }
    ]);
  };

  // --- FASE 1: DAG AFRONDEN & STEMMING VERWERKEN -> START NACHT ---
  const resolveDayToNight = () => {
    if (gamePhase !== 'DAG') return;

    // Laat alle levende AI-spelers logisch meestemmen
    const finalVotes = { ...votes };
    const aliveBots = playersList.filter((p) => !deadPlayers.includes(p.id) && p.id !== myPlayerId);
    const aliveAll = playersList.filter((p) => !deadPlayers.includes(p.id));

    aliveBots.forEach((bot) => {
      // Bots stemmen vaker op iemand die al stemmen heeft, of een willekeurige niet-wolf als de bot zelf wolf is
      const possibleTargets = aliveAll.filter((t) => {
        if (t.id === bot.id) return false;
        if (bot.role === 'Weerwolven' && t.role === 'Weerwolven') return false;
        return true;
      });
      if (possibleTargets.length > 0) {
        const chosen = possibleTargets[Math.floor(Math.random() * possibleTargets.length)];
        // Burgemeester (Willempie) telt voor 2 stemmen!
        const weight = bot.role === 'Burgemeester' ? 2 : 1;
        finalVotes[chosen.id] = (finalVotes[chosen.id] || 0) + weight;
      }
    });

    // Bepaal speler met meeste stemmen
    let topTargetId = null;
    let maxVotes = 0;
    Object.entries(finalVotes).forEach(([id, count]) => {
      if (count > maxVotes && !deadPlayers.includes(id)) {
        maxVotes = count;
        topTargetId = id;
      }
    });

    let currentDead = [...deadPlayers];

    if (topTargetId && maxVotes > 0) {
      const votedPlayer = playersList.find((p) => p.id === topTargetId);

      // Dorpsgek (Joost Groot) wint direct als hij overdag wordt weggestemd!
      if (votedPlayer.role === 'Dorpsgek') {
        currentDead.push(topTargetId);
        setDeadPlayers(currentDead);
        setGamePhase('GAMEOVER');
        setWinnerTeam('DORPSGEK');
        showAnnouncement('🤪 DE DORPSGEK WINT!', `${votedPlayer.playerName} was de Dorpsgek en wilde weggestemd worden!`, 'day');
        addEvent('🤪', `BIZAR! ${votedPlayer.playerName} was de Dorpsgek en wint het spel omdat hij werd weggestemd!`, 'day');
        return;
      }

      currentDead = eliminatePlayer(topTargetId, 'weggestemd', currentDead);
      setDeadPlayers(currentDead);

      showAnnouncement(
        `⚖️ HET DORP HEEFT GESTEMD (${maxVotes} stemmen)`,
        `${votedPlayer.playerName} is verbannen! Rol onthuld: ${votedPlayer.roleTitle} (${votedPlayer.role})`,
        'eliminated'
      );
      addEvent('⚖️', `Dag ${dayNumber} Stemming: ${votedPlayer.playerName} (${votedPlayer.roleTitle} - ${votedPlayer.role}) is weggestemd!`, 'danger');
      setMessages((m) => [
        ...m,
        {
          id: Date.now(),
          sender: 'Martijn Geritsen',
          text: `⚖️ Met ${maxVotes} stemmen heeft het dorp ${votedPlayer.playerName} weggestemd! Geheime rol was: ${votedPlayer.roleIcon} ${votedPlayer.roleTitle} (${votedPlayer.role}).`,
          isMayor: true
        }
      ]);

      if (checkWinCondition(currentDead)) return;
    } else {
      addEvent('⚖️', `Dag ${dayNumber}: Niemand had genoeg stemmen om weggestemd te worden.`, 'info');
    }

    // Start de NACHTFASE en bereid AI-nachtacties voor
    setVotes({});
    setMyVoteTarget(null);
    setNightActionDone(false);
    setProtectedPlayerId(null);
    setWitchAction(null);
    setGamePhase('NACHT');
    setTimer(30);

    // Kies alvast een doelwit voor de Weerwolven (zodat de Heks weet wie er wordt aangevallen!)
    const potentialWolfVictims = playersList.filter(
      (p) => !currentDead.includes(p.id) && p.role !== 'Weerwolven'
    );
    const chosenWolfVictim = potentialWolfVictims.length > 0
      ? potentialWolfVictims[Math.floor(Math.random() * potentialWolfVictims.length)]
      : null;

    setWolfTargetId(chosenWolfVictim ? chosenWolfVictim.id : null);

    // Beschermengel AI kiest iemand om te beschermen (als speler niet zelf Beschermengel is)
    if (myPlayer?.role !== 'Beschermengel') {
      const aliveForGuard = playersList.filter((p) => !currentDead.includes(p.id));
      const guardChoice = aliveForGuard[Math.floor(Math.random() * aliveForGuard.length)];
      if (guardChoice) setProtectedPlayerId(guardChoice.id);
    }

    // Spiekende meisje (als speler dat is) ziet automatisch een hint!
    if (myPlayer?.role === 'Spiekende meisje' && !currentDead.includes(myPlayerId)) {
      const wolves = playersList.filter((p) => p.role === 'Weerwolven' && !currentDead.includes(p.id));
      if (wolves.length > 0) {
        const spottedWolf = wolves[0];
        setRevealedRoles((prev) => ({ ...prev, [spottedWolf.id]: true }));
        addEvent('👁️', `Spiekende meisje: Je gluurde door je vingers en zag dat ${spottedWolf.playerName} een Weerwolf is!`, 'night');
      }
    }

    setMessages((m) => [
      ...m,
      { id: Date.now() + 1, sender: 'Systeem', text: `🌙 NACHT ${dayNumber} VALT - Iedereen sluit zijn ogen. Speciale rollen voeren nu hun actie uit!`, isWolf: true }
    ]);
  };

  // --- FASE 2: NACHT ACTIES VERWERKEN -> START VOLGENDE DAG ---
  const resolveNightToNextDay = (currentDay) => {
    if (gamePhase !== 'NACHT') return;

    const nextDay = currentDay + 1;
    let currentDead = [...deadPlayers];
    let nightReport = [];

    // 1. Controleer de aanval van de Weerwolven
    if (wolfTargetId && !currentDead.includes(wolfTargetId)) {
      const victim = playersList.find((p) => p.id === wolfTargetId);

      // Werd het slachtoffer beschermd door de Beschermengel?
      if (protectedPlayerId === wolfTargetId) {
        nightReport.push(`🛡️ De Beschermengel heeft ${victim.playerName} vannacht gered van een wolvenaanval!`);
        addEvent('🛡️', `Nacht ${currentDay}: De Beschermengel beschermde het doelwit van de Weerwolven! Niemand stierf.`, 'day');
      }
      // Werd het slachtoffer gered door het levensdrankje van de Heks?
      else if (witchAction?.type === 'SAVE') {
        nightReport.push(`🧪 De Heks heeft haar levensdrankje gebruikt om ${victim.playerName} van de dood te redden!`);
        addEvent('🧪', `Nacht ${currentDay}: De Heks redde het slachtoffer van de Weerwolven!`, 'day');
      }
      // Anders sterft het slachtoffer door de Weerwolven!
      else {
        currentDead = eliminatePlayer(wolfTargetId, 'weerwolven', currentDead);
        nightReport.push(`🐺 De Weerwolven hebben ${victim.playerName} (${victim.roleTitle} - ${victim.role}) verslonden!`);
        addEvent('🐺', `Nacht ${currentDay}: ${victim.playerName} is gedood door de Weerwolven! (${victim.roleTitle})`, 'danger');
      }
    }

    // 2. Controleer of de Heks haar gifdrankje heeft gebruikt
    if (witchAction?.type === 'POISON' && witchAction.targetId && !currentDead.includes(witchAction.targetId)) {
      const poisoned = playersList.find((p) => p.id === witchAction.targetId);
      currentDead = eliminatePlayer(witchAction.targetId, 'heks_gif', currentDead);
      nightReport.push(`☠️ De Heks heeft ${poisoned.playerName} (${poisoned.roleTitle}) vergiftigd!`);
      addEvent('☠️', `Nacht ${currentDay}: ${poisoned.playerName} (${poisoned.roleTitle}) werd vergiftigd door de Heks!`, 'danger');
    }

    setDeadPlayers(currentDead);
    setWolfTargetId(null);
    setGamePhase('DAG');
    setTimer(45);

    if (checkWinCondition(currentDead)) return;

    if (nightReport.length > 0) {
      showAnnouncement(
        `🌅 DAG ${nextDay} - OCHTENDNIEUWS`,
        nightReport.join(' | '),
        nightReport.some((r) => r.includes('🐺') || r.includes('☠️')) ? 'wolf' : 'day'
      );
      setMessages((m) => [
        ...m,
        {
          id: Date.now(),
          sender: `🌅 DAG ${nextDay} VERSLAG`,
          text: nightReport.join(' '),
          isEmergency: nightReport.some((r) => r.includes('🐺') || r.includes('☠️'))
        }
      ]);
    } else {
      showAnnouncement(`🌅 DAG ${nextDay} IS BEGONNEN`, 'Het was een rustige nacht in Wakkerdam. Niemand is gestorven.', 'day');
      addEvent('🌅', `Dag ${nextDay}: Niemand is vannacht gestorven.`, 'day');
    }
  };

  // --- INTERACTIEVE ROL-ACTIES VOOR DE SPELER IN DE NACHT ---
  const performRoleAction = (targetId) => {
    if (!myPlayer || deadPlayers.includes(myPlayerId)) return;
    const target = playersList.find((p) => p.id === targetId);
    if (!target) return;

    // 1. WEERWOLF (De zwarte tulp): Kies slachtoffer
    if (myPlayer.role === 'Weerwolven' && gamePhase === 'NACHT') {
      setWolfTargetId(targetId);
      setNightActionDone(true);
      addEvent('🐺', `Jij hebt ${target.playerName} gekozen als prooi voor vannacht!`, 'danger');
    }

    // 2. ZIENER (Dun): Bekijk geheime rol van een speler
    if (myPlayer.role === 'Ziener' && gamePhase === 'NACHT' && !nightActionDone) {
      setRevealedRoles((prev) => ({ ...prev, [targetId]: true }));
      setNightActionDone(true);
      showAnnouncement('🔮 ZIENER VISIOEN', `${target.playerName} is: ${target.roleTitle} (${target.role})!`, 'night');
      addEvent('🔮', `Visioen: Jij keek in je glazen bol en zag dat ${target.playerName} de ${target.roleTitle} (${target.role}) is!`, 'night');
    }

    // 3. BESCHERMENGEL (Max Verlopen): Bescherm iemand vannacht
    if (myPlayer.role === 'Beschermengel' && gamePhase === 'NACHT' && !nightActionDone) {
      setProtectedPlayerId(targetId);
      setNightActionDone(true);
      addEvent('🛡️', `Jij beschermt ${target.playerName} vannacht tegen de weerwolven!`, 'day');
    }

    // 4. HEKS (Nicolle Instructie): Gebruik gifdrankje op speler
    if (myPlayer.role === 'De heks' && gamePhase === 'NACHT' && !witchPoisonUsed && !nightActionDone) {
      setWitchAction({ type: 'POISON', targetId });
      setWitchPoisonUsed(true);
      setNightActionDone(true);
      addEvent('☠️', `Jij hebt je gifdrankje ingezet op ${target.playerName}!`, 'danger');
    }

    // 5. CUPIDO (Elsa de Tall): Koppel 2 geliefden op Dag/Nacht 1
    if (myPlayer.role === 'Cupido' && lovers.length < 2) {
      if (!lovers.includes(targetId)) {
        const newLovers = [...lovers, targetId];
        setLovers(newLovers);
        if (newLovers.length === 2) {
          const p1 = playersList.find((p) => p.id === newLovers[0]);
          const p2 = playersList.find((p) => p.id === newLovers[1]);
          addEvent('💘', `Cupido: Jij hebt ${p1.playerName} en ${p2.playerName} smoorverliefd op elkaar gemaakt!`, 'day');
          setNightActionDone(true);
        }
      }
    }

    // 6. JAGER (Virgil van Dam): Laatste schot na overlijden
    if (hunterMustShoot) {
      const updated = deadPlayers.includes(targetId) ? deadPlayers : [...deadPlayers, targetId];
      setDeadPlayers(updated);
      setHunterMustShoot(false);
      showAnnouncement('🎯 JAGER SCHIET!', `Jij schoot ${target.playerName} (${target.roleTitle}) neer met je laatste kogel!`, 'wolf');
      addEvent('🎯', `Jij nam ${target.playerName} (${target.roleTitle}) mee in je graf!`, 'danger');
      checkWinCondition(updated);
    }
  };

  const handleWitchSave = () => {
    if (!witchSaveUsed && wolfTargetId) {
      setWitchAction({ type: 'SAVE', targetId: wolfTargetId });
      setWitchSaveUsed(true);
      setNightActionDone(true);
      const savedObj = playersList.find((p) => p.id === wolfTargetId);
      addEvent('🧪', `Jij gebruikt je levensdrankje om ${savedObj?.playerName} te redden!`, 'day');
    }
  };

  useEffect(() => {
    if (!hasJoined || gamePhase === 'GAMEOVER') return;
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          if (gamePhase === 'DAG') {
            resolveDayToNight();
            return 30;
          } else {
            setDayNumber((d) => {
              resolveNightToNextDay(d);
              return d + 1;
            });
            return 45;
          }
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [hasJoined, gamePhase, votes, deadPlayers, wolfTargetId, protectedPlayerId, witchAction]);

  const handleNextPhaseManual = () => {
    if (gamePhase === 'DAG') {
      resolveDayToNight();
    } else if (gamePhase === 'NACHT') {
      setDayNumber((d) => {
        resolveNightToNextDay(d);
        return d + 1;
      });
    }
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleCardClick = (id) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleVote = (e, id, targetName) => {
    e.stopPropagation();
    if (deadPlayers.includes(id) || deadPlayers.includes(myPlayerId) || gamePhase !== 'DAG') return;

    // Verwijder eventuele eerdere stem van de speler zodat je maar 1x per dag stemt
    setVotes((prev) => {
      const updated = { ...prev };
      const weight = myPlayer?.role === 'Burgemeester' ? 2 : 1;
      if (myVoteTarget && updated[myVoteTarget]) {
        updated[myVoteTarget] = Math.max(0, updated[myVoteTarget] - weight);
      }
      updated[id] = (updated[id] || 0) + weight;
      return updated;
    });

    setMyVoteTarget(id);
    addEvent('🗳️', `${playerName || 'Jij'} stemde op ${targetName}${myPlayer?.role === 'Burgemeester' ? ' (2x Burgemeester-stem!)' : ''}`, 'info');
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), sender: 'Stemming', text: `🗳️ ${playerName || 'Jij'} heeft zijn stem uitgebracht op ${targetName}!`, isMayor: true }
    ]);
  };

  const triggerEmergency = () => {
    if (gamePhase === 'GAMEOVER') return;
    setEmergencyActive(true);
    setGamePhase('DAG');
    setTimer(30);
    showAnnouncement('🚨 NOODVERGADERING!', 'Iedereen naar het kampvuur! Stem direct op een verdachte!', 'wolf');
    addEvent('🚨', 'Noodvergadering ingeroepen door een speler!', 'danger');
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), sender: 'AMONG US NOODVERGADERING', text: '🚨 NOODBERAAD GEROEPEN! Stem binnen 30 seconden op een verdachte!', isEmergency: true }
    ]);
    setTimeout(() => setEmergencyActive(false), 5000);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), sender: playerName || 'Jij', text: inputMsg }
    ]);
    setInputMsg('');
    setTimeout(() => {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const isPlayerDead = deadPlayers.includes(myPlayerId);

  return (
    <div className={`flex flex-col h-screen w-screen overflow-hidden bg-slate-950 text-slate-100 font-sans select-none relative transition-colors duration-500 ${emergencyActive ? 'ring-8 ring-red-600/80 inset-0' : ''}`}>
      
      {/* NAAM & ROL KEUZE SCHERM (LOBBY MODAL) */}
      {!hasJoined && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border-2 border-amber-700 rounded-2xl max-w-md w-full p-6 shadow-2xl text-center space-y-5 relative overflow-hidden">
            <div className="text-3xl">🐺 🇳🇱 🌷</div>
            <div>
              <h2 className="text-2xl font-black uppercase text-amber-400 font-serif tracking-wider">
                Welkom in Wakkerdam
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                Speel echte Weerwolven! Kies je naam en eventueel je favoriete rol om te testen.
              </p>
            </div>
            <form onSubmit={handleJoinGame} className="space-y-4 text-left">
              <div>
                <label className="block text-[11px] font-bold uppercase text-amber-300 mb-1">Jouw Spelersnaam</label>
                <input
                  type="text"
                  required
                  maxLength={18}
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  placeholder="Typ je naam..."
                  className="w-full bg-slate-950 text-amber-100 text-center font-bold text-base rounded-xl px-4 py-2.5 border-2 border-amber-800 focus:outline-none focus:border-amber-500 placeholder-slate-600"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-amber-300 mb-1">Kies Rol (of Willekeurig)</label>
                <select
                  value={selectedRoleChoice}
                  onChange={(e) => setSelectedRoleChoice(e.target.value)}
                  className="w-full bg-slate-950 text-amber-200 font-semibold text-xs rounded-xl px-3 py-2.5 border-2 border-amber-800 focus:outline-none focus:border-amber-500"
                >
                  <option value="RANDOM">🎲 Willekeurige Geheime Rol</option>
                  <option value="Weerwolven">🐺 De zwarte tulp (Weerwolf - Dood 's nachts spelers)</option>
                  <option value="Ziener">🔮 Dun (Ziener - Bekijk 's nachts rollen)</option>
                  <option value="De heks">🧪 Nicolle Instructie (De heks - Red of vergiftig)</option>
                  <option value="Beschermengel">🛡️ Max Verlopen (Beschermengel - Bescherm spelers)</option>
                  <option value="Cupido">💘 Elsa de Tall (Cupido - Koppel 2 geliefden)</option>
                  <option value="Jager">🎯 Virgil van Dam (Jager - Schiet bij sterven)</option>
                  <option value="Burgemeester">👑 Willempie (Burgemeester - Dubbele stem)</option>
                  <option value="Spiekende meisje">👁️ Annie Frankie (Spiekende meisje - Bespied wolven)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-600 to-red-700 hover:from-amber-500 hover:to-red-600 text-white font-black uppercase tracking-wider py-3 rounded-xl shadow-lg transition-transform active:scale-95"
              >
                Start Dag 1 & Ontvang Rol
              </button>
            </form>
          </div>
        </div>
      )}

      {/* GAME OVER MODAL */}
      {gamePhase === 'GAMEOVER' && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border-2 border-amber-500 rounded-2xl max-w-lg w-full p-6 shadow-2xl text-center space-y-4">
            <div className="text-4xl">{winnerTeam === 'BURGERS' ? '🏆🎉' : winnerTeam === 'DORPSGEK' ? '🤪🎭' : '🐺🩸'}</div>
            <h2 className="text-2xl font-black uppercase text-amber-400 font-serif">
              {winnerTeam === 'BURGERS'
                ? 'De Burgers Hebben Gewonnen!'
                : winnerTeam === 'DORPSGEK'
                ? 'De Dorpsgek Heeft Gewonnen!'
                : 'De Weerwolven Hebben Gewonnen!'}
            </h2>
            <p className="text-xs text-slate-300">
              Alle geheime rollen van Wakkerdam zijn nu onthuld!
            </p>
            <div className="max-h-48 overflow-y-auto bg-slate-950 rounded-xl p-3 border border-amber-900/60 text-left space-y-1 text-xs">
              {playersList.map((p) => (
                <div key={p.id} className="flex justify-between items-center py-0.5 border-b border-slate-900">
                  <span className={deadPlayers.includes(p.id) ? 'text-red-400 line-through' : 'text-emerald-400 font-bold'}>
                    {p.playerName} {p.id === myPlayerId ? '(JIJ)' : ''}
                  </span>
                  <span className="text-amber-300">{p.roleIcon} {p.roleTitle} ({p.role})</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => setHasJoined(false)}
              className="w-full bg-gradient-to-r from-amber-600 to-red-700 hover:from-amber-500 hover:to-red-600 text-white font-black uppercase py-3 rounded-xl shadow-lg"
            >
              Nieuw Potje Spelen
            </button>
          </div>
        </div>
      )}

      {/* DRAMATISCHE DAG/NACHT AANKONDIGING BANNER */}
      {phaseBanner && (
        <div className="fixed inset-x-0 top-20 z-40 flex justify-center pointer-events-none px-4 animate-bounce">
          <div className={`px-8 py-4 rounded-2xl text-center max-w-xl border-2 shadow-2xl ${
            phaseBanner.variant === 'wolf'
              ? 'bg-gradient-to-r from-slate-950 via-red-950 to-slate-950 border-red-500 shadow-[0_0_50px_rgba(239,68,68,0.8)]'
              : phaseBanner.variant === 'night'
              ? 'bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-950 border-indigo-400 shadow-[0_0_50px_rgba(99,102,241,0.7)]'
              : 'bg-gradient-to-r from-slate-950 via-amber-950 to-slate-950 border-amber-400 shadow-[0_0_50px_rgba(245,158,11,0.6)]'
          }`}>
            <div className={`text-xs uppercase tracking-[0.3em] font-bold mb-1 ${
              phaseBanner.variant === 'wolf' ? 'text-red-300' : phaseBanner.variant === 'night' ? 'text-indigo-300' : 'text-amber-300'
            }`}>
              {phaseBanner.variant === 'wolf' ? '🐺 Aanval in Wakkerdam' : phaseBanner.variant === 'night' ? '🌙 Nachtvisioen' : '🌅 Wakkerdam Bericht'}
            </div>
            <div className={`text-xl md:text-2xl font-black font-serif uppercase tracking-wider ${
              phaseBanner.variant === 'wolf' ? 'text-red-400' : phaseBanner.variant === 'night' ? 'text-indigo-200' : 'text-amber-300'
            }`}>
              {phaseBanner.title}
            </div>
            <p className="text-xs text-slate-100 mt-1.5 font-semibold">
              {phaseBanner.subtitle}
            </p>
          </div>
        </div>
      )}

      {/* Background Village Environment */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className={`absolute inset-0 transition-colors duration-1000 ${
          gamePhase === 'NACHT'
            ? 'bg-gradient-to-b from-[#010208] via-[#05081a] to-[#010206]'
            : 'bg-gradient-to-b from-[#060d24] via-[#111936] to-[#040712]'
        }`} />

        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_50%_35%,rgba(245,158,11,0.12),transparent_65%)]" />
        <div className="absolute bottom-24 inset-x-0 h-48 bg-gradient-to-t from-slate-900/90 via-slate-800/30 to-transparent blur-xl animate-pulse" />

        {/* Eerie Glowing Moon */}
        <div className={`absolute top-4 left-1/2 -translate-x-1/2 w-56 h-56 rounded-full transition-all duration-1000 flex items-center justify-center ${
          gamePhase === 'NACHT'
            ? 'bg-red-500/15 shadow-[0_0_160px_rgba(239,68,68,0.4)] border border-red-400/30'
            : 'bg-amber-100/15 shadow-[0_0_140px_rgba(251,191,36,0.3)] border border-amber-200/20'
        }`}>
          <div className="w-44 h-44 rounded-full bg-amber-50/10 backdrop-blur-sm" />
        </div>

        {/* Silhouette Bomen */}
        <div className="absolute bottom-20 inset-x-0 h-64 flex items-end justify-between px-2 opacity-60">
          {Array.from({ length: 18 }).map((_, idx) => (
            <svg
              key={`tree-${idx}`}
              viewBox="0 0 100 160"
              className={`h-44 md:h-60 fill-slate-950 ${idx % 2 === 0 ? 'scale-110' : 'scale-90 opacity-80'}`}
            >
              <polygon points="50,10 15,75 35,75 10,120 42,120 42,160 58,160 58,120 90,120 65,75 85,75" />
            </svg>
          ))}
        </div>

        {/* Draaiende Windmolen Silhouetten */}
        <div className="absolute bottom-24 left-8 w-52 h-72 opacity-55">
          <svg viewBox="0 0 100 120" className="w-full h-full fill-slate-950">
            <polygon points="36,120 64,120 56,42 44,42" />
            <path d="M42,42 Q50,28 58,42 Z" />
            <g className="origin-[50px_42px] animate-[spin_28s_linear_infinite]">
              <rect x="48" y="4" width="4" height="76" />
              <rect x="12" y="40" width="76" height="4" />
              <rect x="52" y="8" width="8" height="26" opacity="0.6" />
              <rect x="40" y="50" width="8" height="26" opacity="0.6" />
              <rect x="58" y="44" width="26" height="8" opacity="0.6" />
              <rect x="16" y="32" width="26" height="8" opacity="0.6" />
            </g>
            <circle cx="50" cy="42" r="4" fill="#d97706" opacity="0.5" />
          </svg>
        </div>

        <div className="absolute bottom-24 right-8 w-52 h-72 opacity-55">
          <svg viewBox="0 0 100 120" className="w-full h-full fill-slate-950">
            <polygon points="36,120 64,120 56,42 44,42" />
            <path d="M42,42 Q50,28 58,42 Z" />
            <g className="origin-[50px_42px] animate-[spin_34s_linear_infinite_reverse]">
              <rect x="48" y="4" width="4" height="76" />
              <rect x="12" y="40" width="76" height="4" />
              <rect x="52" y="8" width="8" height="26" opacity="0.6" />
              <rect x="40" y="50" width="8" height="26" opacity="0.6" />
              <rect x="58" y="44" width="26" height="8" opacity="0.6" />
              <rect x="16" y="32" width="26" height="8" opacity="0.6" />
            </g>
            <circle cx="50" cy="42" r="4" fill="#d97706" opacity="0.5" />
          </svg>
        </div>

        {/* Tulpenveld */}
        <div className="absolute bottom-0 inset-x-0 h-20 flex items-end justify-around px-2 opacity-75">
          {Array.from({ length: 34 }).map((_, i) => (
            <div key={`tulip-${i}`} className="flex flex-col items-center">
              <svg viewBox="0 0 24 32" className="w-5 h-7">
                <path d="M12,32 L12,14" stroke="#064e3b" strokeWidth="2.5" />
                <path d="M12,24 Q6,20 5,15 Q10,18 12,22" fill="#065f46" />
                <path
                  d="M7,14 C7,6 10,4 12,8 C14,4 17,6 17,14 C17,18 7,18 7,14 Z"
                  fill={i % 3 === 0 ? '#991b1b' : i % 3 === 1 ? '#b45309' : '#7f1d1d'}
                />
              </svg>
            </div>
          ))}
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-transparent to-slate-950/85" />
      </div>

      {/* --- HEADER BANNER --- */}
      <header className="relative z-10 flex items-center justify-between px-6 py-2.5 bg-slate-900/90 backdrop-blur-md border-b-2 border-amber-900/70 shadow-2xl">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 rounded-lg bg-amber-950/80 border border-amber-700/50 hover:bg-amber-900 text-amber-400 transition-colors"
            title="Geluid in/uitschakelen"
          >
            {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>
          <span className="hidden sm:inline-block text-xs font-semibold text-amber-300/80 tracking-wider uppercase bg-amber-950/60 px-3 py-1 rounded-full border border-amber-800/50">
            Weerwolven x Among Us NL
          </span>
        </div>

        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2">
            <span className="text-xl">🇳🇱</span>
            <h1 className="text-2xl md:text-3xl font-black tracking-wider uppercase text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 drop-shadow-[0_2px_12px_rgba(239,68,68,0.4)] font-serif">
              THE DUTCH BETRAIL
            </h1>
            <span className="text-xl">🐺</span>
          </div>
          <p className="text-[11px] font-semibold tracking-widest text-amber-200/70 -mt-1">
            after <span className="text-amber-300">Weerwolven van Wakkerdam</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={triggerEmergency}
            className="flex items-center gap-1.5 bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 text-white font-black text-xs px-3.5 py-2 rounded-lg border-2 border-red-400 shadow-[0_0_15px_rgba(239,68,68,0.6)] transition-transform active:scale-95"
          >
            <Siren size={16} className="animate-bounce" />
            <span>NOODVERGADERING</span>
          </button>

          <div className={`hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
            gamePhase === 'NACHT'
              ? 'bg-indigo-950/90 border-indigo-500 text-indigo-200'
              : 'bg-amber-950/80 border-amber-600/60 text-amber-300'
          }`}>
            <Moon size={14} className="animate-pulse" />
            <span>{gamePhase === 'NACHT' ? `Nacht ${dayNumber}` : `Dag ${dayNumber}`}</span>
          </div>
        </div>
      </header>

      {/* --- MAIN CONTENT LAYOUT --- */}
      <div className="relative z-10 flex-1 flex overflow-hidden p-3 gap-4">
        
        {/* 1. LEFT SIDEBAR: Presentator & Jouw Geheime Rol + Nachtactie Paneel */}
        <aside className="w-64 flex-shrink-0 flex flex-col gap-3">
          {/* Presentator Box */}
          <div className="bg-slate-900/90 border-2 border-amber-800/80 rounded-2xl p-3 flex flex-col items-center shadow-2xl relative overflow-hidden">
            <div className="text-[10px] uppercase font-bold tracking-widest text-amber-400 mb-1">
              Presentator
            </div>

            <div className="w-20 h-20 rounded-full bg-gradient-to-b from-amber-800/40 to-slate-950 border-2 border-amber-600/80 flex items-center justify-center overflow-hidden shadow-inner mb-1.5 relative">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path d="M25 95 C25 70 35 62 50 62 C65 62 75 70 75 95 Z" fill="#1e3a8a" />
                <path d="M42 62 L50 85 L58 62 Z" fill="#f8fafc" />
                <circle cx="50" cy="42" r="18" fill="#fca5a5" />
                <path d="M32 36 Q50 18 68 36 Q65 25 50 24 Q35 25 32 36 Z" fill="#451a03" />
                <circle cx="44" cy="40" r="2" fill="#0f172a" />
                <circle cx="56" cy="40" r="2" fill="#0f172a" />
                <path d="M44 48 Q50 53 56 48" fill="none" stroke="#991b1b" strokeWidth="2" />
                <line x1="65" y1="80" x2="58" y2="56" stroke="#334155" strokeWidth="4" strokeLinecap="round" />
                <circle cx="57" cy="54" r="5" fill="#94a3b8" />
              </svg>
            </div>

            <div className="w-full bg-gradient-to-r from-red-900 via-red-800 to-red-900 border border-amber-600/50 rounded-lg py-1 px-2 text-center shadow-md mb-1">
              <div className="text-amber-100 font-extrabold text-xs tracking-wide">
                Martijn Geritsen
              </div>
            </div>

            <div className="w-full bg-slate-950/90 border border-amber-900/70 rounded-lg py-1 px-2 text-center">
              <span className={`text-[10px] font-bold tracking-wider uppercase ${gamePhase === 'NACHT' ? 'text-indigo-400' : 'text-amber-300'}`}>
                {gamePhase === 'NACHT' ? `🌙 NACHT ${dayNumber} - Rollen Actief` : `🌅 DAG ${dayNumber} - Stemfase`}
              </span>
            </div>

            <button
              onClick={handleNextPhaseManual}
              className="mt-1.5 w-full bg-amber-900/70 hover:bg-amber-800 border border-amber-600/60 text-amber-200 text-[10px] font-bold py-1 px-2 rounded-lg transition-colors"
            >
              {gamePhase === 'DAG' ? '⏭️ Stemming Afronden (Naar Nacht)' : '⏭️ Nacht Afronden (Volgende Dag)'}
            </button>
          </div>

          {/* JOUW GEHEIME ROL & SPECIFIEKE ROL-ACTIES */}
          {myPlayer && (
            <div className="flex-1 bg-gradient-to-b from-amber-950/90 to-slate-950/95 border-2 border-amber-500/80 rounded-2xl p-3 flex flex-col items-center justify-between shadow-2xl relative overflow-y-auto">
              <div className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-amber-300">
                <UserCheck size={14} />
                <span>Jouw Geheime Rol</span>
              </div>

              <div className="w-16 h-16 rounded-xl bg-slate-900/80 border border-amber-600/60 p-1 shadow-inner">
                {myPlayer.svgAvatar}
              </div>

              <div className="text-center">
                <div className="text-sm font-black text-amber-400">
                  {myPlayer.roleIcon} {myPlayer.roleTitle}
                </div>
                <div className="text-[11px] text-amber-200/80 font-semibold">
                  ({myPlayer.role})
                </div>
              </div>

              {/* ROL SPECIFIEKE INSTRUCTIE & ACTIE KNOPPEN */}
              <div className="w-full bg-slate-900/95 border border-amber-700/70 rounded-xl p-2 text-[10px] text-slate-200 space-y-1.5">
                {isPlayerDead && !hunterMustShoot ? (
                  <div className="text-red-400 font-bold text-center">
                    💀 Je bent gestorven. Kijk toe hoe het dorp verder speelt!
                  </div>
                ) : hunterMustShoot ? (
                  <div className="text-red-300 font-bold text-center animate-pulse">
                    🎯 JAGER ACTIE: Klik direct op de kaart van een speler om neer te schieten!
                  </div>
                ) : myPlayer.role === 'Weerwolven' ? (
                  <div>
                    <div className="font-bold text-red-400">🐺 Weerwolf Kracht:</div>
                    <p>{gamePhase === 'NACHT' ? 'Klik op een spelerkaart in het midden om vannacht aan te vallen!' : 'Doe overdag onopvallend mee met de stemming.'}</p>
                  </div>
                ) : myPlayer.role === 'Ziener' ? (
                  <div>
                    <div className="font-bold text-indigo-300">🔮 Ziener Kracht:</div>
                    <p>{gamePhase === 'NACHT' ? (nightActionDone ? '✅ Je hebt vannacht al een rol bekeken.' : 'Klik op een spelerkaart om diens geheime rol te zien!') : 'Wacht tot de nacht valt om een rol te bekijken.'}</p>
                  </div>
                ) : myPlayer.role === 'De heks' ? (
                  <div className="space-y-1">
                    <div className="font-bold text-purple-300">🧪 Heks Drankjes:</div>
                    {gamePhase === 'NACHT' && wolfTargetId && !witchSaveUsed && (
                      <button
                        onClick={handleWitchSave}
                        className="w-full bg-emerald-700 hover:bg-emerald-600 text-white font-bold py-1 px-2 rounded text-[10px]"
                      >
                        🧪 Red {playersList.find((p) => p.id === wolfTargetId)?.playerName} (Levensdrankje)
                      </button>
                    )}
                    <p className="text-[9px] text-slate-400">
                      {gamePhase === 'NACHT' && !witchPoisonUsed ? 'Of klik op een spelerkaart om te vergiftigen.' : 'Drankjes: ' + (witchSaveUsed ? '❌' : '💚') + ' ' + (witchPoisonUsed ? '❌' : '☠️')}
                    </p>
                  </div>
                ) : myPlayer.role === 'Beschermengel' ? (
                  <div>
                    <div className="font-bold text-sky-300">🛡️ Beschermengel:</div>
                    <p>{gamePhase === 'NACHT' ? (nightActionDone ? '✅ Speler is vannacht beschermd.' : 'Klik op een speler om te beschermen tegen wolven!') : 'Wacht op de nacht om iemand te beschermen.'}</p>
                  </div>
                ) : myPlayer.role === 'Cupido' ? (
                  <div>
                    <div className="font-bold text-pink-300">💘 Cupido ({lovers.length}/2):</div>
                    <p>{lovers.length < 2 ? 'Klik op 2 spelers om ze smoorverliefd te koppelen!' : '✅ Geliefden zijn gekoppeld!'}</p>
                  </div>
                ) : myPlayer.role === 'Burgemeester' ? (
                  <div>
                    <div className="font-bold text-amber-300">👑 Burgemeester:</div>
                    <p>Jouw stem telt overdag dubbel (2 stemmen)!</p>
                  </div>
                ) : (
                  <div>
                    <div className="font-bold text-amber-300">{myPlayer.roleIcon} {myPlayer.role}:</div>
                    <p>Ontmasker de weerwolven overdag via de chat en stemming!</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </aside>

        {/* 2. CENTER: Poppetjes in een kring om het Kampvuur */}
        <main className="flex-1 bg-slate-950/55 backdrop-blur-sm border-2 border-amber-900/70 rounded-2xl p-3 overflow-y-auto custom-scrollbar shadow-2xl relative flex flex-col justify-between">
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_52%,rgba(249,115,22,0.22),transparent_60%)]" />

          {/* BOVENSTE BOOG VAN POPPETJES */}
          <div className="relative z-10 grid grid-cols-4 sm:grid-cols-7 gap-2.5">
            {playersList.slice(0, 7).map((player) => {
              const isMe = player.id === myPlayerId;
              const isDead = deadPlayers.includes(player.id);
              const isRoleVisible = isMe || isDead || revealedRoles[player.id] || (myPlayer?.role === 'Weerwolven' && player.role === 'Weerwolven');
              const isFlipped = flippedCards[player.id];
              const playerVotes = votes[player.id] || 0;
              const isLover = lovers.includes(player.id);
              const isWolfPrey = wolfTargetId === player.id && (myPlayer?.role === 'Weerwolven' || myPlayer?.role === 'De heks');

              const canUseRoleActionOnCard =
                !isDead &&
                ((gamePhase === 'NACHT' && !isPlayerDead && (
                  (myPlayer?.role === 'Weerwolven' && player.role !== 'Weerwolven') ||
                  (myPlayer?.role === 'Ziener' && !nightActionDone && !isMe) ||
                  (myPlayer?.role === 'Beschermengel' && !nightActionDone) ||
                  (myPlayer?.role === 'De heks' && !witchPoisonUsed && !nightActionDone && !isMe)
                )) ||
                (myPlayer?.role === 'Cupido' && lovers.length < 2 && !isLover) ||
                hunterMustShoot);

              return (
                <div
                  key={player.id}
                  onClick={() => canUseRoleActionOnCard ? performRoleAction(player.id) : handleCardClick(player.id)}
                  className={`relative h-40 sm:h-44 cursor-pointer group perspective-1000 ${isDead ? 'opacity-75 grayscale' : ''}`}
                >
                  <div className={`w-full h-full transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
                    <div className={`absolute inset-0 backface-hidden bg-slate-900/95 border-2 rounded-xl overflow-hidden shadow-lg flex flex-col transition-all ${
                      isDead ? 'border-red-800/90 bg-red-950/30' : canUseRoleActionOnCard ? 'border-indigo-400 ring-2 ring-indigo-500/60 animate-pulse' : isMe ? 'border-amber-400 ring-2 ring-amber-500/50' : 'border-amber-800/80 group-hover:border-amber-500'
                    }`}>
                      <div className="absolute top-1 inset-x-1.5 flex justify-between items-center z-20">
                        <span className="bg-slate-950/90 border border-amber-700/60 rounded px-1 py-0.5 text-[10px]">
                          {isRoleVisible ? player.topBadge : '❓'}
                        </span>
                        <div className="flex items-center gap-0.5">
                          {isLover && <span className="text-[10px]">💘</span>}
                          {isWolfPrey && <span className="text-[10px] bg-red-700 px-1 rounded">🎯</span>}
                          {isDead ? (
                            <span className="bg-red-800 text-white font-black px-1.5 py-0.5 rounded text-[8px] uppercase">
                              💀 DOOD
                            </span>
                          ) : playerVotes > 0 ? (
                            <span className="bg-red-600 text-white font-extrabold px-1.5 py-0.5 rounded-full text-[9px] flex items-center gap-0.5">
                              <Vote size={9} /> {playerVotes}
                            </span>
                          ) : isMe ? (
                            <span className="text-[9px] bg-amber-500 text-slate-950 font-black px-1 rounded">JIJ</span>
                          ) : null}
                        </div>
                      </div>

                      <div className={`flex-1 bg-gradient-to-b ${isRoleVisible ? player.avatarBg : 'from-slate-800/90 to-slate-950'} relative flex items-center justify-center p-1.5 pt-3 overflow-hidden`}>
                        {isRoleVisible ? (
                          <div className="w-16 h-16 transform group-hover:scale-105 transition-transform duration-300">
                            {player.svgAvatar}
                          </div>
                        ) : (
                          <div className="w-14 h-14 rounded-full bg-slate-950/90 border border-amber-800/60 flex flex-col items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                            <span className="text-2xl opacity-75">👤</span>
                          </div>
                        )}
                      </div>

                      <div className="bg-gradient-to-b from-amber-950 to-slate-950 p-1 border-t border-amber-800/80 text-center">
                        <div className={`font-bold text-[11px] truncate ${isDead ? 'text-red-400 line-through' : 'text-amber-100'}`}>
                          {player.playerName}
                        </div>
                        {isRoleVisible ? (
                          <div className={`text-[9px] font-bold truncate ${isDead ? 'text-red-300' : 'text-amber-400'}`}>
                            {player.roleIcon} {player.roleTitle}
                          </div>
                        ) : (
                          <div className="text-slate-400 text-[9px] italic truncate">
                            Geheime Rol
                          </div>
                        )}
                        {isDead ? (
                          <div className="mt-0.5 bg-red-950 border border-red-800 text-red-400 text-[8px] font-black py-0.5 rounded uppercase">
                            Geëlimineerd
                          </div>
                        ) : canUseRoleActionOnCard ? (
                          <div className="mt-0.5 bg-indigo-700 text-white text-[9px] font-black py-0.5 rounded uppercase">
                            ⚡ Gebruik Kracht
                          </div>
                        ) : gamePhase === 'DAG' && !isMe && !isPlayerDead ? (
                          <button
                            onClick={(e) => handleVote(e, player.id, player.playerName)}
                            className={`mt-0.5 w-full border text-[9px] font-bold py-0.5 rounded flex items-center justify-center gap-1 transition-colors ${
                              myVoteTarget === player.id
                                ? 'bg-amber-600 border-amber-300 text-slate-950 font-black'
                                : 'bg-red-950/90 hover:bg-red-700 border-red-600/70 text-red-200'
                            }`}
                          >
                            <Vote size={9} /> {myVoteTarget === player.id ? 'Gestemd ✓' : 'Stem'}
                          </button>
                        ) : (
                          <div className="mt-0.5 bg-slate-900/80 border border-slate-800 text-slate-400 text-[9px] py-0.5 rounded">
                            {isMe ? 'Jouw Kaart' : '🌙 Slaapt...'}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-b from-amber-950 via-slate-950 to-slate-950 border-2 border-amber-600 rounded-xl p-2 flex flex-col items-center justify-between shadow-2xl">
                      <div className="text-[8px] font-serif font-bold text-amber-500 uppercase">THE DUTCH BETRAIL</div>
                      <div className="w-14 h-14 rounded-full bg-red-950 border border-red-700/50 flex items-center justify-center">
                        <span className="text-xl">🐺</span>
                      </div>
                      <div className="text-[8px] text-amber-300/70 uppercase">Verborgen</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CENTRAAL GLOEIEND KAMPVUUR */}
          <div className="relative z-10 my-2 py-3 flex flex-col items-center justify-center">
            <div className="absolute w-80 h-28 bg-orange-500/25 rounded-full blur-2xl animate-pulse" />
            <div className="relative w-32 h-14 flex justify-center items-end overflow-visible">
              <span className="w-1.5 h-1.5 bg-amber-300 rounded-full animate-ping absolute bottom-6 left-8" />
              <span className="w-2 h-2 bg-orange-400 rounded-full animate-bounce absolute bottom-8 right-9" />
              <div className="w-20 h-20 bg-gradient-to-t from-red-600 via-orange-500 to-amber-300 rounded-t-full blur-[2px] animate-pulse opacity-95" />
              <div className="absolute w-12 h-14 bg-gradient-to-t from-orange-500 via-yellow-300 to-white rounded-t-full blur-[1px]" />
            </div>
            <div className="relative w-36 h-6 flex items-center justify-center -mt-2">
              <div className="w-20 h-3.5 bg-amber-950 rounded-full rotate-12 border border-amber-800 shadow-lg" />
              <div className="w-20 h-3.5 bg-stone-900 rounded-full -rotate-12 border border-amber-900 shadow-lg -ml-10" />
            </div>
            <span className="mt-1.5 text-[10px] font-serif uppercase tracking-widest text-amber-300/80 bg-slate-950/80 px-3 py-0.5 rounded-full border border-amber-800/60 shadow">
              {gamePhase === 'NACHT' ? '🌙 Nacht in Wakkerdam - Speciale Rollen Actief' : '🔥 Dorpskampvuur - Dagberaad & Stemming'}
            </span>
          </div>

          {/* ONDERSTE BOOG VAN POPPETJES */}
          <div className="relative z-10 grid grid-cols-4 sm:grid-cols-7 gap-2.5">
            {playersList.slice(7, 14).map((player) => {
              const isMe = player.id === myPlayerId;
              const isDead = deadPlayers.includes(player.id);
              const isRoleVisible = isMe || isDead || revealedRoles[player.id] || (myPlayer?.role === 'Weerwolven' && player.role === 'Weerwolven');
              const isFlipped = flippedCards[player.id];
              const playerVotes = votes[player.id] || 0;
              const isLover = lovers.includes(player.id);
              const isWolfPrey = wolfTargetId === player.id && (myPlayer?.role === 'Weerwolven' || myPlayer?.role === 'De heks');

              const canUseRoleActionOnCard =
                !isDead &&
                ((gamePhase === 'NACHT' && !isPlayerDead && (
                  (myPlayer?.role === 'Weerwolven' && player.role !== 'Weerwolven') ||
                  (myPlayer?.role === 'Ziener' && !nightActionDone && !isMe) ||
                  (myPlayer?.role === 'Beschermengel' && !nightActionDone) ||
                  (myPlayer?.role === 'De heks' && !witchPoisonUsed && !nightActionDone && !isMe)
                )) ||
                (myPlayer?.role === 'Cupido' && lovers.length < 2 && !isLover) ||
                hunterMustShoot);

              return (
                <div
                  key={player.id}
                  onClick={() => canUseRoleActionOnCard ? performRoleAction(player.id) : handleCardClick(player.id)}
                  className={`relative h-40 sm:h-44 cursor-pointer group perspective-1000 ${isDead ? 'opacity-75 grayscale' : ''}`}
                >
                  <div className={`w-full h-full transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
                    <div className={`absolute inset-0 backface-hidden bg-slate-900/95 border-2 rounded-xl overflow-hidden shadow-lg flex flex-col transition-all ${
                      isDead ? 'border-red-800/90 bg-red-950/30' : canUseRoleActionOnCard ? 'border-indigo-400 ring-2 ring-indigo-500/60 animate-pulse' : isMe ? 'border-amber-400 ring-2 ring-amber-500/50' : 'border-amber-800/80 group-hover:border-amber-500'
                    }`}>
                      <div className="absolute top-1 inset-x-1.5 flex justify-between items-center z-20">
                        <span className="bg-slate-950/90 border border-amber-700/60 rounded px-1 py-0.5 text-[10px]">
                          {isRoleVisible ? player.topBadge : '❓'}
                        </span>
                        <div className="flex items-center gap-0.5">
                          {isLover && <span className="text-[10px]">💘</span>}
                          {isWolfPrey && <span className="text-[10px] bg-red-700 px-1 rounded">🎯</span>}
                          {isDead ? (
                            <span className="bg-red-800 text-white font-black px-1.5 py-0.5 rounded text-[8px] uppercase">
                              💀 DOOD
                            </span>
                          ) : playerVotes > 0 ? (
                            <span className="bg-red-600 text-white font-extrabold px-1.5 py-0.5 rounded-full text-[9px] flex items-center gap-0.5">
                              <Vote size={9} /> {playerVotes}
                            </span>
                          ) : isMe ? (
                            <span className="text-[9px] bg-amber-500 text-slate-950 font-black px-1 rounded">JIJ</span>
                          ) : null}
                        </div>
                      </div>

                      <div className={`flex-1 bg-gradient-to-b ${isRoleVisible ? player.avatarBg : 'from-slate-800/90 to-slate-950'} relative flex items-center justify-center p-1.5 pt-3 overflow-hidden`}>
                        {isRoleVisible ? (
                          <div className="w-16 h-16 transform group-hover:scale-105 transition-transform duration-300">
                            {player.svgAvatar}
                          </div>
                        ) : (
                          <div className="w-14 h-14 rounded-full bg-slate-950/90 border border-amber-800/60 flex flex-col items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                            <span className="text-2xl opacity-75">👤</span>
                          </div>
                        )}
                      </div>

                      <div className="bg-gradient-to-b from-amber-950 to-slate-950 p-1 border-t border-amber-800/80 text-center">
                        <div className={`font-bold text-[11px] truncate ${isDead ? 'text-red-400 line-through' : 'text-amber-100'}`}>
                          {player.playerName}
                        </div>
                        {isRoleVisible ? (
                          <div className={`text-[9px] font-bold truncate ${isDead ? 'text-red-300' : 'text-amber-400'}`}>
                            {player.roleIcon} {player.roleTitle}
                          </div>
                        ) : (
                          <div className="text-slate-400 text-[9px] italic truncate">
                            Geheime Rol
                          </div>
                        )}
                        {isDead ? (
                          <div className="mt-0.5 bg-red-950 border border-red-800 text-red-400 text-[8px] font-black py-0.5 rounded uppercase">
                            Geëlimineerd
                          </div>
                        ) : canUseRoleActionOnCard ? (
                          <div className="mt-0.5 bg-indigo-700 text-white text-[9px] font-black py-0.5 rounded uppercase">
                            ⚡ Gebruik Kracht
                          </div>
                        ) : gamePhase === 'DAG' && !isMe && !isPlayerDead ? (
                          <button
                            onClick={(e) => handleVote(e, player.id, player.playerName)}
                            className={`mt-0.5 w-full border text-[9px] font-bold py-0.5 rounded flex items-center justify-center gap-1 transition-colors ${
                              myVoteTarget === player.id
                                ? 'bg-amber-600 border-amber-300 text-slate-950 font-black'
                                : 'bg-red-950/90 hover:bg-red-700 border-red-600/70 text-red-200'
                            }`}
                          >
                            <Vote size={9} /> {myVoteTarget === player.id ? 'Gestemd ✓' : 'Stem'}
                          </button>
                        ) : (
                          <div className="mt-0.5 bg-slate-900/80 border border-slate-800 text-slate-400 text-[9px] py-0.5 rounded">
                            {isMe ? 'Jouw Kaart' : '🌙 Slaapt...'}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-b from-amber-950 via-slate-950 to-slate-950 border-2 border-amber-600 rounded-xl p-2 flex flex-col items-center justify-between shadow-2xl">
                      <div className="text-[8px] font-serif font-bold text-amber-500 uppercase">THE DUTCH BETRAIL</div>
                      <div className="w-14 h-14 rounded-full bg-red-950 border border-red-700/50 flex items-center justify-center">
                        <span className="text-xl">🐺</span>
                      </div>
                      <div className="text-[8px] text-amber-300/70 uppercase">Verborgen</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </main>

        {/* 3. RIGHT SIDEBAR: Status, Gebeurtenissen & Live Chat */}
        <aside className="w-80 flex-shrink-0 flex flex-col gap-3">
          <div className="bg-slate-900/90 border-2 border-amber-800/80 rounded-xl p-3 shadow-xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-amber-950 border border-amber-700 flex items-center justify-center text-amber-400 font-bold">
                <Clock size={18} />
              </div>
              <div>
                <div className="text-xs text-amber-400/80 font-bold uppercase tracking-wider">
                  {gamePhase === 'NACHT' ? `Nacht ${dayNumber}` : `Dag ${dayNumber}`}
                </div>
                <div className="text-sm font-extrabold text-amber-100">
                  Tijd over: <span className="text-amber-400 font-mono">{formatTime(timer)}</span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-[10px] text-slate-400 font-bold uppercase">Spelers levend</div>
              <div className="text-lg font-black text-emerald-400 flex items-center justify-end gap-1">
                <Users size={16} /> {14 - deadPlayers.length}
              </div>
            </div>
          </div>

          {/* LIVE GEBEURTENISSEN LOGBOEK */}
          <div className="bg-slate-900/90 border-2 border-red-900/70 rounded-xl p-3 text-xs space-y-2 shadow-lg">
            <div className="text-[10px] font-black uppercase tracking-wider text-amber-400 flex items-center justify-between border-b border-amber-900/50 pb-1">
              <span>📜 Gebeurtenissen in het Dorp</span>
              <span className="text-red-400 animate-pulse">● LIVE</span>
            </div>
            <div className="space-y-1.5 max-h-28 overflow-y-auto custom-scrollbar">
              {eventLog.map((ev) => (
                <div
                  key={ev.id}
                  className={`p-1.5 rounded border text-[11px] font-medium flex items-start gap-1.5 ${
                    ev.type === 'danger'
                      ? 'bg-red-950/70 border-red-700/70 text-red-200 font-bold'
                      : ev.type === 'night'
                      ? 'bg-indigo-950/70 border-indigo-700/70 text-indigo-200'
                      : 'bg-amber-950/50 border-amber-800/50 text-amber-200'
                  }`}
                >
                  <span>{ev.icon}</span>
                  <span>{ev.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 bg-slate-900/90 border-2 border-amber-800/80 rounded-xl flex flex-col overflow-hidden shadow-xl">
            <div className="bg-amber-950/80 px-4 py-2 border-b border-amber-800/80 flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-200 font-bold text-sm">
                <MessageSquare size={16} className="text-amber-400" />
                <span>Chat</span>
              </div>
              <span className="text-[10px] bg-amber-900/60 text-amber-300 px-2 py-0.5 rounded border border-amber-700/50">
                Wakkerdam Kanaal
              </span>
            </div>

            <div className="flex-1 p-3 overflow-y-auto custom-scrollbar space-y-2 text-xs">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`p-2 rounded-lg border leading-relaxed ${
                    msg.isEmergency 
                      ? 'bg-red-900/80 border-red-500 text-white font-extrabold animate-pulse'
                      : msg.isMayor 
                      ? 'bg-amber-950/50 border-amber-700/60 text-amber-200'
                      : msg.isWolf
                      ? 'bg-red-950/40 border-red-800/50 text-red-200'
                      : msg.isSystem
                      ? 'bg-amber-950/80 border-amber-600 text-amber-300 font-bold'
                      : 'bg-slate-950/70 border-slate-800 text-slate-200'
                  }`}
                >
                  <span className={`font-bold mr-1.5 ${
                    msg.isMayor ? 'text-amber-400' : msg.isWolf ? 'text-red-400' : 'text-sky-400'
                  }`}>
                    {msg.sender}:
                  </span>
                  <span>{msg.text}</span>
                </div>
              ))}
              <div ref={chatBottomRef} />
            </div>

            <form onSubmit={handleSendMessage} className="p-2.5 bg-slate-950/80 border-t border-amber-900/60 flex gap-2">
              <input
                type="text"
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                placeholder="Typ een bericht..."
                className="flex-1 bg-slate-900 text-slate-100 text-xs rounded-lg px-3 py-2 border border-amber-800/60 focus:outline-none focus:border-amber-500 placeholder-slate-500"
              />
              <button
                type="submit"
                disabled={!inputMsg.trim()}
                className="bg-amber-700 hover:bg-amber-600 disabled:opacity-40 text-amber-100 px-3 py-2 rounded-lg transition-colors flex items-center justify-center shadow-md"
              >
                <Send size={14} />
              </button>
            </form>
          </div>
        </aside>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
        
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(15, 23, 42, 0.6); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #78350f; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #b45309; }
      `}} />
    </div>
  );
}
