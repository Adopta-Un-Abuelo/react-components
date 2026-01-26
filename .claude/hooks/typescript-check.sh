#!/bin/bash

# TypeScript Error Check Hook
# Verifica errores de TypeScript después de modificaciones a archivos .ts/.tsx

# Leer input JSON del hook
read -r json_input

# Extraer información del archivo modificado
file_path=$(echo "$json_input" | jq -r '.tool_input.file_path // empty')
tool_name=$(echo "$json_input" | jq -r '.tool_name // empty')

# Solo verificar archivos TypeScript/TSX
if [[ ! "$file_path" =~ \.(ts|tsx)$ ]]; then
  exit 0
fi

# Ejecutar verificación de TypeScript en todo el proyecto
# (verificar solo el archivo específico puede perder errores relacionados)
tsc_output=$(npx tsc --noEmit 2>&1)
tsc_exit=$?

# Si no hay errores, continuar normalmente
if [ $tsc_exit -eq 0 ]; then
  echo "✓ TypeScript check passed for $file_path" >&2
  exit 0
fi

# Si hay errores, formatear y mostrar a Claude
echo "❌ TypeScript errors detected after $tool_name on $file_path:" >&2
echo "" >&2
echo "$tsc_output" >&2
echo "" >&2
echo "Please fix these TypeScript errors before continuing." >&2

# Exit code 2 bloquea el proceso y muestra el error a Claude
exit 2
