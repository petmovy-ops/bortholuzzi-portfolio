# Mídia local — procedimento concluído

Os arquivos originais já foram importados para `public/media/` e integrados à branch `main` por meio do PR #1.

Não é necessário executar novamente `scripts/import-media-archives.sh` nem extrair os ZIPs originais.

Para validar a cópia local:

```bash
find public/media -type f | wc -l
npm run verify:media
npm run build
npm run verify:media -- --output out
```

A contagem esperada é 849 arquivos. O mapeamento de galerias exibe 228 imagens-fonte distintas em 41 páginas; isso é resultado da deduplicação de tamanhos repetidos, não de perda de arquivos.

Preserve os arquivos originais. Não altere DNS nem conecte o domínio principal durante a validação do preview.
