import Http from 'utils/Http'
import { APP_API_BASEURL } from 'configs'

export interface IndicationsApi {
  kode_gejala: string
  gejala: string
  des_gejala: string
}

class Indication extends Http {
  BASE_URL = APP_API_BASEURL + '/indications'

  public getData<T = IndicationsApi[]>(code: string = '') {
    return this.get<T>(`/${code}`)
  }
}

export default new Indication()
