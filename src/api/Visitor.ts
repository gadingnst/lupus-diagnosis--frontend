import Http from 'utils/Http'
import { APP_API_BASEURL } from 'configs'

export interface VisitorApi {
	id_pengunjung?: string
	nama_pengunjung: string
}

class Visitor extends Http {
  BASE_URL = APP_API_BASEURL + '/api/visitors'

  public add<T = VisitorApi>(data: Partial<VisitorApi>) {
    return this.post<T>('/', data)
  }
}

export default new Visitor()
