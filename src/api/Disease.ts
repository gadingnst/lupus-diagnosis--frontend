import Http from 'utils/Http'
import { APP_API_BASEURL } from 'configs'

export interface DiseaseApi {
  code: string
  name: string
  idName: string
}

class Disease extends Http {
  BASE_URL = APP_API_BASEURL + '/diseases'

  public getData<T = DiseaseApi[]>(code: string | null = null) {
    return this.get<T>(`/${code || ''}`)
  }
}

export default new Disease()
