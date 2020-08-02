import Http from 'utils/Http'
import { APP_API_BASEURL } from 'configs'

export interface AdminData {
  id_admin: string
  username: string
  email: string
  token?: string
}

interface LoginData {
  username: string
  email: string
  password: string
}

class Admin extends Http {
  BASE_URL = APP_API_BASEURL + '/admins'

  public async login(loginData: LoginData) {
    try {
      const response = await this.post<LoginData, any>('/login', loginData)
      if (response.data) {
        const result = await this.get<AdminData>('/info', {
          headers: {
            authorization: `Bearer ${response.data.token}`
          }
        })
        return {
          ...result,
          data: {
            ...result.data,
            token: response.data.token
          }
        }
      } else {
        throw response
      }
    } catch (err) {
      throw err
    }
  }
}

export default new Admin()
