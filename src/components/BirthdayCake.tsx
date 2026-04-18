import { useGLTF } from '@react-three/drei';
import cakeGlb from '../models_3d/birthday_cake.glb?url';

export default function BirthdayCake({ onCakeClick, ...props }: any) {
  const { scene } = useGLTF(cakeGlb);

  return (
    <primitive 
      object={scene.clone()} 
      {...props} 
      onClick={onCakeClick}
      // Cambiar el cursor a puntero si está sobre el pastel
      onPointerEnter={() => (document.body.style.cursor = 'pointer')}
      onPointerLeave={() => (document.body.style.cursor = 'auto')}
    />
  );
}

useGLTF.preload(cakeGlb);

