import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router'

function NavbarAdmin() {

    const history = useHistory()
    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [foto, setFoto] = useState('')
    const [precio, setPrecio] = useState('')
    const [stock, setStock] = useState('')
    const [codigo, setCodigo] = useState('')
    const idAdmin = localStorage.getItem('idUser')

    const handleCreateProduct = () => {
        axios.post(`http://localhost:3001/api/v1/productos/`, { nombre, descripcion, foto, precio, stock, codigo })
    }

    const handleSubmitLogout = () => {
        axios.get(`http://localhost:3001/api/v1/usuarios/logout/`, {
            headers: {						
                'authorization': localStorage.getItem('token')

            }
        })
        localStorage.removeItem('idUser')
        localStorage.removeItem('idCart')
        localStorage.removeItem('admin')
        localStorage.removeItem('token')
        history.push('/')
    }


    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <div>
                    <a className="navbar-brand" href="/admin">Panel Administrador</a>
                </div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <div>
                            <a className="nav-link active" href="/admin">Inicio</a>
                        </div>
                        <div>

                            <button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                Agregar Nuevo Producto
                            </button>

                            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLabel">Agregar Producto</h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            <form onSubmit={handleCreateProduct}>
                                                <div class="mb-3">
                                                    <label for="exampleInputEmail1" class="form-label">Nombre del Producto</label>
                                                    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='nombre' onChange={(e) => { setNombre(e.target.value) }} />
                                                </div>
                                                <div class="mb-3">
                                                    <label for="exampleInputEmail1" class="form-label">Descripcion</label>
                                                    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='descripcion' onChange={(e) => { setDescripcion(e.target.value) }} />
                                                </div>
                                                <div class="mb-3">
                                                    <label for="exampleInputPassword1" class="form-label">Foto URL</label>
                                                    <input type="text" class="form-control" id="exampleInputPassword1" name='foto' onChange={(e) => { setFoto(e.target.value) }} />
                                                </div>
                                                <div class="mb-3">
                                                    <label for="exampleInputPassword1" class="form-label">Precio</label>
                                                    <input type="text" class="form-control" id="exampleInputPassword1" name='precio' onChange={(e) => { setPrecio(e.target.value) }} />
                                                </div>
                                                <div class="mb-3">
                                                    <label for="exampleInputPassword1" class="form-label">Stock</label>
                                                    <input type="text" class="form-control" id="exampleInputPassword1" name='stock' onChange={(e) => { setStock(e.target.value) }} />
                                                </div>
                                                <div class="mb-3">
                                                    <label for="exampleInputPassword1" class="form-label">Codigo del Producto</label>
                                                    <input type="text" class="form-control" id="exampleInputPassword1" name='codigo' onChange={(e) => { setCodigo(e.target.value) }} />
                                                </div>
                                                <button type="submit" class="btn btn-primary" >Guardar</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <button type="submit" className='btn btn-dark' onClick={handleSubmitLogout}>Deslogueo</button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavbarAdmin;