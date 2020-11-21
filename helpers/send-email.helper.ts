// interface SendEmailInput {
//   message:
// }

export const sendEmail = (name = 'Sam Smith', attachments) =>
  fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'post',
    headers: new Headers({
      Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify({
      attachments,
      personalizations: [
        {
          to: [
            {
              email: 'luanfelipecosta@gmail.com',
              name: 'Luan Costa',
            },
          ],
          subject: 'Hello, World!',
        },
      ],
      from: {
        email: 'luanfelipecosta@gmail.com',
        name: name,
      },
      content: [
        {
          type: 'text/html',
          value: '<strong>Hello Teste </strong>',
        },
      ],
    }),
  });
