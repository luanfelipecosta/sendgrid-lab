import { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { sendEmail } from 'helpers/send-email.helper';
import { Field, Form, Formik } from 'formik';

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export default function Home() {
  const [attachments, setAttachments] = useState<any>([]);

  // useEffect(() => {
  //   sendEmail()
  //     .then(() => alert('email sent'))
  //     .catch(console.log);
  // });

  const handleChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      e.persist();
      setAttachments([]);
      const inputFiles = e?.target?.files;
      if (!inputFiles?.length) return setAttachments([]);

      const attachmentList = [];

      for (let i = 0; i < inputFiles.length; i++) {
        const file: File = inputFiles[i];
        const base64 = await toBase64(file);
        const item = { filename: file.name, content: base64 };
        attachmentList.push(item);
      }

      setAttachments(attachmentList);
    },
    [attachments, setAttachments],
  );

  const handleSubmit = async (value: any) => {
    console.log(value);
    console.log(attachments);
    try {
      const res = await sendEmail(value.name, attachments);
      console.log(res);
    } catch (e) {
      console.log(`❌`, e);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <Formik initialValues={{}} onSubmit={handleSubmit}>
          <Form>
            <Field type="text" name="name" />
            <Field onChange={handleChange} multiple type="file" name="attachments" />
            <button type="submit">enviar</button>
          </Form>
        </Formik>
      </div>
      {attachments.map((att, i) => (
        <p key={i}>{att.filename}</p>
      ))}
      {/* <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log(e);
          }}
        >
          <input type="text" name="name" />
          <input type="email" name="_replyto" />
          <input type="submit" value="Send" />
          <input type="file" name="attachment" id="attachment" />
          <button type="submit">enviar</button>
        </form>
      </main> */}

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}
