import Http from 'utils/Http'
import { APP_API_BASEURL } from 'configs'

export interface CaseData {
  kode_penyakit: string
  nama_penyakit: string
  des_penyakit: string
  gambar_penyakit: string
  posterior: number
  percentage: number
}

export interface PredictApi {
  prediction: CaseData
  classification: CaseData[]
}

class Case extends Http {
  BASE_URL = APP_API_BASEURL + '/api/cases'

  public predict(indications: string[]) {
    return this.get<PredictApi>(`/predict?indications=${indications.join(',')}`)
  }
}

export default new Case()
