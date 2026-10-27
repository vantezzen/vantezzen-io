import Link from "next/link";

export function Body() {
  return (
    <>
      <h2>What it is</h2>
      <p>
        Wrapped for DoorDash shows your last year of food deliveries as a
        short story in the style of Spotify Wrapped: what you spent, how long
        you waited and where you ordered most.
      </p>

      <p>
        The story has eight slides, each with its own song from Spotify’s embed
        player:
      </p>
      <ol>
        <li>An intro that sets up the year</li>
        <li>
          Your total spend, with a comment that scales with the amount, from
          “A single dollar? Was it for a candy?” to “DoorDash devotee status:
          unlocked.”
        </li>
        <li>The total time you spent waiting for deliveries</li>
        <li>
          What you could have done in that time instead, such as cooking a
          homemade meal or learning a new language, “but you were probably
          just on your phone”
        </li>
        <li>The weekday you order most</li>
        <li>Your top store and how often you ordered there</li>
        <li>Your most ordered category</li>
        <li>A roundup with all numbers on one card</li>
      </ol>
      <p>
        The roundup can be saved as an image in story format.
      </p>

      <h2>How it works</h2>
      <p>
        DoorDash lets you export your order history from the app (Profile,
        then Order History, then Export Order Data). You get a file called{" "}
        <code>DoorDashOrders.zip</code> and drop it onto the site. The rest
        happens in your browser:
      </p>
      <ol>
        <li>JSZip unpacks the archive</li>
        <li>
          PapaParse reads <code>consumer_order_details.csv</code>, which lists
          every item you ordered as its own row
        </li>
        <li>
          Rows with the same timestamp are grouped into one order, and only
          the last twelve months are kept
        </li>
        <li>
          Delivery time is the difference between order time and delivery
          time. Pickup orders are left out of that number.
        </li>
      </ol>
      <p>
        Your order history is never uploaded to a server. The statistics,
        slides and summary image are all generated on your device.
      </p>

      <h2>Why it exists</h2>
      <p>
        After <Link href="/project/wrapped-for-tiktok">Wrapped for TikTok</Link>{" "}
        took off, the format turned out to work for any service that lets you
        export your data. DoorDash was an obvious candidate: people order a
        lot, rarely add it up, and the export contains exact prices and
        timestamps.
      </p>

      <h2>What happened</h2>
      <p>
        The app reuses the TikTok Wrapped architecture: the same story player,
        statistics classes, per-slide music and share image route. Only the
        parsing and the statistics are new, so it took a single day to build in
        November 2023. The source code is MIT licensed on GitHub.
      </p>
      <p>
        The same approach produced other Wrapped apps for Apple Health,
        Instagram and Hinge. Each one only needs a parser for the service’s
        export format and a new set of statistics and slides.
      </p>
    </>
  );
}
