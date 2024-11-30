const html = String.raw;

const createSuccessCard = (urlToDirect, shortenedUrl) => /*html*/ html`
  <!DOCTYPE html>
  <html lang="en">
    <div class="uk-alert dark:border dark:!border-green-600 dark:text-green-400 w-[350px]" uk-alert>
      <a href class="uk-alert-close" uk-close></a>
      <div class="uk-alert-description">It was a success.</div>
      <div>${shortenedUrl} --> ${urlToDirect}</div>
    </div>
  </html>
`;

export default createSuccessCard;
