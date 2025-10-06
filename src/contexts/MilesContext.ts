// MilesContext.tsx
import { createContext } from "react";
import type { NavigateFunction } from "react-router-dom";

interface IMilhasProviderProps {
  cpf: string;
  setCpf: React.Dispatch<React.SetStateAction<string>>;
  selectedProgram: string | number | readonly string[] | undefined;
  setSelectedProgram: React.Dispatch<React.SetStateAction<string | null>>;
  navigate: NavigateFunction;
}

export const MilesContext = createContext({} as IMilhasProviderProps);
