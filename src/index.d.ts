interface response {
  hasTaste: boolean,
  code: number,
  category: number,
  result: result,
  [key: string]: any
}
interface resultObject {
  [key: string]: any
}
type result = Array<resultObject>