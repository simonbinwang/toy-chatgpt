import { onSnapshot, types, SnapshotIn } from "mobx-state-tree";

const AzureConfig = types.model({
  endpoint: types.string,
  apikey: types.string,
});

export const ConfigStore = types.model({ azure: AzureConfig });

export type TConfig = SnapshotIn<typeof ConfigStore>;

export const configStore = ConfigStore.create({
  azure: {
    endpoint: "",
    apikey: "",
  },
});

onSnapshot(configStore, (snapshot) => {
  localStorage.setItem("configStore", JSON.stringify(snapshot));
});
