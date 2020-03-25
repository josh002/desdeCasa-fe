# Notas de Proyecto

## Opcionales para segunda instancia

### Opcionales 

Opcional - Confeccionar Carnet Digital del Militante 
Opcional - Deteccion automatica de Seccional
Opcional - Agenda
Opcional - Bloquear Screenshot de la Version Mobile

### Segunda instancia

Videoconferencias
Facultad de Militancia
Recaudacion de Fondos
Mercado Libre Compañero

## Cuestiones Tecnicas

Categorias de Militantes - Necesario!
Voto Secreto en Encuestas

Print de pantalla en Web: no es posible de evitar
Print de pantalla en Ionic: es posible, no se puede evitar que otro celular saque una foto

## Pendientes funcionales
  
-----------------------------------------------------------------

## Mejoras

### Generales

- [ ] Restylear todos los componentes de nuevo. Ver globals.scss

### Login

- [ ] Porcentaje del formulario de registro completado
- [ ] Mejorar el datepicker (los meses deben ser 31/30/29/28 s/c)
- [ ] No debería aparecer la flechita back cuando se loguea

-----------------------------------------------------------------

## Testing

### Test Login

- Login con usuario existente y password.
- Login con email existente y password.
- Login con usuario inexistente y password.
- Login con email inexistente y password.

### Test Register

- Registro con usuario y email nuevo.
- Registro con usuario existente, email nuevo.
- Registro con usuario nuevo, email existente.

-----------------------------------------------------------------

## Consultas

- [ ] Pedir logo de mejor calidad a evangelina

## Call 18/12/2019 - Evangelina

- [x] Registrate acá: botón en lugar de link - ¿No estás registrado?
- [ ] Logo de la DesdeCasa
- [X] Mover Afiliado a otra pantalla.
- [X] Formato de celular: 0xxx-15xxxxxxx
- [X] Formato de fijo: 0xxx-4xxxxxxx
- [X] Cambiar nombre del campo "Nivel de Estudio"
- [X] Uso de placeholders en register
- [ ] Laboral: cambiar el nombre a ???
- [ ] ¿Cambiar nombre del campo afiliado? Solicitar cuál
- [ ] Definir rubros Rubro / Ocupación (Ocupación: ¿Texto o campos fijos?)
- [ ] Definir grupos de militancia

### Roles

'0', 'Afiliado', '0'
'1', 'Dirigente', '2'
'2', 'Administrador', '4'

### Estado de usuario

'0', 'Esperando alta'
'1', 'Activo'
'2', 'Suspendido'
