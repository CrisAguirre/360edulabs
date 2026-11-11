import { Center, useGLTF } from '@react-three/drei';
import { Component, type ReactNode } from 'react';

interface GLBModelProps {
  url: string;
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
}

class ModelErrorBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

function InnerGLBModel({ url, scale = 1, position = [0, 0, 0], rotation = [0, 0, 0] }: GLBModelProps) {
  const { scene } = useGLTF(url);
  return (
    <Center>
      <primitive object={scene.clone()} scale={scale} position={position} rotation={rotation} />
    </Center>
  );
}

export function GLBModel({ url, scale = 1, position = [0, 0, 0], rotation = [0, 0, 0], fallback }: GLBModelProps & { fallback?: ReactNode }) {
  return (
    <ModelErrorBoundary fallback={fallback ?? null}>
      <InnerGLBModel url={url} scale={scale} position={position} rotation={rotation} />
    </ModelErrorBoundary>
  );
}

