import { factory } from '../factory'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'

export const POST = factory.createHandlers(
  zValidator(
    'form',
    z.object({
      name: z.string()
    }),
    (result, c) => {
      if (!result.success) {
        c.status(400)
        return c.html(<p>Invalid!</p>)
      }
    }
  ),
  (c) => {
    const { name } = c.req.valid('form')
    return c.html(<p>You are name is {name}</p>)
  }
)

export default function Home() {
  return (
    <div>
      <h2>Form</h2>
      <form hx-post="/form" hx-swap="outerHTML">
        <input name="name" type="text" autocomplete="off" />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
