import { AxiosPromise } from "axios";
import { LyricResponse, TrackDetail } from "/@/index.d";
import request from "../utils/request";

/**
 * 获取歌曲详情
 * 说明 : 调用此接口 , 传入音乐 id(支持多个 id, 用 , 隔开), 可获得歌曲详情(注意:歌曲封面现在需要通过专辑内容接口获取)
 * @param {string} ids - 音乐 id, 例如 ids=405998841,33894312
 */
export function getTrackDetail(ids: string | number): AxiosPromise<TrackDetail> {
  return request({
    url: '/song/detail',
    method: 'get',
    params: {
      ids,
    },
  })
}
/**
 * 获取歌词
 * 说明 : 调用此接口 , 传入音乐 id 可获得对应音乐的歌词 ( 不需要登录 )
 * @param {number} id - 音乐 id
 */
export function getLyric(id: number): AxiosPromise<LyricResponse> {
  return request({
    url: '/lyric',
    method: 'get',
    params: {
      id,
    },
  })
}