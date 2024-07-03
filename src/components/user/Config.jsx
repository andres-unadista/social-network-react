import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { Global } from '../../helpers/Global';
import avatar from '../../assets/img/user.png';
import { SerializeForm } from '../../helpers/SerializeForm';
import Swal from 'sweetalert2'; // Importa SweetAlert2
import { useNavigate } from 'react-router-dom';

export const Config = () => {
  // Se reciben los métodos setAuth y SetCounters
  const { auth } = useAuth();

  // Estado para mostrar resultado del registro del user
  const [saved, setSaved] = useState('not_saved');

  // Hook para redirigir
  const navigate = useNavigate();

  const updateUser = async (e) => {
    // prevenir que se actualice la pantalla
    e.preventDefault();

    // Obtener los datos del formulario
    let newDataUser = SerializeForm(e.target);

    // Borrar file0 porque no lo vamos a actualizar por acá
    delete newDataUser.file0;

    // Actualizar el usuario modificado en la BD con una petición Ajax
    const request = await fetch(Global.url + 'user/update', {
      method: 'PUT',
      body: JSON.stringify(newDataUser),
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
    });

    // Obtener la información retornada por la request
    const data = await request.json();

    if (data.status == 'success') {
      setSaved('saved');

      // Mostrar modal de éxito
      Swal.fire({
        title: '¡Usuario actualizado correctamente!',
        icon: 'success',
        confirmButtonText: 'Continuar',
      }).then(() => {
        // Redirigir después de cerrar el modal
        navigate('/login');
      });
    } else {
      setSaved('error');

      // Mostrar modal de error
      Swal.fire({
        title: '¡El usuario no se ha actualizado!',
        icon: 'error',
        confirmButtonText: 'Intentar nuevamente',
      });
    }
  };

  return (
    <>
      <header className="content__header content__header--public">
        <h1 className="content__title">Editar Usuario</h1>
      </header>
      <div className="content__posts">
        <div className="form-style">
          {/* Respuestas de usuario registrado*/}
          {saved == 'saved' ? <strong className="alert alert-success">¡Usuario actualizado correctamente!</strong> : ''}
          {saved == 'error' ? <strong className="alert alert-danger">¡El usuario no se ha actualizado!</strong> : ''}

          <form className="config-form" onSubmit={updateUser}>
            <div className="form-group">
              <label htmlFor="name">Nombres</label>
              <input type="text" name="name" required defaultValue={auth.name} />
            </div>

            <div className="form-group">
              <label htmlFor="last_name">Apellidos</label>
              <input type="text" name="last_name" required defaultValue={auth.last_name} />
            </div>

            <div className="form-group">
              <label htmlFor="nick">Nick</label>
              <input type="text" name="nick" required defaultValue={auth.nick} />
            </div>

            <div className="form-group">
              <label htmlFor="bio">Bio</label>
              <textarea name="bio" defaultValue={auth.bio} />
            </div>

            <div className="form-group">
              <label htmlFor="email">Correo Electrónico</label>
              <input type="email" name="email" required defaultValue={auth.email} />
            </div>

            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input type="password" name="password" required />
            </div>

            <div className="form-group">
              <label htmlFor="file0">Avatar</label>
              <div className="avatar">
                <div className="general-info__container-avatar">
                  {auth.image != 'default.png' && (
                    <img
                      src={Global.url + 'user/avatar/' + auth.image}
                      className="container-avatar__img"
                      alt="Foto de perfil"
                    />
                  )}
                  {auth.image == 'default.png' && (
                    <img src={avatar} className="container-avatar__img" alt="Foto de perfil" />
                  )}
                </div>
              </div>
              <br />
              <input type="file" name="file0" id="file" />
            </div>
            <input type="submit" value="Editar" className="btn btn-success" />
          </form>
        </div>
      </div>
    </>
  );
};
