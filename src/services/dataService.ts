import {ApiError} from '../models/apiError';
import {IComponent} from '../models/component';
import {IWbsItem} from '../models/wbsItem';
import { async } from 'q';

export class DataService {

  apiUrl: string;
  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  createUrl = (resourceName: string, id?: string): string => {
    let url =  `${this.apiUrl}/api/${resourceName}`;
    if(id) {
      url = `${url}/${id}`;
    }
    return url;
  
  }
  
  
  async api<T>(url: string, options: any = {}): Promise<T | ApiError> {
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok) {
        return data as T;
      } else {
        return new ApiError(response.status, data.message);
      }
    } catch (err) {
      return new ApiError(500, err.message);
    }
  }

  async fetchItems<T>(url: string, options: any = {}): Promise<T | ApiError> {
    try {
      const result = await this.api<T>(url, options);
      return result;

    } catch (err) {
      return new ApiError(500, err.message);
    }
  }

  fetchComponents = async (): Promise<IComponent[] | ApiError> => {
    const url = this.createUrl('components');
    return this.fetchItems<IComponent[]>(url);
  }

  deleteComponent = async (id: string) => {
    const url = this.createUrl('components', id);
    return this.fetchItems<boolean>(url, {method: 'DELETE'});
  }


  fetchWbsItems = async (): Promise<IWbsItem[] | ApiError> => {
    const url = this.createUrl('wbsItems');
    return this.fetchItems<IWbsItem[]>(url);
  }

  deleteWbsItem = async (id: string) => {
    const url = this.createUrl('wbsItems', id);
    const options = {
      method: 'DELETE'
    };

    
    return this.fetchItems<boolean>(url,options);
  }

}
