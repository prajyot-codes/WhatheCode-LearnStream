import React from 'react'
import { useParams } from 'react-router-dom'

const Student = () => {
  const {user_id} = useParams();
  return (
    <div>
      Student
      <section>
                <h1> welcome student {user_id} are logged in!</h1>
                <br />
                <p>
                   
                </p>
            </section>
      </div>
  )
}

export default Student;