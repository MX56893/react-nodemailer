import mailerFactory, { Mailer } from '../src'
import React from 'react'

const emailsList = {
  foo: ({ name }) => ({
    subject: `👋 ${name}!`,
    body: (
      <div>
        <p>Hi {name}!</p>
        <p>Here's your email!</p>
      </div>
    ),
  }),
}

describe('nodemailer-react', () => {
  test('it sends an email with jsx transpiled', async () => {
    const mailer = Mailer({
      transport: { jsonTransport: true },
    }, emailsList)

    const { message } = await mailer.send(
      'foo',
      { name: 'Mathieu' },
      { to: 'foo@bar' },
    )

    expect(JSON.parse(message)).toMatchObject({
      to: [{ address: 'foo@bar', name: '' }],
      subject: '👋 Mathieu!',
      html: `<!DOCTYPE html><div><p>Hi Mathieu!</p><p>Here&#x27;s your email!</p></div>`,
    })
  })

  test('it export default the same Mailer', () => {
    expect(mailerFactory).toBe(Mailer)
  })
})
