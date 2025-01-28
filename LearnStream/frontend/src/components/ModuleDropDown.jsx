import React from "react";
import { Dropdown } from "flowbite-react";

const ModuleDropdown = () => {
  return (
    <Dropdown label="Module Name" data-oid="21v6dgo">
      <Dropdown.Item data-oid="klkq11.">Lecture 1</Dropdown.Item>
      <Dropdown.Item data-oid="d_qg3g1">Lecture 2</Dropdown.Item>
      <Dropdown.Item data-oid="uhh46ko">Reading Material</Dropdown.Item>
      <Dropdown.Item data-oid="v0lg1:3">Graded Assessment</Dropdown.Item>
    </Dropdown>
  );
};

export default ModuleDropdown;
