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
    options: ['Walt Disney Pictures', 'Disney Plus', 'Pixar Animation', 'Netflix', '20th Century FOX', 'Lionsgate', 'Warner Bros. Pictures', 'HBO Max', 'DreamWorks Pictures', 'Lucasfilm', 'Legendary', 'Columbia Pictures', 'Amblin Entertainment', 'DreamWorks Animation', 'EuropaCorp', 'Metro-Goldwyn-Mayer', 'Summit Entertainment'],
  },
  {
    type: 'standard',
    title: 'Collections',
    property: 'collections',
    options: ['Space', 'Future', 'Fantasy', 'Robots', 'Legends', 'Invasion', 'Cars', 'Dystopia', 'Mysteries of the Past', 'True Story', 'Superheroes', 'Agents and Detectives', 'Monsters', 'Anime', 'Disaster', 'Martial Arts', 'Based on Real Events'],
    radio: true
  },
  {
    type: 'standard',
    title: 'Cinematic Universes',
    property: 'collections',
    options: ['Marvel Cinematic Universe', 'Star Wars Universe', 'DC Extended Universe', 'Harry Potter Universe', 'Middle-Earth Universe'],
    radio: true
  },
  {
    type: 'standard',
    title: 'Tops',
    property: 'collections',
    options: ['Top 10'],
    radio: true
  }
]