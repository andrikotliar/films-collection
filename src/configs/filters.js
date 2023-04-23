import { getYears } from "@/heplers";

export const filtersConfig = [
  {
    type: "standard",
    title: "Type",
    property: "type",
    options: ["Film", "Animation", "Series"]
  },
  {
    type: "standard",
    title: "Genres",
    property: "genres",
    options: ["Sci-Fi", "Adventures", "Action", "Fantasy", "Drama", "Comedy", "Crime", "Romance", "Thriller"]
  },
  {
    type: "modal",
    title: "Year",
    property: "year",
    options: getYears(),
    defaultOptionTitle: "All years"
  },
  {
    type: "standard",
    title: "Country",
    property: "countries",
    options: ['USA', 'UK', 'Canada', 'France', 'Germany', 'Japan']
  },
  {
    type: "standard",
    title: "Studio",
    property: "production",
    options: ['Walt Disney Pictures', 'Disney+', 'Pixar Animation', 'Netflix', '20th Century FOX', 'Lionsgate', 'Warner Bros. Pictures', 'HBO Max', 'DreamWorks Pictures', 'Lucasfilm', 'Legendary', 'Columbia Pictures', 'Amblin Entertainment', 'DreamWorks Animation', 'EuropaCorp', 'Metro-Goldwyn-Mayer', 'Summit Entertainment']
  }
]