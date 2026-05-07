// Shared Clerk appearance to match MathCore dark theme.
export const clerkAppearance = {
  variables: {
    colorPrimary: "#4f8ef7",
    colorBackground: "#0f0f1a",
    colorInputBackground: "#171728",
    colorInputText: "#ffffff",
    colorText: "#ffffff",
    colorTextSecondary: "#a0a0b8",
    colorNeutral: "#ffffff",
    borderRadius: "0.75rem",
    fontFamily: "Inter, system-ui, sans-serif",
  },
  elements: {
    rootBox: "w-full",
    card: "bg-card/80 backdrop-blur-xl border border-border shadow-2xl",
    headerTitle: "text-foreground",
    headerSubtitle: "text-muted-foreground",
    socialButtonsBlockButton:
      "bg-background border border-border text-foreground hover:bg-accent",
    formButtonPrimary:
      "bg-gradient-to-r from-[#4f8ef7] to-[#7c5cbf] hover:opacity-90 text-white",
    footerActionLink: "text-[#4f8ef7] hover:text-[#7c5cbf]",
    formFieldInput: "bg-input border-border text-foreground",
    dividerLine: "bg-border",
    dividerText: "text-muted-foreground",
  },
} as const;
