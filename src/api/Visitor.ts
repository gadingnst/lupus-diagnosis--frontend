import Http from 'utils/Http'
import { APP_API_BASEURL } from 'configs'

export interface VisitorApi {
  id_pengunjung?: string
  umur: number
  jenis_kelamin: string
  pekerjaan: string
}

class Visitor extends Http {
  BASE_URL = APP_API_BASEURL + '/api/visitors'

  public add<T = VisitorApi>(data: Partial<T>) {
    return this.post<Partial<T>, T>('/', data)
  }
}

export default new Visitor()
