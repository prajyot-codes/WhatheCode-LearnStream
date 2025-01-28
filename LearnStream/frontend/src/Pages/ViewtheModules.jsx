import axios from 'axios';
import React, { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ViewtheModules = () => {
    const { user_id, course_id } = useParams(); // useParams inside the component


    // Memoize the loadModules function
    const loadModules = useCallback(async () => {
        console.log(course_id);
        
        try {
            const response = await axios.get(`/courses/${course_id}/modules`, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            });
            console.log("response: ", response); // Log the fetched data
        } catch (error) {
            console.error('Error fetching modules:', error);
        }
    }, [course_id]); // Dependency array with course_id

    // Call loadModules once when the component mounts
    useEffect(() => {
        loadModules();
    }, [loadModules]); // Add loadModules as a dependency

    return (
        <div>
            <h1>View the Modules</h1>
        </div>
    );
};

export default ViewtheModules;
