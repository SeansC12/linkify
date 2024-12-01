function handleAfterShortenRequest(event) {
  if (event.detail.xhr.status !== 200) {
    document.querySelector("form").reset();
    return;
  }
  console.log(event.detail);
  const form = document.getElementById("shortenUrlForm");

  const shortenedUrlAlias = form.querySelector('input[name="shortenedUrlAlias"]').value;

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
  document.querySelector("form").reset();
}

// Attach the function to the global `window` object
window.handleAfterShortenRequest = handleAfterShortenRequest;
