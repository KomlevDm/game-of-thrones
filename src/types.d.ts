export {};

declare global {
  interface HTMLAudioElement {
    stop: () => void;
    restart: () => void;
  }
}
