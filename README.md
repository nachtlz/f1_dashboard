# F1 Dashboard

El proyecto consiste en un dashboard interactivo que presenta información detallada y visualmente atractiva sobre la temporada 2020-2021 de la Fórmula 1. Proporciona a los usuarios una visión completa de las carreras,resultados, equipos y pilotos destacados durante esa temporada.

## Comenzando 🚀

Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas.



### Pre-requisitos 📋

Antes de comenzar con la instalación, asegúrate de tener las siguientes herramientas y dependencias instaladas en tu sistema:
```
node
npm
```

### Instalación 🔧

A continuación se describen los pasos necesarios para descargar y ejecutar el proyecto

### Clonación del repositorio de GitHub

```
git clone https://github.com/nachtlz/f1_dashboard.git
```
### Descarga Zip
También se puede descargar directamente desde el zip que se ha subido en aula digital

Una vez se ha instalado el proyecto, debemos instalar todas las dependencias necesarias, para ello una vez en la carpeta del proyecto
entramos en la carpeta del servidor e instalamos las dependencias para nuestro servidor Node.js

```
cd node
npm install package.json
```
A continuación, procedemos a instalar las dependencias del framework de react, para ello, salimos de la carpeta node

```
cd view
npm install package.json
```

## Ejecutando el proyecto ⚙️

Primero, debemos tener iniciado el Gestor de base de datos, para ello debemos asegurarnos de que el gestor de base de datos está arrancado
Una vez arrancado el gestor, debemos arrancar nuestro servidor Node.js que se conectara con la base de datos

```
cd node
npx nodemon app.js
```
A continuación podemos proceder a iniciar la aplicación

```
cd view
npm start
```
## Construido con 🛠️

A continuación listamos las herramientas que han hecho posible la creación del proyecto
* [React](https://es.react.dev) - Biblioteca JavaScript utilizada como framework web para la creación de interfaces de usuario interactivas y eficientes en nuestro proyecto.
* [Bootstrap](https://getbootstrap.com) - Marco de diseño front-end que ofrece herramientas y estilos para un desarrollo web responsive y moderno
* [PHPMyAdmin](https://www.phpmyadmin.net) - Gestor de base de datos
* [Node.js](https://nodejs.org/en) - Entorno de ejecución utilizado para la creación de la API REST que conecta la aplicación con la base de datos SQL."
* [Git](https://github.com) - Utilizado para faciltiar el reparto de tareas entre el equipo

### Vista del Proyecto 🔩

El patrón arquitectónico que hemos seguido es el Modelo, Vista, Controlador (MVC), donde el Modelo y el Controlador se encuentran en la carpeta 'node', y la Vista se encuentra en la carpeta 'View'.


En la carpeta 'node', se aloja la lógica completa de nuestro backend, que se materializa como una API REST. Esta API se conecta a la base de datos para recuperar la información requerida por la vista en cada momento.

La API, construida utilizando Node.js como mencionamos anteriormente, organiza su estructura en una carpeta llamada 'models', donde definimos la configuración de nuestras tablas en la base de datos que hemos creado. En la carpeta 'controllers', se encuentran todas las consultas que realizamos a la base de datos, con la programación de solo aquellos métodos que suministran información necesaria para la vista.

Dentro del archivo 'route.js', definimos las rutas junto con los tipos de consultas (POST, GET, DELETE, UPDATE), especificando dónde buscar la información. El archivo 'app.js' ejecutará la API.

La vista se localiza en la carpeta 'view', donde definimos la lógica del front-end de nuestra aplicación. En la programación del front-end, hemos optado por utilizar el framework React junto con Bootstrap para crear una página elegante, accesible y responsive.


## Autores ✒️

Este proyecto, ha sido creado por : 

* **Juan Ignacio López Bohnhoff** - *Extracción de datos,Creación de la base de datos, API REST, Driver View, Home View* 
* **Mateu Joan Perelló** - *Creación de la base de datos,Procesamiento de datos,API REST,Race View, Home View*

## Video 🎥

Para obtener una explicación detallada del código y ver una demostración de la aplicación, consulta el [Video de Demostración](https://youtu.be/jYkRW5ZxiX8).




---
⌨️ con ❤️ por Juan Ignacio López Bohnhoff y Mateu Joan Perelló😊
