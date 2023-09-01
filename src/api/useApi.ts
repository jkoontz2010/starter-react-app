import { useEffect, useState } from "react";

export function useApi<T>(url: string) {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setIsLoading(true);
    fetch(url)
      .then((response) => {
        if(response.ok) return response.json()
        
        return response.json().then(data => { throw new Error(data.error) })
      })
      .then((data) => {
        setData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, [url]);

  return {
    data,
    isLoading,
    error,
  };
};
