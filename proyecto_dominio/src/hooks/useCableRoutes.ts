// src/hooks/useCableRoute.ts
import { useState, useEffect } from "react";
import { CableCarRoute } from "../types";
import { getRoutes } from "../service/api";

export interface UseCableRouteResult {
  data: CableCarRoute | undefined;
  isLoading: boolean;
  error: unknown;
}

export function useCableRoute(id: string): UseCableRouteResult {
  const [data, setData] = useState<CableCarRoute | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    let active = true;

    const load = async () => {
      if (!id) {
        setIsLoading(false);
        return;
      }
      try {
        setIsLoading(true);
        setError(null);
        const routes = await getRoutes();
        const found = routes.find((r) => String(r.id) === String(id));
        if (active) setData(found);
      } catch (err) {
        if (active) setError(err);
      } finally {
        if (active) setIsLoading(false);
      }
    };

    load();
    return () => {
      active = false;
    };
  }, [id]);

  return { data, isLoading, error };
}

export default useCableRoute;
