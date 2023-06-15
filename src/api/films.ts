import { api } from "@/services";
import { FilmType } from "@/types";

export class FilmAPI {
  static async getAll() {
    const response = await api.get<FilmType[]>('/database/database.json');
    return response.data;
  }
}