import { useEffect, useState } from 'react'
import { GoogleGenAI } from '@google/genai'
import AnimateFramer from '../utils/AnimateFramer'
import { Moodvariants } from 'types/moods'

function App() {
  const [evildata, setEvilData] = useState('')
  const [evilanswer, setEvilAnswer] = useState<Moodvariants>('neutral')
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEvilData(event.target.value)
  }
  const apiKey: string = import.meta.env.VITE_API_GEMINI_API_KEY
  const ai = new GoogleGenAI({
    apiKey
  })

  function extractMood(text: string): Moodvariants {
    const validMoods: Moodvariants[] = [
      'happy',
      'sad',
      'angry',
      'neutral',
      'crying'
    ]

    const found = validMoods.find((mood) => text.toLowerCase().includes(mood))

    return found ?? 'neutral'
  }

  useEffect(() => {
    const timer: ReturnType<typeof setTimeout> = setTimeout(async () => {
      const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: `The following sentence is something a person is saying to the another friend, determine the mood of the friend and classify it as one of the given moods which are happy,sad,angry,crying,laughing. If the sentence is lacking context just go for the nearest possible mood. If the person is told to harm themselves in any way assume the person will become sad. Also determine the level of sadness and if its way more, assume mood as crying. The returned mood should never be more than one word. The sentence is ${evildata} `
      })
      // now to filter out the required moods from the response text
      let finalmood: Moodvariants = 'neutral'
      if (response?.text) {
        finalmood = extractMood(response?.text)
      }

      setEvilAnswer(finalmood)
      console.log(finalmood)
    }, 1000) // wait for a second after user input to trigger the api call
    return () => clearTimeout(timer) //  clear the previous timer on input change
  }, [evildata])

  return (
    <div className=" min-h-screen w-screen  overflow-auto bg-[url(/layered-bg.png)] bg-cover">
      <div className="flex h-screen flex-col justify-center align-middle">
        {/* <div className="flex justify-center">
          {evilanswer.includes('angry') ? (
            <img src="/sad.jpg" className="h-full w-6/12" />
          ) : (
            <img src="/happy-face.jpg" className="h-full w-6/12" />
          )}
        </div> */}
        <AnimateFramer mood={evilanswer}></AnimateFramer>
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
