import { useMemo, useState } from 'react';
import * as THREE from 'three';
import Artwork from './Artwork';
import FlowerVase from './FlowerVase';
import BarcelonaChair from './BarcelonaChair';
import LockerRoomBench from './LockerRoomBench';
import Chandelier from './Chandelier';
import PottedPlant from './PottedPlant';
import BirthdayCake from './BirthdayCake';
import Shiba from './Shiba';

// Import local images for the song cards
import img1 from "../images/1.webp";
import img2 from "../images/2.webp";
import img3 from "../images/3.webp";
import img4 from "../images/4.webp";
import img5 from "../images/5.webp";
import img6 from "../images/6.webp";
import img7 from "../images/7.webp";
import img8 from "../images/8.webp";
import img9 from "../images/9.webp";
import img10 from "../images/10.webp";

// Import local audio files for the song cards
import song1 from "../songs/Queen - I Was Born To Love You (Official Video) - Queen Official.mp3";
import song2 from "../songs/Queen - You're My Best Friend (Official Video) - Queen Official.mp3";
import song3 from "../songs/Bryan Adams - Heaven (Official Music Video) - Bryan Adams.mp3";
import song4 from "../songs/Bee Gees - How Deep Is Your Love (Official Video) - beegees.mp3";
import song5 from "../songs/Taylor Swift – invisible string (Official Lyric Video) - Taylor Swift.mp3";
import song6 from "../songs/Soñé - Zoé.mp3";
import song7 from "../songs/Amnesia (Remasterizado) - José José.mp3";
import song8 from "../songs/Intocable - Soñador Eterno. - Mis Momentos....mp3";
import song9 from "../songs/VOY A CONQUISTARTE LYRIC VIDEO OFICIAL - Joan Sebastian.mp3";
import song10 from "../songs/Que Nadie Sepa - Cardenales de Nuevo León.mp3";

// Component for the red velvet rope
const Rope = ({ startPoint, endPoint }: { startPoint: [number, number, number], endPoint: [number, number, number] }) => {
  const curve = useMemo(() => {
    const start = new THREE.Vector3(...startPoint);
    const end = new THREE.Vector3(...endPoint);
    const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
    mid.y -= 0.3;
    return new THREE.QuadraticBezierCurve3(start, mid, end);
  }, [startPoint, endPoint]);

  return (
    <mesh>
      <tubeGeometry args={[curve, 20, 0.02, 8, false]} />
      <meshStandardMaterial color="#aa0000" roughness={0.9} />
    </mesh>
  );
};

const songs = [
  {
    id: "1", title: "I Was Born To Love You", artist: "Queen",
    imageUrl: img1,
    audioUrl: song1
  },
  {
    id: "2", title: "You're My Best Friend", artist: "Queen",
    imageUrl: img2,
    audioUrl: song2
  },
  {
    id: "3", title: "Heaven", artist: "Bryan Adams",
    imageUrl: img3,
    audioUrl: song3
  },
  {
    id: "4", title: "How Deep Is Your Love", artist: "Bee Gees",
    imageUrl: img4,
    audioUrl: song4
  },
  {
    id: "5", title: "invisible string", artist: "Taylor Swift",
    imageUrl: img5,
    audioUrl: song5
  },
  {
    id: "6", title: "Soñé", artist: "Zoé",
    imageUrl: img6,
    audioUrl: song6
  },
  {
    id: "7", title: "Amnesia", artist: "José José",
    imageUrl: img7,
    audioUrl: song7
  },
  {
    id: "8", title: "Soñador Eterno", artist: "Intocable",
    imageUrl: img8,
    audioUrl: song8
  },
  {
    id: "9", title: "Voy a Conquistarte", artist: "Joan Sebastian",
    imageUrl: img9,
    audioUrl: song9
  },
  {
    id: "10", title: "Que Nadie Sepa", artist: "Cardenales de Nuevo León",
    imageUrl: img10,
    audioUrl: song10
  }
];

