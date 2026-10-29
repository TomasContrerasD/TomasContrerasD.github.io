(() => {
  const form = document.getElementById('contact-form');
  const emailLink = document.getElementById('contact-email-link');
  const feedback = document.getElementById('contact-form-feedback');
  if (!form || !emailLink || !feedback) return;

  const requiredText = [form.elements.namedItem('name'), form.elements.namedItem('project')];
  requiredText.forEach(field => {
    field.addEventListener('input', () => field.setCustomValidity(''));
  });

  form.addEventListener('submit', event => {
    event.preventDefault();
    requiredText.forEach(field => {
      field.setCustomValidity(field.value.trim() ? '' : 'Completa este campo para continuar.');
    });
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const value = name => String(data.get(name) || '').trim();
    const subject = value('company')
      ? `Conversemos sobre ${value('company')}`
      : 'Conversemos sobre mi proyecto';
    const body = [
      'Hola Tomás,',
      '',
      `Nombre: ${value('name')}`,
      `Empresa: ${value('company') || 'No indicada'}`,
      `Industria: ${value('industry') || 'No indicada'}`,
      `Email de contacto: ${value('email')}`,
      `Cómo te conocí: ${value('referral') || 'No indicado'}`,
      '',
      'Mi proyecto y las oportunidades que veo:',
      value('project').replace(/\r?\n/g, '\r\n')
    ].join('\r\n');

    emailLink.href = `mailto:tomascontrerasipd@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    emailLink.click();
    feedback.textContent = 'Los datos están preparados para enviarlos desde tu aplicación de correo. Si no se abre, puedes intentar con el enlace de correo del pie de página o escribirme directamente. El mensaje todavía no se ha enviado.';
  });
})();
