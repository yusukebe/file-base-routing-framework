import { jsxRenderer } from 'hono/jsx-renderer'

export default jsxRenderer(({ children }) => {
  return (
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@exampledev/new.css/new.min.css" />
        <script src="https://unpkg.com/htmx.org@1.9.9"></script>
      </head>
      <body>
        <h1>
          <a href="/">file-base-routing-framework!</a>
        </h1>
        {children}
      </body>
    </html>
  )
})
