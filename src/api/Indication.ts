import Http from 'utils/Http'
import { API_BASEURL } from 'configs'

export interface IndicationsApi {
  code: string
  name: string
  description: string
}

class Indication extends Http {
  BASE_URL = API_BASEURL + '/indications'

  public getData<T = IndicationsApi[]>(code: string = '') {
    return this.get<T>(`/${code}`)
  }
}

export default new Indication()
