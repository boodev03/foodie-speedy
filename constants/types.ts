export interface TokenCache {
  getToken: (key: string) => Promise<string | undefined | null>;
  saveToken: (key: string, token: string) => Promise<void>;
  clearToken?: (key: string) => void;
}

export interface NotifyPopupProps {
  message: string;
  type: "success" | "warning" | "error" | "info";
  show: boolean;
}
