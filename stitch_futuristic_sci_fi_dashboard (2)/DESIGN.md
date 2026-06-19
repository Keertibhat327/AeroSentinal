---
name: AeroSentinal Tactical
colors:
  surface: '#111317'
  surface-dim: '#111317'
  surface-bright: '#37393e'
  surface-container-lowest: '#0c0e12'
  surface-container-low: '#1a1c20'
  surface-container: '#1e2024'
  surface-container-high: '#282a2e'
  surface-container-highest: '#333539'
  on-surface: '#e2e2e8'
  on-surface-variant: '#d6c3b0'
  inverse-surface: '#e2e2e8'
  inverse-on-surface: '#2f3035'
  outline: '#9f8e7c'
  outline-variant: '#524535'
  surface-tint: '#ffb95a'
  primary: '#ffd7a9'
  on-primary: '#462a00'
  primary-container: '#ffb347'
  on-primary-container: '#704700'
  inverse-primary: '#845400'
  secondary: '#e6bf9a'
  on-secondary: '#432b11'
  secondary-container: '#5f4427'
  on-secondary-container: '#d7b18d'
  tertiary: '#abe7ff'
  on-tertiary: '#003544'
  tertiary-container: '#52d0f9'
  on-tertiary-container: '#00576d'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffddb6'
  primary-fixed-dim: '#ffb95a'
  on-primary-fixed: '#2a1800'
  on-primary-fixed-variant: '#643f00'
  secondary-fixed: '#ffdcbd'
  secondary-fixed-dim: '#e6bf9a'
  on-secondary-fixed: '#2b1701'
  on-secondary-fixed-variant: '#5c4125'
  tertiary-fixed: '#b8eaff'
  tertiary-fixed-dim: '#58d5fe'
  on-tertiary-fixed: '#001f28'
  on-tertiary-fixed-variant: '#004d61'
  background: '#111317'
  on-background: '#e2e2e8'
  surface-variant: '#333539'
  tactical-amber: '#FFB347'
  bronze-oxide: '#8E6E4E'
  status-critical: '#FF4D4D'
  status-optimal: '#4DFFAD'
  obsidian-base: '#0B0C0E'
  panel-surface: '#16191E'
typography:
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  data-display:
    fontFamily: JetBrains Mono
    fontSize: 18px
    fontWeight: '500'
    lineHeight: 24px
    letterSpacing: 0.05em
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.1em
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 30px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 16px
  margin-mobile: 16px
  margin-desktop: 32px
  container-max: 1440px
---

## Brand & Style

The design system is a high-precision tactical interface designed for aerospace engineers and flight deck operators. The brand personality is **authoritative, analytical, and uncompromising**. It moves away from generic sci-fi aesthetics toward a "Tactical Modern" approach—combining the density of flight instrumentation with the clean, functional reliability of modern enterprise software.

The visual style is **Corporate / Modern** with a **Technical** edge. It utilizes a deep-space background to reduce eye strain during long-haul monitoring, punctuated by high-visibility amber and bronze accents that signify critical mechanical health data. The UI must feel like a "glass cockpit" for data, prioritizing rapid scanning of Engine RUL (Remaining Useful Life), hydraulics, and landing gear systems.

**Key Principles:**
- **Zero Ambiguity:** Every pixel serves a data-driven purpose.
- **Mission Criticality:** High-contrast alerts for ECS cross-domain fault attribution.
- **Instrumental Density:** High information density managed through strict alignment and clear visual hierarchies.

## Colors

The palette is rooted in a **Dark Mode** environment to mimic military-grade avionics. 

- **Primary (Tactical Amber):** Reserved for active data streams, critical telemetry, and primary call-to-actions.
- **Secondary (Bronze Oxide):** Used for structural elements, secondary labels, and historical data trends (e.g., Engine RUL baselines).
- **Neutral (Obsidian):** The foundation of the UI, utilizing deep blacks and charcoals to provide maximum contrast for chromatic data.
- **Functional Colors:** 
    - **Status Optimal:** A crisp mint-green for healthy systems (Landing Gear secured, Hydraulics nominal).
    - **Status Critical:** A piercing red for anomaly detection and cross-domain fault attribution.

## Typography

The typographic system prioritizes legibility under duress. 

1. **Headlines (Hanken Grotesk):** Provides a clean, contemporary professional feel for section headers like "Hydraulics Anomaly Report."
2. **Body (Inter):** The workhorse for descriptive text and system logs, chosen for its exceptional readability at small sizes.
3. **Data & Labels (JetBrains Mono):** Monospaced fonts are mandatory for all numerical telemetry (Engine RUL, ECS Pressure, Temperature). This ensures that fluctuating values do not cause layout shifts and remain aligned in tabular views.

**Formatting Note:** Use Uppercase for all `label-caps` to evoke a technical, "read-out" feel for small metadata.

## Layout & Spacing

The system uses a **Fixed Grid** model for desktop to ensure telemetry dashboards remain consistent across different monitor sizes, switching to a fluid model for mobile.

- **Grid:** 12-column system on desktop with a strict 4px base unit.
- **Rhythm:** Spacing between related telemetry points (e.g., Landing Gear L/R) should be 8px (2 units), while major system sections (Hydraulics vs. ECS) should be separated by 32px (8 units).
- **Mobile Reflow:** On mobile devices, side-by-side gauges stack vertically. The "AeroSentinal" master status bar remains pinned to the top of the viewport at all times.

## Elevation & Depth

This system avoids traditional drop shadows in favor of **Tonal Layers** and **Low-Contrast Outlines**.

- **Surface Tiers:** Backgrounds use `obsidian-base`. Secondary containers (Cards/Panels) use `panel-surface`.
- **Outlines:** Instead of shadows, use 1px solid borders in `secondary_color` at 20% opacity to define boundaries.
- **Active State:** A "Glow" effect (0px blur, 2px spread) in `tactical-amber` is used only for the single most critical system requiring immediate operator attention (e.g., an active Hydraulics Anomaly).

## Shapes

The shape language is **Soft (0.25rem)**. 

While the system is largely architectural and rectilinear to maximize screen real estate, a subtle radius is applied to buttons and container corners to differentiate the software from the hardware housing it. 

- **Data Pills:** Status indicators (e.g., "LIVE," "FAULT") should use a slightly higher radius (`rounded-lg`) to distinguish them from structural panels.
- **Interactive Elements:** Buttons and Input fields maintain the standard `0.25rem` radius for a precise, machined appearance.

## Components

- **Tactical Buttons:** Primary buttons use a solid `tactical-amber` background with black `jetbrainsMono` text. Secondary buttons use an amber outline with no fill.
- **Telemetry Cards:** Cards for "Engine RUL" and "Landing Gear" must feature a 2px top-accent border in a color corresponding to the current health state (Amber/Green/Red).
- **Data Grids:** Use `jetbrainsMono` for all cell values. Alternating row highlights should be used in `panel-surface` with 50% opacity.
- **Status Pills:** Small, high-contrast labels. "ECS Cross-Domain" faults should blink at a 2Hz frequency when in a critical state.
- **Inputs:** Dark backgrounds with a 1px `bronze-oxide` border. Focus states use a 1px `tactical-amber` glow.
- **Breadcrumbs:** Used for deep navigation through subsystem models, separated by technical forward slashes (`/`) in `fg.muted`.