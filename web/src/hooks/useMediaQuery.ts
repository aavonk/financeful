import { useState, useEffect } from 'react';

export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState<boolean>(false);
  useEffect(() => {
    const media = window.matchMedia(query);

    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const windowListener = () => {
      setMatches(media.matches);
    };

    media.addEventListener('change', windowListener);

    return () => media.removeEventListener('change', windowListener);
  }, [matches, query]);

  return matches;
};
