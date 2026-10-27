export function Body() {
  return (
    <>
      <h2>What it is</h2>
      <p>
        How loud is my Hotel scores how noisy a hotel, Airbnb, apartment or
        potential new home is likely to be. You enter an address and get a
        quiet score from 0 to 100, where higher means quieter. A map shows
        every noise source that went into the score, with separate scores for
        day and night.
      </p>

      <h2>How it works</h2>
      <h3>Finding noise sources</h3>
      <p>
        All data comes from OpenStreetMap. Address search uses Nominatim, and
        noise sources come from six queries to the Overpass API, each with its
        own radius:
      </p>
      <ul>
        <li>Nightlife such as bars, clubs and beer gardens: 150 m</li>
        <li>Major roads: 200 m. Railways, trams and stations: 300 m</li>
        <li>Fire stations, police and hospitals: 600 m</li>
        <li>Stadiums, venues, markets, schools and places of worship: 200–500 m</li>
        <li>Construction sites and industrial areas: 250–400 m</li>
        <li>Airports, runways and helipads: 4 km</li>
      </ul>

      <h3>Scoring</h3>
      <p>
        Each source gets a base weight by category, adjusted with its
        OpenStreetMap tags. A motorway counts more than a secondary road, more
        lanes and higher speed limits add weight, and tunnels count for almost
        nothing. An S-Bahn line counts less than an intercity line.
      </p>
      <p>
        The weight then decays with distance. Low-frequency noise from trains
        and aircraft carries far, so it decays slowly. Bar noise drops off
        within a block, so it decays fast. A railway line that is mapped as
        many segments only counts once, at its closest point.
      </p>
      <p>
        Every source also has a time profile. A motorway is loud around the
        clock, a bar is loud at night, and a stadium is loud only on event
        days, so it counts for a quarter of a constant source. These profiles
        produce the separate day and night scores and caveats such as
        temporary construction.
      </p>
      <p>
        The final 0 to 100 score is calibrated against all hotels in the
        database. A score of 90 means the location is quieter than about 90%
        of tracked hotels.
      </p>

      <h3>Caching and privacy</h3>
      <p>
        The first lookup of a place queries OpenStreetMap and takes a few
        seconds. The result is stored, so every later visit loads instantly
        and the public OpenStreetMap services are not queried again. Only real
        accommodation is listed publicly on city pages. If you look up your own
        home, the result is cached but never listed and hidden from search
        engines.
      </p>

      <h2>Why it exists</h2>
      <p>
        Booking sites show where a hotel is, but not how close it is to the
        next railway line or nightclub. OpenStreetMap has that data, so a
        score can be computed before you book.
      </p>

      <h2>What happened</h2>
      <p>
        The tool launched in June 2026. City pages rank about 250 hotels across
        40 cities, including London, Paris, New York and Tokyo, by quiet
        score. The same engine powers separate pages for checking an Airbnb, an
        apartment or a new home before you sign a lease.
      </p>
      <p>
        It is built with TanStack Start, Drizzle and Postgres, and the map uses
        deck.gl on top of MapLibre.
      </p>
    </>
  );
}
