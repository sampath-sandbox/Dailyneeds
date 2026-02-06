import ApiService from './ApiService';
import { Item, Suggestion } from '../models';
import { mockData } from '../data/mockData';

class ItemsApiService {
  async getItems(): Promise<Item[]> {
    console.log('ItemsApiService.getItems() called');
    try {
      const response = await ApiService.get<{ data: Item[] }>('/items');
      console.log('API response:', response);
      return response.data || [];
    } catch (error) {
      console.log('API not available, using mock data for items');
      console.log('Mock items:', mockData.items);
      return mockData.items;
    }
  }

  async getItemById(id: string): Promise<Item> {
    try {
      const response = await ApiService.get<{ data: Item }>(`/items/${id}`);
      return response.data;
    } catch (error) {
      console.log('API not available, using mock data');
      const item = mockData.items.find(i => i.id === id);
      if (!item) throw new Error('Item not found');
      return item;
    }
  }

  async getSuggestions(): Promise<Suggestion[]> {
    debugger;
    try {
      const response = await ApiService.get<{ data: Suggestion[] }>('/Items/suggestions');
      debugger;
      return response.data || [];
    } catch (error) {
      console.log('API not available, using mock data');
      return mockData.suggestions;
    }
  }

  async searchItems(query: string): Promise<Item[]> {
    try {
      const response = await ApiService.get<{ data: Item[] }>(`/items/search?q=${query}`);
      return response.data;
    } catch (error) {
      return mockData.items.filter(item => 
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.brand.toLowerCase().includes(query.toLowerCase())
      );
    }
  }

  async getItemsByCategory(category: string): Promise<Item[]> {
    try {
      const response = await ApiService.get<{ data: Item[] }>(`/items/category/${category}`);
      return response.data;
    } catch (error) {
      // Mock category filtering
      return mockData.items.filter(item => 
        item.name.toLowerCase().includes(category.toLowerCase())
      );
    }
  }
}

export default new ItemsApiService();