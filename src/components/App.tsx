import { useEffect, useState } from 'react'
import { GoogleGenAI } from '@google/genai'

function App() {
  const [evildata, setEvilData] = useState('')
  const [evilanswer, setEvilAnswer] = useState('')
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEvilData(event.target.value)
  }
  let timer: ReturnType<typeof setTimeout>

  useEffect(() => {
    clearTimeout(timer)

    timer = setTimeout(async () => {
      const ai = new GoogleGenAI({
        apiKey: 'AIzaSyCNMnH8zZHnyJfBrBr2ESMhlj9Zwcy7Vg4'
      })
      const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: `Determine the mood of the following sentence and classify it as one of the given moods i.e happy,sad,angry,horny. If the sentence is lacking context just go for the nearest possible mood. The sentence is ${evildata} `
      })
      setEvilAnswer(response?.text ? response.text : 'No response')
    }, 1000) // wait for a second after the user finished input before sending it to gemini
  }, [evildata])

  return (
    <div className="h-screen w-screen bg-primary">
      <div className="flex h-screen w-screen flex-col justify-center align-middle">
        <div className="flex justify-center">
          <img src="/happy-face.jpg" className="h-full w-6/12" />
        </div>
        <div className="flex justify-center text-4xl text-white">
          Make Timothy Cry with your Evil Words 🐼
        </div>

        <div className="flex justify-center ">
          <textarea
            name="evilword"
            value={evildata}
            onInput={handleChange}
            className="w-3/5 rounded-xl bg-gray-300 px-4 py-2 outline-none"
            placeholder="Enter your words"
          ></textarea>
        </div>
        <div className="text-center font-serif text-xl text-white">
          {evilanswer}
        </div>
      </div>
    </div>
  )
}

export default App
