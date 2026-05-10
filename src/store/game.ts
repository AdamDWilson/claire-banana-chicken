import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
  defaultCharacter,
  type Character,
  type CategoryKey,
} from '../modules/character-designer/catalogue';

export type SlotId = 0 | 1;
export const SLOT_IDS: SlotId[] = [0, 1];

export type Slot = {
  saved: Character | null;
  draft: Character | null;
};

type GameState = {
  slots: Record<SlotId, Slot>;
  setDraft: (slot: SlotId, character: Character) => void;
  clearDraft: (slot: SlotId) => void;
  saveDraft: (slot: SlotId) => void;
  startOver: (slot: SlotId) => void;
  ensureDraft: (slot: SlotId, seedFromSaved: boolean) => Character;
  updatePart: <K extends CategoryKey>(
    slot: SlotId,
    key: K,
    value: Character[K]
  ) => void;
};

const emptySlots: Record<SlotId, Slot> = {
  0: { saved: null, draft: null },
  1: { saved: null, draft: null },
};

export const useGame = create<GameState>()(
  persist(
    (set, get) => ({
      slots: emptySlots,

      setDraft: (slot, character) =>
        set((state) => ({
          slots: {
            ...state.slots,
            [slot]: { ...state.slots[slot], draft: character },
          },
        })),

      clearDraft: (slot) =>
        set((state) => ({
          slots: {
            ...state.slots,
            [slot]: { ...state.slots[slot], draft: null },
          },
        })),

      saveDraft: (slot) =>
        set((state) => {
          const current = state.slots[slot];
          const toSave = current.draft ?? current.saved ?? defaultCharacter();
          return {
            slots: {
              ...state.slots,
              [slot]: { saved: toSave, draft: null },
            },
          };
        }),

      startOver: (slot) =>
        set((state) => ({
          slots: {
            ...state.slots,
            [slot]: { saved: null, draft: null },
          },
        })),

      ensureDraft: (slot, seedFromSaved) => {
        const current = get().slots[slot];
        if (current.draft) return current.draft;
        const seed =
          seedFromSaved && current.saved ? current.saved : defaultCharacter();
        set((state) => ({
          slots: {
            ...state.slots,
            [slot]: { ...state.slots[slot], draft: seed },
          },
        }));
        return seed;
      },

      updatePart: (slot, key, value) =>
        set((state) => {
          const current = state.slots[slot];
          const base = current.draft ?? current.saved ?? defaultCharacter();
          const next = { ...base, [key]: value };
          return {
            slots: {
              ...state.slots,
              [slot]: { ...state.slots[slot], draft: next },
            },
          };
        }),
    }),
    {
      name: 'cbc.characters.v1',
      storage: createJSONStorage(() => localStorage),
      version: 1,
    }
  )
);
