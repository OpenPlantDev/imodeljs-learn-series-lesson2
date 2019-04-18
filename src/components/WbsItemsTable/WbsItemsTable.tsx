import React from 'react';
import {IWbsItem} from '../../models/wbsItem';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {ClickableIcon} from '../ClickableIcon/ClickableIcon';

interface IProps {
  items: IWbsItem[];
  onDelete: (id: string) => void;
}

export const WbsItemsTable = (props: IProps) => {
  return (
    <table className="itemsTable">
      <thead>
        <tr>
          <th>Id</th>
          <th>Class Name</th>
          <th>Tag</th>
          <th>Desc</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {props.items.map((item) =>
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.className}</td>
            <td>{item.tag}</td>
            <td>{item.description}</td>
            <td>
              <ClickableIcon onClick={() => props.onDelete(item.id)} icon={faTrash} />
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
