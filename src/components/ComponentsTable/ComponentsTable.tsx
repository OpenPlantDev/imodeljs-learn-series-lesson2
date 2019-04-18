import React from 'react';
import {IComponent} from '../../models/component';

interface IProps {
  components: IComponent[];
}

export const ComponentsTable = (props: IProps) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Class Name</th>
          <th>Tag</th>
          <th>Desc</th>
          <th>Manufacturer</th>
        </tr>
      </thead>
      <tbody>
        {props.components.map((comp) =>
          <tr key={comp.id}>
            <td>{comp.id}</td>
            <td>{comp.className}</td>
            <td>{comp.tag}</td>
            <td>{comp.description}</td>
            <td>{comp.manufacturer}</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
