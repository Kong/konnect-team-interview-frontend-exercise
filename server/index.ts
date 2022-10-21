import app from './app'

const port = 4001

app.listen(port, () => {
  console.log('')
  console.log(`App listening on http://localhost:${port}`)
})
