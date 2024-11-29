function handleAfterShortenRequest() {
  const form = document.getElementById("shortenUrlForm");
  const shortenedUrlAlias = form.querySelector('input[name="shortenedUrlAlias"').value;

  const urlToDirect = form.querySelector('input[name="urlToDirect"]').value;

  document.cookie = "shortenedUrlAlias=" + shortenedUrlAlias;

  // Example logic
  alert("URL shortened successfully!");
}

// Attach the function to the global `window` object
window.handleAfterShortenRequest = handleAfterShortenRequest;
