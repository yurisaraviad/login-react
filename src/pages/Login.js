import React, { Component } from "react";
import "../css/Login.css";


import axios from "axios";
import md5 from "md5";
import Cookies from "universal-cookie";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";


const baseUrl = "http://localhost:3001/usuario";
const cookies = new Cookies();

class Login extends Component {
  state = {
    showAlert: true,

    form: {
      usernamek: "",
      passwordk: "",
    },
  };

  //manejar el evento como asyncrono
  handleChange = async (e) => {
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
    console.log(this.state.form);
  };

  //para inicar sesion formik

  



  iniciarSesionk = async () => {
    await axios
      .get(baseUrl, {
        params: {
          username: this.state.form.usernamek,
          password: md5(this.state.form.passwordk),
        },
      })
      .then((response) => {
        console.log(response);
        return response.data;
      })
      .then((response) => {
        if (response.length > 0) {
          var respuesta = response[0];
          cookies.set("id", respuesta.id, { path: "/" });
          cookies.set("apellido_paterno", respuesta.apellido_paterno, {
            path: "/",
          });
          cookies.set("apellido_materno", respuesta.apellido_materno, {
            path: "/",
          });
          cookies.set("nombre", respuesta.nombre, { path: "/" });
          cookies.set("username", respuesta.username, { path: "/" });

      
          this.setState({ showAlert: true });

           
          window.location.href = "./menu";
        } else {

          
          


          this.setState({ showAlert: false });

          setTimeout(() => {
        
            this.setState({ showAlert: true });
        
          }, 3000);



             
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //redireccion si hay usuario
  componentDidMount() {
    if (cookies.get("username")) {
      window.location.href = "./menu";
    }
  }

  render() {
    let bandera = <></>;

    

    if (this.state.showAlert==false) {
            
      bandera = (
   
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
          El usuario o la contraseña no son correctos intente nuevamente
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      )

      

    }

    

   

    return (
    <>






    {bandera}



    <div className="containerPrincipal">
    
      {/* formilario formik */}
      <div className="containerSecundario">

        
        <h3>Iniciar Sesion</h3>
        
        <div className="form-group">
          <Formik
            initialValues={{
              usernamek: "",
              passwordk: "",
            }}
            onSubmit={this.iniciarSesionk}
            validationSchema={Yup.object({
              usernamek: Yup.string()
                .required("El nombre es obligatorio")
                .min(5, "El nombre debe contener por lo menos 5 caracteres"),
              passwordk: Yup.string()
                .required("La contraseña es obligatoria")
                .min(
                  4,
                  "La contraseña  debe contener por lo menos 4 caracteres"
                )
                .max(
                  10,
                  "La contraseña  debe contener menos de 10 caracteres"
                ),
            })}
            className="form-group"
          >
            {({ errors, touched }) => (
              <Form onChange={this.handleChange}>
                <label>Usuario: </label>
                <Field
                  name="usernamek"
                  type="text"
                  className="form-control"
                  placeholder="Escriba nombre de usuario"
                />

                {errors.usernamek && touched.usernamek ? (
                  <div className="alert alert-danger p-0">
                    {errors.usernamek}
                  </div>
                ) : null}

                <label>Contraseña: </label>
                <Field
                  name="passwordk"
                  type="password"
                  className="form-control"
                  placeholder="Escriba su contraseña"
                />

                {errors.passwordk && touched.passwordk ? (
                  <div className="alert alert-danger p-0">
                    {errors.passwordk}
                  </div>
                ) : null}

                <div className="containerSecundario">
                  <button
                    className="containerSecundario btn btn-primary"
                    type="submit"
                  >
                    Iniciar Sesion
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
    </>);
  }
}

export default Login;
