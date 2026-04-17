import { useEffect, useState } from "react";

/**
 * Returns true only after the component has hydrated on the client.
 * Use to avoid SSR/hydration mismatches for content that depends on
 * browser-only APIs or async data fetched after mount.
 */
export function useIsClient() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return isClient;
}
