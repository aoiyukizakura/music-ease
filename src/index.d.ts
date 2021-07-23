// 推荐歌单
export interface IRecommendPlaylist {
  id: number,
  type: number,
  name: string,
  copywriter: string,
  picUrl: string,
  canDislike: boolean,
  trackNumberUpdateTime: number,
  playCount: number,
  trackCount: number,
  highQuality: boolean,
  alg: string
}

//每日推荐歌单

//获取歌单详情
export interface Artist {
  id: number;
  name: string;
  tns: any[];
  alias: any[];
}

export interface Album {
  id: number;
  name: string;
  picUrl: string;
  tns: any[];
  pic_str: string;
  pic: number;
}

export interface Quality {
  br: number;
  fid: number;
  size: number;
  vd: number;
}

export interface Track {
  name: string;
  id: number;
  pst: number;
  t: number;
  ar: Artist[];
  alia?: any[];
  pop: number;
  st: number;
  rt?: any;
  fee: number;
  v: number;
  crbt?: any;
  cf: string;
  al: Album;
  dt: number;
  h: Quality;
  m: Quality;
  l: Quality;
  a?: any;
  cd: string;
  no: number;
  rtUrl?: any;
  ftype: number;
  rtUrls: any[];
  djId: number;
  copyright: number;
  s_id: number;
  mark: number;
  originCoverType: number;
  originSongSimpleData?: any;
  single: number;
  noCopyrightRcmd?: any;
  rtype: number;
  rurl?: any;
  mst: number;
  cp: number;
  mv: number;
  publishTime: number;
}

export interface TrackId {
  id: number;
  v: number;
  t: number;
  at: number;
  alg?: any;
  uid: number;
  rcmdReason: string;
}

export interface Playlist {
  id: number;
  name: string;
  coverImgId: number;
  coverImgUrl: string;
  coverImgId_str: string;
  adType: number;
  userId: number;
  createTime: number;
  status: number;
  opRecommend: boolean;
  highQuality: boolean;
  newImported: boolean;
  updateTime: number;
  trackCount: number;
  specialType: number;
  privacy: number;
  trackUpdateTime: number;
  commentThreadId: string;
  playCount: number;
  trackNumberUpdateTime: number;
  subscribedCount: number;
  cloudTrackCount: number;
  ordered: boolean;
  description: string;
  tags: string[];
  updateFrequency?: any;
  backgroundCoverId: number;
  backgroundCoverUrl?: any;
  titleImage: number;
  titleImageUrl?: any;
  englishTitle?: any;
  officialPlaylistType?: any;
  subscribers: Subscriber[];
  subscribed?: any;
  creator: Creator;
  tracks: Track[];
  videoIds?: any;
  videos?: any;
  trackIds: TrackId[];
  shareCount: number;
  commentCount: number;
  remixVideo?: any;
  sharedUsers?: any;
  historySharedUsers?: any;
}

export interface FreeTrialPrivilege {
  resConsumable: boolean;
  userConsumable: boolean;
}

export interface ChargeInfoList {
  rate: number;
  chargeUrl?: any;
  chargeMessage?: any;
  chargeType: number;
}

export interface Privilege {
  id: number;
  fee: number;
  payed: number;
  realPayed: number;
  st: number;
  pl: number;
  dl: number;
  sp: number;
  cp: number;
  subp: number;
  cs: boolean;
  maxbr: number;
  fl: number;
  pc?: any;
  toast: boolean;
  flag: number;
  paidBigBang: boolean;
  preSell: boolean;
  playMaxbr: number;
  downloadMaxbr: number;
  rscl?: any;
  freeTrialPrivilege: FreeTrialPrivilege;
  chargeInfoList: ChargeInfoList[];
}

export interface IPlaylistDetailData {
  code: number;
  relatedVideos?: any;
  playlist: Playlist;
  urls?: any;
  privileges: Privilege[];
  sharedPrivilege?: any;
}

//获取精品歌单
export interface IHighQualityPlaylistParam {
  cat?: string,
  limit?: number,
  before?: number
}
//网友精选碟

