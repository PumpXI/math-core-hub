---
name: kepler-visual-lab-spec
description: Especifica Visual Labs de Kepler con enfoque cinematográfico y conceptual, alineados con la arquitectura visual existente.
---

# kepler-visual-lab-spec

## Propósito del skill
Definir especificaciones funcionales y pedagógicas de Visual Labs premium para Kepler, centradas en intuición matemática viva y coherencia visual.

## Cuándo usarlo
- Cuando se necesita una especificación de experiencia visual para un tema.
- Cuando se requiere traducir objetivos matemáticos a interacción y motion significativos.
- Cuando hay que describir estados, transiciones y narrativa conceptual del lab.

## Cuándo NO usarlo
- Cuando la tarea sea editar código de Visual Labs sin solicitud explícita.
- Cuando la necesidad sea solo textual (resúmenes, teoría, ejercicios).
- Cuando la tarea pida tocar backend, auth, pagos, dashboard o landing.
- Cuando se pida romper la arquitectura visual estable sin justificación.

## Archivos permitidos
- `references/kepler/**`
- `references/courses/**`
- Documentos de especificación dentro de `references/kepler/**`
- Lectura de arquitectura visual en `src/components/topic/visuals/**` (solo consulta)
- `.agents/skills/**`

## Archivos prohibidos
- `src/config/courses.ts`
- `src/data/topicContent.ts`
- `src/components/topic/visuals/TopicVisual.tsx` (edición prohibida en este alcance)
- Backend, auth, pagos, dashboard, landing
- Slugs activos con contenido/visualización ya publicada

## Flujo paso a paso
1. Leer `AGENTS.md` y extraer principios visuales clave del proyecto.
2. Delimitar objetivo conceptual del Visual Lab y comportamiento matemático a revelar.
3. Definir narrativa interactiva: entrada, exploración, transformación, cierre.
4. Especificar sistemas visuales (geometría, ejes, capas, motion) sin frameworks pesados.
5. Incluir criterios de claridad: legibilidad, contraste, mínima carga textual en canvas.
6. Verificar compatibilidad con arquitectura actual de visuales y restricciones técnicas.
7. Documentar estados, eventos y métricas de éxito pedagógico.
8. Entregar spec revisable en español dentro de `references/kepler/**`.

## Checklist final
- [ ] Spec alineada con filosofía “Less UI, more living mathematics”.
- [ ] Sin propuesta de WebGL, Three.js o dependencias pesadas.
- [ ] Todo en español.
- [ ] No se editó `TopicVisual.tsx` ni archivos prohibidos.
- [ ] Estructura congelada y slugs preservados, incluyendo `precalculo:numeros-reales`.

## Validaciones recomendadas
- Revisión cruzada con principios de AGENTS.md (visual + educativo).
- Validación de mantenibilidad técnica con arquitectura actual.
- Revisión de alcance por `git diff --name-only`.
- Ejecutar validaciones del repo si aplica al tipo de cambio.
