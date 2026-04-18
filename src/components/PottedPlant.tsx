import { useGLTF } from '@react-three/drei';
import plantGlb from '../models_3d/free_pothos_potted_plant_-_money_plant.glb?url';

export default function PottedPlant(props: any) {
  const { scene } = useGLTF(plantGlb);
  return <primitive object={scene.clone()} {...props} />;
}

useGLTF.preload(plantGlb);
