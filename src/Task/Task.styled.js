import styled from "styled-components";

export const TaskWrapper = styled.li`
  margin: 8px;
  padding: 8px;
  border: 1px solid brown;
  border-radius: 4px;
  background-color: antiquewhite;
  & p {
    margin: 0;
  }
`;

export const TaskTitle = styled.h3`
margin: 0;
`;