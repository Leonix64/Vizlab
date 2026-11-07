import { FixedClock } from './fixed-clock.ts';

describe('FixedClock', () => {
  it('starts at frame 0 and time 0', () => {
    const clock = new FixedClock(60, 10);
    expect(clock.frame).toBe(0);
    expect(clock.time).toBe(0);
  });

  it('advances time by 1/fps per frame', () => {
    const clock = new FixedClock(60, 10);
    clock.advance();
    expect(clock.frame).toBe(1);
    expect(clock.time).toBeCloseTo(1 / 60, 10);
  });

  it('computes total frames from the duration', () => {
    expect(new FixedClock(30, 2).totalFrames).toBe(60);
  });

  it('stops at the last frame', () => {
    const clock = new FixedClock(10, 1);
    for (let i = 0; i < 50; i++) {
      clock.advance();
    }
    expect(clock.frame).toBe(10);
    expect(clock.isFinished).toBe(true);
  });

  it('seeks by seconds and clamps to the valid range', () => {
    const clock = new FixedClock(60, 10);

    clock.seekSeconds(2.5);
    expect(clock.frame).toBe(150);

    clock.seekSeconds(-5);
    expect(clock.frame).toBe(0);

    clock.seekSeconds(999);
    expect(clock.frame).toBe(600);
  });

  it('resets to the beginning', () => {
    const clock = new FixedClock(60, 10);
    clock.seekSeconds(3);
    clock.reset();
    expect(clock.frame).toBe(0);
  });

  it('rejects an invalid fps', () => {
    expect(() => new FixedClock(0, 10)).toThrow();
  });
});