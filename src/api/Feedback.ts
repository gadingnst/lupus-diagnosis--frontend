import Http from 'utils/Http'
import { APP_API_BASEURL } from 'configs'

export interface FeedbackData {
  id?: string,
  saran: string
  kritik: string
}

class Feedback extends Http {
  BASE_URL = APP_API_BASEURL + '/api/feedbacks'

  public send(data: FeedbackData) {
    return this.post<FeedbackData>('/', data)
  }

  public getData() {
    return this.get<FeedbackData[]>('/')
  }

  public deleteData(id: number) {
    return this.delete(`/${id}`, { method: 'DELETE' })
  }
}

export default new Feedback()
