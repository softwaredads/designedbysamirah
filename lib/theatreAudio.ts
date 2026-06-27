export type TheatreAudio = {
  prime: () => void;
  setEnabled: (on: boolean) => void;
  playEnter: () => void;
  playReveal: () => void;
  playTransition: (sceneIndex: number) => void;
  dispose: () => void;
};

/** Premium cues — no continuous loop */
export function createTheatreAudio(): TheatreAudio {
  let ctx: AudioContext | null = null;
  let output: GainNode | null = null;
  let enabled = false;

  function getContext() {
    if (!ctx) {
      ctx = new AudioContext();
      output = ctx.createGain();
      output.gain.value = 0.88;
      output.connect(ctx.destination);
    }
    return { ctx, output: output! };
  }

  function resume() {
    const { ctx } = getContext();
    if (ctx.state === "suspended") {
      void ctx.resume();
    }
  }

  function playNote(
    frequency: number,
    volume: number,
    attackSec: number,
    releaseSec: number,
    delayMs = 0,
    detune = 0,
    type: OscillatorType = "sine",
  ) {
    const { ctx, output } = getContext();
    const start = ctx.currentTime + delayMs / 1000;

    const osc = ctx.createOscillator();
    osc.type = type;
    osc.frequency.setValueAtTime(frequency, start);
    osc.detune.value = detune;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, start);
    gain.gain.linearRampToValueAtTime(volume, start + attackSec);
    gain.gain.exponentialRampToValueAtTime(0.00001, start + attackSec + releaseSec);

    osc.connect(gain);
    gain.connect(output);
    osc.start(start);
    osc.stop(start + attackSec + releaseSec + 0.08);
  }

  function playEnterSound() {
    playNote(130.81, 0.028, 0.12, 0.9);
    playNote(196, 0.022, 0.15, 1.1, 60, 2);
    playNote(293.66, 0.016, 0.12, 0.95, 140, 4);
  }

  function playRevealSound() {
    playNote(164.81, 0.014, 0.5, 2.2, 0, 1);
    playNote(246.94, 0.01, 0.55, 2, 120, 3);
    playNote(329.63, 0.008, 0.6, 1.8, 240, 2);
  }

  function playTransitionSound(sceneIndex: number) {
    const isServices = sceneIndex === 5;
    const isContact = sceneIndex === 6;

    playNote(isServices ? 196 : 220, 0.02, 0.06, 0.38, 0, 2, "triangle");
    playNote(
      isContact ? 174.61 : isServices ? 293.66 : 277.18,
      0.014,
      0.05,
      0.32,
      55,
      3,
      "sine",
    );
  }

  return {
    prime() {
      getContext();
      resume();
    },

    setEnabled(on: boolean) {
      enabled = on;
      if (on) {
        getContext();
        resume();
      }
    },

    playEnter() {
      if (!enabled) return;
      getContext();
      resume();
      playEnterSound();
    },

    playReveal() {
      if (!enabled) return;
      getContext();
      resume();
      playRevealSound();
    },

    playTransition(sceneIndex: number) {
      if (!enabled) return;
      getContext();
      resume();
      playTransitionSound(sceneIndex);
    },

    dispose() {
      enabled = false;
      void ctx?.close();
      ctx = null;
      output = null;
    },
  };
}
