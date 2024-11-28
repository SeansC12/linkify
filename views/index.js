const html = String.raw;

const createHomePage = () => /*html*/ html`
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      />
      <!-- TailwindCSS -->
      <link href="/output.css" rel="stylesheet" />
      <!-- Franken UI -->
      <link
        rel="stylesheet"
        href="https://unpkg.com/franken-wc@0.1.0/dist/css/neutral.min.css"
      />
      <script src="https://cdn.jsdelivr.net/npm/uikit@3.21.6/dist/js/uikit.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/uikit@3.21.6/dist/js/uikit-icons.min.js"></script>
      <!-- HTMX -->
      <script
        src="https://unpkg.com/htmx.org@2.0.2"
        integrity="sha384-Y7hw+L/jvKeWIRRkqWYfPcvVxHzVzn5REgzbawhxAuQGwX1XWe70vji+VSeHOThJ"
        crossorigin="anonymous"
      ></script>
      <title>Shorten your URL</title>
    </head>

    <body
      style="background-image: url('../images/background.jpg'); background-repeat: no-repeat; background-size: cover; opacity: 0.7"
      class="flex w-full items-center flex-row gap-10"
    >
      <form class="w-[350px]">
        <div
          class="flex gap-2 flex-col bg-purple-800 uk-card uk-card-body"
        >
          <div class="uk-text-default text-white">
            Where does it go?
          </div>
          <div>
            <input
              class="uk-input uk-margin"
              type="text"
              name="urlToDirect"
              placeholder="www.google.com"
              aria-label="Input"
            />
          </div>
          <div class="uk-text-default text-white">
            Seanurl link alias
          </div>
          <div>
            <input
              class="uk-input"
              type="text"
              name="shortenedUrlAlias"
              placeholder="seanurl.com/"
              aria-label="Input"
            />
          </div>
          <button
            class="uk-button uk-button-default uk-margin w-max"
            hx-post="/createShortenedUrl"
            hx-target=".indicator-card"
            hx-swap="innerHTML"
          >
            Shorten
          </button>
        </div>
      </form>
      <div class="indicator-card"></div>
    </body>
  </html>
`;

export default createHomePage;
