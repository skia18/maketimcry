import { useEffect, useState } from 'react'
import { GoogleGenAI } from '@google/genai'

function App() {
  const [evildata, setEvilData] = useState('')
  const [evilanswer, setEvilAnswer] = useState('')
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEvilData(event.target.value)
  }
  const apiKey: string | undefined = process.env.REACT_APP_GEMINI_API_KEY

  useEffect(() => {
    const timer: ReturnType<typeof setTimeout> = setTimeout(async () => {
      const ai = new GoogleGenAI({
        apiKey
      })
      const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: `Determine the mood of the following sentence and classify it as one of the given moods i.e happy,sad,angry,horny. If the sentence is lacking context just go for the nearest possible mood. The sentence is ${evildata} `
      })
      setEvilAnswer(response?.text ? response.text : 'No response')
      console.log('updated')
      console.log(typeof response?.text)
    }, 1000) // wait for a second after user input to trigger the api call
    return () => clearTimeout(timer) //  clear the previous timer on input change
  }, [evildata])

  return (
    <div className=" min-h-screen w-screen  overflow-auto bg-[url(/layered-bg.png)] bg-cover">
      <div className="flex h-screen flex-col justify-center align-middle">
        <div className="flex justify-center">
          {evilanswer.includes('angry') ? (
            <img src="/sad.jpg" className="h-full w-6/12" />
          ) : (
            <img src="/happy-face.jpg" className="h-full w-6/12" />
          )}
        </div>
        <div className="flex justify-center text-4xl text-txt-main">
          Make Timothy Cry with your Evil Words 🐼
        </div>
        <div className="flex justify-center ">
          <textarea
            name="evilword"
            value={evildata}
            onInput={handleChange}
            className="w-3/5 rounded-xl bg-tertiary px-4 py-2 font-serif text-txt-subtle outline-none"
            placeholder="Enter your words"
          ></textarea>
        </div>
        <div className=" text-center font-serif text-xl text-txt-main">
          {evilanswer}
        </div>
      </div>
    </div>
  )
}

export default App
