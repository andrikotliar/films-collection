import { IconNames } from '@/components/icon/types';

type AwardsConfig = {
  [awardId: string]: {
    title: string;
    icon: IconNames;
    nominations: {
      [nominationId: string]: string;
    };
  };
};

const awardsConfig: AwardsConfig = {
  '9d7f2aa9-d2c7-4cba-b868-5266c859b4c2': {
    title: 'Oscar',
    icon: 'oscarAward',
    nominations: {
      'ca03f1f4-dade-4358-8dc6-0dd2493be0cc':
        'Best Achievement in Art Direction',

      'd39a99f8-9730-4e7f-8da8-d61ce0af0858':
        'Best Achievement in Cinematography',

      '0db53dc9-86d9-41f0-9a9b-7701c0ff5b49':
        'Best Achievement in Costume Design',

      '26f64552-2c83-48f4-b19e-a8487ef3b46f': 'Best Achievement in Makeup',

      '83a03821-a59c-4603-983e-6b989cc2c2e3':
        'Best Achievement in Makeup and Hairstyling',

      '30d4820a-b28d-4b59-b182-3c7a28562168':
        'Best Achievement in Music Written for Motion Pictures (Original Score)',

      '34e5df6f-3fce-4311-9a31-9e710a9508c9':
        'Best Achievement in Production Design',

      'ac85bc32-bfab-4362-9557-dd089f7a0ec5':
        'Best Achievement in Sound Editing',

      '34c7b8f1-0115-4099-99ec-1f13cfbe0fa3':
        'Best Achievement in Sound Mixing',

      'a6b1a904-f461-4360-aecc-9cd91d7d537a':
        'Best Achievement in Visual Effects',

      '5d1bb57f-cea1-4c41-81e7-fad3c6b9a7ea': 'Best Animated Feature',

      '17cc846a-59f4-475a-8f2f-3c8988cf2ad0':
        'Best Art Direction-Set Decoration',

      '12aa25ba-0a5b-4288-8bcc-8ed417b5b50f': 'Best Cinematography',

      'e228fed5-d3cc-4ba6-ac4a-e4bbcf4d17cb': 'Best Costume Design',

      '710da6af-dc6a-4619-9d70-587b6a18d5b8': 'Best Director',

      '39fc2c0f-e6b0-4c24-a558-792a67b8536b':
        'Best Effects, Sound Effects Editing',

      '38a477dc-4708-46b2-a96f-c39f7ec9af0b': 'Best Effects, Visual Effects',

      '6aa195b9-f874-42d9-aa00-9675923b2125': 'Best Film Editing',

      '0c8ce350-1ddc-43e7-b423-3099e13284a0': 'Best Make-up',

      'e6962ab2-e7ab-4c69-8fc0-b1cae01a7036': 'Best Music',

      'c2ddefe1-8b1f-4222-bd82-95ef2460545c':
        'Best Music (Original Dramatic Score)',

      '23be7816-fd21-426d-8178-72ade1967b6a': 'Best Music (Original Score)',

      '862e14de-43a1-47f5-876d-6d2ea5970bee': 'Best Music (Original Song)',

      'bca74c1f-f46a-4f82-bfab-f5f042b1b664':
        'Best Performance by an Actor in a Supporting Role',

      '0bf39901-4ed1-48da-b081-97671bf08dd7': 'Best Picture',

      '5bc47561-63bd-455c-8c3d-9f9ced87e923': 'Best Sound',

      'a6e431ba-5968-40c0-b626-a32b63418733': 'Best Sound Editing',

      'be727846-3c6e-4539-8962-2c3539ea9ff1': 'Best Sound Effects Editing',

      '62ffbd2c-4189-4aa6-83a8-3c42bd244c2d': 'Best Sound Mixing',

      'c346a523-3bf3-4f58-98e3-599206560b12': 'Best Visual Effects',

      '06aa2817-8307-4d48-aa42-9fcb66be0fdb':
        'Best Writing, Adapted Screenplay',
    },
  },

  'ae6f2bdf-42ac-4c5d-9744-881198ac1a1d': {
    title: 'Golden Globe',
    icon: 'goldenGlobeAward',
    nominations: {
      '3a67bd92-4965-45de-b539-6a1de187c488': 'Best Animated Film',

      '2654065c-16c7-426c-9dde-871e2e2be33a': 'Best Director - Motion Picture',

      'cf903aa7-6778-43fb-bd91-b3ce3e18cac7':
        'Best Motion Picture - Comedy or Musical',

      '1f4a5da9-689e-4ff5-8100-497bf998787f': 'Best Motion Picture - Drama',

      '67fd465d-1da6-4a38-9e7f-f6b4758e2b3a':
        'Best Original Score - Motion Picture',

      '100ca2e6-3187-4ef9-af81-7c4791455781':
        'Best Original Song - Motion Picture',

      'a66ffaa4-57c6-48f1-bbe8-df9ef2d6d29c':
        'Best Performance by an Actor in a Motion Picture - Comedy or Musical',

      '749bb15b-c750-4ba6-ae1e-3ca8d59d38bb':
        'Best Performance by an Actress in a Limited Series, Anthology Series or a Motion Picture Made for Television',

      'd3f9ce2c-d7ee-46af-89a6-72cac4931b83':
        'Best Television Limited Series, Anthology Series or Motion Picture Made for Television',
    },
  },

  '676e9dff-a89d-48af-9063-009b246fff13': {
    title: 'Critics Choice',
    icon: 'criticsChoiceAward',
    nominations: {
      '522ed3e9-6c70-494a-b926-b5729a885dd8': 'Best Acting Ensemble',

      '53f51093-e194-40d8-94b4-28908cb6a14c': 'Best Action Movie',

      '6bd9defb-5179-43e3-be13-f02b2cb2ede0':
        'Best Actress in a Limited Series or a Movie Made for Television',

      'b852d024-3f3d-4182-8905-7853a11e3073': 'Best Actress in an Action Movie',

      '492bd6f2-1108-41c7-9fa9-4fd7f634c408': 'Best Animated Feature',

      '74b1f9bc-fb1b-4520-9611-c99c1b83d336': 'Best Art Direction',

      '29776f60-18dc-4f87-b67d-ce014b40dca7': 'Best Cinematography',

      'dfe3aaa5-4b86-49d4-b690-34ffbea590a0': 'Best Composer',

      '4bcfc61a-78da-437b-a7e6-477060220c46': 'Best Costume Design',

      '111c6946-f2d3-4619-adab-f5a68d272890': 'Best Digital Acting Performance',

      '180f76b8-bdb9-4536-91c0-0d8fe887b0b3': 'Best Director',

      'e3315655-dd72-45ea-b678-99c733428907': 'Best Editing',

      '1aab9cd6-3a4f-4c34-9394-b4ff3b1854ff': 'Best Family Film - Live Action',

      '66405be9-0573-45e1-b5fc-c80161d86500': 'Best Hair & Makeup',

      '60849ea9-442f-4873-8ede-82d86114be48': 'Best Limited Series',

      '45736875-bb5d-429c-afbd-a60ada41c58b': 'Best Picture',

      'f16da86c-96df-4e39-a8a6-0ece4422409a': 'Best Production Design',

      'e2b9afe6-c274-4cc0-8ca8-5738a3a6d46a': 'Best Sci-Fi/Horror Movie',

      '6cbb6fbc-9d6a-4a2a-a4ae-e61fa307d8c5': 'Best Score',

      'a9e2da06-f75b-43c9-a864-bc5bc8dbbdd1': 'Best Song',

      '7bfe511a-a03e-4b99-aa6c-fff51052aea5': 'Best Sound',

      'a9645c27-dbf0-401d-b637-09703c44e217': 'Best Supporting Actor',

      'bdb7a047-42e4-44a9-9122-ec8d1c38c769':
        'Best Supporting Actor in a Drama Series',

      '16e427a6-c3e9-40ba-9218-923d3e12e702':
        'Best Supporting Actor in a Limited Series or Movie Made for Television',

      '1dbbd79f-d824-4e8e-83c4-bda38adc45f9': 'Best Visual Effects',

      '8cb10314-9a85-4429-8da5-3125da3d68b5': 'Best Young Actress',

      'bf2b625b-bb36-4e71-b853-0662f482e5fb': 'Favorite Film Franchise',
    },
  },

  '59b42575-c175-4447-95fc-6ba79e2456c2': {
    title: 'BAFTA',
    icon: 'baftaAward',
    nominations: {
      'b6836a56-a68b-4b87-b609-71ebd8c50628':
        'Best Achievement in Special Visual Effects',

      '02af1954-1c3e-474e-8368-e31fe6220a70': 'Best Animated Feature Film',

      'f89218a9-2b2a-412f-9092-e02f58564999': 'Best Animated Film',

      'de9886fe-9742-411d-b14a-1c494f8408b0': 'Best Cinematography',

      '90674ec1-5025-4c2f-aea2-4140975f1b22': 'Best Costume Design',

      'e52213d9-bc00-447b-aba9-0b7f7dc4e096': 'Best Editing',

      '37d6c9f0-b11c-446f-92ee-e369d76910ee': 'Best Feature Film',

      'bc675d2e-557b-447d-b81f-690913a0d5aa': 'Best Film',

      'cc7ff5ce-dc99-4af9-b0c5-1948bd755ced': 'Best International',

      '49107a05-62b8-41da-93e6-98fb6423885d': 'Best Make Up/Hair',

      'bb69a340-0754-4a75-943a-75dbeb2257fd': 'Best Production Design',

      '715d62df-b930-478d-8b3d-e9de89c1c94b':
        'Best Production Design/Art Direction',

      'ed971f9e-203f-4eeb-b3bf-4757d0b88346': 'Best Screenplay - Adapted',

      'fc19047a-84fa-4ddc-ab69-d69aec8aba25': 'Best Sound',

      '6e4269f9-99ad-4163-8910-6a96da2b2dd3': 'Best Sound Track',

      '949cb1a5-cb95-48e5-915b-aa95e255232d': 'Best Special Effects',

      'f7bd10f5-4137-4601-8c89-d9ccc58fe6a3': 'Best Special Visual Effects',

      '249fd8a4-59fe-4475-845f-4b49ed94ee76': 'Best Supporting Actor',

      '7f4509ac-d84c-4a24-9212-25deae15c217': 'Leading Actor',

      '2708284c-d135-4df4-acae-2172ef6e8b6b': 'Mini-Series',

      'f74102be-c077-4834-99da-c1d2787ea924': 'Supporting Actor',
    },
  },

  'a50aca24-8229-41cf-a01a-b38741e73145': {
    title: 'Saturn',
    icon: 'saturnAward',
    nominations: {
      'ff7b106c-5ac3-4fe2-85d0-3449b0f7e753': 'Best Action/Adventure Film',

      '45a24e7b-3b27-45db-ada4-98608e63ac57':
        'Best Action/Adventure/Thriller Film',

      'bf2b54f8-c631-484c-b4a5-3f784f2f7e45': 'Best Actor',

      '66954688-228a-4288-b89a-af7fb4b3f890': 'Best Actress',

      '15d0cdb6-94fc-450f-beb1-9d3c3246b828': 'Best Animated Film',

      'f7a0a071-9da5-4baa-a192-931f60b7d2bf':
        'Best Comic-to-Film Motion Picture',

      '3da49678-fc01-4143-8b79-f4d8e32a2b44': 'Best Costume',

      '5b5861fd-09b2-4984-83b9-70d5722cab24': 'Best Costume Design',

      'd35f98cd-6d5a-41c8-b511-9046a59d8828': 'Best Costumes',

      '3675ad3d-4694-458d-a396-1e49d7fbc9be': 'Best Director',

      '74ad3ee5-2619-4dd8-a034-d61cb277b764': 'Best DVD Collection',

      '835b9846-24c4-4ec3-8543-0cbd322cb2e8': 'Best DVD Special Edition',

      '90dce09b-0a64-49aa-8589-1fd1783ad0fe':
        'Best DVD Special Edition Release',

      'b2b7145c-693f-4618-b68e-113e6aef05e0':
        'Best DVD/Blu-Ray Special Edition Release',

      '4776a35c-732d-4ca9-a4ff-2d3312cf353f': 'Best Editing',

      '43447644-6efc-4969-b6f8-8cd2d7089fae': 'Best Fantasy Film',

      'ce61910d-0236-4652-9562-4b71956b4d41': 'Best Horror Film',

      'a3c2244b-8c42-49be-96f2-a7d2edf3b8a7': 'Best Make-up',

      'be35075e-d485-4f10-9869-f89d28592465': 'Best Music',

      '8db5c8bd-ea70-4e58-8637-24287d247615':
        'Best New Media Television Series',

      'dedc1e3d-4b67-46dd-bfd5-480f7a05d7e6':
        'Best Performance by a Younger Actor',

      'ac69b30b-8d41-4324-959b-4de0c4351cb2':
        'Best Performance by a Younger Actor in a Television Series',

      '642af5c7-bc7e-4e5e-874e-05977dc3fccc': 'Best Presentation on Television',

      '038bfccf-c5b8-47c9-b285-219c4e5d1efd': 'Best Production Design',

      'a09f029a-61c3-4398-b97d-03dd0ca499c5': 'Best Science Fiction Film',

      '188d8d42-edd8-4d88-abc6-31d5806bff91': 'Best Special Effects',

      'e1a07b16-cd0e-4b48-86d7-49e8e6fe92c0':
        'Best Streaming Horror & Thriller Series',

      '783f1222-1b58-4ebe-af1d-4fd018778af6': 'Best Supporting Actor',

      'fe65a215-a19f-4382-a43e-c1dd27f8f27e': 'Best Supporting Actress',

      'b9ce2496-5d9c-4c45-bd2c-7523193813f9':
        'Best Supporting Actress in Streaming Presentation',

      'c75dcda3-a68d-41c1-a07a-61ddc9c1064f': 'Best Thriller Film',

      '5aefbcf2-fe77-40b6-b866-fc647c89a400': 'Best Writer',

      '782745a7-8bff-4c54-993a-09e6187939ea': 'Best Writing',

      '4f50a3c3-8ddb-45e1-b08e-3171814ed2e2':
        'Best Youth-Oriented Series on Television',

      '7a57625c-92b7-4bf4-ba60-b2926608626f': 'Outstanding Art Direction',

      '39288fdb-88aa-4694-acb8-0bc4c533151f': 'Outstanding Editing',

      '85e948fb-27f5-4e3e-8882-54c72090be98': 'Outstanding Set Decoration',

      '51ee4c95-b7fb-43cc-9a36-c562591b94ba': 'Outstanding Sound',
    },
  },

  'bee25875-f12e-4dfe-9fc5-f25cdb5d836d': {
    title: 'Primetime Emmy',
    icon: 'emmyAward',
    nominations: {
      '8e7ffc12-f5ae-4bbf-972e-9f6c79ec5499':
        'Outstanding Casting for a Drama Series',

      '9c2055bb-e38a-4195-9ef2-aacbec910a17':
        'Outstanding Cinematography for a Limited Series or Movie',

      'a4b1d8eb-c56e-4dae-b90f-80d6ebfcc852':
        'Outstanding Cinematography for a Miniseries or Movie',

      '920a6e10-6f9e-42b0-af62-dfdb428770ee':
        'Outstanding Cinematography for a Single-Camera Series (Half-Hour)',

      '5a0a1af9-4979-4ca7-897f-d79588f652c0':
        'Outstanding Directing for a Limited Series',

      '90dc0862-e778-4aef-9a86-3adbd717291e':
        'Outstanding Individual Achievement in Animation',

      '0ca81c05-5827-4058-a312-2b1952da73eb':
        'Outstanding Lead Actor in a Miniseries or a Movie',

      'f6a19892-fa05-412d-af05-1b68e1f88955': 'Outstanding Limited Series',

      'a95b04f3-ae06-454b-997b-1f7a9a84bb90': 'Outstanding Main Title Design',

      '1c2f618c-4bd8-460b-b351-fb32353181bc':
        'Outstanding Music Composition for a Limited Series, Movie or Special (Original Dramatic Score)',

      '8d33a402-89d8-4946-98ee-df9743f4ca55':
        'Outstanding Music Composition for a Miniseries, Movie or a Special (Original Dramatic Score)',

      '8f66fb8c-3a48-453b-8b03-84d7716f3e73':
        'Outstanding Music Composition for a Series (Original Dramatic Score)',

      '7f461021-e76c-4fe5-8a89-3fecb1992e1b': 'Outstanding Music Supervision',

      '24a6a674-1e32-464a-a2e3-328d52668bd5':
        'Outstanding Original Main Title Theme Music',

      '73932212-c83c-4a4e-992d-57f603e25eb0':
        'Outstanding Production Design for a Narrative Period or Fantasy Program (One Hour or More)',

      '1e2b2e1e-5c3c-4061-be3c-e717962b1c10':
        'Outstanding Production Design for a Narrative Program (Half-Hour)',

      'dee6e4c3-f3f0-4f29-95be-97053e1cfd59': 'Outstanding Prosthetic Makeup',

      '907c69e6-dc76-47ec-bd50-1a348e60ddc4':
        'Outstanding Single-Camera Picture Editing for a Drama Series',

      '80f3bba3-c1c9-472f-b2f8-9caf6a82a96a':
        'Outstanding Single-Camera Picture Editing for a Limited Series or Movie',

      'dfbde00a-376a-4c66-807b-f3a5a6cc2079':
        'Outstanding Single-Camera Picture Editing for a Miniseries or a Movie',

      '6e6b1254-beb5-48c7-915d-1b534268191d':
        'Outstanding Sound Editing for a Comedy or Drama Series (Half-Hour and Animation)',

      '14bbeb92-155a-4b95-8191-3520856886b5':
        'Outstanding Sound Editing for a Comedy or Drama Series (One Hour)',

      'd6801f6b-eefb-45e6-bb5d-9c9f717f2a4b':
        'Outstanding Sound Editing for a Limited Series, Movie or Special',

      '6fda9634-3a1a-4051-b99a-09d9325218fe':
        'Outstanding Sound Editing for a Miniseries, Movie or a Special',

      '694cdcf7-bef3-4fbb-a477-fce5698b43e9':
        'Outstanding Sound Editing for a Series',

      'e89a6b88-c703-4366-9b2e-a150e53c8252':
        'Outstanding Sound Mixing for a Comedy or Drama Series (Half-Hour and Animation)',

      'f7aeea61-9f2c-4601-b438-80368c3a2a09':
        'Outstanding Sound Mixing for a Comedy or Drama Series (One Hour)',

      '860855b4-cce6-43e3-b1af-2c3bd27212fe':
        'Outstanding Sound Mixing for a Limited Series or Movie',

      '798f775a-0eee-422d-8ceb-e32e6dc6a41b':
        'Outstanding Special Visual Effects',

      'db88438e-db01-461c-b677-ff6bee46a6eb':
        'Outstanding Special Visual Effects for a Series',

      'b279c08f-d226-44d9-8cd8-dc449cffcc1f':
        'Outstanding Special Visual Effects in a Supporting Role',

      '453d22b4-2cb1-4487-88a9-246086e7a735':
        'Outstanding Special Visual Effects in a Supporting Role,',

      'c13289eb-0fcc-4378-9a72-ee780cba0002':
        'Outstanding Stunt Coordination for a Drama Series Limited Series or Movie',

      'c57e4f76-f7de-45e8-becd-e29a8f58345a':
        'Outstanding Stunt Coordination for a Drama Series, Limited of Anthology Series or Movie',

      'a67a2bd7-5f23-4ec9-b090-491d943d5665':
        'Outstanding Supporting Actor in a Miniseries or a Movie',

      '66b8f6e1-d00c-4df4-8f47-95e6cbcc6434': 'Outstanding Television Movie',

      'c679e169-b25b-425b-80f2-34e2125df54e':
        'Outstanding Writing for a Limited Series',

      '1cbc5a19-a786-4ed7-8865-9e034ac37cda':
        'Outstanding Writing for a Miniseries or a Dramatic Special',
    },
  },

  '7ebe7513-34d1-4e11-8654-0f6390c2c290': {
    title: 'Jupiter',
    icon: 'jupiterAward',
    nominations: {
      '452170e4-97c0-43a1-87db-959fd8d9d75c': 'Best German TV Actor',

      '8f0cd2b0-fa7e-4898-8e97-1920c9b31616': 'Best International Actor',

      'e98acd2a-140e-4b7b-80ee-85cca92e8acd': 'Best International Director',

      '67d69cb3-6401-46f7-8765-4bd74eaba0a0': 'Best International Film',
    },
  },

  'c4127f39-85a6-440c-bdcc-8742beb6e2f7': {
    title: 'Annie',
    icon: 'annieAward',
    nominations: {
      '5ace8a28-f78b-42ca-896d-32d3efb85f41': 'Best Animated Effects',

      '8e18c6b6-524b-467b-8139-dce657a6b352': 'Best Animated Feature',

      '2fcb9191-7cae-43bd-ba04-76d0df98f953':
        'Best Animated Television Production',

      'c8f59cea-39f8-4d08-86fb-b2ae18175c3b':
        'Best Animated Television Production Produced for Children',

      '0fe4c462-5d45-4bfa-ac96-593996ea5080':
        'Best Character Animation in a Feature Production',

      '2aac359f-94d4-46aa-9695-6d69a80b460e':
        'Best Character Animation in a Television Production',

      'dbdc7f25-9f96-4a83-9669-c7dea23946ae':
        'Best Character Design in an Animated Feature Production',

      'a1cc48e6-5d13-447e-b744-ac5b1e2ac47a':
        'Best Directing in an Animated Television Production',

      'fbe7cd6e-c83f-4c33-b80f-d7ad0653c339':
        'Best Directing in an Animated Television Production or Short Form',

      '0c9814a3-c628-4c6c-a17d-0f6e4aa83293':
        'Best Production Design in an Animated Feature Production',

      'cfb0deca-2085-42cd-ab73-210816a9ddd3':
        'Best Storyboarding in an Animated Feature Production',

      '3f4b2fea-01a1-45a8-863a-bb1edf801edb':
        'Best Storyboarding in an Animated Television Production',

      '6439d840-fca4-41b7-9455-85a1ebf56f45':
        'Best Voice Acting in an Animated Feature Production',

      '1c64a2ff-816d-4f13-8620-f43ea880ef1e':
        'Best Writing in an Animated Feature Production',

      '5319e99b-9464-40d9-91da-78e643f7ed13':
        'Outstanding Achievement in Production Design in an Animated TV/Broadcast Production',

      '0753fcab-6b0b-459b-a8e5-71567d5e27bb':
        'Outstanding Achievement in Storyboarding in an Animated TV/Broadcast Production',

      '52ed9d07-eae4-4768-9862-1b57ad65ac2f': 'Outstanding Character Animation',
    },
  },

  '6a2f1cda-5442-49d0-969c-ddb1a22a0e03': {
    title: 'MTV Movie Award',
    icon: 'mtvAward',
    nominations: {
      'b7103e19-b161-49b5-847f-753c106ceb5f': 'Best Action Performance',

      '2f12b906-153f-4cd2-b719-e0e9d54527a0': 'Best Action Sequence',

      '72bea454-1925-495e-8b13-abd8ec41ac4b': 'Best Breakthrough Performance',

      '640e7bd1-716a-4d9d-9c89-a2bcb4f46794': 'Best Duo',

      '92dcf3b9-9639-4482-bc85-5ad7895b7b5b': 'Best Female Performance',

      '6f842add-0dec-488d-9a04-93e78aaddcc3': 'Best Fight',

      '9c04a0b5-a613-49ec-be5c-e6290b90911e': 'Best Hero',

      'd974522c-228d-4bd2-9c6f-db86d4c4acc2': 'Best Male Performance',

      '125802e2-8240-480d-99b9-db1d4a922e45': 'Best Movie',

      'a7f03705-1fc8-4676-8250-4c052bc54112': 'Best Musical Moment',

      'd06005ef-f8c6-49ce-8185-7bcfc8a91b0e': 'Best On-Screen Team',

      'eecc41a5-81dc-4fe0-849e-1d52264de776': 'Best On-Screen Transformation',

      '7d150dfa-5f76-4262-9e06-5600d70ffc2a': 'Best Performance',

      'f287ee7c-5831-4d7d-ad28-f27db0a738a4': 'Best Performance in a Movie',

      'c1a5dfa1-71a4-4607-99b2-063a66a9580c': 'Best Performance in a Show',

      '197add55-ef2d-484e-b186-96ceeaccb9c2': 'Best Scared-As-S**t Performance',

      'c992410b-8a19-4d8c-b802-9d7ef781ba40': 'Best Scared-As-Shit Performance',

      '40a411f5-4379-4e05-9c99-df6f5a0fa53b': 'Best Show',

      '535c3c6c-7823-4226-adde-f3e43fc8a844':
        "Best Summer Movie You Haven't Seen Yet",

      'd3bafbf4-f684-4f60-875a-5cbbe09c14e2': 'Best Villain',

      '7a60c061-93f9-4c40-9a55-774e98bc58bb': 'Best Virtual Performance',

      '85c641a4-a6dd-4300-a1d3-9e3fd250c1eb': 'Breakthrough Male Performance',

      '939c9889-253e-4f2d-a2cd-13f2aba6da0f': 'Breakthrough Performance',

      '35cc1f39-d016-478f-869d-c1a37cf9b086': 'Lifetime Achievement',

      '7497b93f-14ea-4b38-aeb4-c85128012c2f': 'Most Desirable Female',

      'bfff0a2c-c6d7-4352-a306-620f8b610ab2': 'Movie of the Year',
    },
  },
};

export { awardsConfig, type AwardsConfig };
