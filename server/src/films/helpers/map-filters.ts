import { RootFilterQuery } from 'mongoose';
import { DbQueryFilter, FindAllFilters } from '../types';

const getArrayFilter = (values: string[]) => {
  return {
    $in: values,
  };
};

const mapFilters = (plainFilters: Partial<FindAllFilters>) => {
  const {
    genres,
    collection,
    studios,
    countries,
    type,
    startDate,
    endDate,
    watchCount,
    rating,
    seasonsTotal,
    episodesTotal,
    duration,
    personName,
    personRole,
    actorId,
    awards,
    style,
  } = plainFilters;

  const filters: RootFilterQuery<DbQueryFilter> = {};

  if (startDate || endDate) {
    filters.releaseDate = {
      $gte: startDate,
      $lte: endDate,
    };
  }

  if (type) {
    filters.type = type;
  }

  if (style) {
    filters.style = style;
  }

  if (genres) {
    filters.genres = getArrayFilter(genres);
  }

  if (studios) {
    filters.studios = getArrayFilter(studios);
  }

  if (countries) {
    filters.countries = getArrayFilter(countries);
  }

  if (collection) {
    filters['collections.key'] = collection;
  }

  if (watchCount) {
    filters.watchCount = watchCount;
  }

  if (rating) {
    filters.rating = rating;
  }

  if (duration) {
    filters.duration = duration;
  }

  if (seasonsTotal) {
    filters['seriesExtension.seasons'] = {
      $size: seasonsTotal,
    };
  }

  if (episodesTotal) {
    filters['seriesExtension.episodesTotal'] = episodesTotal;
  }

  if (personRole && personName) {
    filters['crew.role'] = personRole;
    filters['crew.people.name'] = personName;
  }

  if (actorId) {
    filters['cast.actor'] = actorId;
  }

  if (awards) {
    filters['awards.awardKey'] = getArrayFilter(awards);
  }

  return filters;
};

export { mapFilters };
