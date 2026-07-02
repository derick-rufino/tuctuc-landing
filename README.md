<div align="center">

<img src="assets/icon.png" alt="Tuctuc" width="96" height="96" />

# Tuctuc

**Caronas solidárias entre estudantes de escolas técnicas e faculdades.**
Tem carro? Ofereça caronas. Precisa de uma? Encontre a galera que vai pro mesmo lugar.

<br/>

[![Versão](https://img.shields.io/badge/versão-0.5.0--beta.1-1f6f43?style=flat-square)](https://github.com/derick-rufino/tuctuc-landing/releases/latest)
[![Plataforma](https://img.shields.io/badge/Android-7%2B-0b2545?style=flat-square)](#como-instalar)
[![Tamanho](https://img.shields.io/badge/tamanho-~100%20MB-555?style=flat-square)](https://github.com/derick-rufino/tuctuc-landing/releases/latest)

<br/>

### [&#11015;&nbsp;&nbsp;Baixar APK para Android](https://github.com/derick-rufino/tuctuc-landing/releases/download/v0.5.0-beta.1/tuctuc.apk)

<sub>Versão 0.5.0-beta.1 · Android 7 ou superior · ~100 MB</sub>

</div>

---

## Como instalar

O Tuctuc ainda não está na Play Store — a instalação é feita pelo arquivo APK. É rápido:

1. **Baixe o APK** — toque no botão acima pelo próprio celular Android.
2. **Abra o arquivo** — assim que o download terminar, toque na notificação ou procure em *Downloads*.
3. **Permita a instalação** — se o Android avisar sobre "fontes desconhecidas", ative a permissão **só para este arquivo** e confirme.
4. **Pronto** — abra o Tuctuc e comece a pegar (ou oferecer) caronas.

> Está num iPhone ou no computador? O download é um APK **para Android**. Baixe e transfira para um aparelho Android, ou abra esta página direto no celular.

---

## Sobre o app

- **Caronas entre estudantes** — conecte-se com quem estuda perto e vai pro mesmo destino.
- **Tem carro?** Ofereça vagas e divida a rotina (e os custos) com a galera.
- **Foco em técnicas e faculdades** — feito para o dia a dia de quem estuda.

Esta é uma **versão de preview (beta)**. Coisas podem mudar e bugs podem aparecer — feedback é bem-vindo.

---

## Para desenvolvedores

Este repositório também hospeda a **landing page de download** (HTML + CSS + JS puro, sem build).

```
tuctuc-landing/
├── index.html   → estrutura e conteúdo da página
├── styles.css   → tema claro espelhado do app (verde / azul-marinho)
├── script.js    → link de download, detecção de Android, scroll suave
└── assets/      → ícone da marca e imagens
```

### Distribuição do APK

O APK **não fica no repositório** (arquivos acima de 100 MB são rejeitados pelo GitHub).
Ele é publicado via **[GitHub Releases](https://github.com/derick-rufino/tuctuc-landing/releases)**, e o botão da landing aponta para o asset do release.

Ao publicar uma nova build:

1. Gere o APK (ex.: `eas build -p android --profile preview`).
2. Crie um novo release e anexe o arquivo:
   ```bash
   gh release create v0.6.0-beta.1 caminho/para/tuctuc.apk --title "Tuctuc 0.6.0-beta.1"
   ```
3. Atualize a config em `script.js` para apontar para o novo release:
   ```js
   var APK = {
     url: "https://github.com/derick-rufino/tuctuc-landing/releases/download/v0.6.0-beta.1/tuctuc.apk",
     version: "0.6.0-beta.1",
     size: "~100 MB",
   };
   ```

### Rodar a landing localmente

```bash
# na pasta tuctuc-landing/
python -m http.server 8080
# abra http://localhost:8080
```

### Personalização rápida

| O quê | Onde |
|-------|------|
| URL / versão / tamanho do APK | `script.js` → objeto `APK` |
| Cores, raios, sombras | `styles.css` → bloco `:root` |
| Textos, seções, FAQ | `index.html` |
| Ícone / favicon | `assets/icon.png` |

Ícones: [Tabler Icons](https://tabler.io/icons) (SVG inline na página, sem CDN).
Fonte: Space Grotesk (mesma do app), via Google Fonts com fallback do sistema.
