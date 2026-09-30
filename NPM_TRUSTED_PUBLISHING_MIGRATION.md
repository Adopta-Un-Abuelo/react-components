# Migración a npm Trusted Publishing

**Estado:** Pendiente — planificado para hacerlo más adelante
**Prioridad:** Media-alta (npm va a rotar el token actual, hay que actuar antes de que falle un release)

## Contexto

npm envió un aviso anunciando que, como medida de prevención tras los ataques de cadena de suministro tipo "Mini Shai-Hulud", van a **rotar los granular access tokens con permisos de escritura que bypassean 2FA**.

Nuestro workflow de release (`.github/workflows/push.yml`) usa exactamente ese tipo de token a través del secret `NPM_TOKEN`, por lo que cuando lo roten:

- El paso `npm run release` fallará con error de autenticación (401/403).
- No podremos publicar nuevas versiones de `@adoptaunabuelo/react-components` hasta actualizar el secret.

npm recomienda migrar a **Trusted Publishing** (OIDC) para eliminar la dependencia de tokens de larga vida:
https://docs.npmjs.com/trusted-publishers

## Opciones

### Opción A — Parche rápido (no recomendado a largo plazo)

1. Generar un nuevo granular access token en npmjs.com.
2. Actualizar el secret `NPM_TOKEN` en GitHub → Settings → Secrets and variables → Actions.

Deja el sistema en la misma situación: token estático que podrían volver a rotar.

### Opción B — Trusted Publishing con OIDC (recomendado)

En lugar de un token estático, GitHub Actions se autentica contra npm con un token efímero generado por cada release.

#### Pasos

1. **En npmjs.com:**
   - Ir al package `@adoptaunabuelo/react-components` → Settings.
   - Configurar GitHub como Trusted Publisher.
   - Apuntar al repositorio `Adopta-Un-Abuelo/react-components` y al workflow `push.yml`.

2. **En `.github/workflows/push.yml`:**
   - Añadir permisos OIDC al job:
     ```yaml
     jobs:
       release:
         runs-on: ubuntu-latest
         permissions:
           id-token: write
           contents: write
     ```
   - Quitar `NPM_TOKEN` del bloque `env`.
   - Verificar que `auto shipit` / `npm publish` use `--provenance` (o que `auto` lo gestione vía OIDC automáticamente).

3. **En GitHub:**
   - Borrar el secret `NPM_TOKEN` una vez verificado que el primer release con OIDC funciona.

#### Beneficios adicionales

- Provenance attestations automáticas (los consumidores pueden verificar que el paquete viene realmente de este repo y este workflow).
- Sin secretos de larga vida que gestionar/rotar.
- Reduce drásticamente el riesgo de ataques tipo Shai-Hulud sobre nuestro paquete.

## Archivos afectados

- `.github/workflows/push.yml` — añadir `permissions: id-token: write`, quitar `NPM_TOKEN` del `env`.
- Configuración en npmjs.com (fuera del repo).
- Secret `NPM_TOKEN` en GitHub Actions (borrar tras verificar).

## Verificación tras la migración

- [ ] Hacer un release de prueba (bump menor) y verificar que se publica correctamente en npm.
- [ ] Verificar en npmjs.com que la versión publicada aparece con badge de "provenance".
- [ ] Confirmar que el secret `NPM_TOKEN` se puede eliminar sin romper nada.