export interface ITopPlaylist {
  name: string;
  id: number;
  trackNumberUpdateTime: number;
  status: number;
  userId: number;
  createTime: number;
  updateTime: number;
  subscribedCount: number;
  trackCount: number;
  cloudTrackCount: number;
  coverImgUrl: string;
  coverImgId: number;
  description: string;
  tags: string[];
  playCount: number;
  trackUpdateTime: number;
  specialType: number;
  totalDuration: number;
  creator: Creator;
  tracks?: any;
  subscribers: Subscriber[];
  subscribed?: any;
  commentThreadId: string;
  newImported: boolean;
  adType: number;
  highQuality: boolean;
  privacy: number;
  ordered: boolean;
  anonimous: boolean;
  coverStatus: number;
  recommendInfo?: any;
  shareCount: number;
  coverImgId_str: string;
  alg: string;
  commentCount: number;
}
export interface ITopPlaylistData {
  cat: string
  code: number
  more: boolean
  playlists: ITopPlaylist[]
  total: number
}

//歌单分类

//所有榜单
export interface IArtistToplist {
  coverUrl: string;
  name: string;
  upateFrequency: string;
  position: number;
  updateFrequency: string;
}

export interface IRankListData {
  code: number;
  list: IRankList[];
  artistToplist: IArtistToplist;
}
export interface IRankList {
  subscribers: any[];
  subscribed?: any;
  creator?: any;
  artists?: any;
  tracks?: any;
  updateFrequency: string;
  backgroundCoverId: number;
  backgroundCoverUrl?: any;
  titleImage: number;
  titleImageUrl?: any;
  englishTitle?: any;
  opRecommend: boolean;
  recommendInfo?: any;
  trackNumberUpdateTime: number;
  adType: number;
  subscribedCount: number;
  cloudTrackCount: number;
  userId: number;
  createTime: number;
  highQuality: boolean;
  coverImgId: number;
  trackCount: number;
  coverImgUrl: string;
  specialType: number;
  newImported: boolean;
  anonimous: boolean;
  updateTime: number;
  totalDuration: number;
  commentThreadId: string;
  trackUpdateTime: number;
  privacy: number;
  playCount: number;
  tags: any[];
  ordered: boolean;
  description: string;
  status: number;
  name: string;
  id: number;
  coverImgId_str: string;
  toplistType: string;
}

//删除歌单

//新建歌单

//对歌单添加或删除歌曲

//每日推荐

//搜索
export interface Artist {
  id: number;
  name: string;
  picUrl?: any;
  alias: any[];
  albumSize: number;
  picId: number;
  img1v1Url: string;
  img1v1: number;
  trans?: any;
}
export interface Album {
  id: number;
  name: string;
  artist: Artist;
  publishTime: number;
  size: number;
  copyrightId: number;
  status: number;
  picId: number;
  mark: number;
}
export interface Song {
  id: number;
  name: string;
  artists: Artist[];
  album: Album;
  duration: number;
  copyrightId: number;
  status: number;
  alias: any[];
  rtype: number;
  ftype: number;
  mvid: number;
  fee: number;
  rUrl?: any;
  mark: number;
}

export interface SearchResult {
  songs?: Song[];
  hasMore: boolean;
  songCount?: number;
  userprofileCount?: number
  userprofiles?: UserProfile[]
}
export interface Search {
  result: SearchResult;
  code: number;
}
//登录类型
export enum LOGIN_TYPE {
  USERNAME,
  ACCOUNT,
}

