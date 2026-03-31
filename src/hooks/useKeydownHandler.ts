import { useEffect, useState } from "react";

export default (handler: (event: KeyboardEvent) => void) => {
  const [lastEvent, setLastEvent] = useState<KeyboardEvent | null>(null);

  useEffect(() => {
    window.addEventListener("keydown", setLastEvent);
    return () => {
      window.removeEventListener("keydown", setLastEvent);
    };
  }, [setLastEvent]);

  if (lastEvent !== null) {
    handler(lastEvent);
    setLastEvent(null);
  }
};