const MuseumScene = ({ onCakeClick, hasStarted }: { onCakeClick?: () => void, hasStarted: boolean }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <group>
      {/* Floor - Light Wood */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <planeGeometry args={[80, 40]} />
        <meshStandardMaterial color="#d9b382" roughness={0.65} metalness={0.0} />
      </mesh>

      {/* Red Carpet */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[4, -0.49, 1]}>
        <planeGeometry args={[80, 3]} />
        <meshStandardMaterial color="#8a0000" roughness={0.8} />
      </mesh>

      {/* Back Wall - Warm Beige */}
      <mesh position={[0, 2.5, -3.1]}>
        <boxGeometry args={[80, 10, 0.2]} />
        <meshStandardMaterial color="#f2ede4" roughness={0.9} />
      </mesh>

      {/* Left Wall */}
      <mesh position={[-26, 2.5, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[40, 10, 0.2]} />
        <meshStandardMaterial color="#f2ede4" roughness={0.9} />
      </mesh>

      {/* Right Wall */}
      <mesh position={[40, 2.5, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <boxGeometry args={[40, 10, 0.2]} />
        <meshStandardMaterial color="#f2ede4" roughness={0.9} />
      </mesh>

      {/* Ceiling - Off-white */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 7.5, 0]}>
        <planeGeometry args={[80, 10]} />
        <meshStandardMaterial color="#f8f5f0" roughness={1} />
      </mesh>

      {/* Baseboards */}
      <mesh position={[0, -0.4, -3]}>
        <boxGeometry args={[80, 0.2, 0.05]} />
        <meshStandardMaterial color="#ffffff" roughness={0.7} metalness={0.05} />
      </mesh>
      <mesh position={[-25.9, -0.4, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[40, 0.2, 0.05]} />
        <meshStandardMaterial color="#ffffff" roughness={0.7} metalness={0.05} />
      </mesh>
      <mesh position={[39.9, -0.4, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <boxGeometry args={[40, 0.2, 0.05]} />
        <meshStandardMaterial color="#ffffff" roughness={0.7} metalness={0.05} />
      </mesh>

      {/* ============ CEILING CHANDELIERS ============ */}
      {([-14, -6, 2, 10, 18] as number[]).map((xPos, i) => (
        <group key={`chandelier-${i}`} position={[xPos, 6.4, -1]}>
          <Chandelier scale={0.01} rotation={[0, 0, 0]} />
          {/* Luz cálida que emana del candelabro */}
          <pointLight position={[0, -0.5, 0]} intensity={8} distance={10} color="#ffe8b0" />
        </group>
      ))}

      {/* ============ PAINTINGS + LIGHTS + PLAQUES ============ */}
      {songs.map((song, index) => {
        const xPos = -18 + index * 4;
        return (
          <group key={song.id}>
            <Artwork
              position={[xPos, 1.5, -2.99]}
              id={song.id}
              title={song.title}
              artist={song.artist}
              imageUrl={song.imageUrl}
              audioUrl={song.audioUrl}
              onNext={() => index < songs.length - 1 && setActiveIndex(index + 1)}
              onPrev={() => index > 0 && setActiveIndex(index - 1)}
              hasStarted={hasStarted}
            />
            {/* Painting halo light */}
            <pointLight position={[xPos, 2, -2]} distance={4} intensity={8} color="#fff5e0" />
            {/* Gold nameplate plaque */}
            <mesh position={[xPos, -0.12, -2.95]}>
              <boxGeometry args={[1.2, 0.18, 0.03]} />
              <meshStandardMaterial color="#c0a060" metalness={0.7} roughness={0.4} />
            </mesh>
          </group>
        );
      })}

      {/* ============ MUSEUM BARRIER (Stanchions + Red Rope) ============ */}
      {Array.from({ length: 11 }).map((_, i) => {
        const xPos = -20 + i * 4;
        const stanchionZ = -1.2;
        const stanchionHeight = 0.8;
        return (
          <group key={`stanchion-${i}`}>
            <mesh position={[xPos, stanchionHeight / 2 - 0.5, stanchionZ]}>
              <cylinderGeometry args={[0.02, 0.05, stanchionHeight, 16]} />
              <meshStandardMaterial color="#c0a060" metalness={0.8} roughness={0.3} />
            </mesh>
            <mesh position={[xPos, stanchionHeight - 0.5, stanchionZ]}>
              <sphereGeometry args={[0.04]} />
              <meshStandardMaterial color="#c0a060" metalness={0.8} roughness={0.3} />
            </mesh>
            {i < 10 && (
              <Rope
                startPoint={[xPos, stanchionHeight - 0.55, stanchionZ]}
                endPoint={[xPos + 4, stanchionHeight - 0.55, stanchionZ]}
              />
            )}
          </group>
        );
      })}

      {/* ============ ESQUINA IZQUIERDA: JARRÓN DE FLORES ============ */}
      <group position={[-24.5, -0.5, -2]}>
        {/* Usamos una escala menor como pediste */}
        <FlowerVase scale={3.5} />
        {/* Añadimos una luz fuerte apuntando directamente para que no se pierda en la sombra de la esquina */}
        <pointLight position={[0, 3, 2]} distance={15} intensity={12} color="#fff5e0" />
      </group>

      <group position={[-24.5, -0.5, 4]}>
        {/* Usamos una escala menor como pediste */}
        <FlowerVase scale={3.5} />
        {/* Añadimos una luz fuerte apuntando directamente para que no se pierda en la sombra de la esquina */}
        <pointLight position={[0, 3, 2]} distance={15} intensity={12} color="#fff5e0" />
      </group>

      {/* ============ SILLA BARCELONA ============ */}
      {/* Colocada más adelante para separarla de la pared izquierda (-26) y del florero (-24.5) */}
      <BarcelonaChair
        position={[-24.5, -0.5, 1]}
        rotation={[0, Math.PI / 2, 0]}
        scale={1.8}
      />

      {/* ============ BANCAS DEL PASILLO ============ */}
      {/* Acercadas a los cuadros y con un foquito sutil para que destaquen */}
      {[-12, 0, 12].map((xPos, i) => (
        <group key={`bench-${i}`} position={[xPos, -0.5, 3.5]}>
          <LockerRoomBench rotation={[0, Math.PI, 0]} scale={1.8} />
        </group>
      ))}

      {/* ============ PLANTAS ENTRE BANCAS ============ */}
      {[-6, 6].map((xPos, i) => (
        <group key={`plant-${i}`} position={[xPos, -0.5, 3.5]}>
          <PottedPlant scale={1.5} />
          {/* Luz tenue, centrada en la maceta y menos brillante */}
          <pointLight position={[0, 0.5, 0]} intensity={1} distance={5} color="#ffe8b0" />
        </group>
      ))}

      {/* ============ PASTEL DE CUMPLEAÑOS (GIGANTE) ============ */}
      <group position={[35, -0.5, 1]}>
        <BirthdayCake scale={15} onCakeClick={onCakeClick} />
        {/* Luz cálida justo encima de la vela (ajustamos la altura 'y' según el tamaño gigante) */}
        <pointLight position={[0, 5, 0]} intensity={15} distance={12} color="#ffaa33" />
      </group>

      {/* ============ EL PERRITO (SHIBA) ============ */}
      {/* Pegado a la pared de los cuadros y subido para que se vea completo */}
      <Shiba
        position={[31.5, 0.5, -1]}
        rotation={[0, Math.PI / -5, 0]}
        scale={1}
      />
    </group>
  );
};

export default MuseumScene;
