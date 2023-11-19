import { useState } from "react"
import { Container } from "./style.js"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function NewOrder() {
  const goTo = useNavigate()
  const [client, setClient] = useState("")
  const [cake, setCake] = useState("")
  const [value, setValue] = useState("")
  const [price, setPrice] = useState("")

  async function sendLogin(e) {
    e.preventDefault()

    // "clientId": "1",
    // "cakeId": "1",
    // "quantity": "1",
    // "totalPrice": "200"

    const post = {
      clientId: client,
      cakeId: cake,
      quantity: value,
      totalPrice: price
    }

    try {
      const signIn = await axios.post(`${process.env.REACT_APP_API_URL}/orders`, post)
      console.log(signIn.status)
      goTo('/')

    } catch (error) {
      if (error.name === "AxiosError") alert("Não foi possível cadastrar esse pedido, confira os dados")
    }
  }

  return (
    <>
      <Container>
        <h1>Novo Pedido</h1>
        <form onSubmit={sendLogin}>
          <input type="number" name="ClientId" placeholder="id cliente" value={client} onChange={(e) => setClient(e.target.value)}/>
          <input type="number" name="CakeId" placeholder="id bolo" value={cake} onChange={(e) => setCake(e.target.value)} />
          <input type="number" name="Value" placeholder="quantidade" value={value} onChange={(e) => setValue(e.target.value)} />
          <input type="number" name="CakeId" placeholder="valor total" value={price} onChange={(e) => setPrice(e.target.value)} />
          <button type="submit">Registrar</button>
        </form>
      </Container>
    </>
  )
}