import app from './app'

// Port will be proxied in the vite.config.ts
const port = 4001

app.listen(port, () => {
  console.log('')
  console.log(`API server listening on http://localhost:${port}`)
  console.log(`The API response is available at http://localhost:${port}/api/services`)
})
