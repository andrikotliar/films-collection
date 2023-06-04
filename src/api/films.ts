import { api } from "@/services";
import { GeneralFilm } from "@/types";

export class FilmAPI {
  static async getAll() {
    const response = await api.get<GeneralFilm[]>('/database/database.json');
    return response.data;
  }
}