import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message requis" }, { status: 400 });
    }

    // Prompt System pour Gemma : Rôle de Business Developer B2B
    const systemPrompt = `
    You are the "Axenium Digital Concierge", a world-class B2B Business Developer.
    Your goal is NOT just to answer, but to QUALIFY the lead and drive them to book a call with an expert.

    STRATEGY:
    1. Be ultra-professional, luxury, and precise.
    2. Discovery: Ask open-ended questions about their business size, current pain points, and growth goals.
    3. Value Anchoring: When they mention a problem, explain how Axenium solves it with high ROI.
    4. Upsell/Cross-sell: Suggest complementary services (e.g., if they want a website, suggest Cybersecurity or Digital Strategy).
    5. Closing: Once the need is clear, pivot to "Booking a strategic call with our assigned expert".

    Tone: French, sophisticated, decisive, and result-oriented.
    `;

    // Simulation de l'appel au LLM Gemma
    // Dans la production, on utiliserait un SDK comme LangChain ou un appel API direct (Google Vertex AI/Groq)
    const replies = [
      "Je comprends parfaitement vos enjeux. Pourriez-vous me préciser la taille de votre équipe actuelle afin que j'adapte la stratégie d'optimisation ?",
      "C'est un défi classique dans votre secteur. Axenium a déjà résolu ce problème pour des structures similaires en augmentant leur efficacité de 30%. Voulez-vous voir comment nous pourrions appliquer cela chez vous ?",
      "L'optimisation de vos flux est cruciale. Je suggère d'ajouter un audit de cybersécurité à votre demande pour garantir que votre croissance ne crée pas de failles critiques. Qu'en pensez-vous ?",
      "Votre vision est claire et ambitieuse. Le moment est idéal pour passer à l'exécution. Je vous propose de bloquer 15 minutes avec notre expert senior pour valider la feuille de route technique.",
    ];

    const randomReply = replies[Math.floor(Math.random() * replies.length)];

    return NextResponse.json({
      reply: randomReply,
      suggestedAction: "BOOK_CALL"
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
