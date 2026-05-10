import { CharacterPreview } from './CharacterPreview';
import type { Character } from './catalogue';

// A small preview used as a thumbnail in carousels. Shows the resulting
// character with the candidate option applied. Idle animation off for thumbs.
export function PartThumb({ character }: { character: Character }) {
  return (
    <div className="cbc-thumb__art">
      <CharacterPreview character={character} size={100} idle={false} />
    </div>
  );
}
