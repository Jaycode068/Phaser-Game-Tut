import dynamic from 'next/dynamic';

const Game = dynamic(() => import('./components/game'), { ssr: false });

export default function Home() {
  return (
    <div>
      <h1>My Phaser Game in Next.js</h1>
      <Game />
    </div>
  );
}
