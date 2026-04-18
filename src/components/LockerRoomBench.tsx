import { useGLTF } from '@react-three/drei';
import modelGlb from '../models_3d/locker_room_bench.glb?url';

export default function LockerRoomBench(props: any) {
  const { scene } = useGLTF(modelGlb);
  return <primitive object={scene.clone()} {...props} />;
}

useGLTF.preload(modelGlb);
