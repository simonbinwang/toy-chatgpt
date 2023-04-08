import { applySnapshot } from "mobx-state-tree";
import { configStore } from "../store/ConfigStore";
import { useEffect, useState } from "react";

export const useInitConfig = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const cachedConfigStr = localStorage.getItem("configStore");
    if (cachedConfigStr) {
      applySnapshot(configStore, JSON.parse(cachedConfigStr));
    }
    setReady(true);
  }, []);

  return ready;
};
