import { setup, assign } from "xstate";

export type Context = {
  currentTime: number;
  updatedTime: number;
  totalTime: number;
};

export enum PlayerState {
  IDLE = "IDLE",
  PLAYING = "PLAYING",
  PAUSED = "PAUSED",
}

export enum PlayerEventType {
  PLAY = "PLAY",
  PAUSE = "PAUSE",
  STOP = "STOP",
  LOADED = "LOADED",
  PROGRESS = "PROGRESS",
  CHANGE = "CHANGE",
  UPDATE = "UPDATE",
}

export type PlayerEvents =
  | { type: PlayerEventType.PLAY }
  | { type: PlayerEventType.PAUSE; value: number }
  | { type: PlayerEventType.STOP }
  | { type: PlayerEventType.LOADED; value: number }
  | { type: PlayerEventType.CHANGE; value: number }
  | { type: PlayerEventType.UPDATE; value: number }
  | { type: PlayerEventType.PROGRESS; value: number };

export const playerMachine = setup({
  types: {
    context: {} as Context,
    events: {} as PlayerEvents,
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QAcA2BDAnmATgYgGEAJAQQDkBxAUQG0AGAXURQHtYBLAF3ZYDtmQAD0QBGAGwBmAHQBOAEwSAHHREB2EXRkSALAFYJAGhCZEAWlXap2tRLq6xquTO1i62gL7ujaLLjwBVAAUAERIAFVpGAWQ2Lh5+JCFECREZKQk5ezE5TIlVMRFtbSMTBFNFS117bUyXR1txT28MbHwAGQB5EmCqYPomRJiObj4BYQQ5VSkRRWzVRVntfLp8sRKzCysbOwcnFzcmkB9WqQBJYLaqPEC2kgBNfujYkYTQcaUxKV0ZXQsVKroEmyunWExkinSdAKRXE1gyikOx1wUhu91OlGuACUOhRMVQAMr4x6DZ7xMaIXSFKSLXTaBpiGQMkHGRDaQFSVR0FQiOQrZQSGQyREtZGou7oijXEj+fGRAasYZkxLjNl0KR2cGUuQMkS0rSg7JyL66JzzfTWcRiYW+HAo27ijH4sIdQLEhVxUbK0TqWSzH5FOTKPRyYoshB5KZOMQM+R0OQaaPWk6BaWy4LXe1uo6kz1vUSKXTpbWTFICwM1VSgqppeaB+xuTX2JOi1O9PBOl1ZoYe15JMpqNKKGRuFa6QHx1KVsN5T4uCQ6QE-dS-K2HXgsCBwaIinBPRW5vumHJTIcj1RjjIiSdVyw6PI5AtLTkSKrN23nS57nvksoM9KCuExEUMs6AqUFChEKRo2jIEX3hOo3ztNFKC-F4fzLDlKWHZwYLyUE9DSWkLHPPUVCKRCUxlXpUKVPMECWA0gSkBRwUmVRHBcBFPHcIA */
  id: "player",
  initial: PlayerState.IDLE,
  context: {
    currentTime: 0,
    totalTime: 0,
    updatedTime: 0,
  },
  on: {
    [PlayerEventType.CHANGE]: {
      actions: assign({ currentTime: ({ event }) => event.value }),
    },
    [PlayerEventType.UPDATE]: {
      actions: assign({ updatedTime: ({ event }) => event.value }),
    },
    [PlayerEventType.LOADED]: {
      actions: assign({ totalTime: ({ event }) => event.value }),
    },
  },
  states: {
    [PlayerState.IDLE]: {
      on: {
        [PlayerEventType.PLAY]: {
          target: PlayerState.PLAYING,
        },

      },
    },
    [PlayerState.PLAYING]: {
      on: {
        [PlayerEventType.PROGRESS]: {
          actions: assign({ currentTime: ({ event }) => event.value }),
        },
        [PlayerEventType.PAUSE]: {
          actions: assign({ currentTime: ({ event }) => event.value }),
          target: PlayerState.PAUSED,
        },
        [PlayerEventType.STOP]: {
          actions: assign({ currentTime: 0 }),
          target: PlayerState.IDLE,
        },
      },
    },
    [PlayerState.PAUSED]: {
      on: {
        [PlayerEventType.PLAY]: {
          target: PlayerState.PLAYING,
        },
        [PlayerEventType.STOP]: {
          actions: assign({ currentTime: 0 }),
          target: PlayerState.IDLE,
        },
      },
    },
  },
});
