# AGENTS.md

## STEMLab / math-core-hub

STEMLab is a premium interactive STEM learning platform focused on university-level mathematics and STEM education.

The project currently focuses on:
- Calculus I
- visual mathematical intuition
- immersive conceptual learning
- interactive mathematical experiences

The platform is NOT intended to feel like:
- a PDF
- a textbook
- Moodle
- Khan Academy
- GeoGebra
- generic educational software
- AI-generated educational content

The experience should feel:
- premium
- elegant
- cinematic
- immersive
- mathematically beautiful
- modern
- visually clean
- highly conceptual
- interactive

---

# Core Philosophy

The goal is NOT:
“adding animations to math.”

The goal IS:
“building a premium interactive mathematical experience.”

Visual Labs are:
- cohesive conceptual experiences
- not collections of widgets
- not supplementary animations
- not tiny educational demos

Every Visual Lab should feel:
- immersive
- conceptually unified
- mathematically intuitive
- visually refined

Philosophy:
“Less UI, more living mathematics.”

---

# Current Stack

Frontend:
- React
- TypeScript
- Vite
- TailwindCSS

Interactive systems:
- native SVG
- custom coordinate systems
- custom graph rendering
- React hooks/state
- custom animations

DO NOT use:
- Desmos
- GeoGebra
- JSXGraph
- heavy graphing libraries

Reason:
- SSR/integration problems
- poor visual consistency
- reduced design freedom
- not aligned with premium visual identity

---

# Visual Architecture

Main visual systems are inside:

src/components/topic/visuals/

Important files:
- VisualShell.tsx
- TopicVisual.tsx
- RealNumbersVisual.tsx
- LimitsVisual.tsx

Visual systems should:
- reuse architecture when possible
- remain maintainable
- avoid unnecessary abstraction
- avoid architectural rewrites

---

# Visual Design Philosophy

The visual language should prioritize:
- elegant typography
- smooth motion
- cinematic interaction
- subtle animation
- immersive mathematical geometry
- visual clarity
- refined spacing
- coordinated transitions

Avoid:
- clutter
- giant labels
- saturated educational colors
- excessive UI panels
- textbook aesthetics
- school-demo appearance
- GeoGebra aesthetics
- excessive controls/sliders

Premium DOES NOT mean:
- low contrast
- invisible text
- decorative-only visuals

Mathematics must remain:
- readable
- understandable
- visually anchored
- conceptually clear

---

# Interaction Philosophy

Avoid relying primarily on:
- sliders
- dragging points on graphs
- static graph inspection
- repetitive widgets

Prefer:
- direct manipulation
- synchronized systems
- cinematic transitions
- structural transformation
- progressive construction
- layered mathematical behavior
- dynamic accumulation
- conceptual zooming
- coordinated motion

The mathematics should feel:
alive
continuous
dynamic
emergent

---

# Educational Philosophy

Do NOT design around:
- memorization
- repetitive procedures
- formula dumping
- theorem boxes
- symbolic overload

Focus on:
- intuition
- structure recognition
- dynamic behavior
- geometric understanding
- conceptual emergence

Students should:
- feel mathematical behavior
- visually discover concepts
- understand relationships intuitively

Important:
The visuals should make concepts feel inevitable before formalizing them symbolically.

---

# Visual Lab Philosophy

Each module should ideally contain:
ONE major cohesive Visual Lab.

Avoid:
- many disconnected mini widgets
- cluttered educational dashboards
- fragmented interaction systems

Visual Labs should feel like:
premium mathematical environments.

---

# Animation Philosophy

Motion should:
- communicate mathematics
- reveal structure
- guide attention
- reinforce intuition

Animation should NOT exist:
for decoration only.

Every transition should feel:
intentional
smooth
mathematically meaningful

---

# Typography Rules

Typography must:
- remain readable
- preserve hierarchy
- support mathematical clarity
- avoid ultra-low contrast

Avoid:
- tiny floating labels
- decorative-only formulas
- washed-out annotations

Inside visual canvases:
use minimal text.

Mathematics should communicate visually whenever possible.

---

# Engineering Priorities

Strongly prioritize:
- maintainability
- reusable systems
- minimal diffs
- clean architecture
- performance
- stable integration

DO NOT:
- refactor unrelated systems
- rebuild stable architecture
- introduce unnecessary dependencies
- over-engineer solutions

Prefer:
- extending existing systems
- modular reusable logic
- lightweight SVG systems

---

# Current Development Focus

Current priority:
building a visually exceptional and academically strong Calculus I experience.

Current work includes:
- Limits
- Derivatives
- Integration
- Visual Lab refinement
- typography refinement
- interaction refinement
- mathematical UX refinement

NOT current focus:
- monetization
- landing pages
- branding systems
- legal pages
- large AI integrations

---

# Most Important Rule

Every major decision should reinforce:

STEMLab is a premium interactive mathematical experience.
Not a website with math widgets.