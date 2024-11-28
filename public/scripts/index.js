function handleAfterShortenRequest(event) {
  const form = document.getElementById("shortenUrlForm");
  console.log(
    form.querySelector('input[name="shortenedUrlAlias"')
      .value
  );

  // Example logic
  alert("URL shortened successfully!");
}

// Attach the function to the global `window` object
window.handleAfterShortenRequest =
  handleAfterShortenRequest;
