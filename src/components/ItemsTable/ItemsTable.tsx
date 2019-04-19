import React from 'react';
import {ITableColumn} from '../../models/tableColumn';
import { ITableRowAction } from '../../models/tableRowAction';
import { ClickableIcon } from '../ClickableIcon/ClickableIcon';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

interface IProps {
  items: any[];
  tableHeader: string;
  columns: ITableColumn[];
  actions: ITableRowAction[];
  onAddItem: () => void;
}

export const ItemsTable = (props: IProps) => {

  return (
    <div>
      <table className="itemsTable">
        <thead>
          <tr className="itemsTableHeader">
            <th colSpan={props.columns.length}>{props.tableHeader}</th>
            <th><ClickableIcon onClick={props.onAddItem} 
                                 icon={faPlus} />
            </th>
          </tr>
          <tr>
            {props.columns.map((col, index) =>
              <th key={index}>{col.header}</th>
            )}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.items.map((item, index) => 
            <tr key={index}>
            {props.columns.map((col, index) =>
                <td key={index}>{col.value(item)}</td>
            )}
              <td>
                {props.actions.map((action, index) =>
                  <ClickableIcon key={index} 
                                 onClick={() => action.action(item)} 
                                 icon={action.icon} />
                )}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>

  );

}