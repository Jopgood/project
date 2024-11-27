import { useEffect } from 'react';
import { Resource } from '../types/GameTypes';

export function useAutoGatherer(
  setResources: React.Dispatch<React.SetStateAction<Resource[]>>
) {
  useEffect(() => {
    const interval = setInterval(() => {
      setResources(current =>
        current.map(resource => ({
          ...resource,
          amount: resource.amount + resource.autoPerSecond
        }))
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);
}