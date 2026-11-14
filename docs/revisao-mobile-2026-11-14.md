# Revisão do site — 14 de novembro de 2026

## Resultado

**Atualização:** os sete endereços pendentes desta primeira checagem foram substituídos por referências acessíveis. Veja a [revisão final](revisao-final-2026-11-14.md) para o resultado atualizado e as pendências restantes.

A revisão técnica da versão local foi concluída com os ajustes descritos abaixo. A publicação não foi realizada. Os testes automatizados não substituem a revisão editorial/científica e o teste em celulares físicos.

## Ajustes realizados

- Cabeçalho da página inicial reorganizado apenas até 700 px: logo e título em um bloco, menu ao lado e busca, FAQ e acessibilidade em uma linha própria com botões de 48 px.
- Menu fecha ao escolher uma opção, clicar fora ou mudar de faixa de tamanho; Escape continua disponível.
- Correção de transbordamento com fonte máxima na seção Sobre em 320 px e na navegação em tablet.
- Visualizador recupera o modo 2D ao restaurar uma página do histórico que teve o 3D liberado. O cenário de restauração foi simulado nos testes.
- Falha de carregamento da embalagem agora oferece mensagem e botão Tentar novamente; se houver produto anterior, ele permanece disponível em 2D.
- Removida uma espera desnecessária pela imagem da logo antes de inicializar o visualizador.
- Gradiente de fundo volta a ser ativado quando a página retorna do histórico.

O cabeçalho de computador manteve a disposição e dimensões anteriores. A comparação das capturas a 1366 px apresentou apenas 11 pixels de diferença na suavização de um traço do ícone, sem alteração de layout.

## Verificações executadas

Ambiente: Microsoft Edge em execução automatizada, com Playwright. Telas móveis simuladas; renderização 3D por software. Nenhum celular físico ou Safari/iOS foi testado.

| Verificação | Resultado |
| --- | --- |
| Página inicial a 320, 360, 390, 430, 768, 1366 e 1920 px | Sem rolagem horizontal da página |
| Fonte máxima a 320, 360, 390, 700, 768 e 1024 px | Sem transbordamento após correções |
| Visualizador a 320, 360, 390 e 430 px | Sem transbordamento; botões visíveis com altura mínima de 44 px |
| Busca, FAQ, acessibilidade, pesquisa e atuação veterinária | Painéis abrem e fecham |
| Cinco cartões de símbolos | Explicações abrem |
| Alto contraste e fonte ampliada | Controles funcionam |
| Menu móvel e Escape | Abre e fecha corretamente |
| Seis embalagens | 2D, zoom, explicação e 3D funcionam |
| Volta do 3D para 2D nos seis produtos | Canvas 3D anterior removido |
| Troca de produto depois do 3D | Retorna a 2D e remove a cena anterior |
| Arraste da imagem 2D ampliada | Posição da imagem muda |
| Arraste 3D em dois eixos | Rotação altera a imagem renderizada |
| Falha de conexão simulada | Nova tentativa recupera o carregamento |
| Falha do arquivo 3D simulada | Alternativa 2D permanece utilizável |
| Retorno de histórico simulado | Recuperação em 2D |
| Arquivos referenciados pelo HTML e IDs duplicados | Nenhum arquivo local ausente ou ID duplicado encontrado |
| Sintaxe dos módulos JavaScript | Verificada sem erros |
| Execução normal das principais interações | Nenhum erro JavaScript não tratado ou resposta HTTP local de erro durante os testes |

Os modelos ativos têm aproximadamente 0,78 a 1,25 MiB cada. O 3D carrega por solicitação, uma embalagem por vez; a cena renderiza sob demanda e limita a densidade de pixels. Não foi realizado benchmark em aparelho intermediário ou conexão móvel real.

## Referências externas

Foram consultados 53 endereços cadastrados nos dados educativos: 46 responderam com HTTP 200. Sete consultas falharam por desconexão/conexão; isso não prova que as páginas estejam fora do ar. Não houve retorno HTTP 404 nessa amostra. A resposta HTTP não comprova atualização normativa ou adequação científica de cada resumo.

Endereços que precisam de conferência manual:

- https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2017/decreto/d9013.htm
- https://www.defesa.agricultura.sp.gov.br/legislacoes/portaria-mapa-146-de-07-03-1996%2C669.html
- https://www.defesa.agricultura.sp.gov.br/legislacoes/portaria-ma-359-de-04-09-1997%2C675.html
- https://www.defesa.agricultura.sp.gov.br/legislacoes/portaria-ma-353-de-04-09-1997%2C671.html
- https://www.defesa.agricultura.sp.gov.br/legislacoes/instrucao-normativa-sda-4-de-31-03-2000%2C662.html
- https://www.defesa.agricultura.sp.gov.br/legislacoes/portaria-sda-mapa-1179-de-05-09-2024%2C1943.html
- https://biblioteca.incaper.es.gov.br/digital/bitstream/item/4780/1/Doc317-RotulagemAlimentos-2024-Incaper.pdf

## Pendências antes da publicação definitiva

1. Revisão científica/editorial das explicações e dos 109 nomes e termos do catálogo pela equipe responsável. Os avisos de conteúdo em revisão foram preservados.
2. Conferência das bases de resposta e arredondamentos dos percentuais da pesquisa: a amostra total informada é de 34 pessoas, mas não foram fornecidos os dados individuais por pergunta. Não recalculamos nem alteramos os percentuais enviados pela equipe.
3. Conferência manual dos sete endereços acima e das versões vigentes das referências normativas.
4. Teste em pelo menos um Android e um iPhone/Safari, incluindo toque, pinça, orientação da tela e conexão móvel limitada. A emulação não mede a fluidez nesses aparelhos.
5. Após eventual publicação autorizada, verificar os caminhos e o acesso por QR Code na hospedagem real. Este relatório cobre a versão local.

A revisão cobre as funcionalidades existentes. Não há comparador de duas embalagens na interface atual, embora constasse no briefing inicial; sua inclusão é um trabalho separado. O jogo externo não foi desenvolvido neste projeto.
