import dynamic from 'next/dynamic';

const Game = dynamic(() => import('./components/game'), { ssr: false });

export default function Home() {
  return (
    <div>
      <h1>Game Development Sample for Mindcraft</h1>
      <Game />
    </div>
  );
}
