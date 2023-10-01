import { useEffect } from "react";
import { useState } from "react";

function App() {
  class Translate {
    constructor(id, uz, en) {
      this.id = id;
      this.uz = uz;
      this.en = en;
    }
  }
  const [translates, setTranslates] = useState([])
  const [timer, setTimer] = useState(25)
  const [values, setValues] = useState({
    uz: "",
    en: ""
  })
  const [randomWord, setRandomWord] = useState("")
  const [randomWordID, setRandomWordID] = useState(0)
  const [english, setEnglish] = useState(false)
  const [word, setWord] = useState("")
  function handleOnchange(e) {
    setValues((v) => ({...v, [e.target.name]: e.target.value}))
  }

  function handleAddTranstlate(e) {
    e.preventDefault()
    if (!values.en || !values.uz) return alert("Nothing to add!")
    const translate = new Translate(translates.length + 1, values.uz, values.en)
    setTranslates((v) => [...v, translate])
    setValues({
      uz: "",
      en: ""
    })
  }

  function handleDeleteTranslate(id) {
    setTranslates(translates.filter(t => t.id !== id))
  }
  
  function handleGetRandomWord() {
    if (!translates.length) return alert("No translations!")
    const randomNumber = Math.floor(Math.random() * translates.length);
    const uzORen = Math.floor(Math.random() * 2);
    let word = null
    if (uzORen) {
      word = (translates[randomNumber].uz);
      setEnglish(false)
    }
    else {
      word = (translates[randomNumber].en);
      setEnglish(true)
    }
    setRandomWordID(translates[randomNumber].id)
    setRandomWord(word)
    setTimer(25)
  }

  function check(e) {
    if (!word) return alert("Word not found")
    e.preventDefault()
    const check = translates.find(t => t.id === randomWordID)
    if (!english) {
      if (check.en === word) {
      setRandomWord("")
      setWord("")
      setTimer(25)
      return alert("Nice work")
      }
    } else {
      if (check.uz === word) {
        setRandomWord("")
        setWord("")
        setTimer(25)
        return alert("Nice work")
        }
    }
  }

  useEffect(() => {
    if (randomWord) {
      if (timer > 0) {
        const interval = setInterval(() => {
          setTimer(prevSeconds => prevSeconds - 1);
        }, 1000);
        
        return () => {
          clearInterval(interval);
        };
      } else {
        alert("Time is up")
      }
    }
  }, [timer, randomWord]);

  return (
    <section className="w-full flex flex-col p-4 gap-5">
     <h1 className="w-full text-5xl text-center">Let's learn english</h1>
     <div className="w-full flex flex-col items-center mt-16">
      <form className="w-2/4 flex flex-col items-center p-4 gap-3" onSubmit={handleAddTranstlate}>  
        <div className="w-2/3 flex flex-col text-lg">
        <label htmlFor="eng">Enter english word.</label>
        <input onChange={handleOnchange} value={values.en} type="text" name="en" id="eng" className="border rounded p-1" placeholder="example: Book"/>
        </div>
        <div className="w-2/3 flex flex-col text-lg">
        <label htmlFor="uz">Enter uzbek word.</label>
        <input onChange={handleOnchange} value={values.uz} type="text" name="uz" id="uz" className="border rounded p-1" placeholder="example: Kitob"/>
        </div>
        <button type="submit" className="w-2/3 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">ADD</button>
      </form>
      <ul className="w-2/6 p-3 flex flex-col gap-2">
        {
          translates.length ? translates.map((t) => {
            return (
        <li className="flex w-full justify-between border rounded-lg p-1" key={t.id}>
          <span className="w-full flex justify-evenly items-center"><span>English Word: {t.en}</span><span>Uzbek word: {t.uz}</span></span>
          <button onClick={() => handleDeleteTranslate(t.id)} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">DELETE</button>
        </li>
            )
          }) : null
        }
      </ul>
     </div>
     <div className="w-full flex flex-col items-center mt-16 gap-5">
        <div className="w-2/6 flex justify-between">
        <button onClick={() => handleGetRandomWord()}  className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-full text-sm px-5 py-2.5 text-center">
          Get Random Word
        </button>
        <h3 className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-full text-sm px-3.5 py-2.5 text-center">{timer}</h3>
        </div>
        <form className="w-2/4 flex flex-col items-center p-4 gap-3" onSubmit={check}>
        <input type="text" name="generated_text" className="w-2/3 border rounded p-1" disabled  placeholder="No text yet" value={randomWord}/>
        <input type="text" name="translate_text" className="w-2/3 border rounded p-1" placeholder="Enter there the translate of text." onChange={(e) => setWord(e.target.value)} value={word}/>
        <button  className="w-2/3 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
          CHECK
        </button>
        </form>
     </div>
    </section>
  )
}

export default App
