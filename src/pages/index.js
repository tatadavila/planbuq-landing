
/* eslint-disable no-underscore-dangle */
import React from 'react'
import axios from 'axios'
import useForm from '../Functions/useForm'
import Layout from '../components/layout/Layout'
import Form from 'react-bootstrap/Form'
import 'bootstrap/dist/css/bootstrap.min.css'

const getFormEndpoint = 'f13e3c22-1da7-46be-9495-06c76b3941d3'
const formUrl = `https://getform.io/f/${getFormEndpoint}`

export default function Signin () {
  const [status, setStatus] = React.useState(() => 'not_sent')
  const [state, onChangeHandler, { resetForm }] = useForm({
    name: '',
    email: '',
    tel: ''
  })

  function signin () {
    setStatus('sending')
    return axios.post(formUrl, state).then(
      res => {
        setStatus('sending')
      },
      _err => {
        setStatus('sent_fail')
      }
    )
  }
  return (
    <Layout>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {status === 'sent_ok' && <p>enviado con exito</p>}
        {status === 'sent_fail' && <p>Error</p>}
        <div className='col-md-9 mt-5'>
          <Form
            method='POST'
            action={formUrl}
            onSubmit={e => {
              e.preventDefault()
              setStatus('sending')
              signin().then(
                () => {
                  setStatus('sent_ok')
                  resetForm()
                },
                () => {
                  setStatus('sent_fail')
                }
              )
            }}
          >
            <fieldset disabled={status === 'sending'}>

              <h3>Registrate y obtén los mejores descuentos en tus restaurantes favoritos</h3>
              <hr />

              <label htmlFor='name'>Nombre y Apellido</label>
              <input
                type='text'
                id='name'
                name='name'
                value={state.name}
                onChange={onChangeHandler}
                required
              />
              <hr />
              <label htmlFor='age'>Edad</label>
              <input
                type='text'
                id='age'
                name='age'
                pattern='[0-9]*'
                value={state.age}
                onChange={onChangeHandler}
                required
              />
              <hr />
              <label htmlFor='email'>Correo Electrónico</label>
              <input
                type='email'
                id='email'
                name='email'
                value={state.email}
                onChange={onChangeHandler}
                required
              />
              <hr />
              <label htmlFor='tel'>Celular</label>
              <input
                type='tel'
                id='tel'
                name='tel'
                value={state.tel}
                onChange={onChangeHandler}
                required
              />
              <hr />
              <button type='submit' className='btn btn-primary'>
                Resgistrar
              </button>
            </fieldset>
          </Form>
        </div>
      </div>
    </Layout>
  )
}
