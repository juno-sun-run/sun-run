import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'

const apiKey = '5c1ff5d0518447f4acc8eb16766c0f66'
const url = 'https://api.geoapify.com/v1/geocode/reverse'

function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    axios ({
      url: url,
      method: 'GET',
      dataResponse: 'json',
      params: {
        key: apiKey,
        lat: '52.47944744483806',
        lon: '13.213967739855434',
      }
    }).then((response) => {console.log(response.data)})
      .catch((error) => console.log(error))
  }, [])

  // const apiUrl = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=YOUR_API_KEY`

  return (
    <>
      
    </>
  )
}

export default App
