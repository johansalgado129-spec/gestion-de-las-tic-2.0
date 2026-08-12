# TechDecision AI

Dashboard web académico para responder de forma creativa la pregunta:

> ¿Qué factores debería analizar un gestor de tecnología antes de recomendar la implementación de una nueva tecnología? Utilice una herramienta de IA para construir una matriz de decisión y cuestione al menos tres de sus recomendaciones.

##  Características

- Diseño tipo dashboard moderno.
- HTML5 + CSS3 + JavaScript puro.
- Responsive para computador, tablet y celular.
- Paleta de colores azul + beige pastel.
- Sección de factores clave.
- Matriz de decisión ponderada.
- Explicación de calificación y resultado.
- Tres recomendaciones de IA cuestionadas críticamente.
- Juego de aprendizaje con 5 escenarios, puntaje y retroalimentación inmediata.
- Navegación lateral y microinteracciones.
- Preparado para GitHub Pages.

##  Estructura

```text
dashboard_tecnologia_ia/
├── index.html
├── README.md
├── .gitignore
└── assets/
    ├── css/
    │   └── styles.css
    └── js/
        └── app.js
```

##  Ejecutar localmente

No requiere instalación.

1. Descarga o clona el repositorio.
2. Abre `index.html` en un navegador moderno.

También puedes usar la extensión **Live Server** en Visual Studio Code.

##  Publicar en GitHub Pages

1. Crea un repositorio nuevo en GitHub.
2. Sube todos los archivos conservando la estructura.
3. Ve a **Settings → Pages**.
4. En **Build and deployment**, selecciona `Deploy from a branch`.
5. Selecciona `main` y la carpeta `/root`.
6. Guarda los cambios.

GitHub generará una URL pública para visualizar el dashboard.

##  Cálculo usado en la matriz

La escala de calificación va de **1 a 5**:

- 1 = muy desfavorable
- 2 = desfavorable
- 3 = aceptable
- 4 = favorable
- 5 = muy favorable

Fórmula:

```text
Resultado ponderado = Peso × Calificación
```

Ejemplo:

```text
Productividad = 25% × 5 = 1.25
```

La suma de todos los resultados genera una valoración final de **3.80 / 5 = 76%**.

##  Uso académico

El dashboard está pensado como un entregable visual y creativo. La IA organiza y pondera criterios, pero la conclusión hace énfasis en que la decisión tecnológica final debe incluir análisis humano, evidencia y contexto empresarial.
