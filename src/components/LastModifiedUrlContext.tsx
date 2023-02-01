import * as React from 'react';
import { IUrl } from './IUrl';

export type LastModifiedUrlContextType = {
  lastModifiedUrl: IUrl;
  setLastModifiedUrl: (url: IUrl) => void;
};

export const LastModifiedUrlContext = React.createContext<LastModifiedUrlContextType | null>(null);

type Props = {
  children?: React.ReactNode
};

export const LastModifiedUrlProvider: React.FC<Props> = ({ children }) => {
  const [lastModifiedUrl, setUrlState] = React.useState<IUrl>({id: "", url: "", createdDate: "", modifiedDate: "", ttlInSeconds: 0});

  const setLastModifiedUrl = (url: IUrl) => {
    setUrlState(url);
  };

  return (
    <LastModifiedUrlContext.Provider
    value={{ lastModifiedUrl, setLastModifiedUrl }}
    >
      {children}
    </LastModifiedUrlContext.Provider>
  );
};