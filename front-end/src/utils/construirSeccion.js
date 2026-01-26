const construirSeccion = (titulo, data) => {
  let html = `<h3>${titulo}</h3><ul>`;

  Object.entries(data).forEach(([label, value]) => {
    if (value) {
      html += `<li><strong>${label}:</strong> ${value}</li>`;
    }
  });

  html += `</ul>`;
  return html;
};

export default construirSeccion;
