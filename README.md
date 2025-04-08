# Reto Técnico: Procesamiento de Transacciones Bancarias (CLI)

# Resumen de Transacciones - Proyecto NestJS

## Introducción

Este proyecto es una aplicación construida con **NestJS** que permite procesar un archivo de transacciones en formato **CSV** y generar un resumen de estas transacciones. La aplicación es capaz de analizar los datos de un archivo CSV, procesarlos y devolver un resumen de las transacciones mediante `console.log`. Se utiliza la biblioteca `xlsx` para leer y procesar los archivos . La estructura sigue una **arquitectura hexagonal** que separa claramente las capas de la aplicación: **Application**, **Domain** e **Infrastructure**.

## Instrucciones de Ejecución
- npm install -g @nestjs/cli
- Clona este repositorio a tu máquina local.
- npm install.
- Ejecución de la aplicación: npm run start.
- Ejecución de tests: npm run test.

### Prerequisitos
Para ejecutar el proyecto, asegúrate de tener instalado Node.js y npm en tu máquina.

#### Enfoque y Solución

El enfoque adoptado se centra en separar las responsabilidades de lectura, procesamiento y generación de reportes de las transacciones para mantener un sistema flexible y escalable. Para la lectura y procesamiento de los archivos de transacciones, se utiliza la librería xlsx, la cual permite leer los archivos y mapear los datos a un formato adecuado. La solución incluye un repositorio que se encarga de esta tarea, garantizando que los datos sean correctamente transformados para su uso posterior. Luego, en el proceso de generación de reportes, se aplica la lógica central del negocio para realizar las operaciones necesarias, como la agregación y presentación de los datos, que son fundamentales para proporcionar el reporte final. Este enfoque permite un alto grado de desacoplamiento entre las diferentes partes del sistema, lo que facilita la actualización y modificación de cada componente sin afectar al resto, optimizando así la mantenibilidad y escalabilidad del sistema.

Pruebas Unitarias con Jest: La aplicación incluye pruebas unitarias con Jest.

#### Estructura del Proyecto
Arquitectura: Hexagonal.

Capa de Infraestructura: En esta capa se encuentra la implementación de la lectura y procesamiento del archivo de transacciones utilizando la librería xlsx. El TransactionCsvRepository es el encargado de leer el archivo y mapear los datos a un formato adecuado.

Capa de Dominio:En mi caso, esta capa se encarga de procesar la generación del reporte de las transacciones, lo que implica realizar operaciones que son fundamentales para ofrecer el resultado que el sistema requiere. Además de la definción de puertos de entrada como de salida.

Capa de Aplicación: Es la capa encargada de coordinar la interacción entre la capa de dominio y la capa de infraestructura. El TransactionApplicationService recibe las peticiones de los controladores y se comunica con el repositorio para procesar los datos.


