export function Body() {
  return (
    <>
      <h2>What it is</h2>
      <p>
        <a
          href="https://neal.fun/infinite-craft/"
          target="_blank"
          rel="noopener"
        >
          Infinite Craft
        </a>{" "}
        is a game by neal.fun. You start with Water, Fire, Wind and Earth and
        combine two items to create a new one. Earth and Water make Plant,
        and after enough steps you can make almost anything, from Dragon to
        Lady Gaga.
      </p>
      <p>
        Infinite Craft Solver tells you how. You type the item you want and
        get a numbered list of combinations that leads from the four starting
        elements to it. Lady Gaga, for example, takes 20 steps. Every item has
        its own shareable URL.
      </p>

      <h2>How it works</h2>
      <h3>Collecting recipes</h3>
      <p>
        The game has no public recipe list, because results are generated on
        the fly the first time anyone combines two items. To build a dataset,
        a crawler asks the game which result a pair produces:
      </p>
      <ol>
        <li>It starts with every pairing of the four base items</li>
        <li>
          For each new item it finds, it queues combinations with every item
          already known
        </li>
        <li>
          Pairs are sorted alphabetically first, because the game treats A + B
          and B + A the same
        </li>
      </ol>
      <p>
        The first crawler drove a real browser with Puppeteer. Two weeks in it
        switched to plain HTTP requests, which was far faster. Results went
        into PostgreSQL. The final dataset has 205,626 recipes and 31,646
        unique items.
      </p>

      <h3>Shipping the data</h3>
      <p>
        The dataset is a single 3.8 MB JSON file on a CDN. To keep it small,
        each item name is stored once in a list, and every recipe is a triple
        of three indices into that list. The format is documented in the
        README, and you can download the file for your own projects.
      </p>

      <h3>Finding the shortest path</h3>
      <p>
        The search runs in your browser. It downloads the recipe file once,
        builds an index from each ingredient to the recipes that use it, and
        runs a Dijkstra-style search:
      </p>
      <ul>
        <li>The four base items cost nothing</li>
        <li>
          A recipe becomes usable only once both ingredients have been reached
        </li>
        <li>
          The cost of the result is the cost of both ingredients plus one step
        </li>
      </ul>
      <p>
        When the target item is reached, the solver walks back through the
        recipes and lists them in an order where every ingredient has already
        been crafted. Recipes that produce one of their own inputs and recipes
        involving “Nothing” are filtered out.
      </p>

      <h2>Why it exists</h2>
      <p>
        Infinite Craft spread fast in early 2024, and a common question about
        it was how to make a specific item. The solver started in February 2024, shortly
        after the game came out, and most of it was built in the following
        twelve days.
      </p>

      <h2>What happened</h2>
      <p>
        The first version computed paths on the server and cached them in
        Redis. Within a week the search moved into the browser, which removed
        the per-request server work. The recipe dataset was last updated in
        April 2024.
      </p>
      <p>
        Users reported two kinds of problems on GitHub: circular recipes
        (Mosquito needed Itchy, which needed Mosquito) and paths that were far
        longer than necessary, such as 22 steps for Human when 7 are enough.
        In July 2026 the original breadth-first scan was replaced with the
        Dijkstra search described above. It removed the server cache and the
        precalculated paths, deleted about 1,600 lines of code and addresses
        both kinds of problems.
      </p>
    </>
  );
}
