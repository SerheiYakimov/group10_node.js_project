import app from '../app';

const PORT = process.env.PORT || 3000

app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000")
})
