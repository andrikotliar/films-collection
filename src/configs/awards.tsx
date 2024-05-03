import { NominationCategory } from '@/common/enums';
import { Icons } from '@/components';
import { ReactNode, SVGAttributes } from 'react';

type AwardsConfig = {
  [awardId: string]: {
    title: string;
    icon: ReactNode;
    nominations: {
      [nominationId: string]: {
        title: string;
        category: NominationCategory;
      };
    };
  };
};

type ConfigOptions = {
  size: number;
};
type GetAwardsConfig = (iconProps?: Partial<ConfigOptions>) => AwardsConfig;

const getAwardsConfig: GetAwardsConfig = (iconProps) => ({
  '9d7f2aa9-d2c7-4cba-b868-5266c859b4c2': {
    title: 'Oscar',
    icon: <Icons icon="oscarAward" {...iconProps} />,
    nominations: {
      'ca03f1f4-dade-4358-8dc6-0dd2493be0cc': {
        title: 'Best Achievement in Art Direction',
        category: NominationCategory.ART_DIRECTION,
      },
      'd39a99f8-9730-4e7f-8da8-d61ce0af0858': {
        title: 'Best Achievement in Cinematography',
        category: NominationCategory.CINEMATOGRAPHY,
      },
      '0db53dc9-86d9-41f0-9a9b-7701c0ff5b49': {
        title: 'Best Achievement in Costume Design',
        category: NominationCategory.COSTUMES,
      },
      '26f64552-2c83-48f4-b19e-a8487ef3b46f': {
        title: 'Best Achievement in Makeup',
        category: NominationCategory.MAKE_UP,
      },
      '83a03821-a59c-4603-983e-6b989cc2c2e3': {
        title: 'Best Achievement in Makeup and Hairstyling',
        category: NominationCategory.MAKE_UP,
      },
      '30d4820a-b28d-4b59-b182-3c7a28562168': {
        title:
          'Best Achievement in Music Written for Motion Pictures (Original Score)',
        category: NominationCategory.MUSIC,
      },
      '34e5df6f-3fce-4311-9a31-9e710a9508c9': {
        title: 'Best Achievement in Production Design',
        category: NominationCategory.PRODUCTION_DESIGN,
      },
      'ac85bc32-bfab-4362-9557-dd089f7a0ec5': {
        title: 'Best Achievement in Sound Editing',
        category: NominationCategory.SOUND_EFFECTS,
      },
      '34c7b8f1-0115-4099-99ec-1f13cfbe0fa3': {
        title: 'Best Achievement in Sound Mixing',
        category: NominationCategory.SOUND_EFFECTS,
      },
      'a6b1a904-f461-4360-aecc-9cd91d7d537a': {
        title: 'Best Achievement in Visual Effects',
        category: NominationCategory.VISUAL_EFFECTS,
      },
      '5d1bb57f-cea1-4c41-81e7-fad3c6b9a7ea': {
        title: 'Best Animated Feature',
        category: NominationCategory.BEST_MOVIE,
      },
      '17cc846a-59f4-475a-8f2f-3c8988cf2ad0': {
        title: 'Best Art Direction-Set Decoration',
        category: NominationCategory.ART_DIRECTION,
      },
      '12aa25ba-0a5b-4288-8bcc-8ed417b5b50f': {
        title: 'Best Cinematography',
        category: NominationCategory.CINEMATOGRAPHY,
      },
      'e228fed5-d3cc-4ba6-ac4a-e4bbcf4d17cb': {
        title: 'Best Costume Design',
        category: NominationCategory.COSTUMES,
      },
      '710da6af-dc6a-4619-9d70-587b6a18d5b8': {
        title: 'Best Director',
        category: NominationCategory.DIRECTOR,
      },
      '39fc2c0f-e6b0-4c24-a558-792a67b8536b': {
        title: 'Best Effects, Sound Effects Editing',
        category: NominationCategory.SOUND_EFFECTS,
      },
      '38a477dc-4708-46b2-a96f-c39f7ec9af0b': {
        title: 'Best Effects, Visual Effects',
        category: NominationCategory.VISUAL_EFFECTS,
      },
      '6aa195b9-f874-42d9-aa00-9675923b2125': {
        title: 'Best Film Editing',
        category: NominationCategory.EDITING,
      },
      '0c8ce350-1ddc-43e7-b423-3099e13284a0': {
        title: 'Best Make-up',
        category: NominationCategory.MAKE_UP,
      },
      'e6962ab2-e7ab-4c69-8fc0-b1cae01a7036': {
        title: 'Best Music',
        category: NominationCategory.MUSIC,
      },
      'c2ddefe1-8b1f-4222-bd82-95ef2460545c': {
        title: 'Best Music (Original Dramatic Score)',
        category: NominationCategory.MUSIC,
      },
      '23be7816-fd21-426d-8178-72ade1967b6a': {
        title: 'Best Music (Original Score)',
        category: NominationCategory.MUSIC,
      },
      '862e14de-43a1-47f5-876d-6d2ea5970bee': {
        title: 'Best Music (Original Song)',
        category: NominationCategory.MUSIC,
      },
      'bca74c1f-f46a-4f82-bfab-f5f042b1b664': {
        title: 'Best Performance by an Actor in a Supporting Role',
        category: NominationCategory.CAST,
      },
      '0bf39901-4ed1-48da-b081-97671bf08dd7': {
        title: 'Best Picture',
        category: NominationCategory.BEST_MOVIE,
      },
      '5bc47561-63bd-455c-8c3d-9f9ced87e923': {
        title: 'Best Sound',
        category: NominationCategory.SOUND_EFFECTS,
      },
      'a6e431ba-5968-40c0-b626-a32b63418733': {
        title: 'Best Sound Editing',
        category: NominationCategory.SOUND_EFFECTS,
      },
      'be727846-3c6e-4539-8962-2c3539ea9ff1': {
        title: 'Best Sound Effects Editing',
        category: NominationCategory.SOUND_EFFECTS,
      },
      '62ffbd2c-4189-4aa6-83a8-3c42bd244c2d': {
        title: 'Best Sound Mixing',
        category: NominationCategory.SOUND_EFFECTS,
      },
      'c346a523-3bf3-4f58-98e3-599206560b12': {
        title: 'Best Visual Effects',
        category: NominationCategory.VISUAL_EFFECTS,
      },
      '06aa2817-8307-4d48-aa42-9fcb66be0fdb': {
        title: 'Best Writing, Adapted Screenplay',
        category: NominationCategory.SCREENPLAY,
      },
    },
  },
  'ae6f2bdf-42ac-4c5d-9744-881198ac1a1d': {
    title: 'Golden Globe',
    icon: <Icons icon="goldenGlobeAward" {...iconProps} />,
    nominations: {
      '3a67bd92-4965-45de-b539-6a1de187c488': {
        title: 'Best Animated Film',
        category: NominationCategory.BEST_MOVIE,
      },
      '2654065c-16c7-426c-9dde-871e2e2be33a': {
        title: 'Best Director - Motion Picture',
        category: NominationCategory.DIRECTOR,
      },
      'cf903aa7-6778-43fb-bd91-b3ce3e18cac7': {
        title: 'Best Motion Picture - Comedy or Musical',
        category: NominationCategory.GENRE,
      },
      '1f4a5da9-689e-4ff5-8100-497bf998787f': {
        title: 'Best Motion Picture - Drama',
        category: NominationCategory.GENRE,
      },
      '67fd465d-1da6-4a38-9e7f-f6b4758e2b3a': {
        title: 'Best Original Score - Motion Picture',
        category: NominationCategory.BEST_MOVIE,
      },
      '100ca2e6-3187-4ef9-af81-7c4791455781': {
        title: 'Best Original Song - Motion Picture',
        category: NominationCategory.MUSIC,
      },
      'a66ffaa4-57c6-48f1-bbe8-df9ef2d6d29c': {
        title:
          'Best Performance by an Actor in a Motion Picture - Comedy or Musical',
        category: NominationCategory.CAST,
      },
      '749bb15b-c750-4ba6-ae1e-3ca8d59d38bb': {
        title:
          'Best Performance by an Actress in a Limited Series, Anthology Series or a Motion Picture Made for Television',
        category: NominationCategory.CAST,
      },
      'd3f9ce2c-d7ee-46af-89a6-72cac4931b83': {
        title:
          'Best Television Limited Series, Anthology Series or Motion Picture Made for Television',
        category: NominationCategory.BEST_MOVIE,
      },
    },
  },
  '676e9dff-a89d-48af-9063-009b246fff13': {
    title: 'Critics Choice',
    icon: <Icons icon="criticsChoiceAward" {...iconProps} />,
    nominations: {
      '522ed3e9-6c70-494a-b926-b5729a885dd8': {
        title: 'Best Acting Ensemble',
        category: NominationCategory.CAST,
      },
      '53f51093-e194-40d8-94b4-28908cb6a14c': {
        title: 'Best Action Movie',
        category: NominationCategory.GENRE,
      },
      '6bd9defb-5179-43e3-be13-f02b2cb2ede0': {
        title:
          'Best Actress in a Limited Series or a Movie Made for Television',
        category: NominationCategory.CAST,
      },
      'b852d024-3f3d-4182-8905-7853a11e3073': {
        title: 'Best Actress in an Action Movie',
        category: NominationCategory.CAST,
      },
      '492bd6f2-1108-41c7-9fa9-4fd7f634c408': {
        title: 'Best Animated Feature',
        category: NominationCategory.BEST_MOVIE,
      },
      '74b1f9bc-fb1b-4520-9611-c99c1b83d336': {
        title: 'Best Art Direction',
        category: NominationCategory.ART_DIRECTION,
      },
      '29776f60-18dc-4f87-b67d-ce014b40dca7': {
        title: 'Best Cinematography',
        category: NominationCategory.CINEMATOGRAPHY,
      },
      'dfe3aaa5-4b86-49d4-b690-34ffbea590a0': {
        title: 'Best Composer',
        category: NominationCategory.MUSIC,
      },
      '4bcfc61a-78da-437b-a7e6-477060220c46': {
        title: 'Best Costume Design',
        category: NominationCategory.COSTUMES,
      },
      '111c6946-f2d3-4619-adab-f5a68d272890': {
        title: 'Best Digital Acting Performance',
        category: NominationCategory.VIRTUAL_PERFORMANCE,
      },
      '180f76b8-bdb9-4536-91c0-0d8fe887b0b3': {
        title: 'Best Director',
        category: NominationCategory.DIRECTOR,
      },
      'e3315655-dd72-45ea-b678-99c733428907': {
        title: 'Best Editing',
        category: NominationCategory.EDITING,
      },
      '1aab9cd6-3a4f-4c34-9394-b4ff3b1854ff': {
        title: 'Best Family Film - Live Action',
        category: NominationCategory.GENRE,
      },
      '66405be9-0573-45e1-b5fc-c80161d86500': {
        title: 'Best Hair & Makeup',
        category: NominationCategory.MAKE_UP,
      },
      '60849ea9-442f-4873-8ede-82d86114be48': {
        title: 'Best Limited Series',
        category: NominationCategory.BEST_MOVIE,
      },
      '45736875-bb5d-429c-afbd-a60ada41c58b': {
        title: 'Best Picture',
        category: NominationCategory.BEST_MOVIE,
      },
      'f16da86c-96df-4e39-a8a6-0ece4422409a': {
        title: 'Best Production Design',
        category: NominationCategory.PRODUCTION_DESIGN,
      },
      'e2b9afe6-c274-4cc0-8ca8-5738a3a6d46a': {
        title: 'Best Sci-Fi/Horror Movie',
        category: NominationCategory.GENRE,
      },
      '6cbb6fbc-9d6a-4a2a-a4ae-e61fa307d8c5': {
        title: 'Best Score',
        category: NominationCategory.MUSIC,
      },
      'a9e2da06-f75b-43c9-a864-bc5bc8dbbdd1': {
        title: 'Best Song',
        category: NominationCategory.MUSIC,
      },
      '7bfe511a-a03e-4b99-aa6c-fff51052aea5': {
        title: 'Best Sound',
        category: NominationCategory.SOUND_EFFECTS,
      },
      'a9645c27-dbf0-401d-b637-09703c44e217': {
        title: 'Best Supporting Actor',
        category: NominationCategory.CAST,
      },
      'bdb7a047-42e4-44a9-9122-ec8d1c38c769': {
        title: 'Best Supporting Actor in a Drama Series',
        category: NominationCategory.CAST,
      },
      '16e427a6-c3e9-40ba-9218-923d3e12e702': {
        title:
          'Best Supporting Actor in a Limited Series or Movie Made for Television',
        category: NominationCategory.CAST,
      },
      '1dbbd79f-d824-4e8e-83c4-bda38adc45f9': {
        title: 'Best Visual Effects',
        category: NominationCategory.VISUAL_EFFECTS,
      },
      '8cb10314-9a85-4429-8da5-3125da3d68b5': {
        title: 'Best Young Actress',
        category: NominationCategory.CAST,
      },
      'bf2b625b-bb36-4e71-b853-0662f482e5fb': {
        title: 'Favorite Film Franchise',
        category: NominationCategory.FAVORITE_FRANCHISE,
      },
    },
  },
  '59b42575-c175-4447-95fc-6ba79e2456c2': {
    title: 'BAFTA',
    icon: <Icons icon="baftaAward" {...iconProps} />,
    nominations: {
      'b6836a56-a68b-4b87-b609-71ebd8c50628': {
        title: 'Best Achievement in Special Visual Effects',
        category: NominationCategory.SPECIAL_EFFECTS,
      },
      '02af1954-1c3e-474e-8368-e31fe6220a70': {
        title: 'Best Animated Feature Film',
        category: NominationCategory.BEST_MOVIE,
      },
      'f89218a9-2b2a-412f-9092-e02f58564999': {
        title: 'Best Animated Film',
        category: NominationCategory.BEST_MOVIE,
      },
      'de9886fe-9742-411d-b14a-1c494f8408b0': {
        title: 'Best Cinematography',
        category: NominationCategory.CINEMATOGRAPHY,
      },
      '90674ec1-5025-4c2f-aea2-4140975f1b22': {
        title: 'Best Costume Design',
        category: NominationCategory.COSTUMES,
      },
      'e52213d9-bc00-447b-aba9-0b7f7dc4e096': {
        title: 'Best Editing',
        category: NominationCategory.EDITING,
      },
      '37d6c9f0-b11c-446f-92ee-e369d76910ee': {
        title: 'Best Feature Film',
        category: NominationCategory.BEST_MOVIE,
      },
      'bc675d2e-557b-447d-b81f-690913a0d5aa': {
        title: 'Best Film',
        category: NominationCategory.BEST_MOVIE,
      },
      'cc7ff5ce-dc99-4af9-b0c5-1948bd755ced': {
        title: 'Best International',
        category: NominationCategory.BEST_MOVIE,
      },
      '49107a05-62b8-41da-93e6-98fb6423885d': {
        title: 'Best Make Up/Hair',
        category: NominationCategory.MAKE_UP,
      },
      'bb69a340-0754-4a75-943a-75dbeb2257fd': {
        title: 'Best Production Design',
        category: NominationCategory.PRODUCTION_DESIGN,
      },
      '715d62df-b930-478d-8b3d-e9de89c1c94b': {
        title: 'Best Production Design/Art Direction',
        category: NominationCategory.PRODUCTION_DESIGN,
      },
      'ed971f9e-203f-4eeb-b3bf-4757d0b88346': {
        title: 'Best Screenplay - Adapted',
        category: NominationCategory.SCREENPLAY,
      },
      'fc19047a-84fa-4ddc-ab69-d69aec8aba25': {
        title: 'Best Sound',
        category: NominationCategory.SOUND_EFFECTS,
      },
      '6e4269f9-99ad-4163-8910-6a96da2b2dd3': {
        title: 'Best Sound Track',
        category: NominationCategory.SOUND_EFFECTS,
      },
      '949cb1a5-cb95-48e5-915b-aa95e255232d': {
        title: 'Best Special Effects',
        category: NominationCategory.SPECIAL_EFFECTS,
      },
      'f7bd10f5-4137-4601-8c89-d9ccc58fe6a3': {
        title: 'Best Special Visual Effects',
        category: NominationCategory.SPECIAL_EFFECTS,
      },
      '249fd8a4-59fe-4475-845f-4b49ed94ee76': {
        title: 'Best Supporting Actor',
        category: NominationCategory.CAST,
      },
      '7f4509ac-d84c-4a24-9212-25deae15c217': {
        title: 'Leading Actor',
        category: NominationCategory.CAST,
      },
      '2708284c-d135-4df4-acae-2172ef6e8b6b': {
        title: 'Mini-Series',
        category: NominationCategory.MINI_SERIES,
      },
      'f74102be-c077-4834-99da-c1d2787ea924': {
        title: 'Supporting Actor',
        category: NominationCategory.CAST,
      },
    },
  },
  'a50aca24-8229-41cf-a01a-b38741e73145': {
    title: 'Saturn',
    icon: <Icons icon="saturnAward" {...iconProps} />,
    nominations: {
      'ff7b106c-5ac3-4fe2-85d0-3449b0f7e753': {
        title: 'Best Action/Adventure Film',
        category: NominationCategory.GENRE,
      },
      '45a24e7b-3b27-45db-ada4-98608e63ac57': {
        title: 'Best Action/Adventure/Thriller Film',
        category: NominationCategory.GENRE,
      },
      'bf2b54f8-c631-484c-b4a5-3f784f2f7e45': {
        title: 'Best Actor',
        category: NominationCategory.CAST,
      },
      '66954688-228a-4288-b89a-af7fb4b3f890': {
        title: 'Best Actress',
        category: NominationCategory.CAST,
      },
      '15d0cdb6-94fc-450f-beb1-9d3c3246b828': {
        title: 'Best Animated Film',
        category: NominationCategory.BEST_MOVIE,
      },
      'f7a0a071-9da5-4baa-a192-931f60b7d2bf': {
        title: 'Best Comic-to-Film Motion Picture',
        category: NominationCategory.ADAPTATION,
      },
      '3da49678-fc01-4143-8b79-f4d8e32a2b44': {
        title: 'Best Costume',
        category: NominationCategory.COSTUMES,
      },
      '5b5861fd-09b2-4984-83b9-70d5722cab24': {
        title: 'Best Costume Design',
        category: NominationCategory.COSTUMES,
      },
      'd35f98cd-6d5a-41c8-b511-9046a59d8828': {
        title: 'Best Costumes',
        category: NominationCategory.COSTUMES,
      },
      '3675ad3d-4694-458d-a396-1e49d7fbc9be': {
        title: 'Best Director',
        category: NominationCategory.DIRECTOR,
      },
      '74ad3ee5-2619-4dd8-a034-d61cb277b764': {
        title: 'Best DVD Collection',
        category: NominationCategory.DVD,
      },
      '835b9846-24c4-4ec3-8543-0cbd322cb2e8': {
        title: 'Best DVD Special Edition',
        category: NominationCategory.DVD,
      },
      '90dce09b-0a64-49aa-8589-1fd1783ad0fe': {
        title: 'Best DVD Special Edition Release',
        category: NominationCategory.DVD,
      },
      'b2b7145c-693f-4618-b68e-113e6aef05e0': {
        title: 'Best DVD/Blu-Ray Special Edition Release',
        category: NominationCategory.DVD,
      },
      '4776a35c-732d-4ca9-a4ff-2d3312cf353f': {
        title: 'Best Editing',
        category: NominationCategory.EDITING,
      },
      '43447644-6efc-4969-b6f8-8cd2d7089fae': {
        title: 'Best Fantasy Film',
        category: NominationCategory.GENRE,
      },
      'ce61910d-0236-4652-9562-4b71956b4d41': {
        title: 'Best Horror Film',
        category: NominationCategory.GENRE,
      },
      'a3c2244b-8c42-49be-96f2-a7d2edf3b8a7': {
        title: 'Best Make-up',
        category: NominationCategory.MAKE_UP,
      },
      'be35075e-d485-4f10-9869-f89d28592465': {
        title: 'Best Music',
        category: NominationCategory.MUSIC,
      },
      '8db5c8bd-ea70-4e58-8637-24287d247615': {
        title: 'Best New Media Television Series',
        category: NominationCategory.BEST_MOVIE,
      },
      'dedc1e3d-4b67-46dd-bfd5-480f7a05d7e6': {
        title: 'Best Performance by a Younger Actor',
        category: NominationCategory.CAST,
      },
      'ac69b30b-8d41-4324-959b-4de0c4351cb2': {
        title: 'Best Performance by a Younger Actor in a Television Series',
        category: NominationCategory.CAST,
      },
      '642af5c7-bc7e-4e5e-874e-05977dc3fccc': {
        title: 'Best Presentation on Television',
        category: NominationCategory.BEST_MOVIE,
      },
      '038bfccf-c5b8-47c9-b285-219c4e5d1efd': {
        title: 'Best Production Design',
        category: NominationCategory.PRODUCTION_DESIGN,
      },
      'a09f029a-61c3-4398-b97d-03dd0ca499c5': {
        title: 'Best Science Fiction Film',
        category: NominationCategory.GENRE,
      },
      '188d8d42-edd8-4d88-abc6-31d5806bff91': {
        title: 'Best Special Effects',
        category: NominationCategory.SPECIAL_EFFECTS,
      },
      'e1a07b16-cd0e-4b48-86d7-49e8e6fe92c0': {
        title: 'Best Streaming Horror & Thriller Series',
        category: NominationCategory.GENRE,
      },
      '783f1222-1b58-4ebe-af1d-4fd018778af6': {
        title: 'Best Supporting Actor',
        category: NominationCategory.CAST,
      },
      'fe65a215-a19f-4382-a43e-c1dd27f8f27e': {
        title: 'Best Supporting Actress',
        category: NominationCategory.CAST,
      },
      'b9ce2496-5d9c-4c45-bd2c-7523193813f9': {
        title: 'Best Supporting Actress in Streaming Presentation',
        category: NominationCategory.CAST,
      },
      'c75dcda3-a68d-41c1-a07a-61ddc9c1064f': {
        title: 'Best Thriller Film',
        category: NominationCategory.GENRE,
      },
      '5aefbcf2-fe77-40b6-b866-fc647c89a400': {
        title: 'Best Writer',
        category: NominationCategory.SCREENPLAY,
      },
      '782745a7-8bff-4c54-993a-09e6187939ea': {
        title: 'Best Writing',
        category: NominationCategory.SCREENPLAY,
      },
      '4f50a3c3-8ddb-45e1-b08e-3171814ed2e2': {
        title: 'Best Youth-Oriented Series on Television',
        category: NominationCategory.BEST_MOVIE,
      },
      '7a57625c-92b7-4bf4-ba60-b2926608626f': {
        title: 'Outstanding Art Direction',
        category: NominationCategory.ART_DIRECTION,
      },
      '39288fdb-88aa-4694-acb8-0bc4c533151f': {
        title: 'Outstanding Editing',
        category: NominationCategory.EDITING,
      },
      '85e948fb-27f5-4e3e-8882-54c72090be98': {
        title: 'Outstanding Set Decoration',
        category: NominationCategory.PRODUCTION_DESIGN,
      },
      '51ee4c95-b7fb-43cc-9a36-c562591b94ba': {
        title: 'Outstanding Sound',
        category: NominationCategory.SOUND_EFFECTS,
      },
    },
  },
  'bee25875-f12e-4dfe-9fc5-f25cdb5d836d': {
    title: 'Primetime Emmy',
    icon: <Icons icon="emmyAward" {...iconProps} />,
    nominations: {
      '8e7ffc12-f5ae-4bbf-972e-9f6c79ec5499': {
        title: 'Outstanding Casting for a Drama Series',
        category: NominationCategory.CASTING,
      },
      '9c2055bb-e38a-4195-9ef2-aacbec910a17': {
        title: 'Outstanding Cinematography for a Limited Series or Movie',
        category: NominationCategory.CINEMATOGRAPHY,
      },
      'a4b1d8eb-c56e-4dae-b90f-80d6ebfcc852': {
        title: 'Outstanding Cinematography for a Miniseries or Movie',
        category: NominationCategory.CINEMATOGRAPHY,
      },
      '920a6e10-6f9e-42b0-af62-dfdb428770ee': {
        title:
          'Outstanding Cinematography for a Single-Camera Series (Half-Hour)',
        category: NominationCategory.CINEMATOGRAPHY,
      },
      '5a0a1af9-4979-4ca7-897f-d79588f652c0': {
        title: 'Outstanding Directing for a Limited Series',
        category: NominationCategory.DIRECTOR,
      },
      '90dc0862-e778-4aef-9a86-3adbd717291e': {
        title: 'Outstanding Individual Achievement in Animation',
        category: NominationCategory.ANIMATION,
      },
      '0ca81c05-5827-4058-a312-2b1952da73eb': {
        title: 'Outstanding Lead Actor in a Miniseries or a Movie',
        category: NominationCategory.CAST,
      },
      'f6a19892-fa05-412d-af05-1b68e1f88955': {
        title: 'Outstanding Limited Series',
        category: NominationCategory.BEST_MOVIE,
      },
      'a95b04f3-ae06-454b-997b-1f7a9a84bb90': {
        title: 'Outstanding Main Title Design',
        category: NominationCategory.PRODUCTION_DESIGN,
      },
      '1c2f618c-4bd8-460b-b351-fb32353181bc': {
        title:
          'Outstanding Music Composition for a Limited Series, Movie or Special (Original Dramatic Score)',
        category: NominationCategory.MUSIC,
      },
      '8d33a402-89d8-4946-98ee-df9743f4ca55': {
        title:
          'Outstanding Music Composition for a Miniseries, Movie or a Special (Original Dramatic Score)',
        category: NominationCategory.MUSIC,
      },
      '8f66fb8c-3a48-453b-8b03-84d7716f3e73': {
        title:
          'Outstanding Music Composition for a Series (Original Dramatic Score)',
        category: NominationCategory.MUSIC,
      },
      '7f461021-e76c-4fe5-8a89-3fecb1992e1b': {
        title: 'Outstanding Music Supervision',
        category: NominationCategory.SOUND_EFFECTS,
      },
      '24a6a674-1e32-464a-a2e3-328d52668bd5': {
        title: 'Outstanding Original Main Title Theme Music',
        category: NominationCategory.SOUND_EFFECTS,
      },
      '73932212-c83c-4a4e-992d-57f603e25eb0': {
        title:
          'Outstanding Production Design for a Narrative Period or Fantasy Program (One Hour or More)',
        category: NominationCategory.PRODUCTION_DESIGN,
      },
      '1e2b2e1e-5c3c-4061-be3c-e717962b1c10': {
        title:
          'Outstanding Production Design for a Narrative Program (Half-Hour)',
        category: NominationCategory.PRODUCTION_DESIGN,
      },
      'dee6e4c3-f3f0-4f29-95be-97053e1cfd59': {
        title: 'Outstanding Prosthetic Makeup',
        category: NominationCategory.MAKE_UP,
      },
      '907c69e6-dc76-47ec-bd50-1a348e60ddc4': {
        title: 'Outstanding Single-Camera Picture Editing for a Drama Series',
        category: NominationCategory.CINEMATOGRAPHY,
      },
      '80f3bba3-c1c9-472f-b2f8-9caf6a82a96a': {
        title:
          'Outstanding Single-Camera Picture Editing for a Limited Series or Movie',
        category: NominationCategory.CINEMATOGRAPHY,
      },
      'dfbde00a-376a-4c66-807b-f3a5a6cc2079': {
        title:
          'Outstanding Single-Camera Picture Editing for a Miniseries or a Movie',
        category: NominationCategory.EDITING,
      },
      '6e6b1254-beb5-48c7-915d-1b534268191d': {
        title:
          'Outstanding Sound Editing for a Comedy or Drama Series (Half-Hour and Animation)',
        category: NominationCategory.SOUND_EFFECTS,
      },
      '14bbeb92-155a-4b95-8191-3520856886b5': {
        title:
          'Outstanding Sound Editing for a Comedy or Drama Series (One Hour)',
        category: NominationCategory.SOUND_EFFECTS,
      },
      'd6801f6b-eefb-45e6-bb5d-9c9f717f2a4b': {
        title:
          'Outstanding Sound Editing for a Limited Series, Movie or Special',
        category: NominationCategory.SOUND_EFFECTS,
      },
      '6fda9634-3a1a-4051-b99a-09d9325218fe': {
        title: 'Outstanding Sound Editing for a Miniseries, Movie or a Special',
        category: NominationCategory.SOUND_EFFECTS,
      },
      '694cdcf7-bef3-4fbb-a477-fce5698b43e9': {
        title: 'Outstanding Sound Editing for a Series',
        category: NominationCategory.SOUND_EFFECTS,
      },
      'e89a6b88-c703-4366-9b2e-a150e53c8252': {
        title:
          'Outstanding Sound Mixing for a Comedy or Drama Series (Half-Hour and Animation)',
        category: NominationCategory.SOUND_EFFECTS,
      },
      'f7aeea61-9f2c-4601-b438-80368c3a2a09': {
        title:
          'Outstanding Sound Mixing for a Comedy or Drama Series (One Hour)',
        category: NominationCategory.SOUND_EFFECTS,
      },
      '860855b4-cce6-43e3-b1af-2c3bd27212fe': {
        title: 'Outstanding Sound Mixing for a Limited Series or Movie',
        category: NominationCategory.SOUND_EFFECTS,
      },
      '798f775a-0eee-422d-8ceb-e32e6dc6a41b': {
        title: 'Outstanding Special Visual Effects',
        category: NominationCategory.VISUAL_EFFECTS,
      },
      'db88438e-db01-461c-b677-ff6bee46a6eb': {
        title: 'Outstanding Special Visual Effects for a Series',
        category: NominationCategory.VISUAL_EFFECTS,
      },
      'b279c08f-d226-44d9-8cd8-dc449cffcc1f': {
        title: 'Outstanding Special Visual Effects in a Supporting Role',
        category: NominationCategory.VISUAL_EFFECTS,
      },
      '453d22b4-2cb1-4487-88a9-246086e7a735': {
        title: 'Outstanding Special Visual Effects in a Supporting Role,',
        category: NominationCategory.VISUAL_EFFECTS,
      },
      'c13289eb-0fcc-4378-9a72-ee780cba0002': {
        title:
          'Outstanding Stunt Coordination for a Drama Series Limited Series or Movie',
        category: NominationCategory.STUNT_COORDINATOR,
      },
      'c57e4f76-f7de-45e8-becd-e29a8f58345a': {
        title:
          'Outstanding Stunt Coordination for a Drama Series, Limited of Anthology Series or Movie',
        category: NominationCategory.STUNT_COORDINATOR,
      },
      'a67a2bd7-5f23-4ec9-b090-491d943d5665': {
        title: 'Outstanding Supporting Actor in a Miniseries or a Movie',
        category: NominationCategory.CAST,
      },
      '66b8f6e1-d00c-4df4-8f47-95e6cbcc6434': {
        title: 'Outstanding Television Movie',
        category: NominationCategory.BEST_MOVIE,
      },
      'c679e169-b25b-425b-80f2-34e2125df54e': {
        title: 'Outstanding Writing for a Limited Series',
        category: NominationCategory.SCREENPLAY,
      },
      '1cbc5a19-a786-4ed7-8865-9e034ac37cda': {
        title: 'Outstanding Writing for a Miniseries or a Dramatic Special',
        category: NominationCategory.SCREENPLAY,
      },
    },
  },
  '7ebe7513-34d1-4e11-8654-0f6390c2c290': {
    title: 'Jupiter',
    icon: <Icons icon="jupiterAward" {...iconProps} />,
    nominations: {
      '452170e4-97c0-43a1-87db-959fd8d9d75c': {
        title: 'Best German TV Actor',
        category: NominationCategory.CAST,
      },
      '8f0cd2b0-fa7e-4898-8e97-1920c9b31616': {
        title: 'Best International Actor',
        category: NominationCategory.CAST,
      },
      'e98acd2a-140e-4b7b-80ee-85cca92e8acd': {
        title: 'Best International Director',
        category: NominationCategory.DIRECTOR,
      },
      '67d69cb3-6401-46f7-8765-4bd74eaba0a0': {
        title: 'Best International Film',
        category: NominationCategory.BEST_MOVIE,
      },
    },
  },
  'c4127f39-85a6-440c-bdcc-8742beb6e2f7': {
    title: 'Annie',
    icon: <Icons icon="annieAward" {...iconProps} />,
    nominations: {
      '5ace8a28-f78b-42ca-896d-32d3efb85f41': {
        title: 'Best Animated Effects',
        category: NominationCategory.ANIMATION,
      },
      '8e18c6b6-524b-467b-8139-dce657a6b352': {
        title: 'Best Animated Feature',
        category: NominationCategory.BEST_MOVIE,
      },
      '2fcb9191-7cae-43bd-ba04-76d0df98f953': {
        title: 'Best Animated Television Production',
        category: NominationCategory.BEST_MOVIE,
      },
      'c8f59cea-39f8-4d08-86fb-b2ae18175c3b': {
        title: 'Best Animated Television Production Produced for Children',
        category: NominationCategory.BEST_MOVIE,
      },
      '0fe4c462-5d45-4bfa-ac96-593996ea5080': {
        title: 'Best Character Animation in a Feature Production',
        category: NominationCategory.ANIMATION,
      },
      '2aac359f-94d4-46aa-9695-6d69a80b460e': {
        title: 'Best Character Animation in a Television Production',
        category: NominationCategory.ANIMATION,
      },
      'dbdc7f25-9f96-4a83-9669-c7dea23946ae': {
        title: 'Best Character Design in an Animated Feature Production',
        category: NominationCategory.ANIMATION,
      },
      'a1cc48e6-5d13-447e-b744-ac5b1e2ac47a': {
        title: 'Best Directing in an Animated Television Production',
        category: NominationCategory.DIRECTOR,
      },
      'fbe7cd6e-c83f-4c33-b80f-d7ad0653c339': {
        title:
          'Best Directing in an Animated Television Production or Short Form',
        category: NominationCategory.DIRECTOR,
      },
      '0c9814a3-c628-4c6c-a17d-0f6e4aa83293': {
        title: 'Best Production Design in an Animated Feature Production',
        category: NominationCategory.PRODUCTION_DESIGN,
      },
      'cfb0deca-2085-42cd-ab73-210816a9ddd3': {
        title: 'Best Storyboarding in an Animated Feature Production',
        category: NominationCategory.ANIMATION,
      },
      '3f4b2fea-01a1-45a8-863a-bb1edf801edb': {
        title: 'Best Storyboarding in an Animated Television Production',
        category: NominationCategory.DIRECTOR,
      },
      '6439d840-fca4-41b7-9455-85a1ebf56f45': {
        title: 'Best Voice Acting in an Animated Feature Production',
        category: NominationCategory.CAST,
      },
      '1c64a2ff-816d-4f13-8620-f43ea880ef1e': {
        title: 'Best Writing in an Animated Feature Production',
        category: NominationCategory.SCREENPLAY,
      },
      '5319e99b-9464-40d9-91da-78e643f7ed13': {
        title:
          'Outstanding Achievement in Production Design in an Animated TV/Broadcast Production',
        category: NominationCategory.PRODUCTION_DESIGN,
      },
      '0753fcab-6b0b-459b-a8e5-71567d5e27bb': {
        title:
          'Outstanding Achievement in Storyboarding in an Animated TV/Broadcast Production',
        category: NominationCategory.ANIMATION,
      },
      '52ed9d07-eae4-4768-9862-1b57ad65ac2f': {
        title: 'Outstanding Character Animation',
        category: NominationCategory.ANIMATION,
      },
    },
  },
  '6a2f1cda-5442-49d0-969c-ddb1a22a0e03': {
    title: 'MTV Movie Award',
    icon: <Icons icon="mtvAward" {...iconProps} />,
    nominations: {
      'b7103e19-b161-49b5-847f-753c106ceb5f': {
        title: 'Best Action Performance',
        category: NominationCategory.CAST,
      },
      '2f12b906-153f-4cd2-b719-e0e9d54527a0': {
        title: 'Best Action Sequence',
        category: NominationCategory.ACTION,
      },
      '72bea454-1925-495e-8b13-abd8ec41ac4b': {
        title: 'Best Breakthrough Performance',
        category: NominationCategory.CAST,
      },
      '640e7bd1-716a-4d9d-9c89-a2bcb4f46794': {
        title: 'Best Duo',
        category: NominationCategory.CAST,
      },
      '92dcf3b9-9639-4482-bc85-5ad7895b7b5b': {
        title: 'Best Female Performance',
        category: NominationCategory.CAST,
      },
      '6f842add-0dec-488d-9a04-93e78aaddcc3': {
        title: 'Best Fight',
        category: NominationCategory.ACTION,
      },
      '9c04a0b5-a613-49ec-be5c-e6290b90911e': {
        title: 'Best Hero',
        category: NominationCategory.CAST,
      },
      'd974522c-228d-4bd2-9c6f-db86d4c4acc2': {
        title: 'Best Male Performance',
        category: NominationCategory.CAST,
      },
      '125802e2-8240-480d-99b9-db1d4a922e45': {
        title: 'Best Movie',
        category: NominationCategory.BEST_MOVIE,
      },
      'a7f03705-1fc8-4676-8250-4c052bc54112': {
        title: 'Best Musical Moment',
        category: NominationCategory.MUSIC,
      },
      'd06005ef-f8c6-49ce-8185-7bcfc8a91b0e': {
        title: 'Best On-Screen Team',
        category: NominationCategory.CAST,
      },
      'eecc41a5-81dc-4fe0-849e-1d52264de776': {
        title: 'Best On-Screen Transformation',
        category: NominationCategory.CAST,
      },
      '7d150dfa-5f76-4262-9e06-5600d70ffc2a': {
        title: 'Best Performance',
        category: NominationCategory.CAST,
      },
      'f287ee7c-5831-4d7d-ad28-f27db0a738a4': {
        title: 'Best Performance in a Movie',
        category: NominationCategory.CAST,
      },
      'c1a5dfa1-71a4-4607-99b2-063a66a9580c': {
        title: 'Best Performance in a Show',
        category: NominationCategory.CAST,
      },
      '197add55-ef2d-484e-b186-96ceeaccb9c2': {
        title: 'Best Scared-As-S**t Performance',
        category: NominationCategory.CAST,
      },
      'c992410b-8a19-4d8c-b802-9d7ef781ba40': {
        title: 'Best Scared-As-Shit Performance',
        category: NominationCategory.CAST,
      },
      '40a411f5-4379-4e05-9c99-df6f5a0fa53b': {
        title: 'Best Show',
        category: NominationCategory.BEST_MOVIE,
      },
      '535c3c6c-7823-4226-adde-f3e43fc8a844': {
        title: "Best Summer Movie You Haven't Seen Yet",
        category: NominationCategory.BEST_MOVIE,
      },
      'd3bafbf4-f684-4f60-875a-5cbbe09c14e2': {
        title: 'Best Villain',
        category: NominationCategory.CAST,
      },
      '7a60c061-93f9-4c40-9a55-774e98bc58bb': {
        title: 'Best Virtual Performance',
        category: NominationCategory.VIRTUAL_PERFORMANCE,
      },
      '85c641a4-a6dd-4300-a1d3-9e3fd250c1eb': {
        title: 'Breakthrough Male Performance',
        category: NominationCategory.CAST,
      },
      '939c9889-253e-4f2d-a2cd-13f2aba6da0f': {
        title: 'Breakthrough Performance',
        category: NominationCategory.CAST,
      },
      '35cc1f39-d016-478f-869d-c1a37cf9b086': {
        title: 'Lifetime Achievement',
        category: NominationCategory.LIFETIME_ACHIEVEMENT,
      },
      '7497b93f-14ea-4b38-aeb4-c85128012c2f': {
        title: 'Most Desirable Female',
        category: NominationCategory.CAST,
      },
      'bfff0a2c-c6d7-4352-a306-620f8b610ab2': {
        title: 'Movie of the Year',
        category: NominationCategory.BEST_MOVIE,
      },
    },
  },
});

export { getAwardsConfig, type AwardsConfig };
