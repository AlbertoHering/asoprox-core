exports.returnMessage = function(id, service) {
  let messages = {
    0: 'Fallido intento de crear un [service] nuevo',
    1: 'El registro de [service] ya existe',
    2: 'El registro de [service] ya existe',
    3: 'Falló intento de actualizar el registro de [service]',
    4: 'El registro de [service] se actualizó correctamente',
    5: 'El registro de [service] se obtuvo exitosamente',
    6: 'No se encontraron registros de [service]',
    7: 'El registro de [service] se creó correctamente',
    8: 'Fallido intento de eliminar el registro de [service]',
    9: 'El registro de [service] se eliminó correctamente',
    10: 'Ya existe una relación para el registro de [service]',
    11: 'No se puede eliminar el registro porque ya existe una relación de [service]',
    12: 'No se detectaron cambios para el registro de [service]',
    13: 'Los registros de [service] son inválidos',
    14: 'El registro de [service] es inválido',
    15: 'El registro de [service] requiere un valor',
    16: 'El registro de [service] esta protegido',
  }
  if (typeof messages[id] !== 'undefined') {
    if (typeof service === 'undefined' || null === service || service.length === 0) {
      service = 'Record';
    }
    return messages[id].replace('[service]', service);
  }
  return 'Oops!';
};