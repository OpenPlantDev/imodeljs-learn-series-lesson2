import React from 'react';
import {IComponent} from '../../models/component';
import {ITableColumn} from '../../models/tableColumn';
import {ClickableIcon} from '../ClickableIcon/ClickableIcon';
import {faTrash, faEdit} from '@fortawesome/free-solid-svg-icons';
import '../styles/itemsTable.css';
import { ItemsTable } from '../ItemsTable/ItemsTable';
import { ITableRowAction } from '../../models/tableRowAction';

interface IProps {
  components: IComponent[];
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  onAdd: () => void;
}

export const ComponentsTable = (props: IProps) => {

  const colDefs: ITableColumn[] = [
    {header: "Id",           value: (comp: IComponent) => comp.id},
    {header: "Class Name",   value: (comp: IComponent) => comp.className},
    {header: "Tag",          value: (comp: IComponent) => comp.tag},
    {header: "Desc",         value: (comp: IComponent) => comp.description ? comp.description : ''},
    {header: "Manufacturer", value: (comp: IComponent) => comp.manufacturer? comp.manufacturer : ''}
  ];

  const actions: ITableRowAction[] = [
    {action: (item: IComponent) => props.onDelete(item.id), icon: faTrash},
    {action: (item: IComponent) => props.onEdit(item.id), icon: faEdit}
  ];

  return (
      <ItemsTable tableHeader="Components" 
                  columns={colDefs} 
                  items={props.components} 
                  actions={actions} 
                  onAddItem={props.onAdd} />
  );
}
