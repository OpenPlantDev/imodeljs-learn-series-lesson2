import {IComponent} from '../models/component';
import {IWbsItem} from '../models/wbsItem';

export class DataService {

  apiUrl: string;
  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  async api<T>(resource: string): Promise<T> {
    const url = `${this.apiUrl}/api/${resource}`;
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        return data as T;
      } else {
        const data = await response.json();
        throw new Error(data.message);
      }
    } catch (err) {
      throw err;
    }
  }

  fetchComponents = async (): Promise<IComponent[]> => {
    try {
      const components = await this.api<IComponent[]>('components');
      //console.log(components);
      return components;

    } catch (err) {
      //console.log(err.message);
      throw err;
    }
  }

  fetchWbsItems = async (): Promise<IWbsItem[]> => {
    try {
      const wbsItems = await this.api<IWbsItem[]>('wbsItems');
      //console.log(wbsItems);
      return wbsItems;

    } catch (err) {
      //console.log(err.message);
      throw err;
    }
  }

}
