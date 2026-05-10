import { useState } from 'react';
import { useGame, SLOT_IDS, type SlotId } from '../store/game';
import { CharacterPreview } from '../modules/character-designer/CharacterPreview';
import { BigButton } from '../ui/BigButton';
import { Mascot } from './Mascot';
import './Home.css';

type Props = {
  onOpenSlot: (slot: SlotId) => void;
};

export function Home({ onOpenSlot }: Props) {
  const slots = useGame((s) => s.slots);
  const startOver = useGame((s) => s.startOver);
  const [confirming, setConfirming] = useState<SlotId | null>(null);

  return (
    <div className="cbc-home">
      <h1 className="cbc-home__title">Make Your Character!</h1>

      <div className="cbc-home__slots">
        {SLOT_IDS.map((slot) => {
          const saved = slots[slot].saved;
          return (
            <div key={slot} className="cbc-slot">
              <div className="cbc-slot__label">Spot {slot + 1}</div>
              <div className="cbc-slot__art">
                {saved ? (
                  <CharacterPreview character={saved} size={220} />
                ) : (
                  <Mascot size={220} />
                )}
              </div>
              <div className="cbc-slot__actions">
                {saved ? (
                  <>
                    <BigButton
                      variant="primary"
                      size="lg"
                      onClick={() => onOpenSlot(slot)}
                      aria-label={`Edit character in spot ${slot + 1}`}
                    >
                      Edit
                    </BigButton>
                    <BigButton
                      variant="danger"
                      size="md"
                      onClick={() => setConfirming(slot)}
                      aria-label={`Start over in spot ${slot + 1}`}
                    >
                      Start over
                    </BigButton>
                  </>
                ) : (
                  <BigButton
                    variant="primary"
                    size="lg"
                    onClick={() => onOpenSlot(slot)}
                    aria-label={`Make a character in spot ${slot + 1}`}
                  >
                    Tap me!
                  </BigButton>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {confirming !== null && (
        <div className="cbc-modal" role="dialog" aria-modal="true">
          <div className="cbc-modal__card">
            <h2>Start over?</h2>
            <p>Your character in spot {confirming + 1} will be gone.</p>
            <div className="cbc-modal__row">
              <BigButton
                variant="ghost"
                size="lg"
                onClick={() => setConfirming(null)}
              >
                No, keep
              </BigButton>
              <BigButton
                variant="danger"
                size="lg"
                onClick={() => {
                  startOver(confirming);
                  setConfirming(null);
                }}
              >
                Yes, start over
              </BigButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
