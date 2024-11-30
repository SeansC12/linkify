const html = String.raw;

const createMyLinkRow = (alias, urlToDirect, visits) => /*html*/ html`
  <tr>
    <td>${alias}</td>
    <td class="break-all">${urlToDirect}</td>
    <td>${visits}</td>
  </tr>
`;

export default createMyLinkRow;
