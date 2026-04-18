import { useGLTF } from '@react-three/drei';
import chandelierGlb from '../models_3d/chandelier_black.glb?url';

export default function Chandelier(props: any) {
  const { scene } = useGLTF(chandelierGlb);
  // Clonamos la escena para que cada instancia sea independiente
  return <primitive object={scene.clone()} {...props} />;
}

// Precargar el modelo para mejorar el rendimiento
useGLTF.preload(chandelierGlb);
