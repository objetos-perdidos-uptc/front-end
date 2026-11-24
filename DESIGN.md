# seeekr — Sistema de diseño

Rediseño visual del MVP. Objetivo: que se sienta **confiable, moderno, calmado y cálido**, pensado para
estudiantes que lo abren en el celular entre clases y reportan desde el computador.

---

## 1. Paleta

Ocho colores base. Los neutros son una sola familia cálida (tonos "stone"), no un gris frío.

| Rol | Hex | Por qué |
|---|---|---|
| **Primary** — teal | `#0F766E` | Transmite confianza y calma sin caer en el azul corporativo `#2563eb`. El verde azulado se asocia a "encontrar" y "orientarse". |
| Primary hover / fuerte | `#115E59` | Mismo tono, más oscuro: hover y texto sobre fondo teal suave. |
| Primary soft | `#E7F3F0` | Fondos de selección, chips y paneles de marca. |
| **Accent** — albaricoque | `#E8875A` | Toque cálido de marca (punto del wordmark, highlights). Contrasta con el teal sin competir. |
| **Destructive** | `#B42318` | Rojo ladrillo: claro como error sin ser rojo puro agresivo. |
| Neutros (ink) | `#1C1917` → `#F8F7F4` | Neutro cálido para que la interfaz no se sienta clínica. |
| Success | texto `#1D6B3A` / fondo `#E6F4EA` | Estados positivos (activo, aprobado). |
| Warning | texto `#8A5300` / fondo `#FDF2D9` | Pendientes. |
| Info | texto `#1E4E8C` / fondo `#E7EFFA` | Mensajes informativos. |
| Error | texto `#A3261A` / fondo `#FCEAE7` | Estados de rechazo o error. |

### Tokens de superficie y texto

| Token | Hex | Uso |
|---|---|---|
| `bg` | `#F8F7F4` | Fondo de la app |
| `surface` | `#FFFFFF` | Cards, inputs |
| `surface-elevated` | `#FFFFFF` + `shadow-md` | Dropdowns, drawer, toasts |
| `surface-muted` | `#F0EEE9` | Skeletons, badges neutros, bloques secundarios |
| `border` | `#E6E2DA` | Bordes por defecto |
| `border-strong` | `#CFC9BE` | Bordes de inputs y hover neutro |
| `text-primary` | `#1C1917` | Títulos y cuerpo |
| `text-secondary` | `#57534E` | Descripciones |
| `text-tertiary` | `#6F6862` | Metadatos, placeholders de ayuda |
| `text-inverse` | `#FFFFFF` | Texto sobre primary / destructive |

### Contraste (WCAG 2.1, calculado con la fórmula de luminancia relativa)

Mínimo exigido: 4.5:1 para texto normal. Todos los pares usados lo cumplen.

| Texto | Fondo | Ratio |
|---|---|---|
| text-primary `#1C1917` | bg `#F8F7F4` | 16.32 |
| text-primary `#1C1917` | surface `#FFFFFF` | 17.49 |
| text-secondary `#57534E` | bg `#F8F7F4` | 7.12 |
| text-secondary `#57534E` | surface `#FFFFFF` | 7.63 |
| text-tertiary `#6F6862` | bg `#F8F7F4` | 5.11 |
| text-tertiary `#6F6862` | surface `#FFFFFF` | 5.48 |
| text-inverse `#FFFFFF` | primary `#0F766E` | 5.47 |
| text-inverse `#FFFFFF` | primary hover `#115E59` | 7.58 |
| primary `#0F766E` (enlaces) | surface `#FFFFFF` | 5.47 |
| primary `#0F766E` (enlaces) | bg `#F8F7F4` | 5.11 |
| primary fuerte `#115E59` | primary soft `#E7F3F0` | 6.67 |
| text-inverse `#FFFFFF` | destructive `#B42318` | 6.57 |
| destructive `#B42318` (mensajes de error) | surface `#FFFFFF` | 6.57 |
| success `#1D6B3A` | `#E6F4EA` | 5.75 |
| warning `#8A5300` | `#FDF2D9` | 5.69 |
| error `#A3261A` | `#FCEAE7` | 6.34 |
| info `#1E4E8C` | `#E7EFFA` | 7.18 |
| accent texto `#9A4416` | accent soft `#FDEFE6` | 5.81 |
| neutral `#57534E` | surface-muted `#F0EEE9` | 6.58 |
| text-inverse `#FFFFFF` | panel de marca `#134E4A` | 9.48 |

El accent `#E8875A` **nunca** se usa como color de texto (no llega a 4.5:1 sobre blanco): solo en el punto
del wordmark y en elementos decorativos.

---

## 2. Tipografía

- Familia única: **Manrope** (autohospedada con `@fontsource/manrope`, pesos 400/500/600/700).
  Elegida sobre Inter porque sus formas redondeadas se sienten más cálidas y menos "SaaS genérico".
