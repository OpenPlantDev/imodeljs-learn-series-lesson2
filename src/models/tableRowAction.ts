import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface ITableRowAction {
  action: (item: any) => void;
  icon: IconDefinition;
}
