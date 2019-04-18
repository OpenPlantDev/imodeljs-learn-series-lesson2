import React from 'react';
import {IWbsItem} from '../../models/wbsItem';

interface IProps {
  items: IWbsItem[];
}

export const WbsItemsTable = (props: IProps) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Class Name</th>
          <th>Tag</th>
          <th>Desc</th>
        </tr>
      </thead>
      <tbody>
        {props.items.map((item) =>
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.className}</td>
            <td>{item.tag}</td>
            <td>{item.description}</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
