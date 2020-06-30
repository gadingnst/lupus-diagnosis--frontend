interface HttpResponse<T> {
  code: string
  status: string
  message: string
  error: boolean
  data?: T
}

abstract class Http {
  protected abstract BASE_URL: string

  protected get<T>(endpoint: string = ''): Promise<HttpResponse<T>> {
    return fetch(this.BASE_URL + endpoint).then((res) => res.json())
  }

  protected post<K, T>(
    endpoint: string,
    requestBody: K
  ): Promise<HttpResponse<T>> {
    return fetch(this.BASE_URL + endpoint, {
      method: 'POST',
      body: JSON.stringify(requestBody)
    }).then((res) => res.json())
  }

  protected put<K, T>(
    endpoint: string,
    requestBody: K
  ): Promise<HttpResponse<T>> {
    return fetch(this.BASE_URL + endpoint, {
      method: 'PUT',
      body: JSON.stringify(requestBody)
    }).then((res) => res.json())
  }
}

export default Http
