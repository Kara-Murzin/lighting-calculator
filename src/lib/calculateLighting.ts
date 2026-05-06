import type { Fixture } from './fixtures';

export type LightingInputs = {
  length: number;
  width: number;
  ceilingHeight: number;
  targetLux: number;
  fixture?: Fixture | null;
  manualFixtureWatts?: number | null;
};

export type LightingResult = {
  roomArea: number;
  roomIndex: number;
  utilizationFactor: number;
  requiredLumens: number;
  fixtureLumens: number | null;
  fixtureCount: number | null;
};

export const LUMENS_PER_WATT = 100;
export const WORKING_SURFACE_HEIGHT = 0;

export function calculateRoomArea(length: number, width: number): number {
  return length * width;
}

export function calculateRoomIndex(
  length: number,
  width: number,
  ceilingHeight: number,
): number {
  const mountingHeight = Math.max(ceilingHeight - WORKING_SURFACE_HEIGHT, 0.1);

  return (length * width) / (mountingHeight * (length + width));
}

function interpolateUtilization(roomIndex: number, values: number[]): number {
  const indexes = [0.6, 1, 1.5, 2.5, 4, 5];
  const normalizedIndex = Math.min(Math.max(roomIndex, indexes[0]), indexes.at(-1)!);

  for (let index = 0; index < indexes.length - 1; index += 1) {
    const current = indexes[index];
    const next = indexes[index + 1];

    if (normalizedIndex >= current && normalizedIndex <= next) {
      const progress = (normalizedIndex - current) / (next - current);
      return values[index] + (values[index + 1] - values[index]) * progress;
    }
  }

  return values.at(-1)!;
}

export function estimateUtilizationFactor(
  roomIndex: number,
  fixture?: Fixture | null,
): number {
  const isNarrowBeam = fixture?.beamAngle.includes('D30');
  const values = isNarrowBeam
    ? [0.28, 0.36, 0.45, 0.54, 0.62, 0.68]
    : [0.38, 0.48, 0.58, 0.66, 0.72, 0.76];

  return interpolateUtilization(roomIndex, values);
}

export function calculateFixtureLumens(
  fixture: Fixture,
  manualFixtureWatts?: number | null,
): number {
  return manualFixtureWatts
    ? manualFixtureWatts * LUMENS_PER_WATT
    : fixture.lumens || fixture.watts * LUMENS_PER_WATT;
}

export function calculateRequiredLumens(
  roomArea: number,
  targetLux: number,
  utilizationFactor: number,
): number {
  return (roomArea * targetLux) / utilizationFactor;
}

export function calculateLighting({
  length,
  width,
  ceilingHeight,
  targetLux,
  fixture,
  manualFixtureWatts,
}: LightingInputs): LightingResult {
  const roomArea = calculateRoomArea(length, width);
  const roomIndex = calculateRoomIndex(length, width, ceilingHeight);
  const utilizationFactor = estimateUtilizationFactor(roomIndex, fixture);
  const requiredLumens = calculateRequiredLumens(
    roomArea,
    targetLux,
    utilizationFactor,
  );
  const fixtureLumens = fixture
    ? calculateFixtureLumens(fixture, manualFixtureWatts)
    : null;

  return {
    roomArea,
    roomIndex,
    utilizationFactor,
    requiredLumens,
    fixtureLumens,
    fixtureCount: fixtureLumens ? Math.ceil(requiredLumens / fixtureLumens) : null,
  };
}
