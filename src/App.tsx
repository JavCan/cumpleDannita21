import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, SoftShadows } from '@react-three/drei';
import { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { X } from 'lucide-react';
import MuseumScene from './components/MuseumScene';

// Component for the initial welcome screen with black fade-out
function IntroScreen({ onStart }: { onStart: () => void }) {
  const [isFading, setIsFading] = useState(false);
  const [isCompletelyGone, setIsCompletelyGone] = useState(false);

  const handleStart = () => {
    setIsFading(true);
    onStart(); // Trigger hasStarted immediately to enable controls/HTML
    
    // After the CSS transition finishes, remove the div from DOM
    setTimeout(() => {
      setIsCompletelyGone(true);
    }, 1500); // Match index.css fade-out duration
  };

  if (isCompletelyGone) return null;

  return (
    <div className={`intro-overlay ${isFading ? 'fade-out' : ''}`} 
         style={{ background: isFading ? 'black' : undefined }}>
      <div className="intro-content" style={{ opacity: isFading ? 0 : 1, transition: 'opacity 0.5s' }}>
        <h1 className="intro-title">¿Lista para tu mini museo musical 3D?</h1>
        <button className="sii-button" onClick={handleStart}>
          SIIII!!!!
        </button>
      </div>
    </div>
  );
}

// Component for the overlay that appears when clicking the cake
function BirthdayOverlay({ onClose }: { onClose: () => void }) {
  return (
    <div className="birthday-overlay" onClick={onClose}>
      <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          <X size={24} color="#333" />
        </button>
        <img 
          className="overlay-image"
          src="https://images.unsplash.com/photo-1530103043960-ef38714abb15?auto=format&fit=crop&q=80&w=1200" 
          alt="Happy Birthday" 
        />
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '20px',
          background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
          color: 'white',
          textAlign: 'center'
        }}>
          <h1 style={{ margin: 0, fontSize: '2.5rem', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
            ¡Feliz Cumpleaños! 🎂
          </h1>
        </div>
      </div>
    </div>
  );
}

// Custom controller to move left/right with A/D
function CameraController({ controlsRef, hasStarted }: { controlsRef: any, hasStarted: boolean }) {
  const [keys, setKeys] = useState({ a: false, d: false });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'a') setKeys(k => ({ ...k, a: true }));
      if (e.key.toLowerCase() === 'd') setKeys(k => ({ ...k, d: true }));
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'a') setKeys(k => ({ ...k, a: false }));
      if (e.key.toLowerCase() === 'd') setKeys(k => ({ ...k, d: false }));
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useFrame((state, delta) => {
    if (!hasStarted || !controlsRef.current) return;
    
    const speed = 7 * delta; 
    let moveDelta = 0;

    if (keys.a) moveDelta -= speed;
    if (keys.d) moveDelta += speed;

    if (moveDelta !== 0) {
      controlsRef.current.target.x += moveDelta;
      state.camera.position.x += moveDelta;

      const minX = -18;
      const maxX = 35.7;
      if (controlsRef.current.target.x < minX) {
        const diff = minX - controlsRef.current.target.x;
        controlsRef.current.target.x += diff;
        state.camera.position.x += diff;
      }
      if (controlsRef.current.target.x > maxX) {
        const diff = maxX - controlsRef.current.target.x;
        controlsRef.current.target.x += diff;
        state.camera.position.x += diff;
      }
    }
  });

  return null;
}

function App() {
  const controlsRef = useRef<any>(null);
  const [isBirthdayOpen, setIsBirthdayOpen] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <IntroScreen onStart={() => setHasStarted(true)} />

      <Canvas shadows camera={{ position: [-18, 1.5, 6], fov: 50 }}>
        <SoftShadows size={15} focus={0.5} samples={10} />
        <ambientLight intensity={0.5} />
        <pointLight position={[0, 4, 3]} intensity={5} color="#fff4e0" castShadow />

        <MuseumScene onCakeClick={() => setIsBirthdayOpen(true)} hasStarted={hasStarted} />

        <OrbitControls
          ref={controlsRef}
          makeDefault
          target={[-18, 1.5, 0]}
          maxDistance={10}
          minDistance={2}
          maxPolarAngle={Math.PI / 2}
          minAzimuthAngle={-Math.PI / 4}
          maxAzimuthAngle={Math.PI / 4}
          enablePan={false}
        />

        <CameraController controlsRef={controlsRef} hasStarted={hasStarted} />
      </Canvas>

      {isBirthdayOpen && (
        <BirthdayOverlay onClose={() => setIsBirthdayOpen(false)} />
      )}
    </div>
  );
}

export default App;




