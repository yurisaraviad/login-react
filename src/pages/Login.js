import React, { Component } from 'react';
import '../css/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import md5 from 'md5';
import Cookies from 'universal-cookie';
import {Formik,Form,Field,ErrorMessage} from 'formik';



const baseUrl ="http://localhost:3001/usuario";
const cookies = new Cookies();

class Login extends Component {
    state = {
        form:{
            username: '',
            password: ''

        }
    }


//manejar el evento como asyncrono
    handleChange=async e=>{
        await this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value

            }
        });
        console.log(this.state.form);
    }

//para inicar sesion
    iniciarSesion=async()=>{
        await axios.get(baseUrl, {params: {username: this.state.form.username, 
                                            password: md5(this.state.form.password)}})
        .then(response=>{
            return response.data;
        })
        .then(response=>{
            if(response.length>0){
                var respuesta=response[0];
                cookies.set('id', respuesta.id, {path: "/"})
                cookies.set('apellido_paterno', respuesta.apellido_paterno, {path: "/"})
                cookies.set('apellido_materno', respuesta.apellido_materno, {path: "/"})
                cookies.set('nombre', respuesta.nombre, {path: "/"})
                cookies.set('username', respuesta.username, {path: "/"})
                alert(`Bienvenido Usuario: ${respuesta.nombre} ${respuesta.apellido_paterno}`)
                window.location.href="./menu";

            }else{
                alert('El usuario o la contraseña no son correctos')
            }
        })
        .catch(error=>{
            console.log(error);
        })
    }

//redireccion si hay usuario
    componentDidMount(){
        if(cookies.get('username')){
            window.location.href="./menu";
        }
    }


    



  render() {


//publicar del formik
    const publicar =(values) => {
        alert(JSON.stringify(values))
        
    }

//validar formik
    const validar = (values) =>{
        const errors = {}
        if(values.passwordk.length<5) errors.passwordk='la contrasena debe ser mayor a 5 digitos'
        return errors;

    }



    return (
       




        
        <div className="containerPrincipal">



            {/* formilario formik */}
            <div className="Form">
                <Formik 
                initialValues={{
                    namek:"",                    
                    passwordk:""
                }}
                onSubmit={publicar}
                validate={validar}
                >
                
                <Form>
                    <Field name="namek" type="text" />
                    <Field name="passwordk" type="password"/>
                    <ErrorMessage name='passwordk'/>
                    <button type='submit'>Registrarse</button>
                    

                    
                </Form>

                

                

                </Formik>
            </div>
        

        
        <div className="containerSecundario">
          <div className="form-group">
            <label>Usuario: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="username"
              placeholder="Escriba nombre de usuario"
              onChange={this.handleChange}
            />
            <br />
            <label>Contraseña: </label>
            <br />
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Escriba su contraseña"
              onChange={this.handleChange}
            />
            <br />
            <button className="btn btn-primary" onClick={()=> this.iniciarSesion()}>Iniciar Sesión</button>
          </div>
        </div>
      </div>
 
    )
  }
}

export default Login;
