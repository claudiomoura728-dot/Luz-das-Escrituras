# Regras de Desenvolvimento para este Projeto

## Compartilhamento e Persistência
- **Sempre use Firestore**: Todo conteúdo gerado ou compartilhado deve ser salvo no Firestore.
- **IDs Curtos nas URLs**: Links de compartilhamento devem usar IDs de documentos (`?id=...`) em vez de codificar dados completos na URL (`?s=...`). Isso evita erro 404 e problemas de truncamento de URL em navegadores e apps como WhatsApp.
- **Fallbacks Offline**: Mantenha o suporte a PWA e Service Workers para que o app funcione sem internet.
- **Segurança**: Siga rigorosamente as regras do Firebase definidas em `firestore.rules`.
- **Nomenclatura**: Mantenha os termos em português para a interface do usuário, respeitando a temática Judaico-Messiânica.
