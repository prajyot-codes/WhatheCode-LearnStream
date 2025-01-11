import React from 'react';
import { useParams } from 'react-router-dom';

const Teachers = () => {
  const { user_id } = useParams();

  return (
    <div>
      {/* Teacher's Welcome Section */}
      <section>
        <h1>Welcome Teacher {user_id}, you are logged in!</h1>
      </section>
    </div>
  );
};

export default Teachers;
