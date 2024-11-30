const html = String.raw;

const createErrorCard = (error) => /*html*/ html`
  <!DOCTYPE html>
  <html lang="en">
    <div class="uk-alert red-glass text-white !border-0" uk-alert>
      <a href class="uk-alert-close" uk-close></a>
      <div class="uk-alert-description">${error}</div>
    </div>
  </html>
`;

export default createErrorCard;
