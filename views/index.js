const html = String.raw;

// npx tailwindcss -i ./public/input.css -o ./public/output.css --watch

const createHomePage = () => /*html*/ html`
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <!-- JavaScript file -->
      <script src="../scripts/index.js" defer></script>

      <!-- Font -->
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Assistant:wght@200..800&family=Jost:ital,wght@0,100..900;1,100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
        rel="stylesheet"
      />

      <!-- TailwindCSS -->
      <link href="/output.css" rel="stylesheet" />

      <!-- Franken UI -->
      <link rel="stylesheet" href="https://unpkg.com/franken-wc@0.1.0/dist/css/neutral.min.css" />
      <script src="https://cdn.jsdelivr.net/npm/uikit@3.21.6/dist/js/uikit.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/uikit@3.21.6/dist/js/uikit-icons.min.js"></script>

      <!-- HTMX -->
      <script
        src="https://unpkg.com/htmx.org@2.0.2"
        integrity="sha384-Y7hw+L/jvKeWIRRkqWYfPcvVxHzVzn5REgzbawhxAuQGwX1XWe70vji+VSeHOThJ"
        crossorigin="anonymous"
      ></script>

      <!-- HTMX Response Targets -->
      <script src="https://unpkg.com/htmx-ext-response-targets@2.0.0/response-targets.js"></script>

      <title>Shorten your URL</title>
    </head>

    <body
      class="flex items-center justify-start w-full h-screen bg-green-300 bg-cover flex-col dark p-5"
    >
      <div hx-ext="response-targets" class="w-full max-w-[600px] flex flex-col gap-5">
        <form id="shortenUrlForm" class="w-full">
          <div class="white-glass uk-card uk-card-body !border-0 text-black">
            <div class="card-header">Where does it go?</div>
            <div class="mb-7">
              <input
                class="uk-input !border-gray-400 focus:!border-gray-700 placeholder-gray-500 !text-black"
                type="text"
                name="urlToDirect"
                placeholder="www.google.com"
                aria-label="Input"
              />
            </div>
            <div class="card-header">seanURL link alias</div>
            <div class="flex items-center gap-2 mb-7">
              <span class="text-black text-sm select-none">seanurl.vercel.app/</span>
              <input
                class="uk-input !border-gray-400 focus:!border-gray-700 placeholder-gray-500 !text-black"
                type="text"
                name="shortenedUrlAlias"
                placeholder="my-alias"
                aria-label="Input"
              />
            </div>
            <button
              class="button-white-glass py-2 px-3 text-base w-full"
              hx-post="/createShortenedUrl"
              hx-swap="outerHTML"
              hx-target="#indicator-card"
              hx-target-x="#indicator-card"
              hx-on::after-request="handleAfterShortenRequest(event)"
            >
              Shorten
            </button>
          </div>
        </form>
        <div id="indicator-card" class="hidden"></div>
        <div
          class="flex flex-col gap-5 white-glass w-full uk-card uk-card-body !border-0 text-black"
        >
          <div
            hx-get="/retrieveMyLinks"
            hx-trigger="every 1s"
            hx-target=".my-links"
            hx-swap="innerHTML"
            class="text-lg"
          >
            <div class="card-header">My links</div>
            <div>
              <table class="uk-table">
                <thead>
                  <tr>
                    <th class="!text-black !font-bold">Alias</th>
                    <th class="!text-black !font-bold">Long link</th>
                    <th class="!text-black !font-bold">Visits</th>
                  </tr>
                </thead>
                <tbody class="my-links !border-white"></tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </body>
  </html>
`;

export default createHomePage;
