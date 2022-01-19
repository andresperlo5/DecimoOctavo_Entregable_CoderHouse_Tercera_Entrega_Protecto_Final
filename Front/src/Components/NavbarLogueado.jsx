import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router'
import axios from 'axios'
import '../css/NavbarLogueado.css'

function NavbarLogueado() {

    const [nombre, setNombre] = useState('')
    const [direccion, setDireccion] = useState('')
    const [edad, setEdad] = useState('')
    const [telefono, setTelefono] = useState('')
    const [usuario, setUsuario] = useState('')
    const [contrasenia, setContrasenia] = useState('')
    const history = useHistory()

    const wrapperRef = useRef(null)
    const [previewImage, setPreviewImage] = useState('')
    const [image, setImage] = useState(null)

    const validateupload = e =>
        e.target.files[0].type == 'image/png' ||
        e.target.files[0].type == 'image/jpg' ||
        e.target.files[0].type == 'image/jpeg'


    const upload = e => {
        if (e.target.files[0].size <= 20000000) {
            let file = e.target.files[0];
            let reader = new FileReader()
            reader.onload = function (e) {
                setPreviewImage(e.target.result)
            }
            reader.readAsDataURL(file)
        } else {
            e.target.value = ''
            alert('subir algo min 2 mb')
        }
    }

    const getDataUserLogin = async () => {
        const res = await axios.get(`http://localhost:3001/api/v1/usuarios/${localStorage.getItem('idUser')}`)
        setNombre(res.data.oneUser.nombre)
        setDireccion(res.data.oneUser.direccion)
        setEdad(res.data.oneUser.edad)
        setTelefono(res.data.oneUser.telefono)
        setUsuario(res.data.oneUser.usuario)
        setContrasenia(res.data.oneUser.contrasenia)
        setPreviewImage(res.data.oneUser.foto)
        setImage(res.data.oneUser.foto)

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
        localStorage.removeItem('nombre')
        localStorage.removeItem('foto')
        history.push('/')
    }

    function primeraLetraDelNombreMayuscula(name) {
        return name.charAt(0).toUpperCase() + name.slice(1);
    }

    const handleSubmitIntoLogin = () => {

    }

    useEffect(() => {
        getDataUserLogin()
    }, [getDataUserLogin])

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <div className='fotoimg me-2'>
                    <img src={localStorage.getItem('foto')} alt="" />
                </div>
                <div>
                    <a className="navbar-brand" href="/loginUser">{`Bienvenido ${primeraLetraDelNombreMayuscula(localStorage.getItem('nombre'))}`}</a>
                </div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <div>
                            <a className="nav-link active" href="/loginUser">Inicio</a>
                        </div>
                        <div>
                            <a className="nav-link active" href="/carrito" >Carrito</a>
                        </div>
                        {/* Mis datos Modal */}
                        <div className='d-flex justify-content-start'>
                            <button type="button" className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                Mis Datos
                            </button>
                        </div>

                        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">

                                        <form onSubmit={handleSubmitIntoLogin}>
                                            <div>
                                                <div className='col col-6'>
                                                    <form>
                                                        <label for="exampleInputEmail1b" class="form-label">Foto / Avatar</label>

                                                        <div className="form-group d-none">
                                                            <input
                                                                type="file"
                                                                className="form-control-file"
                                                                name='file'
                                                                onChange={e => {
                                                                    setImage(e.target.files[0])
                                                                    let file = e.target.files
                                                                    if (file.length === 1 && validateupload(e)) {
                                                                        upload(e)
                                                                    } else {
                                                                        e.target.value = ''
                                                                        alert('cargar imagen')
                                                                    }
                                                                }}
                                                                ref={wrapperRef}
                                                                accept="image/gif, image/jpg, image/png"
                                                            />
                                                        </div>
                                                        <div className='previewImagen px-auto' style={{ cursor: 'pointer' }} onClick={() => {
                                                            wrapperRef.current.click()
                                                        }}>
                                                            <img src={previewImage} className='imagenPrev' alt="" />
                                                        </div>
                                                        <input type="text" className=' border-0 borderInputImg' readOnly />
                                                    </form>
                                                </div>

                                            </div>
                                            <div className='d-flex justify-content-around'>
                                                <div class="mb-3">
                                                    <label for="exampleInputEmail1b" class="form-label">Nombre</label>
                                                    <input type="text" class="form-control" id="exampleInputEmail1b" aria-describedby="emailHelp" value={nombre} onChange={(e) => { setNombre(e.target.value) }} required />
                                                </div>
                                                <div class="mb-3">
                                                    <label for="exampleInputEmail1b" class="form-label">Direccion</label>
                                                    <input type="text" class="form-control" id="exampleInputEmail1b" aria-describedby="emailHelp" value={direccion} onChange={(e) => { setDireccion(e.target.value) }} required />
                                                </div>
                                            </div>
                                            <div className='d-flex justify-content-around'>
                                                <div class="mb-3">
                                                    <label for="exampleInputEmail1b" class="form-label">Edad</label>
                                                    <input type="text" class="form-control" id="exampleInputEmail1b" aria-describedby="emailHelp" value={edad} onChange={(e) => { setEdad(e.target.value) }} required />
                                                </div>
                                                <div class="mb-3">
                                                    <label for="exampleInputEmail1b" class="form-label">Telefono</label>
                                                    <input type="text" class="form-control" id="exampleInputEmail1b" aria-describedby="emailHelp" value={telefono} onChange={(e) => { setTelefono(e.target.value) }} required />
                                                </div>
                                            </div>
                                            <div className='d-flex justify-content-around'>
                                                <div class="mb-3">
                                                    <label for="exampleInputEmail1b" class="form-label">Email</label>
                                                    <input type="text" class="form-control" id="exampleInputEmail1b" aria-describedby="emailHelp" value={usuario} onChange={(e) => { setUsuario(e.target.value) }} required />
                                                </div>
                                                <div class="mb-3">
                                                    <label for="exampleInputPassword1b" class="form-label">Contraseña</label>
                                                    <input type="password" class="form-control" id="exampleInputPassword1b" onChange={(e) => { setContrasenia(e.target.value) }} required />
                                                </div>

                                            </div>
                                        </form>
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

export default NavbarLogueado;