import Http from 'utils/Http'
import { APP_API_BASEURL } from 'configs'

export interface IndicationsApi {
  kode_gejala: string
  gejala: string
  des_gejala: string
}

class Indication extends Http {
  BASE_URL = APP_API_BASEURL + '/api/indications'

  public getData<T = IndicationsApi[]>(code: string = '') {
    return this.get<T>(`/${code}`)
  }

  public updateData<T = IndicationsApi>(
    code: string,
    token: string,
    data: Partial<T>
  ) {
    return this.put<Partial<T>, IndicationsApi>(`/${code}`, data, {
      authorization: `Bearer ${token}`
    })
  }
}

export default new Indication()