- Escala (Tailwind por defecto): xs 12 · sm 14 · base 16 · lg 18 · xl 20 · 2xl 24 · 3xl 30 · 4xl 36.
- Pesos: 400 cuerpo · 500 labels y botones · 600 títulos · 700 solo display (404, wordmark grande).
- `tracking-tight` en títulos de 2xl o más; `tracking-normal` en el cuerpo.
- Interlineado: 1.5 cuerpo, 1.2 títulos (`leading-tight`).

## 3. Espaciado y radios

- Grilla de 4 px; escala usada: 1, 2, 3, 4, 6, 8, 12, 16, 20, 24.
- Radios: `sm` 6 px · `md` 10 px · `lg` 14 px · `xl` 20 px · `full`.
- Consistencia: **botones, inputs y cards usan `md`**; paneles grandes (login, onboarding) usan `lg`;
  badges y avatares, `full`.

## 4. Sombras

- `shadow-sm` `0 1px 2px rgba(0,0,0,0.05)` — cards e inputs.
- `shadow-md` `0 4px 12px rgba(0,0,0,0.08)` — dropdowns, drawer, toasts y hover de cards interactivas.

## 5. Motion

- 150 ms ease-out en hover · 200 ms en focus y dropdowns · drawer 250 ms · toast 250 ms.
- Botón activo: `scale(0.98)` en 100 ms.
- Spinner: una vuelta cada 800 ms. Skeleton: brillo de 1.5 s lineal.
- Se respeta `prefers-reduced-motion`: las animaciones se reducen al mínimo.

## 6. Iconografía

- `lucide-react`, `strokeWidth={1.5}`, color `currentColor`.
- 16 px en línea · 20 px en botones · 24 px en navegación · 48 px en estados vacíos.

---

## 7. Wordmark

`<Logo />` escribe "seeekr" en minúsculas: la segunda "e" se reemplaza por una lupa de lucide (buscar es la
acción central del producto), "s" y "k" van un peso más fuerte que las "e", y `showDot` añade un punto
albaricoque al final. El favicon es una lupa teal en SVG inline.

---

## 8. Decisiones no especificadas en el encargo

| Decisión | Razón |
|---|---|
| Manrope en vez de Inter o Geist | Más cálida; encaja con "calmado y cálido". |
| Neutros cálidos (stone) | Un gris frío se sentía corporativo al lado del teal. |
| Ajuste de la feature `reports` al contrato real de report-service (aprobado explícitamente) | El formulario original enviaba `date` y `campusId` sin `type`; report-service exige `type`, `dateLost`/`dateOfDiscovery` y `privateFeature`, e identifica con `reportId`. Sin el ajuste, crear un reporte devolvía 400. |
| El campus del reporte ya no se pide en el formulario | report-service lo toma del token (vía Gateway); pedirlo permitiría publicar en otra sede. |
| Categorías en un `Select` cargado de `GET /reports/categories` | El usuario no conoce IDs de categoría. |
| Stats del dashboard | *Mis reportes* = total de reportes propios; *Reclamos* = total de reclamos; *Pendientes* = reclamos en `PENDING_OTP`, `PENDING` o `FLAGGED`; *Resueltos* = reportes `CLOSED` + reclamos `APPROVED`. |
| Clave de los reclamos | claim-service serializa el id como `{ "value": "..." }`; los componentes lo leen de forma tolerante sin tocar la capa de API de reclamos. |
| Título "Reclamo sobre [objeto]" | Se consulta el reporte con `useReport`; si no se puede leer, se muestra "Reclamo sobre el reporte #id". |
| Hint de credenciales de prueba solo en desarrollo | `import.meta.env.DEV`; no aparece en un build de producción. |
| Sin modo oscuro, sin i18n | Fuera del alcance pedido. |
| `claims` lee `reports` (excepción a "no hay imports entre features") | El encargo pide "Reclamo sobre [objeto]" y una vista previa del reporte en `/claims/new`; eso requiere leer el reporte. Se usa solo el hook público `useReport`. |
| "Recién reportados en tu sede" en el dashboard | El router no tiene página de feed y no se podía tocar; sin esta sección un usuario no tenía cómo llegar al reporte de otra persona para reclamarlo. Usa el hook `useFeed` que ya existía. |
| Hint "Mínimo 8 caracteres" en el registro | auth-service exige 8, aunque el schema del frontend (que no se tocó) acepta 6. Con 6 o 7 el backend responde con su propio mensaje de error. |
| Botón "Reclamar" arriba de los detalles | En desktop quedaba debajo del pliegue; es la acción principal de la página para quien no es el dueño. |
| Volver arriba al navegar | El router no restauraba el scroll y las páginas nuevas abrían a mitad de pantalla. |
