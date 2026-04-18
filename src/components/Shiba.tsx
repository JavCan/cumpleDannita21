import { useGLTF } from '@react-three/drei';
import modelGlb from '../models_3d/shiba.glb?url';

export default function Shiba(props: any) {
  const { scene } = useGLTF(modelGlb);
  return <primitive object={scene.clone()} {...props} />;
}

useGLTF.preload(modelGlb);
