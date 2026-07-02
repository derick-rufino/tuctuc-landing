# Tuctuc — Landing page de download

Página estática (HTML + CSS + JS puro, sem build) para divulgar e distribuir o
APK do Tuctuc fora da Play Store.

```
tuctuc-landing/
├── index.html      → estrutura e conteúdo
├── styles.css      → tema claro espelhado de theme.js (verde/azul-marinho)
├── script.js       → download, detecção de Android, FAQ, scroll suave
├── assets/
│   └── icon.png    → ícone da marca (copiado do app)
└── tuctuc.apk      → ⚠️ VOCÊ adiciona aqui (não incluído)
```

## Como o download funciona (importante)

O botão **não** manda o usuário para outro site. Ele aponta para um arquivo
`tuctuc.apk` **na mesma pasta** da página, com o atributo `download`:

```html
<a href="./tuctuc.apk" download="Tuctuc.apk">Baixar APK</a>
```

Ao clicar, o próprio navegador baixa o arquivo direto no aparelho. Não dá para
embutir o APK dentro do HTML (o arquivo tem dezenas de MB) — ele precisa estar
hospedado junto do site.

### Passos para funcionar

1. Gere o APK do app (ex.: `eas build -p android --profile preview`, ou
   `npx expo run:android --variant release`).
2. Renomeie o arquivo para **`tuctuc.apk`** e coloque-o **nesta pasta**, ao lado
   de `index.html`.
3. (Opcional) Atualize a versão e o tamanho em `script.js`:
   ```js
   var APK = { file: "tuctuc.apk", version: "0.5.0-beta.1", size: "~40 MB" };
   ```
4. Publique a pasta inteira (incluindo o `.apk`) em qualquer hospedagem estática.

> Se o arquivo `tuctuc.apk` ainda não existir, o botão mostra um aviso amigável
> em vez de baixar um arquivo quebrado (validação via `fetch HEAD` no `script.js`).

## Testar localmente

Abrir o `index.html` direto no navegador funciona para ver o layout. Para testar
o **download** de verdade, sirva a pasta por HTTP (o `file://` bloqueia o HEAD):

```bash
# na pasta tuctuc-landing/
python -m http.server 8080
# abra http://localhost:8080
```

## Publicar

Serve em qualquer host de site estático — basta subir a pasta com o `.apk` junto:

- **Netlify / Vercel / Cloudflare Pages** — arraste a pasta ou conecte o repo.
- **GitHub Pages** — suba a pasta num repo e ative Pages.
- **Railway** — sirva como estático (combina com o deploy que já está planejado).

### Atenção ao tipo MIME do APK

Alguns servidores servem `.apk` como texto. O atributo `download` no link já
resolve na maioria dos casos, mas o ideal é o servidor enviar:

```
Content-Type: application/vnd.android.package-archive
```

Netlify/Vercel/Cloudflare já reconhecem `.apk`. Em Nginx próprio, adicione o tipo
em `mime.types` se necessário.

## Personalização rápida

| O quê | Onde |
|-------|------|
| Versão / tamanho / nome do arquivo APK | `script.js` → objeto `APK` |
| Cores, raios, sombras | `styles.css` → bloco `:root` (tokens de `theme.js`) |
| Textos, seções, FAQ | `index.html` |
| Ícone / favicon | `assets/icon.png` |

Os mockups de celular (login e feed de caronas) são recriados em puro HTML/CSS
espelhando o design real do app — não são imagens. Para trocá-los por
screenshots reais depois, é só substituir o conteúdo de cada `.phone-screen`.

Ícones: [Tabler Icons](https://tabler.io/icons) (SVG inline, sem dependência de CDN).
Fonte: Space Grotesk (mesma do app), via Google Fonts com fallback do sistema.
