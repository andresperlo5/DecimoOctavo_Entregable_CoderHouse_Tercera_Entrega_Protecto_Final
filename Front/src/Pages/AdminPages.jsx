import React, { useCallback, useEffect, useState } from 'react'
import NavbarAdmin from '../Components/NavbarAdmin';
import axios from 'axios'
import Swal from 'sweetalert2'

function AdminPages() {

    const [products, setProducts] = useState([])
    const [IdProduct, setIdProduct] = useState('')
    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [foto, setFoto] = useState('')
    const [precio, setPrecio] = useState('')
    const [stock, setStock] = useState('')
    const [timestamp, setTimestamp] = useState('')
    const [codigo, setCodigo] = useState('')
    const idAdmin = localStorage.getItem('idUser')


    const GetProducts = useCallback(async () => {
        const res = await axios.get('http://localhost:3001/api/v1/productos/')
        setProducts(res.data)
    }, [])

    const handleSubmitEdit = async (e) => {
        const idProd = e.target.id
        const res = await axios.get(`http://localhost:3001/api/v1/productos/${idProd}`)
        setIdProduct(res.data._id)
        setNombre(res.data.nombre)
        setDescripcion(res.data.descripcion)
        setFoto(res.data.foto)
        setPrecio(res.data.precio)
        setStock(res.data.stock)
        setTimestamp(res.data.timestamp)
        setCodigo(res.data.codigo)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const idProd = IdProduct
        const res = await axios.put(`http://localhost:3001/api/v1/productos/${idProd}/`, {
            nombre, descripcion, foto, precio, stock, timestamp, codigo
        })
        GetProducts()
    }

    const handleDelete = (e) => {
        const idProd = e.target.id
        Swal.fire({
            title: 'Estas Seguro Que Quiere Eliminar Este Producto?',
            text: "¡No podrás revertir esta accion!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borra este producto!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:3001/api/v1/productos/${idProd}/`)
                Swal.fire(
                    'Eliminado',
                    'Su Producto fue eliminado con Exito',
                    'success'
                )
                GetProducts()
            }
        })

       
    }

    useEffect(() => {
        GetProducts()
    }, [])

    const productos = products.map(p =>
        <div key={p._id ? p._id : p.id} className="card" style={{ width: '100%' }}>
            <img src={p.foto} className="card-img-top" alt="..." style={{ height: '18rem', border: '1px solid grey' }} />
            <div className="card-body">
                <h5 className="card-title">{p.nombre}</h5>
                <p className="card-text">{`Marca: ${p.descripcion}`}</p>
                <p className="card-text">{`Precio: ${p.precio}`}</p>
                <div className='d-flex justify-content-around'>
                    <div className='d-flex justify-content-around'>
                        <div>
                            <button type="button" class="btn btn-primary" id={p._id} data-bs-toggle="modal" data-bs-target="#exampleModal1" onClick={handleSubmitEdit}>
                                Editar
                            </button>

                        </div>
                        <div>
                            <button type="submit" className='btn btn-danger' id={p._id ? p._id : p.id} onClick={handleDelete}>Eliminar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <>
            <NavbarAdmin />
            <div className="container">
                <div className="card-group">
                    {productos}
                </div>
                <div>
                    <div class="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel1" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel1">Modificar Datos del Producto N°: {IdProduct}</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <form onSubmit={handleSubmit}>
                                        <div class="mb-3">
                                            <label for="exampleInputEmail1" class="form-label">Nombre del Producto</label>
                                            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='nombre' value={nombre} onChange={(e) => { setNombre(e.target.value) }} />
                                        </div>
                                        <div class="mb-3">
                                            <label for="exampleInputEmail1" class="form-label">Descripcion</label>
                                            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='descripcion' value={descripcion} onChange={(e) => { setDescripcion(e.target.value) }} />
                                        </div>
                                        <div class="mb-3">
                                            <label for="exampleInputPassword1" class="form-label">Foto URL</label>
                                            <input type="text" class="form-control" id="exampleInputPassword1" name='foto' value={foto} onChange={(e) => { setFoto(e.target.value) }} />
                                        </div>
                                        <div class="mb-3">
                                            <label for="exampleInputPassword1" class="form-label">Precio</label>
                                            <input type="text" class="form-control" id="exampleInputPassword1" name='precio' value={precio} onChange={(e) => { setPrecio(e.target.value) }} />
                                        </div>
                                        <div class="mb-3">
                                            <label for="exampleInputPassword1" class="form-label">Stock</label>
                                            <input type="text" class="form-control" id="exampleInputPassword1" name='stock' value={stock} onChange={(e) => { setStock(e.target.value) }} />
                                        </div>
                                        <div class="mb-3">
                                            <label for="exampleInputPassword1" class="form-label">Fecha y Hora de alta del Producto</label>
                                            <input type="text" class="form-control" id="exampleInputPassword1" name='timestamp' value={timestamp} onChange={(e) => { setTimestamp(e.target.value) }} />
                                        </div>
                                        <div class="mb-3">
                                            <label for="exampleInputPassword1" class="form-label">Codigo del Producto</label>
                                            <input type="text" class="form-control" id="exampleInputPassword1" name='codigo' value={codigo} onChange={(e) => { setCodigo(e.target.value) }} />
                                        </div>
                                        <button type="submit" class="btn btn-primary" id={IdProduct}  data-bs-dismiss="modal" aria-label="Close">Editar</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminPages;