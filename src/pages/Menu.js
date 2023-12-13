import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export default class Menu extends Component {
  cerrarSesion = () => {
    cookies.remove("id", { path: "/" });
    cookies.remove("apellido_paterno", { path: "/" });
    cookies.remove("apellido_materno", { path: "/" });
    cookies.remove("nombre", { path: "/" });
    cookies.remove("username", { path: "/" });
    window.location.href = "./";
  };

  //redireccion si no hay usuario
  componentDidMount() {
    if (!cookies.get("username")) {
      window.location.href = "./";
    }
  }

  render() {
    console.log("id: " + cookies.get("id"));
    console.log("apellido_paterno: " + cookies.get("apellido_paterno"));
    console.log("apellido_materno: " + cookies.get("apellido_materno"));
    console.log("nombre: " + cookies.get("nombre"));
    console.log("username: " + cookies.get("username"));

    return (
      <div className="containerSecundario">
        <h2>Menu Principal</h2>
        <h3>
          Bienvenido: {cookies.get("nombre")} {cookies.get("apellido_paterno")}
        </h3>
        <h4>Usuario: {cookies.get("username")} </h4>
        <br />
        <button className="btn btn-primary" onClick={() => this.cerrarSesion()}>
          Cerrar Sesion
        </button>
      </div>
    );
  }
}
