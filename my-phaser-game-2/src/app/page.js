import dynamic from 'next/dynamic';

const GameComponent = dynamic(() => import('./components/gameComponent'), { ssr: false });

export default function Home() {
  return (
    <div>
      <h1>Game Development Sample 2 for Mindcraft</h1>
      <GameComponent />
    </div>
  );
}