export interface AvatarDetail {
  userType: number;
  identityLevel: number;
  identityIconUrl: string;
}
export interface Creator {
  defaultAvatar: boolean;
  province: number;
  authStatus: number;
  followed: boolean;
  avatarUrl: string;
  accountStatus: number;
  gender: number;
  city: number;
  birthday: number;
  userId: number;
  userType: number;
  nickname: string;
  signature: string;
  description: string;
  detailDescription: string;
  avatarImgId: number;
  backgroundImgId: number;
  backgroundUrl: string;
  authority: number;
  mutual: boolean;
  expertTags?: any;
  experts?: any;
  djStatus: number;
  vipType: number;
  remarkName?: any;
  authenticationTypes: number;
  avatarDetail: AvatarDetail;
  avatarImgIdStr: string;
  anchor: boolean;
  backgroundImgIdStr: string;
  avatarImgId_str: string;
}
export interface Subscriber {
  defaultAvatar: boolean;
  province: number;
  authStatus: number;
  followed: boolean;
  avatarUrl: string;
  accountStatus: number;
  gender: number;
  city: number;
  birthday: number;
  userId: number;
  userType: number;
  nickname: string;
  signature: string;
  description: string;
  detailDescription: string;
  avatarImgId: number;
  backgroundImgId: number;
  backgroundUrl: string;
  authority: number;
  mutual: boolean;
  expertTags?: any;
  experts?: any;
  djStatus: number;
  vipType: number;
  remarkName?: any;
  authenticationTypes: number;
  avatarDetail?: any;
  avatarImgIdStr: string;
  anchor: boolean;
  backgroundImgIdStr: string;
  avatarImgId_str: string;
}
// 获取用户歌单

export interface UserPlayList {
  version: string;
  more: boolean;
  playlist: Playlist[];
  code: number;
}
//歌曲详情
export interface TrackDetail {
  songs: Track[];
  privileges: Privilege[];
  code: number;
}
//登录
export interface Account {
  id: number;
  userName: string;
  type: number;
  status: number;
  whitelistAuthority: number;
  createTime: number;
  salt: string;
  tokenVersion: number;
  ban: number;
  baoyueVersion: number;
  donateVersion: number;
  vipType: number;
  viptypeVersion: number;
  anonimousUser: boolean;
}
export interface Expert { }
export interface UserProfile {
  defaultAvatar: boolean;
  province: number;
  authStatus: number;
  followed: boolean;
  avatarUrl: string;
  accountStatus: number;
  gender: number;
  city: number;
  birthday: number;
  userId: number;
  userType: number;
  nickname: string;
  signature: string;
  description: string;
  detailDescription: string;
  avatarImgId: number;
  backgroundImgId: number;
  backgroundUrl: string;
  authority: number;
  mutual: boolean;
  expertTags?: any;
  experts?: Expert;
  djStatus: number;
  vipType: number;
  remarkName?: any;
  authenticationTypes: number;
  avatarDetail?: any;
  avatarImgIdStr: string;
  backgroundImgIdStr: string;
  anchor?: boolean;
  avatarImgId_str?: string;
  alg?: string;
  followeds?: number;
  follows?: number;
  eventCount?: number;
  playlistCount?: number;
  playlistBeSubscribedCount?: number;
}
export interface Binding {
  refreshTime: number;
  url: string;
  userId: number;
  tokenJsonStr: string;
  bindingTime: number;
  expiresIn: number;
  expired: boolean;
  id: number;
  type: number;
}
export interface LoginResponse {
  loginType: number;
  code: number;
  account: Account;
  token: string;
  profile: UserProfile;
  bindings: Binding[];
  cookie: string;
}
// 每日推荐
export interface Recommend {
  id: number;
  type: number;
  name: string;
  copywriter: string;
  picUrl: string;
  playcount: number;
  createTime: number;
  creator: Creator;
  trackCount: number;
  userId: number;
  alg: string;
}

export interface DailyRecommendResponse {
  code: number;
  featureFirst: boolean;
  haveRcmdSongs: boolean;
  recommend: Recommend[];
}

export interface RecommendReason {
  songId: number;
  reason: string;
}

export interface RecommendData {
  dailySongs: Track[];
  orderSongs: any[];
  recommendReasons: RecommendReason[];
}

export interface RecommendSongResponse {
  code: number;
  data: RecommendData;
}
export interface LikeList {
  ids: number[];
  checkPoint: number;
  code: number;
}
// 歌词

export interface Lrc {
  version: number;
  lyric: string;
}

export interface Klyric {
  version: number;
  lyric: string;
}

export interface Tlyric {
  version: number;
  lyric: string;
}

export interface LyricResponse {
  sgc: boolean;
  sfy: boolean;
  qfy: boolean;
  lrc: Lrc;
  klyric: Klyric;
  tlyric: Tlyric;
  code: number;
}