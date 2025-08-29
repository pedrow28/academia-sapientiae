import { useEffect, useState } from 'react';
import { getProgress, putProgress } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import { CharacterData, initialCharacter } from '@/data/character';
import { loadCharacter as loadLocal, saveCharacter as saveLocal } from '@/utils/gameLogic';

/**
 * API -> UI
 * Converte o JSON salvo no backend (character JSON + streak) para o shape do front (CharacterData).
 */
function apiToCharacterData(api: { character: any; streak?: number } | null): CharacterData {
  if (!api) return initialCharacter;
  const c = api.character ?? {};
  return {
    name: c.name ?? initialCharacter.name,
    title: c.title ?? initialCharacter.title,
    currentGrade: c.currentGrade ?? initialCharacter.currentGrade,
    totalPES: c.PES ?? c.totalPES ?? initialCharacter.totalPES,
    streakDays: api.streak ?? c.streakDays ?? initialCharacter.streakDays,
    skills: c.skills ?? initialCharacter.skills,
    virtues: c.virtues ?? initialCharacter.virtues,
  };
}

/**
 * UI -> API
 * Converte o CharacterData (front) para o payload esperado pelo backend.
 * Observação: streak é calculado no servidor (M6), por isso não enviamos streak.
 */
function characterDataToApi(cd: CharacterData) {
  return {
    character: {
      name: cd.name,
      title: cd.title,
      currentGrade: cd.currentGrade,
      PES: cd.totalPES,         // normalizamos para o campo que o backend já entende
      skills: cd.skills,
      virtues: cd.virtues,
    },
    // activityAt: pode ser enviado se você quiser controlar o dia. Se omitir, o backend usa "agora".
  };
}

/**
 * Helper para gerar um ISO “meio-dia UTC” (evita confusão de fuso)
 */
function isoNowUtcMidday() {
  const now = new Date();
  const utc = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 12, 0, 0));
  return utc.toISOString();
}

export const useCharacterProgress = () => {
  const { user } = useAuth();
  const [character, setCharacter] = useState<CharacterData>(initialCharacter);
  const [loading, setLoading] = useState(true);

  // Carrega ao montar / ao mudar login
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        if (!user) {
          // deslogado → usa localStorage
          const local = loadLocal();
          if (local) setCharacter(local);
          else setCharacter(initialCharacter);
        } else {
          // logado → busca na API
          const data = await getProgress(); // { progress: { character, streak, ... } | null }
          setCharacter(apiToCharacterData(data.progress));
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

  // Salvar alterações (UI -> API ou local)
  const saveCharacter = async (cd: CharacterData) => {
    setCharacter(cd);
    if (!user) {
      return saveLocal(cd);
    }
    // logado → envia para API
    const payload = characterDataToApi(cd);
    await putProgress(payload);
  };

  // Ação “Estudar hoje” (incrementa por regra no backend)
  const studyToday = async (deltaPES = 5) => {
    const next: CharacterData = {
      ...character,
      totalPES: (character.totalPES || 0) + deltaPES,
    };
    setCharacter(next);
    if (!user) {
      return saveLocal(next);
    }
    await putProgress({
      ...characterDataToApi(next),
      activityAt: isoNowUtcMidday(), // ajuda o backend a fixar “hoje” em UTC
    });
  };

  return { character, loading, saveCharacter, studyToday };
};
