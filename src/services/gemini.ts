/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI, Type } from "@google/genai";
import { StudyItem } from "../data/studies";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });

export const generateStudy = async (topic: string): Promise<StudyItem> => {
  const prompt = `Gere um estudo bíblico magistral sob a ótica Judaico-Messiânica.
  Tema: "${topic}".
  
  DIRETRIZES DE AUTORIDADE:
  1. FONTES JUDAICAS: Integre obrigatoriamente ensinos de fontes clássicas (ex: Talmud, Pirkei Avot, Rashi, Rambam ou Midrash) correlacionando-os com a revelação de Yeshua.
  2. NÍVEIS DE PROFUNDIDADE: O estudo deve começar com uma explicação simples (leite) e avançar para conceitos profundos (carne), explorando o "Pardes" (níveis de interpretação).
  3. TERMINOLOGIA: Use exclusivamente Yeshua, Tanakh, Mashiach, Torah, Elohim, Shliach.
  4. ANTI-SUPERSESSIONISMO: Reafirme a validade eterna da Aliança de Deus com Israel. Yeshua é o cumprimento, não a abolição.
  5. ESTRUTURA: O conteúdo deve citar a fonte judaica e explicar como Yeshua ilumina aquele ensino.
  
  O retorno deve ser um JSON neste formato:
  {
    "id": "slug-unico",
    "title": "Título Nobre e Profundo",
    "simpleTitle": "Pergunta essencial que o estudo responde",
    "description": "Resumo magnético com foco nas raízes",
    "createdAt": "2024-01-01T10:00:00Z",
    "outline": ["Base Bíblica", "Visão dos Sábios", "Revelação no Messias", "Aplicação na Brit Hadasha"],
    "content": "Conteúdo detalhado citando fontes judaicas clássicas e explicando termos hebraicos. Use parágrafos claros.",
    "references": ["Versículo Bíblico", "Tratado Talmudique ou Comentário Rabínico"],
    "category": "Messias" | "Festas" | "Torah" | "Conceitos" | "Brit Hadasha"
  }`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            title: { type: Type.STRING },
            simpleTitle: { type: Type.STRING },
            description: { type: Type.STRING },
            createdAt: { type: Type.STRING },
            outline: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            content: { type: Type.STRING },
            references: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            category: { 
              type: Type.STRING,
              enum: ["Messias", "Festas", "Torah", "Conceitos", "Brit Hadasha"]
            }
          },
          required: ["id", "title", "simpleTitle", "description", "createdAt", "outline", "content", "references", "category"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("Resposta vazia da IA");
    
    return JSON.parse(text) as StudyItem;
  } catch (error) {
    console.error("Erro ao gerar estudo:", error);
    throw new Error("Não foi possível gerar o estudo no momento. Verifique sua conexão ou tente novamente.");
  }
};
