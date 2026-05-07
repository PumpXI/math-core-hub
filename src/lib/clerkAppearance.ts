// Shared Clerk appearance to match STEMLab light theme.
export const clerkAppearance = {
  variables: {
    colorPrimary: "#15803D",
    colorBackground: "#FFFFFF",
    colorInputBackground: "#F8F9FA",
    colorInputText: "#1A1A2E",
    colorText: "#1A1A2E",
    colorTextSecondary: "#6B7280",
    colorNeutral: "#1A1A2E",
    borderRadius: "0.75rem",
    fontFamily: "Inter, system-ui, sans-serif",
  },
  elements: {
    rootBox: "w-full",
    card: "bg-white border border-border shadow-xl",
    headerTitle: "text-foreground",
    headerSubtitle: "text-muted-foreground",
    socialButtonsBlockButton:
      "bg-white border border-border text-foreground hover:bg-muted",
    formButtonPrimary:
      "bg-[#15803D] hover:bg-[#166534] text-white",
    footerActionLink: "text-[#15803D] hover:text-[#166534]",
    formFieldInput: "bg-input border-border text-foreground",
    dividerLine: "bg-border",
    dividerText: "text-muted-foreground",
  },
} as const;
