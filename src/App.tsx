import { useMemo, useState } from 'react';
import { FixtureSelector } from './components/FixtureSelector';
import { NumberControl } from './components/NumberControl';
import { calculateLighting } from './lib/calculateLighting';
import {
  MAX_FIXTURE_WATTS,
  MIN_FIXTURE_WATTS,
  fixtureCatalog,
} from './lib/fixtures';

export default function App() {
  const [length, setLength] = useState(5);
  const [width, setWidth] = useState(5);
  const [ceilingHeight, setCeilingHeight] = useState(3);
  const [targetLux, setTargetLux] = useState(400);
  const [selectedFixtureId, setSelectedFixtureId] = useState<string | null>(null);
  const [manualFixtureWatts, setManualFixtureWatts] = useState<number | null>(null);

  const selectedFixture = useMemo(
    () => fixtureCatalog.find((fixture) => fixture.id === selectedFixtureId) ?? null,
    [selectedFixtureId],
  );

  const result = calculateLighting({
    length,
    width,
    ceilingHeight,
    targetLux,
    fixture: selectedFixture,
    manualFixtureWatts,
  });

  const handleFixtureSelect = (fixtureId: string | null) => {
    setSelectedFixtureId(fixtureId);
    setManualFixtureWatts(null);
  };

  return (
    <main className="calculator-shell">
      <section className="calculator-panel" aria-label="Калькулятор освещенности">
        <div className="calculator-panel__content">
          <header className="page-header">
            <h1>калькулятор освещенности</h1>
            <p>
              Задайте параметры помещения, выберите светильник из каталога и при
              необходимости переопределите его мощность вручную.
            </p>
          </header>

          <FixtureSelector
            selectedFixtureId={selectedFixtureId}
            onSelect={handleFixtureSelect}
          />

          {selectedFixture && (
            <section className="manual-power" aria-labelledby="manual-power-title">
              <div>
                <p className="section-kicker">мощность светильника</p>
                <h2 id="manual-power-title">{selectedFixture.watts} Вт паспортная</h2>
                <p>
                  Если задать мощность вручную, паспортный световой поток будет
                  проигнорирован и расчет пойдет по правилу 1 Вт = 100 лм.
                </p>
              </div>

              {manualFixtureWatts === null ? (
                <button
                  className="secondary-button"
                  type="button"
                  onClick={() => setManualFixtureWatts(selectedFixture.watts)}
                >
                  задать ватт вручную
                </button>
              ) : (
                <div className="manual-power__controls">
                  <NumberControl
                    label="ватт вручную"
                    value={manualFixtureWatts}
                    unit="Вт"
                    min={MIN_FIXTURE_WATTS}
                    max={MAX_FIXTURE_WATTS}
                    step={1}
                    fractionDigits={0}
                    onChange={setManualFixtureWatts}
                  />
                  <button
                    className="secondary-button"
                    type="button"
                    onClick={() => setManualFixtureWatts(null)}
                  >
                    использовать паспортную
                  </button>
                </div>
              )}
            </section>
          )}

          <section className="control-section" aria-labelledby="room-params-title">
            <h2 id="room-params-title">параметры помещения</h2>
            <div className="control-grid control-grid--room">
              <NumberControl
                label="длина"
                value={length}
                unit="м"
                min={0.5}
                max={100}
                step={0.5}
                onChange={setLength}
              />
              <NumberControl
                label="ширина"
                value={width}
                unit="м"
                min={0.5}
                max={100}
                step={0.5}
                onChange={setWidth}
              />
              <NumberControl
                label="высота потолка"
                value={ceilingHeight}
                unit="м"
                min={1}
                max={20}
                step={0.1}
                onChange={setCeilingHeight}
              />
            </div>
          </section>

          <section className="control-section" aria-labelledby="lighting-params-title">
            <h2 id="lighting-params-title">параметры освещения</h2>
            <div className="control-grid control-grid--lighting">
              <NumberControl
                label="освещенность"
                value={targetLux}
                unit="лк"
                min={0}
                max={2000}
                step={10}
                fractionDigits={0}
                onChange={setTargetLux}
              />
            </div>
          </section>

          <section className="result-card" aria-live="polite">
            <p className="section-kicker">результат</p>
            <div className="result-card__grid">
              <div>
                <span>общая площадь</span>
                <strong>
                  {result.roomArea.toFixed(1)} м<sup>2</sup>
                </strong>
              </div>
              <div>
                <span>количество светильников</span>
                <strong>
                  {result.fixtureCount === null
                    ? 'выберите светильник'
                    : `${result.fixtureCount} шт.`}
                </strong>
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
