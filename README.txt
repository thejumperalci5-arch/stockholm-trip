STOCKHOLM TRIP V15.3 — TEST DESBLOQUEADO

CORRECCIÓN:
- Encontrado el motivo exacto por el que “DECIDIR LOS PASES” no avanzaba.
- Faltaba declarar el estado `passes`.
- `passesIntro()` podía mostrarse, pero `goCityDecision()` se detenía al leer `passes.goCity`.
- Añadido:
  let passes={transport:null,goCity:null};
- Eliminado un fallback antiguo que llamaba a `renderPassDecision()`, función que no existe.
- Corregido el total visible de atracciones para usar `individualRelevant`.
- JavaScript validado con `node --check`.
- Cache bust actualizado a ?v=15.3.
