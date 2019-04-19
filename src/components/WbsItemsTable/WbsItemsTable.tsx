import React from 'react';
import { IWbsItem } from '../../models/wbsItem';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { ItemsTable } from '../ItemsTable/ItemsTable';
import { ITableRowAction } from '../../models/tableRowAction';
import { ITableColumn } from '../../models/tableColumn';

interface IProps {
  items: IWbsItem[];
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  onAdd: () => void;
}


export const WbsItemsTable = (props: IProps) => {
  const colDefs: ITableColumn[] = [
    { header: "Id", value: (item: IWbsItem) => item.id },
    { header: "Class", value: (item: IWbsItem) => item.className },
    { header: "Tag", value: (item: IWbsItem) => item.tag },
    { header: "Desc", value: (item: IWbsItem) => item.description ? item.description : '' },
  ];

  const actions: ITableRowAction[] = [
    { action: (item: IWbsItem) => props.onDelete(item.id), icon: faTrash },
    { action: (item: IWbsItem) => props.onEdit(item.id), icon: faEdit }
  ];

  return (
    <ItemsTable tableHeader="WBS Items"
      columns={colDefs}
      items={props.items}
      actions={actions}
      onAddItem={props.onAdd} />
  );

}
