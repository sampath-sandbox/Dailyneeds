import { Item, Suggestion } from '../models';
import ItemsApiService from '../services/ItemsApiService';

class ItemRepository {
  async getItems(): Promise<Item[]> {
    return await ItemsApiService.getItems();
  }

  async getSuggestions(): Promise<Suggestion[]> {
    return await ItemsApiService.getSuggestions();
  }

  async getItemById(id: string): Promise<Item> {
    return await ItemsApiService.getItemById(id);
  }

  async searchItems(query: string): Promise<Item[]> {
    return await ItemsApiService.searchItems(query);
  }
}

export default new ItemRepository();