# Revisão final assistida — 14 de novembro de 2026

## Resultado e alcance

Revisão editorial e documental da implementação atual, com correções aplicadas no projeto local. A etapa técnica de celular está descrita também em [revisao-mobile-2026-11-14.md](revisao-mobile-2026-11-14.md). Nenhum commit, envio ao GitHub ou publicação foi realizado nesta etapa.

A revisão assistida não equivale à aprovação científica institucional. Não foram certificados individualmente os rótulos ilustrativos nem a vigência consolidada de todos os dispositivos legais relacionados aos 109 itens. Os avisos de exemplo educativo e revisão pela equipe foram preservados.

## Correções aplicadas

| Tema | Correção |
| --- | --- |
| RIISPOA | Link que não respondia substituído pela versão atualizada da Câmara dos Deputados. |
| Creme e manteiga | Referência transferida para documento disponibilizado pelo MAPA. |
| Requeijão e parmesão | Links transferidos para os respectivos regulamentos no MAPA. |
| Linguiça, salsicha e mortadela | Link substituído pelo documento da IN 4/2000 no MAPA. |
| Ovos | Norma geral de beneficiamento mantida para classificação; ovo integral pasteurizado e ovo desidratado ligados à Portaria 728/2022. |
| Ovo desidratado | Definição corrigida para desidratação do ovo integral pasteurizado; clara e gema desidratadas identificadas como produtos distintos. |
| Classes de peso dos ovos | Especificado que jumbo, extra, grande e médio se referem aos ovos de galinha. A explicação distingue peso de características de qualidade. |
| Leite condensado e doce de leite | Referência de nutrição que não sustentava a identidade do produto substituída pelos regulamentos específicos. |
| Carne moída | Incluído link direto ao regulamento, em lugar do índice genérico. |
| Mel e outros produtos de abelhas | Referências direcionadas aos regulamentos do mel e dos demais produtos de abelhas. |
| Palavra tipo | Referência indisponível substituída pelas regras do MAPA; preservados os exemplos que mostram usos distintos da palavra. |
| Provolone | Texto esclarece a possibilidade de apresentação fresca ou maturada. |
| Validade | Referência antiga substituída pela página da Anvisa sobre a atualização de 2025. |
| Lecitina, goma-laca e vitamina D3 | Incluídas referências técnicas sobre origem. A interface esclarece que referências internacionais não estabelecem as regras brasileiras de uso. |

A redação sobre validade após abertura, aparência de alimentos vencidos, lactose e proteínas do leite, declaração escrita de alergênicos, inspeção e SISBI foi conferida com as referências oficiais selecionadas. Não foram adicionados valores nutricionais, números de registro ou dados sanitários de fabricantes fictícios.

## Fontes principais consultadas

- [MAPA — índice oficial de legislação](https://www.gov.br/agricultura/pt-br/assuntos/inspecao/produtos-animal/legislacao)
- [Câmara — RIISPOA atualizado](https://www2.camara.leg.br/legin/fed/decret/2017/decreto-9013-29-marco-2017-784536-normaatualizada-pe.html)
- [MAPA — rotulagem, IN 22/2005](https://www.gov.br/agricultura/pt-br/assuntos/inspecao/produtos-animal/legislacao/IN222005Regulamentortuloregistroproduto.pdf)
- [MAPA — ovos e derivados, Portaria 1179/2024 com alterações no documento disponibilizado](https://www.gov.br/agricultura/pt-br/assuntos/inspecao/produtos-animal/legislacao/Port11792024Beneficiamentodeovos.pdf)
- [MAPA — ovo integral pasteurizado e desidratado, Portaria 728/2022](https://www.gov.br/agricultura/pt-br/assuntos/inspecao/produtos-animal/legislacao/Port7282022RTovointegralovodesidratado.pdf)
- [MAPA — leite condensado, IN 47/2018](https://www.gov.br/agricultura/pt-br/assuntos/inspecao/produtos-animal/legislacao/IN472018RTLeitecondensado.pdf)
- [MAPA — doce de leite, Portaria 354/1997](https://www.gov.br/agricultura/pt-br/assuntos/inspecao/produtos-animal/legislacao/Port3541997RTdocedeleite.pdf)
- [Anvisa — alergênicos](https://www.gov.br/anvisa/pt-br/centraisdeconteudo/publicacoes/alimentos/perguntas-e-respostas-arquivos/rotulagem-de-alergenicos.pdf)
- [Anvisa — atualização do guia de validade](https://www.gov.br/anvisa/pt-br/assuntos/noticias-anvisa/2025/anvisa-atualiza-guia-sobre-validade-de-alimentos)
- [MAPA — perguntas sobre SISBI-POA](https://www.gov.br/agricultura/pt-br/assuntos/defesa-agropecuaria/suasa/perguntas-e-respostas-decreto-12-408-2025-e-o-sisbi/perguntas-e-respostas-sisbi)
- [EFSA — lecitinas](https://efsa.onlinelibrary.wiley.com/doi/10.2903/j.efsa.2017.4742)
- [EFSA — goma-laca](https://efsa.onlinelibrary.wiley.com/doi/10.2903/j.efsa.2024.8897)
- [NIH — fontes de vitamina D](https://ods.od.nih.gov/factsheets/Vitamind-HealthProfessional/)

## Verificações desta etapa

- Todos os módulos JavaScript passaram na verificação de sintaxe.
- As 109 fichas foram abertas pela busca e seleção na interface, em tela de 390 px; títulos e referências estavam presentes. Sem erros JavaScript nesse teste.
- A nova referência sobre tipo foi verificada na interface; sem transbordamento horizontal nessa tela.
- Depois das substituições, os 53 endereços da amostra de referências anterior responderam HTTP 200. Isso resolveu os sete endereços pendentes da primeira revisão.
- As três referências internacionais acrescentadas depois dessa checagem foram consultadas pelo navegador de pesquisa. HTTP 200 e abertura de ficha não comprovam correção científica ou vigência normativa.
- Não foi repetido o teste 3D nesta etapa: não houve alteração na lógica do visualizador desde a bateria técnica anterior, que verificou os seis produtos.

## O que continua dependendo de confirmação

1. **Pesquisa:** confirmar as bases de resposta de cada pergunta e os arredondamentos. Os percentuais enviados foram preservados; não há dados brutos para recalculá-los com segurança. A pergunta sobre essas bases foi enviada à equipe no chat.
2. **Aprovação institucional:** a equipe/professora responsável precisa aprovar a redação educativa e a aplicação das referências antes de retirar os avisos de conteúdo em revisão.
3. **Artes ilustrativas:** números, datas, composição e selos impressos nos modelos continuam demonstrativos, conforme orientação da equipe; não foram convertidos em rótulos tecnicamente certificados.
4. **Dispositivos reais:** não houve teste em Android ou iPhone físicos, nem medição em conexão móvel real. A emulação não comprova desempenho nesses aparelhos.
5. **Hospedagem:** validar a versão publicada e o acesso por QR Code depois de autorização para envio/publicação.

Essas pendências não foram marcadas como concluídas nem preenchidas com informações inventadas.
