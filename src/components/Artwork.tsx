import { Html } from '@react-three/drei';
import SongCard from './SongCard';

interface ArtworkProps {
  position: [number, number, number];
  id: string;
  title: string;
  artist: string;
  imageUrl: string;
  audioUrl: string;
  onNext?: () => void;
  onPrev?: () => void;
}

const Artwork = ({ position, title, artist, imageUrl, audioUrl, onNext, onPrev }: ArtworkProps) => {
  return (
    <group position={position}>
      {/* Frame backboard */}
      <mesh position={[0, 0, -0.015]}>
        <boxGeometry args={[1.65, 2.65, 0.03]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.4} />
      </mesh>

      {/* Frame Borders - Gold */}
      {/* Top */}
      <mesh position={[0, 1.325, 0.01]}>
        <boxGeometry args={[1.75, 0.06, 0.06]} />
        <meshStandardMaterial color="#c0a060" metalness={0.6} roughness={0.4} />
      </mesh>
      {/* Bottom */}
      <mesh position={[0, -1.325, 0.01]}>
        <boxGeometry args={[1.75, 0.06, 0.06]} />
        <meshStandardMaterial color="#c0a060" metalness={0.6} roughness={0.4} />
      </mesh>
      {/* Left */}
      <mesh position={[-0.845, 0, 0.01]}>
        <boxGeometry args={[0.06, 2.71, 0.06]} />
        <meshStandardMaterial color="#c0a060" metalness={0.6} roughness={0.4} />
      </mesh>
      {/* Right */}
      <mesh position={[0.845, 0, 0.01]}>
        <boxGeometry args={[0.06, 2.71, 0.06]} />
        <meshStandardMaterial color="#c0a060" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Picture Light Lamp */}
      <group position={[0, 1.5, 0.1]}>
        <mesh position={[0, -0.08, -0.08]} rotation={[-Math.PI / 4, 0, 0]}>
          <cylinderGeometry args={[0.01, 0.01, 0.15]} />
          <meshStandardMaterial color="#999" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh rotation={[Math.PI / 6, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.02, 0.02, 0.6]} />
          <meshStandardMaterial color="#111" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>

      {/* HTML music card */}
      <Html
        transform
        occlude
        distanceFactor={2.0}
        position={[0, 0, 0.02]}
      >
        <SongCard
          title={title}
          artist={artist}
          imageUrl={imageUrl}
          audioUrl={audioUrl}
          onNext={onNext}
          onPrev={onPrev}
        />
      </Html>
    </group>
  );
};

export default Artwork;
