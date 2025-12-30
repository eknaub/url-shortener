export type IUrl = {
  id: string;
  url: string;
  ttlInSeconds: number;
  createdDate: string;
  modifiedDate: string;
};

export type IUrlCreate = Omit<IUrl, "createdDate" | "modifiedDate">;
