import React, { useEffect, useState } from 'react'
import NavbarLogueado from '../Components/NavbarLogueado';
import axios from 'axios'
import { useHistory } from 'react-router';
import '../App.css'

function Carrito() {

    const [products, setProducts] = useState([])
    const [cantidad, setCantidad] = useState()
    const [resulta, setResulta] = useState(0)
    const [precios, setPrecios] = useState([])
    const history = useHistory()

    const idCart = localStorage.getItem('idCart')
    const idUser = localStorage.getItem('idUser')



    const GetProductsCart = async () => {
        let suma = 0
        const res = await axios.get(`http://localhost:3001/api/v1/carritos/${idCart}/`)
        const preciossss = res.data.oneCart.producto.map(i => i.precio)
        for (let i = 0; i < preciossss.length; i++) {
            const element = preciossss[i];
            suma += Number(element)

        }

        setPrecios(suma)
        setProducts(res.data.oneCart.producto)
    }

    const handleDeleteOneProduct = async (e) => {
        const idProd = e.target.id
        const res = await axios.delete(`http://localhost:3001/api/v1/carritos/${idCart}/productos/${idProd}`)
        GetProductsCart()
    }

    const handlePricexCant = (values) => {
        const { price, id, count } = values
        let resultado = 0
        resultado = Number(price) * count
        return resultado
    }

    const handleMerCadoPaGo = async () => {
        const res = await axios.post(`http://localhost:3001/api/v1/carritos/${idCart}/${idUser}/payCart`, {products})
    }

    useEffect(() => {
        GetProductsCart()
    }, [])


    const productos = products.map((p, index) =>

        <tr key={index}>
            <th scope="row"></th>
            <td>{p.nombre}</td>
            <td>{p.descripcion}</td>
            <td> <img src={p.foto} alt="" style={{ width: '2rem' }} /></td>
            <td>{p.precio}</td>
            <td><input type="number" className='tdInput' onChange={(e) => { setCantidad(e.target.value); handlePricexCant({ price: p.precio, id: p._id ? p._id : p.id, count: e.target.value }) }} /></td>
            <td><button type="submit" className='btn btn-danger' id={p._id} onClick={handleDeleteOneProduct}>Eliminar</button></td>
            <td><input type="number" className='tdInput' value={handlePricexCant} /></td>
        </tr>
    )

    return (
        <>
            <NavbarLogueado />
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Descripcion</th>
                        <th scope="col">Foto</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col">Acciones</th>
                        <th scope="col">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.length !== 0 ? productos : <th scope="col">No hay Productos Cargados en el Carrito Todavia</th>}
                </tbody>
            </table>
            <div>
                TOTAL {precios}
            </div>

            <button type="submit" className='btn btn-primary' onClick={handleMerCadoPaGo}>PAGAR</button>
        </>
    )
}

export default Carrito;