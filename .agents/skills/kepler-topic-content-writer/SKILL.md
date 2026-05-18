---
name: kepler-topic-content-writer
description: Redacta contenido académico por tema en estilo Kepler, basado en referencias oficiales y con enfoque conceptual en español.
---

# kepler-topic-content-writer

## Propósito del skill
Crear contenido por tema con tono Kepler: conceptual, elegante, progresivo y matemáticamente claro, sin depender de copia literal de fuentes.

## Cuándo usarlo
- Cuando ya existe arquitectura y se necesita redacción de un tema específico.
- Cuando se necesita adaptar bibliografía formal a explicaciones pedagógicas claras.
- Cuando se requiere material textual listo para revisión académica.

## Cuándo NO usarlo
- Cuando todavía no existen objetivos/alcance definidos por arquitectura.
- Cuando la tarea principal es diseñar ejercicios o especificar Visual Labs.
- Cuando la solicitud sea cambiar slugs o estructura congelada de Cálculo I.
- Cuando se pidan cambios fuera del frente académico permitido.

## Archivos permitidos
- `references/kepler/**`
- `references/courses/**`
- `references/_pendientes/**`
- Archivos de borrador académico dentro de `references/kepler/**`
- `.agents/skills/**`

## Archivos prohibidos
- `src/config/courses.ts`
- `src/data/topicContent.ts`
- `src/components/topic/visuals/TopicVisual.tsx`
- Backend, auth, pagos, dashboard, landing
- Cambios a slugs existentes con contenido/visual activo

## Flujo paso a paso
1. Leer `AGENTS.md` y restricciones globales de Kepler.
2. Definir objetivo del tema y nivel de profundidad requerido.
3. Recopilar insumos desde carta oficial y bibliografía base.
4. Redactar en español con estructura sugerida: intuición, desarrollo, conexiones, cierre.
5. Priorizar comprensión conceptual antes de formalismo excesivo.
6. Parafrasear siempre; evitar copia extensa literal de libros/cartas.
7. Verificar consistencia con slugs y estructura existente sin editar archivos productivos.
8. Entregar borrador revisable con notas de fuente y decisiones pedagógicas.

## Checklist final
- [ ] Contenido completo en español.
- [ ] Tono Kepler: conceptual, limpio, no enciclopédico.
- [ ] Sin copia literal extensa.
- [ ] Sin cambios a `courses.ts`, `topicContent.ts`, `TopicVisual.tsx`.
- [ ] Sin cambios a estructura congelada de Cálculo I.
- [ ] Slug `precalculo:numeros-reales` preservado.

## Validaciones recomendadas
- Lectura en voz alta para fluidez y claridad conceptual.
- Revisión académica rápida de precisión matemática.
- Revisión de diffs para confirmar alcance.
- Ejecutar validaciones de proyecto si la tarea lo requiere.
