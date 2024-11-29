const html = String.raw;

const createMyLinkRow = (alias, urlToDirect, visits) => /*html*/ html`
  <tr>
    <td>${alias}</td>
    <td>${urlToDirect}</td>
    <td>${visits}</td>
  </tr>
`;

export default createMyLinkRow;
