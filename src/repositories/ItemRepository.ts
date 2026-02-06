import { Item, Suggestion } from '../models';
import ItemsApiService from '../services/ItemsApiService';

class ItemRepository {
  async getItems(): Promise<Item[]> {
    console.log('ItemRepository.getItems() called');
    const result = await ItemsApiService.getItems();
    console.log('ItemRepository.getItems() result:', result);
    return result;
  }

  async getSuggestions(): Promise<Suggestion[]> {
    debugger;
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