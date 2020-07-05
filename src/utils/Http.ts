interface HttpResponse<T> {
  code: string
  status: string
  message: string
  error: boolean
  data?: T
}

abstract class Http {
  protected abstract BASE_URL: string

  private responseHandler<T>(response: Response): Promise<T> {
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    return response.json()
  }

  protected get<T>(endpoint: string = ''): Promise<HttpResponse<T>> {
    return fetch(this.BASE_URL + endpoint).then((res) =>
      this.responseHandler(res)
    )
  }

  protected post<K, T>(
    endpoint: string,
    requestBody: K
  ): Promise<HttpResponse<T>> {
    return fetch(this.BASE_URL + endpoint, {
      method: 'POST',
      body: JSON.stringify(requestBody)
    }).then((res) => this.responseHandler(res))
  }

  protected put<K, T>(
    endpoint: string,
    requestBody: K
  ): Promise<HttpResponse<T>> {
    return fetch(this.BASE_URL + endpoint, {
      method: 'PUT',
      body: JSON.stringify(requestBody)
    }).then((res) => this.responseHandler(res))
  }
}

export default Http
