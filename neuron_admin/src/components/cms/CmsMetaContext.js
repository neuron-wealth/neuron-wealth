import { createContext, useContext } from "react";

export const CmsMetaContext = createContext(null);

export const useCmsMeta = () => useContext(CmsMetaContext);
