STOCKHOLM TRIP V14.1 — START FIX

Corrección crítica:
- El botón “EMPEZAR EL JUEGO” no avanzaba porque la función money() se llamaba
  accidentalmente a sí misma de forma infinita al intentar renderizar el primer día.
- money(sek) vuelve a mostrar correctamente:
  “XXX SEK · ~XX,XX €”
- Se mantiene todo el pulido iPhone de V14.
