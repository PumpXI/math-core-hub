---
name: kepler-safe-refactor
description: Aplica refactors pequeños y seguros en Kepler con alcance acotado, alta trazabilidad y respeto estricto de restricciones académicas y de producto.
---

# kepler-safe-refactor

## Propósito del skill
Ejecutar mejoras de estructura, legibilidad y mantenibilidad con riesgo mínimo, sin alterar comportamiento curricular ni áreas fuera de alcance.

## Cuándo usarlo
- Cuando se necesita limpiar código o contenido auxiliar sin cambiar lógica funcional.
- Cuando hay deuda técnica localizada que afecta claridad o mantenimiento.
- Cuando se requiere preparar una base segura para cambios futuros.

## Cuándo NO usarlo
- Cuando la solicitud implique rediseños amplios de arquitectura.
- Cuando se necesiten cambios en backend, auth, pagos, dashboard o landing.
- Cuando la tarea implique modificar Cálculo I congelado sin orden explícita.
- Cuando el refactor pueda cambiar slugs activos o comportamiento curricular.

## Archivos permitidos
- Archivos explícitamente autorizados por la tarea del usuario
- `.agents/skills/**`
- Documentación o notas en `references/kepler/**`

## Archivos prohibidos
- `src/config/courses.ts`
- `src/data/topicContent.ts`
- `src/components/topic/visuals/TopicVisual.tsx`
- Backend, auth, pagos, dashboard, landing
- Estructura de Cálculo I (módulos/temas/slugs) sin orden explícita

## Flujo paso a paso
1. Leer `AGENTS.md` y definir el alcance mínimo del refactor.
2. Identificar archivos exactos y riesgo potencial de cada cambio.
3. Ejecutar cambios pequeños, atómicos y fácilmente reversibles.
4. Evitar mover o renombrar slugs existentes con contenido/visualización.
5. Preservar explícitamente `precalculo:numeros-reales`.
6. No tocar Visual Labs salvo orden explícita y skill visual correspondiente.
7. Revisar diff para confirmar que no hay cambios colaterales.
8. Ejecutar validaciones disponibles al final si aplica y reportar resultados.

## Checklist final
- [ ] Refactor pequeño, acotado y revisable.
- [ ] Sin tocar archivos prohibidos.
- [ ] Sin impacto en slugs activos ni estructura congelada de Cálculo I.
- [ ] `precalculo:numeros-reales` intacto.
- [ ] Sin dependencias pesadas ni cambios tecnológicos fuera de stack.
- [ ] Validaciones ejecutadas o justificación explícita si no aplican.

## Validaciones recomendadas
- `git diff --name-only` para verificar alcance.
- Revisión manual de regresión en las rutas tocadas.
- `npm run build` o checks locales disponibles cuando aplique.
- Confirmar que no se introdujeron cambios en archivos sensibles.
