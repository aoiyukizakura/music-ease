export interface params {
  timestamp?: number,
  limit?: number,
  [key: string]: any
}
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

//获取精品歌单
export interface IHighQualityPlaylistParam {
  cat?: string,
  limit?: number,
  before?: number
}
//网友精选碟
export type ItopPlaylistParam = {
  order?: 'new' | 'hot',
  cat?: string,
  limit?: number
}

//歌单分类

//所有榜单

//删除歌单

//新建歌单

//对歌单添加或删除歌曲

//每日推荐

//搜索
export interface ISearchUser {
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
  backgroundImgIdStr: string;
  anchor: boolean;
  avatarImgId_str: string;
  alg: string;
}


//登录类型
export enum LOGIN_TYPE {
  ACCOUNT,
  USERNAME,
}