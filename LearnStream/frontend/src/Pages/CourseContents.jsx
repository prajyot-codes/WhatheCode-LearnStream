import React from 'react'
import axios from '../api/axios'
import ModuleDropdown from '../components/ModuleDropDown'
import { useLocation } from 'react-router-dom'

const CourseContents = ({course_id}) => {
  let location = useLocation()
    const getCourseContents=async ()=>{
        try {
            const response  = axios.get(`/${course_id}/modules`,{
                
            })
        } catch (error) {
            
        }
    }
  return (
    <div>
      <ModuleDropdown/>
    </div>
  )
}

export default CourseContents