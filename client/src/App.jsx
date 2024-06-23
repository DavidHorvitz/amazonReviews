import { useState } from 'react'
import AmazonReviewData from './components/AmazonReviewData/AmazonReviewData'
import BasicTable from './components/templates/table/BasicTable'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AmazonReviewData />
    </>
  )
}

export default App
