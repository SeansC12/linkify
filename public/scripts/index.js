function handleAfterShortenRequest() {
  const form = document.getElementById("shortenUrlForm");
  const shortenedUrlAlias = form.querySelector('input[name="shortenedUrlAlias"').value;

  const urlToDirect = form.querySelector('input[name="urlToDirect"]').value;

  // Find the current value of the cookie "shortenedUrlAlias"
  let currentShortenedUrlAlias = document.cookie
    .split(";")
    .find((c) => c.includes("shortenedUrlAlias"));

  if (currentShortenedUrlAlias) {
    currentShortenedUrlAlias = currentShortenedUrlAlias.split("=")[1];

    document.cookie = "shortenedUrlAlias=" + currentShortenedUrlAlias + "," + shortenedUrlAlias;
  } else {
    currentShortenedUrlAlias = "";
    document.cookie = "shortenedUrlAlias=" + shortenedUrlAlias;
  }

  alert("URL shortened successfully!");
}

// Attach the function to the global `window` object
window.handleAfterShortenRequest = handleAfterShortenRequest;
