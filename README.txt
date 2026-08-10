STOCKHOLM TRIP V15 — OPERACIÓN ESTOCOLMO + GUARDADO AUTOMÁTICO

NOVEDADES:
- Guardado automático en localStorage.
- Si Safari se cierra, el progreso queda guardado.
- Al volver:
  · si el cuestionario no está terminado, intenta retomar el día en curso;
  · si ya está terminado, abre un HUB con itinerario, presupuesto y Operación Estocolmo.
- Operación Estocolmo permanece bloqueada hasta 21/09/2026.
- El lunes 21 se desbloquea:
  FASE I · misión de 100 SEK por persona / 30 minutos
  FASE II · revelación de Selma City Spa
  FASE III · intercambio de regalos dentro del spa
  FASE IV · foto oficial de Estocolmo
  FINAL · Operación Estocolmo completada
- El progreso de la Operación también se guarda.
- Reinicio manual disponible desde el HUB.
- Mantiene el resto de la web, cartas, pases, presupuesto y iPhone polish.

NOTA DE PRUEBA:
Para probar el desbloqueo antes del 21/09/2026 puedes cambiar temporalmente:
  const TODAY_OVERRIDE=null;
por:
  const TODAY_OVERRIDE="2026-09-21";
No se recomienda dejar el override activo en la versión final.
