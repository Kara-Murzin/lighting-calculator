import { fixtureCatalog } from '../lib/fixtures';

type FixtureSelectorProps = {
  selectedFixtureId: string | null;
  onSelect: (fixtureId: string | null) => void;
};

export function FixtureSelector({ selectedFixtureId, onSelect }: FixtureSelectorProps) {
  if (fixtureCatalog.length === 0) {
    return (
      <section className="fixture-card" aria-labelledby="fixture-title">
        <div>
          <p className="section-kicker">светильник</p>
          <h2 id="fixture-title">Каталог пока пуст</h2>
        </div>
        <p>
          Когда каталог будет добавлен, здесь появится выбор светильника. После выбора
          калькулятор покажет требуемое количество для помещения.
        </p>
      </section>
    );
  }

  return (
    <section className="fixture-card" aria-labelledby="fixture-title">
      <div>
        <p className="section-kicker">светильник</p>
        <h2 id="fixture-title">Выберите светильник</h2>
      </div>
      <select
        className="fixture-card__select"
        value={selectedFixtureId ?? ''}
        onChange={(event) => onSelect(event.target.value || null)}
      >
        <option value="">Не выбран</option>
        {fixtureCatalog.map((fixture) => (
          <option key={fixture.id} value={fixture.id}>
            {fixture.name} - {fixture.watts} Вт / {fixture.lumens} лм
          </option>
        ))}
      </select>
    </section>
  );
}
