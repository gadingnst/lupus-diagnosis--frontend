import Http from 'utils/Http'
import { APP_API_BASEURL } from 'configs'

export interface CaseData {
  code: string
  name: string
  idName: string
  posterior: number
  percentage: number
}

export interface PredictApi {
  prediction: CaseData
  classification: CaseData[]
}

class Case extends Http {
  BASE_URL = APP_API_BASEURL + '/cases'

  public predict(indications: string[]) {
    return this.get<PredictApi>(`/predict?indications=${indications.join(',')}`)
  }
}

export default new Case()
