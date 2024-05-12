import { useEffect, useRef } from "react";

export const useClickOutside = (
  callback: () => void,
  excludedRefs: React.RefObject<HTMLElement>[] = [],
) => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    function handleClickOutside(event: Event) {
      const clickedElement = event.target as HTMLElement;
      const isExcluded = excludedRefs.some((ref) =>
        ref.current?.contains(clickedElement),
      );

      if (!isExcluded) {
        callbackRef.current();
      }
    }

    window.addEventListener("mouseup", handleClickOutside);
    window.addEventListener("touchend", handleClickOutside);

    // Clean up
    return () => {
      window.removeEventListener("mouseup", handleClickOutside);
      window.removeEventListener("touchend", handleClickOutside);
    };
  }, [excludedRefs]);
};
