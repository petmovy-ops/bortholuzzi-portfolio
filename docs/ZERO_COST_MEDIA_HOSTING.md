# Hospedagem de mídia sem custo recorrente

Atualizado em 2026-11-21.

## Arquitetura selecionada

- Next.js com exportação estática (`output: "export"`).
- Cloudflare Pages Free planejado para hospedar o site estático e os arquivos de mídia.
- Imagens originais versionadas no repositório em `public/media/`.
- Nenhum bucket R2, serviço de armazenamento pago ou cartão é necessário para esta arquitetura.

## Estado do repositório

- PR #1 integrado na branch `main`.
- Os 849 arquivos de imagem originais estão em `public/media/`.
- `src/data/media.json` mapeia 228 imagens-fonte distintas em 41 páginas, após deduplicação de rendições repetidas.
- As 128 imagens sem associação direta continuam preservadas, sem associação inferida.
- O build estático gera o diretório `out/`.

## Cloudflare Pages — configuração do preview

Criar um projeto Pages conectado ao GitHub, selecionando o repositório `petmovy-ops/bortholuzzi-portfolio`.

Configuração:
- Production branch: `main` (a primeira implantação deve ser revisada apenas no endereço `pages.dev`).
- Framework preset: Next.js (Static HTML Export), se disponível; caso contrário, configure manualmente.
- Build command: `npm run build`.
- Build output directory: `out`.
- Root directory: `/`.

Não conectar `bortholuzzi.com` nem `www.bortholuzzi.com` nesta etapa. A revisão deve ocorrer no subdomínio `pages.dev`.

## Critérios de aceite do preview

1. Build concluído sem erro.
2. Home e navegação carregam corretamente.
3. Páginas de projeto, galerias e vídeos abrem.
4. Imagens locais carregam sem 404.
5. Layout revisado em desktop e celular.
6. Rotas antigas e URLs canônicas conferidas.

Somente após aprovação explícita do usuário será iniciada a conexão do domínio e qualquer alteração de DNS na UOL.
