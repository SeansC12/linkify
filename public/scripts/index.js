function handleAfterShortenRequest(event) {
  const indicatorCard = document.getElementById("indicator-card");
  indicatorCard.classList.remove("hidden");

  if (event.detail.xhr.status !== 200) {
    return;
  }

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

function handleBeforeShortenRequestSent() {
  const indicatorCard = document.getElementById("indicator-card");
  if (indicatorCard) {
    indicatorCard.classList.add("hidden");
  }
}

// Attach the function to the global `window` object
window.handleAfterShortenRequest = handleAfterShortenRequest;
