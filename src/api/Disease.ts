import Http from 'utils/Http'
import { API_BASEURL } from 'configs'

export interface DiseaseApi {
  code: string
  name: string
  idName: string
}

class Disease extends Http {
  BASE_URL = API_BASEURL + '/diseases'

  public getData(code: string | null = null) {
    return this.get<DiseaseApi>(`/${code || ''}`)
  }
}

export default new Disease()
