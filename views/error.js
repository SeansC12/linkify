const html = String.raw;

const createErrorCard = (error) => /*html*/ html`
  <!DOCTYPE html>
  <html lang="en">
    <div
      class="uk-alert uk-alert-danger w-[350px]"
      uk-alert
    >
      <a href class="uk-alert-close" uk-close></a>
      <div class="uk-alert-description">${error}</div>
    </div>
  </html>
`;

export default createErrorCard;
