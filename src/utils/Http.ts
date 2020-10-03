interface HttpResponse<T> {
  code: number
  status: string
  message: string
  error: boolean
  data?: T
}

abstract class Http {
  protected abstract BASE_URL: string

  private responseHandler<T>(response: Response): Promise<T> {
    return response.json()
  }

  protected get<T>(
    endpoint: string = '',
    requestInit?: RequestInit
  ): Promise<HttpResponse<T>> {
    return fetch(this.BASE_URL + endpoint, requestInit).then((res) =>
      this.responseHandler(res)
    )
  }

  protected post<K, T = K>(
    endpoint: string,
    requestBody: K,
    headers?: any
  ): Promise<HttpResponse<T>> {
    return fetch(this.BASE_URL + endpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        ...headers
      },
      body: JSON.stringify(requestBody)
    }).then((res) => this.responseHandler(res))
  }

  protected put<K, T>(
    endpoint: string,
    requestBody: K,
    headers?: any
  ): Promise<HttpResponse<T>> {
    return fetch(this.BASE_URL + endpoint, {
      method: 'PUT',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        ...headers
      },
      body: JSON.stringify(requestBody)
    }).then((res) => this.responseHandler(res))
  }
}

export default Http
