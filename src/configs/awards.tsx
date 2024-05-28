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
  '77f4fba8c4801f32a6bd8f39': {
    title: 'Oscar',
    icon: 'oscarAward',
    nominations: {
      '7705106d5f396b3cd3737061': 'Best Achievement in Art Direction',
      '4c0ed0e55fb7a79725a3be4b': 'Best Achievement in Cinematography',
      '1424ab8531c3e4dd93c2fcda': 'Best Achievement in Costume Design',
      '7287c709ee7e31f93728502a': 'Best Achievement in Makeup',
      '14fc9d7ccd4a1989f5982686': 'Best Achievement in Makeup and Hairstyling',
      '09de653daca9a5839638e20f':
        'Best Achievement in Music Written for Motion Pictures (Original Score)',
      bf90abbb366c97d246f21e91: 'Best Achievement in Production Design',
      '0f9e1d3ce01ffbc48478fc5c': 'Best Achievement in Sound Editing',
      '438ebcf46e8852fd98e00f8f': 'Best Achievement in Sound Mixing',
      '60c5a2ad60d50a27cbf6ca22': 'Best Achievement in Visual Effects',
      dc2f81356a5c43ad11366c9b: 'Best Animated Feature',
      '135b75443634451392a18894': 'Best Art Direction-Set Decoration',
      fe5e85d8a9a72ff3def8044f: 'Best Cinematography',
      '029b03cb672efed569e3be36': 'Best Costume Design',
      '667131239c1127eb04f3d70f': 'Best Director',
      '967a8825123733b037a13c1a': 'Best Effects, Sound Effects Editing',
      f7e4e2261fe9a2c134896f78: 'Best Effects, Visual Effects',
      '35200fe128bd097f8616d1ba': 'Best Film Editing',
      f4b44821da64dc4fbc66bce4: 'Best Make-up',
      '7dffb39f2ebaa6744684f5fa': 'Best Music',
      b4aa06e1880d1778a788db69: 'Best Music (Original Dramatic Score)',
      '9a14db9d4bc9a8a75c6a3845': 'Best Music (Original Score)',
      f11c24eac6e50088d1b4996d: 'Best Music (Original Song)',
      '9d4d8b984a59968ea51cac62':
        'Best Performance by an Actor in a Supporting Role',
      '272b67853b5f878162edda97': 'Best Picture',
      '218a422da0df0fa0f49d97a5': 'Best Sound',
      '9447427b8f2dc69e102c9eb2': 'Best Sound Editing',
      '18860c1f61dea72c56e3fea2': 'Best Sound Effects Editing',
      '35a3b3814157cb8d4895165c': 'Best Sound Mixing',
      '820d2a55172a2460be8ccdcf': 'Best Visual Effects',
      '2d9edec5f1ac7576a94c0cae': 'Best Writing, Adapted Screenplay',
    },
  },
  '4fc6a2669b79482fb03b65c3': {
    title: 'Golden Globe',
    icon: 'goldenGlobeAward',
    nominations: {
      '3d45dce73d72aa4056ea90e6': 'Best Animated Film',
      '2295ee9a1529b80132b46a56': 'Best Director - Motion Picture',
      ff318d2b927c72ba79458eb8: 'Best Motion Picture - Comedy or Musical',
      c00fa792988e912ceae956b6: 'Best Motion Picture - Drama',
      e36c09cade596bb9e2bcc9ce: 'Best Original Score - Motion Picture',
      '7ec6cab5b05fc4c40f5c1f17': 'Best Original Song - Motion Picture',
      '217117a5ddb4d9595d5802e3':
        'Best Performance by an Actor in a Motion Picture - Comedy or Musical',
      '10b22a3cff924dadfb443bfd':
        'Best Performance by an Actress in a Limited Series, Anthology Series or a Motion Picture Made for Television',
      '480a25cc0cdb47de02be27ab':
        'Best Television Limited Series, Anthology Series or Motion Picture Made for Television',
    },
  },
  '083e0a9c6cad4b02c0d5772b': {
    title: 'Critics Choice',
    icon: 'criticsChoiceAward',
    nominations: {
      '0beaa0d74f189b92141509fb': 'Best Acting Ensemble',
      '11f1c7cecedd938f923b237e': 'Best Action Movie',
      fa0e8c7e7623482101027bd4:
        'Best Actress in a Limited Series or a Movie Made for Television',
      '0e40fd4fa5ccfa2925a91bcf': 'Best Actress in an Action Movie',
      '733d6f320a77a4bc58ba2dbd': 'Best Animated Feature',
      e146225b030c650c74bc4b66: 'Best Art Direction',
      ccf7d795695de68c960ca611: 'Best Cinematography',
      '11f23a6a5c2184a5768d7639': 'Best Composer',
      '221feda7e314a781d979068c': 'Best Costume Design',
      '85e27dfc33eed4b9d24fb8f8': 'Best Digital Acting Performance',
      f1772ea90cf2a9293f5ff9e0: 'Best Director',
      '336b2b7d7845d51a34ba4cee': 'Best Editing',
      '2adf3660a95c0369d0b55985': 'Best Family Film - Live Action',
      '71567c59818071efa169e429': 'Best Hair & Makeup',
      '251ee5ad5551a49219907f18': 'Best Limited Series',
      e7a6d00c47e27f698dee6243: 'Best Picture',
      '8cec7d33c8e39980b2c593ec': 'Best Production Design',
      fd7d97fcca1ab42e58a26206: 'Best Sci-Fi/Horror Movie',
      eae2b43cb89c2ce00d125435: 'Best Score',
      b287777b2ab58c1fc1a30c20: 'Best Song',
      '4075bb92abbe6f8299e0857a': 'Best Sound',
      a484612f854dcd0cc50f7346: 'Best Supporting Actor',
      '37f25421db924cc5e78f1da2': 'Best Supporting Actor in a Drama Series',
      '0de3848c1b3d25b0b10fc346':
        'Best Supporting Actor in a Limited Series or Movie Made for Television',
      db1bd47a7280b6e1da42bc99: 'Best Visual Effects',
      '8072cbff0873b437521f418f': 'Best Young Actress',
      '048761674f308f63d47332f6': 'Favorite Film Franchise',
    },
  },
  f5ca20c5b015eafd0cb84b95: {
    title: 'BAFTA',
    icon: 'baftaAward',
    nominations: {
      bc0ac0796a867cf1708fef75: 'Best Achievement in Special Visual Effects',
      '1f6f9f5b3109cb1537363326': 'Best Animated Feature Film',
      a2a2ed5554b463917255a2db: 'Best Animated Film',
      '32cad0957b7fb97f3059d9e5': 'Best Cinematography',
      c589eec698f8b1ed198d0d38: 'Best Costume Design',
      '4676b6882b44f5636eb2f6d5': 'Best Editing',
      '1dd510c3675e6313ed13c058': 'Best Feature Film',
      '9bdccd47229deea4b6e05735': 'Best Film',
      fecfbeb568cf9006e67fe937: 'Best International',
      '0ee59417763a7accdac33a14': 'Best Make Up/Hair',
      cdab47c288c2112567537e85: 'Best Production Design',
      '0cda107851c64c6f3cd4e63f': 'Best Production Design/Art Direction',
      fda51671f2403fb8fcae5bdf: 'Best Screenplay - Adapted',
      '11854c22f8776316a60f53ce': 'Best Sound',
      '331d567d07f4232ec93f7e47': 'Best Sound Track',
      '13292889814ceb8a39da574f': 'Best Special Effects',
      a328339c31b1366a6d5983c7: 'Best Special Visual Effects',
      '9ccee792d4f7c3ead78372d3': 'Best Supporting Actor',
      '5197ea0bbe0163aa277edc21': 'Leading Actor',
      '397ca00728928be4e81ad8bd': 'Mini-Series',
      '7368a66c068f3fa86d8ddac9': 'Supporting Actor',
    },
  },
  '5ef6b36be7bea9fa5883103e': {
    title: 'Saturn',
    icon: 'saturnAward',
    nominations: {
      '5726bb5d7b03a6dcaebe63fd': 'Best Action/Adventure Film',
      '5509d8e321795e1e3ffdc3b2': 'Best Action/Adventure/Thriller Film',
      '6e270264df618619fd4130b7': 'Best Actor',
      '9689652dc356c3239dfa2d51': 'Best Actress',
      '6245de35a58473814d425660': 'Best Animated Film',
      '49f9eaedda92c9e5d6d676b3': 'Best Comic-to-Film Motion Picture',
      c00b7ee9feab1e1e748a7f82: 'Best Costume',
      '94981b8a273bef8c5c9d8dbb': 'Best Costume Design',
      '9e2b1750e0ee636e7d28f4a8': 'Best Costumes',
      '833a98ad422e5573235b6bb2': 'Best Director',
      '578febce7942eff684e89336': 'Best DVD Collection',
      '9c354aaec5257c15f3654251': 'Best DVD Special Edition',
      b494656df6bbe28f74b4ae67: 'Best DVD Special Edition Release',
      '3b24f093f1520945437b85ac': 'Best DVD/Blu-Ray Special Edition Release',
      ee99682a00dc62e83e34e50e: 'Best Editing',
      '4fd7ee01f8d451629aa882d4': 'Best Fantasy Film',
      '6f1255c0a88adf53a11874b2': 'Best Horror Film',
      f0ab91bd2921e0bd31fb500b: 'Best Make-up',
      c730b8e47577f01574e9a302: 'Best Music',
      '16e4f441ebadf20d114710e4': 'Best New Media Television Series',
      a0d7861dc6301788c83c87e5: 'Best Performance by a Younger Actor',
      '0ac7c9ae96a3a5afc2c46539':
        'Best Performance by a Younger Actor in a Television Series',
      '74d359e81c5119158bd12c06': 'Best Presentation on Television',
      '12ea16d32c5b60a1eaa2e6af': 'Best Production Design',
      f31c4bc0fe743c5a0c8835c5: 'Best Science Fiction Film',
      '16a4df15595684906961ec92': 'Best Special Effects',
      '1e8c60f2ae6cef323a6c3373': 'Best Streaming Horror & Thriller Series',
      '3c0a856a745ad6ae83986a5c': 'Best Supporting Actor',
      '83e32b8f54b88830a08e38eb': 'Best Supporting Actress',
      d96e3c5ea33814228a0d3226:
        'Best Supporting Actress in Streaming Presentation',
      '2599d579fa06be944ecf2363': 'Best Thriller Film',
      db683c1cbeb67c83bd1425c2: 'Best Writer',
      c96092433dd13c7cef968834: 'Best Writing',
      '68f37eba616f81e32a5c6073': 'Best Youth-Oriented Series on Television',
      '1b808564f292dd66bb25e614': 'Outstanding Art Direction',
      '5832e02dd5405b33283c1cf7': 'Outstanding Editing',
      f545ba0233cf203bfd7a0ed0: 'Outstanding Set Decoration',
      '39ff16805d03c5131a12c7b6': 'Outstanding Sound',
    },
  },
  '1a2c1d3cd91f28f4a9a006c0': {
    title: 'Primetime Emmy',
    icon: 'emmyAward',
    nominations: {
      '5ab5857f6f743454266cdff6': 'Outstanding Casting for a Drama Series',
      ddb969d7fac4fcc92c703429:
        'Outstanding Cinematography for a Limited Series or Movie',
      e671bdf27d3fc7fddb181b19:
        'Outstanding Cinematography for a Miniseries or Movie',
      '280d6a00be332b6b89715c6c':
        'Outstanding Cinematography for a Single-Camera Series (Half-Hour)',
      '70d5d629b28445b753e1013f': 'Outstanding Directing for a Limited Series',
      '7939ed66dc64287e900e1e9b':
        'Outstanding Individual Achievement in Animation',
      '29e8203d8515978cffb58e73':
        'Outstanding Lead Actor in a Miniseries or a Movie',
      '94e2dce3d189880e26ea101d': 'Outstanding Limited Series',
      '53fbb05de67279eec339d505': 'Outstanding Main Title Design',
      '8398a8affe138c5cd5f0bc8e':
        'Outstanding Music Composition for a Limited Series, Movie or Special (Original Dramatic Score)',
      '728e3dfea021591b694ea21a':
        'Outstanding Music Composition for a Miniseries, Movie or a Special (Original Dramatic Score)',
      d995147b8d12836706fa5c28:
        'Outstanding Music Composition for a Series (Original Dramatic Score)',
      '9aa3d737fe88558eabeac9a7': 'Outstanding Music Supervision',
      '7b2f4f89234bad254e365b21': 'Outstanding Original Main Title Theme Music',
      c488326558bce80b9b11886c:
        'Outstanding Production Design for a Narrative Period or Fantasy Program (One Hour or More)',
      '6547c9d134e706fecd0b2f54':
        'Outstanding Production Design for a Narrative Program (Half-Hour)',
      b2fb236613dded8d2bf7a7ae: 'Outstanding Prosthetic Makeup',
      '6662bde365bc2dc9a1464e20':
        'Outstanding Single-Camera Picture Editing for a Drama Series',
      '5d2390ec41e3f55dd047561f':
        'Outstanding Single-Camera Picture Editing for a Limited Series or Movie',
      '68c05e3c8dcee6feec24ba42':
        'Outstanding Single-Camera Picture Editing for a Miniseries or a Movie',
      '6c5151b0313f8d2e7ce195a8':
        'Outstanding Sound Editing for a Comedy or Drama Series (Half-Hour and Animation)',
      '3b319c68924d60e2fc3828c7':
        'Outstanding Sound Editing for a Comedy or Drama Series (One Hour)',
      '4f5a5072bb27ff36f56e3f52':
        'Outstanding Sound Editing for a Limited Series, Movie or Special',
      ac3f95faccfd2d1e3721fb31:
        'Outstanding Sound Editing for a Miniseries, Movie or a Special',
      feea8d653aff5e8ed3b49ed9: 'Outstanding Sound Editing for a Series',
      edf5b2521e993b50216b11f6:
        'Outstanding Sound Mixing for a Comedy or Drama Series (Half-Hour and Animation)',
      '488a096cf7ab48569468326d':
        'Outstanding Sound Mixing for a Comedy or Drama Series (One Hour)',
      cbf13115512f006e9c0a75b3:
        'Outstanding Sound Mixing for a Limited Series or Movie',
      '894520bb19331797921323d1': 'Outstanding Special Visual Effects',
      '8b569ae460faf68f62c6e0de':
        'Outstanding Special Visual Effects for a Series',
      f1a79e0637a9fa136a9a4068:
        'Outstanding Special Visual Effects in a Supporting Role',
      b21c6419be444e75704c5049:
        'Outstanding Special Visual Effects in a Supporting Role,',
      '6a4299150fbe5c4629e2d234':
        'Outstanding Stunt Coordination for a Drama Series Limited Series or Movie',
      '45d2827d8e359689346f0113':
        'Outstanding Stunt Coordination for a Drama Series, Limited of Anthology Series or Movie',
      a5f662a8627f20947169716b:
        'Outstanding Supporting Actor in a Miniseries or a Movie',
      '4c5a3e35a90874b09bc2ca82': 'Outstanding Television Movie',
      b3223054f8d10cc1dc18dab8: 'Outstanding Writing for a Limited Series',
      '6364903f149f296b7d4ff858':
        'Outstanding Writing for a Miniseries or a Dramatic Special',
    },
  },
  '26769a9739cc8860c6c61e58': {
    title: 'Jupiter',
    icon: 'jupiterAward',
    nominations: {
      '33edd32baf739d5d22fd0194': 'Best German TV Actor',
      '75c418086169bb9bfad22742': 'Best International Actor',
      '1d0cbd9bdf8d449dd9d3a049': 'Best International Director',
      '328bb2fb3f0f4d04fe349af9': 'Best International Film',
    },
  },
  ec5ae1c2e4971f204bb68398: {
    title: 'Annie',
    icon: 'annieAward',
    nominations: {
      a9037f3aa3a3d4ea5a8b15e3: 'Best Animated Effects',
      d320da0100870f69a84d68bf: 'Best Animated Feature',
      f14fd7b05410175b6a6fcfc2: 'Best Animated Television Production',
      ad93ae19280ad3214f292797:
        'Best Animated Television Production Produced for Children',
      f8285f6e40920df01a235428:
        'Best Character Animation in a Feature Production',
      '9b1f0211d22f7acb70e70ab7':
        'Best Character Animation in a Television Production',
      '60ce8a3c767c11ed4ac8d364':
        'Best Character Design in an Animated Feature Production',
      '062ab38a1eebda0a6523f479':
        'Best Directing in an Animated Television Production',
      '4e2ee885e7cf3e5f4d542b74':
        'Best Directing in an Animated Television Production or Short Form',
      f1c105e3137d2910d680375e:
        'Best Production Design in an Animated Feature Production',
      '5916dea5453e66e6e3cf6d04':
        'Best Storyboarding in an Animated Feature Production',
      '69f15e4b63396d57846793ca':
        'Best Storyboarding in an Animated Television Production',
      '753a6de081cfb61329857303':
        'Best Voice Acting in an Animated Feature Production',
      '71eae391c09ce0ff3a1b117a':
        'Best Writing in an Animated Feature Production',
      aa11cd637ee092d148c338a1:
        'Outstanding Achievement in Production Design in an Animated TV/Broadcast Production',
      f5439e711a063466436160a1:
        'Outstanding Achievement in Storyboarding in an Animated TV/Broadcast Production',
      a365257c706d3886fa45fddb: 'Outstanding Character Animation',
    },
  },
  '539b7c0eaba8eec432e9e48e': {
    title: 'MTV Movie Award',
    icon: 'mtvAward',
    nominations: {
      '50014cd8ee393b9ebccdc8c7': 'Best Action Performance',
      acd9c13a712776ce89882310: 'Best Action Sequence',
      b1a22dce3c4e70b2efc97e48: 'Best Breakthrough Performance',
      '226f592d3e4aa3aee884ac7a': 'Best Duo',
      '2ad0546db7ed787dc5520cb7': 'Best Female Performance',
      '9eafe48caab08956175c83a9': 'Best Fight',
      '56be8a980921154911b256df': 'Best Hero',
      d64ff2b58f39570c045633a3: 'Best Male Performance',
      '614cd93680e162a7cae6b394': 'Best Movie',
      ec60c564d2af4dfb3b64a6ff: 'Best Musical Moment',
      '25758210e1b61fdd265c55d7': 'Best On-Screen Team',
      e5cde4093123c2cf682db54c: 'Best On-Screen Transformation',
      d72771fa15e0eb9b00b39634: 'Best Performance',
      c0aed387af4ee8e124ce1738: 'Best Performance in a Movie',
      '911051bf5542ee1a6624de64': 'Best Performance in a Show',
      '72a0faef78adc41fccc2d4a7': 'Best Scared-As-S**t Performance',
      '3e85e83e29c232851d45d492': 'Best Scared-As-Shit Performance',
      '3f58d6a962a66a92727b8df5': 'Best Show',
      da9059da21e5adb0eafc94b2: "Best Summer Movie You Haven't Seen Yet",
      ec57f6aed9ca57977e1e6d30: 'Best Villain',
      '7cd6d22c66f01312b151073f': 'Best Virtual Performance',
      c447f2859c4b201a5b9e0c1b: 'Breakthrough Male Performance',
      '4afcea49d2c2e8ceeb6a255d': 'Breakthrough Performance',
      '9e3cb11e9d9356e405229a2c': 'Lifetime Achievement',
      eca443431f1be3d3dd595883: 'Most Desirable Female',
      '53d156002961b98bd60f30d6': 'Movie of the Year',
    },
  },
};

export { awardsConfig, type AwardsConfig };
