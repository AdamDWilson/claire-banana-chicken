import { useState } from 'react';
import { Home } from './shell/Home';
import { Designer } from './modules/character-designer/Designer';
import type { SlotId } from './store/game';

type Route = { name: 'home' } | { name: 'designer'; slot: SlotId };

export function App() {
  const [route, setRoute] = useState<Route>({ name: 'home' });

  if (route.name === 'home') {
    return <Home onOpenSlot={(slot) => setRoute({ name: 'designer', slot })} />;
  }
  return (
    <Designer slot={route.slot} onHome={() => setRoute({ name: 'home' })} />
  );
}
