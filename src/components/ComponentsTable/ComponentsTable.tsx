import React from 'react';
import {IComponent} from '../../models/component';
import {ClickableIcon} from '../ClickableIcon/ClickableIcon';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import '../styles/itemsTable.css';

interface IProps {
  components: IComponent[];
  onDelete: (id: string) => void;
}

export const ComponentsTable = (props: IProps) => {
  return (
    <table className="itemsTable">
      <thead>
        <tr>
          <th>Id</th>
          <th>Class Name</th>
          <th>Tag</th>
          <th>Desc</th>
          <th>Manufacturer</th>
          <th>Actions</th>
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
            <td>
              <ClickableIcon onClick={() => props.onDelete(comp.id)} icon={faTrash} />
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
