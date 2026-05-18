---
name: kepler-exercise-builder
description: Diseña ejercicios académicos alineados a objetivos de Kepler, con progresión conceptual y redacción clara en español.
---

# kepler-exercise-builder

## Propósito del skill
Construir bancos de ejercicios y secuencias de práctica que refuercen intuición y estructura matemática, alineados a objetivos curriculares oficiales.

## Cuándo usarlo
- Cuando se necesita crear ejercicios por tema o por bloque conceptual.
- Cuando se requiere progresión de dificultad (fundacional, intermedio, transferencia).
- Cuando se necesita balance entre comprensión, procedimiento y interpretación.

## Cuándo NO usarlo
- Cuando la solicitud sea redacción teórica extensa sin práctica.
- Cuando la tarea sea especificación técnica de Visual Labs.
- Cuando la petición implique tocar arquitectura congelada de Cálculo I.
- Cuando el trabajo involucre backend, auth, pagos, dashboard o landing.

## Archivos permitidos
- `references/kepler/**`
- `references/courses/**`
- Archivos de diseño de ejercicios en `references/kepler/**`
- `.agents/skills/**`

## Archivos prohibidos
- `src/config/courses.ts`
- `src/data/topicContent.ts`
- `src/components/topic/visuals/TopicVisual.tsx`
- Backend, auth, pagos, dashboard y landing
- Cambios de slugs existentes con contenido o visualización activa

## Flujo paso a paso
1. Leer `AGENTS.md` y confirmar límites de alcance.
2. Tomar objetivos del tema y resultados esperados.
3. Diseñar progresión de ejercicios en español: activación, práctica guiada, reto integrador.
4. Incluir diversidad de formatos (conceptual, cálculo, interpretación gráfica) sin saturar.
5. Redactar en estilo claro y premium, evitando estética de “lista escolar”.
6. Añadir criterios de solución y errores frecuentes esperables.
7. Verificar que no se copien en bloque enunciados de libros/cartas.
8. Guardar material en `references/kepler/**` para revisión.

## Checklist final
- [ ] Ejercicios alineados a objetivos del tema.
- [ ] Dificultad progresiva y coherente.
- [ ] Contenido visible completamente en español.
- [ ] Sin copia textual extensa de fuentes.
- [ ] Sin tocar archivos prohibidos ni estructura congelada.
- [ ] Slug `precalculo:numeros-reales` mantenido.

## Validaciones recomendadas
- Muestreo de resolución de 2-3 ejercicios por nivel.
- Revisión de ambigüedad lingüística en enunciados.
- Confirmación de alcance por `git diff --name-only`.
- Ejecutar chequeos del proyecto si aplica.
