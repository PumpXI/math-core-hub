---
name: kepler-course-architect
description: Diseña arquitectura académica de cursos Kepler a partir de referencias oficiales, respetando slugs y estructuras congeladas.
---

# kepler-course-architect

## Propósito del skill
Definir o ajustar la arquitectura pedagógica de un curso (módulos, temas, progresión conceptual y dependencias) sin romper reglas curriculares existentes del proyecto.

## Cuándo usarlo
- Cuando se necesita proponer estructura de un curso nuevo basado en fuentes oficiales.
- Cuando se requiere mapear competencias y contenidos a una secuencia didáctica coherente.
- Cuando se necesita revisar cobertura conceptual sin generar contenido final.

## Cuándo NO usarlo
- Cuando la solicitud sea redacción detallada de contenido por tema.
- Cuando la solicitud implique reestructurar Cálculo I (congelado).
- Cuando se pidan cambios de slugs existentes con contenido/visual ya activo.
- Cuando se pidan cambios de frontend no curriculares, backend, auth, pagos o dashboard.

## Archivos permitidos
- `references/courses/**`
- `references/kepler/**`
- Propuestas de arquitectura en `references/kepler/**`
- `.agents/skills/**`

## Archivos prohibidos
- `src/config/courses.ts`
- `src/data/topicContent.ts`
- `src/components/topic/visuals/TopicVisual.tsx`
- Rutas de backend, auth, pagos, dashboard y landing
- Cualquier archivo que modifique módulos/temas/slugs de Cálculo I sin orden explícita

## Flujo paso a paso
1. Leer `AGENTS.md` y confirmar que el alcance es solo arquitectura académica.
2. Revisar fuentes oficiales y detectar restricciones curriculares explícitas.
3. Proponer una progresión conceptual en español: prerequisitos, núcleos y cierres.
4. Definir mapa de módulos/temas candidateados sin tocar archivos productivos.
5. Verificar reglas de slugs: no cambiar slugs existentes activos.
6. Forzar preservación del slug `precalculo:numeros-reales`.
7. Si el curso es Cálculo I, no alterar módulos/temas/slugs por estructura congelada.
8. Entregar salida como propuesta revisable en archivos de referencia.

## Checklist final
- [ ] Se respetó estructura congelada de Cálculo I.
- [ ] No se cambiaron slugs activos.
- [ ] Se preservó `precalculo:numeros-reales`.
- [ ] No se editaron `courses.ts`, `topicContent.ts` ni `TopicVisual.tsx`.
- [ ] No se tocaron backend/auth/pagos/dashboard/landing.
- [ ] Todo el contenido visible está en español.

## Validaciones recomendadas
- Validación manual de secuencia (de intuitivo a formal).
- Cruce rápido contra carta oficial para detectar omisiones críticas.
- `git diff --name-only` para confirmar límites de edición.
- Si aplica, ejecutar validaciones disponibles del proyecto al final.
