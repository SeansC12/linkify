const html = String.raw;

const createSuccessCard = (successMessage) => /*html*/ html`
  <!DOCTYPE html>
  <html lang="en">
    <div class="uk-alert green-glass text-white !border-0 w-full" uk-alert>
      <a href class="uk-alert-close" uk-close></a>
      <div class="uk-alert-description">${successMessage}</div>
    </div>
  </html>
`;

export default createSuccessCard;
