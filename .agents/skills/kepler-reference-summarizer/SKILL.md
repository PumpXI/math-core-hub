---
name: kepler-reference-summarizer
description: Resume y adapta cartas oficiales y bibliografía de referencia a insumos académicos claros para Kepler, sin copiar texto extenso literal.
---

# kepler-reference-summarizer

## Propósito del skill
Transformar fuentes académicas oficiales (cartas descriptivas, sílabos, libros base) en resúmenes estructurados y accionables para diseño de cursos en Kepler.

## Cuándo usarlo
- Cuando se necesita extraer objetivos, competencias, alcance y secuencia desde documentos oficiales.
- Cuando se necesita sintetizar capítulos de libros en lenguaje pedagógico usable para Kepler.
- Cuando se necesita construir insumos previos para arquitectura de curso o redacción de temas.

## Cuándo NO usarlo
- Cuando la tarea sea escribir contenido final de temas para estudiantes.
- Cuando la tarea sea modificar estructura congelada de Cálculo I.
- Cuando la tarea implique implementar o editar Visual Labs.
- Cuando la tarea requiera cambios en backend, auth, pagos, dashboard o landing.

## Archivos permitidos
- `references/courses/**`
- `references/kepler/**`
- `references/_pendientes/**`
- Nuevos archivos de notas o síntesis en `references/kepler/**`
- Documentación de apoyo en `.agents/skills/**`

## Archivos prohibidos
- `src/config/courses.ts`
- `src/data/topicContent.ts`
- `src/components/topic/visuals/TopicVisual.tsx`
- Cualquier archivo en backend, auth, pagos, dashboard o landing
- Cualquier archivo de módulos/temas/slugs de Cálculo I congelados

## Flujo paso a paso
1. Leer `AGENTS.md` y confirmar restricciones globales antes de procesar fuentes.
2. Identificar documentos fuente prioritarios y registrar metadatos mínimos (curso, institución, periodo, edición).
3. Extraer ideas clave: resultados de aprendizaje, contenidos mínimos, progresión y criterios de evaluación.
4. Parafrasear y condensar en español con estilo Kepler (conceptual, claro, no enciclopédico).
5. Separar hechos oficiales de inferencias pedagógicas propuestas.
6. Entregar salida estructurada por bloques: objetivos, mapa temático, riesgos de cobertura y recomendaciones.
7. Verificar que no exista copia literal extensa de textos protegidos.
8. Guardar el resumen en ruta acordada dentro de `references/kepler/**`.

## Checklist final
- [ ] Se leyó `AGENTS.md` antes de trabajar.
- [ ] No se copiaron fragmentos extensos literales de cartas/libros.
- [ ] Todo el contenido visible quedó en español.
- [ ] No se tocaron archivos prohibidos.
- [ ] No se alteró estructura congelada de Cálculo I.
- [ ] Se mantuvo intacto el slug `precalculo:numeros-reales`.
- [ ] Los cambios son pequeños y revisables.

## Validaciones recomendadas
- Revisión de similitud textual manual en párrafos largos para evitar copia literal.
- Revisión de consistencia terminológica (objetivo, competencia, resultado).
- Verificación rápida de rutas modificadas con `git diff --name-only`.
- Si aplica, ejecutar validaciones livianas del repo al final.
