# InventarioPro - Cliente

InventarioPro es una aplicación web moderna para la gestión integral de inventarios, desarrollada con React y Vite. Permite administrar productos, categorías, proveedores, compras y ventas de manera eficiente.

## Características

- **Gestión de Productos**: Agregar, editar, eliminar y visualizar productos en el inventario.
- **Categorías**: Organizar productos en categorías personalizables.
- **Proveedores**: Mantener un registro de proveedores y sus detalles.
- **Compras y Ventas**: Registrar transacciones de compra y venta con seguimiento detallado.
- **Dashboard Interactivo**: Visualizaciones con gráficos para análisis de datos.
- **Autenticación**: Sistema de login y registro seguro.
- **Interfaz Responsiva**: Diseño moderno con Tailwind CSS.
- **Tablas Dinámicas**: Uso de React Table para manipulación avanzada de datos.

## Tecnologías Utilizadas

- **Frontend**: React 18, Vite
- **Estado Global**: Redux Toolkit, React Redux
- **Estilos**: Tailwind CSS, Sass, Styled Components
- **Gráficos**: Chart.js
- **Tablas**: TanStack React Table
- **Formularios**: React Hook Form
- **HTTP Client**: Axios
- **Iconos**: FontAwesome, Heroicons
- **Herramientas de Desarrollo**: ESLint, PostCSS, Autoprefixer

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/cliente-sistema-inventario.git
   cd cliente-sistema-inventario
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Configura las variables de entorno (si es necesario):
   Crea un archivo `.env` en la raíz del proyecto y configura la URL del backend.

4. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

5. Abre tu navegador en `http://localhost:5173` (puerto por defecto de Vite).

## Uso

- **Login**: Accede con tus credenciales.
- **Dashboard**: Visualiza estadísticas y gráficos en la página principal.
- **Productos**: Navega a la sección de productos para gestionar el inventario.
- **Categorías**: Administra las categorías de productos.
- **Proveedores**: Gestiona la información de proveedores.
- **Compras/Ventas**: Registra y visualiza transacciones.

## Arquitectura

Este proyecto utiliza **Atomic Design** para organizar los componentes de la interfaz de usuario. Atomic Design divide los componentes en cinco niveles jerárquicos:

- **Átomos (Atoms)**: Elementos básicos e indivisibles, como botones, inputs o iconos.
- **Moléculas (Molecules)**: Combinaciones simples de átomos que funcionan juntas, como un campo de formulario con etiqueta.
- **Organismos (Organisms)**: Componentes más complejos que combinan moléculas y átomos, como una barra de navegación o una tabla de datos.
- **Plantillas (Templates)**: Estructuras de layout que organizan organismos y definen la disposición general.
- **Páginas (Pages)**: Instancias específicas de plantillas con contenido real.

## Estructura del Proyecto

```
src/
├── api/                # Configuración de API y llamadas HTTP
├── assets/             # Recursos estáticos
├── components/
│   ├── atoms/          # Componentes básicos (átomos)
│   ├── molecules/      # Combinaciones simples (moléculas)
│   ├── organisms/      # Componentes complejos (organismos)
│   ├── templates/      # Layouts y plantillas
│   └── pages/          # Páginas completas de la aplicación
├── reducers/           # Reducers de Redux
├── redux/              # Acciones y store de Redux
├── utils/              # Utilidades auxiliares
└── ...
```

## Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo.
- `npm run build`: Construye la aplicación para producción.
- `npm run lint`: Ejecuta ESLint para verificar el código.
- `npm run preview`: Previsualiza la build de producción.

## Contribución

1. Haz un fork del proyecto.
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`).
3. Commit tus cambios (`git commit -am 'Agrega nueva funcionalidad'`).
4. Push a la rama (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

