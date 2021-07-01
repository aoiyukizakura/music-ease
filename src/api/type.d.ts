interface params {
  timestamp?: number,
  limit?:number,
  [key: string]: any
}
// 推荐歌单
interface IRecommendPlaylist {
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
interface IHighQualityPlaylistParam {
  cat?: string,
  limit?: number,
  before?: number
}
//网友精选碟
type ItopPlaylistParam = {
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
