import Header from "./components/Header/Header"
import Input from "./components/Input/Input"
import Button from "./components/Button/Button"
import ButtonGet from "./components/Button/ButtonGet"
import HeaderTrain from "./components/Header/HeaderTrain"
import DocumentationTrain from "./components/DocumentationTrain/DocumentationTrain"
import Answer from "./components/Answer"
import AnswerCustom from "./components/AnswerCustom"
import axios from 'axios'
import './App.css'
import { useState } from "react"
import Documentation from "./components/DocumentationTrain/DocumentationTrain"
import { Spin } from 'antd';

export default function App() {

  const [query, setQuery] = useState('')
  const [answer, setAnswer] = useState([])
  const [pageId, setPageId] = useState(0)
  const [trainData, setTraindata] = useState(null)
  const [model, setModel] = useState('')
  const [answerCustom, setAnswerCustom] = useState([])
  const [istrain, setIstrain] = useState(1)
  let port = '87.228.13.226:8000/api'


  function onChange(e) {
    console.log(e.target.value)
    setQuery(e.target.value)
  }

  function onClick() {
    // axios.get('http://0.0.0.0:8000/isalive').then(responce => { for docker
    //   console.log(responce)
    // })
    // axios.get('http://localhost:7778/isalive').then(responce => {
    //   console.log(responce)
    // })
    // axios.post(`http://localhost:7778/getAnswer?quastion=${query}'`).then(responce => {
    //   // answer.map((answ) => (<Answer props={answ} />))

    //   setAnswer(responce.data.answer)
    //   console.log('resp:', answer)
    //   answer.map((answ) => console.log(answ))
    //   console.log('finish')


    // })

    setAnswer(['wait'])
    // axios.post(`http://${port}/getAnswer?quastion=${query}'`).then(responce => {
    // answer.map((answ) => (<Answer props={answ} />))

    axios.post(`/api/getAnswer?quastion=${query}`).then(responce => {
      setAnswer(responce.data.answer)
      console.log('resp:', answer)
      answer.map((answ) => console.log(answ))
      console.log('finish')


    })
    console.log('Button clicked')
  }

  function onClickMenu1() {
    console.log('PageButton1')
    setPageId(0)
  }

  function onClickMenu2() {
    console.log('PageButton2')
    setPageId(1)
  }

  function onChangeFile(event) {
    console.log('change file')
    // setTraindata(e.targer.files[0])

    //console.log(event.target.files[0])
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const jsonData = JSON.parse(e.target.result);
          //console.log('json', jsonData)
          setTraindata(jsonData)
        } catch (error) {
          console.error("Error with open file", error);
        }
      };
      reader.readAsText(file)
    }
    console.log('train', trainData)
  }

  function onChangeModel(e) {
    setModel(e.target.value)
  }

  function onClickSendTrain() {
    setIstrain(2)
    setAnswerCustom([1, 2])
    console.log('train')

    axios.post(`http://${port}/trainModel?model=${model}`, trainData).then(responce => {
      console.log(responce.data)
      setAnswerCustom(responce.data.predicted)
      console.log('custom', answerCustom)
      setIstrain(1)
    })

  }
  return (


    <body>
      <div>
        <div className="top">
          <Header />
          <div className="menu-buttons-container">
            <Button isActive={pageId == 0} props='Query' onClick={onClickMenu1} />
            <Button isActive={pageId == 1} props='Make model' onClick={onClickMenu2} />
          </div>
        </div>
        {pageId == 0 ? <div>
          <div className="input-area">
            <Input onChange={onChange} onClick={onClick} />
          </div>
          <div><p>{answer.map((answ) => console.log(answ.empl))}</p></div>
          <div><p>{answer == ['wait'] ? <Spin /> : <div>{answer.map((answ) => <Answer empl={answ.empl} profArea={answ.profArea} />)}</div>}</p></div>
        </div> :
          <div>
            <HeaderTrain />
            <div className="">
              <div className="field">
                <input type="file" accept=".json" onChange={onChangeFile}></input>
              </div>
              <div className="field">
                <input onChange={onChangeModel} placeholder="write model..."></input>
              </div>
              <div className="field">
                <ButtonGet props="Start train" onClick={onClickSendTrain} />
              </div>
              <div>
                {/* <p>{answerCustom == ["wait"] ? <Spin /> : <div>{answerCustom.map((answ) => <AnswerCustom query={answ.query} emp={answ.emp} job={answ.job} dop={answ.dop} cond={answ.cond} />)}</div>}</p> */}
                {/* {answerCustom == ["wait"] ? <Spin /> : <div>{answerCustom.map((answ) => <AnswerCustom query={answ.query} emp={answ.emp} job={answ.job} dop={answ.dop} cond={answ.cond} />)}</div>} */}
                {istrain == 2 ? <div className="wait-scroll"> <Spin size="large" /> </div> : <div>{answerCustom.map((answ) => <AnswerCustom query={answ.query} emp={answ.emp} job={answ.job} dop={answ.dop} cond={answ.cond} />)}</div>}
              </div>


            </div>
            <DocumentationTrain />
          </div>
        }
      </div>
      {/* <div>
        <Spin />
      </div> */}
    </body>
  )
}