export const delay = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
  
  export default async function getStorybook(
    time: number = 0,
    shouldError: boolean = false
  ) {
    await delay(time)
    const res = await fetch(
      `api/test.json`
    )
    if (!res.ok || shouldError) {
      throw new Error(`An error has occured: ${res.status}`)
    }
  
    return res.json()
  }