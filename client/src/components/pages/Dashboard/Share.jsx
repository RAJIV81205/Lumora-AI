import React from 'react'
import { useParams } from 'react-router'

const Share = () => {
    const [material, setMaterial] = React.useState([])
    const [error, setError] = React.useState(null)
    const {courseId} =  useParams()
    const url = import.meta.env.VITE_BACKEND_URL

    const getMaterial = async () => {
        try {
            const response = await fetch(`${url}/material/${courseId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json()
            if (!response.ok){
                setError(data.meassage)
            }
            setMaterial(data.material)
        } catch (error) {
            
        }
    }

  return (
    <div>Share</div>
  )
}

export default Share