# CART-LPS

Script para integração headless shopify

## Instalação:

Coloque o seguinte código no footer:

```
<script>
  document.head.appendChild(Object.assign(document.createElement("link"), {
    rel: "stylesheet",
    href: `https://cdn.jsdelivr.net/gh/caffeine-army/cart-lps@1/src/scss/style.css?cb=${Math.floor(Date.now()/600000)}`
  }));
  document.head.appendChild(Object.assign(document.createElement("script"), {
    src: `https://cdn.jsdelivr.net/gh/caffeine-army/cart-lps@1/cart-lps.min.js?cb=${Math.floor(Date.now() / 600000)}`,
    onload: () => lpCart({
      noCart: false,
      products: [{ id: 999 }],
      couponCode: "example",
    })
  }));
</script>

```

## Ativação

Para ativar o carrinho, a página precisa ter ao menos um botão com o atributo "cart-button".

ex:

```
<button cart-button></button>
```

## Parametros

A função lpCart recebe um objeto com as seguintes chaves:

- noCart
  True se não for ter seleção de variante ou bump (vai direto pro checkout)
- products [array de objetos]
  - id [int]
  - quantity [int] (optional)
  - variants [array] (opcional)
- bump [object] (opcional)
  - type [string] ("quantity" ou "product")
    Se quantity:
    - affect [array] (ids dos produtos afetados)
    - name [string]
    - image [string]
    - price [string]
    - couponCode [string]
      Se product
    - ids [array de objetos]
      - id
      - title (opcional)
      - bumpPrice [string]
      - couponCode [string]
- customButtons [array de objetos] (opcional)
  cada chave será o id de algum botão
  - products [array de objetos]
  - couponCode [string]

Exemplo com todos os parâmetros (não da pra ter bump product e quantity ao mesmo tempo)

```
{
  noCart: false,
  products: [
    { id: 999, quantity: 2 },
    { id: 998, variants: [1234]},
  ],
  bump: {
    type: "product",
    ids: [{ id: 997 , title: "Adicione Koala 264g de <b>R$20,00</b> por <b style='color: green'>R$12,60</b>", bumpPrice: "12.60", couponCode: "bumpCoupon" }],
  },
  bump: {
    type: "quantity",
    quantity: 2,
    affect: [999],
    name: "Dobro dos sticks por R$10,90",
    image: "https://cdn.image.com",
    price: "10,90",
    couponCode: "bumpCoupon"
  },
  customButtons: {
    "btn-1": {
      products: [
        {id: 999, quantity: 3},
      ],
      couponCode: "coupon"
    }
  },
  couponCode: "coupon",
}
```

## DEV

#### Instalar dependências

```
yarn install
```

#### Buildar código

```
yarn build
```

#### compilar scss

extensão live sass compiler vscode ou baixar compilador do site deles

#### dando purge cdn

<a href="https://www.jsdelivr.com/tools/purge">https://www.jsdelivr.com/tools/purge</a>
