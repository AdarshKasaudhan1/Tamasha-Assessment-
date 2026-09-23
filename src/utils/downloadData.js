export const downloadJSON = (formData) => {
  const fileName = formData.fullName
    ? `${formData.fullName.replace(/\s+/g, '_')}_application.json`
    : 'application.json';

  const blob = new Blob([JSON.stringify(formData, null, 2)], {
    type: 'application/json'
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
