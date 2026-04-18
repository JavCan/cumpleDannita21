import { useGLTF } from '@react-three/drei';
import modelGlb from '../models_3d/barcelona_chair.glb?url';

export default function BarcelonaChair(props: any) {
  const { scene } = useGLTF(modelGlb);
  // Clonamos el scene igual que con la vasija para que no haya problemas si la reusas
  return <primitive object={scene.clone()} {...props} />;
}

// Precargar el modelo para mejorar el rendimiento al cargar la página
useGLTF.preload(modelGlb);
