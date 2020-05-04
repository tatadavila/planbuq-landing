/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import axios from 'axios';
import useForm from '../Functions/useForm';
import Layout from '../components/layout/Layout';

const getFormEndpoint = 'f13e3c22-1da7-46be-9495-06c76b3941d3';
const formUrl = `https://getform.io/f/${getFormEndpoint}`;

export default function Signin() {
  const [status, setStatus] = React.useState(() => 'not_sent');
  const [state, onChangeHandler, { resetForm }] = useForm({
    name: '',
    email: '',
    tel: ''
  });

  function signin() {
    setStatus('sending');
    return axios.post(formUrl, state).then(
      res => {
        setStatus('sending');
      },
      err => {
        setStatus('sent_fail');
      }
    );
  }
  return (
    <Layout>
      {status === 'sent_ok' && <p>enviado con exito</p>}

      {status === 'sent_fail' && <p>Error</p>}
      <form
        method="POST"
        action={formUrl}
        onSubmit={e => {
          e.preventDefault();
          setStatus('sending');
          signin().then(
            () => {
              setStatus('sent_ok');
              resetForm();
            },
            () => {
              setStatus('sent_fail');
            }
          );
        }}
      >
        <fieldset disabled={status === 'sending'}>
          <h2>Formulario</h2>

          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={state.name}
            onChange={onChangeHandler}
            required
          />
          <hr />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={state.email}
            onChange={onChangeHandler}
            required
          />
          <hr />
          <label htmlFor="tel">Telephone</label>
          <input
            type="tel"
            id="tel"
            name="tel"
            value={state.tel}
            onChange={onChangeHandler}
            required
          />
          <hr />
          <button type="submit">Sign in</button>
        </fieldset>
      </form>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </Layout>
  );
}
