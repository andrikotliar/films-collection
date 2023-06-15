import { api } from "@/services";
import { FilmData } from "@/types";

export class FilmAPI {
  static async getAll() {
    const response = await api.get<FilmData[]>('/database/database.json');
    return response.data;
  }
}