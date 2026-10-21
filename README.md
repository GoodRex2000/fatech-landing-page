# FAtech — Do campo ao mapa

Landing page responsiva para apresentar a FAtech, MVP de organização de vistorias ambientais desenvolvido no hackathon do IFC Concórdia.

**Grupo 13 · Lázaro Fornari da Silva · 2026**

## Executar

Abra `index.html` no navegador, ou sirva a pasta com:

```sh
python3 -m http.server 8000
```

Acesse `http://localhost:8000`. O projeto usa HTML, CSS e JavaScript puro, sem instalação de dependências ou build. Funciona em hospedagem estática, inclusive GitHub Pages.

## Experiência

- Apresentação comercial com fotografia de natureza, interface de celular ilustrativa e benefícios resumidos.
- Animações de entrada, revelação durante a rolagem, paralaxe leve, inclinação do celular e transições em controles. Movimento decorativo respeita `prefers-reduced-motion`; efeitos de ponteiro são exclusivos de dispositivos compatíveis. Não há animações automáticas infinitas.
- Demonstração com três etapas: registro (foto, relato ou áudio ilustrativos), seleção de ocorrências em mapa esquemático e seleção de registros para simulação de exportação KML.
- Navegação por teclado, abas com setas/Home/End, estados anunciados por leitores de tela, link de pular conteúdo e conteúdo visível sem JavaScript.

## Limites da demonstração

As interfaces e os dados são fictícios. Nenhuma ação coleta GPS, usa câmera ou microfone, grava dados, conecta IA ou gera arquivos. A interface não é uma captura de um aplicativo em produção.

A proposta do MVP inclui fotos, texto, áudio, GPS, registros locais offline, transcrição e sugestão de campos com IA e revisão profissional, mapa e exportação KML para o QGIS. Mapa-base e IA dependem de conexão, a IA exige configuração e o MVP não sincroniza dados entre celulares. Os benefícios ainda serão avaliados com o uso do MVP.

## Imagens e fontes

Fotografias gratuitas verificadas sob a [Unsplash License](https://unsplash.com/license):

| Uso | Autor e origem | Imagem |
| --- | --- | --- |
| Abertura | [Ivars Utināns / Unsplash](https://unsplash.com/photos/aerial-view-of-green-trees-and-river-during-daytime-vkQgb1lZZPQ) | `photo-1591081658714-f576fb7ea3ed` |
| Registros e encerramento | [Josh Roland / Unsplash](https://unsplash.com/photos/aerial-photography-of-river-between-trees-at-daytime-3mIkJ_GWUZg) | `photo-1568742994439-938fa12de093` |

As fotos representam natureza de forma ilustrativa; não documentam vistorias reais da FAtech. São servidas pelo domínio oficial `images.unsplash.com`, com largura e qualidade ajustadas a cada uso. O download local não estava disponível no ambiente de implementação. Em falhas de conexão, a página usa a ilustração de terreno local como fundo de reserva.

`assets/terrain.svg`, os ícones e a marca vetorial são ilustrações criadas para esta página, sem representar cartografia real. A tipografia DM Sans é carregada pelo Google Fonts, com Arial como alternativa local. Fotos e fonte dependem de acesso externo; o conteúdo e a demonstração funcionam sem esses serviços.
