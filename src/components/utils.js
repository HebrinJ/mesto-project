export function checkResponse(result) {
  if (result.ok) {
      return result.json();
  }
  return Promise.reject(`Ошибка ${result.status}`);
}