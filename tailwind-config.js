// ===== Tailwind CSS Configuration =====
tailwind.config = {
    darkMode: "class",
    theme: {
        extend: {
            "colors": {
                "on-tertiary-container": "#656464",
                "surface-tint": "#c6c6c7",
                "inverse-surface": "#e5e2e1",
                "primary": "#ffffff",
                "on-primary-fixed": "#1a1c1c",
                "on-primary-container": "#636565",
                "error-container": "#93000a",
                "on-tertiary": "#313030",
                "outline-variant": "#444748",
                "inverse-primary": "#5d5f5f",
                "on-tertiary-fixed": "#1c1b1b",
                "on-background": "#e5e2e1",
                "on-secondary": "#2f3131",
                "tertiary-fixed": "#e5e2e1",
                "background": "#131313",
                "surface-container-low": "#1c1b1b",
                "surface-variant": "#353534",
                "tertiary-fixed-dim": "#c8c6c5",
                "surface-dim": "#131313",
                "secondary-fixed": "#e2e2e2",
                "error": "#ffb4ab",
                "tertiary": "#ffffff",
                "primary-fixed": "#e2e2e2",
                "surface-container-highest": "#353534",
                "surface-container": "#201f1f",
                "inverse-on-surface": "#313030",
                "on-surface": "#e5e2e1",
                "on-error-container": "#ffdad6",
                "on-secondary-fixed": "#1a1c1c",
                "secondary-container": "#454747",
                "secondary": "#c6c6c6",
                "on-primary": "#2f3131",
                "surface-container-high": "#2a2a2a",
                "on-secondary-container": "#b5b5b5",
                "primary-fixed-dim": "#c6c6c7",
                "on-error": "#690005",
                "on-secondary-fixed-variant": "#454747",
                "surface-container-lowest": "#0e0e0e",
                "tertiary-container": "#e5e2e1",
                "on-tertiary-fixed-variant": "#474746",
                "on-primary-fixed-variant": "#454747",
                "outline": "#8e9192",
                "on-surface-variant": "#c4c7c8",
                "surface-bright": "#3a3939",
                "secondary-fixed-dim": "#c6c6c6",
                "primary-container": "#e2e2e2",
                "surface": "#131313"
            },
            "borderRadius": {
                "DEFAULT": "0.125rem",
                "lg": "0.25rem",
                "xl": "0.5rem",
                "full": "0.75rem"
            },
            "spacing": {
                "unit": "8px",
                "gutter": "24px",
                "container-max": "1440px",
                "grid-gap": "16px",
                "margin-mobile": "16px",
                "margin-desktop": "64px"
            },
            "fontFamily": {
                "headline-lg-mobile": ["Manrope"],
                "headline-lg": ["Manrope"],
                "body-md": ["Manrope"],
                "display-lg": ["Manrope"],
                "button-text": ["Manrope"],
                "label-sm": ["JetBrains Mono"]
            },
            "fontSize": {
                "headline-lg-mobile": ["24px", { "lineHeight": "1.2", "fontWeight": "600" }],
                "headline-lg": ["32px", { "lineHeight": "1.2", "letterSpacing": "-0.01em", "fontWeight": "600" }],
                "body-md": ["16px", { "lineHeight": "1.6", "letterSpacing": "0.01em", "fontWeight": "400" }],
                "display-lg": ["48px", { "lineHeight": "1.1", "letterSpacing": "-0.02em", "fontWeight": "700" }],
                "button-text": ["14px", { "lineHeight": "1.0", "letterSpacing": "0.02em", "fontWeight": "600" }],
                "label-sm": ["12px", { "lineHeight": "1.0", "letterSpacing": "0.05em", "fontWeight": "500" }]
            }
        }
    }
};
