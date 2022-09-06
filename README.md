# API REST para Gestión de Inventario y POS: R2

La siguiente documentación está dirigida a desarrolladores que deseen hacer uso de la API presente en este repositorio. La documentación en cuestión está dividida en los siguientes apartados:

- Programas necesario
- Módulos necesarios
- Ejecución
- Documentación por medio de Swagger UI

## Programas necesarios:

Se requiere de un editor de código que permita la visualización del código. Se recomienda utilizar Visual Studio Code. De igual manera, para la ejecución del sistema se requiere de NodeJs. Si se desea probar totodos los métodos o bien conocidos verbos HTTP, se requiere de un servicio que permita dichas acciones. Se recomienda Postman.

## Módulos necesarios:
Se requieren los siguientes módulos:

- Express: Módulo que permite la creación y ejecución de APIs en NodeJs. Se puede instalar por medio del siguiente comando:

> npm install express

- Nodemon: Permite ejecutar de forma sencilla comandos para desarrollo y ejecución de APIs en Node. Se puede instalar por medio del siguiente comando:

> npm install nodemon

- Morgan: Permite gestionar las peticiones HTTP realizadas a la API. Se puede instalar por medio del siguiente comando:

> npm install morgan

- Underscore: Permite realizar operaciones complejas con estructuras de datos, tales como arreglos. Algo similar a la programación funcional. Se puede instalar por medio del siguiente comando:

> npm install underscore

- Swagger UI for Express y Swagger JS Doc: Permite generar la documentación de Swagger. Se pueden instalar por medio de los siguientes comandos:

> npm install swagger-ui-express

> npm install swagger-jsdoc

## Ejecución

Con todos los módulos previamente instalados, sería cuestión de ejecutar en la consola del editor de código el siguiente comando:

> npm run dev

Esto es posible debido a que Nodemon, el módulo previamente instalado, permite crear instrucciones para facilitar el proceso de desarrollo. El archivo package.json contiene un objeto llamado scripts, el cual permite registrar instrucciones personalizadas.

## Documentación por medio de Swagger UI

La documentación es accesible por medio de localhost:3000/api/doc. Esta permite visualizar cada método desarrollado en la API, sus valores de entrada si aplica, valores de retorno y un ejemplo para cada método
