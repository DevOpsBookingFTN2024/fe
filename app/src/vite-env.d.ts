/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly VITE_USER_API_URL: string;
  readonly VITE_ACCOMMODATIONS_API_URL: string;
  readonly VITE_RESERVATIONS_API_URL: string;
  readonly VITE_APP_NAME: string;
  readonly VITE_STANDARD_FIELD_MAX_LENGTH: number;
  readonly VITE_LONGER_FILED_MAX_LENGHT: number;
  readonly VITE_MAX_FILE_SIZE: number;
}

interface ImportMeta {
  readonly: ImportMetaEnv;
}
