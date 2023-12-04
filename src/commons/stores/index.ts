import { atom } from "recoil";

export const isEditState = atom({
  key: "isEditState",
  default: true,
});

export const accessTokenState = atom({
  key: "accessToken",
  default: "",
});
