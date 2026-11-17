# Jardim 3D

Sistema web (pt-BR) para impressão 3D: pedidos, clientes, estoque de filamento (custo médio ponderado), precificação, financeiro e relatórios. Página única, dados no Supabase.

## 1. Banco (uma vez)
No Supabase, abra **SQL Editor**, cole [supabase.sql](supabase.sql) e execute.
Depois, em **Authentication > Users > Add user**, crie seu usuário (e-mail e senha) e, em **Authentication > Sign In / Providers**, desative "Allow new users to sign up".

## 2. Variáveis de ambiente
| Variável | Valor |
|---|---|
| `SUPABASE_URL` | URL do projeto (`https://xxxx.supabase.co`) |
| `SUPABASE_PUBLISHABLE_KEY` | chave publicável (`sb_publishable_...`) |

Local: copie `.env.example` para `.env`, preencha e rode `node build.js`; abra `dist/index.html`.
Vercel: Settings > Environment Variables, cadastre as duas variáveis. O `vercel.json` já define build e pasta de saída.

## Segurança
A chave publicável aparece no navegador por design; quem protege os dados é o RLS (política só para usuários autenticados) + login. Nunca use a chave `secret`/`service_role` aqui.
