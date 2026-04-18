import { useGLTF } from '@react-three/drei';
import { useMemo } from 'react';
import flowersGlb from '../models_3d/flowers_with_the_vase.glb?url';

export default function FlowerVase(props: any) {
  const { scene } = useGLTF(flowersGlb);
  
  // Clonar y modificar la escena para ajustar los materiales
  const clonedScene = useMemo(() => {
    const newScene = scene.clone();
    newScene.traverse((child: any) => {
      if (child.isMesh && child.material) {
        child.material = child.material.clone();
        // Disminuimos el efecto metálico (que hace que se vea negro si no hay entorno)
        child.material.metalness = 0.1;
        
        // Aclaramos el color base sumándole luminosidad
        child.material.color.offsetHSL(0, 0, 0.3);
      }
    });
    return newScene;
  }, [scene]);

  return <primitive object={clonedScene} {...props} />;
}

// Opcional: Precargar el modelo para mejorar el rendimiento
useGLTF.preload(flowersGlb);
useGLTF.preload(flowersGlb);
