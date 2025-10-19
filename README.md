# Desaway App

Una aplicación móvil desarrollada en **React Native** que permite generar reportes en formato PDF a partir de datos ingresados por el usuario.

## 🚀 Características

- **Formulario interactivo** con validación en tiempo real
- **Persistencia de datos** usando AsyncStorage
- **Generación de PDFs** profesionales con diseño personalizado
- **Picker personalizado** con modal y animaciones
- **Interfaz responsive** con soporte para teclado
- **Arquitectura modular** con hooks personalizados y servicios

## 📱 Funcionalidades Implementadas

### Formulario de Datos

- Campo de texto libre (Dato 1)
- Selector de opciones personalizado (Dato 2)
- Campo numérico con validación (Dato 3)
- Validación automática de campos requeridos

### Persistencia

- Guardado automático de datos mientras el usuario escribe
- Recuperación de datos al reiniciar la aplicación
- Limpieza automática después de generar PDF exitosamente

### Generación de PDF

- Diseño profesional con logo corporativo
- Paginación automática según cantidad de datos
- Estilos CSS integrados para formato consistente
- Nombres de archivo únicos con timestamp

## 🛠 Tecnologías Utilizadas

- **React Native 0.82.0** - Framework principal
- **TypeScript** - Tipado estático
- **AsyncStorage** - Persistencia local
- **react-native-print** - Generación de PDFs
- **react-native-svg** - Manejo de iconos
- **react-native-safe-area-context** - Manejo de áreas seguras

## 📁 Estructura del Proyecto

```
src/
├── components/
│   └── CustomPicker.tsx          # Componente picker personalizado
├── hooks/
│   ├── useForm.ts               # Hook para manejo de formulario
│   └── usePersistence.ts        # Hook para persistencia de datos
├── screens/
│   └── HomeScreen.tsx           # Pantalla principal
├── services/
│   └── pdfService.ts            # Servicio de generación de PDF
├── styles/
│   ├── AppStyles.js             # Estilos globales
│   ├── HomeScreenStyles.js      # Estilos de pantalla principal
│   ├── CustomPickerStyles.js    # Estilos del picker
│   ├── colors.js                # Paleta de colores
│   ├── typography.js            # Tipografías
│   ├── spacing.js               # Espaciados
│   ├── borders.js               # Bordes
│   └── shadows.js               # Sombras
├── types/
│   └── index.ts                 # Definiciones de tipos TypeScript
├── constants/
│   └── index.ts                 # Constantes de la aplicación
└── utils/
    └── index.ts                 # Utilidades (sleep, debounce)
```

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js >= 20
- React Native CLI
- Android Studio (para Android)
- Xcode (para iOS)

### Instalación

1. **Clonar el repositorio**

```bash
git clone <repository-url>
cd desaway-app
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Configurar iOS (solo macOS)**

```bash
# Instalar CocoaPods
bundle install

# Instalar dependencias nativas
bundle exec pod install
```

## 🏃‍♂️ Ejecución

### Desarrollo

```bash
# Iniciar Metro bundler
npm start

# Ejecutar en Android
npm run android

# Ejecutar en iOS
npm run ios
```

### Comandos Disponibles

```bash
npm start          # Iniciar Metro bundler
npm run android    # Ejecutar en Android
npm run ios        # Ejecutar en iOS
npm run lint       # Ejecutar ESLint
npm test           # Ejecutar tests
```

## 🎨 Componentes Principales

### CustomPicker

Componente de selector personalizado con:

- Modal overlay
- Lista scrollable de opciones
- Indicador visual de selección
- Animaciones suaves

### useForm Hook

Hook personalizado que maneja:

- Estado del formulario
- Validación de campos
- Reset de formulario
- Setters genéricos por tipo de campo

### usePersistence Hook

Hook para persistencia que incluye:

- Guardado automático con debounce
- Carga de datos al inicializar
- Limpieza de datos
- Manejo de errores

### PDF Service

Servicio de generación de PDFs con:

- Plantilla HTML con CSS integrado
- Paginación automática
- Logo corporativo embebido
- Datos dinámicos del formulario

## 🔧 Configuración

### Opciones del Picker

Las opciones del selector se configuran en `src/constants/index.ts`:

```typescript
export const PICKER_OPTIONS: PickerOption[] = [
  { label: 'Opción 1', value: 'option1' },
  { label: 'Opción 2', value: 'option2' },
  { label: 'Opción 3', value: 'option3' },
];
```

### Estilos

Los estilos están organizados por categorías en la carpeta `src/styles/`:

- Colores corporativos
- Tipografías consistentes
- Espaciados uniformes
- Sombras y bordes

## 📱 Uso de la Aplicación

1. **Ingresar datos**: Completa los tres campos del formulario
2. **Validación automática**: Los campos se validan en tiempo real
3. **Persistencia**: Los datos se guardan automáticamente
4. **Generar PDF**: Presiona el botón para crear el reporte
5. **Compartir**: El PDF se abre en el visor nativo del dispositivo

## 🐛 Troubleshooting

### Problemas Comunes

**Metro no inicia**

```bash
npx react-native start --reset-cache
```

**Errores de dependencias nativas**

```bash
# Android
cd android && ./gradlew clean

# iOS
cd ios && bundle exec pod install
```

**Problemas de permisos iOS**

- Verificar que Xcode tenga los permisos necesarios
- Limpiar build folder en Xcode

## 📄 Licencia

Este proyecto es privado y confidencial.

## 🤝 Contribución

Para contribuir al proyecto:

1. Crear una rama feature
2. Implementar cambios
3. Ejecutar tests y linting
4. Crear pull request

## 📞 Soporte

Para soporte técnico, contactar al equipo de desarrollo.
