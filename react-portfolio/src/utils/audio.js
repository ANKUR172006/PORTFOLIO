let globalAudioCtx = null;

export const getAudioCtx = () => {
  if (typeof window === "undefined") return null;
  if (!globalAudioCtx) {
    globalAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (globalAudioCtx.state === "suspended") {
    globalAudioCtx.resume();
  }
  return globalAudioCtx;
};

export const playRevealSound = (freq = 400, type = "sine", duration = 0.6) => {
  try {
    const ctx = getAudioCtx();
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.5, t + duration);
    
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.05, t + duration * 0.2);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + duration);
  } catch (e) {}
};

export const playCuteSound = (freq = 1000, volume = 0.03) => {
  try {
    const ctx = getAudioCtx();
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    const finalFreq = freq * (0.95 + Math.random() * 0.1);
    osc.type = "sine";
    osc.frequency.setValueAtTime(finalFreq, t);
    osc.frequency.exponentialRampToValueAtTime(finalFreq * 0.6, t + 0.08);

    gain.gain.setValueAtTime(volume, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.08);
  } catch (e) {}
};

export const playStaggerPop = (freq = 1200, delay = 0) => {
  try {
    const ctx = getAudioCtx();
    const t = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, t);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.4, t + 0.08);
    
    gain.gain.setValueAtTime(0.02, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.08);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.08);
  } catch (e) {}
};

export const playMechanicalClick = () => {
  try {
    const ctx = getAudioCtx();
    const t = ctx.currentTime;
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(2000, t);
    osc.frequency.exponentialRampToValueAtTime(20, t + 0.03);
    
    gain.gain.setValueAtTime(0.1, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.03);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(t);
    osc.stop(t + 0.03);
  } catch (e) {}
};

export const playRelaxingOpening = () => {
  try {
    const ctx = getAudioCtx();
    const t = ctx.currentTime;
    const duration = 2.5;

    // 1. Ambient "Breath"
    const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * duration, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < noiseBuffer.length; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const source = ctx.createBufferSource();
    source.buffer = noiseBuffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(40, t);
    filter.frequency.exponentialRampToValueAtTime(600, t + duration * 0.5);
    filter.frequency.exponentialRampToValueAtTime(40, t + duration);
    filter.Q.setValueAtTime(1, t);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.08, t + duration * 0.5);
    gain.gain.linearRampToValueAtTime(0, t + duration);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    // 2. Soft "Crystal" Chime
    const frequencies = [440, 554.37, 659.25];
    frequencies.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, t + i * 0.1);
      
      oscGain.gain.setValueAtTime(0, t + i * 0.1);
      oscGain.gain.linearRampToValueAtTime(0.03, t + i * 0.1 + 0.2);
      oscGain.gain.exponentialRampToValueAtTime(0.0001, t + i * 0.1 + 2.0);

      osc.connect(oscGain);
      oscGain.connect(ctx.destination);
      osc.start(t + i * 0.1);
      osc.stop(t + i * 0.1 + 2.0);
    });

    source.start(t);
    source.stop(t + duration);
  } catch (e) {}
};

export const playShimmerSound = () => {
  try {
    const ctx = getAudioCtx();
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(2000, t);
    osc.frequency.exponentialRampToValueAtTime(3000, t + 0.15);
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.02, t + 0.05);
    gain.gain.linearRampToValueAtTime(0, t + 0.15);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.15);
  } catch (e) {}
};
