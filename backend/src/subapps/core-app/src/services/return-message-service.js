exports.returnMessage = function(id, service) {
  let messages = {
    0: 'Failed to create new [service]',
    1: '[service] already exists',
    2: '[service] already exists in the table for another record',
    3: 'Failed to update [service]',
    4: '[service] updated successfully',
    5: '[service] retrieved successfully',
    6: 'There were no [service] found',
    7: '[service] created successfully',
    8: 'Failed to delete [service]',
    9: '[service] deleted successfully',
    10: '[service] cannot be updated as a relation already exists',
    11: '[service] cannot be deleted as a relation already exists',
    12: 'No changes detected for [service]',
    13: '[service] are invalid!',
    14: '[service] is invalid!',
    15: '[service] is a required value',
    16: '[service] is a protected record',
  }
  if (typeof messages[id] !== 'undefined') {
    if (typeof service === 'undefined' || null === service || service.length === 0) {
      service = 'Record';
    }
    return messages[id].replace('[service]', service);
  }
  return 'Oops!';
};