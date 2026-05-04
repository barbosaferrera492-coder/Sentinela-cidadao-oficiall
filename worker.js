// ══════════════════════════════════════════════════
//  SENTINELA CIDADÃO — Cloudflare Worker
//  Usando Google Gemini (gratuito)
//  A chave fica ESCONDIDA aqui no servidor.
// ══════════════════════════════════════════════════

export default {
  async fetch(request, env) {

    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method !== 'POST') {
      return new Response('Método não permitido', { status: 405 });
    }

    try {
      const body = await request.json();
      const entrada = body.entrada;

      if (!entrada) {
        return new Response(JSON.stringify({ erro: 'Nenhuma entrada enviada' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      const prompt = `Você é o Sentinela Cidadão, uma IA de segurança digital que protege os cidadãos de São Fidélis - RJ contra golpes online.

Analise se este site ou chave Pix é seguro ou golpe: "${entrada}"

Considere padrões comuns de golpes brasileiros como:
- Sites falsos de bancos, prefeituras, Correios, DETRAN
- Chaves Pix de extorsão ou prêmios falsos
- URLs suspeitas com erros ortográficos ou domínios estranhos
- Phishing e engenharia social
- Golpes do PIX, boleto falso, falso prêmio

Responda APENAS em JSON neste formato exato, sem texto fora do JSON:
{
  "nivel": "SEGURO" ou "ALERTA" ou "PERIGO",
  "titulo": "título curto em maiúsculo",
  "analise": "explicação em 2-3 linhas simples em português para cidadãos comuns",
  "dica": "uma dica rápida de proteção"
}`;

      const resposta = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${env.GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.1,
              maxOutputTokens: 500
            }
          })
        }
      );

      const dados = await resposta.json();
      const textoIA = dados?.candidates?.[0]?.content?.parts?.[0]?.text || '{}';

      return new Response(JSON.stringify({ resposta: textoIA }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });

    } catch (erro) {
      return new Response(JSON.stringify({ erro: erro.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
  }
};
