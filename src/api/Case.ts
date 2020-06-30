import Http from 'utils/Http'
import { API_BASEURL } from 'configs'

class CaseApi extends Http {
  BASE_URL = API_BASEURL

  public predict(indications: string[]) {
    return this.get(`/predict?indications=${indications.join(',')}`)
  }
}

export default new CaseApi()
