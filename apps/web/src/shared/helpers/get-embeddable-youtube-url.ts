type ValidationResult =
  | {
      status: 'ok';
      value: URL;
    }
  | {
      status: 'error';
      value: null;
      message: string;
    };

export type EmbeddableYoutubeUrlResult = {
  value: string;
  preview: string;
  message?: string;
};

const YOUTUBE_DOMAIN_REGEX = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)$/;
const EMBEDDABLE_URL_PREFIX = 'https://www.youtube-nocookie.com/embed';
const YOUTUBE_VIDEO_BASE_URL = 'https://img.youtube.com/vi';
const VIDEO_IMAGE = 'default.jpg';

type EmbeddableUrlQueryParams = Record<string, string>;

const getValidatedUrl = (value: string): ValidationResult => {
  try {
    const url = new URL(value);

    const isYoutubeDomain = YOUTUBE_DOMAIN_REGEX.test(url.host);

    if (!isYoutubeDomain) {
      return {
        status: 'error',
        value: null,
        message:
          'The URL is not the correct youtube link, it should contain youtube.com or youtu.be',
      };
    }

    return {
      status: 'ok',
      value: url,
    };
  } catch (error: any) {
    return {
      status: 'error',
      value: null,
      message: error?.message,
    };
  }
};

const extractVideoId = (url: URL) => {
  const videoIdQuery = url.searchParams.get('v');

  if (videoIdQuery?.length) {
    return videoIdQuery;
  }

  const pathname = url.pathname;

  if (!pathname || pathname.endsWith('watch')) {
    return '';
  }

  return pathname;
};

const getUrlWithVideoId = (videoId: string) => {
  return `${EMBEDDABLE_URL_PREFIX}/${videoId.replace('/', '')}`;
};

const getPreviewUrl = (videoId: string) => {
  return `${YOUTUBE_VIDEO_BASE_URL}/${videoId}/${VIDEO_IMAGE}`;
};

export const getEmbeddableYoutubeUrl = (
  value: string,
  queryParams?: EmbeddableUrlQueryParams,
): EmbeddableYoutubeUrlResult => {
  const validation = getValidatedUrl(value);

  if (validation.status === 'error') {
    return {
      value: '',
      preview: '',
      message: validation.message,
    };
  }

  const videoId = extractVideoId(validation.value);

  const resultUrl = getUrlWithVideoId(videoId);
  const preview = getPreviewUrl(videoId);

  if (!queryParams) {
    return {
      value: resultUrl,
      preview,
    };
  }

  const searchParams = new URLSearchParams(queryParams);
  const searchParamsString = searchParams.toString();

  return {
    value: `${resultUrl}?${searchParamsString}`,
    preview,
  };
};
