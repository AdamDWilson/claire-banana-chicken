import { useEffect, useMemo, useState } from 'react';
import { useGame, type SlotId } from '../../store/game';
import { CharacterPreview } from './CharacterPreview';
import { BigButton } from '../../ui/BigButton';
import {
  SKIN_TONES,
  HAIR_STYLES,
  HAIR_COLORS,
  EYE_STYLES,
  EYE_COLORS,
  MOUTH_STYLES,
  TOPS,
  BOTTOMS,
  SHOES,
  ACCESSORIES,
  CLOTH_COLORS,
  randomCharacter,
  type Character,
  type CategoryKey,
} from './catalogue';
import {
  SkinIcon,
  HairIcon,
  EyesIcon,
  MouthIcon,
  TopIcon,
  BottomIcon,
  ShoesIcon,
  AccessoryIcon,
  DiceIcon,
  CheckIcon,
  HomeIcon,
} from './TabIcons';
import { PartThumb } from './PartThumb';
import './Designer.css';

type Props = {
  slot: SlotId;
  onHome: () => void;
};

type TabId =
  | 'skin'
  | 'hair'
  | 'eyes'
  | 'mouth'
  | 'top'
  | 'bottom'
  | 'shoes'
  | 'accessory';

const TABS: { id: TabId; label: string; Icon: typeof SkinIcon }[] = [
  { id: 'skin', label: 'Skin', Icon: SkinIcon },
  { id: 'hair', label: 'Hair', Icon: HairIcon },
  { id: 'eyes', label: 'Eyes', Icon: EyesIcon },
  { id: 'mouth', label: 'Mouth', Icon: MouthIcon },
  { id: 'top', label: 'Top', Icon: TopIcon },
  { id: 'bottom', label: 'Bottom', Icon: BottomIcon },
  { id: 'shoes', label: 'Shoes', Icon: ShoesIcon },
  { id: 'accessory', label: 'Extras', Icon: AccessoryIcon },
];

export function Designer({ slot, onHome }: Props) {
  const ensureDraft = useGame((s) => s.ensureDraft);
  const updatePart = useGame((s) => s.updatePart);
  const setDraft = useGame((s) => s.setDraft);
  const saveDraft = useGame((s) => s.saveDraft);
  const slotState = useGame((s) => s.slots[slot]);

  // Pre-fill draft from saved character (Edit) or default (new).
  useEffect(() => {
    ensureDraft(slot, true);
  }, [slot, ensureDraft]);

  const character: Character | null = slotState.draft ?? slotState.saved;
  const [tab, setTab] = useState<TabId>('skin');
  const [showSave, setShowSave] = useState(false);

  const set = <K extends CategoryKey>(key: K, value: Character[K]) =>
    updatePart(slot, key, value);

  const surprise = () => {
    setDraft(slot, randomCharacter());
  };

  const onSave = () => {
    saveDraft(slot);
    setShowSave(true);
    window.setTimeout(() => {
      setShowSave(false);
      onHome();
    }, 1200);
  };

  if (!character) {
    return (
      <div className="cbc-designer">
        <p>Loading…</p>
      </div>
    );
  }

  return (
    <div className="cbc-designer">
      <header className="cbc-designer__topbar">
        <BigButton
          variant="ghost"
          size="md"
          onClick={onHome}
          aria-label="Back to home"
        >
          <HomeIcon size={28} />
        </BigButton>
        <div className="cbc-designer__title">Spot {slot + 1}</div>
        <BigButton
          variant="secondary"
          size="md"
          onClick={surprise}
          aria-label="Surprise me"
        >
          <DiceIcon size={28} /> Surprise
        </BigButton>
      </header>

      <main className="cbc-designer__main">
        <section className="cbc-designer__preview" aria-label="Character preview">
          <CharacterPreview character={character} size={300} />
        </section>

        <section className="cbc-designer__panel">
          <nav className="cbc-tabs" role="tablist" aria-label="Categories">
            {TABS.map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={tab === t.id}
                className={`cbc-tab ${tab === t.id ? 'cbc-tab--active' : ''}`}
                onClick={() => setTab(t.id)}
              >
                <t.Icon size={32} />
                <span>{t.label}</span>
              </button>
            ))}
          </nav>

          <div className="cbc-tabbody">
            <TabBody tab={tab} character={character} set={set} />
          </div>
        </section>
      </main>

      <footer className="cbc-designer__footer">
        <BigButton variant="primary" size="lg" onClick={onSave}>
          <CheckIcon size={28} /> Save
        </BigButton>
      </footer>

      {showSave && (
        <div className="cbc-celebrate" aria-live="polite">
          <div className="cbc-celebrate__card">
            <CheckIcon size={64} />
            <p>Looking good!</p>
          </div>
        </div>
      )}
    </div>
  );
}

// --- Tab body ---------------------------------------------------------------

type TabBodyProps = {
  tab: TabId;
  character: Character;
  set: <K extends CategoryKey>(key: K, value: Character[K]) => void;
};

