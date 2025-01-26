import React from 'react';
import { Dropdown } from 'flowbite-react';

const ModuleDropdown = () => {
  return (
    <Dropdown label="Module Name">
      <Dropdown.Item>
        Lecture 1
      </Dropdown.Item>
      <Dropdown.Item>
        Lecture 2
      </Dropdown.Item>
      <Dropdown.Item>
        Reading Material
      </Dropdown.Item>
      <Dropdown.Item>
        Graded Assessment
      </Dropdown.Item>
    </Dropdown>
  );
};

export default ModuleDropdown;