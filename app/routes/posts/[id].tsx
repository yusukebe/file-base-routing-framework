import { Context } from 'hono'

export default function Home(c: Context) {
  return (
    <div>
      <h2>Post</h2>
      <p>Post id is {c.req.param('id')}</p>
    </div>
  )
}
