export interface WindowSize {
  width: number;
  height: number;
}

export interface Event {
  id: number;
  start: string;
  duration: number;
}

export interface EventPosition {
  top: number;
  height: number;
}

export interface EventLayout extends EventPosition {
  width: number;
  left: number;
  id: number;
}
