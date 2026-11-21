# Migração de mídia — estado integrado

Atualizado em 2026-11-21, após integração do PR #1 na branch `main`.

## Inventário verificado

- 849 arquivos originais de imagem preservados em `public/media/`.
- 721 referências de arquivos distribuídas por 41 páginas do acervo.
- As 721 referências incluem diferentes rendições/tamanhos da mesma imagem.
- As galerias removem repetições da mesma imagem-fonte e exibem 228 entradas distintas, mantendo recortes diferentes como imagens distintas.
- Os arquivos originais e suas rendições menores continuam preservados; não foram apagados.
- 128 arquivos sem associação direta no inventário continuam disponíveis em `public/media/` e não são atribuídos arbitrariamente a projetos.

## Integridade e caminhos

- `src/data/media.json` usa caminhos locais `/media/<filename>`.
- Os arquivos de mídia fazem parte do repositório em `public/media/`.
- O validador `scripts/verify-media.mjs` confere os 849 arquivos, as 41 páginas mapeadas, a ausência de duplicações nas galerias e a presença dos arquivos no build estático.
- Não há dependência de CDN legado para servir as imagens mapeadas.

## Próxima validação

Executar no Mac, na raiz do repositório:

```bash
npm ci
npm run typecheck
npm run lint
npm run build
npm run verify:media -- --output out
```

Depois, revisar o preview de Cloudflare Pages em desktop e celular antes de qualquer conexão do domínio principal.
