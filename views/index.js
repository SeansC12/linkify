const html = String.raw;

// npx tailwindcss -i ./public/input.css -o ./public/output.css --watch

const createHomePage = () => /*html*/ html`
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      />
      <!-- JavaScript file -->
      <script src="../scripts/index.js" defer></script>

      <!-- Font -->
      <link
        rel="preconnect"
        href="https://fonts.googleapis.com"
      />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossorigin
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Assistant:wght@200..800&family=Jost:ital,wght@0,100..900;1,100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
        rel="stylesheet"
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
      class="flex items-start justify-center w-full h-screen bg-abstract-background bg-cover flex-col md:flex-row dark p-5"
    >
      <form
        id="shortenUrlForm"
        class="w-full max-w-[600px]"
      >
        <div
          class="flex flex-col gap-5 bg-indigo-900 uk-card uk-card-body !border-0 text-white"
        >
          <div class="text-lg">Where does it go?</div>
          <div>
            <input
              class="uk-input uk-margin !border-gray-300 text-white"
              type="text"
              name="urlToDirect"
              placeholder="www.google.com"
              aria-label="Input"
            />
          </div>
          <div class="text-lg">seanURL link alias</div>
          <div>
            <input
              class="uk-input uk-margin !border-gray-300 text-white"
              type="text"
              name="shortenedUrlAlias"
              placeholder="seanurl.com/"
              aria-label="Input"
            />
          </div>
          <button
            class="uk-button uk-button-default"
            hx-post="/createShortenedUrl"
            hx-target=".indicator-card"
            hx-swap="innerHTML"
            hx-on::after-request="handleAfterShortenRequest(event)"
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