function TabBody({ tab, character, set }: TabBodyProps) {
  const previewBase = useMemo(() => character, [character]);

  switch (tab) {
    case 'skin':
      return (
        <Row
          items={SKIN_TONES.map((s) => ({
            id: s.id,
            label: s.label,
            preview: { ...previewBase, skinId: s.id },
            colorSwatch: s.color,
          }))}
          selectedId={character.skinId}
          onPick={(id) => set('skinId', id)}
        />
      );
    case 'hair':
      return (
        <>
          <Row
            items={HAIR_STYLES.map((s) => ({
              id: s.id,
              label: s.label,
              preview: { ...previewBase, hairStyleId: s.id },
            }))}
            selectedId={character.hairStyleId}
            onPick={(id) => set('hairStyleId', id)}
          />
          <ColorRow
            label="Hair color"
            colors={HAIR_COLORS}
            selectedId={character.hairColorId}
            onPick={(id) => set('hairColorId', id)}
          />
        </>
      );
    case 'eyes': {
      const currentEye = EYE_STYLES.find((s) => s.id === character.eyeStyleId);
      return (
        <>
          <Row
            items={EYE_STYLES.map((s) => ({
              id: s.id,
              label: s.label,
              preview: { ...previewBase, eyeStyleId: s.id },
            }))}
            selectedId={character.eyeStyleId}
            onPick={(id) => set('eyeStyleId', id)}
          />
          {currentEye?.usesColor && (
            <ColorRow
              label="Eye color"
              colors={EYE_COLORS}
              selectedId={character.eyeColorId}
              onPick={(id) => set('eyeColorId', id)}
            />
          )}
        </>
      );
    }
    case 'mouth':
      return (
        <Row
          items={MOUTH_STYLES.map((s) => ({
            id: s.id,
            label: s.label,
            preview: { ...previewBase, mouthId: s.id },
          }))}
          selectedId={character.mouthId}
          onPick={(id) => set('mouthId', id)}
        />
      );
    case 'top': {
      const current = TOPS.find((t) => t.id === character.topId);
      return (
        <>
          <Row
            items={TOPS.map((s) => ({
              id: s.id,
              label: s.label,
              preview: { ...previewBase, topId: s.id },
            }))}
            selectedId={character.topId}
            onPick={(id) => set('topId', id)}
          />
          {current?.recolorable && (
            <ColorRow
              label="Color"
              colors={CLOTH_COLORS}
              selectedId={character.topColorId}
              onPick={(id) => set('topColorId', id)}
            />
          )}
        </>
      );
    }
    case 'bottom': {
      const current = BOTTOMS.find((t) => t.id === character.bottomId);
      return (
        <>
          <Row
            items={BOTTOMS.map((s) => ({
              id: s.id,
              label: s.label,
              preview: { ...previewBase, bottomId: s.id },
            }))}
            selectedId={character.bottomId}
            onPick={(id) => set('bottomId', id)}
          />
          {current?.recolorable && (
            <ColorRow
              label="Color"
              colors={CLOTH_COLORS}
              selectedId={character.bottomColorId}
              onPick={(id) => set('bottomColorId', id)}
            />
          )}
        </>
      );
    }
    case 'shoes': {
      const current = SHOES.find((t) => t.id === character.shoesId);
      return (
        <>
          <Row
            items={SHOES.map((s) => ({
              id: s.id,
              label: s.label,
              preview: { ...previewBase, shoesId: s.id },
            }))}
            selectedId={character.shoesId}
            onPick={(id) => set('shoesId', id)}
          />
          {current?.recolorable && (
            <ColorRow
              label="Color"
              colors={CLOTH_COLORS}
              selectedId={character.shoesColorId}
              onPick={(id) => set('shoesColorId', id)}
            />
          )}
        </>
      );
    }
    case 'accessory':
      return (
        <Row
          items={ACCESSORIES.map((s) => ({
            id: s.id,
            label: s.label,
            preview: { ...previewBase, accessoryId: s.id },
          }))}
          selectedId={character.accessoryId}
          onPick={(id) => set('accessoryId', id)}
        />
      );
  }
}

// --- Reusable rows ----------------------------------------------------------

type RowItem = {
  id: string;
  label: string;
  preview: Character;
  colorSwatch?: string;
};

function Row({
  items,
  selectedId,
  onPick,
}: {
  items: RowItem[];
  selectedId: string;
  onPick: (id: string) => void;
}) {
  return (
    <div className="cbc-carousel" role="radiogroup">
      {items.map((it) => (
        <button
          key={it.id}
          role="radio"
          aria-checked={selectedId === it.id}
          aria-label={it.label}
          className={`cbc-thumb ${selectedId === it.id ? 'cbc-thumb--on' : ''}`}
          onClick={() => onPick(it.id)}
        >
          <PartThumb character={it.preview} />
          {selectedId === it.id && (
            <span className="cbc-thumb__check" aria-hidden="true">
              ✓
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

function ColorRow({
  label,
  colors,
  selectedId,
  onPick,
}: {
  label: string;
  colors: readonly { id: string; label: string; color: string }[];
  selectedId: string;
  onPick: (id: string) => void;
}) {
  return (
    <div className="cbc-colorrow">
      <div className="cbc-colorrow__label">{label}</div>
      <div className="cbc-colorrow__items" role="radiogroup">
        {colors.map((c) => (
          <button
            key={c.id}
            role="radio"
            aria-checked={selectedId === c.id}
            aria-label={c.label}
            onClick={() => onPick(c.id)}
            className={`cbc-swatch ${selectedId === c.id ? 'cbc-swatch--on' : ''}`}
            style={{ background: c.color }}
          />
        ))}
      </div>
    </div>
  );
}
