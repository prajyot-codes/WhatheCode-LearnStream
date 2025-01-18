import React from 'react'
import axios from '../api/axios'

const CourseContents = ({course_id}) => {
    const getCourseContents=async ()=>{
        try {
            const response  = axios.get(`/${course_id}/modules`,{
                
            })
        } catch (error) {
            
        }
    }
  return (
    <div></div>
  )
}

export default CourseContents