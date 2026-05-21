import { Button } from "@react-email/components";
import { Html, Head, Body, Container, Text, Section, Heading } from "@react-email/components";

export function SecurityAlertEmail({ userName = "Utilisateur", resetLink }: { userName?: string; resetLink: string }) {
  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: "#f4f4f4", fontFamily: "sans-serif" }}>
        <Container style={{ backgroundColor: "#ffffff", padding: "40px", borderRadius: "16px", marginTop: "40px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
          <Section>
            <Heading style={{ color: "#231f20", fontSize: "24px", fontWeight: "bold", textAlign: "center" }}>
              Alerte de Sécurité Axenium
            </Heading>
            <Text style={{ color: "#64748b", textAlign: "center", fontSize: "16px", marginBottom: "30px" }}>
              SÉCURITÉ DE VOTRE COMPTE
            </Text>
            <Text style={{ color: "#475569", fontSize: "16px", lineHeight: "24px" }}>
              Bonjour {userName},
            </Text>
            <Text style={{ color: "#475569", fontSize: "16px", lineHeight: "24px" }}>
              Nous avons détecté une tentative d'inscription avec votre adresse email ou votre numéro de téléphone. Si ce n'est pas vous, il s'agit potentiellement d'une tentative d'intrusion.
            </Text>
            <Text style={{ color: "#ef4444", fontSize: "16px", fontWeight: "bold", lineHeight: "24px" }}>
              Par mesure de sécurité, nous vous conseillons de changer votre mot de passe immédiatement.
            </Text>
            <Section style={{ textAlign: "center", margin: "30px 0" }}>
              <Button
                href={resetLink}
                style={{
                  backgroundColor: "#ee0c5d",
                  color: "#ffffff",
                  padding: "12px 24px",
                  borderRadius: "8px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  textDecoration: "none",
                }}
              >
                Changer mon mot de passe
              </Button>
            </Section>
            <Text style={{ color: "#94a3b8", fontSize: "14px", textAlign: "center" }}>
              Ce lien est temporaire et expirera dans 3 heures.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
